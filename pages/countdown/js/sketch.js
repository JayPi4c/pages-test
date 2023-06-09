// made by JayPi4c
// 16 april 2019
// 10.03.2020
// 21.05.2022
// Dieses Skript zählt zu verschiedenen Uhrzeiten abhängig von dem Wochentag
// Die Grundmechaniken in diesem Skript stammen von Daniel Shiffman's Coding Train

window.onorientationchange = () => window.location.reload();

const upperLineText = "Offen für";
const lowerLineText = "Jobanfragen";

const targetDate = new Date(2024, 0, 1, 0, 0, 0);

let showCountdown;


let difference, days, hours, minutes, seconds;
let font;
let fontSize;

let upperVehicles = [];
let lowerVehicles = [];
const MAX_VEHICLES = 800;
let factor = 0.3;
let debug = false;

let textVehicles;

let gravity;
let fireworkBoost;

function preload() {
  font = loadFont("assets/NotoSans-Black.ttf");
  setInterval(countdown, 1000);
}

let fireworks;
const maxFireworks = 5;

function setup() {
  let params = getURLParams();
  debug = params.debug;

  createCanvas(windowWidth, windowHeight, P2D);

  gravity = createVector(0, windowHeight * 0.0001);
  fireworkBoost = sqrt(windowHeight * gravity.y);

  fireworks = [];
  for (let i = 0; i < maxFireworks; i++) {
    fireworks.push(new Firework());
  }

  fontSize = windowWidth * 0.1;
  factor = map(fontSize, 20, 250, 0.3, 0.1);

  now = new Date().getTime();
  distance = getTimeLeft();

  showCountdown = distance > 0;

  calculateTimeAttributes();

  // initialize upper Points
  let upperPoints = getUpperPoints();
  upperVehicles = [];
  for (let p of upperPoints) {
    let vehicle = new Vehicle(p.x, p.y);
    upperVehicles.push(vehicle);
  }
  if (upperVehicles.length < MAX_VEHICLES) {
    for (let i = upperVehicles.length; i < MAX_VEHICLES; i++) {
      let vehicle = new Vehicle(random(width), random(height));
      vehicle.updateColor(0);
      upperVehicles.push(vehicle);
    }
  }

  // initialize lower Points
  let lowerPoints = getLowerPoints();
  lowerVehicles = [];
  for (let p of lowerPoints) {
    let vehicle = new Vehicle(p.x, p.y);
    lowerVehicles.push(vehicle);
  }
  if (lowerVehicles.length < MAX_VEHICLES) {
    for (let i = lowerVehicles.length; i < MAX_VEHICLES; i++) {
      let vehicle = new Vehicle(random(width), random(height));
      vehicle.updateColor(0);
      lowerVehicles.push(vehicle);
    }
  }

  textVehicles = getVehiclesText();
}

function draw() {
  background(0);

  if (showCountdown) {
    for (let v of upperVehicles) {
      if (v.hidden) {
        continue;
      }
      v.steering(v.target);
      v.update();
      v.show();
    }
    for (let v of lowerVehicles) {
      if (v.hidden) {
        continue;
      }
      v.steering(v.target);
      v.update();
      v.show();
    }
  } else {
    textAlign(CENTER, CENTER);
    textSize(fontSize);
    strokeWeight(5);
    stroke(255);
    text("\u2764", width / 2, 4.5 * fontSize, fontSize, fontSize);
    let boundary = new Rectangle(width / 2, height / 2, width, height);
    let qtree = new QuadTree(boundary, 4);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      let f = fireworks[i];
      if (!f.exploded) {
        qtree.insert(new Point(f.firework.pos.x, f.firework.pos.y, f));
      } else {
        for (let p of f.particles) {
          qtree.insert(new Point(p.pos.x, p.pos.y, p));
        }
      }

      f.update();
      if (f.done()) fireworks.splice(i, 1);
      else f.show();
    }
    if (fireworks.length < maxFireworks) fireworks.push(new Firework());

    if (debug == "true") qtree.show();

    for (let i = 0; i < textVehicles.length; i++) {
      let range = new Circle(textVehicles[i].pos.x, textVehicles[i].pos.y, 50);
      let points = qtree.query(range);
      for (let point of points) {
        let other = point.userData;
        textVehicles[i].applyParticle(other, other instanceof Firework);
      }
      textVehicles[i].behaviors();
      textVehicles[i].update();
      textVehicles[i].show();
    }
  }
}

function getVehiclesText() {
  let vs = [];
  let bounds = font.textBounds(upperLineText, 0, 50, fontSize);
  let points = font.textToPoints(
    upperLineText,
    (width - bounds.w) / 2,
    0.5 * fontSize + fontSize,
    fontSize,
    {
      sampleFactor: 0.12,
    }
  );
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let v = new TextVehicle(pt.x, pt.y);
    vs.push(v);
  }
  bounds = font.textBounds(lowerLineText, 0, 50, fontSize);
  points = font.textToPoints(
    lowerLineText,
    (width - bounds.w) / 2,
    3 * fontSize,
    fontSize,
    {
      sampleFactor: 0.12,
    }
  );
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let v = new TextVehicle(pt.x, pt.y);
    vs.push(v);
  }

  return vs;
}

function countdown() {
  calculateTimeAttributes();
  showCountdown = distance > 0;

  // mache die Liste der Punkte neu
  if (showCountdown) {
    updateVehicles(upperVehicles, getUpperPoints());
    updateVehicles(lowerVehicles, getLowerPoints());
  }
}

function calculateTimeAttributes() {
  distance = getTimeLeft();
  days = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / 1000);

}

function updateVehicles(vehs, pts) {
  let i;
  for (i = 0; i < vehs.length; i++) {
    if (pts.length <= i) {
      break;
    }
    vehs[i].updateTarget(createVector(pts[i].x, pts[i].y));
    vehs[i].updateColor(255);
  }
  if (i < vehs.length) {
    for (i; i < vehs.length; i++) {
      // hide vehicle
      vehs[i].randomPosition();
      vehs[i].updateColor(color(0, 0));
    }
  }
}

function getUpperPoints() {
  let bounds = font.textBounds(days + "d " + hours + "h", 0, 50, fontSize);
  return font.textToPoints(
    days + "d " + hours + "h ",
    (width - bounds.w) / 2,
    0.5 * fontSize + fontSize,
    fontSize,
    {
      sampleFactor: factor,
    }
  );
}

function getLowerPoints() {
  let bounds = font.textBounds(
    minutes + "m " + seconds + "s",
    0,
    100,
    fontSize
  );
  return font.textToPoints(
    minutes + "m " + seconds + "s",
    (width - bounds.w) / 2,
    3 * fontSize,
    fontSize,
    {
      sampleFactor: factor,
    }
  );
}

function getTimeLeft() {
  let now = new Date();
  if (now < targetDate) return targetDate.getTime() - now.getTime();
  else return -1;
}
