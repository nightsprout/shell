AngularApp.controller("masteriesController", ["$scope", "httpService", function($scope, httpService) {

  // This will hold the mastery data.
  $scope.masteries = {};

  // This is the data structure for the mastery tree.
  $scope.masteryTree = {};

  // The API endpoint that contains all champion data.
  var apiEndpoint = 'testData2.json';

  // This is the callback function that executes if the HTTP requests returns
  // successfully.
  var getMasteriesSuccess = function(payload, status) {

    // Set mastery data object to data returned.
    $scope.masteries = payload.data;
    // Obtain an index of IDs (all properties on masteries object) as array and
    // then assign it to masteriesIndex on scope.
    var masteryIndex = [];
    for (var mastery in payload.data) {
      if(payload.data.hasOwnProperty(mastery)){
        masteryIndex.push(mastery);
      }
    }

    // We will also create a data model for the mastery tree. First, we will
    // specify a template for the mastery tree. Then we will populate it with
    // data from the masteries object.
    var masteryTreeTemplate = {
      offense: {
        tier1: [ null, null, null, null ],
        tier2: [ null, null, null, null ],
        tier3: [ null, null, null, null ],
        tier4: [ null, null, null, null ],
        tier5: [ null, null, null, null ],
        tier6: [ null, null, null, null ]
      },
      defense: {
        tier1: [ null, null, null, null ],
        tier2: [ null, null, null, null ],
        tier3: [ null, null, null, null ],
        tier4: [ null, null, null, null ],
        tier5: [ null, null, null, null ],
        tier6: [ null, null, null, null ]
      },
      utility: {
        tier1: [ null, null, null, null ],
        tier2: [ null, null, null, null ],
        tier3: [ null, null, null, null ],
        tier4: [ null, null, null, null ],
        tier5: [ null, null, null, null ],
        tier6: [ null, null, null, null ]
      }
    };
    // Using the array of mastery indexes, examine the index to determine where
    // in the tree to place the mastery's data (as an object), then place the
    // data.
    for(var i=0; i < masteryIndex.length; i++) {
      if      ( masteryIndex[i].charAt(1) === "1" ) {
        masteryTreeTemplate.offense["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1] = payload.data[masteryIndex[i]];
      }
      else if ( masteryIndex[i].charAt(1) === "2" ) {
        masteryTreeTemplate.defense["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1] = payload.data[masteryIndex[i]];
      }
      else if ( masteryIndex[i].charAt(1) === "3" ) {
        masteryTreeTemplate.utility["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1] = payload.data[masteryIndex[i]];
      }
    }
    // Assign data object to scope.
    $scope.masteryTree = masteryTreeTemplate;

  };

  // This is the callback function that executes if the HTTP requests returns
  // unsuccessfully.
  var getMasteriesFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getMasteriesSuccess);

}]);









