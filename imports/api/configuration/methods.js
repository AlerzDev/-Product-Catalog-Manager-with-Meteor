/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import {Configuration} from './configuration.js';

import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'meteor/underscore';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';


export const updatePrincipalPage = new ValidatedMethod({
    name: 'configuration.updatePrincipalPage',
    validate: new SimpleSchema({
        _id: Configuration.simpleSchema().schema('_id'),
        name: Configuration.simpleSchema().schema('name'),
        facebook: Configuration.simpleSchema().schema('facebook'),
        phone: Configuration.simpleSchema().schema('phone'),
        email: Configuration.simpleSchema().schema('email'),
        primarySlogan: Configuration.simpleSchema().schema('primarySlogan'),
        secondarySlogan: Configuration.simpleSchema().schema('secondarySlogan'),
    }).validator({clean: true, filter: false}),
    run({_id, name, facebook, phone, email, primarySlogan, secondarySlogan}){
        Configuration.update(_id, {
            $set: {
                name: (_.isUndefined(name) ? null : name),
                facebook: (_.isUndefined(facebook) ? null : facebook),
                email: (_.isUndefined(email) ? null : email),
                phone: (_.isUndefined(phone) ? null : phone),
                primarySlogan: (_.isUndefined(primarySlogan) ? null : primarySlogan),
                secondarySlogan: (_.isUndefined(secondarySlogan) ? null : secondarySlogan),
            }
        });
    }
});
export const updateUrlStaticServer = new ValidatedMethod({
    name: 'configuration.updateUrlStaticServer',
    validate: new SimpleSchema({
        _id: Configuration.simpleSchema().schema('_id'),
        urlStaticServer: Configuration.simpleSchema().schema('urlStaticServer')
    }).validator({clean: true, filter: false}),
    run({_id, urlStaticServer}){
        Configuration.update(_id, {
            $set: {
                urlStaticServer: (_.isUndefined(urlStaticServer) ? null : urlStaticServer),
            }
        });
    }
});

export const updateServicesConfiguration = new ValidatedMethod({
    name: 'configuration.updateServicesConfiguration',
    validate: new SimpleSchema({
        _id: Configuration.simpleSchema().schema('_id'),
        servicesTitle1: Configuration.simpleSchema().schema('servicesTitle1'),
        servicesDescription1: Configuration.simpleSchema().schema('servicesDescription1'),
        servicesIcon1: Configuration.simpleSchema().schema('servicesIcon1'),
        servicesTitle2: Configuration.simpleSchema().schema('servicesTitle2'),
        servicesDescription2: Configuration.simpleSchema().schema('servicesDescription2'),
        servicesIcon2: Configuration.simpleSchema().schema('servicesIcon2'),
        servicesTitle3: Configuration.simpleSchema().schema('servicesTitle3'),
        servicesDescription3: Configuration.simpleSchema().schema('servicesDescription3'),
        servicesIcon3: Configuration.simpleSchema().schema('servicesIcon3'),
        servicesTitle4: Configuration.simpleSchema().schema('servicesTitle4'),
        servicesDescription4: Configuration.simpleSchema().schema('servicesDescription4'),
        servicesIcon4: Configuration.simpleSchema().schema('servicesIcon4'),
    }).validator({clean: true, filter: false}),
    run({
        _id,
        servicesTitle1, servicesTitle2, servicesTitle3, servicesTitle4,
        servicesDescription1, servicesDescription2, servicesDescription3, servicesDescription4,
        servicesIcon1, servicesIcon2, servicesIcon3, servicesIcon4
    }){
        Configuration.update(_id, {
            $set: {
                servicesTitle1: (_.isUndefined(servicesTitle1) ? null : servicesTitle1),
                servicesTitle2: (_.isUndefined(servicesTitle2) ? null : servicesTitle2),
                servicesTitle3: (_.isUndefined(servicesTitle3) ? null : servicesTitle3),
                servicesTitle4: (_.isUndefined(servicesTitle4) ? null : servicesTitle4),
                servicesIcon1: (_.isUndefined(servicesIcon1) ? null : servicesIcon1),
                servicesIcon2: (_.isUndefined(servicesIcon2) ? null : servicesIcon2),
                servicesIcon3: (_.isUndefined(servicesIcon3) ? null : servicesIcon3),
                servicesIcon4: (_.isUndefined(servicesIcon4) ? null : servicesIcon4),
                servicesDescription1: (_.isUndefined(servicesDescription1) ? null : servicesDescription1),
                servicesDescription2: (_.isUndefined(servicesDescription2) ? null : servicesDescription2),
                servicesDescription3: (_.isUndefined(servicesDescription3) ? null : servicesDescription3),
                servicesDescription4: (_.isUndefined(servicesDescription4) ? null : servicesDescription4),
            }
        });
    }
});

const CONFIGURATION_METHODS = _.pluck([
    updatePrincipalPage,
    updateUrlStaticServer,
    updateServicesConfiguration
], 'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CONFIGURATION_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() {
            return true;
        },
    }, 5, 1000);
}