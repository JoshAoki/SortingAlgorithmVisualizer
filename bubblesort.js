
let values = [];
let i = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(width);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    //values[i] = noise(i/100.0)*height;
  }
}

function draw() {
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
  }
  i++;

  for (let i = 0; i < values.length; i++) {
    stroke(Math.floor(Math.random() * (255 - 0 + 1) + 0));
    line(i, height, i, height - values[i]);
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


