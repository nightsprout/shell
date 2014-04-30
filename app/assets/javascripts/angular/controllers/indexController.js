AngularApp.controller("indexController", ["$scope", "httpService", function($scope, httpService) {

  $scope.champions = {};

  var apiEndpoint = 'testData.json';

  // This is the callback function that executes if the HTTP requests returns successfully.
  var getChampionsSuccess = function(payload, status) {
    $scope.champions = payload.data; // Remove .data if API is not formatted to store data in a data property.
  };

  // This is the callback function that executes if the HTTP requests returns unsuccessfully.
  var getChampionsFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getChampionsSuccess);

}]);









