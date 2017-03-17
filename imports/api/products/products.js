/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class ProductsCollection extends Mongo.Collection {

    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.status = true;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        return super.insert(ourDoc, callback);
    }

    update(selector, modifier) {
        return super.update(selector, modifier);
    }

    remove(selector) {
        return super.remove(selector);
    }

}

export const Products = new ProductsCollection('products');

Products.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

var subcategories = new SimpleSchema({
    id: {
        type: String
    },
});
Products.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    name: {type: String},
    line: {type: String},
    subcategories: {
        type: [subcategories]
    },
    "subcategories.$.id":{type:String},
    "subcategories.$.idDivSubCategory":{type:String},
    status: {type: Boolean, defaultValue: false},
    createdAt: {type: Date},
});

Products.attachSchema(Products.schema);

Products.publicFields = {
    name: 1,
    line: 1,
    subcategories: 1,
    status: 1,
    createdAt: 1,
};