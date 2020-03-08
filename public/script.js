document
    .querySelector('header button')
    .addEventListener('click', function() {
        document.querySelector('main .section-form')
        .classList.toggle('hide');
});