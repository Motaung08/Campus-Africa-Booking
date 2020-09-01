
mainApp.controller( "mainController", function( $scope , $http ) {
		
			//regular expression to check for SA id number pattern
			$scope.regex='(([0-9][0-9][0-1][0-9][0-3][0-9])([0-9][0-9][0-9][0-9])([0-1])([0-9])([0-9]))'
			
			//building variables array
			$scope.buildings=["49 Jorissen"]

			});