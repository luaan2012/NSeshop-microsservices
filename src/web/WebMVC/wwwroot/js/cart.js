function updateCart(element, id) {

    $.post('/cart/update-item', { Id: id, Quantity: $(element).parent().find('.num-product').val() } , function () {
    }).done(function () {
        var nameProduct = $('.js-name-detail').html();
        swal(nameProduct, "Seu carrinho foi atualizado!", "success");
        $('.swal-button--confirm').click(function () { window.location.reload() })
    })
    .fail(function (data) {
        if (data.responseJSON)
            swal("", data.responseJSON[0], "error");
    })
}

function applyVoucher(voucherCode) {

    $.post('cart/apply-voucher', { voucherCode: voucherCode }, function () {
    }).done(function () {
        var nameProduct = $('.js-name-detail').html();
        swal(nameProduct, "Seu desconto foi aplicado!", "success");
        $('.swal-button--confirm').click(function () { window.location.reload() })
    })
    .fail(function (data) {
        if (data.responseJSON)
            swal("", data.responseJSON[0], "error");
    })
}