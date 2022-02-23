function createHiPPICanvas() {
    let ratio = window.devicePixelRatio;
    let cv = document.getElementById("myCanvas");
    let div = document.getElementById("canvasContainer");

    cv.width = div.clientWidth;
    cv.height = div.clientHeight;

    // get current size of the canvas
    let rect = cv.getBoundingClientRect();

    // increase the actual size of our canvas
    cv.width = rect.width * ratio;
    cv.height = rect.height * ratio;

    // ensure all drawing operations are scaled
    cv.getContext("2d").scale(ratio, ratio);

    // scale everything down using CSS
    cv.style.width = rect.width + 'px';
    cv.style.height = rect.height + 'px';

    return { canvas: cv, context: cv.getContext("2d")};
}

const {canvas, context} = createHiPPICanvas();

const colors = {
  background: "#1D1F21",
  text: "#C5C8C6",
  cursor: "#8ABEB7"
}

const fontSize = 16;
const font = "Courier New";
context.font = `${fontSize}px ${font}`;

const charWidth = context.measureText(["a"].join("")).width // Unicode
const charXY: [number, number] = [charWidth, fontSize]
let cursorPostition: [number, number] = [0, 0]

const text: string[][] = [
  [],
];




const renderText = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = colors.background
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const [index, row] of text.entries()) {
      context.fillStyle = colors.text
      context.fillText(row.join(""), 0, fontSize * (index + 1));
    }
    // cursor
    context.beginPath();
    context.moveTo(cursorPostition[0] * charXY[0], cursorPostition[1] * charXY[1] + 2);
    context.lineTo(cursorPostition[0] * charXY[0], cursorPostition[1] * charXY[1] + fontSize + 2);
    context.lineWidth = 2;
    context.strokeStyle = colors.cursor;
    context.stroke();
}

function getPositionFromCursorClick(cpos: [number, number]){

}

document.addEventListener('keydown', handleKey);

canvas.addEventListener('click', handleClick);

function handleClick(e){
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}


function handleKey(e: KeyboardEvent) {
  let lastRow = text[text.length-1]
    console.log(e.code)
  if(["ShiftLeft", "ShiftRight", "Enter", "Meta", "Backspace", "ControlLeft", "ArrowLeft", "ArrowRight", "Tab"].includes(e.code)){
    if (e.code === "Enter"){
      text.push([])
      lastRow = text[text.length-1]
      cursorPostition = [(lastRow.length), (text.length - 1)]
    }
    if (e.code === "Backspace"){
      let row = text[cursorPostition[1]]
      if (row.length > 0){
        row.pop()
        cursorPostition = [(cursorPostition[0]-1), (text.length - 1)]
      } else {
        if(text.length > 1){ 
          text.pop()
          lastRow = text[text.length-1]
          cursorPostition = [(lastRow.length), (text.length - 1)]
        }
      }
    }
    if (e.code === "Tab"){
        lastRow.push(" ");
        lastRow.push(" ");
        lastRow.push(" ");
        lastRow.push(" ");
        cursorPostition = [(lastRow.length), (text.length - 1)]
    }
  } 

  else if (lastRow){
    lastRow.push(e.key);
    cursorPostition = [(lastRow.length), (text.length - 1)]
  }
  else {
    lastRow = text[text.length-1]
    cursorPostition = [(lastRow.length), (text.length - 1)]
  }

  // console.log(`cursor: ${cursorPostition[0]}, ${cursorPostition[1]}`)
  renderText();
}

renderText();

// class TextContent {
//   constructor(){
//     this.textContent = [[]]; 
//   }

//   get text() {
//     return this.textContent
//   }

//   get row(index: number) {
//     return this.textContent[index]
//   }

//   get rowCount() {
//     return this.textContent.length
//   }

//   get lastRow() {
//     return this.textContent[textContent.length - 1]
//   }

//   createNewRow(){
//     this.textContent.push([])
//   }
// }
