function openLogin() {
    $('#modalLoginForm').modal('show');
}

function openModal(id) {

    $.get('/loja/' + id, function () {
    })
    .done(function (data) {

        $('.js-name-detail').html(data.name);
        $('.price').html('R$ '+ data.value.toFixed(2));
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


$('.js-hide-modal1').on('click', function () {
    $('.js-modal1').removeClass('show-modal1');
});

function quantityStock(quantity) {
    return quantity > 0 ? `<small class="text-success">Apenas ${quantity} em estoque!</small>` : `<small class="text-danger">Produto esgotado!</small>`;
}

$('.js-modal1').on('click', function () {
    if (!$('.js-modal1').hasClass('show-modal1')) {
        $('.num-product').val(1);
    }
})