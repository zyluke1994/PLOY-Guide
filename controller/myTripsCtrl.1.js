app.controller('myTripsCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout) {
function getTrips() {
    $http.get("http://plan360.ploytrip.com/api/plans/getPlans.php")
    .then(function (response) {
      $scope.myTrips = response.data;
      console.log($scope.myTrips);
    });             // The function returns the product of p1 and p2
}



  $scope.loadPlan = function (planID) {
      console.log("clicked"+planID);
       $location.path('/tripDetail').search({planID: planID});
    };

});