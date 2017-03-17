/**
 * Created by lemux-dev on 28/01/17.
 */
import './categories.html';
import {Categories} from '../../../../api/categories/categories.js';
Template.categoriesCatalogueMain.onCreated(function () {
    Meteor.subscribe('categories');
});
Template.categoriesCatalogueMain.helpers({
    listCategories:()=>{
        return Categories.find();
    },
    more:()=>{
        const num = Categories.find().count();
        if(num>2){
            return true; } else {
            return false;
        }
    }
});
Template.categoriesCatalogueMain.events({
    'click .view-sub-categories-catalogue':function(event){
        event.preventDefault();
        const category = this._id;
        Session.set('category', category);
        FlowRouter.go('/catalogo-sub-categorias');
    }
});