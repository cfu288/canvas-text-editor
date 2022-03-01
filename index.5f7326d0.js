function t(){let t=window.devicePixelRatio,e=document.getElementById("myCanvas"),s=document.getElementById("canvasContainer");e.width=s.clientWidth,e.height=s.clientHeight;let i=s.getBoundingClientRect();return e.width=i.width*t,e.height=i.height*t,e.getContext("2d").scale(t,t),e.style.width=i.width+"px",e.style.height=i.height+"px",{canvas:e,context:e.getContext("2d")}}class e{constructor(t,e=32){this.data=[],this.gapSize=32,this.gapStart=0,this.gapEnd=32;const s=e-t.length>=0?Array(e-t.length):[];this.data=t.concat(s),this.gapSize=e,this.gapEnd=e>t.length?e:t.length,this.gapStart=t.length||0}get length(){return this.data.length-(this.gapEnd-this.gapStart)}concat(t){for(const e of t)this.push(e)}delete(t){this.moveGap(t+1),this.gapStart-=1,this.gapStart<0&&(this.gapStart=0)}insert(t,e){this.gapStart===this.gapEnd?(this.data.splice(t,0,...new Array(this.gapSize)),this.gapStart=t,this.gapEnd=t+this.gapSize):this.moveGap(t),this.data[this.gapStart++]=e}get(t){return t>=this.gapStart?this.data[t+(this.gapEnd-this.gapStart)]:this.data[t]}push(t){this.insert(this.length,t)}pop(){this.moveGap(this.length),this.gapStart-=1,this.gapStart<0&&(this.gapStart=0)}moveGap(t){if(t<this.gapStart){let e=this.gapStart-t;for(let s=e-1;s>=0;s--)this.data[this.gapEnd-e+s]=this.data[t+s];this.gapStart-=e,this.gapEnd-=e}else{let e=t-this.gapStart;for(let t=0;t<e;++t)this.data[this.gapStart+t]=this.data[this.gapEnd+t];this.gapStart+=e,this.gapEnd+=e}}get _arr(){return this.data.slice(0,this.gapStart).concat(this.data.slice(this.gapEnd))}*[Symbol.iterator](){let t=0;for(;t<this.data.length;)t<this.gapStart||t>=this.gapEnd?(yield this.data[t],t+=1):t+=1}*entries(){let t=0,e=0;for(;e<this.data.length;)e<this.gapStart||e>=this.gapEnd?(yield[t,this.data[e]],e+=1,t+=1):e+=1}}class s{constructor(t){this._text=new e(t||[])}clone(){return new s([...this._text])}get text(){return[...this._text]}get(t){return this._text.get(t)}get gb(){return this._text}get length(){return this._text.length}charAtIndex(t){return this._text.get(t)}entries(){return this._text.entries()}concat(t){return this._text.concat(t.gb),this}insertValueAt(t,e){this._text.insert(t,e)}push(t){this._text.push(t)}pop(){this._text.pop()}deleteValueAt(t){this._text.delete(t)}}let i,n;!function(t){t.getFileContents=function(t){return t.text()},t.saveFileContents=async function(t,e){const s=await window.showSaveFilePicker({suggestedName:t}),i=await s.createWritable();return await i.write(e.toArrayBuffer()),await i.close()},t.promptFileSelect=async function(){const t=await window.showOpenFilePicker({multiple:!1});return await t[0].getFile()}}(i||(i={})),function(t){t[t.HL_NORMAL=0]="HL_NORMAL",t[t.HL_NUMBER=1]="HL_NUMBER",t[t.HL_STRING=2]="HL_STRING",t[t.HL_COMMENT=3]="HL_COMMENT",t[t.HL_KEYWORD1=4]="HL_KEYWORD1",t[t.HL_KEYWORD2=5]="HL_KEYWORD2"}(n||(n={}));const r=new Set(["export","import","new"]),o=new Set(r),a=["await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","try","var"].concat([...r]);function h(t){return function(t){return 0===t?.trim().length||void 0===t}(t)||"\0"===t||!!t.match("/^[,.()+-/*=~%<>;]/")}function c(t){const e=Array(t.length).fill(n.HL_NORMAL);let s,i=!0,r=0;for(;r<t.length;){const l=t.get(r);void 0!==s?(e.splice(r,1,n.HL_STRING),"\\"===l&&r+1<t.length&&(e.splice(r,1,n.HL_STRING),r++),l===s&&(s=void 0),i=!0):'"'!==l&&"'"!==l||(s=l,e.splice(r,1,n.HL_STRING)),(!isNaN(Number(l))&&(i||e[r-1]===n.HL_NUMBER)||"."==l&&e[r-1]==n.HL_NUMBER)&&e.splice(r,1,n.HL_NUMBER),"/"===(c=t).get(0)&&"/"===c.get(1)&&(e.length=t.length,e.fill(n.HL_COMMENT),r=t.length);const u=i;if(i=h(l),u)for(const s of a){const a=s.length,c=t.text.slice(r,r+a).join("");if(c===s&&t.get(r+a)&&h(t[r+a])){const t=o.has(c);for(let s=0;s<a;s++)t?e.splice(r+s,1,n.HL_KEYWORD2):e.splice(r+s,1,n.HL_KEYWORD1);r+=a,i=!0;break}}r++}var c;return e}const l=new Set(["[","{","(",'"',"'"]),u={"{":"}","[":"]","(":")",'"':'"',"'":"'"};function g(t){const e="Courier New";t.font=`16px ${e}`;return{font:e,fontSize:16,linePadding:4,charXY:[t.measureText(["a"].join("")).width,20]}}const f="#282a36",d="#ff79c6",p="#f8f8f2",w="#8be9fd",_="#f1fa8c",x="#8be9fd",Y="#6272a4",m="#bd93f9";function A(t,e){!function(t,e){e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.restore(),e.fillStyle=f,e.fillRect(0,Math.abs(C.Y),t.width,t.height);for(const[t,s]of E.text.entries()){e.fillStyle=p;for(const[i,r]of s.entries())e.save(),E.textHL[t][i]===n.HL_NUMBER?e.fillStyle=m:E.textHL[t][i]===n.HL_STRING?e.fillStyle=_:E.textHL[t][i]===n.HL_COMMENT?e.fillStyle=Y:E.textHL[t][i]===n.HL_KEYWORD1?e.fillStyle=d:E.textHL[t][i]===n.HL_KEYWORD2&&(e.fillStyle=w),e.fillText(r,y[0]*i,y[1]*(t+1)),e.restore()}}(t,e),function(t,e){e.save(),e.beginPath(),e.moveTo(H.X*y[0]+2,H.Y*y[1]+1),e.lineTo(H.X*y[0]+2,H.Y*y[1]+y[1]+4),e.lineWidth=2,e.strokeStyle=x,e.stroke(),e.restore()}(0,e)}const{canvas:v,context:R}=t(),{font:S,fontSize:L,linePadding:b,charXY:y}=g(R),E=new class{constructor(t){this._text=[new s],this._text_hl=[[]],this._buffer=[],this._fileName="untitled.txt",this._charXY=t}get contentHeight(){return this._text.length*this._charXY[1]}readFromFile(t,e){this._fileName=t||"untitled.txt";const i=e.split("\n"),n=[],r=[];for(const t of i){const e=new s(t.split(""));n.push(e),r.push(c(e))}this._text=n,this._text_hl=r}get name(){return this._fileName}toArrayBuffer(){const t=this._text.reduce(((t,e)=>t.concat([...e.text,"\n"])),[]).join("");var e=new ArrayBuffer(t.length),s=new Uint8Array(e);for(let e=0,i=t.length;e<i;e++)s[e]=t.charCodeAt(e);return e}get length(){return this.text.length}get buffer(){return this._buffer}addRowToBuffer(t){this._buffer.push(t.clone())}setBuffer(t){this._buffer=t.map((t=>t.clone()))}clearBuffer(){this._buffer=[]}get text(){return this._text}get textHL(){return this._text_hl}rowAt(t){return this._text[t]}charAt(t,e){const s=this._text[e];if(s)return s.get(t)}insertNewRowAt(t,e=new s){this._text.splice(t,0,e)}insertNewRowsAt(t,e=[]){this._text.splice(t,0,...e)}replaceRowAt(t,e){this._text[t]=e}removeRowAt(t){this._text.splice(t,1)}}(y),H=new class{constructor(t,e,s){this.cursorX=0,this.cursorY=0,this.cursorVisible=!0,this._context=void 0,this._canvas=void 0,this._textContent=s,this._context=e,this._canvas=t}get X(){return this.cursorX}get Y(){return this.cursorY}setPosition([t,e]){this.cursorX=t,this.cursorY=e}get position(){return[this.cursorX,this.cursorY]}moveRight(t=1){this._textContent.charAt(this.cursorX,this.cursorY)?this.cursorX+=t:this._textContent.rowAt(this.cursorY)&&this.setPosition([this._textContent.rowAt(this.cursorY).length,this.cursorY])}moveLeft(t=1){this.cursorX-t>=0&&(this.cursorX-=t)}moveUp(t=1){if(this.cursorY-t>=0){const e=this._textContent.charAt(this.cursorX,this.cursorY-1),s=this._textContent.rowAt(this.cursorY-1);e?this.cursorY-=t:s&&this.setPosition([s.length,this.cursorY-1])}}moveDown(t=1){const e=this._textContent.charAt(this.cursorX,this.cursorY+1),s=this._textContent.rowAt(this.cursorY+1);e?this.cursorY+=t:s&&this.setPosition([s.length,this.cursorY+1])}}(v,R,E),C=new class{constructor(t,e,s){this.cursorX=0,this.cursorY=0,this._context=void 0,this._canvas=void 0,this._context=e,this._canvas=t,this._textContent=s}get X(){return this.cursorX}get Y(){return this.cursorY}scrollUp(t=200){this.cursorY>=0?this.cursorY:this.cursorY+t>0?(this._context.translate(0,Math.abs(this.cursorY)),this.cursorY+=Math.abs(this.cursorY)):(this.cursorY+=t,this._context.translate(0,t))}scrollDown(t=200){if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height<this._textContent.contentHeight)this.cursorY-=t,this._context.translate(0,0-t);else if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height>=this._textContent.contentHeight);else{const t=Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height-this._textContent.contentHeight;this.cursorY-=t,this._context.translate(0,0-t)}}}(v,R,E);function N(){window.requestAnimationFrame((()=>A(v,R)))}document.addEventListener("keydown",(function(t){if(t.preventDefault(),t.metaKey&&t.shiftKey&&["ArrowUp","ArrowDown"].includes(t.code))switch(t.code){case"ArrowDown":C.scrollDown(),N();break;case"ArrowUp":C.scrollUp(),N()}if(t.metaKey||t.ctrlKey)switch(t.code){case"KeyO":i.promptFileSelect().then((t=>i.getFileContents(t).then((e=>{E.readFromFile(t.name,e),N()}))));break;case"KeyS":i.saveFileContents(E.name,E).then((()=>{alert(`${E.name} saved`)}));break;case"KeyX":{E.clearBuffer(),E.addRowToBuffer(E.rowAt(H.Y)),E.length>1?E.removeRowAt(H.Y):(E.removeRowAt(H.Y),E.insertNewRowAt(H.Y,new s));const t=E.charAt(H.X,H.Y-1),e=E.rowAt(H.Y-1);t?H.moveUp():e&&H.setPosition([e.length,H.Y-1]);break}case"KeyC":E.clearBuffer(),E.addRowToBuffer(E.rowAt(H.Y));break;case"KeyV":E.insertNewRowsAt(H.Y,E.buffer),H.setPosition([E.rowAt(H.Y).length,H.Y])}else{let e=E.rowAt(H.Y);switch(t.code){case"Escape":case"MetaRight":case"MetaLeft":case"ShiftLeft":case"ShiftRight":break;case"ArrowLeft":H.moveLeft();break;case"ArrowRight":H.moveRight();break;case"ArrowUp":H.moveUp();break;case"ArrowDown":H.moveDown();break;case"Enter":if(H.X===E.rowAt(H.Y).length)E.insertNewRowAt(H.Y+1),H.setPosition([0,H.Y+1]);else{const t=E.rowAt(H.Y),e=t.text.slice(0,H.X),i=t.text.slice(H.X,t.length);E.replaceRowAt(H.Y,new s(e)),E.insertNewRowAt(H.Y+1),E.replaceRowAt(H.Y+1,new s(i)),H.setPosition([0,H.Y+1])}break;case"Backspace":if(H.X>0)e.deleteValueAt(H.X-1),H.moveLeft();else if(E.text[H.Y-1]){const t=E.rowAt(H.Y-1).length,e=E.rowAt(H.Y-1).concat(E.text[H.Y]);E.replaceRowAt(H.Y-1,e),E.removeRowAt(H.Y),H.setPosition([t,H.Y-1])}break;case"Tab":e.push(" "),e.push(" "),e.push(" "),e.push(" "),H.moveRight(4);break;default:l.has(t.key)?(e.insertValueAt(H.X,t.key),H.moveRight(),e.insertValueAt(H.X,u[t.key])):(e.insertValueAt(H.X,t.key),H.moveRight())}}E.textHL[H.Y]=c(E.rowAt(H.Y)),N()})),v.addEventListener("mousedown",(function(t){const[e,s]=function(t,e){const s=v.getBoundingClientRect();return[Math.round((C.X+t-s.left)/y[0]),Math.round((Math.abs(C.Y)+e-s.top)/y[1])-1]}(t.clientX,t.clientY);E.charAt(e,s)?H.setPosition([e,s]):E.rowAt(s)&&H.setPosition([E.rowAt(s).length,s]),N()})),window.addEventListener("wheel",(function(t){const e=t.deltaY;e>0?C.scrollDown(Math.abs(e)):C.scrollUp(Math.abs(e)),N()})),window.addEventListener("resize",(()=>{t(),g(R),N()})),document.getElementById("openFileButton").addEventListener("click",(()=>{i.promptFileSelect().then((t=>i.getFileContents(t).then((e=>{E.readFromFile(t.name,e),N()}))))})),document.getElementById("saveFileButton").addEventListener("click",(()=>{i.saveFileContents(E.name,E).then((()=>{alert(`${E.name} saved`)}))})),N();
//# sourceMappingURL=index.5f7326d0.js.map