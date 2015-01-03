Meteor.publish('crons', function() {
    return Crons.find({});
});

Meteor.publish('idCron', function(id) {
    return Crons.find(id);
});


Crons.allow({
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

Meteor.methods({
   createCron: function(id){
      var cron= Crons.findOne(id);
      SyncedCron.add({
        name: cron.displayName,
        schedule: function(parser) {
          // parser is a later.parse object
          return parser.text(cron.schedule);
        }, 
        job: function() {
          var cron= Crons.findOne(id);
          var mock= Mocks.findOne(cron.mockId);
          var JSONresponseBody= JSON.parse(mock.responseBody);
          JSONresponseBody.one= JSONresponseBody.one + cron.add;
          Mocks.update({"_id":cron.mockId},{$set: { "responseBody" : JSON.stringify(JSONresponseBody) } });
          console.log("cron");
        }
      });

      SyncedCron.start();
    }
});

