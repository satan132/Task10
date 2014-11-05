function pageSize() {
    $('#content').css('height', $(window).height()-41 + 'px');
    $('#btasks').css('width', $(window).width()-31 + 'px');
}


$(document).ready(function() {
    pageSize();
});
