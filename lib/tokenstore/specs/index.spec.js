/*
 * cahoots-api-tokenstore
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var tokenstore = require('../');

var expect = require('expect.js');

describe('The tokenstore', function suite () {

    it('should be able to put something into the store and get an id out', function test (done) {
        var store = tokenstore(true);
        var payload = {foo: 'bar'};

        var id = store.put(payload);

        expect(id).not.to.be(undefined);
        expect(id.length).to.be(40);
        expect(Object.keys(store.$tokens).length).to.be(1);

        expect(store.$tokens[id].payload).to.be(payload);

        done();
    });

    it('should create repetive id\'s', function test (done) {
        var store = tokenstore(true);
        var payload = {foo: 'bar'};

        var id = store.put(payload);
        var id2 = store.put(payload);

        expect(id).to.be(id2);

        done();
    });

    it('should be able to handle invalid tokens', function test (done) {
        var store = tokenstore(true);
        var payload = {foo: 'bar'};

        var id = store.put(payload);

        setTimeout(function onTimeout () {
            expect(store.valid(id)).to.be(false);

            expect(Object.keys(store.$tokens).length).to.be(0);

            done();
        }, 300);
    });

    it('should be a singleton', function test (done) {
        var store0 = tokenstore(true);
        var store1 = tokenstore(true);

        expect(store0.$tokens).to.be(store1.$tokens);

        done();
    });
});