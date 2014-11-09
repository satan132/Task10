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

    var name = window.location.hash ? window.location.hash.substring(1) : types[0].name;
    var status = (function(name) {
        for(var i in types) {
            if (types[i].name == name) return types[i].status;
        }
        return undefined;
    })(name);

    if (status == undefined) {
        name = types[0].name;
        status = types[0].status;
    }

    ko.applyBindings(new GeneralModel(
        types,
        window.location.hash ? window.location.hash : types[0].name
    ), document.getElementById('button-slider'));

    ko.applyBindings(
        new TasksViewModel(name, status),
        document.getElementById('btasks')
    );



}


$(document).ready(function() {
    Apps();
});
