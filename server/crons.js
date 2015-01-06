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
        name: id,
        schedule: function(parser) {
          // parser is a later.parse object
          return parser.text(cron.schedule);
        }, 
        job: function() {
          var cron= Crons.findOne(id);
          var mock= Mocks.findOne(cron.mockId);
          var JSONresponseBody= JSON.parse(mock.responseBody);
          JSONresponseBody[cron.field] = JSONresponseBody[cron.field] + cron.add;
          Mocks.update({"_id":cron.mockId},{$set: { "responseBody" : JSON.stringify(JSONresponseBody) } });
          
        }
      });
      console.log("cron start ",id);
      SyncedCron.start(id);
    },

    stopCron : function(id){
       console.log("cron stop ",id);
       console.log(SyncedCron);
       SyncedCron.remove(id);
       SyncedCron.stop(id);
    }
});

