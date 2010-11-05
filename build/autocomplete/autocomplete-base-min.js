YUI.add("autocomplete-base",function(F){var I=F.Lang,P=F.Array,H=F.Object,R=I.isArray,D=I.isFunction,Q=I.isObject,S=I.isString,V=I.trim,L=F.Attribute.INVALID_VALUE,N="_functionValidator",Z="_sourceSuccess",C="allowBrowserAutocomplete",G="inputNode",X="query",E="queryDelimiter",B="requestTemplate",K="results",M="resultListLocator",J="value",T="valueChange",A="clear",U=X,O=K;function W(){F.before(this._bindUIACBase,this,"bindUI");F.before(this._destructorACBase,this,"destructor");F.before(this._syncUIACBase,this,"syncUI");this.publish(A,{defaultFn:this._defClearFn,queueable:true});this.publish(U,{defaultFn:this._defQueryFn,queueable:true});this.publish(O,{defaultFn:this._defResultsFn,queueable:true});}W.ATTRS={allowBrowserAutocomplete:{value:false},inputNode:{setter:F.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:N},resultHighlighter:{setter:"_setResultHighlighter"},resultListLocator:{setter:"_setLocator"},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator"},source:{setter:"_setSource"},tokenInput:{readOnly:true},value:{value:""},yqlProtocol:{value:"http"}};W.CSS_PREFIX="ac";W.UI_SRC=(F.Widget&&F.Widget.UI_SRC)||"ui";W.prototype={sendRequest:function(b,c){var Y,a=this.get("source");if(a){if(b||b===""){this._set(X,b);}else{b=this.get(X);}if(!c){c=this.get(B);}Y=c?c(b):b;a.sendRequest({request:Y,callback:{success:F.bind(this._onResponse,this,b)}});}return this;},_bindUIACBase:function(){var a=this.get(G),Y=a&&a.tokenInput;if(Y){a=Y.get(G);this._set("tokenInput",Y);}if(!a){F.error("No inputNode specified.");return;}this._inputNode=a;this._acBaseEvents=[a.on(T,this._onInputValueChange,this),this.after(C+"Change",this._syncBrowserAutocomplete),this.after(T,this._afterValueChange)];},_destructorACBase:function(){var Y=this._acBaseEvents;while(Y&&Y.length){Y.pop().detach();}},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(J,this.get(G).get(J),{src:W.UI_SRC});},_createArraySource:function(a){var Y=this;return{sendRequest:function(b){Y[Z](a.concat(),b);}};},_createJSONPSource:function(d){var a={},b={},c=this,Y,e;b.sendRequest=function(g){var f=function(h){var i=h.request;if(a[i]){c[Z](a[i],h);}else{d._config.on.success=function(j){a[i]=j;c[Z](j,h);};d.send(i);}};Y=g;if(!e){e=true;F.use("jsonp",function(){if(!(d instanceof F.JSONPRequest)){d=new F.JSONPRequest(d,{format:F.bind(c._jsonpFormatter,c)});}b.sendRequest=f;f(Y);});}};return b;},_createObjectSource:function(Y){return{sendRequest:function(b){var c=b.request,a=this;a[Z](H.owns(Y,c)?Y[c]:[],b);}};},_createStringSource:function(Y){if(/^(?:select|use|set)\s+/i.test(Y)){return this._createYQLSource(Y);}else{return this._createJSONPSource(Y);}},_createYQLSource:function(c){var a={},d={},b=this,Y,e;if(!this.get(M)){this.set(M,this._defaultYQLLocator);}d.sendRequest=function(h){var g,f=function(k){var l=k.request,m,j,i;if(a[l]){b[Z](a[l],k);}else{m=function(n){a[l]=n;b[Z](n,k);};j={proto:b.get("yqlProtocol")};i=I.sub(c,{query:l});if(g){g._callback=m;g._opts=j;g._params.q=i;}else{g=new F.YQLRequest(i,m,null,j);}g.send();}};Y=h;if(!e){e=true;F.use("yql",function(){d.sendRequest=f;f(Y);});}};return d;},_defaultYQLLocator:function(a){var b=a&&a.query&&a.query.results,Y;if(b&&Q(b)){Y=H.values(b)||[];b=Y.length===1?Y[0]:Y;if(!R(b)){b=[b];}}else{b=[];}return b;},_functionValidator:function(Y){return Y===null||D(Y);},_getObjectValue:function(c,b){if(!c){return;}for(var a=0,Y=b.length;c&&a<Y;a++){c=c[b[a]];}return c;},_jsonpFormatter:function(Y,a,b){var c=this.get(B);if(c){Y=Y+c(b);}return I.sub(Y,{callback:a,query:c?b:encodeURIComponent(b)});},_parseResponse:function(b,Y,r){var g={data:r,query:b,results:[]},a,e,o,f=Y&&Y.results,h=[],c,k,q,l,m,j=this.get(M),n,p,d;if(f&&j){f=j(f);}if(f){c=this.get("resultFilters");k=this.get("resultFormatter");q=this.get("resultHighlighter");n=this.get("maxResults");p=this.get("resultTextLocator");if(p){e=P.map(f,p);d=P.hash(e,f);}else{e=f;}for(l=0,m=c.length;l<m;++l){e=c[l](b,e.concat());if(!e||!e.length){break;}}if(p){o=e;e=[];for(l=0,m=o.length;l<m;++l){e.push(d[o[l]]);}}else{o=e.concat();}a=q?q(b,o):o.concat();if(k){a=k(b,e.concat(),a.concat(),o.concat());}m=n>0?Math.min(n,a.length):a.length;for(l=0;l<m;++l){h[l]={display:a[l],raw:e[l],text:o[l]};}g.results=h;}this.fire(O,g);},_parseValue:function(Y){var a=this.get(E);if(a){Y=Y.split(a);Y=Y[Y.length-1];}return I.trimLeft(Y);},_setLocator:function(Y){if(this[N](Y)){return Y;}var a=this;Y=Y.toString().split(".");return function(b){return b&&a._getObjectValue(b,Y);};},_setRequestTemplate:function(Y){if(this[N](Y)){return Y;}Y=Y.toString();return function(a){return I.sub(Y,{query:encodeURIComponent(a)});};},_setResultFilters:function(b){var Y,a;if(b===null){return[];}Y=F.AutoCompleteFilters;a=function(c){if(D(c)){return c;}if(S(c)&&Y&&D(Y[c])){return Y[c];}return false;};if(R(b)){b=P.map(b,a);return P.every(b,function(c){return !!c;})?b:L;}else{b=a(b);return b?[b]:L;}},_setResultHighlighter:function(Y){var a;if(this._functionValidator(Y)){return Y;}a=F.AutoCompleteHighlighters;if(S(Y)&&a&&D(a[Y])){return a[Y];}return L;},_setSource:function(Y){if((Y&&D(Y.sendRequest))||Y===null){return Y;}else{if(S(Y)){return this._createStringSource(Y);}else{if(R(Y)){return this._createArraySource(Y);}else{if(Q(Y)){return this._createObjectSource(Y);}else{if(F.JSONPRequest&&Y instanceof F.JSONPRequest){return this._createJSONPSource(Y);}}}}}return L;},_sourceSuccess:function(a,Y){Y.callback.success({data:a,response:{results:a}});},_syncBrowserAutocomplete:function(){var Y=this.get(G);if(Y.get("nodeName").toLowerCase()==="input"){Y.setAttribute("autocomplete",this.get(C)?"on":"off");}},_updateValue:function(a){var c=this.get(E),b,Y,d;a=I.trimLeft(a);if(c){b=V(c);d=P.map(V(this.get(J)).split(c),V);Y=d.length;if(Y>1){d[Y-1]=a;
a=d.join(b+" ");}a=a+b+" ";}this.set(J,a);},_afterValueChange:function(f){var a,b,Y=f.newVal,d,c;if(f.src!==W.UI_SRC){this._inputNode.set(J,Y);return;}d=this._parseValue(Y)||"";if(d.length>=this.get("minQueryLength")){a=this.get("queryDelay");c=this;b=function(){c.fire(U,{inputValue:Y,query:d});};if(a){clearTimeout(this._delay);this._delay=setTimeout(b,a);}else{b();}}else{clearTimeout(this._delay);this.fire(A);}},_onInputValueChange:function(a){var Y=a.newVal;if(Y===this.get(J)){return;}this.set(J,Y,{src:W.UI_SRC});},_onResponse:function(Y,a){if(Y===this.get(X)){this._parseResponse(Y,a.response,a.data);}},_defClearFn:function(){this._set(X,null);this._set(K,[]);},_defQueryFn:function(a){var Y=a.query;this.sendRequest(Y);},_defResultsFn:function(Y){this._set(K,Y[K]);}};F.AutoCompleteBase=W;},"@VERSION@",{optional:["jsonp","yql"],requires:["array-extras","base-build","event-valuechange","node-base"]});