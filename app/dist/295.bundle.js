(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[295],{295:function(g,x,A){"use strict";A.r(x);var O=A(961),U=A.n(O),y=A(667),B=A.n(y),m=A(96);m.default.dataManagement=function(){const E=m.default.data,M=(t=m.default.data)=>U().compressToBase64(JSON.stringify(t)),w=(t=localStorage.getItem("data"))=>t?JSON.parse(U().decompressFromBase64(t)):null,n=(t=!1)=>{m.default.data=E,r(),t&&window.location.reload()},r=()=>{m.default.data&&(m.default.data.playtime.timeLastPlayed=(0,y.E)(Date.now()),localStorage.setItem("data",M()),console.log("Game Saved"))};return{resetData:n,compileData:M,decompileData:w,saveData:r,exportData:()=>{const t=M();if(console.log(t),prompt("Download save data?:",t)!=null){const u=new Blob([t],{type:"text/plain"}),h=document.createElement("a");h.href=URL.createObjectURL(u),h.download="stellar-odyssey-data.txt",h.textContent="Download .txt file",document.body.appendChild(h),h.click(),document.body.removeChild(h)}},loadData:()=>{if(!m.default.data)return;function t(f){for(const d in f)if(typeof f[d]=="string")try{const c=(0,y.E)(f[d]);f[d]=c}catch(c){console.error(`Error processing value: ${f[d]}`)}else typeof f[d]=="object"&&f[d]!==null&&t(f[d]);return f}let u=w();console.log(u),console.log(u=t(u));function h(f,d){for(const c in f)f.hasOwnProperty(c)&&(d.hasOwnProperty(c)?typeof f[c]=="object"&&typeof d[c]=="object"&&h(f[c],d[c]):d[c]=f[c])}console.log(h(E,u))}}}()},961:function(g,x,A){var O,U=function(){var y=String.fromCharCode,B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",E={};function M(n,r){if(!E[n]){E[n]={};for(var s=0;s<n.length;s++)E[n][n.charAt(s)]=s}return E[n][r]}var w={compressToBase64:function(n){if(n==null)return"";var r=w._compress(n,6,function(s){return B.charAt(s)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(n){return n==null?"":n==""?null:w._decompress(n.length,32,function(r){return M(B,n.charAt(r))})},compressToUTF16:function(n){return n==null?"":w._compress(n,15,function(r){return y(r+32)})+" "},decompressFromUTF16:function(n){return n==null?"":n==""?null:w._decompress(n.length,16384,function(r){return n.charCodeAt(r)-32})},compressToUint8Array:function(n){for(var r=w.compress(n),s=new Uint8Array(r.length*2),i=0,t=r.length;i<t;i++){var u=r.charCodeAt(i);s[i*2]=u>>>8,s[i*2+1]=u%256}return s},decompressFromUint8Array:function(n){if(n==null)return w.decompress(n);for(var r=new Array(n.length/2),s=0,i=r.length;s<i;s++)r[s]=n[s*2]*256+n[s*2+1];var t=[];return r.forEach(function(u){t.push(y(u))}),w.decompress(t.join(""))},compressToEncodedURIComponent:function(n){return n==null?"":w._compress(n,6,function(r){return m.charAt(r)})},decompressFromEncodedURIComponent:function(n){return n==null?"":n==""?null:(n=n.replace(/ /g,"+"),w._decompress(n.length,32,function(r){return M(m,n.charAt(r))}))},compress:function(n){return w._compress(n,16,function(r){return y(r)})},_compress:function(n,r,s){if(n==null)return"";var i,t,u={},h={},f="",d="",c="",_=2,D=3,l=2,p=[],e=0,o=0,v;for(v=0;v<n.length;v+=1)if(f=n.charAt(v),Object.prototype.hasOwnProperty.call(u,f)||(u[f]=D++,h[f]=!0),d=c+f,Object.prototype.hasOwnProperty.call(u,d))c=d;else{if(Object.prototype.hasOwnProperty.call(h,c)){if(c.charCodeAt(0)<256){for(i=0;i<l;i++)e=e<<1,o==r-1?(o=0,p.push(s(e)),e=0):o++;for(t=c.charCodeAt(0),i=0;i<8;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1}else{for(t=1,i=0;i<l;i++)e=e<<1|t,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=0;for(t=c.charCodeAt(0),i=0;i<16;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1}_--,_==0&&(_=Math.pow(2,l),l++),delete h[c]}else for(t=u[c],i=0;i<l;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1;_--,_==0&&(_=Math.pow(2,l),l++),u[d]=D++,c=String(f)}if(c!==""){if(Object.prototype.hasOwnProperty.call(h,c)){if(c.charCodeAt(0)<256){for(i=0;i<l;i++)e=e<<1,o==r-1?(o=0,p.push(s(e)),e=0):o++;for(t=c.charCodeAt(0),i=0;i<8;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1}else{for(t=1,i=0;i<l;i++)e=e<<1|t,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=0;for(t=c.charCodeAt(0),i=0;i<16;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1}_--,_==0&&(_=Math.pow(2,l),l++),delete h[c]}else for(t=u[c],i=0;i<l;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1;_--,_==0&&(_=Math.pow(2,l),l++)}for(t=2,i=0;i<l;i++)e=e<<1|t&1,o==r-1?(o=0,p.push(s(e)),e=0):o++,t=t>>1;for(;;)if(e=e<<1,o==r-1){p.push(s(e));break}else o++;return p.join("")},decompress:function(n){return n==null?"":n==""?null:w._decompress(n.length,32768,function(r){return n.charCodeAt(r)})},_decompress:function(n,r,s){var i=[],t,u=4,h=4,f=3,d="",c=[],_,D,l,p,e,o,v,a={val:s(0),position:r,index:1};for(_=0;_<3;_+=1)i[_]=_;for(l=0,e=Math.pow(2,2),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;switch(t=l){case 0:for(l=0,e=Math.pow(2,8),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;v=y(l);break;case 1:for(l=0,e=Math.pow(2,16),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;v=y(l);break;case 2:return""}for(i[3]=v,D=v,c.push(v);;){if(a.index>n)return"";for(l=0,e=Math.pow(2,f),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;switch(v=l){case 0:for(l=0,e=Math.pow(2,8),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;i[h++]=y(l),v=h-1,u--;break;case 1:for(l=0,e=Math.pow(2,16),o=1;o!=e;)p=a.val&a.position,a.position>>=1,a.position==0&&(a.position=r,a.val=s(a.index++)),l|=(p>0?1:0)*o,o<<=1;i[h++]=y(l),v=h-1,u--;break;case 2:return c.join("")}if(u==0&&(u=Math.pow(2,f),f++),i[v])d=i[v];else if(v===h)d=D+D.charAt(0);else return null;c.push(d),i[h++]=D+d.charAt(0),u--,D=d,u==0&&(u=Math.pow(2,f),f++)}}};return w}();O=function(){return U}.call(x,A,x,g),O!==void 0&&(g.exports=O)}}]);
