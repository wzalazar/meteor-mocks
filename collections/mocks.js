Schema = {};

Schema.Mocks = new SimpleSchema({
	dateCreated:{
		type: Date,
		autoValue: function(){  
			if (this.isInsert) return new Date; 
		}
	},
	userId:{
		type: String,
		autoValue: function(){  
			if (this.isInsert) return Meteor.userId(); 
		}
	},
	status:{
		type: Boolean,
		autoValue: function(){  
			if (this.isInsert) return true; 
		}
	},
 	displayName:{
 		type: String,
 		label: "Display Name"
	},
	path:{
		type: String,
		label: "Path"
	},
	verb:{
		type: String,
		label: "Verb",
		allowedValues: ['GET','POST','PUT','PATCH','DELETE','OPTIONS']
	},
	responseStatus:{
		type: Number,
		label: "Response Status"
	},
	contentType:{
		type: String,
		allowedValues: ['application/json','application/xml','text/xml','text/json','text/plain'],
		label: "Content-Type",
		defaultValue: "application/json" 
	},
	contentEncoding:{
		type: String,
		label: "Content-Encoding",
		defaultValue: "UTF-8" 
	},
    responseBody: {
        type: String,
        autoform: {
		    rows: 10
		 }
    }
});

Mocks = new Meteor.Collection("mocks");
Mocks.attachSchema(Schema.Mocks);


