import './body.html';
import {Configuration} from '../../../api/configuration/configuration.js';
Template.App_body.onCreated(function () {
   Meteor.subscribe('configuration');
});
Template.App_body.helpers({
   configuration:()=>{
       return Configuration.findOne();
   }
});