'use strict';


angular.module('badeseen.constants', [])
    .constant('APP_TITLE', 'Wasserqualität der Badeseen im Umkreis Gießens')
    .constant('LAB_INFO', {
        'name': 'Code for Gießen',
        'website': 'http://codefor.de/giessen/',
        'logoPath': 'public/img/cfgi-black.svg'
    })
    .constant('CONTRIBUTORS', [{
        'name': 'Christian Schulze',
        'website': 'http://andinfinity.de',
        'mail': 'chris@andinfinity.de'
    }, {
        'name': 'Marco Schaefer',
        'website': '',
        'mail': 'm.schaefer.mail+codeforgi@gmail.com'
    }, {
        'name': 'Vincent Elliot Wagner',
        'website': '',
        'mail': 'zockerticker+codeforgi@gmail.com'
    }, {
        'name': 'Christian Heigele',
        'website': '',
        'mail': ''
    }])
    .constant('FOOT_NOTICE', 'Dies ist ein Projekt des OK Lab Gießen. Die Inhalte stehen unter der MIT-Lizenz auf <a href="https://github.com/CodeForGiessen/badeseen" title="Quelltext">GitHub</a> zur Verfügung.')
    .constant('MAP_CENTER',
        // this is the position the map will be centered from
        {
            'lat': 50.583732,
            'lng': 8.678344,
            'zoom': 11
        })
    .constant('FALLBACK_MARKER',
        // this is the position the red marker is set to
        {
            'lat': 50.583732,
            'lng': 8.678344
        });
