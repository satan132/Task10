function TasksViewModel() {
    var appId = 'oiIsTuvUoFkxtWw9FwACl5HIWUcnJ7CquCcyYwEw';
    var restApiKey = '8jzKG0OHXci1NDPv6yCvcsORcht9uasbusd0rxiL';
    var pclass = 'tasks';

    var self = this;

    self.objectId = '';
    self.Desc = '';
    self.Date = '123434343';

    self.status = ['not_started', 'in_progress', 'ready_test', 'completed'];

    self.not_started = ko.observableArray([]);
    self.in_progress = ko.observableArray([]);
    self.ready_test = ko.observableArray([]);
    self.completed = ko.observableArray([]);

    self.add = function(element, type) {
        if (self.Desc.length > 0) {
            save({
                Desc: self.Desc,
                Status: type
            });
        }
    };

    self.clickTask = function(element) {
        var $el = $(element).parent().find('.bbutton-edit');
        $el.css('display', 'block');
    };

    function update(obj) {

    }

    function save(task) {
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass,
            type: 'POST',
            data: JSON.stringify({
                description: task.Desc,
                status: task.Status
            }),
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                var obj = {
                    objectId: ko.observable(response.objectId),
                    Desc: ko.observable(task.Desc),
                    Date: response.createdAt,
                    isEditing: ko.observable(false),
                    edit: function () {
                        obj.isEditing(true);
                    },
                    save: function () {
                        obj.isEditing(false);
                        update(this);
                    }
                };

                if(task.Status == 'not_started') {
                    self.not_started.push(obj);
                } else if(task.Status == 'in_progress') {
                    self.in_progress.push(obj);
                } else if(task.Status == 'ready_test') {
                    self.ready_test.push(obj);
                } else if(task.Status == 'completed') {
                    self.completed.push(obj);
                }
                self.Desc = '';
            },
            error: function () {
                alert('can not be added');
            }
        };
        $.ajax(options);
    }

    (function load() {
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                if (response && response.results && response.results.length) {
                    var l = response.results.length;
                    for(var i = l - 1; i >= 0; --i) {
                        var r = response.results[i];
                        var obj = {
                            objectId: ko.observable(r.objectId),
                            Desc: ko.observable(r.description),
                            Date: r.updatedAt,
                            isEditing: ko.observable(false),
                            edit: function () {
                                this.isEditing(true);
                            },
                            save: function () {
                                update(this);
                                this.isEditing(false);
                            }
                        };

                        if(r.status == 'not_started') {
                            self.not_started.push(obj);
                        } else if(r.status == 'in_progress') {
                            self.in_progress.push(obj);
                        } else if(r.status == 'ready_test') {
                            self.ready_test.push(obj);
                        } else if(r.status == 'completed') {
                            self.completed.push(obj);
                        }
                    }
                }
            },
            error: function () {
                alert('Can\'t retrieve data');
            }
        };
        $.ajax(options);
    })();
}

