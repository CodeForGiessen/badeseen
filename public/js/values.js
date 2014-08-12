angular.module('myApp.values', [])
    .value('appTitle', 'Wasserqualität der Badeseen im Umkreis Gießens')
    .value('labInfo', {
        'name': 'Code for Gießen',
        'website': 'http://codefor.de/giessen/',
        'logoPath': 'public/img/cfgi-black.svg'
    })
    .value('contributors', [{
        'name': 'Christian Schulze',
        'website': 'http://andinfinity.de',
        'mail': 'chris@andinfinity.de'
    }])
    .value('footNotice', 'Dies ist ein Projekt des OK Lab Gießen. Die Inhalte stehen unter der MIT-Lizenz auf <a href="https://github.com/CodeForGiessen/badeseen" title="Quelltext">GitHub</a> zur Verfügung.');
