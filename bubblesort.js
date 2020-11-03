let values = [];
let i = 0;
let button;
let btnClear;

let drawBubbleSort = false;
let checkRun = false;
let titleBool = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(width);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    //values[i] = noise(i/100.0)*height;
  }

  drawArray();
  title();

  button = createButton('Bubble Sort');
  button.size(100,40);
  button.position(700,25);
  button.mousePressed(changeBool);

  btnQuickSort = createButton('Quick Sort');
  btnQuickSort.size(100,40);
  btnQuickSort.position(840,25);

  btnReset = createButton('Reset Array');
  btnReset.size(80);
  btnReset.position(980,40);
  btnReset.mousePressed(reset);

  
}

function changeBool() {
  if(checkRun==true) {
    drawBubbleSort = true;
    loop();
  }
  else {
    drawBubbleSort = true;
  }
}

function reset() {
  i = 0;
  clear();

  values = new Array(width);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  drawArray();
  drawBubbleSort = false;

  title();

}


function draw() {

if(drawBubbleSort == true) {
  background(255);
  if (i < values.length) {
    for (let j = 0; j < values.length - i - 1; j++) {
      if (values[j] > values[j + 1]) {
        strokeWeight(0,255,0);
        swap(values, j, j + 1);
      }
    }
    //This for loop runs once through the length, then iterates i by one after it breaks out then does in a loop until the entire sort is accounted for
  } else {
    console.log('Done Sorting');
    noLoop();
    checkRun = true;
  }
  i++;
  title();

  drawArray();
}

}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function title() {
  textFont('Bungee Shade');
  textSize(30);
  strokeWeight(0);
  fill(0, 102, 153);
  text('Sorting Algorithm Visualization',80, 50);
}

function drawArray() {
  for (let i = 0; i < values.length; i+=10) {
    strokeWeight(8);
    //stroke(Math.floor(Math.random() * (255 - 0 + 1) + 0));
    stroke(255,0,0);
    line(i, height, i, height - (values[i]));
  }
}
