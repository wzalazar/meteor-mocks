Template.listCrons.helpers({
	Crons: function(){
		return Crons.find({});
	},

	localhost: function(){
		return window.location.host;
	}
})

Template.listCrons.events({
	'click .editCron' : function(event,template){
		event.preventDefault();
		console.log("click");
	    Router.go('editCron',{_id:this.mockId,_idCron:this._id});
	},

	'click #stop': function(){
		Crons.update({'_id':this._id},{$set:{'status':false}});
	}, 

	'click #start': function(){
		Crons.update({'_id':this._id},{$set:{'status':true}});
		Meteor.call('createCron',this._id,function(result,err){
			if (err) console.log(err);
		})
	},

	'click #create-cron' : function(event,template){
		event.preventDefault();
	    Router.go('newCron',{_id:this._id});
	},

	'click #view-crons' : function(event,template){
		event.preventDefault();
	    Router.go('crons',{_id:this._id});
	},

	'click #remove': function(){
		Crons.remove(this._id);
	}
})