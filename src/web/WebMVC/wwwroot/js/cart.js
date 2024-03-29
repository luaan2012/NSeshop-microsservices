﻿function updateCart(element, id) {

    $("#overlay").fadeIn(300);

    $.post('/cart/update-item', { Id: id, Quantity: $(element).parent().find('.num-product').val() } , function () {
    }).done(function () {
        var nameProduct = $('.js-name-detail').html();
        swal(nameProduct, "Seu carrinho foi atualizado!", "success");
        $("#overlay").fadeOut(300);
        $('.swal-button--confirm').click(function () { window.location.reload(); })
    })
    .fail(function (data) {
        if (data.responseJSON) {
            swal("", data.responseJSON[0], "error");
            $("#overlay").fadeOut(300);
        }
    })
}

function applyVoucher(voucherCode) {

    $("#overlay").fadeIn(300);

    $.post('cart/apply-voucher', { voucherCode: voucherCode }, function () {
    }).done(function () {
        var nameProduct = $('.js-name-detail').html();
        swal(nameProduct, "Seu desconto foi aplicado!", "success");
        $("#overlay").fadeOut(300);
        $('.swal-button--confirm').click(function () { window.location.reload() })
    })
    .fail(function (data) {
        if (data.responseJSON) {
            swal("", data.responseJSON[0], "error");
            $("#overlay").fadeOut(300);
        }
    })
}

function removeVoucher(voucherCode) {

    $("#overlay").fadeIn(300);

    $.post('cart/remove-voucher', { voucherCode: voucherCode }, function () {
    }).done(function () {
        var nameProduct = $('.js-name-detail').html();
        swal(nameProduct, "Voucher removido!", "success");
        $("#overlay").fadeOut(300);
        $('.swal-button--confirm').click(function () { window.location.reload() })
    })
        .fail(function (data) {
            if (data.responseJSON) {
                swal("", data.responseJSON[0], "error");
                $("#overlay").fadeOut(300);
            }
        })
}

function registerModal(cep, id, complement, number) {
    
    $('#registerModal').modal('show');

    if (cep.toString().length < 8) 
        return

    if ($('.editAddress').length) {
        $('#complementModal').val(complement);
        $('#cepRegister').val(cep);
        $('#numberModal').val(number);
        $('#idModalRegister').val(id);
    }
    
    $("#overlay").fadeIn(300);

    $.get('https://viacep.com.br/ws/'+cep+'/json/', function () {
    }).done(function (data) {
        $('#addressModal').val(data.logradouro);
        $('#neighborhoodModal').val(data.bairro);
        $('#cityModal').val(data.localidade);
        $('#stateModal').val(data.uf);

        $("#overlay").fadeOut(300);

        $('.showRegister').fadeIn('low')
    }).fail(function () {
        $("#overlay").fadeOut(300);
    })
}

$('.editModal').click(function () {
    $('#cepRegister').val('')
    $('.showRegister').fadeOut('low');
})

$('.sendRegister').click(function () {

    var registerViewModel = {
        PublicPlace: $('#addressModal').val(),
        Complement: $('#complementModal').val(),
        Number: $('#numberModal').val(),
        Neighborhood: $('#neighborhoodModal').val(),
        Cep: $('#cepRegister').val(),
        City: $('#cityModal').val(),
        State: $('#stateModal').val(),
        Id: $('#idModalRegister').val()
    }

    var url = $('.editAddress').length ? 'edit-address' : 'register-address';

    $.post(url, registerViewModel, function () {
    }).done(function (data) {
        swal("", "Endereço registrado com sucesso!", "success");
        $('.swal-button--confirm').click(function () { window.location.reload() })
    }).fail(function (data) {
        if (data.responseJSON) {
            var response = "";

            $.each(data.responseJSON, function (i, v) {
                response += v + ' | ';
            })
            swal("", response, "error");
            $('.swal-button--confirm').click(function () { window.location.reload() })
        }
    })
});

