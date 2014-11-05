function pageSize() {
    $('#content').css('height', $(window).height()-41 + 'px');
}


$(document).ready(function() {
    pageSize();
});
