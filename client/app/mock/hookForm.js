
if (Meteor.isServer) {
  Meteor.startup(function () {
    AutoForm.debug();
AutoForm.hooks({
  insertMockForm: {
    after: {
      insert: function(error, result, template) {
      	var user = Meteor.userId();
      	console.log(user);
      	console.log(result);
      }
    }
  }
});
  });
   AutoForm.addHooks(null, {
    onSuccess: function () {
      console.log("onSuccess on all input/update/method forms!");
    }
  });
}

