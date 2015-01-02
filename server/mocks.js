Meteor.publish('mocks', function() {
    return Mocks.find({});
});

Meteor.publish('idMock', function(id) {
    console.log(Mocks.find(id));
    return Mocks.find(id);
});


Mocks.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});


