AngularApp.controller("masteriesController", ["$scope", "httpService", function($scope, httpService) {

  // This will hold the mastery data.
  $scope.masteries = {};

  // Mastery Background: //ddragon.leagueoflegends.com/cdn/img/mastery/masteryback.jpg
  $scope.spellImagePath = "//ddragon.leagueoflegends.com/cdn/4.6.3/img/mastery/";

  // This will hold the number of skill points the summoner has.
  $scope.skillPointsRemaining = 30;

  // This is the data structure for the mastery tree.
  $scope.masteryTree = {};

  // This is the data structure that shows which masteries are prerequisites.
  // The format is { baseMastery: dependentMastery }.
  $scope.masteryDependencyMap = {};

  // The API endpoint that contains all champion data.
  var apiEndpoint = 'testData2.json';

  // This is the callback function that executes if the HTTP requests returns
  // successfully.
  var getMasteriesSuccess = function(payload, status) {

    // Set mastery data object to data returned.
    $scope.masteries = payload.data;

    // Create an array of mastery indices.
    // Meanwhile, also create a map of masteries which have dependent masteries.
    var masteryIndex = [];
    var dependencyMap = {};
    for (var mastery in payload.data) {
      if(payload.data.hasOwnProperty(mastery)){
        masteryIndex.push(mastery);
        dependencyMap[payload.data[mastery].prereq] = payload.data[mastery].id;
      }
    }

    $scope.masteryDependencyMap = dependencyMap;

    // We will also create a data model for the mastery tree. First, we will
    // specify a template for the mastery tree. Then we will populate it with
    // data from the masteries object.
    var masteryTreeTemplate = {
      offense: {
        tier1: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier2: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier3: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier4: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier5: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier6: [ [null, 0], [null, 0], [null, 0], [null, 0] ]
      },
      defense: {
        tier1: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier2: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier3: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier4: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier5: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier6: [ [null, 0], [null, 0], [null, 0], [null, 0] ]
      },
      utility: {
        tier1: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier2: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier3: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier4: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier5: [ [null, 0], [null, 0], [null, 0], [null, 0] ],
        tier6: [ [null, 0], [null, 0], [null, 0], [null, 0] ]
      }
    };
    // Using the array of mastery indexes, examine the index to determine where
    // in the tree to place the mastery's data (as an object), then place the
    // data.
    for(var i=0; i < masteryIndex.length; i++) {
      if      ( masteryIndex[i].charAt(1) === "1" ) {
        masteryTreeTemplate.offense["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1][0] = payload.data[masteryIndex[i]];
      }
      else if ( masteryIndex[i].charAt(1) === "2" ) {
        masteryTreeTemplate.defense["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1][0] = payload.data[masteryIndex[i]];
      }
      else if ( masteryIndex[i].charAt(1) === "3" ) {
        masteryTreeTemplate.utility["tier" + masteryIndex[i].charAt(2)][masteryIndex[i].charAt(3) - 1][0] = payload.data[masteryIndex[i]];
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

  $scope.incrementSkillRank = function(branch, tier, index, prerequisite, masteryId) {
    var prerequisiteIsMet = function() {
      var prerequisiteBranch = prerequisite.toString().charAt(1);
      var prerequisiteTier = prerequisite.toString().charAt(2);
      var prerequisiteIndex = prerequisite.toString().charAt(3);
      if ( prerequisite == 0 ) { return true; }
      else if ( prerequisiteBranch == 1 && $scope.masteryTree.offense["tier" + prerequisiteTier][prerequisiteIndex - 1][1] == $scope.masteries[prerequisite].ranks ) { return true; }
      else if ( prerequisiteBranch == 2 && $scope.masteryTree.defense["tier" + prerequisiteTier][prerequisiteIndex - 1][1] == $scope.masteries[prerequisite].ranks ) { return true; }
      else if ( prerequisiteBranch == 3 && $scope.masteryTree.utility["tier" + prerequisiteTier][prerequisiteIndex - 1][1] == $scope.masteries[prerequisite].ranks ) { return true; }
      else { return false; }
    };
    var hasSufficientPoints = function() {
      if ( $scope.skillPointsRemaining > 0 ) { return true; }
      else { return false; }
    }
    var meetsPointsPrerequisite = function() {
      var totalPoints = 0;
      for(var i=1; i < tier; i++) {
        totalPoints = totalPoints + $scope.masteryTree[branch]["tier" + i][0][1] + $scope.masteryTree[branch]["tier" + i][1][1] + $scope.masteryTree[branch]["tier" + i][2][1] + $scope.masteryTree[branch]["tier" + i][3][1];
      }
      if ( totalPoints >= ((tier-1)*4) ) { return true; }
      else { return false; }
    };
    if ( meetsPointsPrerequisite() && $scope.masteryTree[branch]["tier" + tier][index][1] < $scope.masteryTree[branch]["tier" + tier][index][0].ranks && hasSufficientPoints() && prerequisiteIsMet() ) {
      $scope.masteryTree[branch]["tier" + tier][index][1]++;
      $scope.skillPointsRemaining--;
    }
  };

  $scope.decrementSkillRank = function(branch, tier, index, prerequisite, masteryId) {
    var hasReliantSkill = function() {
      var reliantSkill = null;
      if ( $scope.masteryDependencyMap[masteryId] ) {
        reliantSkill = $scope.masteryDependencyMap[masteryId];
        var reliantSkillBranch = reliantSkill.toString().charAt(1);
        var reliantSkillTier = reliantSkill.toString().charAt(2);
        var reliantSkillIndex = reliantSkill.toString().charAt(3);
        if ( reliantSkill == 0 ) { return true; }
        else if ( reliantSkillBranch == 1 && $scope.masteryTree.offense["tier" + reliantSkillTier][reliantSkillIndex - 1][1] > 0 ) { return true; }
        else if ( reliantSkillBranch == 2 && $scope.masteryTree.defense["tier" + reliantSkillTier][reliantSkillIndex - 1][1] > 0 ) { return true; }
        else if ( reliantSkillBranch == 3 && $scope.masteryTree.utility["tier" + reliantSkillTier][reliantSkillIndex - 1][1] > 0 ) { return true; }
        else { return false; }
      }
      else { return false; }
    };
    var canRefundPoint = function() {
      if ( $scope.skillPointsRemaining < 30 ) { return true; }
      else { return false; }
    }
    var meetsPointsPrerequisite = function() {
      var totalPoints = 0;
      for(var i=1; i < tier; i++) {
        totalPoints = totalPoints + $scope.masteryTree[branch]["tier" + i][0][1] + $scope.masteryTree[branch]["tier" + i][1][1] + $scope.masteryTree[branch]["tier" + i][2][1] + $scope.masteryTree[branch]["tier" + i][3][1];
      }
      if ( totalPoints >= ((tier-1)*4) ) { return true; }
      else { return false; }
    };
    var meetsPointsPrerequisiteExcessively = function() {
      var totalPoints = 0;
      for(var i=1; i <= tier; i++) {
        totalPoints = totalPoints + $scope.masteryTree[branch]["tier" + i][0][1] + $scope.masteryTree[branch]["tier" + i][1][1] + $scope.masteryTree[branch]["tier" + i][2][1] + $scope.masteryTree[branch]["tier" + i][3][1];
      }
      if ( totalPoints > (tier*4) ) { return true; }
      else { return false; }
    };
    var hasMasteriesAbove = function() {
      var pointsAbove = 0;
      var startingTier = parseInt(tier) + 1;
      for(var i=startingTier; i <= 6; i++) {
        pointsAbove = pointsAbove + $scope.masteryTree[branch]["tier" + i][0][1] + $scope.masteryTree[branch]["tier" + i][1][1] + $scope.masteryTree[branch]["tier" + i][2][1] + $scope.masteryTree[branch]["tier" + i][3][1];
      }
      if ( pointsAbove > 0 ) { return true; }
      else { return false; }
    };
    var meetsDependencies = function() {
      if      ( meetsPointsPrerequisite() && !hasMasteriesAbove() )           { return true; }
      else if ( meetsPointsPrerequisiteExcessively() && hasMasteriesAbove() ) { return true; }
      else                                                                    { return false; }
    };
    if ( meetsDependencies() && $scope.masteryTree[branch]["tier" + tier][index][1] > 0 && canRefundPoint() && !hasReliantSkill() ) {
      $scope.masteryTree[branch]["tier" + tier][index][1]--;
      $scope.skillPointsRemaining++;
    }
  };

}]);









