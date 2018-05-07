function initMap() {
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 8,
    //   center: {lat: 40.731, lng: -73.997}
    // });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

}

app.controller('dayDetailCtrl', function ($scope, $http, $compile, $rootScope, $location, $timeout, $sce, $window) {
    var searchObject = $location.search();
    $scope.showMap = false;
    $scope.showLocation = true;
    $scope.showNearby = false;
    $scope.showAttractionList = true;
    $scope.showInfoPage = false;
    $scope.showPastStopsPage = false;
    $scope.listForDaySelectedPast = [];
    var indexToMoveToPast = [];

    // console.log(searchObject.d);
    $scope.daySelected = searchObject.d;
    // console.log($rootScope.groupedByDate[$scope.daySelected]);
    $scope.listForDaySelected = $rootScope.groupedByDate[$scope.daySelected];
    $scope.listForDaySelected = _.sortBy($scope.listForDaySelected, function (o) { return o.visitStart; })
    $scope.dateSelected = $scope.listForDaySelected[0].visitStart;
    getLocation();
    groupPastStops();

    $scope.updatePlan = function (item, updateType) {
        console.log(updateType);
        if (confirm("Confirm to make changes to " + item.attractionName + " ?") == true) {
            var today = new Date();


            $http.post(
                "https://plan360.ploytrip.com/api/planEntry/updatePlanEntry.php", {
                    'updateType': updateType,
                    'entryID': item.entryID,
                    'visitStart': item.visitStart,
                    'visitEnd': item.visitEnd,
                    'visitStartShift': item.visitStartShift,
                    'visitEndShift': item.visitEndShift,
                    'visitStartActual': item.visitStartActual,
                    'visitEndActual': moment(today).format('YYYY-MM-DDTHH:mm:ss')
                }
            ).then(function (response) {
                console.log("Data Updated");
                console.log(response);
                // $scope.entryIDList = [];
                // $scope.alertMessage = response.data;

            });
        }


    }
    $scope.showPastStops = function () {
        $scope.showPastStopsPage = !$scope.showPastStopsPage;

    };

    function groupPastStops() {
        var currentTime = moment(new Date()).format();


        $scope.listForDaySelected.forEach(function (e) {
            var index = $scope.listForDaySelected.indexOf(e);

            var visitEndTime = moment(e.visitEnd).format();
            console.log("Visit End" + visitEndTime + " vs Now " + currentTime);
            if (visitEndTime < currentTime) {
                console.log("Passed Time for" + e.attractionName);
                $scope.listForDaySelectedPast.push(e);
                indexToMoveToPast.push(index);
            }

        }, this);

        console.log($scope.listForDaySelectedPast);
        console.log(indexToMoveToPast);

        $scope.listForDaySelected.splice(0, indexToMoveToPast.length);
        console.log("current upcoming list size" + $scope.listForDaySelected.length);

        $scope.listForDaySelected.forEach(function (e) {
             if(e.visitEndActual != ""){
                    console.log("visitEndActual" + e.attractionName);
                                        $scope.listForDaySelectedPast.push(e);

                    $scope.listForDaySelected.splice($scope.listForDaySelected.indexOf(e), 1 );

                    // indexToMoveToPast.push(index);

                }

        }, this);



        if ($scope.listForDaySelected.length == 0) {
            console.log("no current trip plan");

            $scope.showPastStopsPage = true;

        }

    };
    $scope.switchMapView = function () {
        console.log("swtich map clicked!");
        if ($scope.showMap == true) {
            $scope.showMap = false;

            $scope.showLocation = true;

        } else {
            $scope.showMap = true;
            // $scope.showLocation = !$scope.showLocation;
            $scope.showNearby = false;
            $scope.showLocation = false;
        }
        getLocation();

    }
    $scope.switchNearbyView = function () {
        console.log("swtich nearby clicked!");

        if ($scope.showNearby == true) {
            $scope.showNearby = false;

            $scope.showLocation = true;

        } else {
            // $scope.showNearbySelect = true;
            $scope.showMap = false;
            $scope.showNearby = true;
            $scope.showLocation = false;
        }
        // $scope.showLocation = !$scope.showLocation;
        getLocation();

    }
    $scope.closeShowInfo = function () {
        $scope.showInfoPage = false;
        $scope.showAttractionList = true;

    }

    $scope.showInfo = function (place) {
        if (place == "toCheck") {
            if ($scope.distance < 100) {
                $scope.showAttractionList = !$scope.showAttractionList;
                $scope.showInfoPage = !$scope.showInfoPage;
                $scope.attractionForInfo = $scope.listForDaySelected[0];

            } else {
                alert("No info, too far");
            }
        } else {
            $scope.showAttractionList = !$scope.showAttractionList;
            $scope.showInfoPage = !$scope.showInfoPage;
            $scope.attractionForInfo = place;
            console.log("Show info for" + place.attractionName);
        }

    }

    $scope.navigateTo = function (place) {
        console.log("Going to" + place.attractionName);
        //$scope.locationDirectionURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyABaFjpIWuL4L4rXludE80sgRF19OeM7r0&origin="+$scope.currentLat+","+$scope.currentLong+"&destination="+place.GPSCoordinates;
        $scope.locationDirectionURL = "https://www.google.com/maps?saddr=" + $scope.currentLat + "," + $scope.currentLong + " &daddr=" + place.GPSCoordinates;
        // $window.open($scope.locationDirectionURL, '_blank')
        window.location = $scope.locationDirectionURL;

    }
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    var x = document.getElementById("location");

    function getLocation() {
        if (navigator.geolocation) {
            //  navigator.geolocation.watchPosition(success, error, options);
            navigator.geolocation.getCurrentPosition(success, error, options);

            console.log("location fetched");

        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    };


    function success(position) {
        console.log("in show position");
        $scope.currentLat = position.coords.latitude;
        $scope.currentLong = position.coords.longitude;
        console.log($scope.currentLat + "," + $scope.currentLong);
        $scope.nearbyMapURL = "https://www.google.com/maps/embed/v1/search?key=AIzaSyABaFjpIWuL4L4rXludE80sgRF19OeM7r0&q=food+near+me";
        $scope.locationMapURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyABaFjpIWuL4L4rXludE80sgRF19OeM7r0&q=" + $scope.currentLat + "," + $scope.currentLong;

        // x.innerHTML = "Latitude: " + position.coords.latitude +
        //     "<br>Longitude: " + position.coords.longitude;
        $scope.findAttractionOnAgenda();
    }
    $scope.findAttractionOnAgenda = function () {
        var geocoder = new google.maps.Geocoder;
        var currentLocation;
        if ($scope.listForDaySelected.length == 0) {
            console.log("length = "+$scope.listForDaySelected.length);
            $scope.locationToDisplay = "No Upcoming Stops Found";
            $scope.locationToDisplay2 = "This trip may be expired.";
            $scope.$apply();

        }else{

        
        if ($scope.listForDaySelected[0].GPSCoordinates != null) {
            $scope.splitResult = $scope.listForDaySelected[0].GPSCoordinates.split(", ");
        }

        var currentlatlng = { lat: parseFloat($scope.currentLat), lng: parseFloat($scope.currentLong) };
        var nextAttractionLatLong = { lat: parseFloat($scope.splitResult[0]), lng: parseFloat($scope.splitResult[1]) };
        geocoder.geocode({ 'location': currentlatlng }, function (results, status) {
            if (status === 'OK') {

                if (results[0]) {

                    currentLocation = results;
                    console.log(results);

                    $scope.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng($scope.currentLat, $scope.currentLong), new google.maps.LatLng($scope.splitResult[0], $scope.splitResult[1]));


                    if ($scope.distance < 100) {

                        $scope.locationToDisplay = $scope.listForDaySelected[0].attractionName;

                        $scope.locationToDisplay2 = $scope.listForDaySelected[0].address;

                        $scope.backgroundPicToDisplay = $scope.listForDaySelected[0].picture1URL;
                        console.log("Location to Display" + $scope.locationToDisplay);

                    } else {
                        $scope.splitAddress = currentLocation[0].formatted_address.split(", ");

                        $scope.locationToDisplay = $scope.splitAddress[0];

                        $scope.locationToDisplay2 = $scope.splitAddress[1] + ", " + $scope.splitAddress[2] + ", " + $scope.splitAddress[3];

                        $scope.backgroundPicToDisplay = "./assets/banner3.jpg";

                        console.log("Location to Display" + $scope.locationToDisplay);

                    }
                    $scope.$apply();

                    //    x.innerHTML = "You are at: <br> " +  $scope.locationToDisplay ;
                } else {
                    window.alert('No results found');
                }
            }
            else if (status === "OVER_QUERY_LIMIT") {
                console.log("Too Fast query")
                setTimeout(function () {
                    geocoder.geocode(currentlatlng);
                }, 200);
            }
            else {
                alert("Geocode was not successful for the following reason:"
                    + status);
            }
        });

        }

    }

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

});