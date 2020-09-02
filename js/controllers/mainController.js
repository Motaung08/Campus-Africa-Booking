
mainApp.controller( "mainController", function( $scope , $http,dataService ) {

			// action variaable booking/ tracking
			$scope.mapAction = function(action){

				if(action==="booking"){
					$scope.showBookingMenu = true;
					$scope.showBookingTracking = false;
					$scope.actionHeading = "Bookings"
				}

				else if(action==="track booking"){
					$scope.showBookingMenu = false;
					$scope.showBookingTracking = true;
					$scope.actionHeading = "Track booking"
				}
			}

			//regular expression to check for SA id number pattern
			$scope.regex = '(([0-9][0-9][0-1][0-9][0-3][0-9])([0-9][0-9][0-9][0-9])([0-1])([0-9])([0-9]))'

			//building variables array
			$scope.buildings = ["49 Jorissen"]

			//apartment types
			$scope.roomTypes = ["2 Sharing Apartment","3 Sharing Apartment"];

			//identity number model
			$scope.identityNumber="";

			//booking form validation
			$scope.submitBookingForm = function(bookingForm){

				if(bookingForm.$valid){
					//$scope.getAvailableRooms();
				}
				//TODO strict conditions on identity form input for Moss
			}

			//changing parameters
			$scope.onGenderChange = function(){
				$scope.genderSelected=true;
				$scope.getAvailableRooms();
			}
			$scope.onBuildingChange = function(){
				$scope.buildingSelected=true;
				$scope.getAvailableRooms();
			}

			$scope.onRoomTypeChange = function(){
				$scope.roomTypeSelected=true;
				$scope.getAvailableRooms();
			}

			//columns for rooms table
			$scope.columns=["Unit","Room"]

			//fetch available rooms function
			$scope.getAvailableRooms = function() {
				if($scope.genderSelected && $scope.roomTypeSelected && $scope.buildingSelected){
					var type = $scope.encodeSearchParameters();
					$scope.data = []
					$scope.toggle_spinner();
					$scope.availableRooms = dataService.getRooms(type).then(function onSuccess(response) {
						var results = response.data;
						results = $scope.formatData(results);

						//update varibles for the pagination
						$scope.availableRooms=results;
						$scope.noOfPages = Math.max(Math.ceil($scope.availableRooms.length / $scope.numPerPage),1);
						$scope.setPage();

						$scope.toggle_spinner();
					}, function onError(response) {
						console.log("data retrival error "+response.statusText);
				});

				}
				else{
					console.log("Missing parameters");
				}

			}

			//encode room type using gender and apartment
			$scope.encodeSearchParameters = function(){
				var roomTypeMap = {"2 Sharing Apartment":"2","3 Sharing Apartment":"3"};
				var roomTypeCode = roomTypeMap[$scope.selectedRoomType];
				var genderMap = {"Male":"M","Female":"F"};
				var genderCode=genderMap[$scope.selectedGender];

				var code = roomTypeCode+genderCode;

				return code;
			}
			//format available rooms data
			$scope.formatData = function(results){
				for(var i=0;i<results.length;++i){
					var room=results[i]["room"];

					//first two are building encodings so remove it
					results[i]["unit"]=parseInt(room.substring(3,room.length-1));
					results[i]["room"]=room[room.length-1];

				}
				results.sort(getSortOrder("unit"));
				return results;
			}

			//sort data using property
			function getSortOrder(prop) {
		    return function(a, b) {
		        if (a[prop] > b[prop]) {
		            return 1;
		        } else if (a[prop] < b[prop]) {
		            return -1;
		        }
		        return 0;
		    }
			}

			//Displaying the table of rooms avalilable
			$scope.availableRooms = []
			$scope.numPerPage = 10;
			$scope.noOfPages = 1;
			$scope.currentPage = 1;

			$scope.setPage = function () {
				var start = ($scope.currentPage - 1) * $scope.numPerPage
				var end = start+$scope.numPerPage
				$scope.data = $scope.availableRooms.slice( start, end );
			};

			$scope.$watch( 'currentPage', $scope.setPage );


			//Loading spinner stuff
			$scope.hideLoader = true;
			$scope.shrinkOnHide = false;
			$scope.toggle_spinner = function () {
				$scope.hideLoader = !$scope.hideLoader;
			};

			//handles selection on rooms table
			$scope.selectRoom = function(unit, room){
				$scope.selectedRoom=room;
				$scope.selectedUnit=unit;
				console.log($scope.selectedRoom, $scope.selectedUnit);

			}


		});
