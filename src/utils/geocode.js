const request = require('postman-request');

const latt = 1, long = 0;
const featuresLimit = 1;
const apiKey = 'pk.eyJ1IjoiamVkaXNxbCIsImEiOiJja3BkMnRkcnUwMHNmMndvN2dvZ211YTRkIn0._mB_1fe0eBjfs0NIyUEuoA';

const geocode = (address, callback) => {
    address = encodeURIComponent(address);
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}&limit=${featuresLimit}`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (body.features.length === 0) {
            callback('Location could not be geocoded. Please try again.', undefined);
        }        
        else {
            //callback(undefined, `Latitude ${center[latt]} and longitude ${center[long]} is at the center of ${feature.place_name}.`);
            callback(undefined, {
                latitude:  body.features[0].center[latt],
                longitude: body.features[0].center[long],
                location:  body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
