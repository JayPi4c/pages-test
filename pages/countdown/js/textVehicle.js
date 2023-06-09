// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

function TextVehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 4;
  this.maxspeed = 10;
  this.maxforce = 1;
}

TextVehicle.prototype.behaviors = function () {
  var arrive = this.arrive(this.target);
  // var mouse = createVector(mouseX, mouseY);

  arrive.mult(2);
  this.applyForce(arrive);
};

TextVehicle.prototype.applyParticle = function (p, firework) {
  let vector = firework ? p.firework.pos : p.pos;
  var flee = this.flee(vector);
  flee.mult(firework ? 5 : map(p.lifespan, 0, 255, 0.1, 3));
  this.applyForce(flee);
}

TextVehicle.prototype.applyForce = function (f) {
  this.acc.add(f);
};

TextVehicle.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

TextVehicle.prototype.show = function () {
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
};

TextVehicle.prototype.arrive = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
};

TextVehicle.prototype.flee = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};