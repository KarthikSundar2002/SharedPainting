
var socket;
let HOST;
function setup() {
  createCanvas(windowWidth, 800);
  background(0);
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(width/2,height+5);
  HOST = location.origin.replace(/^http/, 'ws')
  socket = io.connect(HOST);

  socket.on('mouse',

    function(data) {

      fill(data.color);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {

}

function mouseDragged() {
  color1 = colorPicker.value();
  fill(colorPicker.value());
  noStroke();
  ellipse(mouseX,mouseY,20,20);

  sendmouse(mouseX,mouseY,color1);
}

function sendmouse(xpos, ypos, color1) {

  console.log("sendmouse: " + xpos + " " + ypos);

  var data = {
    x: xpos,
    y: ypos,
    color: color1
  };


  socket.emit('mouse',data);
}
