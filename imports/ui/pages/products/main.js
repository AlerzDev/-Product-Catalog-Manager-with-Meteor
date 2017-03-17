/**
 * Created by lemux-dev on 27/01/17.
 */
import './main.html';
import '../../components/modals/simple_modal.js';
import {Products} from '../../../api/products/products.js';
import {Configuration} from '../../../api/configuration/configuration.js';
Template.productsMain.onCreated(function () {
    Meteor.subscribe('products');
    Meteor.subscribe('configuration');
    var instance = this;
    instance.imageView = new ReactiveVar({});
    instance.nextProducts = new ReactiveVar(0);
    instance.numPagerProducts = new ReactiveVar(1);
});
Template.productsMain.helpers({
    listProducts: () => {
        const div_sub = Session.get('products');
        if (div_sub.divSubCategory) {
            return Products.find({
                subcategories: {
                    $elemMatch: {
                        id: div_sub.subCategory,
                        idDivSubCategory: div_sub.divSubCategory
                    }
                }
            }, {skip: Template.instance().nextProducts.get(), limit: 8});
        } else {
            if (div_sub.subCategory) {
                return Products.find({
                    subcategories: {
                        $elemMatch: {
                            id: div_sub.subCategory,
                            idDivSubCategory: "Does not exist"
                        }
                    }
                }, {skip: Template.instance().nextProducts.get(), limit: 8});
            }
        }
    },
    viewImage: () => {
        if (Template.instance().imageView.get()) {
            return Template.instance().imageView.get();
        }
    },
    pager: () => {

        const div_sub = Session.get('products');
        if (div_sub.divSubCategory) {
            const num = Math.ceil(Products.find({
                    subcategories: {
                        $elemMatch: {
                            id: div_sub.subCategory,
                            idDivSubCategory: div_sub.divSubCategory
                        }
                    }
                }).count() / 8);

            if (num != 0) {
                console.log(num);
                return num;
            }
        }else {
            if(div_sub.subCategory){
                const num = Math.ceil(Products.find({
                        subcategories: {
                            $elemMatch: {
                                id: div_sub.subCategory,
                                idDivSubCategory: "Does not exist"
                            }
                        }
                    }).count() / 8);

                if (num != 0) {
                    console.log(num);
                    return num;
                }
            }
        }
    },
    nameSection: () => {
        return Session.get('nameSection');
    },
    BASE_URL: () => {
        if (Configuration.findOne()) {
            return Configuration.findOne().urlStaticServer;
        }

    }
});
Template.productsMain.events({
    'click .view-details-product': function (event, instance) {
        event.preventDefault();
        instance.imageView.set(this);
    },
    'click .next-products': function (event, instance) {
        event.preventDefault();
        const num_pager = event.target.id;
        if (instance.numPagerProducts.get()<num_pager) {
            var num = instance.nextProducts.get();
            num = num + 8;
            instance.nextProducts.set(num);
            instance.numPagerProducts.set(instance.numPagerProducts.get() + 1);
        }
    },
    'click .back-products': function (event, instance) {
        event.preventDefault();
        if (instance.numPagerProducts.get() > 1) {
            var num = instance.nextProducts.get();
            num = num - 8;
            instance.nextProducts.set(num);
            instance.numPagerProducts.set(instance.numPagerProducts.get() - 1);
        }
    }
});