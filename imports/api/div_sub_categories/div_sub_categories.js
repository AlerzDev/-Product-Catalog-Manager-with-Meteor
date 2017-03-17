/**
 * Created by alejandrolemusrodriguez on 25/01/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class DivSubCategoriesCollection extends Mongo.Collection {

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

export const DivSubCategories = new DivSubCategoriesCollection('divSubCategories');

DivSubCategories.deny({
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

DivSubCategories.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    name: {type: String},
    subCategory: {type: String},
    status: {type: Boolean, defaultValue: false},
    createdAt: {type: Date},
});

DivSubCategories.attachSchema(DivSubCategories.schema);

DivSubCategories.publicFields = {
    name: 1,
    subCategory: 1,
    status: 1,
    createdAt: 1,
};