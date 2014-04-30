AngularApp.controller("indexController", ["$scope", "httpService", function($scope, httpService) {

  // This will hold the array of champion data.
  $scope.champions = [];

  // The predicate on which champion order will be ordered by.
  $scope.orderPredicate = "name";

  // The API endpoint that contains all champion data.
  var apiEndpoint = 'testData.json';

  // This is the callback function that executes if the HTTP requests returns
  // successfully.
  var getChampionsSuccess = function(payload, status) {
    // By default, Riot holds champions inside of an object. We need to
    // translate it to an array in order for Angular to work with it.
    var championObject = payload.data;
    var championArray = [];
    for (var champion in championObject) {
      if(championObject.hasOwnProperty(champion)){
        championArray.push(championObject[champion]);
      }
    }
    $scope.champions = championArray;
  };

  // This is the callback function that executes if the HTTP requests returns
  // unsuccessfully.
  var getChampionsFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getChampionsSuccess);

  // Controller 'method' for determining which skill slot a given skill
  // corresponds to.
  $scope.evaluateSkillSlot = function(index) {
    if      ( index === 0 ) { return "Q"; }
    else if ( index === 1 ) { return "W"; }
    else if ( index === 2 ) { return "E"; }
    else if ( index === 3 ) { return "R"; }
  };

}]);









