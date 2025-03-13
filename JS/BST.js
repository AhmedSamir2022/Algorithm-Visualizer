const createBtn = document.getElementById('createBtn')
createBtn.addEventListener('click',createBST)
const searchBtn = document.getElementById('searchBtn')
searchBtn.onclick = function(){
    visualizeTree(root)
    const input = document.getElementById('target').value
    if(input !== ''){
        const target = parseInt(document.getElementById('target').value)
        search(root,target)
    }
}
const insertBtn = document.getElementById('insertBtn')
insertBtn.onclick = function(){
    const newElement = parseInt(document.getElementById('newElement').value)
    root = insert(root,newElement)
    writeText(`${newElement} is inserted`)
    visualizeTree(root)
}

const maxBtn = document.getElementById('maxBtn')
maxBtn.onclick = function(){
    visualizeTree(root)
    findMax(root)
}

const minBtn = document.getElementById('minBtn')
minBtn.onclick = function(){
    visualizeTree(root)
    findMin(root)
}

const resetBtn = document.getElementById('resetBtn')
resetBtn.onclick = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class Node{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

function insert(root,key){
    if(root === null){
        let n =  new Node(key)
        return n
    }
    if(root.key === key){
        return root
    }
    if(key < root.key){
        root.left = insert(root.left,key)
    }
    else{
        if(key > root.key){
            root.right = insert(root.right,key)
        }
    }

    return root
}

var root = null
function createBST(){
    let input = document.getElementById('elements').value.split(',')
    let length = input.length
    if(input[0] !== ''){
        elements = input.map(elem => Number(elem))
        root = new Node(elements[0])
        for(let i=1;i<length;i++){
            root = insert(root,elements[i])
        }
        // console.log(root)
        visualizeTree(root)
        writeText('Tree is created')
    }
}


// Step 1: Set logical positions using inorder traversal
function setPositions(node, depth, counter, maxDepthObj) {
    if (node !== null) {
        setPositions(node.left, depth + 1, counter, maxDepthObj);
        node.x = counter.value;         // x is inorder position
        node.y = depth;                // y is depth
        if (depth > maxDepthObj.value) maxDepthObj.value = depth;
        counter.value++;
        setPositions(node.right, depth + 1, counter, maxDepthObj);
    }
}

// Step 2: Calculate actual canvas coordinates
function calculateCanvasPosition(node, n, maxDepth, canvasWidth, canvasHeight, margin) {
    if(node !== null){
        let canvasX, canvasY;
        if (n > 1) {
            canvasX = margin + (node.x * (canvasWidth - 2 * margin) / (n - 1));
        } else {
            canvasX = canvasWidth / 2;  // Center single node
        }
        if (maxDepth > 0) {
            canvasY = margin + (node.y * (canvasHeight - 2 * margin) / maxDepth);
        } else {
            canvasY = canvasHeight / 2; // Center single node
        }
        return { x: canvasX, y: canvasY };
    }
}

// Step 3: Draw the tree using preorder traversal
function drawTree(ctx, node, n, maxDepth, canvasWidth, canvasHeight, margin) {
    if(n <= 3){
        canvasWidth = 200
        canvasHeight = 300
    }
    if (node !== null) {
        let pos = calculateCanvasPosition(node, n, maxDepth, canvasWidth, canvasHeight, margin);
        
        // Draw node as a circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#F28A2E';
        ctx.fill();
        
        // Draw key inside the node
        ctx.font = '20px cursive'
        ctx.fillStyle = '#0D0D0D';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.key, pos.x, pos.y);
        
        // Draw edge to left child
        if (node.left !== null) {
            let leftPos = calculateCanvasPosition(node.left, n, maxDepth, canvasWidth, canvasHeight, margin);
            ctx.beginPath();
            ctx.moveTo(pos.x-10, pos.y+30);
            ctx.lineTo(leftPos.x+10, leftPos.y-30);
            ctx.lineWidth = 2
            ctx.strokeStyle = '#688C86'
            ctx.stroke();
        }
        
        // Draw edge to right child
        if (node.right !== null) {
            let rightPos = calculateCanvasPosition(node.right, n, maxDepth, canvasWidth, canvasHeight, margin);
            ctx.beginPath();
            ctx.moveTo(pos.x+10, pos.y+30);
            ctx.lineTo(rightPos.x-10, rightPos.y-30);
            ctx.strokeStyle = '#688C86'
            ctx.stroke();
        }
        
        // Recursively draw left and right subtrees
        drawTree(ctx, node.left, n, maxDepth, canvasWidth, canvasHeight, margin);
        drawTree(ctx, node.right, n, maxDepth, canvasWidth, canvasHeight, margin);
    }
}

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');
let margin = 40;
let counter
let maxDepth
let n          // Total number of nodes
let maxDepthValue // Maximum depth

// Main function to visualize the tree
function visualizeTree(root) {
    if(root !== null){
        counter = { value: 0 };
        maxDepth = { value: -1 };
        // Set logical positions
        setPositions(root, 0, counter, maxDepth);
        n = counter.value;          // Total number of nodes
        maxDepthValue = maxDepth.value; // Maximum depth
    
        // Clear canvas and draw the tree
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(ctx, root, n, maxDepthValue, canvas.width, canvas.height, margin);
    }
}

/* search function */
async function search(root,key){
    if(n <= 3){
        canvasWidth = 200
        canvasHeight = 300
    }
    else{
        canvasWidth = canvas.width
        canvasHeight = canvas.height
    }
    let pos
    if(root!== null){
        //
        pos = calculateCanvasPosition(root,n,maxDepthValue,canvasWidth,canvasHeight,margin)
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(140, 39, 3, 0.4)'
        ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
        ctx.fill()
        await sleep(600)

        //base cases: root is null or key  is  present root
        if(root.key === key || root === null){
            console.log(root)
            if(root === null){
                const txt = document.getElementById('txt')
                txt.innerHTML = 'Target Not Found'
            }
            if(root.key === key){
                ctx.beginPath()
                ctx.fillStyle = '#8C2703'
                ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
                ctx.fill()

                ctx.beginPath()
                ctx.lineWidth = 2
                ctx.strokeStyle = '#F2A71B'
                ctx.arc(pos.x,pos.y,30,0,2*Math.PI)
                ctx.stroke()
                // Draw key inside the node
                ctx.font = '20px cursive'
                ctx.fillStyle = '#0D0D0D';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(root.key, pos.x, pos.y);
                writeText('Target is found')
                await sleep(600)
            }
            return root
        }
        //if key > root's key
        if(key > root.key){
            if(root.right !== null)
            {
                let rightPos = calculateCanvasPosition(root.right, n, maxDepthValue, canvasWidth, canvasHeight, margin)
                ctx.beginPath()
                ctx.moveTo(pos.x+10, pos.y+30)
                ctx.lineTo(rightPos.x-10, rightPos.y-30)
                ctx.strokeStyle = '#8C2703'
                ctx.stroke()
                return search(root.right,key)
            }
            else{
                writeText('Target is not found')
            }
        }
        //if key < root's key
        else{
            if(key < root.key){
                if(root.left !== null){
                    let leftpos = calculateCanvasPosition(root.left, n, maxDepthValue, canvasWidth, canvasHeight, margin)
                    ctx.beginPath()
                    ctx.moveTo(pos.x-10,pos.y+30)
                    ctx.lineTo(leftpos.x+10,leftpos.y-30)
                    ctx.strokeStyle = '#8C2703'
                    ctx.stroke()
                    return search(root.left,key)
                }
                else{
                    writeText('Target is not found')
                }
            }
        }
    }
    // else{
    //     return
    // }
}
/* function to find max value */
async function findMax(root){
    if(n <= 3){
        canvasWidth = 200
        canvasHeight = 300
    }
    else{
        canvasWidth = canvas.width
        canvasHeight = canvas.height
    }    
    let pos
    if(root!== null){
        pos = calculateCanvasPosition(root,n,maxDepthValue,canvasWidth,canvasHeight,margin)
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(140, 39, 3, 0.4)'
        ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
        ctx.fill()
        await sleep(600)

        if(root.right !== null){
            let rightPos = calculateCanvasPosition(root.right, n, maxDepthValue, canvasWidth, canvasHeight, margin)
            ctx.beginPath()
            ctx.moveTo(pos.x+10, pos.y+30)
            ctx.lineTo(rightPos.x-10, rightPos.y-30)
            ctx.strokeStyle = '#8C2703'
            ctx.stroke()
            return findMax(root.right)
        }
        else{
            ctx.beginPath()
            ctx.fillStyle = '#8C2703'
            ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
            ctx.fill()

            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = '#F2A71B'
            ctx.arc(pos.x,pos.y,30,0,2*Math.PI)
            ctx.stroke()
            // put the key value inside the node
            ctx.font = '20px cursive'
            ctx.fillStyle = '#0D0D0D';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(root.key, pos.x, pos.y);
            writeText(`Max value is ${root.key}`)
            await sleep(600)            
        }
    }
    else{
        return
    }
}
/* function to find min value */
async function findMin(root){
    if(n <= 3){
        canvasWidth = 200
        canvasHeight = 300
    }
    else{
        canvasWidth = canvas.width
        canvasHeight = canvas.height
    }
    let pos
    if(root!== null){
        pos = calculateCanvasPosition(root,n,maxDepthValue,canvasWidth,canvasHeight,margin)
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(140, 39, 3, 0.4)'
        ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
        ctx.fill()
        await sleep(600)

        if(root.left !== null){
            let leftpos = calculateCanvasPosition(root.left, n, maxDepthValue, canvasWidth, canvasHeight, margin)
            ctx.beginPath()
            ctx.moveTo(pos.x-10,pos.y+30)
            ctx.lineTo(leftpos.x+10,leftpos.y-30)
            ctx.strokeStyle = '#8C2703'
            ctx.stroke()
            return findMin(root.left)
        }
        else{
            ctx.beginPath()
            ctx.fillStyle = '#8C2703'
            ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI)
            ctx.fill()

            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = '#F2A71B'
            ctx.arc(pos.x,pos.y,30,0,2*Math.PI)
            ctx.stroke()
            // put the key value inside the node
            ctx.font = '20px cursive'
            ctx.fillStyle = '#0D0D0D';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(root.key, pos.x, pos.y);
            writeText(`Min value is ${root.key}`)
            await sleep(600)
        }
    }
    else{
        return
    }
}
/* sleep function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* function to write text */
function writeText(t){
    const txt = document.getElementById('txt')
    txt.innerHTML = t
    setTimeout(function(){
        txt.innerHTML = ''
    },2000)
}