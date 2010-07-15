YUI.add("paginator-plugin",function(E){var C=E.ScrollView.CLASS_NAMES,B=0.5,D=E.ScrollViewBase.UI_SRC;function A(){A.superclass.constructor.apply(this,arguments);}A.NAME="paginatorPlugin";A.NS="pages";A.ATTRS={selector:{value:null},index:{value:0},total:{value:0}};E.extend(A,E.Plugin.Base,{initializer:function(){var F=this.get("host");this.afterHostMethod("_uiDimensionsChange",this._calculatePageOffsets);this.afterHostMethod("_onTouchstart",this._setBoundaryPoints);this.afterHostMethod("_flick",this._afterFlick);this.afterHostEvent("scrollEnd",this._scrollEnded);this.after("indexChange",this._afterIndexChange);if(F.get("bounce")!==0){this._originalHostBounce=F.get("bounce");F.set("bounce",B);}},destroy:function(){var F=this.get("host");if(F.get("bounce")!==0){F.set("bounce",this._originalHostBounce);}},_calculatePageOffsets:function(){var G=this.get("host").get("contentBox"),I=this.get("selector"),F,H=[];F=I?G.all(I):G.get("children");F.each(function(K,J){H.push(K.get("offsetLeft"));},this);H.push(G.get("scrollWidth")-this.get("host").get("width"));this._minPoints=H;this.set("total",F.size());},_setBoundaryPoints:function(H){var G=this.get("host"),F=this.get("index");if(G._scrollsHorizontal){if(E.Lang.isNumber(this._minPoints[F-1])){G._minScrollX=this._minPoints[F-1];}else{G._minScrollX=this._minPoints[F];}G._maxScrollX=this._minPoints[F+1];}},_afterFlick:function(L){var J=this.get("host")._currentVelocity,G=J>0,K=Math.abs(J),I=this.get("host"),F=this.get("index"),H=this.get("total");if(K<1){I._currentVelocity=G?1:-1;}if(G&&F<H-1){this.set("index",F+1,{src:D});}else{if(!G&&F>0){this.set("index",F-1,{src:D});}}},_scrollEnded:function(I){var H=this.get("host"),F=this.get("index"),G=this.get("total");if(I.staleScroll){if(H._scrolledHalfway){if(H._scrolledForward&&F<G-1){this.set("index",F+1);}else{if(F>0){this.set("index",F-1);}else{this.snapToCurrent();}}}else{this.snapToCurrent();}}},_afterIndexChange:function(F){if(F.src!==D){this._uiIndex(F.newVal);}},_uiIndex:function(F){this.scrollTo(F,350,"ease-out");},next:function(G){var F=this.get("index");if(F<this.get("total")-1){this.set("index",F+1);}},prev:function(G){var F=this.get("index");if(F>0){this.set("index",F-1);}},scrollTo:function(G,I,K){var H=this.get("host"),F=H.get("scrollX"),J=H.get("scrollY");if(H._scrollsHorizontal){F=this._minPoints[G];H.set("scrollX",F,{duration:I,easing:K});}},snapToCurrent:function(){this.get("host").set("scrollX",this._minPoints[this.get("index")],{duration:300,easing:"ease-out"});}});E.namespace("Plugin");E.Plugin.PaginatorPlugin=A;},"@VERSION@",{requires:["plugin"]});