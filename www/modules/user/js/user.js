var module = angular.module('yanniboi.user', ['yanniboi.login']);

/**
 * User Controller
 *
 * Loads demo user information into $state.
 */
module.controller('UserCtrl', function($scope, $state, LoginService) {
  $scope.data = {
    name: 'Yan',
    description: 'New user',
    date: 'Monday'
  };

  $scope.logout = function() {
    LoginService.logoutUser();
  };

  $scope.$on('$destroy', function() {
    LoginService.logoutUser();
  });

  $scope.$on('$ionicView.unloaded', function() {
    LoginService.logoutUser();

  });
});
