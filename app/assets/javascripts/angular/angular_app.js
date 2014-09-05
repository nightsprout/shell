// Create main Angular module/app.
var AngularApp = angular.module("AngularApp", ["ngRoute", "ngAnimate"]);

// Global Angular JavaScript code initialization.
// AngularApp.run(["$rootScope", function($rootScope) {  }]);

// Placeholder for a global filter.
// AngularApp.filter('filterName', function () {  });

// Set some easily accessible properties on $rootScope for use throughout the app.
AngularApp.run(['$rootScope', function($rootScope){
  // Property to hold the current year.
  $rootScope.currentYear = new Date().getFullYear();
}]);

