function GeneralModel(types, func) {
    if (types.length == 0) return;

    var self = this;

    this.types = types;

    self.chosenTypeId = ko.observable();

    this.select = function(i) {
        self.chosenTypeId(i);
        func(i);
    };

    this.select(types[0].name);
}