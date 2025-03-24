import * as lib from "./mergeSortLib.js"

let createBtn = document.getElementById('createBtn')
let sortBtn = document.getElementById('sortBtn')
let resetBtn = document.getElementById('resetBtn')

createBtn.addEventListener('click',lib.createArr)
resetBtn.addEventListener('click',lib.reset)
sortBtn.addEventListener('click',lib.sort)
