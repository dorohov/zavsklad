function openOverlay() {
    $('body').addClass('is--overlay')
}

function closeOverlay() {
    $('body').removeClass('is--overlay')
}

$('.overlay').on('click', function() {
    closeOverlay()
});