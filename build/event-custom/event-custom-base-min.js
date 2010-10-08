YUI.add("event-custom-base",function(b){b.Env.evt={handles:{},plugins:{}};var g=0,i=1;b.Do={objs:{},before:function(r,t,u,v){var s=r,q;if(v){q=[r,v].concat(b.Array(arguments,4,true));s=b.rbind.apply(b,q);}return this._inject(g,s,t,u);},after:function(r,t,u,v){var s=r,q;if(v){q=[r,v].concat(b.Array(arguments,4,true));s=b.rbind.apply(b,q);}return this._inject(i,s,t,u);},_inject:function(q,s,t,v){var w=b.stamp(t),u,r;if(!this.objs[w]){this.objs[w]={};}u=this.objs[w];if(!u[v]){u[v]=new b.Do.Method(t,v);t[v]=function(){return u[v].exec.apply(u[v],arguments);};}r=w+b.stamp(s)+v;u[v].register(r,s,q);return new b.EventHandle(u[v],r);},detach:function(q){if(q.detach){q.detach();}},_unload:function(r,q){}};b.Do.Method=function(q,r){this.obj=q;this.methodName=r;this.method=q[r];this.before={};this.after={};};b.Do.Method.prototype.register=function(r,s,q){if(q){this.after[r]=s;}else{this.before[r]=s;}};b.Do.Method.prototype._delete=function(q){delete this.before[q];delete this.after[q];};b.Do.Method.prototype.exec=function(){var s=b.Array(arguments,0,true),t,r,w,u=this.before,q=this.after,v=false;for(t in u){if(u.hasOwnProperty(t)){r=u[t].apply(this.obj,s);if(r){switch(r.constructor){case b.Do.Halt:return r.retVal;case b.Do.AlterArgs:s=r.newArgs;break;case b.Do.Prevent:v=true;break;default:}}}}if(!v){r=this.method.apply(this.obj,s);}for(t in q){if(q.hasOwnProperty(t)){w=q[t].apply(this.obj,s);if(w&&w.constructor==b.Do.Halt){return w.retVal;}else{if(w&&w.constructor==b.Do.AlterReturn){r=w.newRetVal;}}}}return r;};b.Do.AlterArgs=function(r,q){this.msg=r;this.newArgs=q;};b.Do.AlterReturn=function(r,q){this.msg=r;this.newRetVal=q;};b.Do.Halt=function(r,q){this.msg=r;this.retVal=q;};b.Do.Prevent=function(q){this.msg=q;};b.Do.Error=b.Do.Halt;var m="after",p=["broadcast","monitored","bubbles","context","contextFn","currentTarget","defaultFn","defaultTargetOnly","details","emitFacade","fireOnce","async","host","preventable","preventedFn","queuable","silent","stoppedFn","target","type"],n=9,a="yui:log";b.EventHandle=function(q,r){this.evt=q;this.sub=r;};b.EventHandle.prototype={batch:function(q,r){q.call(r||this,this);if(b.Lang.isArray(this.evt)){b.Array.each(this.evt,function(s){s.batch.call(r||s,q);});}},detach:function(){var q=this.evt,s=0,r;if(q){if(b.Lang.isArray(q)){for(r=0;r<q.length;r++){s+=q[r].detach();}}else{q._delete(this.sub);s=1;}}return s;},monitor:function(q){return this.evt.monitor.apply(this.evt,arguments);}};b.CustomEvent=function(q,r){r=r||{};this.id=b.stamp(this);this.type=q;this.context=b;this.logSystem=(q==a);this.silent=this.logSystem;this.subscribers={};this.afters={};this.preventable=true;this.bubbles=true;this.signature=n;this.subCount=0;this.afterCount=0;this.applyConfig(r,true);};b.CustomEvent.prototype={hasSubs:function(q){var u=this.subCount,r=this.afterCount,t=this.sibling;if(t){u+=t.subCount;r+=t.afterCount;}if(q){return(q=="after")?r:u;}return(u+r);},monitor:function(s){this.monitored=true;var r=this.id+"|"+this.type+"_"+s,q=b.Array(arguments,0,true);q[0]=r;return this.host.on.apply(this.host,q);},getSubs:function(){var t=b.merge(this.subscribers),q=b.merge(this.afters),r=this.sibling;if(r){b.mix(t,r.subscribers);b.mix(q,r.afters);}return[t,q];},applyConfig:function(r,q){if(r){b.mix(this,r,q,p);}},_on:function(v,t,r,q){if(!v){this.log("Invalid callback for CE: "+this.type);}var u=new b.Subscriber(v,t,r,q);if(this.fireOnce&&this.fired){if(this.async){setTimeout(b.bind(this._notify,this,u,this.firedWith),0);}else{this._notify(u,this.firedWith);}}if(q==m){this.afters[u.id]=u;this.afterCount++;}else{this.subscribers[u.id]=u;this.subCount++;}return new b.EventHandle(this,u);},subscribe:function(s,r){var q=(arguments.length>2)?b.Array(arguments,2,true):null;return this._on(s,r,q,true);},on:function(s,r){var q=(arguments.length>2)?b.Array(arguments,2,true):null;if(this.host){this.host._monitor("attach",this.type,{args:arguments});}return this._on(s,r,q,true);},after:function(s,r){var q=(arguments.length>2)?b.Array(arguments,2,true):null;return this._on(s,r,q,m);},detach:function(v,t){if(v&&v.detach){return v.detach();}var r,u,w=0,q=b.merge(this.subscribers,this.afters);for(r in q){if(q.hasOwnProperty(r)){u=q[r];if(u&&(!v||v===u.fn)){this._delete(u);w++;}}}return w;},unsubscribe:function(){return this.detach.apply(this,arguments);},_notify:function(u,t,q){this.log(this.type+"->"+"sub: "+u.id);var r;r=u.notify(t,this);if(false===r||this.stopped>1){this.log(this.type+" cancelled by subscriber");return false;}return true;},log:function(r,q){if(!this.silent){}},fire:function(){if(this.fireOnce&&this.fired){this.log("fireOnce event: "+this.type+" already fired");return true;}else{var q=b.Array(arguments,0,true);this.fired=true;this.firedWith=q;if(this.emitFacade){return this.fireComplex(q);}else{return this.fireSimple(q);}}},fireSimple:function(q){this.stopped=0;this.prevented=0;if(this.hasSubs()){var r=this.getSubs();this._procSubs(r[0],q);this._procSubs(r[1],q);}this._broadcast(q);return this.stopped?false:true;},fireComplex:function(q){q[0]=q[0]||{};return this.fireSimple(q);},_procSubs:function(u,r,q){var v,t;for(t in u){if(u.hasOwnProperty(t)){v=u[t];if(v&&v.fn){if(false===this._notify(v,r,q)){this.stopped=2;}if(this.stopped==2){return false;}}}}return true;},_broadcast:function(r){if(!this.stopped&&this.broadcast){var q=b.Array(r);q.unshift(this.type);if(this.host!==b){b.fire.apply(b,q);}if(this.broadcast==2){b.Global.fire.apply(b.Global,q);}}},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},detachAll:function(){return this.detach();},_delete:function(q){if(q){if(this.subscribers[q.id]){delete this.subscribers[q.id];this.subCount--;}if(this.afters[q.id]){delete this.afters[q.id];this.afterCount--;}}if(this.host){this.host._monitor("detach",this.type,{ce:this,sub:q});}if(q){delete q.fn;delete q.context;}}};b.Subscriber=function(s,r,q){this.fn=s;this.context=r;this.id=b.stamp(this);this.args=q;};b.Subscriber.prototype={_notify:function(u,s,t){var q=this.args,r;
switch(t.signature){case 0:r=this.fn.call(u,t.type,s,u);break;case 1:r=this.fn.call(u,s[0]||null,u);break;default:if(q||s){s=s||[];q=(q)?s.concat(q):s;r=this.fn.apply(u,q);}else{r=this.fn.call(u);}}if(this.once){t._delete(this);}return r;},notify:function(r,t){var u=this.context,q=true;if(!u){u=(t.contextFn)?t.contextFn():t.context;}if(b.config.throwFail){q=this._notify(u,r,t);}else{try{q=this._notify(u,r,t);}catch(s){b.error(this+" failed: "+s.message,s);}}return q;},contains:function(r,q){if(q){return((this.fn==r)&&this.context==q);}else{return(this.fn==r);}}};var j=b.Lang,h=":",e="|",l="~AFTER~",k=b.Array,c=b.cached(function(q){return q.replace(/(.*)(:)(.*)/,"*$2$3");}),o=b.cached(function(q,r){if(!r||!j.isString(q)||q.indexOf(h)>-1){return q;}return r+h+q;}),f=b.cached(function(s,v){var r=s,u,w,q;if(!j.isString(r)){return r;}q=r.indexOf(l);if(q>-1){w=true;r=r.substr(l.length);}q=r.indexOf(e);if(q>-1){u=r.substr(0,(q));r=r.substr(q+1);if(r=="*"){r=null;}}return[u,(v)?o(r,v):r,w,r];}),d=function(q){var r=(j.isObject(q))?q:{};this._yuievt=this._yuievt||{id:b.guid(),events:{},targets:{},config:r,chain:("chain" in r)?r.chain:b.config.chain,bubbling:false,defaults:{context:r.context||this,host:this,emitFacade:r.emitFacade,fireOnce:r.fireOnce,queuable:r.queuable,monitored:r.monitored,broadcast:r.broadcast,defaultTargetOnly:r.defaultTargetOnly,bubbles:("bubbles" in r)?r.bubbles:true}};};d.prototype={once:function(){var q=this.on.apply(this,arguments);q.batch(function(r){if(r.sub){r.sub.once=true;}});return q;},on:function(u,z,s){var C=f(u,this._yuievt.config.prefix),E,F,r,I,B,A,G,w=b.Env.evt.handles,t,q,x,H=b.Node,D,y,v;this._monitor("attach",C[1],{args:arguments,category:C[0],after:C[2]});if(j.isObject(u)){if(j.isFunction(u)){return b.Do.before.apply(b.Do,arguments);}E=z;F=s;r=k(arguments,0,true);I=[];if(j.isArray(u)){v=true;}t=u._after;delete u._after;b.each(u,function(L,K){if(j.isObject(L)){E=L.fn||((j.isFunction(L))?L:E);F=L.context||F;}var J=(t)?l:"";r[0]=J+((v)?L:K);r[1]=E;r[2]=F;I.push(this.on.apply(this,r));},this);return(this._yuievt.chain)?this:new b.EventHandle(I);}A=C[0];t=C[2];x=C[3];if(H&&b.instanceOf(this,H)&&(x in H.DOM_EVENTS)){r=k(arguments,0,true);r.splice(2,0,H.getDOMNode(this));return b.on.apply(b,r);}u=C[1];if(b.instanceOf(this,YUI)){q=b.Env.evt.plugins[u];r=k(arguments,0,true);r[0]=x;if(H){D=r[2];if(b.instanceOf(D,b.NodeList)){D=b.NodeList.getDOMNodes(D);}else{if(b.instanceOf(D,H)){D=H.getDOMNode(D);}}y=(x in H.DOM_EVENTS);if(y){r[2]=D;}}if(q){G=q.on.apply(b,r);}else{if((!u)||y){G=b.Event._attach(r);}}}if(!G){B=this._yuievt.events[u]||this.publish(u);G=B._on(z,s,(arguments.length>3)?k(arguments,3,true):null,(t)?"after":true);}if(A){w[A]=w[A]||{};w[A][u]=w[A][u]||[];w[A][u].push(G);}return(this._yuievt.chain)?this:G;},subscribe:function(){return this.on.apply(this,arguments);},detach:function(z,B,q){var F=this._yuievt.events,u,w=b.Node,D=w&&(b.instanceOf(this,w));if(!z&&(this!==b)){for(u in F){if(F.hasOwnProperty(u)){F[u].detach(B,q);}}if(D){b.Event.purgeElement(w.getDOMNode(this));}return this;}var t=f(z,this._yuievt.config.prefix),y=j.isArray(t)?t[0]:null,G=(t)?t[3]:null,v,C=b.Env.evt.handles,E,A,x,s,r=function(L,J,K){var I=L[J],M,H;if(I){for(H=I.length-1;H>=0;--H){M=I[H].evt;if(M.host===K||M.el===K){I[H].detach();}}}};if(y){A=C[y];z=t[1];E=(D)?b.Node.getDOMNode(this):this;if(A){if(z){r(A,z,E);}else{for(u in A){if(A.hasOwnProperty(u)){r(A,u,E);}}}return this;}}else{if(j.isObject(z)&&z.detach){z.detach();return this;}else{if(D&&((!G)||(G in w.DOM_EVENTS))){x=k(arguments,0,true);x[2]=w.getDOMNode(this);b.detach.apply(b,x);return this;}}}v=b.Env.evt.plugins[G];if(b.instanceOf(this,YUI)){x=k(arguments,0,true);if(v&&v.detach){v.detach.apply(b,x);return this;}else{if(!z||(!v&&w&&(z in w.DOM_EVENTS))){x[0]=z;b.Event.detach.apply(b.Event,x);return this;}}}s=F[t[1]];if(s){s.detach(B,q);}return this;},unsubscribe:function(){return this.detach.apply(this,arguments);},detachAll:function(q){return this.detach(q);},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},publish:function(s,t){var r,x,q,w,v=this._yuievt,u=v.config.prefix;s=(u)?o(s,u):s;this._monitor("publish",s,{args:arguments});if(j.isObject(s)){q={};b.each(s,function(z,y){q[y]=this.publish(y,z||t);},this);return q;}r=v.events;x=r[s];if(x){if(t){x.applyConfig(t,true);}}else{w=v.defaults;x=new b.CustomEvent(s,(t)?b.merge(w,t):w);r[s]=x;}return r[s];},_monitor:function(t,q,u){var r,s=this.getEvent(q);if((this._yuievt.config.monitored&&(!s||s.monitored))||(s&&s.monitored)){r=q+"_"+t;u.monitored=t;this.fire.call(this,r,u);}},fire:function(u){var y=j.isString(u),s=(y)?u:(u&&u.type),x,r,w=this._yuievt.config.prefix,v,q=(y)?k(arguments,1,true):arguments;s=(w)?o(s,w):s;this._monitor("fire",s,{args:q});x=this.getEvent(s,true);v=this.getSibling(s,x);if(v&&!x){x=this.publish(s);}if(!x){if(this._yuievt.hasTargets){return this.bubble({type:s},q,this);}r=true;}else{x.sibling=v;r=x.fire.apply(x,q);}return(this._yuievt.chain)?this:r;},getSibling:function(q,s){var r;if(q.indexOf(h)>-1){q=c(q);r=this.getEvent(q,true);if(r){r.applyConfig(s);r.bubbles=false;r.broadcast=0;}}return r;},getEvent:function(r,q){var t,s;if(!q){t=this._yuievt.config.prefix;r=(t)?o(r,t):r;}s=this._yuievt.events;return s[r]||null;},after:function(s,r){var q=k(arguments,0,true);switch(j.type(s)){case"function":return b.Do.after.apply(b.Do,arguments);case"array":case"object":q[0]._after=true;break;default:q[0]=l+s;}return this.on.apply(this,q);},before:function(){return this.on.apply(this,arguments);}};b.EventTarget=d;b.mix(b,d.prototype,false,false,{bubbles:false});d.call(b);YUI.Env.globalEvents=YUI.Env.globalEvents||new d();b.Global=YUI.Env.globalEvents;},"@VERSION@",{requires:["oop"]});