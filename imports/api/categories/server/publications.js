/**
 * Created by alejandrolemusrodriguez on 20/01/17.
 */

import { Categories } from '../categories.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('categories', function categoriesPublic() {
    return Categories.find();
});