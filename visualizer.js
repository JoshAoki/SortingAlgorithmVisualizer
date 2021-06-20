let values = [];
let i = 0;
let w = 20;
let states = [];

let x = 0;

let allArr = [];

let button;
let btnClear;

let callMethod = true;
//we only want quicksort to run once
let drawBubbleSort = false;
let drawQuickSort = false;
let drawMergeSort = false;
let drawHeapSort = false; 

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
  button.size(100, 40);
  button.position(850, 25);
  button.mousePressed(changeBool);

  btnQuickSort = createButton('Quicksort');
  btnQuickSort.size(100, 40);
  btnQuickSort.position(990, 25);
  btnQuickSort.mousePressed(changeQuickBool);

  btnQuickSort = createButton('Merge Sort');
  btnQuickSort.size(100, 40);
  btnQuickSort.position(1130, 25);
  btnQuickSort.mousePressed(changeMergeBool);

  btnQuickSort = createButton('Heapsort');
  btnQuickSort.size(100, 40);
  btnQuickSort.position(710, 25);
  btnQuickSort.mousePressed(changeHeapBool);

  btnReset = createButton('Reset');
  btnReset.size(80);
  btnReset.position(1290, 35);
  btnReset.mousePressed(reset);  
}

function changeHeapBool() {
  if(checkRun) {
    drawHeapSort = true;
    loop();
  }
  else {
    drawHeapSort = true;
  }
} 

function changeBool() {
  if(checkRun && drawQuickSort == false && drawMergeSort == false) {
    drawBubbleSort = true;
    for (let i = 0; i < values.length; i++) {
      states[i] = 1;
    }
    loop();
  }
  else if(drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false) {
    for (let i = 0; i < values.length; i++) {
      states[i] = 1;
    }
    drawBubbleSort = true;
  }
}

function changeMergeBool() {
  for (let i = 0; i < values.length; i++){
    states[i] = 1;
  }
  if(checkRun) {
    drawMergeSort = true;
    loop();
  }
  else {
    drawMergeSort = true;
  }
}

function changeQuickBool() {
  if(checkRun && drawBubbleSort == false && drawMergeSort == false) {
    drawQuickSort = true;
    loop();
  }
  else if(drawBubbleSort == false && drawMergeSort == false) {
    drawQuickSort = true;
  } 
}

function reset() {
  if(isSorted(values)||(drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false))
  {
    i = 0;
    x = 0;
    drawBubbleSort = false;
    drawQuickSort = false;
    drawHeapSort = false;
    drawMergeSort = false;
    callMethod = true;
    allArr = [];
    clear();
  
    values = new Array(floor(width/w));
    for (let i = 0; i < values.length; i++) {
      values[i] = random(height);
    }
    drawArray();
  }
}

function draw() {
  if(drawBubbleSort && drawQuickSort == false) {
    background(255);
    if (i < values.length) {
      stroke(0);
      for (let j = 0; j < values.length - i - 1; j++) {
        if (values[j] > values[j + 1]) {
          swap(values, j, j + 1);
        }  
      }
      states[values.length - i - 1] = 0;
      for (let j = values.length-i; j >= 0; j--) {
        states[values.length-i] = -1;
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

else if (drawQuickSort) {
  if(callMethod){
    quickSort(values, 0, values.length);
    callMethod = false;
  }
  drawArray();
  if(isSorted(values)){
    drawFinishedArray(x);
    x++;
  }
  }

else if(drawMergeSort){   
  mergeSort(values, 0, values.length - 1);
  drawArray();
  if(isSorted(values)){
    drawFinishedArray(x);
    x++;
  }
}
else if(drawHeapSort){
  heapSort(values);
  drawArray();
  if(isSorted(values)){
    drawFinishedArray(x);
    x++;
  }
}
  
}

//Checks if Sorted
function isSorted(arr) {
  for(let i = 0; i < arr.length-1; i++) {
    if(arr[i] > arr[i+1]) {
       return false;
    }
  }
  return true;
}

//Title
function title() {
  textFont('Bungee Shade');
  textSize(30);
  stroke(0);
  fill(197, 139, 231);
  text('Sorting Algos', 80, 50);
}

//drawArray functions
function drawFinishedArray(x) {
  frameRate(60);
  background(0);
  for (let i = 0; i < values.length; i++) {  
    if(i < x) {
      if(drawBubbleSort){
        fill('#A8D5BAFF');
      }
      else{
        fill('#F9D8CE');
      }
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
    if(drawQuickSort){
      if (states[i] == 0) {
        fill('#68D1C5');
      } else if (states[i] == 1) {
        fill('#F4B3CE');
      } else {
        fill(255);
      }
    }
    else if(drawBubbleSort){
      if (states[i] == 0) {
        fill('#D7A9E3FF');
      } else if (states[i] == 1) {
        fill('#8BBEE8FF');
      } else {
        fill(255);
      }
    }
    else if(drawMergeSort){
      if (states[i] == 0) {
        fill('#D7A9E3FF');
      } else if (states[i] == 1) {
        fill('#8BBEE8FF');
      } else {
        fill(255);
      }
    }
    
    rect(i * w , height-values[i], w ,values[i]);
  }
  title();
}

//Sorting Algo Functions
function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function heapSort(a) {
  //setTimeout(40);
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    heapify(a, a.length, i);
  }

  for (let i = a.length - 1; i >= 0; i--) {
      let tmp = a[0];
      a[0] = a[i];
      a[i] = tmp;

      allArr.push(a.slice());

    heapify(a, i, 0);
  }
}

async function heapify(a, n, i) {
  //setTimeout(30);
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && a[l] > a[largest]) {
      largest = l;
  }

  if (r < n && a[r] > a[largest]) {
      largest = r;
  }

  if (largest !== i) {
      let tmp = a[i];
      a[i] = a[largest];
      a[largest] = tmp;

      allArr.push(a.slice());

      heapify(a, n, largest);
  }
}

async function mergeSort(a, low, high) {
  if (low < high) {
      //pass in array, get mid value, and call mergesort for both sides and merge them together
      let mid = parseInt(((low + high) / 2).toString());
      await mergeSort(a, low, mid);
      await mergeSort(a, mid + 1, high);
      await merge(a, low, mid, high);
  }
}

async function merge(a, low, mid, high) {
  await sleep(50);
  //breaks up the array by mid point and creates 2 arrays
  let n1 = mid - low + 1;
  let n2 = high - mid;

  let l = new Array(n1);
  let r = new Array(n2);

  //fills array with values of array parameter
  for (let i = 0; i < n1; i++) {
      l[i] = a[low + i];
  }

  for (let i = 0; i < n2; i++) {
      r[i] = a[mid + i + 1];
  }

  let i = 0;
  let j = 0;
  let k = low;
  
  //compares every value in the array to the other array and puts the smaller value in a base array w the size of the the original array
  //iterates whichever value is smaller to next integer in that specific array 
  while (i < n1 && j < n2) {
      if (l[i] <= r[j]) {
          a[k] = l[i];            
          i++;
          
      } else {
          a[k] = r[j];                  
          j++;
      }
      k++;
      allArr.push(a.slice());
  }
  //just pushes rest of the values in each array into the base array
  while (i < n1) {
      a[k] = l[i];
      i++;
      k++;

      allArr.push(a.slice());
  }

  while (j < n2) {
      a[k] = r[j];
      j++;
      k++;

      allArr.push(a.slice());
  }

  //for (let i = 0; i < n1+n2; i++) {
  //  states[i] = -1;   
  //}

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
