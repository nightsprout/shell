// Create main Angular module/app.
var AngularApp = angular.module("AngularApp", ["ngRoute", "ngAnimate"]);

// Global Angular JavaScript code initialization.
// AngularApp.run(["$rootScope", function($rootScope) {  }]);

// Placeholder for a global filter.
// AngularApp.filter('filterName', function () {  });

// Set some easily accessible properties on $rootScope for use throughout the app.
AngularApp.run(['$rootScope', function($rootScope){

  // Object for holding all Nightsprout boilerplate functionality.
  // Tentatively, we refer to this as "Nightsprout State Machine".
  $rootScope.nsStateMachine = {
    // Property to hold the current year.
    'currentYear': new Date().getFullYear()
  };

}]);

