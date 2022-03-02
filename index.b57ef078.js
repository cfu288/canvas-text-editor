function t(){const t=window.devicePixelRatio,e=document.getElementById("myCanvas"),s=document.getElementById("canvasContainer");e.width=s.clientWidth,e.height=s.clientHeight;const i=s.getBoundingClientRect();return e.width=i.width*t,e.height=i.height*t,e.getContext("2d").scale(t,t),e.style.width=i.width+"px",e.style.height=i.height+"px",{canvas:e,context:e.getContext("2d")}}function e(t,e,s){const[i,n]=function(t,e,s,i){const n=A.getBoundingClientRect();return[Math.round((L.X+s-n.left-e.offset)/t.width),Math.round((Math.abs(L.Y)+i-n.top)/t.height)-1]}(e,s,t.clientX,t.clientY);R.charAt(i,n)?E.setPosition([i,n]):R.rowAt(n)&&E.setPosition([R.rowAt(n).length,n]),C()}class s{constructor(t,e=32){this.data=[],this.gapSize=32,this.gapStart=0,this.gapEnd=32;const s=e-t.length>=0?Array(e-t.length):[];this.data=t.concat(s),this.gapSize=e,this.gapEnd=e>t.length?e:t.length,this.gapStart=t.length||0}get length(){return this.data.length-(this.gapEnd-this.gapStart)}concat(t){for(const e of t)this.push(e)}delete(t){this.moveGap(t+1),this.gapStart-=1,this.gapStart<0&&(this.gapStart=0)}insert(t,e){this.gapStart===this.gapEnd?(this.data.splice(t,0,...new Array(this.gapSize)),this.gapStart=t,this.gapEnd=t+this.gapSize):this.moveGap(t),this.data[this.gapStart++]=e}get(t){return t>=this.gapStart?this.data[t+(this.gapEnd-this.gapStart)]:this.data[t]}slice(t,e){return t>=this.gapStart&&e>=this.gapStart?this.data.slice(t+(this.gapEnd-this.gapStart),e+(this.gapEnd-this.gapStart)):t<this.gapStart&&e>=this.gapStart?this.data.slice(t,this.gapStart).concat(this.data.slice(this.gapEnd,e+(this.gapEnd-this.gapStart))):this.data.slice(t,e)}push(t){this.insert(this.length,t)}pop(){this.moveGap(this.length);const t=this.get(this.length);return this.gapStart-=1,this.gapStart<0&&(this.gapStart=0),t}moveGap(t){if(t<this.gapStart){const e=this.gapStart-t;for(let s=e-1;s>=0;s--)this.data[this.gapEnd-e+s]=this.data[t+s];this.gapStart-=e,this.gapEnd-=e}else{const e=t-this.gapStart;for(let t=0;t<e;++t)this.data[this.gapStart+t]=this.data[this.gapEnd+t];this.gapStart+=e,this.gapEnd+=e}}get _arr(){return this.data.slice(0,this.gapStart).concat(this.data.slice(this.gapEnd))}*[Symbol.iterator](){let t=0;for(;t<this.data.length;)t<this.gapStart||t>=this.gapEnd?(yield this.data[t],t+=1):t+=1}*entries(){let t=0,e=0;for(;e<this.data.length;)e<this.gapStart||e>=this.gapEnd?(yield[t,this.data[e]],e+=1,t+=1):e+=1}}class i{constructor(t){this._text=new s(t||[])}get length(){return this._text.length}get(t){return this._text.get(t)}slice(t,e){return this._text.slice(t,e)}insertValueAt(t,e){this._text.insert(t,e)}deleteAt(t){this._text.delete(t)}push(t){this._text.push(t)}pop(){return this._text.pop()}concat(t){for(const e of t)this._text.push(e);return this}clone(){return new i([...this])}*[Symbol.iterator](){for(const t of this._text)yield t}entries(){return this._text.entries()}}let n,r;!function(t){t.getFileContents=function(t){return t.text()},t.saveFileContents=async function(t,e){const s=await window.showSaveFilePicker({suggestedName:t}),i=await s.createWritable();return await i.write(e.toArrayBuffer()),await i.close()},t.promptFileSelect=async function(){const t=await window.showOpenFilePicker({multiple:!1});return await t[0].getFile()}}(n||(n={})),function(t){t[t.HL_NORMAL=0]="HL_NORMAL",t[t.HL_NUMBER=1]="HL_NUMBER",t[t.HL_STRING=2]="HL_STRING",t[t.HL_COMMENT=3]="HL_COMMENT",t[t.HL_KEYWORD1=4]="HL_KEYWORD1",t[t.HL_KEYWORD2=5]="HL_KEYWORD2"}(r||(r={}));const o=new Set(["export","import","new"]),h=new Set(o),a=["await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","try","var"].concat([...o]);function c(t){return function(t){return 0===t?.trim().length||void 0===t}(t)||"\0"===t||!!t.match("/^[,.()+-/*=~%<>;]/")}function l(t){const e=Array(t.length).fill(r.HL_NORMAL);let s,i=!0,n=0;for(;n<t.length;){const l=t.get(n);void 0!==s?(e.splice(n,1,r.HL_STRING),"\\"===l&&n+1<t.length&&(e.splice(n,1,r.HL_STRING),n++),l===s&&(s=void 0),i=!0):'"'!==l&&"'"!==l||(s=l,e.splice(n,1,r.HL_STRING)),(!isNaN(Number(l))&&(i||e[n-1]===r.HL_NUMBER)||"."==l&&e[n-1]==r.HL_NUMBER)&&e.splice(n,1,r.HL_NUMBER),"/"===(o=t).get(0)&&"/"===o.get(1)&&(e.length=t.length,e.fill(r.HL_COMMENT),n=t.length);const u=i;if(i=c(l),u)for(const s of a){const o=s.length,a=t.slice(n,n+o).join("");if(a===s&&t.get(n+o)&&c(t[n+o])){const t=h.has(a);for(let s=0;s<o;s++)t?e.splice(n+s,1,r.HL_KEYWORD2):e.splice(n+s,1,r.HL_KEYWORD1);n+=o,i=!0;break}}n++}var o;return e}const u=new Set(["[","{","(",'"',"'"]),g={"{":"}","[":"]","(":")",'"':'"',"'":"'"};const f="#282a36",d="#ff79c6",p="#f8f8f2",w="#8be9fd",_="#f1fa8c",x="#8be9fd",m="#6272a4",Y="#bd93f9";function S(t,e,s,i,n,o,h){!function(t,e,s,i,n,o){e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.restore(),e.fillStyle=f,e.fillRect(0,Math.abs(n.Y),t.width,t.height);for(const[t,n]of i.entries()){e.fillStyle=p,e.save(),e.fillStyle=Y,e.fillText(o.generateLineNumberText(t),0,s.height*(t+1)),e.restore();for(const[h,a]of n.entries()){switch(e.save(),i.textHL[t][h]){case r.HL_NUMBER:e.fillStyle=Y;break;case r.HL_STRING:e.fillStyle=_;break;case r.HL_COMMENT:e.fillStyle=m;break;case r.HL_KEYWORD1:e.fillStyle=d;break;case r.HL_KEYWORD2:e.fillStyle=w;break;default:e.fillStyle=p}e.fillText(a,o.offset+s.width*h,s.height*(t+1)),e.restore()}}}(t,e,s,n,o,h),function(t,e,s,i,n){e.save(),e.beginPath(),e.moveTo(n.offset+i.X*s.width+2,i.Y*s.height+1),e.lineTo(n.offset+i.X*s.width+2,i.Y*s.height+s.height+4),e.lineWidth=2,e.strokeStyle=x,e.stroke(),e.restore()}(0,e,s,i,h)}const{canvas:A,context:v}=t(),b=new class{constructor(t,e,s,i){this._font="Courier New",this._font=e||"Courier New",this._fontSize=s,t.font=`${this._fontSize}px ${this._font}`,this._width=t.measureText(["a"].join("")).width,this._linePadding=i,this.context=t}get height(){return this._fontSize+this._linePadding}get width(){return this._width}get fontStyle(){return`${this._fontSize}px ${this._font}`}setFontStyle(){this.context.font=`${this._fontSize}px ${this._font}`}}(v,"Courier New",16,4),R=new class{constructor(t,e){this._text=[new i],this._text_hl=[[]],this._buffer=[],this._fileName="untitled.txt",this._fontContext=t,this._text=e||[new i]}get name(){return this._fileName}get contentHeight(){return this._text.length*this._fontContext.height}get length(){return this._text.length}get buffer(){return this._buffer}get textHL(){return this._text_hl}get lineNumberWidth(){return this.length.toString().length}readFromFile(t,e){this._fileName=t||"untitled.txt";const s=e.split("\n"),n=[],r=[];for(const t of s){const e=new i(t.split(""));n.push(e),r.push(l(e))}this._text=n,this._text_hl=r}toArrayBuffer(){const t=[];for(const e of this._text)t.push([...e,"\n"].join(""));const e=t.join(""),s=new ArrayBuffer(t.length),i=new Uint8Array(s);for(let s=0,n=t.length;s<n;s++)i[s]=e.charCodeAt(s);return s}addRowToBuffer(t){this._buffer.push(t.clone())}setBuffer(t){this._buffer=t.map((t=>t.clone()))}clearBuffer(){this._buffer=[]}rowAt(t){return this._text[t]}charAt(t,e){const s=this._text[e];if(s)return s.get(t)}insertNewRowAt(t,e=new i){this._text_hl.splice(t,0,l(e)),this._text.splice(t,0,e)}insertNewRowsAt(t,e=[]){this._text.splice(t,0,...e)}replaceRowAt(t,e){this._text_hl[t]=l(e),this._text[t]=e}removeRowAt(t){this._text.splice(t,1)}*entries(){for(const[t,e]of this._text.entries())yield[t,e]}*stream(){for(const t of this._text){for(const e of t)yield e;yield"\n"}}peekableStream(){const t=this.stream();let e=t.next();const s=function*(){for(;!e.done;){const s=e.value;e=t.next(),yield s}return e.value}();return s.peek=()=>e,s}}(b),y=new class{constructor(t,e){this._textContext=t,this._fontContext=e}get lineNumberWidth(){return this._textContext.lineNumberWidth+1}get offset(){return this.lineNumberWidth*this._fontContext.width}generateLineNumberText(t){return new Array(this.lineNumberWidth-t.toString().length).join(" ")+t.toString()+"|"}}(R,b),E=new class{constructor(t){this.cursorX=0,this.cursorY=0,this.cursorVisible=!0,this.textContent=t}get X(){return this.cursorX}get Y(){return this.cursorY}setPosition([t,e]){this.cursorX=t,this.cursorY=e}get position(){return[this.cursorX,this.cursorY]}moveRight(t=1){this.textContent.charAt(this.cursorX,this.cursorY)?this.cursorX+=t:this.textContent.rowAt(this.cursorY)&&this.setPosition([this.textContent.rowAt(this.cursorY).length,this.cursorY])}moveLeft(t=1){this.cursorX-t>=0&&(this.cursorX-=t)}moveUp(t=1){if(this.cursorY-t>=0){const e=this.textContent.charAt(this.cursorX,this.cursorY-1),s=this.textContent.rowAt(this.cursorY-1);e?this.cursorY-=t:s&&this.setPosition([s.length,this.cursorY-1])}}moveDown(t=1){const e=this.textContent.charAt(this.cursorX,this.cursorY+1),s=this.textContent.rowAt(this.cursorY+1);e?this.cursorY+=t:s&&this.setPosition([s.length,this.cursorY+1])}}(R),L=new class{constructor(t,e,s){this.cursorX=0,this.cursorY=0,this._context=void 0,this._canvas=void 0,this._context=e,this._canvas=t,this._textContent=s}get X(){return this.cursorX}get Y(){return this.cursorY}scrollUp(t=200){this.cursorY>=0?this.cursorY:this.cursorY+t>0?(this._context.translate(0,Math.abs(this.cursorY)),this.cursorY+=Math.abs(this.cursorY)):(this.cursorY+=t,this._context.translate(0,t))}scrollDown(t=200){if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height<this._textContent.contentHeight)this.cursorY-=t,this._context.translate(0,0-t);else if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height>=this._textContent.contentHeight);else{const t=Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height-this._textContent.contentHeight;this.cursorY-=t,this._context.translate(0,0-t)}}}(A,v,R);function C(){window.requestAnimationFrame((()=>S(A,v,b,E,R,L,y)))}document.addEventListener("keydown",(function(t){if(t.preventDefault(),t.metaKey&&t.shiftKey&&["ArrowUp","ArrowDown"].includes(t.code))switch(t.code){case"ArrowDown":L.scrollDown(),C();break;case"ArrowUp":L.scrollUp(),C()}if(t.metaKey||t.ctrlKey)switch(t.code){case"KeyO":n.promptFileSelect().then((t=>n.getFileContents(t).then((e=>{R.readFromFile(t.name,e),C()}))));break;case"KeyS":n.saveFileContents(R.name,R).then((()=>{alert(`${R.name} saved`)}));break;case"KeyX":{R.clearBuffer(),R.addRowToBuffer(R.rowAt(E.Y)),R.length>1?R.removeRowAt(E.Y):(R.removeRowAt(E.Y),R.insertNewRowAt(E.Y,new i));const t=R.charAt(E.X,E.Y-1),e=R.rowAt(E.Y-1);t?E.moveUp():e&&E.setPosition([e.length,E.Y-1]);break}case"KeyC":R.clearBuffer(),R.addRowToBuffer(R.rowAt(E.Y));break;case"KeyV":R.insertNewRowsAt(E.Y,R.buffer),E.setPosition([R.rowAt(E.Y).length,E.Y])}else{const e=R.rowAt(E.Y);switch(t.code){case"Escape":case"MetaRight":case"MetaLeft":case"ShiftLeft":case"ShiftRight":break;case"ArrowLeft":E.moveLeft();break;case"ArrowRight":E.moveRight();break;case"ArrowUp":E.moveUp();break;case"ArrowDown":E.moveDown();break;case"Enter":if(E.X===R.rowAt(E.Y).length)R.insertNewRowAt(E.Y+1),E.setPosition([0,E.Y+1]);else{const t=R.rowAt(E.Y),e=t.slice(0,E.X),s=t.slice(E.X,t.length);R.replaceRowAt(E.Y,new i(e)),R.insertNewRowAt(E.Y+1),R.replaceRowAt(E.Y+1,new i(s)),E.setPosition([0,E.Y+1])}break;case"Backspace":if(E.X>0)e.deleteAt(E.X-1),E.moveLeft();else if(R.rowAt(E.Y-1)){const t=R.rowAt(E.Y-1).length,e=R.rowAt(E.Y-1).concat(R.rowAt(E.Y));R.replaceRowAt(E.Y-1,e),R.removeRowAt(E.Y),E.setPosition([t,E.Y-1])}break;case"Tab":e.push(" "),e.push(" "),e.push(" "),e.push(" "),E.moveRight(4);break;default:u.has(t.key)?(e.insertValueAt(E.X,t.key),E.moveRight(),e.insertValueAt(E.X,g[t.key])):(e.insertValueAt(E.X,t.key),E.moveRight())}}R.textHL[E.Y]=l(R.rowAt(E.Y)),C()})),A.addEventListener("mousedown",(t=>e(t,b,y))),window.addEventListener("wheel",(function(t){const e=t.deltaY;e>0?L.scrollDown(Math.abs(e)):L.scrollUp(Math.abs(e)),C()})),window.addEventListener("resize",(()=>{t(),b.setFontStyle(),C()})),document.getElementById("openFileButton").addEventListener("click",(()=>{n.promptFileSelect().then((t=>n.getFileContents(t).then((e=>{R.readFromFile(t.name,e),C()}))))})),document.getElementById("saveFileButton").addEventListener("click",(()=>{n.saveFileContents(R.name,R).then((()=>{alert(`${R.name} saved`)}))})),C();
//# sourceMappingURL=index.b57ef078.js.map
