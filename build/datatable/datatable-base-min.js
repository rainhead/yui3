YUI.add("datatable-base",function(D){var V=D.Lang,f=D.Lang.substitute,E=D.Node,T=E.create,P=D.ClassNameManager.getClassName,Q="datatable",R="column",h="focus",k="keydown",H="mouseenter",O="mouseleave",K="mouseup",X="mousedown",c="click",C="doubleclick",F=P(Q,"columns"),b=P(Q,"data"),B=P(Q,"msg"),L=P(Q,"liner"),e=P(Q,"first"),I=P(Q,"last"),U=P(Q,"even"),a=P(Q,"odd"),d="<table></table>",W="<col></col>",i='<thead class="'+F+'"></thead>',G='<tbody class="'+b+'"></tbody>',j='<th id="{id}" rowspan="{rowspan}" colspan="{colspan}" class="{classnames}"><div class="'+L+'">{value}</div></th>',g='<tr id="{id}"></tr>',A='<td headers="{headers}" class="{classnames}"><div class="'+L+'">{value}</div></td>',J="{value}",N='<tbody class="'+B+'"></tbody>';function M(Y){M.superclass.constructor.apply(this,arguments);}D.mix(M,{NAME:"column",ATTRS:{id:{valueFn:"_defaultId",writeOnce:true},key:{valueFn:"_defaultKey"},field:{valueFn:"_defaultField"},label:{valueFn:"_defaultLabel"},keyIndex:{readOnly:true},parent:{readOnly:true},children:{},colSpan:{readOnly:true},rowSpan:{readOnly:true},thNode:{readOnly:true},thLinerNode:{readOnly:true},thLabelNode:{readOnly:true},abbr:{value:null},headers:{},classnames:{readOnly:true,getter:"_getClassnames"},editor:{},formatter:{},resizeable:{},sortable:{},hidden:{},width:{},minWidth:{},maxAutoWidth:{}}});D.extend(M,D.Widget,{_defaultId:function(){return D.guid();},_defaultKey:function(Y){return Y||D.guid();},_defaultField:function(Y){return Y||this.get("key");},_defaultLabel:function(Y){return Y||this.get("key");},_afterAbbrChange:function(Y){this._uiSetAbbr(Y.newVal);},initializer:function(Y){},destructor:function(){},_getClassnames:function(){return D.ClassNameManager.getClassName(R,this.get("id"));},syncUI:function(){this._uiSetAbbr(this.get("abbr"));},_uiSetAbbr:function(Y){this._thNode.set("abbr",Y);}});D.Column=M;function Z(Y){Z.superclass.constructor.apply(this,arguments);}D.mix(Z,{NAME:"columnset",ATTRS:{definitions:{setter:"_setDefinitions"},tree:{readOnly:true,value:[]},flat:{readOnly:true,value:[]},hash:{readOnly:true,value:{}},keys:{readOnly:true,value:[]}}});D.extend(Z,D.Base,{_setDefinitions:function(Y){return D.clone(Y);},initializer:function(){var Y=[],q=[],p={},o=[],n=this.get("definitions"),l=this;function m(y,x,w){var t=0,s=x.length,v,u,r;y++;if(!Y[y]){Y[y]=[];}for(;t<s;++t){v=x[t];v=V.isString(v)?{key:v}:v;u=new D.Column(v);v.yuiColumnId=u.get("id");q.push(u);p[u.get("id")]=u;if(w){u._set("parent",w);}if(V.isArray(v.children)){r=v.children;u._set("children",r);l._setColSpans(u,v);l._cascadePropertiesToChildren(u,r);if(!Y[y+1]){Y[y+1]=[];}m(y,r,u);}else{u._set("keyIndex",o.length);u._set("colSpan",1);o.push(u);}Y[y].push(u);}y--;}m(-1,n);this._set("tree",Y);this._set("flat",q);this._set("hash",p);this._set("keys",o);this._setRowSpans();this._setHeaders();},destructor:function(){},_cascadePropertiesToChildren:function(n,l){var m=0,Y=l.length,o;for(;m<Y;++m){o=l[m];if(n.get("className")&&(o.className===undefined)){o.className=n.get("className");}if(n.get("editor")&&(o.editor===undefined)){o.editor=n.get("editor");}if(n.get("formatter")&&(o.formatter===undefined)){o.formatter=n.get("formatter");}if(n.get("resizeable")&&(o.resizeable===undefined)){o.resizeable=n.get("resizeable");}if(n.get("sortable")&&(o.sortable===undefined)){o.sortable=n.get("sortable");}if(n.get("hidden")){o.hidden=true;}if(n.get("width")&&(o.width===undefined)){o.width=n.get("width");}if(n.get("minWidth")&&(o.minWidth===undefined)){o.minWidth=n.get("minWidth");}if(n.get("maxAutoWidth")&&(o.maxAutoWidth===undefined)){o.maxAutoWidth=n.get("maxAutoWidth");}}},_setColSpans:function(m,l){var n=0;function Y(q){var r=q.children,p=0,o=r.length;for(;p<o;++p){if(V.isArray(r[p].children)){Y(r[p]);}else{n++;}}}Y(l);m._set("colSpan",n);},_setRowSpans:function(){function Y(n){var o=1,r,q,l,t;function s(w,v){v=v||1;var u=0,m=w.length,p;for(;u<m;++u){p=w[u];if(V.isArray(p.children)){v++;s(p.children,v);v--;}else{if(p.get&&V.isArray(p.get("children"))){v++;s(p.get("children"),v);v--;}else{if(v>o){o=v;}}}}}for(l=0;l<n.length;l++){r=n[l];s(r);for(t=0;t<r.length;t++){q=r[t];if(!V.isArray(q.get("children"))){q._set("rowSpan",o);}else{q._set("rowSpan",1);}}o=1;}}Y(this.get("tree"));},_setHeaders:function(){var p,n,m=this.get("keys"),l=0,Y=m.length;function o(r,q){r.push(q.get("key"));if(q.get("parent")){o(r,q.get("parent"));}}for(;l<Y;++l){p=[];n=m[l];o(p,n);n._set("headers",p.reverse().join(" "));}},getColumn:function(){}});D.Columnset=Z;function S(Y){S.superclass.constructor.apply(this,arguments);}D.mix(S,{NAME:"dataTable",ATTRS:{columnset:{setter:"_setColumnset"},recordset:{setter:"_setRecordset"},strings:{valueFn:function(){return D.Intl.get("datatable-base");}},thValueTemplate:{value:J},tdValueTemplate:{value:J},trTemplate:{value:g}},HTML_PARSER:{}});D.extend(S,D.Widget,{thTemplate:j,tdTemplate:A,_theadNode:null,_tbodyNode:null,_msgNode:null,_afterStringsChange:function(Y){this._uiSetStrings(Y.newVal);},_setColumnset:function(Y){return V.isArray(Y)?new D.Columnset({definitions:Y}):Y;},_afterColumnsetChange:function(Y){this._uiSetColumnset(Y.newVal);},_setRecordset:function(Y){if(V.isArray(Y)){Y=new D.Recordset({records:Y});}Y.addTarget(this);return Y;},_afterRecordsetChange:function(Y){this._uiSetRecordset(Y.newVal);},initializer:function(Y){},destructor:function(){this.get("recordset").removeTarget(this);},renderUI:function(){return(this._addTableNode(this.get("contentBox"))&&this._addColgroupNode(this._tableNode)&&this._addTheadNode(this._tableNode)&&this._addTbodyNode(this._tableNode)&&this._addMessageNode(this._tableNode)&&this._addCaptionNode(this._tableNode));},_addTableNode:function(Y){if(!this._tableNode){this._tableNode=Y.appendChild(T(d));}return this._tableNode;},_addColgroupNode:function(m){var Y=this.get("columnset").get("keys").length,l=0,n=["<colgroup>"];for(;l<Y;++l){n.push(W);}n.push("</colgroup>");this._colgroupNode=m.insertBefore(T(n.join("")),m.get("firstChild"));return this._colgroupNode;
},_addTheadNode:function(Y){if(Y){this._theadNode=Y.insertBefore(T(i),this._colgroupNode.next());return this._theadNode;}},_addTbodyNode:function(Y){this._tbodyNode=Y.appendChild(T(G));return this._tbodyNode;},_addMessageNode:function(Y){this._msgNode=Y.insertBefore(T(N),this._tbodyNode);return this._msgNode;},_addCaptionNode:function(Y){this._captionNode=Y.invoke("createCaption");return this._captionNode;},bindUI:function(){var o=this._tableNode,l=this.get("contentBox"),m="thead."+F+">tr>th",n="tbody."+b+">tr>td",Y="tbody."+B+">tr>td";this.publish("theadCellClick",{defaultFn:this._defTheadCellClickFn,emitFacade:false,queuable:true});this.publish("theadRowClick",{defaultFn:this._defTheadRowClickFn,emitFacade:false,queuable:true});this.publish("theadClick",{defaultFn:this._defTheadClickFn,emitFacade:false,queuable:true});this.publish("theadCellMouseenter",{defaultFn:this._defTheadCellMouseenterFn,emitFacade:false,queuable:true});this.publish("theadRowMouseenter",{defaultFn:this._defTheadRowMouseenterFn,emitFacade:false,queuable:true});this.publish("theadMouseenter",{defaultFn:this._defTheadMouseenterFn,emitFacade:false,queuable:true});this.publish("tbodyCellClick",{defaultFn:this._defTbodyCellClickFn,emitFacade:false,queuable:true});this.publish("tbodyRowClick",{defaultFn:this._defTbodyRowClickFn,emitFacade:false,queuable:true});this.publish("tbodyClick",{defaultFn:this._defTbodyClickFn,emitFacade:false,queuable:true});o.delegate(h,this._onDomEvent,m,this,"theadCellFocus");o.delegate(k,this._onDomEvent,m,this,"theadCellKeydown");o.delegate(H,this._onDomEvent,m,this,"theadCellMouseenter");o.delegate(O,this._onDomEvent,m,this,"theadCellMouseleave");o.delegate(K,this._onDomEvent,m,this,"theadCellMouseup");o.delegate(X,this._onDomEvent,m,this,"theadCellMousedown");o.delegate(c,this._onDomEvent,m,this,"theadCellClick");l.delegate(C,this._onEvent,m,this,"theadCellDoubleclick");o.delegate(h,this._onDomEvent,n,this,"tbodyCellFocus");o.delegate(k,this._onDomEvent,n,this,"tbodyCellKeydown");o.delegate(H,this._onDomEvent,n,this,"tbodyCellMouseenter");o.delegate(O,this._onDomEvent,n,this,"tbodyCellMouseleave");o.delegate(K,this._onDomEvent,n,this,"tbodyCellMouseup");o.delegate(X,this._onDomEvent,n,this,"tbodyCellMousedown");o.delegate(c,this._onDomEvent,n,this,"tbodyCellClick");l.delegate(C,this._onEvent,n,this,"tbodyCellDoubleclick");o.delegate(h,this._onDomEvent,Y,this,"msgCellFocus");o.delegate(k,this._onDomEvent,Y,this,"msgCellKeydown");o.delegate(H,this._onDomEvent,Y,this,"msgCellMouseenter");o.delegate(O,this._onDomEvent,Y,this,"msgCellMouseleave");o.delegate(K,this._onDomEvent,Y,this,"msgCellMouseup");o.delegate(X,this._onDomEvent,Y,this,"msgCellMousedown");o.delegate(c,this._onDomEvent,Y,this,"msgCellClick");l.delegate(C,this._onDomEvent,Y,this,"msgCellDoubleclick");},_onDomEvent:function(l,Y){this.fire(Y,l);},_defTheadCellClickFn:function(Y){this.fire("theadRowClick",Y);},_defTheadRowClickFn:function(Y){this.fire("theadClick",Y);},_defTheadClickFn:function(Y){},syncUI:function(){this._uiSetColumnset(this.get("columnset"));this._uiSetRecordset(this.get("recordset"));this._uiSetStrings(this.get("strings"));},_uiSetStrings:function(Y){this._uiSetSummary(Y.summary);this._uiSetCaption(Y.caption);},_uiSetSummary:function(Y){this._tableNode.set("summary",Y);},_uiSetCaption:function(Y){this._captionNode.setContent(Y);},_uiSetColumnset:function(o){var l=o.get("tree"),q=this._theadNode,m=0,Y=l.length,n=q.get("parentNode"),p=q.next();q.remove();q.get("children").remove(true);for(;m<Y;++m){this._addTheadTrNode({thead:q,columns:l[m]},(m===0),(m===Y-1));}n.insert(q,p);},_addTheadTrNode:function(m,Y,l){m.tr=this._createTheadTrNode(m,Y,l);this._attachTheadTrNode(m);},_createTheadTrNode:function(s,l,r){var q=T(f(this.get("trTemplate"),s)),n=0,m=s.columns,Y=m.length,p;if(l){q.addClass(e);}if(r){q.addClass(I);}for(;n<Y;++n){p=m[n];this._addTheadThNode({value:p.get("label"),column:p,tr:q});}return q;},_attachTheadTrNode:function(Y){Y.thead.appendChild(Y.tr);},_addTheadThNode:function(Y){Y.th=this._createTheadThNode(Y);this._attachTheadThNode(Y);},_createTheadThNode:function(l){var Y=l.column;l.id=Y.get("id");l.colspan=Y.get("colSpan");l.rowspan=Y.get("rowSpan");l.classnames=Y.get("classnames");l.value=f(this.get("thValueTemplate"),l);return T(f(this.thTemplate,l));},_attachTheadThNode:function(Y){Y.tr.appendChild(Y.th);},_uiSetRecordset:function(l){var n=0,Y=l.getLength(),m=this._tbodyNode,p=m.get("parentNode"),q=m.next(),r={tbody:m};m.remove();for(;n<Y;++n){r.record=l.getRecord(n);r.rowindex=n;this._addTbodyTrNode(r);}p.insert(m,q);},_addTbodyTrNode:function(m){var l=m.tbody,Y=m.record;m.tr=l.one("#"+Y.get("id"))||this._createTbodyTrNode(m);this._attachTbodyTrNode(m);},_createTbodyTrNode:function(p){var n=T(f(this.get("trTemplate"),{id:p.record.get("id")})),l=0,m=this.get("columnset").get("keys"),Y=m.length;p.tr=n;for(;l<Y;++l){p.column=m[l];this._addTbodyTdNode(p);}return n;},_attachTbodyTrNode:function(p){var l=p.tbody,n=p.tr,Y=p.rowindex,m=l.get("children").item(Y)||null,q=(Y%2===0);if(q){n.replaceClass(a,U);}else{n.replaceClass(U,a);}l.insertBefore(n,m);},_addTbodyTdNode:function(Y){Y.td=this._createTbodyTdNode(Y);this._attachTbodyTdNode(Y);},_createTbodyTdNode:function(l){var Y=l.column;l.headers=Y.get("headers");l.classnames=Y.get("classnames");l.value=this.formatDataCell(l);return T(f(this.tdTemplate,l));},_attachTbodyTdNode:function(Y){Y.tr.appendChild(Y.td);},formatDataCell:function(l){var Y=l.record;l.data=Y.get("data");l.value=Y.getValue(l.column.get("key"));return f(this.get("tdValueTemplate"),l);}});D.namespace("DataTable").Base=S;},"@VERSION@",{requires:["intl","substitute","widget","recordset-base"],lang:["en"]});