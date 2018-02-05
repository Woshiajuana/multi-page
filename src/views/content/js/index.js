import $ from '../../../assets/lib/jquery1.8/jquery-1.8.0'

$(() => {
    $('p').on('click', function () {
        alert($(this).html());
    })
});
