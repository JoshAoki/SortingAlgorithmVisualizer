let values = [];
let i = 0;
let w = 10;
let states = [];

let button;
let btnClear;

let callMethod = true;
//we only want quicksort to run once
let drawBubbleSort = false;
let drawQuickSort = false;

let checkRun = false;
let titleBool = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width/w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    //values[i] = noise(i/100.0)*height;
  }
  

  drawArray();
  

  button = createButton('Bubble Sort');
  button.size(100,40);
  button.position(850,25);
  button.mousePressed(changeBool);

  btnQuickSort = createButton('Quick Sort');
  btnQuickSort.size(100,40);
  btnQuickSort.position(990,25);
  btnQuickSort.mousePressed(changeQuickBool);

  btnReset = createButton('Reset');
  btnReset.size(80);
  btnReset.position(1130,35);
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

function changeQuickBool() {
  
  if(checkRun==true) {
    drawQuickSort = true;
    loop();
  }
  else {
    drawQuickSort = true;
  }
    
  
  
}

function reset() {
  i = 0;
  drawBubbleSort = false;
  drawQuickSort = false;
  callMethod = true;
  clear();
  values = new Array(floor(width/w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  drawArray();
  

}


function draw() {

if(drawBubbleSort == true) {
  background(255);
  if (i < values.length) {
    for (let j = 0; j < values.length - i - 1; j++) {
      if (values[j] > values[j + 1]) {
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
  

  drawArray();
}
else if (drawQuickSort==true) {
  if(callMethod){
    quickSort(values, 0, values.length - 1);
    callMethod = false;
  }
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
  fill(0,255,0);
  text('Sorting Algorithm Visualization',80, 50);
}

function drawArray() {
  frameRate(10);
  background(0);
  
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
    if(drawQuickSort==true){
      if (states[i] == 0) {
        fill('#E0777D');
      } else if (states[i] == 1) {
        fill('#D6FFB7');
      } else {
        fill(255);
      }
    }
    
    rect(i * w , height-values[i], w ,values[i]);
  }
  title();
}
async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await quickSwap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await quickSwap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}
async function quickSwap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}