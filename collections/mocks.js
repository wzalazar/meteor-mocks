Schema = {};

Schema.Mocks = new SimpleSchema({
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
		type: String,
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
    responsebody: {
        type: String,
        autoform: {
		    rows: 10
		 }
    }
});

Mocks = new Meteor.Collection("mocks");
Mocks.attachSchema(Schema.Mocks);


