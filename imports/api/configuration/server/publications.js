/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import { Configuration } from '../configuration.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('configuration', function fingersPublic() {
    return Configuration.find();
});