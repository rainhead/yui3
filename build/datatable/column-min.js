YUI.add("column",function(B){function A(C){A.superclass.constructor.apply(this,arguments);}A.NAME="column";A.ATTRS={id:{valueFn:"_defaultId",writeOnce:true},key:{valueFn:"_defaultKey"},field:{valueFn:"_defaultField"},label:{valueFn:"_defaultLabel"},keyIndex:{readOnly:true},parent:{readOnly:true},children:{},colspan:{readOnly:true},rowspan:{readOnly:true},thNode:{readOnly:true},thLinerNode:{readOnly:true},thLabelNode:{readOnly:true},abbr:{value:null},className:{},editor:{},formatter:{},resizeable:{},sortable:{},hidden:{},width:{},minWidth:{},maxAutoWidth:{}};B.extend(A,B.Widget,{_defaultId:function(){return B.guid();},_defaultKey:function(C){return C||B.guid();},_defaultField:function(C){return C||this.get("key");},_defaultLabel:function(C){return C||this.get("key");},initializer:function(){},destructor:function(){},syncUI:function(){this._uiSetAbbr(this.get("abbr"));},_afterAbbrChange:function(C){this._uiSetAbbr(C.newVal);},_uiSetAbbr:function(C){this._thNode.set("abbr",C);}});B.Column=A;},"@VERSION@",{requires:["base"]});