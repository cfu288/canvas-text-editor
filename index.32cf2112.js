function t(t,e,s,i,n,r,o){const[h,a]=function(t,e,s,i,n,r){const o=t.getBoundingClientRect();return[Math.round((i.X+n-o.left-s.offset)/e.width),Math.round((Math.abs(i.Y)+r-o.top)/e.height)-1]}(e,i,n,o,t.clientX,t.clientY);s.charAt(h,a)?r.setPosition([h,a]):s.rowAt(a)&&r.setPosition([s.rowAt(a).length,a]),b()}class e{constructor(t,e=32){this.data=[],this.gapSize=32,this.gapStart=0,this.gapEnd=32;const s=e-t.length>=0?Array(e-t.length):[];this.data=t.concat(s),this.gapSize=e,this.gapEnd=e>t.length?e:t.length,this.gapStart=t.length||0}get length(){return this.data.length-(this.gapEnd-this.gapStart)}concat(t){for(const e of t)this.push(e)}delete(t){this.moveGap(t+1),this.gapStart-=1,this.gapStart<0&&(this.gapStart=0)}insert(t,e){this.gapStart===this.gapEnd?(this.data.splice(t,0,...new Array(this.gapSize)),this.gapStart=t,this.gapEnd=t+this.gapSize):this.moveGap(t),this.data[this.gapStart++]=e}get(t){return t>=this.gapStart?this.data[t+(this.gapEnd-this.gapStart)]:this.data[t]}slice(t,e){return t>=this.gapStart&&e>=this.gapStart?this.data.slice(t+(this.gapEnd-this.gapStart),e+(this.gapEnd-this.gapStart)):t<this.gapStart&&e>=this.gapStart?this.data.slice(t,this.gapStart).concat(this.data.slice(this.gapEnd,e+(this.gapEnd-this.gapStart))):this.data.slice(t,e)}push(t){this.insert(this.length,t)}pop(){this.moveGap(this.length);const t=this.get(this.length);return this.gapStart-=1,this.gapStart<0&&(this.gapStart=0),t}moveGap(t){if(t<this.gapStart){const e=this.gapStart-t;for(let s=e-1;s>=0;s--)this.data[this.gapEnd-e+s]=this.data[t+s];this.gapStart-=e,this.gapEnd-=e}else{const e=t-this.gapStart;for(let t=0;t<e;++t)this.data[this.gapStart+t]=this.data[this.gapEnd+t];this.gapStart+=e,this.gapEnd+=e}}get _arr(){return this.data.slice(0,this.gapStart).concat(this.data.slice(this.gapEnd))}*[Symbol.iterator](){let t=0;for(;t<this.data.length;)t<this.gapStart||t>=this.gapEnd?(yield this.data[t],t+=1):t+=1}*entries(){let t=0,e=0;for(;e<this.data.length;)e<this.gapStart||e>=this.gapEnd?(yield[t,this.data[e]],e+=1,t+=1):e+=1}}class s{constructor(t){this._text=new e(t||[])}get length(){return this._text.length}get(t){return this._text.get(t)}slice(t,e){return this._text.slice(t,e)}insertValueAt(t,e){this._text.insert(t,e)}deleteAt(t){this._text.delete(t)}push(t){this._text.push(t)}pop(){return this._text.pop()}concat(t){for(const e of t)this._text.push(e);return this}clone(){return new s([...this])}*[Symbol.iterator](){for(const t of this._text)yield t}entries(){return this._text.entries()}}let i,n;!function(t){t.getFileContents=function(t){return t.text()},t.saveFileContents=async function(t,e){const s=await window.showSaveFilePicker({suggestedName:t}),i=await s.createWritable();return await i.write(e.toArrayBuffer()),await i.close()},t.promptFileSelect=async function(){const t=await window.showOpenFilePicker({multiple:!1});return await t[0].getFile()}}(i||(i={})),function(t){t[t.HL_NORMAL=0]="HL_NORMAL",t[t.HL_NUMBER=1]="HL_NUMBER",t[t.HL_STRING=2]="HL_STRING",t[t.HL_COMMENT=3]="HL_COMMENT",t[t.HL_KEYWORD1=4]="HL_KEYWORD1",t[t.HL_KEYWORD2=5]="HL_KEYWORD2"}(n||(n={}));const r=new Set(["export","import","new"]),o=new Set(r),h=["await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","try","var"].concat([...r]);function a(t){return function(t){return 0===t?.trim().length||void 0===t}(t)||"\0"===t||!!t.match("/^[,.()+-/*=~%<>;]/")}function c(t){const e=Array(t.length).fill(n.HL_NORMAL);let s,i=!0,r=0;for(;r<t.length;){const l=t.get(r);void 0!==s?(e.splice(r,1,n.HL_STRING),"\\"===l&&r+1<t.length&&(e.splice(r,1,n.HL_STRING),r++),l===s&&(s=void 0),i=!0):'"'!==l&&"'"!==l||(s=l,e.splice(r,1,n.HL_STRING)),(!isNaN(Number(l))&&(i||e[r-1]===n.HL_NUMBER)||"."==l&&e[r-1]==n.HL_NUMBER)&&e.splice(r,1,n.HL_NUMBER),"/"===(c=t).get(0)&&"/"===c.get(1)&&(e.length=t.length,e.fill(n.HL_COMMENT),r=t.length);const u=i;if(i=a(l),u&&void 0===s)for(const s of h){const h=s.length,c=t.slice(r,r+h).join("");if(c===s&&t.get(r+h)&&a(t[r+h])){const t=o.has(c);for(let s=0;s<h;s++)t?e.splice(r+s,1,n.HL_KEYWORD2):e.splice(r+s,1,n.HL_KEYWORD1);r+=h,i=!0;break}}r++}var c;return e}const l=new Set(["[","{","(",'"',"'"]),u={"{":"}","[":"]","(":")",'"':'"',"'":"'"};function g(){const t=window.devicePixelRatio,e=document.getElementById("myCanvas"),s=document.getElementById("canvasContainer");e.width=s.clientWidth,e.height=s.clientHeight;const i=s.getBoundingClientRect();return e.width=i.width*t,e.height=i.height*t,e.getContext("2d").scale(t,t),e.style.width=i.width+"px",e.style.height=i.height+"px",{canvas:e,context:e.getContext("2d")}}const f={name:"Dracula",background:"#282a36",keyword:"#ff79c6",title:"#50fa7b",text:"#f8f8f2",link:"#8be9fd",string:"#f1fa8c",cursor:"#8be9fd",comment:"#6272a4",number:"#bd93f9"};function d(t,e,s,i,r,o,h,a){!function(t,e,s,i,r,o,h){e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.restore(),e.fillStyle=h.theme.background,e.fillRect(0,Math.abs(r.Y),t.width,t.height);for(const[t,r]of i.entries()){e.fillStyle=h.theme.text,e.save(),e.fillStyle=h.theme.number,e.fillText(o.generateLineNumberText(t),0,s.height*(t+1)),e.restore();for(const[a,c]of r.entries()){switch(e.save(),i.textHL[t][a]){case n.HL_NUMBER:e.fillStyle=h.theme.number;break;case n.HL_STRING:e.fillStyle=h.theme.string;break;case n.HL_COMMENT:e.fillStyle=h.theme.comment;break;case n.HL_KEYWORD1:e.fillStyle=h.theme.keyword;break;case n.HL_KEYWORD2:e.fillStyle=h.theme.link;break;default:e.fillStyle=h.theme.text}e.fillText(c,o.offset+s.width*a,s.height*(t+1)),e.restore()}}}(t,e,s,r,o,h,a),function(t,e,s,i,n,r){e.save(),e.beginPath(),e.moveTo(n.offset+i.X*s.width+2,i.Y*s.height+1),e.lineTo(n.offset+i.X*s.width+2,i.Y*s.height+s.height+4),e.lineWidth=2,e.strokeStyle=r.theme.cursor,e.stroke(),e.restore()}(0,e,s,i,h,a)}const{canvas:w,context:p}=g(),_=new class{constructor(t){this._theme=f,this._theme=t||f}get theme(){return this._theme}},m=new class{constructor(t,e,s,i){this._font="Courier New",this._font=e||"Courier New",this._fontSize=s,t.font=`${this._fontSize}px ${this._font}`,this._width=t.measureText(["a"].join("")).width,this._linePadding=i,this.context=t}get height(){return this._fontSize+this._linePadding}get width(){return this._width}get fontStyle(){return`${this._fontSize}px ${this._font}`}setFontStyle(){this.context.font=`${this._fontSize}px ${this._font}`}}(p,"Courier New",16,4),x=new class{constructor(t,e){this._text=[new s],this._text_hl=[[]],this._buffer=[],this._fileName="untitled.txt",this._fontContext=t,this._text=e||[new s]}get name(){return this._fileName}get contentHeight(){return this._text.length*this._fontContext.height}get length(){return this._text.length}get buffer(){return this._buffer}get textHL(){return this._text_hl}get lineNumberWidth(){return this.length.toString().length}readFromFile(t,e){this._fileName=t||"untitled.txt";const i=e.split("\n"),n=[],r=[];for(const t of i){const e=new s(t.split(""));n.push(e),r.push(c(e))}this._text=n,this._text_hl=r}toArrayBuffer(){const t=[];for(const e of this._text)t.push([...e,"\n"].join(""));const e=t.join(""),s=new ArrayBuffer(t.length),i=new Uint8Array(s);for(let s=0,n=t.length;s<n;s++)i[s]=e.charCodeAt(s);return s}addRowToBuffer(t){this._buffer.push(t.clone())}setBuffer(t){this._buffer=t.map((t=>t.clone()))}clearBuffer(){this._buffer=[]}rowAt(t){return this._text[t]}charAt(t,e){const s=this._text[e];if(s)return s.get(t)}insertNewRowAt(t,e=new s){this._text_hl.splice(t,0,c(e)),this._text.splice(t,0,e)}insertNewRowsAt(t,e=[]){this._text.splice(t,0,...e)}replaceRowAt(t,e){this._text_hl[t]=c(e),this._text[t]=e}removeRowAt(t){this._text.splice(t,1)}*entries(){for(const[t,e]of this._text.entries())yield[t,e]}*stream(){for(const t of this._text){for(const e of t)yield e;yield"\n"}}peekableStream(){const t=this.stream();let e=t.next();const s=function*(){for(;!e.done;){const s=e.value;e=t.next(),yield s}return e.value}();return s.peek=()=>e,s}}(m),Y=new class{constructor(t,e){this._textContext=t,this._fontContext=e}get lineNumberWidth(){return this._textContext.lineNumberWidth+1}get offset(){return this.lineNumberWidth*this._fontContext.width}generateLineNumberText(t){return new Array(this.lineNumberWidth-t.toString().length).join(" ")+t.toString()+"|"}}(x,m),S=new class{constructor(t){this.cursorX=0,this.cursorY=0,this.textContent=t}get X(){return this.cursorX}get Y(){return this.cursorY}setPosition([t,e]){this.cursorX=t,this.cursorY=e}get position(){return[this.cursorX,this.cursorY]}moveRight(t=1){this.textContent.charAt(this.cursorX,this.cursorY)?this.cursorX+=t:this.textContent.rowAt(this.cursorY)&&this.setPosition([this.textContent.rowAt(this.cursorY).length,this.cursorY])}moveLeft(t=1){this.cursorX-t>=0&&(this.cursorX-=t)}moveUp(t=1){if(this.cursorY-t>=0){const e=this.textContent.charAt(this.cursorX,this.cursorY-1),s=this.textContent.rowAt(this.cursorY-1);e?this.cursorY-=t:s&&this.setPosition([s.length,this.cursorY-1])}}moveDown(t=1){const e=this.textContent.charAt(this.cursorX,this.cursorY+1),s=this.textContent.rowAt(this.cursorY+1);e?this.cursorY+=t:s&&this.setPosition([s.length,this.cursorY+1])}}(x),A=new class{constructor(t,e,s){this.cursorX=0,this.cursorY=0,this._context=void 0,this._canvas=void 0,this._context=e,this._canvas=t,this._textContent=s}get X(){return this.cursorX}get Y(){return this.cursorY}scrollUp(t=200){this.cursorY>=0?this.cursorY:this.cursorY+t>0?(this._context.translate(0,Math.abs(this.cursorY)),this.cursorY+=Math.abs(this.cursorY)):(this.cursorY+=t,this._context.translate(0,t))}scrollDown(t=200){if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height<this._textContent.contentHeight)this.cursorY-=t,this._context.translate(0,0-t);else if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height>=this._textContent.contentHeight);else{const t=Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height-this._textContent.contentHeight;this.cursorY-=t,this._context.translate(0,0-t)}}}(w,p,x);function b(){window.requestAnimationFrame((()=>d(w,p,m,S,x,A,Y,_)))}document.addEventListener("keydown",(function(t){if(t.preventDefault(),t.metaKey&&t.shiftKey&&["ArrowUp","ArrowDown"].includes(t.code))switch(t.code){case"ArrowDown":A.scrollDown(),b();break;case"ArrowUp":A.scrollUp(),b()}if(t.metaKey||t.ctrlKey)switch(t.code){case"KeyO":i.promptFileSelect().then((t=>i.getFileContents(t).then((e=>{x.readFromFile(t.name,e),b()}))));break;case"KeyS":i.saveFileContents(x.name,x).then((()=>{alert(`${x.name} saved`)}));break;case"KeyX":{x.clearBuffer(),x.addRowToBuffer(x.rowAt(S.Y)),x.length>1?x.removeRowAt(S.Y):(x.removeRowAt(S.Y),x.insertNewRowAt(S.Y,new s));const t=x.charAt(S.X,S.Y-1),e=x.rowAt(S.Y-1);t?S.moveUp():e&&S.setPosition([e.length,S.Y-1]);break}case"KeyC":x.clearBuffer(),x.addRowToBuffer(x.rowAt(S.Y));break;case"KeyV":x.insertNewRowsAt(S.Y,x.buffer),S.setPosition([x.rowAt(S.Y).length,S.Y])}else{const e=x.rowAt(S.Y);switch(t.code){case"Escape":case"MetaRight":case"MetaLeft":case"ShiftLeft":case"ShiftRight":break;case"ArrowLeft":S.moveLeft();break;case"ArrowRight":S.moveRight();break;case"ArrowUp":S.moveUp();break;case"ArrowDown":S.moveDown();break;case"Enter":if(S.X===x.rowAt(S.Y).length)x.insertNewRowAt(S.Y+1),S.setPosition([0,S.Y+1]);else{const t=x.rowAt(S.Y),e=t.slice(0,S.X),i=t.slice(S.X,t.length);x.replaceRowAt(S.Y,new s(e)),x.insertNewRowAt(S.Y+1),x.replaceRowAt(S.Y+1,new s(i)),S.setPosition([0,S.Y+1])}break;case"Backspace":if(S.X>0)e.deleteAt(S.X-1),S.moveLeft();else if(x.rowAt(S.Y-1)){const t=x.rowAt(S.Y-1).length,e=x.rowAt(S.Y-1).concat(x.rowAt(S.Y));x.replaceRowAt(S.Y-1,e),x.removeRowAt(S.Y),S.setPosition([t,S.Y-1])}break;case"Tab":e.push(" "),e.push(" "),e.push(" "),e.push(" "),S.moveRight(4);break;default:l.has(t.key)?(e.insertValueAt(S.X,t.key),S.moveRight(),e.insertValueAt(S.X,u[t.key])):(e.insertValueAt(S.X,t.key),S.moveRight())}}x.textHL[S.Y]=c(x.rowAt(S.Y)),b()})),w.addEventListener("mousedown",(e=>t(e,w,x,m,Y,S,A))),window.addEventListener("wheel",(function(t){const e=t.deltaY;e>0?A.scrollDown(Math.abs(e)):A.scrollUp(Math.abs(e)),b()})),window.addEventListener("resize",(()=>{g(),m.setFontStyle(),b()})),document.getElementById("openFileButton").addEventListener("click",(()=>{i.promptFileSelect().then((t=>i.getFileContents(t).then((e=>{x.readFromFile(t.name,e),b()}))))})),document.getElementById("saveFileButton").addEventListener("click",(()=>{i.saveFileContents(x.name,x).then((()=>{alert(`${x.name} saved`)}))})),b();
//# sourceMappingURL=index.32cf2112.js.map
