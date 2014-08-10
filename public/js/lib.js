/**
 * Return list of seas
 *
 * @discussion Each sea object has a unique name and a brief description
 * to display.
 *
 * @return {Array of Objects} Array of sea objects
 */
function getListOfSeasWithDescription() {
    return [{
        'name': 'Dutenhofener See',
        'description': '<em>John Maynard!</em><br>„Wer ist John Maynard?“<br>„John Maynard war unser Steuermann,<br>aushielt er, bis er das Ufer gewann,<br>er hat uns gerettet, er trägt die Kron’,<br>er starb für uns, unsre Liebe sein Lohn.<br>John Maynard.“',
        'location': {
            'lat': 50.566840,
            'lng': 8.610034
        },
        'attributes': [
            '<span class="fa-stack fa-lg" title="nicht mit dem Auto erreichbar"><i class="fa fa-car fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span>',
            '<span class="fa-stack fa-lg" title="nicht für Kinder geeignet"><i class="fa fa-child fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span>'
        ]
    }, {
        'name': 'Silbersee',
        'description': 'Wo ist Alfons gleich, der Fuhrherr?<br>Kommt das je ans Sonnenlicht?<br>Wer es immer wissen könnte<br>Mackie Messer weiss es nicht.',
        'location': {
            'lat': 50.617841,
            'lng': 8.673892
        },
        'attributes': [
            '<span class="fa fa-eur fa-2x fa-fw" title="kostet Eintritt"></span>',
            '<span class="fa fa-life-ring fa-2x fa-fw" title="überwacht"></span>',
            '<span class="fa fa-child fa-2x fa-fw" title="für Kinder geeignet"></span>'
        ]
    }];
}

/**
 * [getSeaLocations description]
 * @return {[type]} [description]
 */
function getSeaLocationMarkers() {
    var ret = {};
    var seas = getListOfSeasWithDescription();

    for (i = 0; i < seas.length; i++) {
        var sea = seas[i];

        ret[sea.name.replace(/ /g,'') + 'Marker'] = {
            'lat' : sea.location.lat,
            'lng' : sea.location.lng
        };
    }

    return ret;
}

/**
 * Return location of Gießen city
 * @return {Object} Location given by latitude and longitude wrapped by a object
 */
function getFallbackLocation() {
    return {
        'lat': 50.583732,
        'lng': 8.678344
    };
}
