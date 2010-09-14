YUI.add("autocomplete-base",function(G){var I=G.Lang,N=G.Array,D=I.isFunction,R=I.isNumber,C="allowBrowserAutocomplete",O="dataSource",H="inputNode",X="minQueryLength",W="query",S="queryDelay",B="requestTemplate",J="resultFilters",U="resultFilterLocator",E="resultHighlighter",F="resultFormatter",K="results",M="resultsRaw",Q="valueChange",A="clear",T=W,L=K,P=Q;function V(){this.publish(A,{defaultFn:this._defClearFn,queueable:true});this.publish(T,{defaultFn:this._defQueryFn,queueable:true});this.publish(L,{defaultFn:this._defResultsFn,queueable:true});this.publish(P,{preventable:false,queueable:true});}V.ATTRS={allowBrowserAutocomplete:{value:false,writeOnce:"initOnly"},dataSource:{validator:function(Y){return(Y&&D(Y.sendRequest))||Y===null;}},inputNode:{setter:G.one,writeOnce:"initOnly"},minQueryLength:{validator:R,value:1},query:{readOnly:true,value:null},queryDelay:{validator:function(Y){return R(Y)&&Y>=0;},value:150},requestTemplate:{setter:function(Y){if(D(Y)){return Y;}Y=Y.toString();return function(Z){return Y.replace(/(^|[^\\])((\\{2})*)\{query\}/,"$1$2"+encodeURIComponent(Z)).replace(/(^|[^\\])((\\{2})*)\\(\{query\})/,"$1$2$4");};},value:encodeURIComponent},resultFilterLocator:{setter:function(Y){if(Y===null||D(Y)){return Y;}Y=Y.toString().split(".");return function(Z){return G.Object.getValue(Z,Y);};}},resultFilters:{validator:I.isArray,value:[]},resultFormatter:{validator:"_functionValidator"},resultHighlighter:{validator:"_functionValidator"},results:{readOnly:true,value:[]},resultsRaw:{readOnly:true,value:[]}};V.CSS_PREFIX="ac";V.prototype={_bindInput:function(){var Y=this.get(H);if(!Y){G.error("No inputNode specified.");}this._unbindInput();this._inputEvents=[Y.on(Q,this._onValueChange,this)];},_functionValidator:function(Y){return D(Y)||Y===null;},_parseValue:function(Y){return Y;},_syncInput:function(){var Y=this.get(H);if(Y.get("nodeName").toLowerCase()==="input"){Y.setAttribute("autocomplete",this.get(C)?"on":"off");}},_unbindInput:function(){while(this._inputEvents&&this._inputEvents.length){this._inputEvents.pop().detach();}},_onResponse:function(h){var m,Y,l,k,c,g,d,f,j=h&&h.callback&&h.callback.query,b,Z,a;if(!j||j!==this.get(W)){return;}m={data:h.data,query:j,results:[],resultsRaw:[]};a=h.response&&h.response.results;if(a){Y=this.get(J);l=this.get(F);k=this.get(E);d=this.get(U);if(d){Z=N.map(a,d);f=N.hash(Z,a);}else{Z=a;}for(c=0,g=Y.length;c<g;++c){Z=Y[c](j,Z);if(!Z||!Z.length){break;}}if(d){b=[];for(c=0,g=Z.length;c<g;++c){b.push(f[Z[c]]);}Z=b;}b=Z;if(l){b=l(j,b);}if(k){b=k(j,b);}m.results=b;m.resultsRaw=Z;}this.fire(L,m);},_onValueChange:function(d){var Y,Z,c=d.newVal,b=this._parseValue(c),a;this.fire(P,{newVal:c,prevVal:d.prevVal});if(b.length>=this.get(X)){Y=this.get(S);a=this;Z=function(){a.fire(T,{inputValue:c,query:b});};if(Y){clearTimeout(this._delay);this._delay=setTimeout(Z,Y);}else{Z();}}else{clearTimeout(this._delay);this.fire(T,{inputValue:c,query:null});}if(!c.length){this.fire(A,{prevVal:d.prevVal});}},_defClearFn:function(){this._set(K,[]);},_defQueryFn:function(Z){var a=this.get(O),Y=Z.query;this._set(W,Y);if(Y&&a){a.sendRequest({request:this.get(B)(Y),callback:{query:Y,success:G.bind(this._onResponse,this)}});}},_defResultsFn:function(Y){this._set(K,Y[K]);this._set(M,Y[M]);}};G.AutoCompleteBase=V;G.AutoComplete=G.Base.create("autocomplete",G.Base,[G.AutoCompleteBase],{initializer:function(){this._bindInput();this._syncInput();},destructor:function(){this._unbindInput();}});},"@VERSION@",{requires:["array-extras","base-build","event-valuechange","node-base"]});YUI.add("autocomplete-plugin",function(B){function A(C){C=B.mix({},C,true);C.inputNode=C.host;A.superclass.constructor.apply(this,arguments);}B.namespace("Plugin").AutoComplete=B.extend(A,B.AutoComplete,{},{NAME:"autocompletePlugin",NS:"ac"});},"@VERSION@",{requires:["autocomplete-base","node-pluginhost"]});YUI.add("autocomplete",function(A){},"@VERSION@",{use:["autocomplete-base","autocomplete-plugin"]});