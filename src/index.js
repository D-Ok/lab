
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
       $product.append('Price: ');
       $product.append($(`<span class="wrong-price">`).text(price));
       $product.append('Special price: ');
       $product.append($(`<span class="product-special-prise">`).text(special_price));
    } else {
       $product.append('Price: ');
       $product.append($(`<span class="product-price">`).text(price));
   }
    $product.append($(`<button class="prod-btn-discr"
     data-button-id-descr="${id}" >`).text('Detail information'));
    let $prodButton= $(`<button name="${id}"  data-button-id="${id}" class="prod-btn" >`);
    $prodButton.append($(`<img src="images/shop_black.png" alt="button" class="img-prod-btn">`));
    $product.append($prodButton);
    return $product;
};

let _makeHtmlCategory=({
                          id,
                          name,
                          description,
                      }) => {
    let $category= $(`<li class="category" data-category-id="${id}" id="${id}-category" >`);
    $category.text(name);
    $category.append($(`<div id="${id}-description-category" hidden="true">`).text(description));
    return $category;
};

let _makeHtmlForProdInCart=({ id,
                                name,
                                image_url,
                                description,
                                price,
                                special_price,
                            }) => {
    let $mainP=$(`<li data-id-li="${id}" class="li-cart">`);
    let $product = $(`<div class="productInCart" hidden="true" data-product-id="${id}" id="${id}-productInCart">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image-cart align-self-center">`));

    $product.append('Name: ');
    $product.append($(`<span class="product-title-cart card-text">`).text(name));
    $product.append($(`<br>`));
    $product.append('Description: ');
    $product.append($(`<span class="product-description-cart card-text">`).text(description));
    $product.append($(`<br>`));
    if(special_price!=null){
        $product.append('Price: ');
        $product.append($(`<span class="wrong-price-cart">`).text(price));
        $product.append($(`<br>`));
        $product.append('Special price: ');
        $product.append($(`<span class="product-special-prise-cart">`).text(special_price));
    } else {
        $product.append('Price: ');
        $product.append($(`<span class="product-price">`).text(price));
    }
    let q=0;
    $product.append($(`<br>`));
    //let $divFooter=($(`<div class="descriptionOfProductInCart card-footer">`));
    $product.append($(`<button name="${id}" class="lessBtn" id="${id}-lessBtn" > `).text('<'));
    $product.append($(`<span class="quantity" id="${id}-quantityOfProduct" data-value="${q}" > `).text(q));
    $product.append($(`<button name="${id}" class="moreBtn" >`).text('>'));
    //$product.append($divForDescr);
    $mainP.append($product);
    return $mainP;
};

let _makeHtmlForView=({ id,
                          name,
                          image_url,
                          description,
                          price,
                          special_price,
                      }) => {
    let $product = $(`<div class="productInCart-view " data-product-id="${id}" id="${id}-productInCart">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image-view align-self-center">`));
    $product.append('Name: ');
    $product.append($(`<span class="product-title-view card-text">`).text(name));
    $product.append($(`<br>`));
    $product.append('Description: ');
    $product.append($(`<div class="descriptionOfProduct-view">`).text(description));
    $product.append($(`<br>`));
    if(special_price!=null){
        $product.append('Price: ');
        $product.append($(`<span class="wrong-price-view">`).text(price));
        $product.append($(`<br>`));
        $product.append('Special price: ');
        $product.append($(`<span class="product-special-prise">`).text(special_price));
    } else {
        $product.append('Price: ');
        $product.append($(`<span class="product-price">`).text(price));
    }
    $product.append($(`<br>`));
    $product.append($(`<input type="button" name="Close" class="close-view" value="Close">`));
    return $product;
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
/*
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'post',
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
});*/


$(document).ready(function (){

    $('.send').on('click', function(){
        $('#formToSend').removeAttr('hidden', 'true');
    });

    $('#closeForm').on('click', function(){
        $('#formToSend').attr("hidden", "true");
    });

    $('.nav-item').on('click',function(){
        //console.log();
        let name=$(this).attr('href');
        console.log(name);
        let element=$(name);
        let l= document.getElementById('all-content');
        let m=document.getElementById('about');
        let c=document.getElementById('cart');
        // var lo=document.getElementById('logIn');
        l.setAttribute('hidden', 'true');
        // l.classList.remove("active");
        m.setAttribute('hidden', 'true');
        // m.classList.remove("active");

        c.setAttribute('hidden', 'true');
        //c.classList.remove("active");
        element.removeAttr('hidden');
    });
    //display products of choosen category
    $('.category').on('click',  function () {
        let id=this.getAttribute('data-category-id');
        let name = id + "-category";
        console.log(name);
        //let hoveredCat = document.getElementById(name);
        jQuery.ajax({
            url: 'https://nit.tron.net.ua/api/product/list/category/' + id,
            method: 'get',
            dataType: 'json',
            success: function (json) {
                console.table(json);
                let getDiv = jQuery('.product-grid');
                getDiv.empty();
                json.forEach(product => getDiv.append(_makeHtml(product)));
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    });
    //hover category
    $('.category').on('mouseover',  function () {
        let id=this.getAttribute('data-category-id');
        console.log('found2');
        let name=id+"-description-category";
        let hoveredCat=document.getElementById(name);
        hoveredCat.removeAttribute('hidden');
    });
  //mouseleave category
    $('.category').on('mouseleave',  function () {
        let id=this.getAttribute('data-category-id');
        let name=id+"-description-category";
        let hoveredCat=document.getElementById(name);
        hoveredCat.setAttribute('hidden', 'true');
    });
    //addition products to the cart
    $('.prod-btn').on('click', function () {
        $('.send').removeAttr('disabled');
        let productId=$(this).attr('data-button-id');
        let quantity= $('#'+productId+'-quantityOfProduct').attr('data-value');
        if(quantity==null || quantity<0) quantity=0;
        quantity++;
        let name=productId+"-quantityOfProduct";
        let element=$('#'+name);
        element.empty();
        element.text(quantity);
        element.removeAttr('data-value');
        element.attr('data-value', quantity);
        $('#'+productId+'-productInCart').removeAttr('hidden');
    });

    //addition product to the cart
    $('.moreBtn').on('click', function () {
        $('.send').removeAttr('disabled');
        let productId=$(this).attr('name');
        let quantity= $('#'+productId+'-quantityOfProduct').attr('data-value');
        if(quantity==null || quantity<0) quantity=0;
        quantity++;
        let name=productId+"-quantityOfProduct";
        let element=$('#'+name);
        element.empty();
        element.text(quantity);
        element.removeAttr('data-value');
        element.attr('data-value', quantity);
        $('#'+productId+'-productInCart').removeAttr('hidden');
    });

    //delete products from the cart
    $('.lessBtn').on('click', function () {
        let productId=$(this).attr('name');
        let name=productId+"-productInCart";
        let quantity= $('#'+productId+'-quantityOfProduct').attr('data-value');
        let element=$('#'+name);
        if(quantity<=1) {
            quantity=0;
            let allP=0;
            $('#choosen-products li').each(function(){
                let thisVal=$('#'+productId+'-quantityOfProduct');
                let q=$(thisVal).attr('data-value');
                if(q!=null && q>0){
                    allP++;
                }
            });
            if(allP==0) $('.send').attr('disabled', 'true');
            element.attr('hidden', 'true');
            element=$('#'+productId+'-quantityOfProduct');
            element.attr('data-value', quantity);
        }
        else {
            quantity--;
            name=productId+"-quantityOfProduct";
            element=$('#'+name);
            element.empty();
            element.text(quantity);
            element.attr('data-value', quantity);

        }
    });


    $('.prod-btn-discr').on('click', function () {
        let productId=$(this).attr('data-button-id-descr');
        jQuery.ajax({
            url: 'https://nit.tron.net.ua/api/product/'+productId,
            method: 'get',
            dataType: 'json',
            success: function(json){
                console.table(json);
                let getDiv=jQuery('#seaProduct');
                getDiv.empty();
                getDiv.append(_makeHtmlForView(json));
                $('.close-view').on('click', function(){
                    console.log('close');
                    $('#seaProduct').attr("hidden", "true");
                });
                getDiv.removeAttr('hidden');
            },
            error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    });


    $('#sendPost').on('click',function () {
        let arrProd=[];
        $('#choosen-products li').each(function(){
            let nameId=$(this).attr('data-id-li');
            let thisVal=$('#'+nameId+'-quantityOfProduct');
            console.log(thisVal);
            let q=$(thisVal).attr('data-value');
            console.log(q);
            if(q!=null && q>0){
                arrProd.push(new ProductToBuy(nameId, q));
                console.log(nameId);
            }
        });
        if(arrProd.length>0) {
            let products;
            for(let i=0; i<arrProd.length; i++){
                products="&products["+arrProd[i].quantity+"]="+arrProd[i].id;
            }
            jQuery.ajax({
                url: 'https://nit.tron.net.ua/api/order/add',
                method: 'post',
                data: 'token=GjJCNdBNHWiLQhO_pfWN&name=' + $('#userName').value + '&email=' + $('#userE-mail').value + '&phone=' +
                    $('#userNumber').value + ''+products,
                dataType: 'json',
                success: function (json) {
                    console.log(json);
                },
                error: function(xhr){
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
        } else {
            console.log('no products to buy');
        }
    });

});
class ProductToBuy{
    constructor(id, quantity){
        this.id=id;
        this.quantity=quantity;
    }
}

/*
$.ajax({
    url: 'https://nit.tron.net.ua/api/order/add',
    method: 'post',
    data: 'name=Ivan&email=ivan@ivan.com&phone=123&products[2]=5&products[4]=1&token=GjJCNdBNHWiLQhO_pfWN',
    dataType: 'json',
    success: function(json){
        console.log(json);
    },
});*/
