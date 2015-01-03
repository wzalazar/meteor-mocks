
// Redirect to a random URL, better handled client-side
WebApp.connectHandlers.use("/rest",function(req, res, next) {
    var path= (req.url).substring(1, (req.url).length);
    var mock= Mocks.findOne({"path":path});
    //res.writeHead(mock.responseStatus,{'Content-Type': mock.contentType});  
    res.writeHead(parseInt(mock.responseStatus), {'Content-Type': mock.contentType}); 
    if (mock.status){
    	res.end(mock.responseBody);
    	next();
    }
	else{
		res.end('Mock disabled');
		next();
	}
});


