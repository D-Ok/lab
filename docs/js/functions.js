
function go(str) {
    var element=document.getElementById(str);
    var l= document.getElementById('all-content');
    var m=document.getElementById('about');
    var c=document.getElementById('cart');
   // var lo=document.getElementById('logIn');
    l.setAttribute('hidden', 'true');
    l.classList.remove("active");
    m.setAttribute('hidden', 'true');
    m.classList.remove("active");

    c.setAttribute('hidden', 'true');
    c.classList.remove("active");
   // lo.setAttribute('hidden', 'true');
   // lo.classList.remove("active");
    element.removeAttribute('hidden');
    element.classList.add("active");
}

let _makeHtmlCategoryDesc=({
                               id,
                               name,
                               description,
                           }) => {
    let $info= $(`<span class="category-description">`);
    $info.text(description);
    return $info;
};

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
    $prodButton.append($(`<img src="images/shop_black.png" alt="button" class="img-prod-btn">`))
    $product.append($prodButton);
    return $product;
};

function displayList(id){
    let name=id+"-category";
    console.log(name);
    let hoveredCat=document.getElementById(name);
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/'+id,
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.table(json);
            let getDiv=jQuery('.product-grid');
            getDiv.empty();
            json.forEach(product => getDiv.append(_makeHtml(product)));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}
function displayDescription(id){
    console.log('found2');
    let name=id+"-description-category";
    let hoveredCat=document.getElementById(name);
    hoveredCat.removeAttribute('hidden');
   /* console.log(name);
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/category/'+id,
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.log(json.description);
            let d=JSON.stringify(json.description);
            console.log(d);
            //json.forEach(pr => hoveredCat.append(_makeHtmlCategoryDesc(pr)));
            hoveredCat.append($(`<div class="category-description">`).text(d.toString()));
            //console.log('hovered '+hoveredCat.getAttribute('data-category-id'));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });*/
}


function hideDescription(id) {
    console.log('found2');
    let name=id+"-description-category";
    let hoveredCat=document.getElementById(name);
    hoveredCat.setAttribute('hidden', 'true');
}

class productToBuy{
    constructor(id, quantity){
        this.id=id;
        this.quantity=quantity;
    }
}
let productsInCart=[];
function addToCart(id) {
    if(productsInCart.length==0) {
        let prod= new productToBuy(id, 1);
        productsInCart.push(id);
        getProduct(id);
    } else {
        let same=false;
        for(let i=0; i<productsInCart.length; i++){
            if(productsInCart[i].id==id){
                same=true;
                productsInCart[i].quantity++;
                addProductTo(id, productsInCart[i].quantity);
                break;
            }
        }
        if(!same) {
            let prod= new productToBuy(id, 1);
            productsInCart.push(id);
            getProduct(id);
        }
    }
}

let _makeHtmlForProdInCart=({ id,
                               name,
                               image_url,
                               description,
                               price,
                               special_price,
                           }) => {
    let $mainP=$(`<li>`);
    let $product = $(`<div class="productInCart" data-product-id="${id}" id="${id}-productInCart">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image align-self-center">`));
    $product.append($(`<span class="product-title card-text">`).text(name));
    if(special_price!=null){
        $product.append($(`<span class="wrong-price">`).text(price));
        $product.append($(`<span class="product-special-prise">`).text(special_price));
    } else {
        $product.append($(`<span class="product-price">`).text(price));
    }
    let q=1;
    let prod;
    for(let i=0; i<productsInCart.length; i++){
        if(productsInCart[i].id==id){
            q=productsInCart[i].quantity;
            prod=productsInCart[i];
            break;
        }
    }
    $product.append($(`<button name="${id}" class="lessBtn" id="${id}-lessBtn" onclick="addProductTo(this.getAttribute('name'), (q-1));"> `).text('<'));
    $product.append($(`<span class="quantity" id="${id}-quantityOfProduct">`).text(q));
    $product.append($(`<button name="${id}" class="moreBtn" onclick="addProductTo(this.getAttribute('name'), (q+1));">`).text('>'));
    $mainP.append($product);
    return $mainP;
};

function addProductTo(productId, quantity) {
    let name=productId+"-productInCart";
    let element=document.getElementById(name);
    if(quantity==0) {
        element.addClass("unuseful");
    }
    else {
        name=productId+"-quantityOfProduct";
        element=document.getElementById(name);
        if(element!=null) {
            element.empty();
            element.text(quantity);
        }
    }
}

function getProduct(productId) {
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/'+productId,
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.table(json);
            let getDiv=jQuery('#choosen-products');
            //getDiv.empty();
            //json.forEach(product =>
                getDiv.append(_makeHtmlForProdInCart(json));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

let _makeHtmlForView=({ id,
                           name,
                           image_url,
                           description,
                           price,
                           special_price,
                       }) => {
    let $product = $(`<div class="productInCart" data-product-id="${id}" id="${id}-productInCart">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image align-self-center">`));
    $product.append($(`<span class="product-title card-text">`).text(name));
    $product.append($(`<div class="descriptionOfProduct">`).text(description));
    if(special_price!=null){
        $product.append($(`<span class="wrong-price">`).text(price));
        $product.append($(`<span class="product-special-prise">`).text(special_price));
    } else {
        $product.append($(`<span class="product-price">`).text(price));
    }
    return $product;
};
function viewProduct(productId) {
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/'+productId,
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.table(json);
            let getDiv=jQuery('.modal-body');
            getDiv.empty();
           // get
            //json.forEach(product =>
            getDiv.append(_makeHtmlForView(json));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

