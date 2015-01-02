Template.editMock.events({
	'click #content-type-predef': function(event){
		var text= $(event.target).text();
		$(".contentType").each(function(){
			$(this).val(text);
		})
	}
})
