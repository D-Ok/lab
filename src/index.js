
console.log('Hello!');
console.log('The time is ${new Date()}');
import './scss/main.scss';
//import 'bootstrap/js/*.js';	// with JS!!
import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS
//require('bootstrap');
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

class Product {
    constructor(id, name, image_url, description, price, special_price){
        this.id=id;
        this.name=name;
        this.image_url=image_url;
        this.description=description;
        this.price=price;
        this.special_price=special_price;
    }
    toString(){
     return ""+this.name;
    }
}
let allProducts=[];
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
    let $prodButton= $(`<button name="${id}" class="prod-btn">`);
   $product.append($(`<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
   data-button-id-descr="${id}" onclick="viewProduct(this.getAttribute('data-button-id-descr'));">`))
    $prodButton.append($(`<img src="images/shop_black.png" alt="button" class="img-prod-btn" data-button-id="${id}" 
                onclick="addToCart(this.getAttribute('data-button-id'));">`))
    $product.append($prodButton);
  // let newProd=new Product(id,name, image_url, description, price, special_price);
  // allProducts.push(newProd);
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
function displayDescription(){
  console.log('found1');
}

function displayDescriptions(id){
    let hoveredCat=$.getElementById(id+"-category");
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/'+id,
        method: 'get',
        dataType: 'json',
        success: function(json){
            hoveredCat.append(`<div class="category-description">`).text(json.description);
            console.log('hovered '+hoveredCat.getAttribute(data-category-id));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function hideDescription(cat){

}
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
        console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
