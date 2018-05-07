app.controller('tripDetailCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout) {
    var searchObject = $location.search();
    console.log(searchObject.planID);
    $scope.planID = searchObject.planID;

    $scope.tripOverview;
    $scope.filteredAttractionList = [];
    getTripOverview();
    getTripDetail();
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
    function getTripDetail() {
        $http.get("https://plan360.ploytrip.com/api/planEntry/getPlanEntry.php", {
            params: { planID: $scope.planID }
        })
            .then(function (response) {
                $scope.tripDetail = response.data;
                // console.log($scope.tripDetail);
                $scope.tripDetail.forEach(function (item) {

                    // $scope.filteredPlanEntryList.push(item);
                    $http.get("https://plan360.ploytrip.com/api/attractions/getAttraction.php", {
                        params: { attractionID: item.attractionID }
                    })
                        .then(function (response) {
                            // console.log("GET ATTRACTION: ");
                            // $scope.filteredAttraction = response.data[0];
                            $scope.filteredAttractionList.push(response.data[0]);
                            // console.log(response.data[0]);

                            $scope.mergeList();
                            $scope.processListByDate();
                            createDayObject();
                            createTransportationList();
                            createAccomodationList();

                        })
                })


            });             // The function returns the product of p1 and p2
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
                $scope.tripOverview = response.data;
                $scope.tripName = $scope.tripOverview[0].tripName;
                var b = moment($scope.tripOverview[0].tripStart);
                var a = moment($scope.tripOverview[0].tripEnd);
                $scope.tripDayCount = a.diff(b, 'days');
                console.log($scope.tripDayCount)// 1

                // createDayObject($scope.tripDayCount);

            });             // The function returns the product of p1 and p2
    }

    function createDayObject() {


        $rootScope.groupedByDate = _.groupBy($scope.mergedFinalList, function (item) {
            var dateMoment = moment(item.visitStart);
            return dateMoment.day() + 1;
        });
        // console.log( $rootScope.groupedByDate);

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
});