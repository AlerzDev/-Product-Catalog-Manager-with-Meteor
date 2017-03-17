/**
 * Created by alejandrolemusrodriguez on 24/01/17.
 */
import { Products } from '../products.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('products', function productsPublic() {
    return Products.find();
});