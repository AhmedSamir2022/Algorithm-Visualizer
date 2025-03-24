let rightHigh = document.getElementById('rightHigh')
let rightMid = document.getElementById('rightMid')
let rightLow = document.getElementById('rightLow')

let arr = []
let arrSize = 0
let target = 0

let createFlag = 0
let searchFlag = 1

export function createArray(){
    if(!createFlag){
        arr = document.getElementById('values').value.split(',')
        arrSize = arr.length
        let parentDiv = document.createElement('div')
        parentDiv.classList.add('array')
        rightHigh.appendChild(parentDiv)
        for(let i=0;i<arrSize;i++){
            let arrElement = document.createElement('div')
            arrElement.classList.add('arrElement')
            arrElement.innerHTML = arr[i]
            arrElement.setAttribute('id','elem'+i)
            parentDiv.appendChild(arrElement)
        }
        createFlag = 1
    }
    else{
        alert('Please reset')
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

export async function linearSearch(arr){
    let foundFlag = 0
    if(searchFlag){
        if(createFlag){
            searchFlag = 0
            target = document.getElementById('target').value
            let txt1 = document.createElement('div')
            txt1.classList.add('txt')
            rightMid.appendChild(txt1)
        
            let txt2 = document.createElement('div')
            txt2.classList.add('txt')
            rightLow.appendChild(txt2)
            
            for(let i=0;i<arrSize;i++){
                let elem = document.getElementById('elem'+i)
                let elemValue = elem.innerHTML
                elem.style.border = 'solid 3px #D99414'
                txt1.innerHTML = '<span class="value">'+elemValue+'</span> equals '+target+'?'
                await sleep(500)
                if(parseInt(elemValue)==target){
                    elem.style.backgroundColor = '#D99414'
                    txt2.innerHTML = 'Target Index is '+i
                    foundFlag = 1
                    break;
                }
                else{
                    elem.style.backgroundColor = '#181b20'
                    elem.style.border = 0
                    elem.style.color = '#DCD7C9'
                }
        
                await sleep(1000)
            }
            if(foundFlag === 0){
                txt2.innerHTML = 'Target Not Found'
            }
        }
        else{
            alert('Please create array')
        }
    }
    else{
        alert('Please reset')
    }
}

export function resetBtn(){
    createFlag = 0
    searchFlag = 1
    rightHigh.innerHTML = ""
    rightMid.innerHTML = ""
    rightLow.innerHTML = ""
}