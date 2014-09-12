// **************************************************
// Begin: "Warning Popup Plugin"
// **************************************************

// This plugin creates a warning popup.

// It accepts a callback function that is executed if the warning is confirmed.
// It accepts an array of arguments to pass to the callback function.
// It accepts an string that will serve as the warning header text.
// It accepts an string that will serve as the warning body text.

// To use this plugin, call it from an event in the following manner:
// $rootScope.nsStateMachine.warningPopup.showWarning(callbackFunction, callbackFunctionArguments, headerText, bodyText);

AngularApp.run(['$rootScope', function($rootScope){

  // Initialize the "Warning Popup Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.warningPopup = {};

  // Set a property on root scope that determines whether or not the warning popup is visible.
  $rootScope.nsStateMachine.warningPopup.warningIsVisible = false;

  // Set a property on root scope that stores a callback function.
  // This callback function is passed to the warning popup.
  // If the warning popup is accepted, it executes.
  $rootScope.nsStateMachine.warningPopup.warningCallbackFunction = null;

  // Set a property in root scope that stores the function for dismissing the warning popup.
  $rootScope.nsStateMachine.warningPopup.closeWarning = function() {
    $rootScope.nsStateMachine.warningPopup.warningIsVisible = false;
    $rootScope.nsStateMachine.warningPopup.warningHeaderText = "Are you sure?";
    $rootScope.nsStateMachine.warningPopup.warningBodyText = "The action you are about to take will overwrite existing data. Proceed with caution.";
  };

  // Set a property on root scope the warning popup's header text.
  $rootScope.nsStateMachine.warningPopup.warningHeaderText = "Are you sure?";

  // Set a property on root scope the warning popup's body text.
  $rootScope.nsStateMachine.warningPopup.warningBodyText = "The action you are about to take will overwrite existing data. Proceed with caution.";

  // This is the main function call to create the warning popup.
  // It accepts a callback function that is executed if the warning is confirmed.
  // It accepts an array of arguments to pass to the callback function.
  // It accepts an string that will serve as the warning header text.
  // It accepts an string that will serve as the warning body text.
  $rootScope.nsStateMachine.warningPopup.showWarning = function(callbackFunction, callbackArguments, headerText, bodyText) {
    $rootScope.nsStateMachine.warningPopup.warningHeaderText = headerText;
    $rootScope.nsStateMachine.warningPopup.warningBodyText = bodyText;
    $rootScope.nsStateMachine.warningPopup.warningIsVisible = true;
    $rootScope.nsStateMachine.warningPopup.warningCallbackFunction = function() {
      callbackFunction.apply(null, callbackArguments);
      $rootScope.nsStateMachine.warningPopup.closeWarning();
    };
  };

}]);

// **************************************************
// End: "Warning Popup Plugin"
// **************************************************


























