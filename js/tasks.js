function TasksViewModel() {
    var appId = 'NDwyPEkcpGLJHLUZo5TTZWmhvdFj9ZyMWJVe5TTS';
    var restApiKey = 'eyv8T2GKSx9t0iBpxHTl3WOo7CyoxSq2XGBKbrZh';
    var pclass = 'tasks';

    var self = this;

    self.objectId = '';
    self.desc = '';
    self.date = '123434343';

    self.status = ['not_started', 'in_progress', 'ready_test', 'completed'];

    self.not_started = ko.observableArray([]);
    self.in_progress = ko.observableArray([]);
    self.ready_test = ko.observableArray([]);
    self.completed = ko.observableArray([]);

    self.add = function(element, type) {
        alert(1);
        if (self.desc.length > 0) {
            save({
                desc: self.desc,
                status: type
            });
        }
    };

    var toggleHoverTaskFlag = true;
    self.toggleHoverTask = function(element) {
        var $el = $(element).parent().find('.bbutton-edit');
        if (toggleHoverTaskFlag) {
            $el.css('display', 'block');
        } else {
            $el.css('display', 'none');
        }
        toggleHoverTaskFlag = !toggleHoverTaskFlag;
    };

    function update(data) {
        /*blockLi(id, 'wait');
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass + '/' + id,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                var t = $('#task' + id);
                t.find('.btitle').html(data.title);
                t.find('.bdesc').html(data.desc);
                t.find('.bext').html(data.ext);
                $('#m' + id).text(response.updatedAt);
                b.text('Edit');
                unblockLi(id);
            },
            error: function () {
                showError('Failed to update status');
                unblockLi(id);
            }
        };
        $.ajax(options);*/
    }

    function del(id) {

    }

    function save(task) {
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass,
            type: 'POST',
            data: JSON.stringify({
                desc: task.desc,
                status: task.status
            }),
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                var obj = {
                    objectId: ko.observable(response.objectId),
                    desc: ko.observable(task.desc),
                    date: response.createdAt,
                    isEditing: ko.observable(false),
                    edit: function () {
                        obj.isEditing(true);
                    },
                    save: function () {
                        obj.isEditing(false);
                        update({
                            desc: self.desc,
                            objectId: self.objectId
                        });
                    }
                };

                if(task.status == 'not_started') {
                    self.not_started.push(obj);
                } else if(task.status == 'in_progress') {
                    self.in_progress.push(obj);
                } else if(task.status == 'ready_test') {
                    self.ready_test.push(obj);
                } else if(task.status == 'completed') {
                    self.completed.push(obj);
                }
                self.desc = '';
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
                            desc: ko.observable(r.desc),
                            date: r.updatedAt,
                            isEditing: ko.observable(false),
                            edit: function () {
                                this.isEditing(true);
                            },
                            save: function () {
                                var self = this;
                                update({
                                    desc: self.desc,
                                    objectId: self.objectId
                                });
                                this.isEditing(false);
                            },
                            remove: function() {
                                remove(this.objectId);
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

