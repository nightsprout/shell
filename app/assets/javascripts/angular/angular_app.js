// Create main Angular module/app.
var AngularApp = angular.module("AngularApp", ["ngRoute", "ngAnimate"]);

// Placeholder for a global filter.
// AngularApp.filter('filterName', function () {  });

// Set some easily accessible properties on $rootScope for use throughout the app.
AngularApp.run(['$rootScope', '$window', function($rootScope, $window){

  // Object for holding all Nightsprout boilerplate functionality.
  // Tentatively, we refer to this as "Nightsprout State Machine".
  $rootScope.nsStateMachine = {

    // Property to hold the current year.
    'currentYear': new Date().getFullYear(),

    // Property to manage the navigation drawer.
    // It store its open/closed state.
    // It has methods for showing/hiding/toggling the drawer.
    'navDrawer': {
      'isVisible': false,
      'show':   function() { $rootScope.nsStateMachine.navDrawer.isVisible = true;  },
      'hide':   function() { $rootScope.nsStateMachine.navDrawer.isVisible = false; },
      'toggle': function() { $rootScope.nsStateMachine.navDrawer.isVisible = !$rootScope.nsStateMachine.navDrawer.isVisible; }
    },

  };


}]);

