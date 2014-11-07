function GeneralModel(types, func) {
    if (types.length == 0) return;

    var self = this;

    this.types = types;

    self.chosenFolderId = ko.observable();

    self.goToMail = function(mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // Stop showing a folder
        $.get("/mail", { mailId: mail.id }, self.chosenMailData);
    };

    this.select = function(i) {
        func(i);
    };

    this.select(types[0].name);
}