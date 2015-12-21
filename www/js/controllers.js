var module = angular.module('decoupled_auth.controllers', []);

/**
 * App Controller.
 *
 * Handle modal popup for logout event.
 */
module.controller('AppCtrl', function($scope, $ionicModal, $timeout, Utils, DrupalOrg, LoginService) {
  //$scope.$on('$ionicView.enter', function(e) {
  //  $timeout(function() {
  //    Utils.notifyHide();
  //  }, 1000);
  //});

  // Process Project caches.
  //DrupalOrg.cacheAllProjects();

  // Create the logout modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.logoutModal = modal;
  });

  $scope.closeLogout = function() {
    $scope.logoutModal.hide();
  };

  $scope.logout = function() {
    $scope.logoutModal.show();
  };

  $scope.doLogout = function() {
    LoginService.logoutUser();
    $scope.closeLogout();
  };
});

/**
 * Favourites Controller.
 *
 * Handle favourite lists and search.
 */
module.controller('FavouritesCtrl', function($scope, $q, $ionicListDelegate, Utils, DrupalOrg, Favourites) {
  // Always rebuild favourites because they are subject to change.
  $scope.$on('$ionicView.enter', function(e) {
    $scope.favourites = Favourites.getAll();
    $scope.issues = [];

    for (var i = 0; i < $scope.favourites.length; i++) {
      var issue = DrupalOrg.getIssue($scope.favourites[i]);
      $q.when(issue).then(function(data) {
        data.hide = false;
        $scope.issues.push(data);
      });
    }
  });

  // Filter functions
  $scope.showFilters = false;
  $scope.toggleFilters = function() {
    $scope.showFilters = !$scope.showFilters;
  };

  // Remove and hide item from list.
  $scope.removeIssue = function(id) {
    for (var i = 0; i < $scope.issues.length; i++) {
      if ($scope.issues[i].nid == id) {
        $scope.issues[i].hide = true;
        break;
      }
    }
    Favourites.remove(id);
    $ionicListDelegate.closeOptionButtons();
  };
});

/**
 * Projects Controller.
 *
 * Load all projects into $state.
 */
module.controller('ProjectsCtrl', function($scope, config, $q, DrupalOrg) {
  $scope.projects = [];

  for (var i = 0; i < config.projectIds.length; i++) {
    // Process Issue caches.
    //DrupalOrg.cacheAllProjectIssues(config.projectIds[i]);

    var project = DrupalOrg.getProject(config.projectIds[i]);
    $q.when(project).then(function (data) {
      $scope.projects.push(data);
    });
  }
});

/**
 * Project Issues Controller.
 *
 * Load all issues from a project into $state.
 */
module.controller('ProjectIssuesCtrl', function($scope, $stateParams, $q, $ionicListDelegate, DrupalOrg, DrupalFields, Utils, Favourites) {
  Utils.notifyShow();
  $scope.projectId = $stateParams.projectId;
  $scope.issues = [];

  // Filter functions.
  $scope.saveIssue = function(id) {
    Favourites.add(id);
    $ionicListDelegate.closeOptionButtons();
  };
  $scope.showFilters = false;
  $scope.toggleFilters = function() {
    $scope.showFilters = !$scope.showFilters;
  };
  //$scope.clearFilters = function() {
  //  $scope.search = {};
  //};

  /**
   * Helper function to add a list of issues to $state.
   * @param issues
   */
  $scope.addIssues = function (issues) {
    for (var i = 0; i < issues.length; i++) {
      var issue = DrupalOrg.getIssue(issues[i].nid);

      $q.when(issue).then(function (data) {
        data.status_value = DrupalFields.getStatus(data.field_issue_status);
        $scope.issues.push(data);
      });
    }
  };

  // Add project metadata to $state.
  var project = DrupalOrg.getProject($scope.projectId);
  $q.when(project).then(function (data) {
    $scope.project = data;
  });

  // Add project issues to $state.
  var projectIssues = DrupalOrg.getProjectIssues($scope.projectId);
  $q.when(projectIssues).then(function (data) {
    $scope.addIssues(data.list);

    // Check if issue list is paginated and if it is get the most recent issues.
    if (data.hasOwnProperty('next')) {
      var uri = data.last.replace('node', 'node.json');
      var last = DrupalOrg.getURI(uri);
      $q.when(last).then(function (data) {
        $scope.addIssues(data.list);
        Utils.notifyHide();
      });
    }
    else {
      Utils.notifyHide();
    }
  });
});

/**
 * Project Issue Controller.
 *
 * Loads an Issue and its details into $state.
 */
module.controller('ProjectIssueCtrl', function($scope, $stateParams, $q, DrupalOrg, DrupalFields) {
  $scope.projectId = $stateParams.projectId;
  $scope.issueId = $stateParams.issueId;
  $scope.issue = {title:'Loading'};

  // Process Comment caches.
  //DrupalOrg.cacheAllIssueComments($scope.issueId);

  var issue = DrupalOrg.getIssue($scope.issueId);
  $q.when(issue).then(function (data) {
    $scope.issue = data;
    $scope.issue.status_value = DrupalFields.getStatus($scope.issue.field_issue_status);

    // Attach issue author.
    var author = DrupalOrg.getUser(data.author.id);
    $q.when(author).then(function (data) {
      $scope.author = data;
    });
  });


});

/**
 * Issue Comment Controller.
 *
 * Load all comments from a issue into $state.
 */
module.controller('IssueCommentsCtrl', function($scope, $stateParams, $q, $cordovaInAppBrowser, DrupalOrg) {
  $scope.projectId = $stateParams.projectId;
  $scope.issueId = $stateParams.issueId;
  $scope.issue = {title:'Loading'};
  $scope.displayFiles = {};
  $scope.comments = [];
  $scope.commentMap = {};
  $scope.files = [];
  $scope.goto = function(url) {
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
    $cordovaInAppBrowser.open(url, '_blank', options);
  };

  var issue = DrupalOrg.getIssue($scope.issueId);
  $q.when(issue).then(function (data) {
    $scope.issue = data;

    for (var i = 0; i < data.field_issue_files.length; i++) {
      if (JSON.parse(data.field_issue_files[i].display)) {
        $scope.displayFiles[data.field_issue_files[i].file.id] = 1;
      }
    }
  });

  var commentIds = DrupalOrg.getIssueComments($scope.issueId);
  $q.when(commentIds).then(function (data) {
    for (var i = 0; i < data.length; i++) {

      var comment = DrupalOrg.getComment(data[i]);
      $q.when(comment).then(function (data) {
        var j = $scope.comments.length;
        data.files = [];
        $scope.comments.push(data);
        $scope.commentMap[data.created] = j;

        // Add user data to comment author.
        //var authorData = DrupalOrg.getUser(data.author.id);
        //$q.when(authorData).then(function (data) {
        //  var comment = JSON.parse($scope.comment);
        //  delete $scope.comment;
        //  comment.author.data = data;
        //  $scope.comments.push(comment);
        //});
      });
    }
  });

  var fileIds = DrupalOrg.getIssueFiles($scope.issueId);
  $q.when(fileIds).then(function (data) {
    for (var i = 0; i < data.length; i++) {

      var file = DrupalOrg.getFile(data[i]);
      $q.when(file).then(function (data) {

        // Map file data onto related comment.
        if ($scope.commentMap.hasOwnProperty(data.timestamp)) {
          $scope.comments[$scope.commentMap[data.timestamp]].files.push(data);
        }

        // Add files to summary.
        if ($scope.displayFiles.hasOwnProperty(data.fid)) {
          $scope.files.push(data);
        }
      });
    }
  });
});