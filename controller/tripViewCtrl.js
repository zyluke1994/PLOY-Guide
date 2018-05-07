app.controller('tripViewCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout,$routeParams) {

    console.log($routeParams.code);
    $scope.planID = $routeParams.code;
    $scope.tripOverview;
    $scope.filteredAttractionList = [];
    $scope.activeItemIndex = -1;
    $scope.showDestinationInfo = true;
    var  day = 0;   
    if($scope.planID!=null || $scope.planID!=undefined){
        decodePlanCode();
    } 

    getTripDetail();
    getTripOverview();
    $scope.mergeList = function () {
        //map attraction based on planEntry
        $scope.mergedFinalList = _.map($scope.tripDetail, function (item) {
            // var findWhere = _.findWhere($scope.filteredAttractionList, { 'attractionID': item.attractionID });
            // var extend = _.extend(item,findWhere);
            // return extend;


            return _.extend(item, _.findWhere($scope.filteredAttractionList, { 'attractionID': item.attractionID }));
        });



        // console.log($scope.mergedFinalList);
    };
    function decodePlanCode(){
        console.log($scope.planID);
        $scope.decode = ($scope.planID-123)/2;
        console.log($scope.decode);
        var customerLength = $scope.decode.toString().substring($scope.decode.toString().length-2,$scope.decode.toString().length);
        console.log(customerLength);
        var customer = $scope.decode.toString().substring(0,customerLength);
        var plan = $scope.decode.toString().substring(customer.length,$scope.decode.toString().length-2);
        console.log("plan id:"+plan);
        $scope.planID = plan;

    }
    
    function getTripDetail() {
        $http.get("https://plan360.ploytrip.com/api/planEntry/getPlanEntry.php", {
            params: { planID: $scope.planID }
        })
            .then(function (response) {
                $scope.tripDetail = response.data;
                if($scope.tripDetail.includes("expects parameter 1 to be mysqli_result") || typeof $scope.tripDetail == "string"){
                    $scope.noTripFound = true;
                }else{
                    $scope.noTripFound = false;

                };
                console.log(response);
                console.log($scope.tripDetail.length);
                console.log(typeof $scope.tripDetail);

                $scope.tripDetail.forEach(function (item) {

                    // $scope.filteredPlanEntryList.push(item);
                    $http.get("https://plan360.ploytrip.com/api/attractions/getAttraction.php", {
                        params: { attractionID: item.attractionID }
                    })
                        .then(function (response) {
                            console.log("GET ATTRACTION: ");
                            // $scope.filteredAttraction = response.data[0];
                            $scope.filteredAttractionList.push(response.data[0]);
                            console.log(response.data[0]);

                            $scope.mergeList();
                            $scope.processListByDate();
                            createDayObject();
                            day++;
                            createTransportationList();
                            createAccomodationList();

                        })
                })


            });             // The function returns the product of p1 and p2
    }
    $scope.showSelectedDay = function(selectedDayItem, activeItemIndex){
        console.log(selectedDayItem);
        console.log(activeItemIndex);

        $scope.showDestinationInfo = false;
        $scope.activeItemIndex = activeItemIndex;
        $scope.selectedDayItem = selectedDayItem;
        $scope.dailyHeadingTitle = "Day "+($scope.processByDateList.indexOf(selectedDayItem)+1)+" - "+moment(selectedDayItem.dateList).format('MMM DD YYYY');        ;
    }
    $scope.showDestinationMsgBtn = function () {
        $scope.showDestinationInfo = true;
        $scope.activeItemIndex = -1;
        $scope.dailyHeadingTitle = "Trip Info & Documents";

        // if ($scope.showDestinationMsg === "Show Destination Info") {
        //     $scope.showDestinationMsg = "Hide Destination Info";

        // } else {
        //     $scope.showDestinationMsg = "Show Destination Info";

        // }
    }
    $scope.processListByDate = function () {
        // $scope.processPlanStatus = 0;
        // $scope.processPlanStatusMax = $scope.filteredPlanEntryList.length;

        $scope.processByDateList = [];

        $scope.mergedFinalList.forEach(function (item) {
            // $scope.processPlanStatus = $scope.processPlanStatus + 1;

            var date = new Date(item.visitStart).toDateString();
            var obj = {};
            obj["content"] = [];
            obj["dateList"] = new Date(date).toString();
            if (_.findWhere($scope.processByDateList, { dateList: new Date(date).toString() })) {
                _.findWhere($scope.processByDateList, { dateList: new Date(date).toString() }).content.push(item);
            } else {
                obj["content"].push(item);
                $scope.processByDateList.push(obj);

            }
        });

        // console.log( $scope.processByDateList);
        // $timeout(function () { $scope.processPlanStatusBar = false; }, 2500);
        $timeout(function () { $scope.dataLoading = false; }, 2500);
        // console.log($scope.mergedFinalList);


    };
    function getTripOverview() {
        $http.get("https://plan360.ploytrip.com/api/plans/getPlans.php", {
            params: { planID: $scope.planID }
        })
            .then(function (response) {
                $scope.tripOverview = response.data[0];
                $scope.tripName = $scope.tripOverview.tripName;
                var b = moment($scope.tripOverview.tripStart);
                var a = moment($scope.tripOverview.tripEnd);
                $scope.tripDayCount = a.diff(b, 'days');
                console.log(response);
                console.log($scope.tripDayCount)// 1

                // createDayObject($scope.tripDayCount);

            });             // The function returns the product of p1 and p2
    }
    function createDayObject() {


        $rootScope.groupedByDate = _.groupBy($scope.mergedFinalList, function (item) {
            var dateMoment = moment(item.visitStart);
            return dateMoment.day() + 1;
            //return dateMoment.format('LL');
        });
        //console.log( $rootScope.groupedByDate);

    };
    function createTransportationList() {

        $scope.findByTransportation = _.where($scope.mergedFinalList, { category: "Transportation" });
        // console.log( $scope.findByTransportation);

    }
    function createAccomodationList() {

        $scope.findByAccomodation = _.where($scope.mergedFinalList, { category: "Accommodations" });
        // console.log( $scope.findByAccomodation);

    }

   



    $scope.loadDay = function (planID, day) {
        console.log("clicked" + day);
        $location.path('/dayDetail').search({ planID: planID, d: day });
    };


$scope.loadPlanWithCode = function (code) {
    console.log("load"+code);
    $location.url('/trip/'+code);
    //$location.path('/trip/'+code);
   

  };
  $scope.loadPlan = function (planID) {
      console.log("clicked"+planID);
       $location.path('/tripDetail').search({planID: planID});
    };

});