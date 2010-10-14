YUI.add("autocomplete-base",function(F){var I=F.Lang,P=F.Array,H=F.Object,R=I.isArray,D=I.isFunction,Q=I.isObject,U=I.trim,K=F.Attribute.INVALID_VALUE,N="_functionValidator",X="_sourceSuccess",C="allowBrowserAutocomplete",G="inputNode",W="query",E="queryDelimiter",B="requestTemplate",L="results",M="resultListLocator",J="value",S="valueChange",A="clear",T=W,O=L;function V(){F.before(this._bindUIACBase,this,"bindUI");F.before(this._destructorACBase,this,"destructor");F.before(this._syncUIACBase,this,"syncUI");this.publish(A,{defaultFn:this._defClearFn,queueable:true});this.publish(T,{defaultFn:this._defQueryFn,queueable:true});this.publish(O,{defaultFn:this._defResultsFn,queueable:true});}V.ATTRS={allowBrowserAutocomplete:{value:false},inputNode:{setter:F.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:N},resultHighlighter:{validator:N},resultListLocator:{setter:"_setLocator"},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator"},source:{setter:"_setSource"},value:{value:""}};V.CSS_PREFIX="ac";V.UI_SRC=(F.Widget&&F.Widget.UI_SRC)||"ui";V.prototype={sendRequest:function(a,b){var Y,Z=this.get("source");if(Z){if(a||a===""){this._set(W,a);}else{a=this.get(W);}if(!b){b=this.get(B);}Y=b?b(a):a;Z.sendRequest({request:Y,callback:{success:F.bind(this._onResponse,this,a)}});}return this;},_bindUIACBase:function(){var Y=this.get(G);if(!Y){F.error("No inputNode specified.");}this._acBaseEvents=[Y.on(S,this._onInputValueChange,this),this.after(C+"Change",this._syncBrowserAutocomplete),this.after(S,this._afterValueChange)];},_destructorACBase:function(){var Y=this._acBaseEvents;while(Y&&Y.length){Y.pop().detach();}},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(J,this.get(G).get(J));},_createArraySource:function(Z){var Y=this;return{sendRequest:function(a){Y[X](Z.concat(),a);}};},_createJSONPSource:function(a){var Y={},Z=this;return{sendRequest:function(b){var c=b.request;if(Y[c]){Z[X](Y[c],b);}else{a._config.on.success=function(d){Y[c]=d;Z[X](d,b);};a.send(c);}}};},_createObjectSource:function(Y){return{sendRequest:function(a){var b=a.request,Z=this;Z[X](H.owns(Y,b)?Y[b]:[],a);}};},_createStringSource:function(Y){if(/^select\s+/i.test(Y)){if(F.YQLRequest){return this._createYQLSource(Y);}else{F.error("yql module is not loaded");return K;}}else{if(F.JSONPRequest){return this._createJSONPSource(new F.JSONPRequest(Y,{format:F.bind(this._jsonpFormatter,this)}));}else{F.error("jsonp module is not loaded");return K;}}},_createYQLSource:function(a){var Y={},Z=this;if(!this.get(M)){this.set(M,this._defaultYQLLocator);}return{sendRequest:function(b){var c=b.request;if(!Z.get(B)){c=encodeURIComponent(c);}if(Y[c]){Z[X](Y[c],b);}else{F.YQL(I.sub(a,{query:c}),function(d){Y[c]=d;Z[X](d,b);});}}};},_defaultYQLLocator:function(Z){var a=Z&&Z.query&&Z.query.results,Y;if(a&&Q(a)){Y=H.values(a)||[];a=Y.length===1?Y[0]:Y;}else{a=[];}return a;},_functionValidator:function(Y){return Y===null||D(Y);},_getObjectValue:function(b,a){if(!b){return;}for(var Z=0,Y=a.length;b&&Z<Y;Z++){b=b[a[Z]];}return b;},_jsonpFormatter:function(Y,Z,a){var b=this.get(B);if(b){Y=Y+b(a);}return I.sub(Y,{callback:Z,query:b?a:encodeURIComponent(a)});},_parseResponse:function(a,Y,q){var f={data:q,query:a,results:[]},Z,d,n,e=Y&&Y.results,g=[],b,j,p,k,l,h=this.get(M),m,o,c;if(e&&h){e=h(e);}if(e){b=this.get("resultFilters");j=this.get("resultFormatter");p=this.get("resultHighlighter");m=this.get("maxResults");o=this.get("resultTextLocator");if(o){d=P.map(e,o);c=P.hash(d,e);}else{d=e;}for(k=0,l=b.length;k<l;++k){d=b[k](a,d);if(!d||!d.length){break;}}if(o){n=d;d=[];for(k=0,l=n.length;k<l;++k){d.push(c[n[k]]);}}else{n=[].concat(d);}Z=p?p(a,n):[].concat(n);if(j){Z=j(a,d,Z,n);}l=m>0?Math.min(m,Z.length):Z.length;for(k=0;k<l;++k){g[k]={display:Z[k],raw:d[k],text:n[k]};}f.results=g;}this.fire(O,f);},_parseValue:function(Y){var Z=this.get(E);if(Z){Y=Y.split(Z);Y=Y[Y.length-1];}return I.trimLeft(Y);},_setLocator:function(Y){if(this[N](Y)){return Y;}var Z=this;Y=Y.toString().split(".");return function(a){return a&&Z._getObjectValue(a,Y);};},_setRequestTemplate:function(Y){if(this[N](Y)){return Y;}Y=Y.toString();return function(Z){return I.sub(Y,{query:encodeURIComponent(Z)});};},_setResultFilters:function(Y){if(Y===null){return[];}return R(Y)?Y:[Y];},_setSource:function(Y){if((Y&&D(Y.sendRequest))||Y===null){return Y;}else{if(typeof Y==="string"){return this._createStringSource(Y);}else{if(R(Y)){return this._createArraySource(Y);}else{if(Q(Y)){return this._createObjectSource(Y);}else{if(F.JSONPRequest&&Y instanceof F.JSONPRequest){return this._createJSONPSource(Y);}}}}}return K;},_sourceSuccess:function(Z,Y){Y.callback.success({data:Z,response:{results:Z}});},_syncBrowserAutocomplete:function(){var Y=this.get(G);if(Y.get("nodeName").toLowerCase()==="input"){Y.setAttribute("autocomplete",this.get(C)?"on":"off");}},_updateValue:function(Z){var b=this.get(E),a,Y,c;Z=I.trimLeft(Z);if(b){a=U(b);c=P.map(U(this.get(J)).split(b),U);Y=c.length;if(Y>1){c[Y-1]=Z;Z=c.join(a+" ");}Z=Z+a+" ";}this.set(J,Z);},_afterValueChange:function(d){var Z,a,Y=d.newVal,c,b;if(d.src!==V.UI_SRC){this._inputNode.set(J,Y);return;}c=this._parseValue(Y)||"";if(c.length>=this.get("minQueryLength")){Z=this.get("queryDelay");b=this;a=function(){b.fire(T,{inputValue:Y,query:c});};if(Z){clearTimeout(this._delay);this._delay=setTimeout(a,Z);}else{a();}}else{clearTimeout(this._delay);this.fire(A);}},_onInputValueChange:function(Z){var Y=Z.newVal;if(Y===this.get(J)){return;}this.set(J,Y,{src:V.UI_SRC});},_onResponse:function(Y,Z){if(Y===this.get(W)){this._parseResponse(Y,Z.response,Z.data);}},_defClearFn:function(){this._set(W,null);this._set(L,[]);},_defQueryFn:function(Z){var Y=Z.query;this.sendRequest(Y);},_defResultsFn:function(Y){this._set(L,Y[L]);
}};F.AutoCompleteBase=V;},"@VERSION@",{requires:["array-extras","base-build","event-valuechange","node-base"],optional:["jsonp","yql"]});