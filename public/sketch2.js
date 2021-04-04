let strokeW;
let slider;
var socket;
let HOST;
function setup() {
  createCanvas(windowWidth, 800);
  background(0);
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(width/2,height+10);
  slider = createSlider(1, 30, 5);
  slider.position(width/2 - 150, height + 10);
  HOST = location.origin.replace(/^http/, 'ws')
  socket = io.connect(HOST);

  socket.on('mouse',(data) => {
      fill(data.color);
      stroke(data.color);
      strokeWeight(data.strokeWeigh);
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
  strokeW = slider.value();
  strokeWeight(strokeW);
  line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX,mouseY,color1,pmouseX,pmouseY,strokeW);
}

function sendmouse(xpos, ypos, color1, pX, pY, strokeW) {



  var data = {
    x: xpos,
    y: ypos,
    color: color1,
    px: pX,
    py: pY,
    strokeWeigh: strokeW,
  };


  socket.emit('mouse',data);
}
