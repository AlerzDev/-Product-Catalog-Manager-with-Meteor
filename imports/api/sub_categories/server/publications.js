/**
 * Created by alejandrolemusrodriguez on 23/01/17.
 */
import { SubCategories } from '../sub_categories.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('subCategories', function subCategoriesPublic() {
    return SubCategories.find();
});