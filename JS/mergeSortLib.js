let container = document.getElementById('container')
let rightSide = document.getElementById('rightSide')

let txt = document.getElementById('explain')
txt.classList.add('explain')

let array = []
let arrSize

export function sort(){
  if(createBtn.disabled){
    sortBtn.disabled = true
    // resetBtn.disabled = true
    mergeSort(array)
  }
}
  
async function merge(arr, left, mid, right) {    
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  /*----------------------------*/
  for(let i=left;i<=mid;i++){
    let elem = document.getElementById('elem'+i)
    elem.style.backgroundColor = "#055902"
  }
  for(let i=mid+1;i<=right;i++){
    let elem = document.getElementById('elem'+i)
    elem.style.backgroundColor = "#055902"
  }
  txt.style.color = '#055902'
  txt.innerHTML = "Merge"
  await sleep(1000)
  // txt.style.color = '#E8BCB9'
  txt.innerHTML = ""
  for(let i=left;i<=mid;i++){
    let elem = document.getElementById('elem'+i)
    elem.style.backgroundColor = "#DCD7C9"
  }
  for(let i=mid+1;i<=right;i++){
    let elem = document.getElementById('elem'+i)
    elem.style.backgroundColor = "#DCD7C9"
  }
  await sleep(1000)
  /*----------------------------*/

  let i = 0, j = 0, k = left, s = left, t = 0, n = left
  let temp = document.getElementById('temp')
  temp.classList.add('array')
  // temp.style.width = (leftArr.length+rightArr.length)*100+'px'
  for(let i=0;i<leftArr.length+rightArr.length;i++){
      let elem = document.createElement('div')
      elem.classList.add('element')
      // elem.style.width = 100+'px'
      elem.setAttribute('id','elemUp'+i)
      temp.appendChild(elem)
  }
  let elem1;
  let elem2;
  while (i < leftArr.length && j < rightArr.length) {
    /*------------------------*/
    elem1 = document.getElementById(`elem${s+i}`)
    elem2 = document.getElementById(`elem${s+j+leftArr.length}`)
    elem1.style.backgroundColor = '#055902'
    elem2.style.backgroundColor = '#055902'
    txt.style.color = '#055902'
    txt.innerHTML = 'Compare'
    await sleep(1000)
    /*------------------------*/
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    /*--------------------------*/
    let elemUpdate = document.getElementById('elemUp'+t)
    elemUpdate.innerHTML = arr[k]
    /*-----------remove green&compare txt-------------*/
    elem1.style.backgroundColor = '#DCD7C9'
    elem2.style.backgroundColor = '#DCD7C9'
    txt.style.color = '#E8BCB9'
    txt.innerHTML = ''
    await sleep(1000)
    t++
    /*--------------------------*/
    k++;
  }

  // Copy remaining elements of leftArr
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    let elemUpdate = document.getElementById('elemUp'+t)
    elemUpdate.innerHTML = arr[k]
    await sleep(1000)
    i++
    t++
    k++
  }

  // Copy remaining elements of rightArr
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    let elemUpdate = document.getElementById('elemUp'+t)
    elemUpdate.innerHTML = arr[k]
    await sleep(1000)
    j++
    t++
    k++
  }
  /*update array*/
  // console.log(arr)
  txt.style.color = '#D99414'
  txt.innerHTML = 'Update Array'
  for(let i=0;i<leftArr.length+rightArr.length;i++){
    let elem = document.getElementById(`elem${left+i}`)
    let elemUp = document.getElementById(`elemUp${i}`)
    elem.innerHTML = arr[left+i]
    elem.style.backgroundColor = "#D99414"
    elemUp.style.backgroundColor = "#D99414"
    await sleep(1000)
    elem.style.backgroundColor = '#DCD7C9'
    elemUp.style.backgroundColor = '#DCD7C9'
    await sleep(1000)
  }
  txt.style.color = '#E8BCB9'
  txt.innerHTML = ''
  temp.innerHTML = ""
  temp.classList.remove('array')
  await sleep(1000)
}
  
  // Merge Sort Algorithm
export async function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    for(let i=left;i<=right;i++){
        let elem = document.getElementById('elem'+i)
        elem.style.backgroundColor = '#F28A2E'
    }
    txt.style.color = '#F28A2E'
    txt.innerHTML = 'Merge Sort'
    await sleep(1000)

    for(let i=left;i<=right;i++){
        let elem = document.getElementById('elem'+i)
        elem.style.backgroundColor = '#DCD7C9'
    }
    txt.innerHTML = ""

    await sleep(1000)
    
    const mid = Math.floor((left + right) / 2);
    // Recursively sort the left and right halves
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);   
    // Merge the sorted halves
    await merge(arr, left, mid, right);
    txt.style.color = "#FBFBFB"
    txt.innerHTML = "Done..Array is sorted &#x1F60A"
    // resetBtn.disabled = false
}

export function createArr(){
  let inputValues = document.getElementById('values').value.split(',')
  array = inputValues.map(parseFloat)
  arrSize = array.length
  let arrayDiv = document.getElementById('array')
  arrayDiv.classList.add('array')
  for(let i=0;i<arrSize;i++){
      let arrElement = document.createElement('div')
      arrElement.classList.add('element')
      arrElement.setAttribute('id','elem'+i)
      arrElement.innerHTML = array[i]
      arrayDiv.appendChild(arrElement)
  }
  createBtn.disabled = true
}

export function reset(){
  let array = document.getElementById('array')
  let explain = document.getElementById('explain')
  let temp = document.getElementById('temp')
  array.innerHTML = ""
  array.classList.remove('array')
  explain.innerHTML = ""
  temp.innerHTML = ""
  temp.classList.remove('array')

  createBtn.disabled = false
  sortBtn.disabled = false
}

function sleep(ms){
    return new Promise((resolve)=> setTimeout(resolve,ms))
}