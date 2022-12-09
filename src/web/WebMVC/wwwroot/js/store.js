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

            var $wishList = $(this);

            itemWishListViewModel = {
                ProductId: $(this).attr('data-id'),
                Name: $(this).attr('data-name'),
                Image: $(this).attr('data-image'),
                Quantity : 1
            }

            if ($(this).hasClass('js-addedwish-b2')) {
                $.post('wishlist/remove-itemWishList', { id: $(this).attr('data-id') }, function () {
                }).done(function () {
                    swal(nameProduct, "Foi removido da sua lista de desejo!", "success");
                    $wishList.removeClass('js-addedwish-b2');
                    handleWishList(-1);
                }).fail(function (data) {
                    swal("", data.responseJSON[0], "error");
                })
            } else {
                $.post('wishlist/add-item', itemWishListViewModel, function () {
                }).done(function () {
                    swal(nameProduct, "Foi adicionado a sua lista de desejo!", "success");
                    $wishList.addClass('js-addedwish-b2');
                    $('.swal-button--confirm').click(function () { window.location.reload() })
                }).fail(function (data) {
                    swal("", data.responseJSON[0], "error");
                })
            }                  
        });
    });

    $('.js-addwish-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

        $(this).on('click', function () {

            var $wishList = $(this);

            itemWishListViewModel = {
                ProductId: $('#productId').val(),
                Name: $('#productName').val(),
                Image: $('#productImage').val(),
                Quantity: 1
            }

            if ($(this).hasClass('js-addedwish-b2')) {
                $.post('wishlist/remove-itemWishList', { id: $(this).attr('data-id') }, function () {
                }).done(function () {
                    swal(nameProduct, "Foi removido da sua lista de desejo!", "success");
                    $wishList.removeClass('js-addedwish-b2');
                    handleWishList(-1);
                }).fail(function (data) {
                    swal("", data.responseJSON[0], "error");
                })
            } else {
                $.post('wishlist/add-item', itemWishListViewModel, function () {
                }).done(function () {
                    swal(nameProduct, "Foi adicionado a sua lista de desejo!", "success");
                    $wishList.addClass('js-addedwish-b2');
                    $('.swal-button--confirm').click(function () { window.location.reload() })
                }).fail(function (data) {
                    swal("", data.responseJSON[0], "error");
                })
            }
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
        }).done(function () {
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
    }).done(function (data) {

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

function wishList(url, param, element, verb, nameProduct) {
    $.post(url, param, function () {
    }).done(function () {
        swal(nameProduct, verb ? "Foi adicionado a sua lista de desejo!" : "Foi removido da sua lista de desejo!", "success");
        element.removeClass('js-addedwish-b2');
    }).fail(function (data) {
        swal("", data.responseJSON[0], "error");
    })
}

function searchProduct(name) {

    var $topeContainer = $('.isotope-grid');

    var $topeItem = $('.isotope-item');

    var reg = new RegExp(name, "i");

    if (name) {
        $topeItem.hide().filter(function () {
            return $(this).find('.js-name-b2').text().match(reg);
        }).show();
        $topeContainer.isotope('layout')
    } else {
        $topeItem.show();
        $topeContainer.isotope('layout')
    }
}
