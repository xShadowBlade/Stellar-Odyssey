(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[835,553],{553:function(o,t,e){"use strict";e.r(t);const n={version:{saveAPI:1,phase:"alpha"},classes:{},data:{},functions:{start:{},startF:()=>Object.values(n.functions.start).forEach((o=>o())),loop:{},loopF:o=>Object.values(n.functions.loop).forEach((t=>t(o)))},static:{},settings:{framerate:30,c2:!1},features:{}};console.log(n),t.default=n},835:function(o,t,e){"use strict";e.r(t);var n=e(553),r=e(961),a=e.n(r),s=e(4);const{E:c}=s.default;n.default.dataManagement=function(){const o=n.default.data,t=(o=n.default.data)=>a().compressToBase64(JSON.stringify(o)),e=(o=localStorage.getItem("data"))=>JSON.parse(a().decompressFromBase64(o));return{resetData:function(t=!1){n.default.data=o,n.default.dataManagement.saveData(),t&&window.location.reload()},compileData:t,decompileData:e,saveData:function(){n.default.data&&(n.default.data.playtime.timeLastPlayed=Date.now(),localStorage.setItem("data",t()),console.log("Game Saved"))},exportData:function(){const o=t();if(console.log(o),null!=prompt("Download save data?:",o)){const t=new Blob([o],{type:"text/plain"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="stellar-odyssey-data.txt",e.textContent="Download .txt file",document.body.appendChild(e),e.click(),document.body.removeChild(e)}},loadData:function(){if(!n.default.data)return;let t=e();console.log(t),console.log(t=function o(t){for(const e in t)if("string"==typeof t[e])try{const o=c(t[e]);t[e]=o}catch(o){console.error(`Error processing value: ${t[e]}`)}else"object"==typeof t[e]&&null!==t[e]&&o(t[e]);return t}(t)),console.log(function o(t,e){for(const n in t)t.hasOwnProperty(n)&&(e.hasOwnProperty(n)?"object"==typeof t[n]&&"object"==typeof e[n]&&o(t[n],e[n]):e[n]=t[n])}(o,t))}}}()},961:function(o,t,e){var n,r=function(){var o=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",n={};function r(o,t){if(!n[o]){n[o]={};for(var e=0;e<o.length;e++)n[o][o.charAt(e)]=e}return n[o][t]}var a={compressToBase64:function(o){if(null==o)return"";var e=a._compress(o,6,(function(o){return t.charAt(o)}));switch(e.length%4){default:case 0:return e;case 1:return e+"===";case 2:return e+"==";case 3:return e+"="}},decompressFromBase64:function(o){return null==o?"":""==o?null:a._decompress(o.length,32,(function(e){return r(t,o.charAt(e))}))},compressToUTF16:function(t){return null==t?"":a._compress(t,15,(function(t){return o(t+32)}))+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:a._decompress(o.length,16384,(function(t){return o.charCodeAt(t)-32}))},compressToUint8Array:function(o){for(var t=a.compress(o),e=new Uint8Array(2*t.length),n=0,r=t.length;n<r;n++){var s=t.charCodeAt(n);e[2*n]=s>>>8,e[2*n+1]=s%256}return e},decompressFromUint8Array:function(t){if(null==t)return a.decompress(t);for(var e=new Array(t.length/2),n=0,r=e.length;n<r;n++)e[n]=256*t[2*n]+t[2*n+1];var s=[];return e.forEach((function(t){s.push(o(t))})),a.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":a._compress(o,6,(function(o){return e.charAt(o)}))},decompressFromEncodedURIComponent:function(o){return null==o?"":""==o?null:(o=o.replace(/ /g,"+"),a._decompress(o.length,32,(function(t){return r(e,o.charAt(t))})))},compress:function(t){return a._compress(t,16,(function(t){return o(t)}))},_compress:function(o,t,e){if(null==o)return"";var n,r,a,s={},c={},i="",l="",u="",p=2,f=3,d=2,h=[],m=0,v=0;for(a=0;a<o.length;a+=1)if(i=o.charAt(a),Object.prototype.hasOwnProperty.call(s,i)||(s[i]=f++,c[i]=!0),l=u+i,Object.prototype.hasOwnProperty.call(s,l))u=l;else{if(Object.prototype.hasOwnProperty.call(c,u)){if(u.charCodeAt(0)<256){for(n=0;n<d;n++)m<<=1,v==t-1?(v=0,h.push(e(m)),m=0):v++;for(r=u.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1}else{for(r=1,n=0;n<d;n++)m=m<<1|r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r=0;for(r=u.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1}0==--p&&(p=Math.pow(2,d),d++),delete c[u]}else for(r=s[u],n=0;n<d;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1;0==--p&&(p=Math.pow(2,d),d++),s[l]=f++,u=String(i)}if(""!==u){if(Object.prototype.hasOwnProperty.call(c,u)){if(u.charCodeAt(0)<256){for(n=0;n<d;n++)m<<=1,v==t-1?(v=0,h.push(e(m)),m=0):v++;for(r=u.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1}else{for(r=1,n=0;n<d;n++)m=m<<1|r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r=0;for(r=u.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1}0==--p&&(p=Math.pow(2,d),d++),delete c[u]}else for(r=s[u],n=0;n<d;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1;0==--p&&(p=Math.pow(2,d),d++)}for(r=2,n=0;n<d;n++)m=m<<1|1&r,v==t-1?(v=0,h.push(e(m)),m=0):v++,r>>=1;for(;;){if(m<<=1,v==t-1){h.push(e(m));break}v++}return h.join("")},decompress:function(o){return null==o?"":""==o?null:a._decompress(o.length,32768,(function(t){return o.charCodeAt(t)}))},_decompress:function(t,e,n){var r,a,s,c,i,l,u,p=[],f=4,d=4,h=3,m="",v=[],w={val:n(0),position:e,index:1};for(r=0;r<3;r+=1)p[r]=r;for(s=0,i=Math.pow(2,2),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;switch(s){case 0:for(s=0,i=Math.pow(2,8),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;u=o(s);break;case 1:for(s=0,i=Math.pow(2,16),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;u=o(s);break;case 2:return""}for(p[3]=u,a=u,v.push(u);;){if(w.index>t)return"";for(s=0,i=Math.pow(2,h),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;switch(u=s){case 0:for(s=0,i=Math.pow(2,8),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;p[d++]=o(s),u=d-1,f--;break;case 1:for(s=0,i=Math.pow(2,16),l=1;l!=i;)c=w.val&w.position,w.position>>=1,0==w.position&&(w.position=e,w.val=n(w.index++)),s|=(c>0?1:0)*l,l<<=1;p[d++]=o(s),u=d-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,h),h++),p[u])m=p[u];else{if(u!==d)return null;m=a+a.charAt(0)}v.push(m),p[d++]=a+m.charAt(0),a=m,0==--f&&(f=Math.pow(2,h),h++)}}};return a}();void 0===(n=function(){return r}.call(t,e,t,o))||(o.exports=n)}}]);