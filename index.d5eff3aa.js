function t(t,e,i,s,n,r,o){const[h,a]=function(t,e,i,s,n,r){const o=t.getBoundingClientRect();return[Math.round((s.X+n-o.left-i.offset)/e.width),Math.round((Math.abs(s.Y)+r-o.top)/e.height)-1]}(e,s,n,o,t.clientX,t.clientY);i.charAt(h,a)?r.setPosition([h,a]):i.rowAt(a)&&r.setPosition([i.rowAt(a).length,a]),A()}class e{constructor(t,e=64){this.data=[],this.gapSize=64,this.gapStart=0,this.gapEnd=64;const i=e-t.length>=0?Array(e-t.length).fill(" "):[];this.data=t.concat(i),this.gapSize=e,this.gapEnd=e>t.length?e:t.length,this.gapStart=t.length||0}get length(){return this.data.length-(this.gapEnd-this.gapStart)}concat(t){for(const e of t)this.push(e)}delete(t){this.moveGap(t+1),this.gapStart-=1,this.gapStart<0&&(this.gapStart=0)}insert(t,e){this.gapStart===this.gapEnd?(this.data.splice(t,0,...new Array(this.gapSize).fill(" ")),this.gapStart=t,this.gapEnd=t+this.gapSize):this.moveGap(t),this.data[this.gapStart++]=e}get(t){return t>=this.gapStart?this.data[t+(this.gapEnd-this.gapStart)]:this.data[t]}slice(t,e){return t>=this.gapStart&&e>=this.gapStart?this.data.slice(t+(this.gapEnd-this.gapStart),e+(this.gapEnd-this.gapStart)):t<this.gapStart&&e>=this.gapStart?this.data.slice(t,this.gapStart).concat(this.data.slice(this.gapEnd,e+(this.gapEnd-this.gapStart))):this.data.slice(t,e)}push(t){this.insert(this.length,t)}pop(){this.moveGap(this.length);const t=this.get(this.length);return this.gapStart-=1,this.gapStart<0&&(this.gapStart=0),t}moveGap(t){if(t<this.gapStart){const e=this.gapStart-t;for(let i=e-1;i>=0;i--)this.data[this.gapEnd-e+i]=this.data[t+i];this.gapStart-=e,this.gapEnd-=e}else{const e=t-this.gapStart;for(let t=0;t<e;++t)this.data[this.gapStart+t]=this.data[this.gapEnd+t];this.gapStart+=e,this.gapEnd+=e}}get _arr(){return this.data.slice(0,this.gapStart).concat(this.data.slice(this.gapEnd))}*[Symbol.iterator](){let t=0;for(;t<this.data.length;)t<this.gapStart||t>=this.gapEnd?(yield this.data[t],t+=1):t+=1}*entries(){let t=0,e=0;for(;e<this.data.length;)e<this.gapStart||e>=this.gapEnd?(yield[t,this.data[e]],e+=1,t+=1):e+=1}}class i{constructor(t){this._text=new e(t||[])}get length(){return this._text.length}get(t){return this._text.get(t)}slice(t,e){return this._text.slice(t,e)}insertValueAt(t,e){this._text.insert(t,e)}deleteAt(t){this._text.delete(t)}push(t){this._text.push(t)}pop(){return this._text.pop()}concat(t){for(const e of t)this._text.push(e);return this}clone(){return new i([...this])}*[Symbol.iterator](){for(const t of this._text)yield t}entries(){return this._text.entries()}}let s,n;!function(t){t.getFileContents=function(t){return t.text()},t.saveFileContents=async function(t,e){const i=await window.showSaveFilePicker({suggestedName:t}),s=await i.createWritable();return await s.write(e.toArrayBuffer()),await s.close()},t.promptFileSelect=async function(){const t=await window.showOpenFilePicker({multiple:!1});return await t[0].getFile()}}(s||(s={})),function(t){t[t.HL_NORMAL=0]="HL_NORMAL",t[t.HL_NUMBER=1]="HL_NUMBER",t[t.HL_STRING=2]="HL_STRING",t[t.HL_COMMENT=3]="HL_COMMENT",t[t.HL_KEYWORD1=4]="HL_KEYWORD1",t[t.HL_KEYWORD2=5]="HL_KEYWORD2"}(n||(n={}));const r=new Set(["export","import","new"]),o=new Set(r),h=["await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","try","var"].concat([...r]);function a(t){return function(t){return 0===t?.trim().length||void 0===t}(t)||"\0"===t||!!t.match("/^[,.()+-/*=~%<>;]/")}function c(t){const e=Array(t.length).fill(n.HL_NORMAL);let i,s=!0,r=0;for(;r<t.length;){const c=t.get(r);void 0!==i?(e.splice(r,1,n.HL_STRING),"\\"===c&&r+1<t.length&&(e.splice(r,1,n.HL_STRING),r++),c===i&&(i=void 0),s=!0):'"'!==c&&"'"!==c||(i=c,e.splice(r,1,n.HL_STRING)),(!isNaN(Number(c))&&(s||e[r-1]===n.HL_NUMBER)||"."==c&&e[r-1]==n.HL_NUMBER)&&e.splice(r,1,n.HL_NUMBER),("/"===c&&"/"==t.get(r+1)||"/"===c&&"*"==t.get(r+1))&&(e.length=t.length,e.fill(n.HL_COMMENT),r=t.length);const l=s;if(s=a(c),l&&void 0===i)for(const i of h){const h=i.length,c=t.slice(r,r+h).join("");if(c===i&&t.get(r+h)&&a(t.get(r+h))){const t=o.has(c);for(let i=0;i<h;i++)t?e.splice(r+i,1,n.HL_KEYWORD2):e.splice(r+i,1,n.HL_KEYWORD1);r+=h,s=!0;break}}r++}return e}const l=new Set(["[","{","(",'"',"'"]),u={"{":"}","[":"]","(":")",'"':'"',"'":"'"};function d(t){const e=document.getElementsByClassName("menu"),i=document.getElementById(t);for(const i of e)i.classList.contains("hidden")||i.id==t||i.classList.add("hidden");i&&(i.classList.contains("hidden")?i.classList.remove("hidden"):i.classList.add("hidden"))}function g(){const t=window.devicePixelRatio,e=document.getElementById("myCanvas"),i=document.getElementById("canvasContainer");e.width=i.clientWidth,e.height=i.clientHeight;const s=i.getBoundingClientRect();e.width=s.width*t,e.height=s.height*t;const n=e.getContext("2d");if(!n)throw Error("Unable to get 2d context");return n.scale(t,t),e.style.width=s.width+"px",e.style.height=s.height+"px",{canvas:e,context:n}}const f=[{name:"Courier New",url:void 0},{name:"Fira Code",url:"/canvas-text-editor/fira-code-v17-latin-regular.woff2"}];const w={name:"Dracula",background:"#282a36",foreground:"#f8f8f2",line:"#44475a",keyword:"#ff79c6",title:"#50fa7b",text:"#f8f8f2",link:"#8be9fd",string:"#f1fa8c",cursor:"#8be9fd",comment:"#6272a4",number:"#bd93f9"};function p(t,e,i,s,r,o,h,a){!function(t,e,i,s,r,o,h,a){e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.restore(),e.fillStyle=h.theme.background,e.fillRect(0,Math.abs(r.Y),t.width,t.height);const c=t.getBoundingClientRect().height-r.Y+i.height;for(const[l,u]of s.entries()){const d=i.height*l+i.height+i.height,g=i.height*(l+1);if(d>=Math.abs(r.Y)&&c>g){e.fillStyle=h.theme.text,a.Y===l&&(e.save(),e.fillStyle=h.theme.line,e.globalAlpha=.4,e.fillRect(0,i.height*l,t.width,i.height+i.linePadding+i.linePadding),e.restore()),e.save(),e.fillStyle=h.theme.number,e.fillText(o.generateLineNumberText(l),0,g),e.restore();for(const[t,r]of u.entries()){switch(e.save(),s.textHL[l][t]){case n.HL_NUMBER:e.fillStyle=h.theme.number;break;case n.HL_STRING:e.fillStyle=h.theme.string;break;case n.HL_COMMENT:e.fillStyle=h.theme.comment;break;case n.HL_KEYWORD1:e.fillStyle=h.theme.keyword;break;case n.HL_KEYWORD2:e.fillStyle=h.theme.link;break;default:e.fillStyle=h.theme.text}e.fillText(r,o.offset+i.width*t,g),e.restore()}}}}(t,e,i,r,o,h,a,s),function(t,e,i,s,n,r){s.isVisible&&(e.save(),e.beginPath(),e.moveTo(n.offset+s.X*i.width,s.Y*i.height+1),e.lineTo(n.offset+s.X*i.width,s.Y*i.height+i.height+2*i.linePadding),e.lineWidth=2,e.strokeStyle=r.theme.cursor,e.stroke(),e.restore())}(0,e,i,s,h,a)}const{canvas:m,context:_}=g(),x=new class{constructor(t){this._theme=w,this._theme=t||w}get theme(){return this._theme}},Y=new class{constructor(t,e,i,s){this._font="Courier New",this.selectFont=async t=>{const e=f.filter((e=>e.name===t))?.[0];if(e){if(!document.fonts.check(`${this._fontSize}px ${e.name}`)){return new FontFace(e.name,`url(${e.url})`).load().then((t=>(document.fonts.add(t),this._font=e.name,this.setFontStyle(),Promise.resolve(this.fontStyle)))).catch((t=>Promise.reject(t)))}return this._font=e.name,this.setFontStyle(),Promise.resolve(this.fontStyle)}return Promise.reject(new Error("Font not available for this editor"))},this._font=e||"Courier New",this._fontSize=i,t.font=`${this._fontSize}px ${this._font}`,this._width=t.measureText(["a"].join("")).width,this._linePadding=s,this.context=t}get height(){return this._fontSize+this._linePadding}get linePadding(){return this._linePadding}get width(){return this._width}get fontStyle(){return`${this._fontSize}px ${this._font}`}setFontStyle(){this.context.font=`${this._fontSize}px ${this._font}`}}(_,"Courier New",14,4),S=new class{constructor(t,e){this._text=[new i],this._text_hl=[[]],this._buffer=[],this._fileName="untitled.txt",this._fontContext=t,this._text=e||[new i]}get name(){return this._fileName}get contentHeight(){return this._text.length*this._fontContext.height}get length(){return this._text.length}get buffer(){return this._buffer}get textHL(){return this._text_hl}get lineNumberWidth(){return this.length.toString().length}readFromFile(t,e){this._fileName=t||"untitled.txt";const s=e.split("\n"),n=[],r=[];for(const t of s){const e=new i(t.split(""));n.push(e),r.push(c(e))}this._text=n,this._text_hl=r}toArrayBuffer(){const t=[];for(const e of this._text)t.push([...e,"\n"].join(""));const e=t.join(""),i=new ArrayBuffer(t.length),s=new Uint8Array(i);for(let i=0,n=t.length;i<n;i++)s[i]=e.charCodeAt(i);return i}addRowToBuffer(t){this._buffer.push(t.clone())}setBuffer(t){this._buffer=t.map((t=>t.clone()))}clearBuffer(){this._buffer=[]}rowAt(t){return this._text[t]}charAt(t,e){const i=this._text[e];if(i)return i.get(t)}insertNewRowAt(t,e=new i){this._text_hl.splice(t,0,c(e)),this._text.splice(t,0,e)}insertNewRowsAt(t,e=[]){this._text.splice(t,0,...e)}replaceRowAt(t,e){this._text_hl[t]=c(e),this._text[t]=e}removeRowAt(t){this._text.splice(t,1)}*entries(){for(const[t,e]of this._text.entries())yield[t,e]}*stream(){for(const t of this._text){for(const e of t)yield e;yield"\n"}}peekableStream(){const t=this.stream();let e=t.next();const i=function*(){for(;!e.done;){const i=e.value;e=t.next(),yield i}return e.value}();return i.peek=()=>e,i}}(Y),b=new class{constructor(t,e){this._textContext=t,this._fontContext=e}get lineNumberWidth(){return this._textContext.lineNumberWidth+3}get offset(){return this.lineNumberWidth*this._fontContext.width}generateLineNumberText(t){return` ${new Array(this.lineNumberWidth-t.toString().length-2).join(" ")}${t.toString()}| `}}(S,Y),v=new class{constructor(t){this.cursorX=0,this.cursorY=0,this.visible=!1,this.textContent=t}get X(){return this.cursorX}get Y(){return this.cursorY}get isVisible(){return this.visible}toggleVisible(){this.visible=!this.visible}setVisible(t){this.visible=t}setPosition([t,e]){this.cursorX=t,this.cursorY=e}get position(){return[this.cursorX,this.cursorY]}moveRight(t=1){this.textContent.charAt(this.cursorX,this.cursorY)?this.cursorX+=t:this.textContent.rowAt(this.cursorY)&&this.setPosition([this.textContent.rowAt(this.cursorY).length,this.cursorY])}moveLeft(t=1){this.cursorX-t>=0&&(this.cursorX-=t)}moveUp(t=1){if(this.cursorY-t>=0){const e=this.textContent.charAt(this.cursorX,this.cursorY-1),i=this.textContent.rowAt(this.cursorY-1);e?this.cursorY-=t:i&&this.setPosition([i.length,this.cursorY-1])}}moveDown(t=1){const e=this.textContent.charAt(this.cursorX,this.cursorY+1),i=this.textContent.rowAt(this.cursorY+1);e?this.cursorY+=t:i&&this.setPosition([i.length,this.cursorY+1])}}(S),y=new class{constructor(t,e,i){this.cursorX=0,this.cursorY=0,this._context=e,this._canvas=t,this._textContent=i}get X(){return this.cursorX}get Y(){return this.cursorY}scrollUp(t=200){this.cursorY>=0?this.cursorY:this.cursorY+t>0?(this._context.translate(0,Math.abs(this.cursorY)),this.cursorY+=Math.abs(this.cursorY)):(this.cursorY+=t,this._context.translate(0,t))}scrollDown(t=200){if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height+t<this._textContent.contentHeight)this.cursorY-=t,this._context.translate(0,0-t);else if(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height<this._textContent.contentHeight){const t=this._textContent.contentHeight-Math.abs(Math.abs(this.cursorY)+this._canvas.getBoundingClientRect().height);console.log(t),this.cursorY-=t,this._context.translate(0,0-t)}}}(m,_,S);function A(){window.requestAnimationFrame((()=>p(m,_,Y,v,S,y,b,x)))}Y.selectFont("Fira Code").then((()=>{console.log("Font loaded")})).catch((t=>{console.error(`Unable to load new font: ${t}`)})),m.addEventListener("keydown",(function(t){if(t.preventDefault(),t.metaKey&&t.shiftKey&&["ArrowUp","ArrowDown"].includes(t.code))switch(t.code){case"ArrowDown":y.scrollDown(),A();break;case"ArrowUp":y.scrollUp(),A()}if(t.metaKey||t.ctrlKey)switch(t.code){case"KeyO":s.promptFileSelect().then((t=>s.getFileContents(t).then((e=>{S.readFromFile(t.name,e),A()}))));break;case"KeyS":s.saveFileContents(S.name,S).then((()=>{alert(`${S.name} saved`)}));break;case"KeyX":{S.clearBuffer(),S.addRowToBuffer(S.rowAt(v.Y)),S.length>1?S.removeRowAt(v.Y):(S.removeRowAt(v.Y),S.insertNewRowAt(v.Y,new i));const t=S.charAt(v.X,v.Y-1),e=S.rowAt(v.Y-1);t?v.moveUp():e&&v.setPosition([e.length,v.Y-1]);break}case"KeyC":S.clearBuffer(),S.addRowToBuffer(S.rowAt(v.Y));break;case"KeyV":S.insertNewRowsAt(v.Y,S.buffer),S.textHL[v.Y]=c(S.rowAt(v.Y)),S.textHL.splice(v.Y,0,c(S.rowAt(v.Y))),v.setPosition([S.rowAt(v.Y).length,v.Y])}else{const e=S.rowAt(v.Y);switch(t.code){case"Escape":case"MetaRight":case"MetaLeft":case"ShiftLeft":case"ShiftRight":break;case"ArrowLeft":v.moveLeft();break;case"ArrowRight":v.moveRight();break;case"ArrowUp":v.moveUp();break;case"ArrowDown":v.moveDown();break;case"Enter":if(v.X===S.rowAt(v.Y).length)S.insertNewRowAt(v.Y+1),v.setPosition([0,v.Y+1]);else{const t=S.rowAt(v.Y),e=t.slice(0,v.X),s=t.slice(v.X,t.length);S.replaceRowAt(v.Y,new i(e)),S.insertNewRowAt(v.Y+1),S.replaceRowAt(v.Y+1,new i(s)),v.setPosition([0,v.Y+1])}break;case"Backspace":if(v.X>0)e.deleteAt(v.X-1),v.moveLeft();else if(S.rowAt(v.Y-1)){const t=S.rowAt(v.Y-1).length,e=S.rowAt(v.Y-1).concat(S.rowAt(v.Y));S.replaceRowAt(v.Y-1,e),S.removeRowAt(v.Y),v.setPosition([t,v.Y-1])}break;case"Tab":e.push(" "),e.push(" "),e.push(" "),e.push(" "),v.moveRight(4);break;default:l.has(t.key)?(e.insertValueAt(v.X,t.key),v.moveRight(),e.insertValueAt(v.X,u[t.key])):(e.insertValueAt(v.X,t.key),v.moveRight())}}S.textHL[v.Y]=c(S.rowAt(v.Y)),A()})),m.addEventListener("mousedown",(e=>t(e,m,S,Y,b,v,y))),m.addEventListener("wheel",(function(t){const e=t.deltaY;e>0?y.scrollDown(Math.abs(e)):y.scrollUp(Math.abs(e)),A()})),window.addEventListener("resize",(()=>{g(),Y.setFontStyle(),A()})),document.getElementById("fileMenuButton")?.addEventListener("click",(()=>d("fileMenu"))),document.getElementById("preferencesMenuButton")?.addEventListener("click",(()=>d("preferencesMenu"))),document.getElementById("openFileButton")?.addEventListener("click",(()=>{s.promptFileSelect().then((t=>s.getFileContents(t).then((e=>{S.readFromFile(t.name,e),A()})))),d("fileMenu")})),document.getElementById("saveFileButton")?.addEventListener("click",(()=>{s.saveFileContents(S.name,S).then((()=>{alert(`${S.name} saved`)})),d("fileMenu")})),document.getElementById("loadSampleFileButton")?.addEventListener("click",(()=>{fetch("https://raw.githubusercontent.com/cfu288/canvas-text-editor/main/src/UTF8TextFile.txt").then((t=>{t.text().then((t=>{S.readFromFile("UTF8TextFile.txt",t)}))})),d("fileMenu")})),document.getElementById("font-item-courier-new")?.addEventListener("click",(()=>{Y.selectFont("Courier New").then((()=>{A(),d("preferencesMenu")})).catch((t=>{console.error(`Unable to load new font: ${t}`)}))})),document.getElementById("font-item-fira-code")?.addEventListener("click",(()=>{Y.selectFont("Fira Code").then((()=>{A(),d("preferencesMenu")})).catch((t=>{console.error(`Unable to load new font: ${t}`)}))})),setInterval((()=>{document.activeElement===m&&v.toggleVisible(),A()}),500),m.focus(),A();
//# sourceMappingURL=index.d5eff3aa.js.map
