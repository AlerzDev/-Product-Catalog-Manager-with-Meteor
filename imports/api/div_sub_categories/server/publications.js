/**
 * Created by alejandrolemusrodriguez on 25/01/17.
 */
import { DivSubCategories } from '../div_sub_categories.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('divSubCategories', function divSubCategoriesPublic() {
    return DivSubCategories.find();
});