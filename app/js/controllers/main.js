'use strict';

/**
 * # MainCtrl
 */
angular.module('EventApp')
    .controller('MainCtrl', function ($scope, $http, eventfulKey) {
        $scope.chosenDate = new Date();
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
              console.log(components[c].types.join('|'))
                if(components[c].types.indexOf('locality') > -1 && components[c].types.indexOf('political') > -1){
                  city=components[c].long_name;
                  break;
                }
              }
              $scope.city = city;
            }
          });
        }
        
        $http({
            method: 'GET',
            url: 'http://api.eventful.com/json/events/search',
            params: {
                app_key: eventfulKey,
                q: 'music',
                where: 'San Diego',
                date: '2015061000-2016062000'
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