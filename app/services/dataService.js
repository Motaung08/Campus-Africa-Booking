mainApp.factory('dataFactory', function($http,Upload) {
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

        factory.bookRoom = function(bookingDetails){
            return $http({
                method: 'POST',
                url: 'http://0.0.0.0:5000/tenants',
                headers: {
                  'Content-Type': "application/json"
                },
                data: bookingDetails
            });
        }

        factory.uploadPop = function (file,identityNumber) {
            return Upload.upload({
                    url: 'http://0.0.0.0:5000/tenants/upload/pop?id='+identityNumber,
                    data: {file: file}
            });
        };

        return factory;
    });

mainApp.service('dataService', function(dataFactory) {

            this.identityNumberExists = function(identityNumber){
                return dataFactory.identityNumberExists(identityNumber);
            }

            this.getRooms = function(type) {
            return dataFactory.getRooms(type);
        }

        this.bookRoom = function(bookingDetails){
            return dataFactory.bookRoom(bookingDetails)
        }

        this.uploadPop= function(file,identityNumber){
            return dataFactory.uploadPop(file,identityNumber);
        }
    });

