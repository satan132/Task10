function Apps() {
    var types = [
        {
            name: 'btasks',
            status: ['Not Started', 'In Progress', 'Ready Test', 'Completed']
        },
        {
            name: 'bug',
            status: ['Not Started', 'In Progress', 'Won’t Fix', 'Can\'t Reproduce', 'Ready for test', 'Fixed']
        },
        {
            name: 'enhancement',
            status: ['Not started', 'Investigation', 'Accepted', 'In Progress', 'Ready for test', 'Completed']
        }
    ];

    ko.applyBindings(new GeneralModel(
        types,
        function(i) {
            alert(i);
        }), document.getElementById('button-slider')
    );
    ko.applyBindings(
        new TasksViewModel('tasks', ['not_started', 'in_progress', 'ready_test', 'completed']),
        document.getElementById('btasks')
    );

    (function() {
        function size() {
            $('#content').css('height', $(window).height()-41 + 'px');
            $('#btasks').css('width', $(window).width()-31 + 'px');
            $('#edit').css('height', $(window).height() + 'px');
        }
        size();
        $(window).resize(size);
    })();
}


$(document).ready(function() {
    Apps();
});
