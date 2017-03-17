/**
 * Created by alejandrolemusrodriguez on 25/01/17.
 */
import './main.html';
import {Categories} from '../../../api/categories/categories.js';
import '../../components/modals/large_modal.js';
import {Configuration} from '../../../api/configuration/configuration.js';

Template.categoriesMain.onCreated(function () {
   Meteor.subscribe('categories');
});
Template.categoriesMain.helpers({
    listCategories:()=>{
        return Categories.find();
    },
    more:()=>{
        const num = Categories.find().count();
        if(num>2){
            return true; } else {
            return false;
        }
    },
    BASE_URL:()=>{
        if(Configuration.findOne()){
            return Configuration.findOne().urlStaticServer;
        }

    }
});
Template.categoriesMain.events({
   'click .view-sub-categories':function(event){
       event.preventDefault();
       const category = this._id;
       Session.set('category', category);
       FlowRouter.go('/sub-categorias');
   }
});