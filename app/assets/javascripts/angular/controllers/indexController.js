AngularApp.controller("indexController", ["$scope", "httpService", function($scope, httpService) {

  $scope.champions = [];

  $scope.orderPredicate = "name";

  var apiEndpoint = 'testData.json';

  // This is the callback function that executes if the HTTP requests returns successfully.
  var getChampionsSuccess = function(payload, status) {
    var championObject = payload.data;
    var championArray = [];
    for (var champion in championObject) {
      if(championObject.hasOwnProperty(champion)){
        championArray.push(championObject[champion]);
      }
    }
    $scope.champions = championArray;
  };

  // This is the callback function that executes if the HTTP requests returns unsuccessfully.
  var getChampionsFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getChampionsSuccess);

  $scope.evaluateSkillSlot = function(index) {
    if ( index === 0 ) {      return "Q"; }
    else if ( index === 1 ) { return "W"; }
    else if ( index === 2 ) { return "E"; }
    else if ( index === 3 ) { return "R"; }
  };

}]);









