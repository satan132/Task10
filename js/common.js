function pageSize() {
    function size() {
        $('#content').css('height', $(window).height()-41 + 'px');
        $('#btasks').css('width', $(window).width()-31 + 'px');
        $('#edit').css('height', $(window).height() + 'px');
    }

    size();
    $(window).resize(size);
}


$(document).ready(function() {
    pageSize();

    ko.applyBindings(new TasksViewModel());
});
