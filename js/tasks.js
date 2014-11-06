function TasksViewModel(desc) {
    var self = this;

    self.Desc = '';

    self.status = ['not_started', 'in_progress', 'ready_test', 'completed'];

    self.not_started = ko.observableArray([]);
    self.in_progress = ko.observableArray([]);
    self.ready_test = ko.observableArray([]);
    self.completed = ko.observableArray([]);

    self.add = function(type) {
        if (self.Desc.length > 0) {
            if(type == 'not_started') {
                self.not_started.push({
                    Desc: ko.observable(self.Desc)
                });
            }
        }
    }
}

