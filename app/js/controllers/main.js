'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        $scope.chosenDate = new Date();
        $scope.location = "";
        $scope.city = "";
        
        $scope.chosenStartTime = moment();
        $scope.twoHoursFromNow = moment().add(2, 'hour');
        $scope.locationCity = 'Vancouver';
        $scope.allCategories = [];
        $scope.selectedCategories = [];
        $scope.categories = "";
        
        window.onload = function() {
          var input = document.getElementById('pac-input');
          var autocomplete = new google.maps.places.Autocomplete(input);
          google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            $scope.location = place.formatted_address;
            var components=this.getPlace().address_components,city='n/a';
            if(components){
              for(var c=0; c<components.length; c++){
                if(components[c].types.indexOf('locality') > -1 && components[c].types.indexOf('political') > -1){
                  city=components[c].long_name;
                  break;
                }
              }
              $scope.city = city;
            }
          });
        }
        
        function getDateEventfulFormat() {
          var year = $scope.chosenDate.getFullYear().toString();
          var month = $scope.chosenDate.getMonth();
          if (month < 10) {
            month = "0" + month.toString();
          } else {
            month = month.toString();
          }
          
          var date = $scope.chosenDate.getDate().toString();
          if (date < 10) {
            date = "0" + date.toString();
          } else {
            date = date.toString();
          }         
          
          return year + month + date + "00";
        }
        
        $scope.add = function(category) {
            $scope.allCategories.splice($scope.allCategories.indexOf(category), 1);
            $scope.selectedCategories.push(category);
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/events/search',
            params: {
                app_key: eventfulKey,
                category: $scope.categories,
                where: $scope.city,
                date: getDateEventfulFormat() + '-' + getDateEventfulFormat()
            }
        }).then(function(res) {
            $scope.data = res;
        });

        var parameters = yelpParams({location: 'San+Francisc', term: 'food'});

        $http({
            method: 'GET',
            url: 'http://api.yelp.com/v2/search',
            params: parameters
        }).then(function(res) {
            $scope.yelpRet = res;
        });
        
        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/categories/list',
            params: {
                app_key: eventfulKey,
                where: $scope.city,
                date: getDateEventfulFormat() + '-' + getDateEventfulFormat(),
                sort_order: 'popularity'
            }
        }).then(function(res) {
            $scope.allCategories = res.data.category;
            for (var i=0; i < $scope.allCategories.length; i++) {
              var name = $scope.allCategories[i].name;
              $scope.allCategories[i].name = name.replace(" &amp; ", "/");
            }
        });
    });
