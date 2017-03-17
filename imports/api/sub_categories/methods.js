/**
 * Created by alejandrolemusrodriguez on 23/01/17.
 */
import { SubCategories } from './sub_categories.js';

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


export const insert = new ValidatedMethod({
    name: 'SubCategories.insert',
    validate: SubCategories.simpleSchema().pick(['name','category']).validator({clean: true, filter: false}),
    run({ name, category }){
        const subcategory = {
            name,
            category,
            status: false,
            createAt: new Date(),
        };
        SubCategories.insert(subcategory);
    }
});

export const update = new ValidatedMethod({
    name: 'SubCategories.update',
    validate: new SimpleSchema({
        _id : SubCategories.simpleSchema().schema('_id'),
        name: SubCategories.simpleSchema().schema('name'),
    }).validator({clean: true, filter: false}),
    run({_id, name}){
        SubCategories.update(_id,{$set:{name:(_.isUndefined(name)? null: name)}});
    },
});

export const updateStatus = new ValidatedMethod({
    name: 'SubCategories.updateStatus',
    validate: new SimpleSchema({
        _id: SubCategories.simpleSchema().schema('_id'),
        status: SubCategories.simpleSchema().schema('status'),
    }).validator({clean:true, filter: false}),
    run({_id,status}){
        SubCategories.update(_id,{$set:{status:status}});
    },
});

export const remove = new ValidatedMethod({
    name: 'SubCategories.remove',
    validate: new SimpleSchema({
        _id: SubCategories.simpleSchema().schema('_id'),
    }).validator({clean: true, filter: false}),
    run({_id}){
        SubCategories.remove(_id);
    }
});

const SUB_CATEGORIES_METHODS = _.pluck([
    insert,
    update,
    remove,
    updateStatus,
],'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(SUB_CATEGORIES_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}