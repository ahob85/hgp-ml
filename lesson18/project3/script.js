// Interface variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

let model;
let targetLabel = "C";
let state = "collection";
let env, wave;
let notes = {
  C: 261.6256,
  D: 293.6648,
  E: 329.6276,
  F: 349.2282,
  G: 391.9954
}

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  textDiv = createDiv();
  textP = createP();
  textP.parent(textDiv);
  textP.html("Step 1: Data Collection");
  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: true
  };
  model = ml5.neuralNetwork(options);
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin"
  };
  model.load(modelInfo, modelLoaded);
  createMusicSystem();
}

function createMusicSystem() {
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);
  wave = new p5.Oscillator();
  wave.setType("sine");
  wave.start();
  wave.freq(440);
  wave.amp(env);
}

function modelLoaded() {
  console.log("Model loaded!");
  state = "prediction";
  textP.html("Step 3: Prediction");
}

function keyPressed() {
  if(key == "t") {
    state = "training";
    textP.html("Step 2: Training");
    model.normalizeData();
    let options = {
      epochs: 100
    };
    model.train(options, whileTraining, finishedTraining);
  } else if(key == "s") {
    model.saveData("mouse-letters-data");
  } else if (key == "m") {
    model.save("mouse-letters-model");
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  state = "prediction";
  textP.html("Step 3: Prediction");
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };
  if(state === "collection") {
    let target = {
      label: targetLabel
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
    wave.freq(notes[targetLabel]);
    env.play();
  } else if(state === "prediction") {
    model.classify(inputs, gotResults);
  }
}

function draw() {

}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    stroke(0);
    fill(0, 0, 255);
    ellipse(mouseX, mouseY, 24);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    let label = results[0].label;
    text(label, mouseX, mouseY);
    wave.freq(notes[label]);
    env.play();
  }
}
