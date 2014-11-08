function GeneralModel(types, pos) {
    if (types.length == 0) return;

    this.types = types;

    this.chosenTypeId = pos;

    this.select = function(i) {
        window.location.hash = i;
    };
}