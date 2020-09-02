
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
					$scope.getAvailableRooms();
				}
				//TODO strict conditions on identity form input for Moss
			}

			//check if tenant does not have booking ready
			$scope.queryIdentityNumber = function(){
				
			}
			//fetch available rooms function 
			
			$scope.getAvailableRooms = function() {
				console.log($scope.identityNumber);
				console.log($scope.selectedGender);
				console.log($scope.selectedBuilding);
				console.log($scope.selectedRoomType);
				console.log($scope.encodeSearchParameters())
				
				var type = $scope.encodeSearchParameters();
				$scope.result = dataService.getRooms(type);
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



		});