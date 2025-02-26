import * as lib from "./linearsearchLib.js"

let createBtn = document.getElementById('createBtn')
let searchBtn = document.getElementById('searchBtn')
let resetBtn = document.getElementById('resetBtn')

createBtn.addEventListener('click',lib.createArray)
searchBtn.addEventListener('click',lib.linearSearch)
resetBtn.addEventListener('click',lib.resetBtn)

