'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        $scope.chosenDate = new Date();
        $scope.categories = "";
        $scope.location = "";
        $scope.city = "";
        
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
        
        $scope.getDate = function() {
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
        
        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/events/search',
            params: {
                app_key: eventfulKey,
                q: $scope.categories,
                where: $scope.city,
                date: $scope.getDate() + '-' + $scope.getDate()
            }
        }).then(function(res) {
            $scope.data = res;
        });
    });
    
// window.onload = function() {
  
  // autocomplete.addListener('place_changed', function() {
    // window.alert($scope.location);
          // return;
  // });
// }