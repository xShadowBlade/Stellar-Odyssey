"use strict";(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[788,553],{788:function(a,t,e){e.r(t);var s=e(4),n=e(553);const{E:c}=s.default;n.default.data.chronos={currency:new n.default.classes.currency,lastReward:c(0)},n.default.functions.claimDailyReward=function(){const{chronos:a}=n.default.data;return function(t=!1){if(t||a.lastReward.sub(Date.now()).mul(-1).gte(c(432e5)))return a.lastReward=c(Date.now()),a.currency.gain()}}()},553:function(a,t,e){e.r(t);const s={version:{saveAPI:1,phase:"alpha"},classes:{},data:{},functions:{start:{},startF:()=>Object.values(s.functions.start).forEach((a=>a())),loop:{},loopF:a=>Object.values(s.functions.loop).forEach((t=>t(a)))},static:{},settings:{framerate:30,c2:!1},features:{}};console.log(s),t.default=s}}]);