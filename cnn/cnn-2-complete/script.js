// Interface elements
let canvasDiv;
let canvas;
let textDiv;
let label;
let buttonDiv;
let hereButton;
let notHereButton;
let saveDataButton;
let trainButton;

let video;
let videoSize = 16;
let ready = false;

let pixelBrain;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  label = createP("Collect data, then train your model.");
  label.parent(textDiv);
  buttonDiv = createDiv();
  hereButton = createButton("Here");
  hereButton.parent(buttonDiv);
  hereButton.mousePressed(function() {
    addExample("Here");
  });
  notHereButton = createButton("Not Here");
  notHereButton.parent(buttonDiv);
  notHereButton.mousePressed(function() {
    addExample("Not Here");
  });
  trainButton = createButton("Train Model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(trainModel);
  saveDataButton = createButton("Save Data");
  saveDataButton.parent(buttonDiv);
  saveDataButton.mousePressed(function() {
    pixelBrain.saveData();
  });
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.style("display", "none");
  let options = {
    inputs: videoSize * videoSize * 3,
    outputs: 2,
    task: "classification",
    debug: true
  };
  pixelBrain = ml5.neuralNetwork(options);
  pixelBrain.loadData("model/data.json", trainModel);
}

function trainModel() {
  label.html("Model currently training!");
  pixelBrain.normalizeData();
  pixelBrain.train({epochs: 50}, finishedTraining);
}

function finishedTraining() {
  classifyVideo();
}

function classifyVideo() {
  let inputs = [];
  video.loadPixels();
  for(let i = 0; i < video.pixels.length; i+=4) {
    let r = video.pixels[i + 0];
    let g = video.pixels[i + 1];
    let b = video.pixels[i + 2];
    inputs.push(r, g, b);
  }
  pixelBrain.classify(inputs, gotResults);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    label.html(results[0].label);
    classifyVideo();
  }
}

function addExample(label) {
  let inputs = [];
  video.loadPixels();
  for(let i = 0; i < video.pixels.length; i+=4) {
    let r = video.pixels[i + 0];
    let g = video.pixels[i + 1];
    let b = video.pixels[i + 2];
    inputs.push(r, g, b);
  }
  let target = [label];
  pixelBrain.addData(inputs, target);
}

function videoReady() {
  ready = true;
}

function draw() {
  background(0);
  if(ready) {
    let w = width / videoSize;
    video.loadPixels();
    for(let x = 0; x < video.width; x++) {
      for(let y = 0; y < video.height; y++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        noStroke();
        fill(r, g, b);
        rect(x * w, y * w, w, w);
      }
    }
  }
}
