// **************************************************
// Begin: "Throbber Plugin"
// **************************************************



// This plugin creates a throbber.

// The throbber shows whenever an HTTP request has been made.
// It hides whenever that HTTP request has been completed.



AngularApp.run(['$rootScope', function($rootScope){

  // Initialize the "Throbber Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.throbber = {};

  // Set a property on root scope that determines whether or not the warning popup is visible.
  $rootScope.nsStateMachine.throbber.isVisible = false;

    // Set a property on root scope that determines whether or not the warning popup is visible.
  $rootScope.nsStateMachine.throbber.activeRequests = 0;

  // Some views may have multiple tables.
  // This object stores the the states of multiple tables.
  // The states we track are current column and sort direction.
  //
  // This is the JSON schema it works with:
  //
  // nsStateMachine.dataTable.state = {
  //   table1: {
  //     currentColumn: "column1",
  //     reverseState: true
  //   },
  //   table1: {
  //     currentColumn: "column3",
  //     reverseState: false
  //   }
  // }

}]);





AngularApp.factory('throbber', ["$rootScope", function($rootScope) {
  var throbber = {
    request: function(config) {
      $rootScope.nsStateMachine.throbber.activeRequests = $rootScope.nsStateMachine.throbber.activeRequests + 1;
      $rootScope.nsStateMachine.throbber.isVisible = true;
      return config;
    },
    response: function(response) {
      $rootScope.nsStateMachine.throbber.activeRequests = $rootScope.nsStateMachine.throbber.activeRequests - 1;
      if ( $rootScope.nsStateMachine.throbber.activeRequests === 0 ) {
        $rootScope.nsStateMachine.throbber.isVisible = false;
      }
      return response;
    }
  };
  return throbber;
}]);

AngularApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('throbber');
}]);






// **************************************************
// End: "Throbber Plugin"
// **************************************************


























