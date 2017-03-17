/**
 * Created by alejandrolemusrodriguez on 20/01/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

class CategoriesCollection extends Mongo.Collection {

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

export const Categories = new CategoriesCollection('categories');

Categories.deny({
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

Categories.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    name: {type: String},
    status: {type: Boolean, defaultValue: false},
    createdAt: {type: Date},
});

Categories.attachSchema(Categories.schema);

Categories.publicFields = {
    name: 1,
    status: 1,
    createdAt: 1,
};