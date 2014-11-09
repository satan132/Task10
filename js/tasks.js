function TasksViewModel(pclass, status) {
    var appId = 'NDwyPEkcpGLJHLUZo5TTZWmhvdFj9ZyMWJVe5TTS';
    var restApiKey = 'eyv8T2GKSx9t0iBpxHTl3WOo7CyoxSq2XGBKbrZh';

    var self = this;

    self.desc = '';
    self.date = '123434343';

    self.status = status;

    self.colstatus = [];
    for(var i = 0; i < status.length; ++i) {
        self.colstatus[status[i]] = ko.observableArray([]);
    }

    self.add = function(element, type) {
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

    function update(data, funcend) {
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass + '/' + data.objectId,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                funcend(response);
            },
            error: function () {
                alert('Failed to update status');
            }
        };
        $.ajax(options);
    }

    function remove(obj) {
        toggleHoverTaskFlag = !toggleHoverTaskFlag;
        var options = {
            url: 'https://api.parse.com/1/classes/' + pclass + '/' + obj.objectId,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', appId);
                request.setRequestHeader('X-Parse-REST-API-Key', restApiKey);
            },
            success: function (response) {
                for(var i = 0; i < self.status.length; ++i) {
                    if(obj.status == self.status[i]) {
                        self.colstatus[status[i]].remove(obj);
                        break;
                    }
                }
            },
            error: function () {
                alert('can not be removed');
            }
        };
        $.ajax(options);
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
                    objectId: response.objectId,
                    desc: ko.observable(task.desc),
                    date: ko.observable(response.createdAt),
                    isEditing: ko.observable(false),
                    edit: function () {
                        obj.isEditing(true);
                    },
                    save: function () {
                        var self = this;
                        obj.isEditing(false);
                        update({
                            desc: self.desc(),
                            objectId: self.objectId
                        }, function(r) {
                            self.isEditing(false);
                            self.date(r.updatedAt);
                        });
                    },
                    remove: function() {
                        remove(this);
                    }
                };
                for(var i = 0; i < self.status.length; ++i) {
                    if(task.status == self.status[i]) {
                        self.colstatus[self.status[i]].push(obj);
                        break;
                    }
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
                            objectId: r.objectId,
                            status: r.status,
                            desc: ko.observable(r.desc),
                            date: ko.observable(r.updatedAt),
                            isEditing: ko.observable(false),
                            edit: function () {
                                this.isEditing(true);
                            },
                            save: function () {
                                var self = this;
                                update({
                                    desc: self.desc(),
                                    objectId: self.objectId
                                }, function(r) {
                                    self.isEditing(false);
                                    self.date(r.updatedAt);
                                });
                            },
                            remove: function() {
                                remove(this);
                            }
                        };
                        for(var j = 0; j < self.status.length; ++j) {
                            if(r.status == self.status[j]) {
                                self.colstatus[self.status[j]].push(obj);
                                break;
                            }
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