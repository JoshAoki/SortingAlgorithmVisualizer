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
let drawSelectionSort = false; 

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

  btnQuickSort = createButton('Selection Sort');
  btnQuickSort.size(100, 40);
  btnQuickSort.position(710, 25);
  btnQuickSort.mousePressed(changeSelectionBool);

  btnReset = createButton('Reset');
  btnReset.size(80);
  btnReset.position(1290, 35);
  btnReset.mousePressed(reset);  
}

function changeSelectionBool() {
  if(checkRun && drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false) {
    for(let i = 0; i < values.length; i++){
      states[i] = 1;
    }
    drawSelectionSort = true;
    loop();
  }
  else if (drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false){
    for(let i = 0; i < values.length; i++){
      states[i] = 1;
    }
    drawSelectionSort = true;
  }
} 

function changeBool() {
  if(checkRun && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false && drawBubbleSort == false) {
    drawBubbleSort = true;
    for (let i = 0; i < values.length; i++) {
      states[i] = 1;
    }
    loop();
  }
  else if(drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false) {
    for (let i = 0; i < values.length; i++) {
      states[i] = 1;
    }
    drawBubbleSort = true;
  }
}

function changeMergeBool() {
  if(drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false){
    drawMergeSort = true;
    loop();
  }
}

function changeQuickBool() {
  if(checkRun && drawBubbleSort == false && drawMergeSort == false && drawSelectionSort == false) {
    drawQuickSort = true;
    loop();
  }
  else if(drawBubbleSort == false && drawMergeSort == false && drawSelectionSort == false) {
    drawQuickSort = true;
  } 
}

function reset() {
  if(isSorted(values)||(drawBubbleSort == false && drawQuickSort == false && drawMergeSort == false && drawSelectionSort == false))
  {
    i = 0;
    x = 0;
    drawBubbleSort = false;
    drawQuickSort = false;
    drawSelectionSort = false;
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
    if(isSorted(values)) {
      drawFinishedArray(x);
      x++;
    }
  }

else if (drawQuickSort) {
  if(callMethod) {
    quickSort(values, 0, values.length - 1);
    callMethod = false;
  }
  drawArray();
  if(isSorted(values)) {
    drawFinishedArray(x);
    x++;
  }
  }

else if(drawMergeSort){ 
  if(callMethod) {
    mergeSort(values, 0, values.length - 1);
    callMethod = false;
  }  
  drawArray();
  if(isSorted(values)) {
    drawFinishedArray(x);
    x++;
  }
}
else if(drawSelectionSort) {
  if(callMethod) {
    selectionSort(values);
    callMethod = false;
  } 
  drawArray();
  if(isSorted(values)) {
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
  for (let i = 0; i < values.length - 1; i++) {  
    if(i < x) {
      if(drawBubbleSort) {
        fill('#BFFCC6');
      }
      else if(drawQuickSort){
        fill('#957DAD');
      }
      else if(drawMergeSort){
        fill('#81DAFC');
      }
      else if(drawSelectionSort){
        fill('#218B82');
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
  for (let i = 0; i < values.length - 1; i++) {   
    fill(255);
    if(drawQuickSort) {
      if (states[i] == 0) {
        fill('#68D1C5');
      } else if (states[i] == 1) {
        fill('#F4B3CE');
      } else {
        fill(255);
      }
    }
    else if(drawBubbleSort) {
      if (states[i] == 0) {
        fill('#D7A9E3FF');
      } else if (states[i] == 1) {
        fill('#8BBEE8FF');
      } else {
        fill(255);
      }
    }
    else if(drawMergeSort) {
      if (states[i] == 0) {
        fill('#B5EAD7');
      } else if (states[i] == 1) {
        fill('#C3B1E1');
      } else {
        fill(255);
      }
    }
    else if(drawSelectionSort) {
      if (states[i] == 0) {
        fill('#B8E0F6');
      } else if (states[i] == 1) {
        fill('#D5E4C3');
      } else {
        fill(255);
      }
    }
    
    rect(i * w , height-values[i], w ,values[i]);
  }
  title();
}

//Sorting Algo Functions
async function selectionSort(a) {
  allArr.push(a.slice());

  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) {
          minIndex = j;
      }
    }
    let tmp = a[minIndex];
    a[minIndex] = a[i];
    a[i] = tmp;
    states[i] = 0;
    states[i-1] =  -1;
    
    await sleep(50);
    allArr.push(a.slice());
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function mergeSort(a, low, high) {
  if (low < high) {
      //pass in array, get mid value, and call mergesort for both sides and merge them together
      let mid = parseInt(((low + high) / 2).toString());
      for (let i = low; i < mid+1; i++) {
        states[i] = 1;
      }
      await mergeSort(a, low, mid);
      for (let i = mid + 2; i < high+1; i++) {
        states[i] = 1;
      }
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
      states[k-1] = -1;
      states[k] = 0;
      k++;
      allArr.push(a.slice());
  }
  //just pushes rest of the values in each array into the base array
  while (i < n1) {
      a[k] = l[i];
      i++;
      states[k-1] = -1;
      states[k] = 0;
      k++;
      allArr.push(a.slice());
  }

  while (j < n2) {
      a[k] = r[j];
      j++;  
      states[k-1] = -1;
      states[k] = 0; 
      k++;
      allArr.push(a.slice());
  }


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
