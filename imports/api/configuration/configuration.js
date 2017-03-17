/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class ConfigurationCollection extends Mongo.Collection {

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

export const Configuration = new ConfigurationCollection('configuration');

Configuration.deny({
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
Configuration.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    name: {type: String},
    facebook: {type: String},
    phone: {type: String},
    email: {type: String},
    primarySlogan: {type: String},
    secondarySlogan: {type: String},
    urlStaticServer:{type: String},
    servicesTitle1:{type:String},
    servicesDescription1:{type:String},
    servicesIcon1:{type:String},
    servicesTitle2:{type:String},
    servicesDescription2:{type:String},
    servicesIcon2:{type:String},
    servicesTitle3:{type:String},
    servicesDescription3:{type:String},
    servicesIcon3:{type:String},
    servicesTitle4:{type:String},
    servicesDescription4:{type:String},
    servicesIcon4:{type:String},
});

Configuration.attachSchema(Configuration.schema);

Configuration.publicFields = {
    name: 1,
    status: 1,
    createdAt: 1,
};