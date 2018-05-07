app.controller('myTripsCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout) {
getCustomerInfo();
getTrips();
function getTrips() {
    $http.get("https://plan360.ploytrip.com/api/plans/getPlans.php")
    .then(function (response) {
      $scope.myTrips = response.data;
      console.log($scope.myTrips);
    });             // The function returns the product of p1 and p2
}
function getCustomerInfo() {
    $http.get("https://plan360.ploytrip.com/api/customers/getCustomer.php", {
                        params: { username: $rootScope.globals.currentUser.username }
                    })
    .then(function (response) {
      $rootScope.customerInfo = response.data;
      console.log($rootScope.customerInfo);
    });             // The function returns the product of p1 and p2
}



  $scope.loadPlan = function (planID) {
      console.log("clicked"+planID);
       $location.path('/tripDetail').search({planID: planID});
    };

});