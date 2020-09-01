
mainApp.controller( "mainController", function( $scope , $http ) {
			
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
					alert("form valid");
				}

				//TODO strict conditions on identity form input
			}

			});