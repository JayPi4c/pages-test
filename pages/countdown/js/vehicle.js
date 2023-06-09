// Daniel Shiffman
// http://codingtra.in

class Vehicle {

  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();

    this.target = createVector(x, y);
    this.d = 2;
    this.maxspeed = 20;
    this.maxforce = 5;
    this.col = 255;
    this.arrived = false;
    this.wobble = p5.Vector.random2D().setMag(0.01);
    this.wobbleProb = 0.0001;
    this.maxWobble = 0;
    this.hidden = false;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  steering(target) {
    if (!this.arrived) {
      let desired = p5.Vector.sub(target, this.pos);
      let d = desired.mag();
      let speed = this.maxspeed;
      if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
        if (d < 1) {
          this.arrived = true;
        }
      }
      desired.setMag(speed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    } else {
      if (random() < this.wobbleProb)
        this.applyForce(this.wobble);
      if (p5.Vector.sub(target, this.pos).mag() > this.maxWobble)
        this.arrived = false;
    }
  }


  show() {
    stroke(this.col);
    strokeWeight(this.d);
    point(this.pos.x, this.pos.y);
  }

  updateTarget(newTarget) {
    this.target = newTarget;
    this.hidden = false;
  }

  updateColor(col) {
    this.col = col;
  }

  randomPosition() {
    this.pos = createVector(random(width), random(height));
    this.hidden = true;
  }
}