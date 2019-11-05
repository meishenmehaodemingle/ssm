/**
 * 创建购车模板
 * @param cart
 */
function create_template(carts) {
    let t1 = '<div class="cartBox">' +
        '<div class="shop_info">' +
        '<div class="all_check">' +
        '<input type="checkbox" id="shop_a" class="shopChoice">' +
        '<label for="shop_a" class="shop"/>' +
        '</div>' +
        '<div class="shop_name">' +
        '店铺：<a href="javascript:;">搜猎人艺术生活</a>' +
        '</div>' +
        '</div>' +
        '<div class="order_content">';

    for (const cart of carts) {
        t1 += getCartItemTemplate(cart)
    }
    t1 += '</div>';
    return $(t1);
}

function getCartItemTemplate(cart) {
    let no = uuid();
    return '<ul class="order_lists">' +
        '<li class="list_chk">' +
        '<input type="checkbox" id="checkbox_' +
        no +
        '" class="son_check">' +
        '<label for="checkbox_' +
        no +
        '"/>' +
        '</li>' +
        '<li class="list_con">' +
        '<div class="list_img"><a href="javascript:;">' +
        '<img src="' +
        cart.shop.img +
        '" alt=""></a></div>' +
        '<div class="list_text"><a href="javascript:;">' +
        cart.shop.name +
        '</a></div>' +
        '</li>' +
        '<li class="list_info">' +
        '<p>规格：默认</p>' +
        '<p>尺寸：16*16*3(cm)</p>' +
        '</li>' +
        '<li class="list_price">' +
        '<p class="price">￥' +
        cart.shop.price +
        '</p>' +
        '</li>' +
        '<li class="list_amount">' +
        '<div class="amount_box" shop_id="' + cart.cartId+
        '">' +
        '<a href="javascript:;" class="reduce reSty">-</a>' +
        '<input type="text" value="' +
        cart.num +
        '" class="sum">' +
        '<a href="javascript:;" class="plus">+</a>' +
        '</div>' +
        '</li>' +
        '<li class="list_sum">' +
        '<p class="sum_price">￥' +
        cart.num * cart.shop.price +
        '</p>' +
        '</li>' +
        '<li class="list_op">' +
        '<p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>' +
        '</li>' +
        '</ul>'
}


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

