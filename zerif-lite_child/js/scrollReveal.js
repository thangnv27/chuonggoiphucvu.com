;(function(window){'use strict';var docElem=window.document.documentElement;function getViewportH(){var client=docElem['clientHeight'],inner=window['innerHeight'];return(client<inner)?inner:client;}
function getOffset(el){var offsetTop=0,offsetLeft=0;do{if(!isNaN(el.offsetTop)){offsetTop+=el.offsetTop;}
if(!isNaN(el.offsetLeft)){offsetLeft+=el.offsetLeft;}}while(el=el.offsetParent)
return{top:offsetTop,left:offsetLeft}}
function isElementInViewport(el,h){var scrolled=window.pageYOffset,viewed=scrolled+getViewportH(),elH=el.offsetHeight,elTop=getOffset(el).top,elBottom=elTop+elH,h=h||0;return(elTop+elH*h)<=viewed&&(elBottom)>=scrolled;}
function extend(a,b){for(var key in b){if(b.hasOwnProperty(key)){a[key]=b[key];}}
return a;}
function scrollReveal(options){this.options=extend(this.defaults,options);this._init();}
scrollReveal.prototype={defaults:{axis:'y',distance:'60px',duration:'0.55s',delay:'0.15s',viewportFactor:0.33},_init:function(){var self=this;this.elems=Array.prototype.slice.call(docElem.querySelectorAll('[data-scrollReveal]'));this.scrolled=false;this.elems.forEach(function(el,i){self.animate(el);});var scrollHandler=function(){if(!self.scrolled){self.scrolled=true;setTimeout(function(){self._scrollPage();},60);}};var resizeHandler=function(){function delayed(){self._scrollPage();self.resizeTimeout=null;}
if(self.resizeTimeout){clearTimeout(self.resizeTimeout);}
self.resizeTimeout=setTimeout(delayed,200);};window.addEventListener('scroll',scrollHandler,false);window.addEventListener('resize',resizeHandler,false);},_scrollPage:function(){var self=this;this.elems.forEach(function(el,i){if(isElementInViewport(el,self.options.viewportFactor)){self.animate(el);}});this.scrolled=false;},parseLanguage:function(el){var words=el.getAttribute('data-scrollreveal').split(/[, ]+/),enterFrom,parsed={};function filter(words){var ret=[],blacklist=["from","the","and","then","but"];words.forEach(function(word,i){if(blacklist.indexOf(word)>-1){return;}
ret.push(word);});return ret;}
words=filter(words);words.forEach(function(word,i){switch(word){case"enter":enterFrom=words[i+1];if(enterFrom=="top"||enterFrom=="bottom"){parsed.axis="y";}
if(enterFrom=="left"||enterFrom=="right"){parsed.axis="x";}
return;case"after":parsed.delay=words[i+1];return;case"wait":parsed.delay=words[i+1];return;case"move":parsed.distance=words[i+1];return;case"over":parsed.duration=words[i+1];return;case"trigger":parsed.eventName=words[i+1];return;default:return;}});if(enterFrom=="top"||enterFrom=="left"){if(!typeof parsed.distance=="undefined"){parsed.distance="-"+parsed.distance;}
else{parsed.distance="-"+this.options.distance;}}
return parsed;},genCSS:function(el){var parsed=this.parseLanguage(el);var dist=parsed.distance||this.options.distance,dur=parsed.duration||this.options.duration,delay=parsed.delay||this.options.delay,axis=parsed.axis||this.options.axis;var transition="-webkit-transition: all "+dur+" ease "+delay+";"+"-moz-transition: all "+dur+" ease "+delay+";"+"-o-transition: all "+dur+" ease "+delay+";"+"-ms-transition: all "+dur+" ease "+delay+";"+"transition: all "+dur+" ease "+delay+";";var initial="-webkit-transform: translate"+axis+"("+dist+");"+"-moz-transform: translate"+axis+"("+dist+");"+"-ms-transform: translate"+axis+"("+dist+");"+"transform: translate"+axis+"("+dist+");"+"opacity: 0;";var target="-webkit-transform: translate"+axis+"(0);"+"-moz-transform: translate"+axis+"(0);"+"-ms-transform: translate"+axis+"(0);"+"transform: translate"+axis+"(0);"+"opacity: 1;";return{transition:transition,initial:initial,target:target,totalDuration:((parseFloat(dur)+parseFloat(delay))*1000)};},animate:function(el){var css=this.genCSS(el);if(!el.getAttribute('data-sr-init')){el.setAttribute('style',css.initial);el.setAttribute('data-sr-init',true);}
if(el.getAttribute('data-sr-complete')){return;}
if(isElementInViewport(el,this.options.viewportFactor)){el.setAttribute('style',css.target+css.transition);setTimeout(function(){el.removeAttribute('style');el.setAttribute('data-sr-complete',true);},css.totalDuration);}}};document.addEventListener("DOMContentLoaded",function(evt){window.scrollReveal=new scrollReveal();});})(window);