$(function () {

    $('.js-hide-modal1').on('click', function () {
        $('.js-modal1').removeClass('show-modal1');
    });


    $('.js-modal1').on('click', function () {
        if (!$('.js-modal1').hasClass('show-modal1')) {
            $('.num-product').val(1);
        }
    })

    $('.js-addwish-b2').on('click', function (e) {
        e.preventDefault();
    });

    $('.js-addwish-b2').each(function () {
        var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass('js-addedwish-b2');
            $(this).off('click');
        });
    });

    $('.js-addwish-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

        $(this).on('click', function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass('js-addedwish-detail');
            $(this).off('click');
        });
    });

    $('.js-addcart-detail').on('click', function () {

        let cartViewModel = {
            ProductId: $('#productId').val(),
            Name: $('#productName').val(),
            Quantity: $('.num-product').val(),
            Value: $('#productValue').val(),
            Image: $('#productImage').val()
        }

        $.post('/cart/add-item', cartViewModel, function () {
        })
            .done(function () {
                var nameProduct = $('.js-name-detail').html();
                swal(nameProduct, "Foi adicionado ao seu carrinho!", "success");
                $('.swal-button--confirm').click(function () { window.location.reload() })
            })
            .fail(function (data) {
                swal("", data.responseJSON[0], "error");
            })
    });


    $(".js-select2").each(function () {
        $(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(this).next('.dropDownSelect2')
        });
    })

    let urlPage = new URLSearchParams(window.location.search).get('id');
    let urlSearch = new URLSearchParams(window.location.search).get('search');


    if (urlPage || urlSearch) {

        url = new URL(window.location.href);
        url.searchParams.delete("id");
        url.searchParams.delete("search");
        window.history.pushState('', '', url);
    }
});

function quantityStock(quantity) {
    return quantity > 0 ? `<small class="text-success">Apenas ${quantity} em estoque!</small>` : `<small class="text-danger">Produto esgotado!</small>`;
}

function dataFilter(filter) {
    var $filter = $('.filter-tope-group');

    $filter.find('button').each(function () {
        if ($(this).attr('data-filter') == filter) {
            $(this).click();
        }
    });
}

function openLogin() {
    $('#modalLoginForm').modal('show');
}

function openModal(id) {

    $.get('/loja/' + id, function () {
    })
        .done(function (data) {

            $('.js-name-detail').html(data.name);
            $('.price').html('R$ ' + data.value.toFixed(2));
            $('.description').html(data.description);
            $('.productStock').html(quantityStock(data.quantityStock));
            $('.item1').find('img').attr('src', 'images/' + data.image);
            $('.item1').parent().attr('data-thumb', 'images/' + data.image);


            $('#productId').val(data.id);
            $('#productName').val(data.name);
            $('#productValue').val(data.value);
            $('#productImage').val(data.image);


            $('.js-modal1').addClass('show-modal1');
        });
}