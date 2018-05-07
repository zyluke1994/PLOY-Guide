app.controller('tripCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout,$routeParams) {

    console.log($routeParams.code);
function getTrips(customerID) {
    $http.get("https://plan360.ploytrip.com/api/plans/getPlans.php",{
        params: { customerID: customerID }
        
    })
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


$scope.loadPlanWithCode = function (code) {
    console.log("load"+code);
    // $location.url('/trip/'+code);
    $location.path('/trip/'+code);
   

  };
  $scope.loadPlan = function (planID) {
      console.log("clicked"+planID);
       $location.path('/tripDetail').search({planID: planID});
    };

});