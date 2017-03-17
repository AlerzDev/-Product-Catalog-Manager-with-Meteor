/**
 * Created by alejandrolemusrodriguez on 20/01/17.
 */
import { Categories } from './categories.js';

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


export const insert = new ValidatedMethod({
    name: 'Categories.insert',
    validate: Categories.simpleSchema().pick('name').validator({clean: true, filter: false}),
    run({ name }){
        const category = {
            name,
            status: false,
            createAt: new Date(),
        };
        Categories.insert(category);
    }
});

export const update = new ValidatedMethod({
    name: 'Categories.update',
    validate: new SimpleSchema({
        _id : Categories.simpleSchema().schema('_id'),
        name: Categories.simpleSchema().schema('name'),
    }).validator({clean: true, filter: false}),
    run({_id, name}){
        Categories.update(_id,{$set:{name:(_.isUndefined(name)? null: name)}});
    },
});

export const updateStatus = new ValidatedMethod({
    name: 'Categories.updateStatus',
    validate: new SimpleSchema({
        _id: Categories.simpleSchema().schema('_id'),
        status: Categories.simpleSchema().schema('status'),
    }).validator({clean:true, filter: false}),
    run({_id,status}){
        Categories.update(_id,{$set:{status:status}});
    },
});

export const remove = new ValidatedMethod({
    name: 'Categories.remove',
    validate: new SimpleSchema({
        _id: Categories.simpleSchema().schema('_id'),
    }).validator({clean: true, filter: false}),
    run({_id}){
        Categories.remove(_id);
    }
});

const CATEGORIES_METHODS = _.pluck([
    insert,
    update,
    remove,
    updateStatus,
],'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CATEGORIES_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}