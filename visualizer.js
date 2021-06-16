let values = [];
let i = 0;
let w = 10;
let states = [];

let x = 0;

let button;
let btnClear;

let callMethod = true;
//we only want quicksort to run once
let drawBubbleSort = false;
let drawQuickSort = false;
let drawMergeSort = false;

let checkRun = false;
let titleBool = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  title();
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

  btnQuickSort = createButton('Merge Sort');
  btnQuickSort.size(100,40);
  btnQuickSort.position(1130,25);
  btnQuickSort.mousePressed(changeMergeBool);

  btnReset = createButton('Reset');
  btnReset.size(80);
  btnReset.position(1290,35);
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

function changeMergeBool() {
  if(checkRun==true) {
    drawMergeSort = true;
    loop();
  }
  else {
    drawMergeSort = true;
  }
}

function changeQuickBool() {
  
  if(checkRun==true&&drawBubbleSort==false) {
    drawQuickSort = true;
    loop();
  }
  else if(drawBubbleSort==false) {
    drawQuickSort = true;
  } 
}

function reset() {
  if(isSorted(values)||(drawBubbleSort==false&&drawQuickSort==false&&drawQuickSort==false))
  {
    i = 0;
    x = 0;
    drawBubbleSort = false;
    drawQuickSort = false;
    drawMergeSort = false;
    callMethod = true;
    clear();
  
    values = new Array(floor(width/w));
    for (let i = 0; i < values.length; i++) {
      values[i] = random(height);
    }
    drawArray();
  }
}

function draw() {
if(drawBubbleSort == true&&drawQuickSort==false) {
  background(255);
  if (i < values.length) {
    stroke(0);
    for (let j = 0; j < values.length - i - 1; j++) {
      if (values[j] > values[j + 1]) {
        swap(values, j, j + 1);
      }
    }
    //This for loop runs once through the length, then iterates i by one after it breaks out then does in a loop until the entire sort is accounted for
  } else {
    checkRun = true;
    console.log('Done Sorting');
    
  }
  i++;
  drawArray();
  if(isSorted(values)){
    drawFinishedArray(x);
    x++;
  }
}
else if (drawQuickSort==true) {
  if(callMethod){
    quickSort(values, 0, values.length - 1);
    callMethod = false;
  }
  drawArray();
  if(isSorted(values)){
    drawFinishedArray(x);
    x++;
  }
  }
  
}

function isSorted(arr) {
  for(let i = 0; i < arr.length-1; i++) {
    if(arr[i] > arr[i+1]) {
       return false;
    }
  }
  return true;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function title() {
  textFont('Bungee Shade');
  textSize(30);
  stroke(0);
  fill(0,255,0);
  text('Sorting Algorithm Visualization',80, 50);
}


function drawFinishedArray(x) {
  frameRate(60);
  background(0);
  for (let i = 0; i < values.length; i++) {  
    if(i<x) {
      fill('#00ff00');
    }
    else{
      fill(255);
    }
    rect(i * w , height-values[i], w ,values[i]);
    title();
  }
}

function drawArray() {
  frameRate(20);
  background(0);
  for (let i = 0; i < values.length; i++) {   
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
  await sleep(30);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
