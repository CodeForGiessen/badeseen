'use strict';


angular.module('myApp.filters', [])
    .filter('trustHtml', ['$sce',
        function($sce) {
            /**
             * Filter to use html tags
             *
             * @discussion Do not use with user input as it could be unsafe.
             */
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }
    ])
    .filter('prettifyWebsiteLink', function() {
        /**
         * Filter to show a link as a tooltip without beeing to technical
         *
         * @discussion example: http://google.de -> google.de
         */
        return function(link) {
            return link.replace('http://', '').replace('www.');
        };
    });
