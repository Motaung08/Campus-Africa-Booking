mainApp.controller("registrationController", function ($scope, $http) {

				$scope.bookingForm = {
					firstname: 'Skaps',
					lastname: 'Tshepang',
					YOS: '3',
					Institution: 'Wits',
					FundingType:'Bursary'

				};

				 // copy bookingForm  to student. student will be bind to a form 
				 $scope.student = angular.copy($scope.bookingForm );


				 // create submitStudentForm() function. This will be called when user submits the form
				 $scope.submitStudnetForm = function () {

					 // send $http request to save student

				};

			
			
			});
