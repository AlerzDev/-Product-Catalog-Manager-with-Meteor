/**
 * Created by alejandrolemusrodriguez on 25/01/17.
 */
import { DivSubCategories } from './div_sub_categories.js';

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Session } from 'meteor/session';

export const insert = new ValidatedMethod({
    name: 'DivSubCategories.insert',
    validate: DivSubCategories.simpleSchema().pick(['name','subCategory']).validator({clean: true, filter: false}),
    run({ name, subCategory }){
        const div = {
            name,
            subCategory,
            status: false,
            createAt: new Date(),
        };
        DivSubCategories.insert(div);
    }
});

export const update = new ValidatedMethod({
    name: 'DivSubCategories.update',
    validate: new SimpleSchema({
        _id : DivSubCategories.simpleSchema().schema('_id'),
        name: DivSubCategories.simpleSchema().schema('name'),
    }).validator({clean: true, filter: false}),
    run({_id, name}){
        DivSubCategories.update(_id,{$set:{name:(_.isUndefined(name)? null: name)}});
    },
});

export const count = new ValidatedMethod({
   name: 'DivSubCategories.count',
    validate: new SimpleSchema({_id : DivSubCategories.simpleSchema().schema('_id')}).validator({clean: true, filter: false}),
    run({_id}){
       return DivSubCategories.find({subCategory: _id}).count();
    }
});

export const updateStatus = new ValidatedMethod({
    name: 'DivSubCategories.updateStatus',
    validate: new SimpleSchema({
        _id: DivSubCategories.simpleSchema().schema('_id'),
        status: DivSubCategories.simpleSchema().schema('status'),
    }).validator({clean:true, filter: false}),
    run({_id,status}){
        DivSubCategories.update(_id,{$set:{status:status}});
    },
});

export const remove = new ValidatedMethod({
    name: 'DivSubCategories.remove',
    validate: new SimpleSchema({
        _id: DivSubCategories.simpleSchema().schema('_id'),
    }).validator({clean: true, filter: false}),
    run({_id}){
        DivSubCategories.remove(_id);
    }
});

const SUB_CATEGORIES_METHODS = _.pluck([
    insert,
    update,
    remove,
    count,
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