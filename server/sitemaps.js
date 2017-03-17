/**
 * Created by lemux-dev on 28/01/17.
 */

sitemaps.add('/sitemap.xml', function() {
    // required: page
    // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
    return [
        { page: '/', lastmod: new Date(),changefreq: 'monthly' },
        { page: '/productos', lastmod: new Date(), changefreq: 'monthly' },
        { page: '/categorias', lastmod: new Date(), changefreq: 'monthly'},
        { page: '/sub-categorias', lastmod: new Date(), changefreq: 'monthly'},
    ];
});