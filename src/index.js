
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
                     special_price,
                 }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3 product align-items-center" data-product-id="${id}">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image align-self-center">`));
    $product.append($(`<span class="product-title card-text">`).text(name));
   if(special_price!=null){
       $product.append($(`<span class="wrong-price">`).text(price));
       $product.append($(`<span class="product-special-prise">`).text(special_price));
    } else {
       $product.append($(`<span class="product-price">`).text(price));
   }
    $product.append($(`<button class="prod-btn-discr"
     data-button-id-descr="${id}" onclick="viewProduct(this.getAttribute('data-button-id-descr'));">`).text('Detail information'));
    let $prodButton= $(`<button name="${id}"  data-button-id="${id}" class="prod-btn" 
                        onclick="addProductTo(this.getAttribute('data-button-id'), null);">`);
    $prodButton.append($(`<img src="images/shop_black.png" alt="button" class="img-prod-btn">`));
    $product.append($prodButton);
    return $product;
};

let _makeHtmlCategory=({
                          id,
                          name,
                          description,
                      }) => {
    let $category= $(`<li class="category" data-category-id="${id}" id="${id}-category" 
            onclick="displayList(this.getAttribute('data-category-id'));" 
            onmouseover="displayDescription(this.getAttribute('data-category-id'));"
            onmouseleave="hideDescription(this.getAttribute('data-category-id'))">`);
    $category.text(name);
    $category.append($(`<div id="${id}-description-category" hidden="true">`).text(description));
    return $category;
}

let _makeHtmlForProdInCart=({ id,
                                name,
                                image_url,
                                description,
                                price,
                                special_price,
                            }) => {
    let $mainP=$(`<li>`);
    let $product = $(`<div class="productInCart" hidden="true" data-product-id="${id}" id="${id}-productInCart">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image-cart align-self-center">`));
    $product.append($(`<span class="product-title-cart card-text">`).text(name));
    if(special_price!=null){
        $product.append($(`<span class="wrong-price-cart">`).text(price));
        $product.append($(`<span class="product-special-prise-cart">`).text(special_price));
    } else {
        $product.append($(`<span class="product-price">`).text(price));
    }
    let q=0;
    $product.append($(`<button name="${id}" class="lessBtn" id="${id}-lessBtn" 
     onclick="minusProductTo(this.getAttribute('name'), document.getElementById('${id}-quantityOfProduct').getAttribute('value'));"> `).text('<'));
    $product.append($(`<span class="quantity" id="${id}-quantityOfProduct" value="${q}" > `).text(q));
    $product.append($(`<button name="${id}" class="moreBtn" 
    onclick="addProductTo(this.getAttribute('name'),  document.getElementById('${id}-quantityOfProduct').getAttribute('value'));">`).text('>'));
    $mainP.append($product);
    return $mainP;
};
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);
        json.forEach(category => $('.category-list').append(_makeHtmlCategory(category)));

        console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});



jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);
        json.forEach(product => $('.product-grid').append(_makeHtml(product)));
        let getDiv=jQuery('#choosen-products');
        json.forEach(product => getDiv.append(_makeHtmlForProdInCart(product)));
        console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
