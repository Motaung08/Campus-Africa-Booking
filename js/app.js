var mainApp = angular.module("mainApp",['ui.bootstrap.pagination']);

mainApp.factory('dataFactory', function($http) {
        var factory={};

				factory.identityNumberExists = function(identityNumber) {

					return $http({
						method : "GET",
							url : "http://0.0.0.0:5000/tenants?id="+identityNumber,
							headers: {
								"Content-Type": "application/json"
							}
					});
				}

        factory.getRooms = function(type) {
            return $http({
                method : "GET",
                    url : "http://0.0.0.0:5000/rooms?type="+type,
                    headers: {
                        "Content-Type": "application/json"
                    }
            });
        }

        return factory;
    });

mainApp.service('dataService', function(dataFactory) {

				this.identityNumberExists = function(identityNumber){
					return dataFactory.identityNumberExists(identityNumber);
				}

				this.getRooms = function(type) {
           return dataFactory.getRooms(type);
        }
    });
