
var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

var io = require('socket.io')(server);

let ActiveRooms = [];
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get("/",async (req,res) => {
  res.render("home");
})

app.get("/createRoom",async (req,res) => {
  res.render("createRoom");
})

app.get("/:roomCode", async(req,res) => {

  res.render("draw.ejs");

})

app.post("/Join",async (req,res) => {
  res.redirect(`/${req.body.RoomCode}`);
})

app.post("/Create", async (req,res) => {
  res.redirect(`/${req.body.RoomCode}`);
})

io.sockets.on('connection',socket => {
  temp = socket.handshake.headers.referer.split("/");
  socket.emit("serverMsg",temp[temp.length - 1]);
  socket.join(temp[temp.length - 1]);

  socket.on('mouse',data => {
      socket.to(data.room).emit('mouse', data);
    }
  );
}


);

