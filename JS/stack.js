import * as lib from '../JS/stackLib.js' 

pushBtn.addEventListener('click',lib.stack.Push.bind(lib.stack))
popBtn.addEventListener('click',lib.stack.Pop.bind(lib.stack))

lib.drawStackBody()
