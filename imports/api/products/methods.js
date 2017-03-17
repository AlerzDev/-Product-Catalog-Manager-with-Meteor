/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import {Products} from './products.js';

import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'meteor/underscore';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';


export const insert = new ValidatedMethod({
    name: 'Products.insert',
    validate: Products.simpleSchema().pick(['name', 'line', 'subcategories', 'subcategories.$', 'subcategories.$.id', 'subcategories.$.idDivSubCategory']).validator({
        clean: true,
        filter: false
    }),
    run({name, line, subcategories}){
        const product = {
            name,
            line,
            subcategories,
            status: false,
            createAt: new Date(),
        };
        Products.insert(product);
    }
});

export const update = new ValidatedMethod({
    name: 'Products.update',
    validate: new SimpleSchema({
        _id: Products.simpleSchema().schema('_id'),
        name: Products.simpleSchema().schema('name'),
    }).validator({clean: true, filter: false}),
    run({_id, name}){
        Products.update(_id, {$set: {name: (_.isUndefined(name) ? null : name)}});
    },
});

export const updateStatus = new ValidatedMethod({
    name: 'Products.updateStatus',
    validate: new SimpleSchema({
        _id: Products.simpleSchema().schema('_id'),
        status: Products.simpleSchema().schema('status'),
    }).validator({clean: true, filter: false}),
    run({_id, status}){
        Products.update(_id, {$set: {status: status}});
    },
});

export const remove = new ValidatedMethod({
    name: 'Products.remove',
    validate: new SimpleSchema({
        _id: Products.simpleSchema().schema('_id'),
    }).validator({clean: true, filter: false}),
    run({_id}){
        Products.remove(_id);
    }
});

const PRODUCTS_METHODS = _.pluck([
    insert,
    update,
    remove,
    updateStatus,
], 'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PRODUCTS_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() {
            return true;
        },
    }, 5, 1000);
}