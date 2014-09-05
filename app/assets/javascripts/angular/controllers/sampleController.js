AngularApp.controller("sampleController", ["$scope", "httpService", function($scope, httpService) {

  // This object basically serves as the inventory data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.inventory = {};

  // This is an object that stores which table items are currently selected.
  // I used an object instead of an array because it is more performant.
  $scope.selectedItems = {};

  // This variable will store information regarding which table column to order the table by.
  $scope.activeColumn = null;

  // This variable will store information regarding whether table order is ascending or descending.
  $scope.reverse = null;

  // This string specifies where the API endpoint for this view resides.
  var apiEndpoint = '/sampleResponse.json';

  // This method is called whenever a selection is made.
  // It determines whether or not the selection should be included in the "selected" object.
  $scope.updateselectedItems = function(selectionState, selectionID) {
    if ( selectionState == false ) {
      delete $scope.selectedItems[selectionID];
    }
  };

  // This method is called whenever the user selects a sort column.
  // It sets which column to sort and toggles its ascending/descending state.
  $scope.setActiveColumn = function(desiredColumn) {
    $scope.activeColumn = desiredColumn;
    $scope.reverse = !$scope.reverse
  };

  // This method is a helper function that looks at various variables bound to scope.
  // It determines if a given column is ascending.
  $scope.columnIsAscending = function(desiredColumn) {
    if ( ( $scope.activeColumn == desiredColumn && ($scope.reverse == true || $scope.reverse == null) ) || ($scope.activeColumn != desiredColumn ) ) {
      return true;
    }
    else {
      return false;
    }
  };

  // This method is a helper function that looks at various variables bound to scope.
  // It determines if a given column is descending.
  $scope.columnIsDescending = function(desiredColumn) {
    if ( ( $scope.activeColumn == desiredColumn && ($scope.reverse == false || $scope.reverse == null) ) || ($scope.activeColumn != desiredColumn) ) {
      return true;
    }
    else {
      return false;
    }
  };

  // This is the callback function that executes if the HTTP requests returns successfully.
  var getModelSuccess = function(payload, status) {
    $scope.inventory = payload;
  };

  // This is the callback function that executes if the HTTP requests returns unsuccessfully.
  var getModelFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getModelSuccess);

}]);









