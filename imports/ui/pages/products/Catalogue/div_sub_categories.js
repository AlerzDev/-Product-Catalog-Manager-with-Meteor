/**
 * Created by lemux-dev on 27/01/17.
 */
import './div_sub_categories.html';
import {DivSubCategories} from '../../../../api/div_sub_categories/div_sub_categories.js';

Template.divSubCategoriesCatalogueMain.onCreated(function () {
   Meteor.subscribe('divSubCategories');
});
Template.divSubCategoriesCatalogueMain.helpers({
   listDivSubCategories :()=>{
       return DivSubCategories.find({subCategory:Session.get('subCategory')});
   }
});
Template.divSubCategoriesCatalogueMain.events({
    'click .view-products-div':function (event) {
        event.preventDefault();
        const subCategory = Session.get('subCategory');
        const divSubCategory = this._id;
        Session.set('nameSection', this.name);
        Session.set('products', {subCategory:subCategory, divSubCategory: divSubCategory});
        FlowRouter.go('/productos');
    }
});