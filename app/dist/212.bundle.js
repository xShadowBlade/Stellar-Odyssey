"use strict";(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[212,553],{553:function(e,s,t){t.r(s);const n={version:{saveAPI:1,phase:"alpha"},classes:{},data:{},functions:{start:{},startF:()=>Object.values(n.functions.start).forEach((e=>e())),loop:{},loopF:e=>Object.values(n.functions.loop).forEach((s=>s(e)))},static:{},settings:{framerate:30,c2:!1},features:{}};console.log(n),s.default=n},212:function(e,s,t){t.r(s);var n=t(553);n.default.keys={keysPressed:[],binds:[],isPressing:function(e){for(let s=0;s<n.default.keys.binds.length;s++){const t=n.default.keys.binds[s];if(t.name===e)return n.default.keys.keysPressed.includes(t.key)}},addKey:function(e,s,t){for(let t=0;t<n.default.keys.binds.length;t++){const d=n.default.keys.binds[t];if(d.name===e)return void(d.key=s)}n.default.keys.binds.push({name:e,key:s,fn:t}),"function"==typeof t&&n.default.PIXI.app.ticker.add((s=>{n.default.keys.isPressing(e)&&t(s)}))},addKeys:function(e){for(const s of e)this.addKey(s.name,s.key,s.fn)}};const d=function(e,s){e=e.key,s&&!n.default.keys.keysPressed.includes(e)?n.default.keys.keysPressed.push(e):!s&&n.default.keys.keysPressed.includes(e)&&n.default.keys.keysPressed.splice(n.default.keys.keysPressed.indexOf(e),1)};document.addEventListener("keydown",(e=>d(e,!0))),document.addEventListener("keyup",(e=>d(e,!1))),n.default.keys.addKey("Debug - Reload","`",(()=>window.location.reload()))}}]);