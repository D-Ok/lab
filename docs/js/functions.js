

/*let _makeHtml = ({
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
*/




/*let _makeHtmlForProdInCart=({ id,
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
    let q=0;
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
};*/

/*
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
}*/




