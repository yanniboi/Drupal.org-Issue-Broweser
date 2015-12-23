var module = angular.module('decoupled_auth.push', []);

/**
 * Pushservice factory to handle push notifications.
 */
module.factory('pushService', function($q, $window, $cordovaPush, $rootScope, $state) {
  // Configuration options.
  var androidConfig = {
    "senderID":"980621160609"
  };


  /**
   * Respond to push notification messages.
   */
  $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

    switch(notification.event) {
      // Registered and received token.
      case 'registered':
        if (notification.regid.length > 0 ) {
          console.log(notification.regid);
        }
        break;

      // Actual message sent from GCM.
      case 'message':
        console.log(JSON.stringify(notification));

        // Redirect to page given by notification.
        if (notification.payload.redirect) {
          switch(notification.payload.redirect.type) {
            case 'project':
              $state.go('app.issues', { projectId: notification.payload.redirect.project_id});
              break;

            case 'issue':
              $state.go('app.issue', {
                projectId: notification.payload.redirect.project_id,
                issueId: notification.payload.redirect.issue_id
              });
              break;

            case 'issue_comments':
              $state.go('app.comments', {
                projectId: notification.payload.redirect.project_id,
                issueId: notification.payload.redirect.issue_id
              });
              break;

          }
        }

        // Specific actions for foreground or background notifications.
        if ( notification.foreground ) {
          //alert("Notification Received");
        }
        else {  // otherwise we were launched because the user touched a notification in the notification tray.
          if ( notification.coldstart ) {
            //alert("coldstart");
          }
          else {
            //alert("other than coldstart");
          }
        }

        break;

      // Log errors.
      case 'error':
        alert('GCM error = ' + notification.msg);
        break;

      default:
        alert('An unknown GCM event has occurred');
        break;
    }
  });

  return {
    /**
     * Register callback to trigger plugin registration.
     * @returns {*}
     */
    register: function () {
      return $cordovaPush.register(androidConfig);
    }
  }
});
