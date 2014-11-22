'use strict';


describe("Testing Modules", function() {
    describe("App", function() {

        var module;
        before(function() {
            module = angular.module("badeseen");
        });

        it("should be registered", function() {
            expect(module).not.to.equal(null);
        });

        describe("Dependencies:", function() {

            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };

            before(function() {
                deps = module.value('badeseen').requires;
            });

            it("should have badeseen.controllers as a dependency", function() {
                expect(hasModule('badeseen.controllers')).to.equal(true);
            });

            it("should have badeseen.filters as a dependency", function() {
                expect(hasModule('badeseen.filters')).to.equal(true);
            });

            it("should have badeseen.services as a dependency", function() {
                expect(hasModule('badeseen.services')).to.equal(true);
            });

            it("should have badeseen.constants as a dependency", function() {
                expect(hasModule('badeseen.constants')).to.equal(true);
            });
        });
    });
});