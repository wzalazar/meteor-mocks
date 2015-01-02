Template.listMock.helpers({
	mocks: function(){
		return Mocks.find({});
	}
})

Template.listMock.events({
	'click .editMock' : function(event,template){
		event.preventDefault();
		console.log(this);
	    Router.go('editMock',{_id:this._id});
	}    
})