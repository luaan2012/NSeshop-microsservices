function openLogin() {
    $('#modalLoginForm').modal('show');
}

function openModal(id) {

    $.get('/loja/' + id, {}, function () {
    })
    .done(function (data) {
        $('.js-name-detail').html(data.name);
        $('.price').html('R$ '+ data.value.toFixed(2));
        $('.description').html(data.description);
        $('.item1').find('img').attr('src', 'images/' + data.image);
        $('.item1').parent().attr('data-thumb', 'images/' + data.image);
        $('#productId').val(data.id);

        $('.js-modal1').addClass('show-modal1');
    });
}


$('.js-hide-modal1').on('click', function () {
    $('.js-modal1').removeClass('show-modal1');
});