var module = angular.module('yanniboi.login', ['yanniboi.utils']);

//module.constant('configUser', {
//  redirect: 'tab.dash',
//});

/**
 * Login Controller.
 *
 * Check to see if user is logged in and redirect.
 */
module.controller('LoginCtrl', function($scope, $state, LoginService, $timeout, $ionicPopup, CacheService, configUser, Utils) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.data = {};
  });

  if (LoginService.userLoggedIn()) {
    Utils.notify();

    // Load User information into Cache
    var user = localStorage.getItem('user');
    CacheService.setVar('user', JSON.parse(user));

    // Go to startscreen.
    $state.go(configUser.redirect);
  }

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function() {
        var user = {
          username: $scope.data.username
        };
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(user));
        CacheService.setVar('user', user);
        $state.go(configUser.redirect);
      })
      .error(function(error) {
        // Log the error.
        console.log(error);

        // Alert user.
        $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
  }
});

/**
 * Login Service.
 *
 * Handle login and user storage.
 */
module.service('LoginService', function($q, $state) {
  return {
    userLoggedIn: function() {
      return JSON.parse(localStorage.getItem('userLoggedIn'));
    },
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (this.userAuthenticate(name, pw)) {
        deferred.resolve('Welcome ' + name + '!');
      }
      else {
        deferred.reject('Wrong credentials.');
      }


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
      localStorage.setItem('userLoggedIn', false);
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

      for (var i = 0; i < allowedUsers.length; i++) {
        if (allowedUsers[i].name == user) {
          return (allowedUsers[i].pass == pass);
        }
      }

      return false;
    }
  }
});
