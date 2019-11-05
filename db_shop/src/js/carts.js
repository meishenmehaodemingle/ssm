let update_url = BASE_URL + "/carts/count";

$(function () {
    let CART_URL = "http://localhost:8080/api/carts/list?uid=6";
    $.get(CART_URL, function (result) {
        if (result != null && result.status === 200) {
            let $main = $(".cartMain_hd");
            let template = create_template(result.data);
            $main.after(template);
            init()
        }
    }, 'json');

    let $allCheckbox;     //全局的全部checkbox
    let $wholeChexbox;
    let $cartBox;                       //每个商铺盒子
    let $shopCheckbox;             //每个商铺的checkbox
    let $sonCheckBox;                //每个商铺下的商品的checkbox

    let $plus;
    let $reduce;
    let $all_sum;


    let $order_lists = null;
    let $order_content = '';


    // 删除购物车商品
    let delBtn;

    function init() {
        //全局的checkbox选中和未选中的样式
        $allCheckbox = $('input[type="checkbox"]');     //全局的全部checkbox
        $wholeChexbox = $('.whole_check');
        $cartBox = $('.cartBox');                       //每个商铺盒子
        $shopCheckbox = $('.shopChoice');               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
        $allCheckbox.click(function () {
            if ($(this).is(':checked')) {
                $(this).next('label').addClass('mark');
            } else {
                $(this).next('label').removeClass('mark')
            }
        });

        //===============================================全局全选与单个商品的关系================================
        $wholeChexbox.click(function () {
            let $checkboxs = $cartBox.find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });


        $sonCheckBox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：所有单个商品是否勾选
                    let len = $sonCheckBox.length;
                    let num = 0;
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num === len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');
                }
            })
        });

        //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

        //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
        $shopCheckbox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：店铺全选中，则全局全选按钮打对勾。
                    let len = $shopCheckbox.length;
                    let num = 0;
                    $shopCheckbox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num === len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                    $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                } else {
                    //否则，全局全选按钮取消对勾
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                    $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });

        //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

        //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
        $cartBox.each(function () {
            let $this = $(this);
            let $sonChecks = $this.find('.son_check');
            $sonChecks.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                        let len = $sonChecks.length;
                        let num = 0;
                        $sonChecks.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num === len) {
                            $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                            $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                        }

                    } else {
                        //否则，店铺全选取消
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });
        });


        //=================================================商品数量==============================================
        $plus = $('.plus');
        $reduce = $('.reduce');
        $all_sum = $('.sum');
        //  商品数量+1
        $plus.click(function () {
            let $this = $(this);
            let data = {
                cartId: $this.parent().attr('cart_id'),
                op: 1,
            };
            // 获取点击的+按钮

            $.get(update_url, data, function (results) {
                if (results != null && results.status === 200) {
                    if (results.data === 1) {
                        let $inputVal = $this.prev('input'),
                            $count = parseInt($inputVal.val()) + 1,
                            $obj = $this.parents('.amount_box').find('.reduce'),
                            $priceTotalObj = $this.parents('.order_lists').find('.sum_price'),
                            $price = $this.parents('.order_lists').find('.price').html(),  //单价
                            $priceTotal = $count * parseInt($price.substring(1));
                        $inputVal.val($count);
                        $priceTotalObj.html('￥' + $priceTotal);
                        if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
                            $obj.removeClass('reSty');
                        }
                        totalMoney();
                    }
                }
            }, 'json');
        });
        //    商品数量-1
        $reduce.click(function () {
            // 获取点击的-按钮
            let $this = $(this);
            let data = {
                cartId: $this.parent().attr('shop_id'),
                op: 2,
            };

            $.get(update_url, data, function (results) {
                if (results != null && results.status === 200) {
                    if (results.data === 1) {
                        let $inputVal = $this.next('input'),

                            $count = parseInt($inputVal.val()) - 1,

                            $priceTotalObj = $this.parents('.order_lists').find('.sum_price'),

                            $price = $this.parents('.order_lists').find('.price').html(),
                            $priceTotal = $count * parseInt($price.substring(1));
                        if ($inputVal.val() > 1) {
                            $inputVal.val($count);
                            $priceTotalObj.html('￥' + $priceTotal);
                        }
                        if ($inputVal.val() === 1 && !$this.hasClass('reSty')) {
                            $(this).addClass('reSty');
                        }
                        totalMoney();
                    }
                }
            }, 'json');

        });

        $all_sum.keyup(function () {
            let $count = 0,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = 0;
            if ($(this).val() === '') {
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g, ''));
            $count = $(this).val();
            $priceTotal = $count * parseInt($price.substring(1));
            $(this).attr('value', $count);
            $priceTotalObj.html('￥' + $priceTotal);
            totalMoney();
        });

        //======================================移除商品========================================
        delBtn = $('.delBtn');
        delBtn.click(function () {
            $order_lists = $(this).parents('.order_lists');
            $order_content = $order_lists.parents('.order_content');
            $('.model_bg').fadeIn(300);
            $('.my_model').fadeIn(300);
        });

        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });

        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }

        //确定按钮，移除商品
        $('.dialog-sure').click(function () {
            $order_lists.remove();
            if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                $order_content.parents('.cartBox').remove();
            }
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();
        });

        //======================================总计==========================================


        function totalMoney() {
            let total_money = 0;
            let total_count = 0;
            let calBtn = $('.calBtn a');
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    //  商品价格
                    let goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                    //  商品的数量
                    let num = parseInt($(this).parents('.order_lists').find('.sum').val());
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.total_text').html('￥' + total_money);
            $('.piece_num').html(total_count);

            // console.log(total_money,total_count);

            if (total_money !== 0 && total_count !== 0) {
                if (!calBtn.hasClass('btn_sty')) {
                    calBtn.addClass('btn_sty');
                }
            } else {
                if (calBtn.hasClass('btn_sty')) {
                    calBtn.removeClass('btn_sty');
                }
            }
        }
    }

});


