
console.log('Hello!');
console.log('The time is ${new Date()}');
import './scss/main.scss';
//import 'bootstrap/js/*.js';	// with JS!!
import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS
//require('bootstrap');
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                 }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3 product" data-product-id="${id}">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
    $product.append($(`<span class="product-title">`).text(name));
    return $product;
};



jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);

        json.forEach(product => $('.product-grid').append(_makeHtml(product)));
        console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
