Template.listMock.helpers({
	mocks: function(){
		return Mocks.find({});
	},

	localhost: function(){
		return window.location.host;
	}
})

Template.listMock.events({
	'click .editMock' : function(event,template){
		event.preventDefault();
	    Router.go('editMock',{_id:this._id});
	},

	'click #stop': function(){
		Mocks.update({'_id':this._id},{$set:{'status':false}});
	}, 

	'click #start': function(){
		Mocks.update({'_id':this._id},{$set:{'status':true}});
	},

	'click .editMock' : function(event,template){
		event.preventDefault();
	    Router.go('editMock',{_id:this._id});
	},

	'click #create-cron' : function(event,template){
		event.preventDefault();
	    Router.go('newCron',{_id:this._id});
	},

	'click #edit-cron' : function(event,template){
		event.preventDefault();
	    Router.go('editCron',{_id:this._id});
	},

	'click #view-crons' : function(event,template){
		event.preventDefault();
	    Router.go('crons',{_id:this._id});
	},

	'click #remove': function(){
		Mocks.remove(this._id);
	}
})