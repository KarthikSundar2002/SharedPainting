
var socket;
let HOST;
function setup() {
  createCanvas(windowWidth, 800);
  background(0);
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(width/2,height+5);
  HOST = location.origin.replace(/^http/, 'ws')
  socket = io.connect(HOST);

  socket.on('mouse',(data) => {
      fill(data.color);
      stroke(data.color);
      line(data.x, data.y, data.px, data.py);
    }
  );
}

function draw() {

}

function mouseDragged() {
  color1 = colorPicker.value();
  fill(colorPicker.value());
  stroke(colorPicker.value());

  line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX,mouseY,color1,pmouseX,pmouseY);
}

function sendmouse(xpos, ypos, color1, pX, pY) {

  console.log("sendmouse: " + xpos + " " + ypos);

  var data = {
    x: xpos,
    y: ypos,
    color: color1,
    px: pX,
    py: pY
  };


  socket.emit('mouse',data);
}
