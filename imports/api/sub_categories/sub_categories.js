/**
 * Created by alejandrolemusrodriguez on 23/01/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class SubCategoriesCollection extends Mongo.Collection {

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

export const SubCategories = new SubCategoriesCollection('subCategories');

SubCategories.deny({
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

SubCategories.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    name: {type: String},
    category: {type: String},
    status: {type: Boolean, defaultValue: false},
    createdAt: {type: Date},
});

SubCategories.attachSchema(SubCategories.schema);

SubCategories.publicFields = {
    name: 1,
    category: 1,
    status: 1,
    createdAt: 1,
};