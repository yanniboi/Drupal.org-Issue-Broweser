var module = angular.module('decoupled_auth.controllers', []);

/**
 * App Controller.
 *
 * Handle modal popup for logout event.
 */
module.controller('AppCtrl', function($scope, $ionicModal, $timeout, Utils, DrupalOrg, LoginService) {
  $scope.$on('$ionicView.enter', function(e) {
    $timeout(function() {
      Utils.notifyHide();
    }, 1000);
  });

  // Process Project caches.
  DrupalOrg.cacheAllProjects();

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
 * Projects Controller.
 *
 * Load all projects into $state.
 */
module.controller('ProjectsCtrl', function($scope, config, DrupalOrg) {
  $scope.projects = [];

  for (var i = 0; i < config.projectIds.length; i++) {
    // Process Issue caches.
    DrupalOrg.cacheAllProjectIssues(config.projectIds[i]);

    var project = DrupalOrg.getProject(config.projectIds[i]);
    $scope.projects.push(project);
  }

});

/**
 * Project Issues Controller.
 *
 * Load all issues from a project into $state.
 */
module.controller('ProjectIssuesCtrl', function($scope, $stateParams, DrupalOrg, DrupalFields) {
  $scope.projectId = $stateParams.projectId;
  $scope.project = DrupalOrg.getProject($scope.projectId);
  var projectIssues = DrupalOrg.getProjectIssues($scope.projectId);

  $scope.issues = [];
  for (var i = 0; i < projectIssues.length; i++) {
    var issue = DrupalOrg.getIssue(projectIssues[i]);
    issue.status_value = DrupalFields.getStatus(issue.field_issue_status);
    $scope.issues.push(issue);
  }
});

/**
 * Project Issue Controller.
 *
 * Loads an Issue and its details into $state.
 */
module.controller('ProjectIssueCtrl', function($scope, $stateParams, DrupalOrg, DrupalFields) {
  $scope.projectId = $stateParams.projectId;
  $scope.issueId = $stateParams.issueId;

  // Process Comment caches.
  DrupalOrg.cacheAllIssueComments($scope.issueId);

  $scope.issue = DrupalOrg.getIssue($scope.issueId);
  $scope.issue.status_value = DrupalFields.getStatus($scope.issue.field_issue_status);
});

/**
 * Issue Comment Controller.
 *
 * Load all comments from a issue into $state.
 */
module.controller('IssueCommentsCtrl', function($scope, $stateParams, DrupalOrg) {
  $scope.projectId = $stateParams.projectId;
  $scope.issueId = $stateParams.issueId;

  $scope.issue = DrupalOrg.getIssue($scope.issueId);
  var commentIds = DrupalOrg.getIssueComments($scope.issueId);

  $scope.comments = [];
  for (var i = 0; i < commentIds.length; i++) {
    var comment = DrupalOrg.getComment(commentIds[i]);

    // Add user data to comment author.
    comment.author.data = DrupalOrg.getUser(comment.author.id);
    $scope.comments.push(comment);
  }
});