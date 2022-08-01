const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d")

function Firework(dx,dy,boomHeight){
  this.x = canvas.width / 2;
  this.y = canvas.height;
  this.boomHeight = boomHeight;
  this.boom = false;
  this.dx = dx;
  this.dy = dy;
  
  this.draw = function(){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    //ctx.fillRect(this.x,this.y,5,20);
    ctx.arc(this.x,this.y,5,Math.PI * 2,0,false)
    ctx.fill();
    ctx.restore();
  }
  
  this.update = function(){
    this.x += this.dx * 5;
    this.y -= this.dy * 5;
    if(this.y < this.boomHeight){
      this.boom = true;
      for(var i = 0; i < 100; i++){
      particleArray.push(new Particle(this.x,this.y));
      }
    }
    this.draw();
  }
  this.update();
}

var colors = ["rgba(255,255,255,","rgba(91,230,123,","rgba(4,243,60,","rgba(4,211,243","rgba(102,204,255,","rgba(102,133,255"]

function Particle(x,y){
  this.x = x;
  this.y = y;
  this.alpha = 1;
  this.fade = false;
  this.color = colors[Math.floor(Math.random() * colors.length)]
  this.radius = Math.random() * 2 + 1;
  this.dx = (Math.random() * 10) - 4;
  this.dy = (Math.random() * 10) - 5;
  
  this.draw = function(){
    ctx.fillStyle = this.color + this.alpha + ")";
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,Math.PI * 2,0,false)
    ctx.restore();
    ctx.fill();
  }
  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.05;
    this.alpha = this.alpha - 0.02;
    if(this.alpha < 0){
      this.fade = true;
    }
    this.draw();
  }
  this.update();
}

var fireworkArray = [];
var particleArray = [];

window.addEventListener("click", function(e){
  var angle = Math.atan2(e.clientY - canvas.height,
                         e.clientX - canvas.width / 2)
  var dx = Math.cos(angle);
  var dy = Math.sin(-angle);
  fireworkArray.push(new Firework(dx,dy,e.clientY))
})

function animate(){
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(75,75,75,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i = 0; i < fireworkArray.length; i++){
    fireworkArray[i].update();
  }
  for(var i = 0; i < particleArray.length; i++){
    particleArray[i].update();
  }
  
  fireworkArray = fireworkArray.filter(obj => !obj.boom);
  particleArray = particleArray.filter(obj => !obj.fade);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

