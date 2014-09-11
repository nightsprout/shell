AngularApp.controller("sampleController", ["$scope", "httpService", function($scope, httpService) {

  // This object basically serves as the inventory data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.inventory = {};

  // This object basically serves as the piece data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.piece = {};

  // This is an object that stores which table items are currently selected.
  // I used an object instead of an array because it is more performant.
  $scope.selectedItems = {};

  // Some views may have multiple tables.
  // This object stores the the states of multiple tables.
  // The states we track are current column and sort direction.
  //
  // This is the JSON schema it works with:
  //
  // var exampleTableStates = {
  //   table1: {
  //     currentColumn: "column1",
  //     reverseState: true
  //   },
  //   table1: {
  //     currentColumn: "column3",
  //     reverseState: false
  //   }
  // }
  $scope.tableStates = {};

  // These strings specify where the API endpoints for this view reside.
  var apiEndpoint1 = '/sampleResponse.json';
  var apiEndpoint2 = '/sampleResponse2.json';

  // This method is called whenever a selection is made.
  // It determines whether or not the selection should be included in the "selected" object.
  $scope.updateselectedItems = function(selectionState, selectionID) {
    if ( selectionState == false ) {
      delete $scope.selectedItems[selectionID];
    }
  };

  // This method is called whenever the user selects a sort column.
  // It accesses the tableStates object to set the desired table's state (active column and sort direction).
  // If the tableStates object does not have a state for the desired table, it creates it.
  $scope.setActiveColumn = function(desiredTable, desiredColumn) {
    // Handle the case where the tableStates object is already tracking the desired table's state.
    if ( $scope.tableStates[desiredTable] ) {
      $scope.tableStates[desiredTable]['currentColumn'] = desiredColumn;
      // Determine the sort direction.
      if ( $scope.tableStates[desiredTable]['reverseState'] === true ) {
        $scope.tableStates[desiredTable]['reverseState'] = false;
      }
      else {
        $scope.tableStates[desiredTable]['reverseState'] = true;
      }
    }
    // Handle the case where the tableStates object is not already tracking the desired table's state.
    else {
      $scope.tableStates[desiredTable] = {};
      $scope.tableStates[desiredTable]['currentColumn'] = desiredColumn;
      $scope.tableStates[desiredTable]['reverseState'] = true;
    }
  };

  // This method is a helper function that looks at the tableStates object.
  // It determines if a given column in a given table is ascending.
  $scope.columnIsAscending = function(desiredTable, desiredColumn) {
    if ( $scope.tableStates[desiredTable] === undefined || $scope.tableStates[desiredTable]['currentColumn'] != desiredColumn || $scope.tableStates[desiredTable]['reverseState'] === true ) {
      return true
    }
    else {
      return false
    }
  };

  // This method is a helper function that looks at the tableStates object.
  // It determines if a given column in a given table is descending.
  $scope.columnIsDescending = function(desiredTable, desiredColumn) {
    if ( $scope.tableStates[desiredTable] === undefined || $scope.tableStates[desiredTable]['currentColumn'] != desiredColumn || $scope.tableStates[desiredTable]['reverseState'] === false ) {
      return true
    }
    else {
      return false
    }
  };

  // This is the callback function that executes if the HTTP request for $scope.inventory returns successfully.
  var getInventorySuccess = function(payload, status) { $scope.inventory = payload; };
  // This is the callback function that executes if the HTTP request for $scope.inventory returns unsuccessfully.
  var getInventoryFailure = function(payload, status) {};

  // This is the callback function that executes if the HTTP request for $scope.piece returns successfully.
  var getPieceSuccess =     function(payload, status) { $scope.piece = payload; };
  // This is the callback function that executes if the HTTP request for $scope.piece returns unsuccessfully.
  var getPieceFailure =     function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint1).success(getInventorySuccess);
  httpService.getApiEndpoint(apiEndpoint2).success(getPieceSuccess);

}]);









