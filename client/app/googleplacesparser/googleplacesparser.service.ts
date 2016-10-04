'use strict';


interface IGooglePlacesParser {
  Parse(place: any): any;
  BuildGooglePlacesResult(config: any): any;
}

class GooglePlacesParser implements IGooglePlacesParser {
  Parse(place: any): any {
    var componentForm = {
        premise: 'long_name',
        street_number: 'short_name',
        route: 'long_name',
        sublocality_level_1: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
    var mapping = {
        premise: 'BuildingName',
        street_number: 'Unit',
        route: 'Street',
        sublocality_level_1: 'Suburb',
        locality: 'City',
        administrative_area_level_1: 'State',
        country: 'Country',
        postal_code: 'PostCode'
        //Region, District, Level
    };
    var location = place.geometry && place.geometry.location ? {
            Latitude: place.geometry.location.lat(),
            Longitude: place.geometry.location.lng()
        } : {};
        // Get each component of the address from the place location
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                location[mapping[addressType]] = val;
            }
        }
        location.FormattedAddress = place.formatted_address;
        location.PlaceId = place.place_id;

        return location;
  }

  BuildGooglePlacesResult(config) {
    return {
      formatted_address: config.formated_address,
      address_components: [
        {
          long_name: config.address.locality,
          short_name: config.address.locality,
          types: ['locality']
        },
        {
          long_name: config.address.state,
          short_name: config.address.state,
          types: ['administrative_area_level_1']
        },
        {
          long_name: config.address.country,
          short_name: config.address.country,
          types: ['country']
        }
      ],
      geometry: {
        location: {
          lat: function () {
            return config.location.latitude;
          },
          lng: function () {
            return config.location.longitude;
          }
        }
      }
    };
  };
}

angular.module('falconApp')
  .factory('googleplacesparser',  () => new GooglePlacesParser());
