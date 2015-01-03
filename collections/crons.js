Schema = {};

Schema.Crons = new SimpleSchema({
	status:{
		type: Boolean,
		autoValue: function(){ if (this.isInsert) return false; }
	},
	dateCreated:{
		type: Date,
		autoValue: function(){  
			if (this.isInsert) return new Date; 
		}
	},
 	displayName:{
 		type: String,
 		label: "Display Name"
	},
	schedule:{
		type: String
	},
	mockId:{
		type: String
	},
	userId:{
		type: String,
		autoValue: function(){  
			if (this.isInsert) return Meteor.userId(); 
		}
	},
	field:{
		type: String
	},
	typeField:{
		type: String
	},
	add:{
		type: Number,
		optional: true
	},
	less:{
		type: Number,
		optional: true
	},
	change:{
		type: Number,
		optional: true
	}
});

Crons = new Meteor.Collection("crons");
Crons.attachSchema(Schema.Crons);


