function Apps() {
    var types = [
        {
            name: 'tasks',
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
            var el = document.getElementById('btasks');
            ko.cleanNode(el);
            ko.applyBindings(
                new TasksViewModel(i, (function(name) {
                    for(var j in types) {
                        if (types[j].name == name) return types[j].status;
                    }
                })(i)),
                document.getElementById('btasks')
            );
        }), document.getElementById('button-slider')
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
