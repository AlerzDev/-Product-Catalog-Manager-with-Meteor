import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/categories/main.js';
import '../../ui/pages/sub_categories/main.js';
import '../../ui/pages/div_sub_categories/main.js';
import '../../ui/layouts/products/main.js';
import '../../ui/pages/products/main.js';
import '../../ui/pages/products/Catalogue/categories.js';
import '../../ui/pages/products/Catalogue/sub_categories.js';
import '../../ui/pages/products/Catalogue/div_sub_categories.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { categories: 'categoriesMain' });
  },
});
FlowRouter.route('/sub-categorias', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { categories: 'subCategoriesMain' });
    },
});
FlowRouter.route('/div-sub-categorias', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { categories: 'divSubCategoriesMain' });
    },
});
FlowRouter.route('/productos', {
    name: 'App.home',
    action() {
        BlazeLayout.render('productsLayout', { products: 'productsMain' });
    },
});
FlowRouter.route('/catalogo-categorias', {
    name: 'App.home',
    action() {
        BlazeLayout.render('productsLayout', { products: 'categoriesCatalogueMain' });
    },
});
FlowRouter.route('/catalogo-sub-categorias', {
    name: 'App.home',
    action() {
        BlazeLayout.render('productsLayout', { products: 'subCategoriesCatalogueMain' });
    },
});
FlowRouter.route('/catalogo-div-sub-categorias', {
    name: 'App.home',
    action() {
        BlazeLayout.render('productsLayout', { products: 'divSubCategoriesCatalogueMain' });
    },
});
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('productsLayout', { products: 'App_notFound' });
  },
};
