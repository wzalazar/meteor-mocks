Session.set("typeNumber",true);

Template.formCron.helpers({
	typeNumber: function(){
		return Session.get("typeNumber");
	}

})

Template.formCron.events({
	'change #typeField': function(event){
		if (event.target.value == "number"){
			Session.set("typeNumber",true);
		}
		else{
			Session.set("typeNumber",false);
		}

	},

	'change #fieldSelect': function(event){
		$("#field").val(event.target.value);
	}
	
})

