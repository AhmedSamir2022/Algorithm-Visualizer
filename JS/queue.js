// import * as lib from '../JS/queueLib.js';

let enQueueBtn = document.getElementById('EnQueueBtn');
let deQueueBtn = document.getElementById('DeQueueBtn');
let valueToEnQueue = document.getElementById('valueToEnQueue');

enQueueBtn.addEventListener('click', enQueuefun);
deQueueBtn.addEventListener('click', deQueuefun);

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

function drawStackBody() {
  /* drowing the stack body */
  ctx.beginPath();
  ctx.moveTo(200, 200); //300-->200
  ctx.lineTo(800, 200); //300-->200
  ctx.moveTo(200, 400);
  ctx.lineTo(800, 400);
  //   ctx.lineTo(1000, 600);
  //   ctx.lineTo(600, 200);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#688C86';
  ctx.stroke();

  /* Queue word */
  ctx.font = '40px cursive'; //35-->40
  ctx.fillStyle = '#688C86';
  ctx.fillText('Queue', 450, 450); //410-->350
}

async function drawStackBody(){
    
};

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue{
    constructor(){
        this.head = null;
    }
    //function to check if the queue is empty
    isEmpty(){
        if(this.head == null){
            return true;
        }
        else{
            return false;
        }
    }
    Peek(){
        if(this.isEmpty()){
            console.log("Queue is empty")
        }
        else{
            return this.head.data
        }
    }  
    }
    //function to EnQueue a value
    EnQueue(value){
        let newNode = new Node(value);
        if(this.head == null){
            this.head = newNode;
        }
        else{
            let temp = this.head;
            while(temp.next != null){
                temp = temp.next;
            }
            temp.next = newNode;
        }
        drawNewNode();
    }
    DeQueue(){

    }

}

function enQueuefun(){


};
function deQueuefun(){


};