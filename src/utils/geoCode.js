const request=require("request");

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHNpbmRod2FuaTUiLCJhIjoiY2tiNHJvd3RtMGllZjJ6bzZtaTVmZzg5NSJ9.58QZNkd7q3jvoOiLV8nzSw&limit=1'
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback("unable to connect weather service", undefined);
        }
        else if (body.features.length === 0) {
            callback("Unable to find Location , Try Another Search", undefined);
        }
        else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const placename=body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                placename
            });
        }
    })
}


module.exports = geoCode