const app = require("./src/app.js");
// const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { SedderData } = require("../api/src/sedders/user-demo.js");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// const server = http.createServer(app);
// const io = socketio.listen(server);
const { conn } = require("./src/db.js");
// let io = require("socket.io").listen(server.listener);
require("./sockets")(io);

// Syncing all the models at once.
conn.sync().then(() => {
  httpServer.listen(app.get("PORT"), async () => {
    //SedderData();
    console.log("%s listening at ahi va!!!!", app.get("PORT"));
  });
});
