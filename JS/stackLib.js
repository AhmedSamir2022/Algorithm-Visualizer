const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var x = 60 //80-->60
var y = 100
var dx = 5
var dy = 5
var txtX = 250 //220-->250
var txtY = 135

var nodeWidth = 380 //280-->380
var nodeHeight = 50
var nodeValue

const pushBtn = document.getElementById('pushBtn')
const valueToPush = document.getElementById('valueToPush')

var size = 0
var overflowFlag = 6

var popArr = [
    {x:210,y:0,txtX:0,txtY:0,value:0},
    {x:210,y:0,txtX:0,txtY:0,value:0},
    {x:210,y:0,txtX:0,txtY:0,value:0},
    {x:210,y:0,txtX:0,txtY:0,value:0},
    {x:210,y:0,txtX:0,txtY:0,value:0},
    {x:210,y:0,txtX:0,txtY:0,value:0}
]

/* node class */
export class Node{
    constructor(newData){
        this.data = newData
        this.next = null
    }
}
/* class to implement stack using linked lists */
export class Stack{
    constructor(){
        this.head = null
        // this.size = 0
    }
    /**/
    printSize(){
        console.log(this.size)
    }
    /* function to check if stack is empty */
    isEmpty(){
        if(this.head === null){
            return true
        }
        return false
    }  
    /* function to push an element onto the stack */
    Push(){
        //check stack overflow
        if(size < overflowFlag){
            if(valueToPush.value !== ''){
                pushBtn.disabled = true
                popBtn.disabled = true
                //create new node
                const n = new Node(valueToPush.value)
                //check if memory allocation successed
                if(!n){
                    alert("can't allocate memory")
                    return
                }
                //link the new node to the current top node
                n.next = this.head
                //update the top to the new node
                this.head = n
                size++
                popArr[size-1].value = valueToPush.value
                drawNewNode()
            }
            else{
                alert('Enter element to push.')
            }
        }
        else{
            alert('stack overflow, stack limit is 6 elements :D')
        }
    }
    /* function to remove the top element from the stack */
    Pop(){
        if(this.isEmpty()){
            alert("stack is empty!")
        }
        else{
            pushBtn.disabled = true
            popBtn.disabled = true
            let temp = this.head
            this.head = this.head.next
            temp = null

            x = popArr[size-1].x
            y = popArr[size-1].y
            txtX = popArr[size-1].txtX
            txtY = popArr[size-1].txtY
            pushBtn.disabled = true
            dragNodeXY()
        }
    }
    /* function to return the top element of the stack */
    Peek(){
        if(this.isEmpty()){
            console.log("stack is empty")
        }
        else{
            return this.head.data
        }
    }      
}

/* create stack */
export const stack = new Stack()



/* function to draw stack body */
export function drawStackBody(){
    /* drowing the stack body */
    c.beginPath()
    c.moveTo(200,200)//300-->200
    c.lineTo(200,600)//300-->200
    c.lineTo(600,600)
    c.lineTo(600,200)
    c.lineWidth = 6
    c.strokeStyle = '#688C86'
    c.stroke()

    /* stack word */
    c.font = '40px cursive'//35-->40
    c.fillStyle = '#688C86'
    c.fillText("Stack",350,640)//410-->350
    drawTopArrow()
}

let arrowX1 = 100
let arrowX2 = 190
let arrowY1 = 625
let arrowY2 = 625
let sarr1Y = 615
let sarr2Y = 635
let darrowY = 60
let topX = 80
let topY = 610
/* draw top arrow */
async function drawTopArrow(){
    // await sleep(2000)

    c.beginPath()
    c.moveTo(arrowX1,arrowY1)
    c.lineTo(arrowX2,arrowY2)
    c.lineWidth = 4
    // c.strokeStyle = '#F28A2E'
    c.stroke()
    c.beginPath()
    c.moveTo(arrowX2,arrowY2)
    c.lineTo(180,sarr1Y)
    c.stroke()
    c.beginPath()
    c.moveTo(arrowX2,arrowY2)
    c.lineTo(180,sarr2Y)
    c.stroke()
    c.font = "28px cursive"
    c.fillStyle = '#F28A2E'
    c.textAlign = 'center'
    c.fillText('top',topX,topY)
    // await sleep(1000)
    // c.fillStyle = '#F28A2E'
    // c.fillRect(38,610,153,50)    
    // c.clearRect(38,610,153,50)

}


/* function to draw new node */
async function drawNewNode(){
    nodeValue = stack.Peek()
    c.fillStyle = '#F28A2E'
    c.fillRect(x,y,nodeWidth,nodeHeight)
    c.font = '35px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(nodeValue,txtX,txtY)

    await sleep(1000)
    moveNodeXY()

}

function moveNodeXY(){
    c.clearRect(x-1,y-1,nodeWidth+2,nodeHeight+2)
    x += dx
    txtX += dx
    if(x===210){
        popArr[size-1].txtX = txtX
        c.fillStyle = '#F28A2E'
        c.fillRect(x,y,nodeWidth,nodeHeight)
        c.font = '35px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(nodeValue,txtX,txtY)
        moveNodeY()        
        return;
    }

    c.fillStyle = '#F28A2E'
    c.fillRect(x,y,nodeWidth,nodeHeight)
    c.font = '35px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(nodeValue,txtX,txtY)

    requestAnimationFrame(moveNodeXY)
}

function moveNodeY(){
    c.clearRect(x-1,y-1,nodeWidth+2,nodeHeight+2)
    y += dy
    txtY += dy
    if(y===600-size*(nodeHeight+10)){
        popArr[size-1].y = 600-size*(nodeHeight+10)
        popArr[size-1].txtY = txtY
        c.fillStyle = '#F28A2E'
        c.fillRect(x,y,nodeWidth,nodeHeight)
        c.font = '35px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(nodeValue,txtX,txtY)

        c.clearRect(topX-25,topY-26,140,60)
        // c.fillStyle = '#F28A2E'
        // c.fillRect(topX-25,topY-26,140,60)

        arrowY1 -= darrowY
        arrowY2 -= darrowY
        sarr1Y -= darrowY
        sarr2Y -= darrowY
        topY -= darrowY
        drawTopArrow()
        resetValues()
        pushBtn.disabled = false
        popBtn.disabled = false
        return;
    }

    c.fillStyle = '#F28A2E'
    c.fillRect(x,y,nodeWidth,nodeHeight)
    c.font = '35px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(nodeValue,txtX,txtY)

    requestAnimationFrame(moveNodeY)
}

function resetValues(){
    x = 60
    y = 100
    txtX = 250
    txtY = 135
}

/*  */

function dragNodeXY(){
    // pushBtn.disabled = true
    c.clearRect(x-1,y-1,nodeWidth+2,nodeHeight+2)
    y -= dy
    txtY -= dy
    if(y===100){
        c.fillStyle = '#F28A2E'
        c.fillRect(x,y,nodeWidth,nodeHeight)
        c.font = '35px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(popArr[size-1].value,txtX,txtY)
        dragNodeX()
        return;
    }
    c.fillStyle = '#F28A2E'
    c.fillRect(x,y,nodeWidth,nodeHeight)
    c.font = '35px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(popArr[size-1].value,txtX,txtY)
    
    requestAnimationFrame(dragNodeXY)    
}

async function dragNodeX(){
    c.clearRect(x-1,y-1,nodeWidth+2,nodeHeight+2)
    x += dx
    txtX += dx
    if(x===660){
        c.fillStyle = '#F28A2E'
        c.fillRect(x,y,nodeWidth,nodeHeight)
        c.font = '35px cursive'
        c.fillStyle = '#0D0D0D'
        c.textAlign = 'center'
        c.fillText(popArr[size-1].value,txtX,txtY)
        await sleep(700)
        c.clearRect(x-1,y-1,nodeWidth+2,nodeHeight+2)
        size--

        c.clearRect(topX-25,topY-26,140,60)
        // c.fillStyle = '#F28A2E'
        // c.fillRect(topX-25,topY-26,140,60)

        arrowY1 += darrowY
        arrowY2 += darrowY
        sarr1Y += darrowY
        sarr2Y += darrowY
        topY += darrowY
        drawTopArrow()

        resetValues()
        popBtn.disabled = false
        pushBtn.disabled = false
        return
    }
    c.fillStyle = '#F28A2E'
    c.fillRect(x,y,nodeWidth,nodeHeight)
    c.font = '35px cursive'
    c.fillStyle = '#0D0D0D'
    c.textAlign = 'center'
    c.fillText(popArr[size-1].value,txtX,txtY)
    requestAnimationFrame(dragNodeX)        
}

/* sleep function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
