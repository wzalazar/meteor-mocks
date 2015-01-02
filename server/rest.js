WebApp.connectHandlers.use("/hello", function(req, res, next) {
  console.log(req);
  res.writeHead(200);
  res.end("Hello world from: " + Meteor.release);
});