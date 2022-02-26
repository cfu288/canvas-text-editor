function t(){let t=window.devicePixelRatio,e=document.getElementById("myCanvas"),r=document.getElementById("canvasContainer");e.width=r.clientWidth,e.height=r.clientHeight;let s=r.getBoundingClientRect();return e.width=s.width*t,e.height=s.height*t,e.getContext("2d").scale(t,t),e.style.width=s.width+"px",e.style.height=s.height+"px",{canvas:e,context:e.getContext("2d")}}const e="#282a36",r="#ff79c6",s="#f8f8f2",n="#8be9fd",o="#f1fa8c",i="#8be9fd",c="#6272a4",l="#bd93f9";let a;!function(t){t[t.HL_NORMAL=0]="HL_NORMAL",t[t.HL_NUMBER=1]="HL_NUMBER",t[t.HL_STRING=2]="HL_STRING",t[t.HL_COMMENT=3]="HL_COMMENT",t[t.HL_KEYWORD1=4]="HL_KEYWORD1",t[t.HL_KEYWORD2=5]="HL_KEYWORD2"}(a||(a={}));const h=new Set(["export","import","new"]),u=new Set(h),f=["await","break","case","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","try","var"].concat([...h]);function w(t){return function(t){return 0===t.trim().length}(t)||"\0"===t||!!t.match("/^[,.()+-/*=~%<>;]/")}function Y(t){const e=Array(t.length).fill(a.HL_NORMAL);let r,s=!0,n=0;for(;n<t.length;){const i=t[n];void 0!==r?(e.splice(n,1,a.HL_STRING),"\\"===i&&n+1<t.length&&(e.splice(n,1,a.HL_STRING),n++),i===r&&(r=void 0),s=!0):'"'!==i&&"'"!==i||(r=i,e.splice(n,1,a.HL_STRING)),(!isNaN(Number(i))&&(s||e[n-1]===a.HL_NUMBER)||"."==i&&e[n-1]==a.HL_NUMBER)&&e.splice(n,1,a.HL_NUMBER),"/"===(o=t)?.[0]&&"/"===o?.[1]&&(e.length=t.length,e.fill(a.HL_COMMENT),n=t.length);const c=s;if(s=w(i),c)for(const r of f){const o=r.length,i=t.slice(n,n+o).join("");if(i===r&&t[n+o]&&w(t[n+o])){const t=u.has(i);for(let r=0;r<o;r++)t?e.splice(n+r,1,a.HL_KEYWORD2):e.splice(n+r,1,a.HL_KEYWORD1);n+=o,s=!0;break}}n++}var o;return e}function d(t,h){!function(t,i){i.save(),i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,t.width,t.height),i.restore(),i.fillStyle=e,i.fillRect(0,Math.abs(N.Y),t.width,t.height);for(const[t,e]of X.text.entries()){X.textHL[t]=Y(e.text),i.fillStyle=s;for(const[s,h]of e.entries())i.save(),X.textHL[t][s]===a.HL_NUMBER?i.fillStyle=l:X.textHL[t][s]===a.HL_STRING?i.fillStyle=o:X.textHL[t][s]===a.HL_COMMENT?i.fillStyle=c:X.textHL[t][s]===a.HL_KEYWORD1?i.fillStyle=r:X.textHL[t][s]===a.HL_KEYWORD2&&(i.fillStyle=n),i.fillText(h,H[0]*s,H[1]*(t+1)),i.restore()}}(t,h),function(t,e){e.save(),e.beginPath(),e.moveTo(y.X*H[0]+2,y.Y*H[1]+1),e.lineTo(y.X*H[0]+2,y.Y*H[1]+H[1]+4),e.lineWidth=2,e.strokeStyle=i,e.stroke(),e.restore()}(0,h)}class g{constructor(t){this._text=[],this._text=t||[]}clone(){return new g([...this._text])}get text(){return this._text}get length(){return this._text.length}charAtIndex(t){return this._text[t]}entries(){return this._text.entries()}concat(t){return this._text.concat(t.text),this}concatRaw(t){return this._text.concat(t),this}insertValueAt(t,e){this._text.splice(t,0,e)}push(t){this._text.push(t)}pop(){this._text.pop()}deleteValueAt(t){this._text.splice(t,1)}}let _;!function(t){t.getFileContents=function(t){return t.text()},t.promptFileSelect=async function(){const t=await window.showOpenFilePicker({multiple:!1});return await t[0].getFile()}}(_||(_={}));const x=new Set(["[","{","(",'"',"'"]),p={"{":"}","[":"]","(":")",'"':'"',"'":"'"};function A(t){const e="Courier New";t.font=`16px ${e}`;return{font:e,fontSize:16,linePadding:4,charXY:[t.measureText(["a"].join("")).width,20]}}const{canvas:m,context:R}=t(),{font:L,fontSize:v,linePadding:b,charXY:H}=A(R),y=new class{constructor(){this.cursorX=0,this.cursorY=0,this.cursorVisible=!0}get X(){return this.cursorX}get Y(){return this.cursorY}setPosition([t,e]){this.cursorX=t,this.cursorY=e}get position(){return[this.cursorX,this.cursorY]}moveRight(t=1){this.cursorX+=t}moveLeft(t=1){this.cursorX-t>=0&&(this.cursorX-=t)}moveUp(t=1){this.cursorY-t>=0&&(this.cursorY-=t)}moveDown(t=1){this.cursorY+=t}},X=new class{constructor(){this._text=[new g],this._text_hl=[[]],this._buffer=[]}readFromFile(t){const e=t.split("\n");console.log(e);const r=[];for(const t of e)r.push(new g(t.split("")));this._text=r}get length(){return this.text.length}get buffer(){return this._buffer}addRowToBuffer(t){this._buffer.push(t.clone())}setBuffer(t){this._buffer=t.map((t=>t.clone()))}clearBuffer(){this._buffer=[]}get text(){return this._text}get textHL(){return this._text_hl}rowAt(t){return this._text[t]}charAt(t,e){const r=this._text[e];if(r)return r.text[t]}insertNewRowAt(t,e=new g){this._text.splice(t,0,e)}insertNewRowsAt(t,e=[]){this._text.splice(t,0,...e)}replaceRowAt(t,e){this._text[t]=e}removeRowAt(t){this._text.splice(t,1)}},N=new class{constructor(t){this.cursorX=0,this.cursorY=0,this._context=void 0,this._context=t}get X(){return this.cursorX}get Y(){return this.cursorY}scrollUp(t=200){this.cursorY>=0?this.cursorY:this.cursorY+t>0?(this._context.translate(0,Math.abs(this.cursorY)),this.cursorY+=Math.abs(this.cursorY)):(this.cursorY+=t,this._context.translate(0,t))}scrollDown(t=200){this.cursorY-=t,this._context.translate(0,0-t)}}(R);console.log("scroller init"),document.addEventListener("keydown",(function(t){if(t.preventDefault(),t.metaKey||t.ctrlKey)switch(t.code){case"KeyO":_.promptFileSelect().then((t=>_.getFileContents(t).then((t=>{X.readFromFile(t),window.requestAnimationFrame((()=>d(m,R)))}))));break;case"KeyF":N.scrollDown(),window.requestAnimationFrame((()=>d(m,R)));break;case"KeyB":N.scrollUp(),window.requestAnimationFrame((()=>d(m,R)));break;case"KeyX":{X.clearBuffer(),X.addRowToBuffer(X.rowAt(y.Y)),X.length>1?X.removeRowAt(y.Y):(X.removeRowAt(y.Y),X.insertNewRowAt(y.Y,new g));const t=X.charAt(y.X,y.Y-1),e=X.rowAt(y.Y-1);t?y.moveUp():e&&y.setPosition([e.length,y.Y-1]);break}case"KeyC":X.clearBuffer(),X.addRowToBuffer(X.rowAt(y.Y));break;case"KeyV":X.insertNewRowsAt(y.Y,X.buffer),y.setPosition([X.rowAt(y.Y).length,y.Y])}else{let e=X.rowAt(y.Y);switch(t.code){case"Escape":case"MetaRight":case"MetaLeft":case"ShiftLeft":case"ShiftRight":break;case"ArrowLeft":y.moveLeft();break;case"ArrowRight":X.charAt(y.X,y.Y)?y.moveRight():X.rowAt(y.Y)&&y.setPosition([X.rowAt(y.Y).length,y.Y]);break;case"ArrowUp":{const t=X.charAt(y.X,y.Y-1),e=X.rowAt(y.Y-1);t?y.moveUp():e&&y.setPosition([e.length,y.Y-1]);break}case"ArrowDown":{const t=X.charAt(y.X,y.Y+1),e=X.rowAt(y.Y+1);t?y.moveDown():e&&y.setPosition([e.length,y.Y+1]);break}case"Enter":if(y.X===X.rowAt(y.Y).length)X.insertNewRowAt(y.Y+1),y.setPosition([0,y.Y+1]);else{const t=X.rowAt(y.Y),e=t.text.slice(0,y.X),r=t.text.slice(y.X,t.length);X.replaceRowAt(y.Y,new g(e)),X.insertNewRowAt(y.Y+1),X.replaceRowAt(y.Y+1,new g(r)),y.setPosition([0,y.Y+1])}break;case"Backspace":if(y.X>0)e.deleteValueAt(y.X-1),y.moveLeft();else if(X.text[y.Y-1]){const t=X.rowAt(y.Y-1).length,e=X.rowAt(y.Y-1).concat(X.text[y.Y]);X.replaceRowAt(y.Y-1,e),X.removeRowAt(y.Y),y.setPosition([t,y.Y-1])}break;case"Tab":e.push(" "),e.push(" "),e.push(" "),e.push(" "),y.moveRight(4);break;default:x.has(t.key)?(e.insertValueAt(y.X,t.key),y.moveRight(),e.insertValueAt(y.X,p[t.key])):(e.insertValueAt(y.X,t.key),y.moveRight())}}window.requestAnimationFrame((()=>d(m,R)))})),m.addEventListener("mousedown",(function(t){const[e,r]=function(t,e){const r=m.getBoundingClientRect();return[Math.round((N.X+t-r.left)/H[0]),Math.round((Math.abs(N.Y)+e-r.top)/H[1])-1]}(t.clientX,t.clientY);X.charAt(e,r)?y.setPosition([e,r]):X.rowAt(r)&&y.setPosition([X.rowAt(r).length,r]),window.requestAnimationFrame((()=>d(m,R)))})),window.addEventListener("resize",(()=>{t(),A(R),window.requestAnimationFrame((()=>d(m,R)))})),window.requestAnimationFrame((()=>d(m,R)));
//# sourceMappingURL=index.d05a3911.js.map
