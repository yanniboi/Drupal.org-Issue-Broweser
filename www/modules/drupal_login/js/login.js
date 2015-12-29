var module = angular.module('yanniboi.drupal_login', ['yanniboi.utils']);

//module.constant('configUser', {
//  redirect: 'tab.dash',
//  domain: 'http://example.com/',
//  endpoint: 'api/',
//});

/**
 * Login Controller.
 *
 * Check to see if user is logged in and redirect.
 */
module.controller('LoginCtrl', function($scope, $state, DrupalLoginService, $timeout, $ionicPopup, CacheService, configUser, Utils) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.data = {};
  });

  if (DrupalLoginService.userLoggedIn()) {
    Utils.notify();

    // Load User information into Cache
    var user = CacheService.getVar('user');

    // Go to startscreen.
    $state.go(configUser.redirect);
  }

  $scope.login = function() {
    Utils.notifyShow();
    DrupalLoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function(user) {
        Utils.notifyHide();
        CacheService.setVar('userLoggedIn', true);
        CacheService.setVar('user', user);
        $state.go(configUser.redirect);
      })
      .error(function(error) {
        Utils.notifyHide();

        // Log the error.
        console.error('ERR', error);

        // Alert user.
        $ionicPopup.alert({
          title: 'Login failed!',
          template: error
        });
      });
  }
});

/**
 * Login Service.
 *
 * Handle login and user storage.
 */
module.service('DrupalLoginService', function($q, $state, $ionicHistory, $http, configUser, CacheService) {
  return {
    userLoggedIn: function() {
      return CacheService.getVar('userLoggedIn');
    },
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var attempt = this.userAuthenticate(name, pw);

      $q.when(attempt).then(function(resp) {
        if (resp.status == 200) {
          CacheService.setVar('user_session', resp.data);
          deferred.resolve(resp.data.user);
        }
        else {
          if (resp && resp.data.length) {
            deferred.reject(resp.data[0]);
          }
          deferred.reject('Wrong credentials.');
        }
      });
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    },
    logoutUser: function() {
      CacheService.setVar('userLoggedIn', false);
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
    },
    userAuthenticate: function(user, pass) {
      var allowedUsers = [
        {
          name: 'test',
          pass: 'pass'
        },
        {
          name: 'test2',
          pass: 'pass2'
        }
      ];

      // Admin override.
      for (var i = 0; i < allowedUsers.length; i++) {
        if (allowedUsers[i].name == user) {
          return (allowedUsers[i].pass == pass);
        }
      }

      // Drupal Login:
      console.log('Attempt Drupal login.');
      var url = configUser.domain + configUser.endpoint + 'user/login/';
      var postData = '{ "username" : "' + user + '", "password" : "' + pass + '" }';

      return $http.post(url, postData).then(function (resp) {
        console.log('User authenticated successfully.');
        return resp;
      }, function (err) {
        console.error('ERR', err);
        return err;
      });
    }
  }
});
