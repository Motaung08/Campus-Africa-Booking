var mainApp = angular.module("mainApp",[]);

mainApp.factory('dataFactory', function($http) {
        var factory={};

        factory.getRooms = function(type) {
            $http({
                method : "GET",
                    url : "http://0.0.0.0:5000/rooms?type="+type,
                    headers: { 
                        "Content-Type": "application/json"
                    }
            }).then(function onSuccess(response) {
                var results=response.data;
                console.log(results);
            }, function onError(response) {
                console.log(response.statusText);
            });
        }

        return factory;
    });

mainApp.service('dataService', function(dataFactory) {
        this.getRooms = function(type) {
           return dataFactory.getRooms(type);
        }
    });