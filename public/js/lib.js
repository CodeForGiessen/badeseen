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
        'description': 'John Maynard! „Wer ist John Maynard?“ „John Maynard war unser Steuermann, aushielt er, bis er das Ufer gewann, er hat uns gerettet, er trägt die Kron’, er starb für uns, unsre Liebe sein Lohn. John Maynard.“',
        'location': {
            'lat': 50.567451,
            'lng': 8.610631
        }
    }, {
        'name': 'Silbersee',
        'description': 'Wo ist Alfons gleich, der Fuhrherr? Kommt das je ans Sonnenlicht? Wer es immer wissen könnte Mackie Messer weiss es nicht.',
        'location': {
            'lat': 50.616055,
            'lng': 8.673802
        }
    }];
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
