const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const createBtn = document.getElementById('createBtn')
createBtn.onclick = function(){
    createLinkedList()
}

const searchBtn = document.getElementById('searchBtn')
searchBtn.onclick = function(){
    searchOnTarget()
}

const addBtn = document.getElementById('addBtn')
addBtn.onclick = function(){
    addNewElement()
}

const addFirstBtn = document.getElementById('addFirstBtn')
addFirstBtn.onclick = function(){
    addFirstElement()
}


const removeBtn = document.getElementById('removeBtn')
removeBtn.onclick = function(){
    removeElement()
}

/* our linked list */
var ll;
var arr;

/* function to create linkrd list */
function createLinkedList(){
    const elements = document.getElementById('elements').value.split(',').map(elem => elem = Number(elem))
    if(elements.length <= 6){
        if(document.getElementById('elements').value !== ''){
            ll = new LinkedList()
            for(let i=0;i<elements.length;i++){
                ll.addLast(elements[i])
            }
            // console.log(ll)
        }
    
        drawLinkedList(ll,700)    
    }
    else{
        alert('sorry maximum size is 6 elements, in the next version i will make it more flexible :D')
    }

}

/* function to search on target */
async function searchOnTarget(){
    const target = Number(document.getElementById('target').value)
    let result = await ll.contains(target)

    if(result){
        //target is found
        c.font = '40px cursive'
        c.fillStyle = 'white'
        c.textAlign = 'center'
        c.fillText('Target found',500,300)       
    }
    else{
        console.log('no')
        //target is not found
        c.font = '40px cursive'
        c.fillStyle = 'white'
        c.textAlign = 'center'
        c.fillText('Target not found :(',500,300)   
    }
    await sleep(4000)
    await drawLinkedList(ll)
}

/* function to add  new element after specific node */
function addNewElement(){
    const data = Number(document.getElementById('newData').value)
    const afterData = Number(document.getElementById('addAfter').value)

    ll.addAfter(afterData,data)
    // ll.addFirst(data)
}
/* function to add  new element after specific node */
function addFirstElement(){
  const data = Number(document.getElementById('newData').value)
  ll.addFirst(data)
}

/* function to remve element */
async function removeElement(){
  const valueToRemove = Number(document.getElementById('valueToRemove').value)
  await ll.remove(valueToRemove)
  await drawLinkedList(ll,0)
  // console.log(ll)
}

function drawArrow(idx){
    /*draw arrow to the next node*/
    const point1 = {x:arr[idx].nodeX+20,y:arr[idx].nodeY}
    const point2 = {x:arr[idx+1].nodeX+10,y:arr[idx+1].nodeY}
    const centerX = (point1.x + point2.x)/2
    const centerY = point1.y
    const redius = Math.abs(point1.x - point2.x)/2

    c.beginPath()
    c.lineWidth = 2
    c.strokeStyle = '#F28A2E'
    c.arc(centerX,centerY,redius,Math.PI,0,false)
    c.stroke()

    const arrowSize = 10
    const angle = Math.PI / 4
    c.beginPath()
    c.moveTo(point2.x,point2.y)
    c.lineTo(point2.x-arrowSize*Math.cos(angle),point2.y-arrowSize*Math.sin(angle))
    c.moveTo(point2.x,point2.y)
    c.lineTo(point2.x+arrowSize*Math.cos(angle),point2.y-arrowSize*Math.sin(angle))
    c.lineWidth = 2
    c.strokeStyle = '#F28A2E'
    c.stroke()
}

/* linked list functions */
class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.maxSize = 6;
  }

async addFirst(data) {
  const newNode = new LinkedListNode(data, this.head);
  this.head = newNode;
  if (!this.tail) {
    this.tail = newNode;

    /*????????????????????????????????????????*/
    // c.font = '28px cursive'
    // c.fillStyle = '#F28A2E'
    // c.textAlign = 'start'
    // c.fillText('NULL',arr[ll.length-1].arrowX2+5+dx,arr[ll.length-1].arrowY2+10)    
  }
  else{
      /* shift nodes */
      c.clearRect(arr[0].nodeX,arr[0].nodeY,1000,50)
      drawRestNods(0)
  }
  this.size++;

       /***********************************************************************/
       await sleep(500)
       c.beginPath()
       c.moveTo(arr[0].nodeX+80,arr[0].nodeY-80)
       c.lineTo(arr[0].nodeX+80,arr[0].nodeY-20)
       c.lineWidth = 4
       c.strokeStyle = 'white'
       c.stroke()

       c.beginPath()
       c.moveTo(arr[0].nodeX+80,arr[0].nodeY-20)
       c.lineTo(arr[0].nodeX+80+5,arr[0].nodeY-20-10)
       c.lineWidth = 4
       c.strokeStyle = 'white'
       c.stroke()

       c.beginPath()
       c.moveTo(arr[0].nodeX+80,arr[0].nodeY-20)
       c.lineTo(arr[0].nodeX+80-5,arr[0].nodeY-20-10)
       c.lineWidth = 4
       c.strokeStyle = 'white'
       c.stroke()

       c.font = '28px cursive'
       c.fillStyle = 'white'
       c.textAlign = 'end'
       c.fillText('Here',arr[0].nodeX+80-20,arr[0].nodeY-20-50)        

       await sleep(3000)

       await drawLinkedList(ll,0)
       /**/
       await sleep(300)
       c.clearRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.fillStyle = '#F28A2E'
       c.fillRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.font = '26px cursive'
       c.fillStyle = '#0D0D0D'
       c.textAlign = 'center'
       c.fillText(data,arr[0].nodeX+40,arr[0].nodeY+35)
       await sleep(300)
       c.clearRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.fillStyle = '#688C86'
       c.fillRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.font = '26px cursive'
       c.fillStyle = '#0D0D0D'
       c.textAlign = 'center'
       c.fillText(data,arr[0].nodeX+40,arr[0].nodeY+35)
       await sleep(300)
       c.clearRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.fillStyle = '#F28A2E'
       c.fillRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.font = '26px cursive'
       c.fillStyle = '#0D0D0D'
       c.textAlign = 'center'
       c.fillText(data,arr[0].nodeX+40,arr[0].nodeY+35)
       await sleep(300)
       c.clearRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.fillStyle = '#688C86'
       c.fillRect(arr[0].nodeX,arr[0].nodeY,80,50)
       c.font = '26px cursive'
       c.fillStyle = '#0D0D0D'
       c.textAlign = 'center'
       c.fillText(data,arr[0].nodeX+40,arr[0].nodeY+35)

}
addLast(data) {
  const newNode = new LinkedListNode(data);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.size++;
}
addBefore(beforeData, data) {
  const newNode = new LinkedListNode(data);
  if (this.size === 0) {
    this.head = newNode;
    this.size++;
    return;
  }
  if (this.head.data === beforeData) {
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return;
  }
  let current = this.head.next;
  let prev = this.head;
  while (current) {
    if (current.data === beforeData) {
      newNode.next = current;
      prev.next = newNode;
      this.size++;
      return;
    }
    prev = current;
    current = current.next;
  }
  throw new Error(`Node with data '${beforeData}' not found in list`);
}
async addAfter(afterData, data) {
  const newNode = new LinkedListNode(data);
  if (this.size === 0) {
    this.head = newNode;
    this.size++;
    return;
  }
  let current = this.head;
  let idx = 0
  while (current) {
    if (current.data === afterData) {
        if(current === this.tail){
            c.clearRect(arr[ll.length-1].arrowX2,arr[ll.length-1].arrowY2-50,200,100)
            /* draw null */
            c.font = '28px cursive'
            c.fillStyle = '#F28A2E'
            c.textAlign = 'start'
            c.fillText('NULL',arr[ll.length-1].arrowX2+5+dx,arr[ll.length-1].arrowY2+10)
            newNode.next = current.next;
            current.next = newNode;
            this.tail = newNode
            this.size++;
        }
        else{
            /* shift nodes */
            c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,1000,50)
            drawRestNods(idx+1)
            newNode.next = current.next;
            current.next = newNode;
            this.size++;
            // drawNewNode(data,idx+1)       
        }
        /***********************************************************************/
        await sleep(500)
        c.beginPath()
        c.moveTo(arr[idx].arrowX2+80,arr[idx].arrowY2-80)
        c.lineTo(arr[idx].arrowX2+80,arr[idx].arrowY2-20)
        c.lineWidth = 4
        c.strokeStyle = 'white'
        c.stroke()

        c.beginPath()
        c.moveTo(arr[idx].arrowX2+80,arr[idx].arrowY2-20)
        c.lineTo(arr[idx].arrowX2+80+5,arr[idx].arrowY2-20-10)
        c.lineWidth = 4
        c.strokeStyle = 'white'
        c.stroke()

        c.beginPath()
        c.moveTo(arr[idx].arrowX2+80,arr[idx].arrowY2-20)
        c.lineTo(arr[idx].arrowX2+80-5,arr[idx].arrowY2-20-10)
        c.lineWidth = 4
        c.strokeStyle = 'white'
        c.stroke()

        c.font = '28px cursive'
        c.fillStyle = 'white'
        c.textAlign = 'end'
        c.fillText('Here',arr[idx].arrowX2+80-20,arr[idx].arrowY2-20-50)        

        await sleep(3000)

        await drawLinkedList(ll,0)
        /**/
        await sleep(300)
        c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.fillStyle = '#F28A2E'
        c.fillRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(data,arr[idx+1].nodeX+40,arr[idx+1].nodeY+35)
        await sleep(300)
        c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.fillStyle = '#688C86'
        c.fillRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(data,arr[idx+1].nodeX+40,arr[idx+1].nodeY+35)
        await sleep(300)
        c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.fillStyle = '#F28A2E'
        c.fillRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(data,arr[idx+1].nodeX+40,arr[idx+1].nodeY+35)
        await sleep(300)
        c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.fillStyle = '#688C86'
        c.fillRect(arr[idx+1].nodeX,arr[idx+1].nodeY,80,50)
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(data,arr[idx+1].nodeX+40,arr[idx+1].nodeY+35)

        // console.log(ll)
        return;
    }
    current = current.next;
    idx++
  }
  alert(`Node with data '${afterData}' not found in list!`)
  // throw new Error(`Node with data '${afterData}' not found in list!`);
}
async contains(data) {
  let current = this.head;
  let idx = 0
  
  while (current) {

    c.font = '32px cursive'
    c.fillStyle = 'white'
    c.textAlign = 'center'
    c.fillText(`is ${arr[idx].data} equals ${data}?`,500,300)
    await sleep(1000)
    c.clearRect(200,200,500,400)

    if (current.data === data) {
        c.clearRect(arr[idx].nodeX,arr[idx].nodeY,80,50)
        c.fillStyle = '#D99414'
        c.fillRect(arr[idx].nodeX,arr[idx].nodeY,80,50)
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(arr[idx].data,arr[idx].nodeX+40,arr[idx].nodeY+35)
        return true;
    }
    else{
        c.fillStyle = 'rgba(0,0,0,0.5)'
        c.fillRect(arr[idx].nodeX,arr[idx].nodeY,80,50)
    }
    if(idx < ll.length-1){
        drawArrow(idx)
        await sleep(1500)
    }
    current = current.next;
    idx++
  }
  return false;
}
removeFirst() {
  if (!this.head) {
    throw new Error('List is empty');
  }
  this.head = this.head.next;
  if (!this.head) {
    this.tail = null;
  }
  this.size--;
}
removeLast() {
  if (!this.tail) {
    throw new Error('List is empty');
  }
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    this.size--;
    return;
  }
  let current = this.head;
  let prev = null;
  while (current.next) {
    prev = current;
    current = current.next;
  }
  prev.next = null;
  this.tail = prev;
  this.size--;
}
async remove(data) {
  if (this.size === 0) {
    throw new Error("List is empty");
  }
  if (this.head.data === data) {
    this.head = this.head.next;
    this.size--;
    c.beginPath()
    c.moveTo(arr[0].nodeX+3,arr[0].nodeY+3)
    c.lineTo(arr[0].nodeX+77,arr[0].nodeY+47)
    c.lineWidth = 8
    c.strokeStyle = 'red'
    c.stroke()
    c.beginPath()
    c.moveTo(arr[0].nodeX+3,arr[0].nodeY+47)
    c.lineTo(arr[0].nodeX+77,arr[0].nodeY+3)
    c.lineWidth = 8
    c.strokeStyle = 'red'
    c.stroke()
    await sleep(2000)
    c.clearRect(arr[0].nodeX,arr[0].nodeY,dx,50)
    await sleep(1000)
    return;
  }
  let current = this.head;
  let idx = 0
  while (current.next) {
    if (current.next.data === data) {
      /* draw x onthe target */
      c.beginPath()
      c.moveTo(arr[idx+1].nodeX+3,arr[idx+1].nodeY+3)
      c.lineTo(arr[idx+1].nodeX+77,arr[idx+1].nodeY+47)
      c.lineWidth = 8
      c.strokeStyle = 'red'
      c.stroke()
      c.beginPath()
      c.moveTo(arr[idx+1].nodeX+3,arr[idx+1].nodeY+47)
      c.lineTo(arr[idx+1].nodeX+77,arr[idx+1].nodeY+3)
      c.lineWidth = 8
      c.strokeStyle = 'red'
      c.stroke()
      await sleep(2000)
      c.clearRect(arr[idx+1].nodeX,arr[idx+1].nodeY,dx,50)
      await sleep(1000)
      current.next = current.next.next;
      this.size--;
      return;
    }
    current = current.next;
    idx++
  }
  alert(`Node with data '${data}' not found in list!`)
  // throw new Error(`Node with data '${data}' not found in list!`);
}
toArray() {
  const arr = [];
  let current = this.head;
  while (current) {
    arr.push({data:current.data});
    current = current.next;
  }
  return arr;
}
get length(){
    return this.size;
}
}

let nodeX = 80
let nodeY = 100
let pointerX = 165 
let pointerY = 100
let arrowX1 = 171
let arrowY1 = 125
let arrowX2 = 231
let arrowY2 = 125
let highDashX1 = 220
let highDashY1 = 119
let lowDashX1 = 220
let lowDashY1 = 131
let dx = 151
// let dy = 0
// let stepX  =151
// let stepY  =150
/**/
function drawNode(data){
    c.fillStyle = '#688C86'
    c.fillRect(nodeX,nodeY,80,50)

    c.font = '26px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(data,nodeX+40,nodeY+35)

    c.fillStyle = '#F28A2E'
    c.fillRect(pointerX,pointerY,12,50)
    
    c.beginPath()
    c.moveTo(arrowX1,arrowY1)
    c.lineTo(arrowX2,arrowY2)
    c.lineWidth = 2
    c.strokeStyle = 'white'
    c.stroke()

    c.beginPath()
    c.moveTo(arrowX2,arrowY2)
    c.lineTo(highDashX1,highDashY1)
    c.stroke()

    c.beginPath()
    c.moveTo(arrowX2,arrowY2)
    c.lineTo(lowDashX1,lowDashY1)
    c.stroke()
}

async function drawLinkedList(ll,msec){
    c.clearRect(0,0,canvas.width,canvas.height)
    resetValues()
    arr = ll.toArray()
    for(let i=0;i<ll.length;i++){
        arr[i].nodeX = nodeX
        arr[i].nodeY = nodeY
        arr[i].pointerX = pointerX
        arr[i].pointerY = pointerY
        arr[i].arrowX1 = arrowX1
        arr[i].arrowY1 = arrowY1
        arr[i].arrowX2 = arrowX2
        arr[i].arrowY2 = arrowY2
        arr[i].highDashX1 = highDashX1
        arr[i].highDashY1 = highDashY1
        arr[i].lowDashX1 = lowDashX1
        arr[i].lowDashY1 = lowDashY1
        drawNode(arr[i].data)

        nodeX += dx
        pointerX += dx
        arrowX1 += dx
        arrowX2 += dx
        highDashX1 += dx
        lowDashX1 += dx

        await sleep(msec)
        // dx += stepX
    }
    /* draw null */
    c.font = '28px cursive'
    c.fillStyle = '#F28A2E'
    c.textAlign = 'start'
    c.fillText('NULL',arr[ll.length-1].arrowX2+5,arr[ll.length-1].arrowY2+10)
}
function drawRestNods(idx){
    // let rest = arr.slice(idx)
    // arr = ll.toArray()
    for(let i=idx;i<arr.length;i++){
        c.fillStyle = '#688C86'
        c.fillRect(arr[i].nodeX+dx,arr[i].nodeY,80,50)
    
        c.font = '26px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(arr[i].data,arr[i].nodeX+40+dx,arr[i].nodeY+35)
    
        c.fillStyle = '#F28A2E'
        c.fillRect(arr[i].pointerX+dx,arr[i].pointerY,12,50)
        
        c.beginPath()
        c.moveTo(arr[i].arrowX1+dx,arr[i].arrowY1)
        c.lineTo(arr[i].arrowX2+dx,arr[i].arrowY2)
        c.lineWidth = 2
        c.strokeStyle = 'white'
        c.stroke()
    
        c.beginPath()
        c.moveTo(arr[i].arrowX2+dx,arr[i].arrowY2)
        c.lineTo(arr[i].highDashX1+dx,arr[i].highDashY1)
        c.stroke()
    
        c.beginPath()
        c.moveTo(arr[i].arrowX2+dx,arr[i].arrowY2)
        c.lineTo(arr[i].lowDashX1+dx,arr[i].lowDashY1)
        c.stroke()
    }
    /* draw null */
    c.font = '28px cursive'
    c.fillStyle = '#F28A2E'
    c.textAlign = 'start'
    c.fillText('NULL',arr[arr.length-1].arrowX2+5+dx,arr[arr.length-1].arrowY2+10)
}

/* function to draw new node */
function drawNewNode(data,idx){
    c.fillStyle = '#688C86'
    c.fillRect(arr[idx].nodeX,arr[idx].nodeY,80,50)

    c.font = '26px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(data,arr[idx].nodeX+40,arr[idx].nodeY+35)

    c.fillStyle = '#F28A2E'
    c.fillRect(arr[idx].pointerX,arr[idx].pointerY,12,50)
    
    c.beginPath()
    c.moveTo(arr[idx].arrowX1,arr[idx].arrowY1)
    c.lineTo(arr[idx].arrowX2,arr[idx].arrowY2)
    c.lineWidth = 2
    c.strokeStyle = 'white'
    c.stroke()

    c.beginPath()
    c.moveTo(arr[idx].arrowX2,arr[idx].arrowY2)
    c.lineTo(arr[idx].highDashX1,arr[idx].highDashY1)
    c.stroke()

    c.beginPath()
    c.moveTo(arr[idx].arrowX2,arr[idx].arrowY2)
    c.lineTo(arr[idx].lowDashX1,arr[idx].lowDashY1)
    c.stroke()
}

function resetValues(){
    nodeX = 80
    nodeY = 100
    pointerX = 165 
    pointerY = 100
    arrowX1 = 171
    arrowY1 = 125
    arrowX2 = 231
    arrowY2 = 125
    highDashX1 = 220
    highDashY1 = 119
    lowDashX1 = 220
    lowDashY1 = 131
}

/* sleep function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
