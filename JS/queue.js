// import * as lib from '../JS/queueLib.js';

let enQueueBtn = document.getElementById('EnQueueBtn');
let deQueueBtn = document.getElementById('DeQueueBtn');
// let valueToEnQueue = document.getElementById('valueToEnQueue');

enQueueBtn.addEventListener('click', enQueuefun);
deQueueBtn.addEventListener('click', deQueuefun);

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

function drawStackBody() {
  /* drawing the stack body */
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(700, 200);
  ctx.moveTo(150, 300);
  ctx.lineTo(700, 300);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#688C86';
  ctx.stroke();
  /* Queue word */
  ctx.font = '40px cursive'; //35-->40
  ctx.fillStyle = '#688C86';
  ctx.textAlign = 'center';
  ctx.fillText('Queue', 420, 350); //410-->350
}

drawStackBody();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    // this.counter = 0;
  }
  //function to check if the queue is empty
  isEmpty() {
    if (this.head == null) {
      return true;
    } else {
      return false;
    }
  }
  Peek() {
    if (this.isEmpty()) {
      console.log('Queue is empty');
    } else {
      return this.head.data;
    }
  }
  //function to EnQueue a value
  EnQueue(value) {
    // this.counter++;
    let newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
    } else {
      let temp = this.head;
      while (temp.next != null) {
        temp = temp.next;
      }
      temp.next = newNode;
    }
    console.log(this.counter);

    drawNewNode(value);
  }
  DeQueue() {}
}
let myQ = new Queue();
let counter = 0;
var posArr = [
  { x: 610, y: 210, value: 0 },
  { x: 520, y: 210, value: 0 },
  { x: 430, y: 210, value: 0 },
  { x: 340, y: 210, value: 0 },
  { x: 250, y: 210, value: 0 },
  { x: 160, y: 210, value: 0 },
];
let nodeW = 80;
let nodeH = 80;
let nodeX = 40;
let nodeDX = 0;
let nodeY = 40;
let nodeDY = 0;
let textX = 80;
let textDX = 0;
let textY = 95;
let textDY = 0;
let speed = 2;
let val = 0;

async function drawNewNode(value) {
  val = value;
  ctx.fillStyle = 'white';
  ctx.fillRect(nodeX, nodeY, nodeW, nodeH);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(val, textX, textY);
  await sleep(1000);
  nodeDX = nodeX;
  nodeDY = nodeY;
  textDX = textX;
  textDY = textY;
  //   nodeDY = nodeY;
  console.log('drawnode' + counter);
  moveNodeY();
}
function moveNodeY() {
  ctx.clearRect(nodeDX - speed, nodeDY - speed, nodeW + speed, nodeH + speed);
  //   nodeDX += speed;
  nodeDY += speed;
  //   textDX += speed;
  textDY += speed;
  console.log('moveY' + counter);
  if (nodeDY < posArr[counter].y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(nodeDX, nodeDY, nodeW, nodeH);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(val, textDX, textDY);
  } else {
    moveNodeX();
    return;
  }
  requestAnimationFrame(moveNodeY);
}
function moveNodeX() {
  ctx.clearRect(nodeDX - speed, nodeDY - speed, nodeW + speed, nodeH + speed);
  nodeDX += speed;
  //   nodeDY += speed;
  textDX += speed;
  //   textDY += speed;
  console.log('moveY' + counter);
  //   posArr[counter].x;
  if (nodeDX < posArr[counter].x) {
    ctx.fillStyle = 'white';
    ctx.fillRect(nodeDX, nodeDY, nodeW, nodeH);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(val, textDX, textDY);
  } else {
    ctx.fillStyle = 'white';
    ctx.fillRect(nodeDX, nodeDY, nodeW, nodeH);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(val, textDX, textDY);
    counter++;
    enQueueBtn.disabled = false;
    deQueueBtn.disabled = false;
    return;
  }
  requestAnimationFrame(moveNodeX);
}

function enQueuefun() {
  let valueToEnQueue = document.getElementById('valueToEnQueue');
  enQueueBtn.disabled = true;
  deQueueBtn.disabled = true;
  myQ.EnQueue(valueToEnQueue.value);
}
function deQueuefun() {}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
