/**
 * Created by lemux-dev on 27/01/17.
 */
import './main.html';
import {SubCategories} from '../../../api/sub_categories/sub_categories.js';
import {DivSubCategories} from '../../../api/div_sub_categories/div_sub_categories.js';
Template.subCategoriesMain.onCreated(function () {
    Meteor.subscribe('divSubCategories');
    Meteor.subscribe('subCategories');
});
Template.subCategoriesMain.helpers({
   listSubcategories:()=>{
       return SubCategories.find({category: Session.get('category')});
   },
    countDivSucategories:(id)=>{
       const num = DivSubCategories.find({subCategory:id}).count();
       if(num>0){
           return true;
       }else {
           return false;
       }
    }
});
Template.subCategoriesMain.events({
   'click .view-div-sub-categories':function (event) {
       event.preventDefault();
       const subCategory= this._id;
       Session.set('subCategory', subCategory);
       FlowRouter.go('/div-sub-categorias');
   },
    'click .view-products-sub':function (event) {
        event.preventDefault();
        const subCategory= this._id;
        Session.set('nameSection', this.name);
        Session.set('products', {subCategory:subCategory});
        FlowRouter.go('/productos');
    }
});