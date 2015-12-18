var app = angular.module('decoupled_auth', [
  'ionic',
  'decoupled_auth.controllers',
  'decoupled_auth.services',
  'yanniboi.login'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.constant('config', {
  appName: 'Decoupled Auth Tracker',
  appVersion: 1.0,
  projectIds: [2630282,1260650]
});

app.constant('configUser', {
  redirect: 'app.search'
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  });

  $stateProvider.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  });

  $stateProvider.state('app.projects', {
    url: '/projects',
    views: {
      'menuContent': {
        templateUrl: 'templates/projects.html',
        controller: 'ProjectsCtrl'
      }
    }
  });

  $stateProvider.state('app.issues', {
    url: '/projects/:projectId',
    views: {
      'menuContent': {
        templateUrl: 'templates/project.html',
        controller: 'ProjectIssuesCtrl'
      }
    }
  });

  $stateProvider.state('app.issue', {
    url: '/projects/:projectId/:issueId',
    views: {
      'menuContent': {
        templateUrl: 'templates/issue.html',
        controller: 'ProjectIssueCtrl'
      }
    }
  });

  $stateProvider.state('app.comments', {
    url: '/projects/:projectId/:issueId/comments',
    views: {
      'menuContent': {
        templateUrl: 'templates/comments.html',
        controller: 'IssueCommentsCtrl'
      }
    }
  });


  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'modules/login/templates/login.html',
    controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
