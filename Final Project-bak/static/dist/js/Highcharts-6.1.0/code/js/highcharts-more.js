/*
 Highcharts JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){function m(a,b){this.init(a,b)}var w=a.CenteredSeriesMixin,v=a.each,h=a.extend,t=a.merge,u=a.splat;h(m.prototype,{coll:"pane",init:function(a,b){this.chart=b;this.background=[];b.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=t(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,b=this.options.background,c=this.chart.renderer;
this.group||(this.group=c.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(b)for(b=u(b),a=Math.max(b.length,this.background.length||0),c=0;c<a;c++)b[c]&&this.axis?this.renderBackground(t(this.defaultBackgroundOptions,b[c]),c):this.background[c]&&(this.background[c]=this.background[c].destroy(),this.background.splice(c,1))},renderBackground:function(a,b){var c="animate";this.background[b]||(this.background[b]=this.chart.renderer.path().add(this.group),c="attr");this.background[b][c]({d:this.axis.getPlotBandPath(a.from,
a.to,a)}).attr({"class":"highcharts-pane "+(a.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=w.getCenter.call(this)},update:function(a,b){t(!0,this.options,a);this.setOptions(this.options);this.render();v(this.chart.axes,function(c){c.pane===this&&(c.pane=null,c.update({},b))},this)}});
a.Pane=m})(x);(function(a){var m=a.addEvent,w=a.Axis,v=a.each,h=a.extend,t=a.map,u=a.merge,n=a.noop,b=a.pick,c=a.pInt,f=a.Tick,g=a.wrap,d=a.correctFloat,e,r,l=w.prototype,k=f.prototype;a.radialAxisExtended||(a.radialAxisExtended=!0,e={getOffset:n,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:n,setCategories:n,setTitle:n},r={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",
minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null,style:{textOverflow:"none"}},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=u(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||
(b.plotBands=[])},getOffset:function(){l.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(c,d){c=this.center;var e=this.chart,f=b(d,c[2]/2-this.offset);this.isCircular||void 0!==d?(d=this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],f,f,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),d.xBounds=[this.left+c[0]],d.yBounds=[this.top+c[1]-f]):(d=this.postTranslate(this.angleRad,f),d=["M",c[0]+e.plotLeft,c[1]+e.plotTop,"L",d.x,d.y]);return d},setAxisTranslation:function(){l.setAxisTranslation.call(this);
this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===b(this.userMax,this.options.max)&&d(this.endAngleRad-this.startAngleRad)===d(2*Math.PI))this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){l.setAxisSize.call(this);
this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*b(this.sector,1)/2)},getPosition:function(c,d){return this.postTranslate(this.isCircular?this.translate(c):this.angleRad,b(this.isCircular?d:this.translate(c),this.center[2]/2)-this.offset)},postTranslate:function(b,c){var d=this.chart,e=this.center;b=this.startAngleRad+b;return{x:d.plotLeft+e[0]+Math.cos(b)*c,y:d.plotTop+e[1]+Math.sin(b)*c}},
getPlotBandPath:function(d,e,f){var a=this.center,g=this.startAngleRad,q=a[2]/2,p=[b(f.outerRadius,"100%"),f.innerRadius,b(f.thickness,10)],r=Math.min(this.offset,0),l=/%$/,k,z=this.isCircular;"polygon"===this.options.gridLineInterpolation?a=this.getPlotLinePath(d).concat(this.getPlotLinePath(e,!0)):(d=Math.max(d,this.min),e=Math.min(e,this.max),z||(p[0]=this.translate(d),p[1]=this.translate(e)),p=t(p,function(b){l.test(b)&&(b=c(b,10)*q/100);return b}),"circle"!==f.shape&&z?(d=g+this.translate(d),
e=g+this.translate(e)):(d=-Math.PI/2,e=1.5*Math.PI,k=!0),p[0]-=r,p[2]-=r,a=this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],p[0],p[0],{start:Math.min(d,e),end:Math.max(d,e),innerR:b(p[1],p[0]-p[2]),open:k}));return a},getPlotLinePath:function(b,c){var d=this,e=d.center,f=d.chart,a=d.getPosition(b),g,p,q;d.isCircular?q=["M",e[0]+f.plotLeft,e[1]+f.plotTop,"L",a.x,a.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(q=d.getLinePath(0,b)):(v(f.xAxis,function(b){b.pane===d.pane&&
(g=b)}),q=[],b=d.translate(b),e=g.tickPositions,g.autoConnect&&(e=e.concat([e[0]])),c&&(e=[].concat(e).reverse()),v(e,function(c,d){p=g.getPosition(c,b);q.push(d?"L":"M",p.x,p.y)}));return q},getTitlePosition:function(){var b=this.center,c=this.chart,d=this.options.title;return{x:c.plotLeft+b[0]+(d.x||0),y:c.plotTop+b[1]-{high:.5,middle:.25,low:0}[d.align]*b[2]+(d.y||0)}}},m(w,"init",function(b){var c=this.chart,d=c.angular,f=c.polar,a=this.isXAxis,g=d&&a,p,l=c.options;b=b.userOptions.pane||0;b=this.pane=
c.pane&&c.pane[b];if(d){if(h(this,g?e:r),p=!a)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else f&&(h(this,r),this.defaultRadialOptions=(p=a)?this.defaultRadialXOptions:u(this.defaultYAxisOptions,this.defaultRadialYOptions));d||f?(this.isRadial=!0,c.inverted=!1,l.chart.zoomType=null):this.isRadial=!1;b&&p&&(b.axis=this);this.isCircular=p}),m(w,"afterInit",function(){var c=this.chart,d=this.options,e=this.pane,f=e&&e.options;c.angular&&this.isXAxis||!e||!c.angular&&!c.polar||(this.angleRad=
(d.angle||0)*Math.PI/180,this.startAngleRad=(f.startAngle-90)*Math.PI/180,this.endAngleRad=(b(f.endAngle,f.startAngle+360)-90)*Math.PI/180,this.offset=d.offset||0)}),g(l,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))}),m(f,"afterGetPosition",function(b){this.axis.getPosition&&h(b.pos,this.axis.getPosition(this.pos))}),m(f,"afterGetLabelPosition",function(c){var d=this.axis,e=this.label,f=d.options.labels,a=f.y,g,r=20,l=f.align,k=(d.translate(this.pos)+
d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial&&(g=d.getPosition(this.pos,d.center[2]/2+b(f.distance,-25)),"auto"===f.rotation?e.attr({rotation:k}):null===a&&(a=d.chart.renderer.fontMetrics(e.styles&&e.styles.fontSize).b-e.getBBox().height/2),null===l&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(r=0),l=k>r&&k<180-r?"left":k>180+r&&k<360-r?"right":"center"):l="center",e.attr({align:l})),c.pos.x=g.x+f.x,c.pos.y=g.y+a)}),g(k,"getMarkPath",function(b,c,d,e,f,
a,g){var r=this.axis;r.isRadial?(b=r.getPosition(this.pos,r.center[2]/2+e),c=["M",c,d,"L",b.x,b.y]):c=b.call(this,c,d,e,f,a,g);return c}))})(x);(function(a){var m=a.each,w=a.pick,v=a.defined,h=a.seriesType,t=a.seriesTypes,u=a.Series.prototype,n=a.Point.prototype;h("arearange","area",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{series.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,
dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(b){return[b.low,b.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(b){var c=this.chart,f=this.xAxis.postTranslate(b.rectPlotX,this.yAxis.len-b.plotHigh);b.plotHighX=f.x-c.plotLeft;b.plotHigh=f.y-c.plotTop;b.plotLowX=b.plotX},translate:function(){var b=this,c=b.yAxis,f=!!b.modifyValue;t.area.prototype.translate.apply(b);
m(b.points,function(a){var d=a.low,e=a.high,g=a.plotY;null===e||null===d?(a.isNull=!0,a.plotY=null):(a.plotLow=g,a.plotHigh=c.translate(f?b.modifyValue(e,a):e,0,1,0,1),f&&(a.yBottom=a.plotHigh))});this.chart.polar&&m(this.points,function(c){b.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2]})},getGraphPath:function(b){var c=[],f=[],a,d=t.area.prototype.getGraphPath,e,r,l;l=this.options;var k=this.chart.polar&&!1!==l.connectEnds,p=l.connectNulls,q=l.step;b=b||this.points;
for(a=b.length;a--;)e=b[a],e.isNull||k||p||b[a+1]&&!b[a+1].isNull||f.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1}),r={polarPlotY:e.polarPlotY,rectPlotX:e.rectPlotX,yBottom:e.yBottom,plotX:w(e.plotHighX,e.plotX),plotY:e.plotHigh,isNull:e.isNull},f.push(r),c.push(r),e.isNull||k||p||b[a-1]&&!b[a-1].isNull||f.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1});b=d.call(this,b);q&&(!0===q&&(q="left"),l.step={left:"right",center:"center",right:"left"}[q]);c=d.call(this,c);f=d.call(this,f);l.step=q;l=[].concat(b,
c);this.chart.polar||"M"!==f[0]||(f[0]="L");this.graphPath=l;this.areaPath=b.concat(f);l.isArea=!0;l.xMap=b.xMap;this.areaPath.xMap=b.xMap;return l},drawDataLabels:function(){var b=this.data,c=b.length,a,g=[],d=this.options.dataLabels,e=d.align,r=d.verticalAlign,l=d.inside,k,p,q=this.chart.inverted;if(d.enabled||this._hasPointLabels){for(a=c;a--;)if(k=b[a])p=l?k.plotHigh<k.plotLow:k.plotHigh>k.plotLow,k.y=k.high,k._plotY=k.plotY,k.plotY=k.plotHigh,g[a]=k.dataLabel,k.dataLabel=k.dataLabelUpper,k.below=
p,q?e||(d.align=p?"right":"left"):r||(d.verticalAlign=p?"top":"bottom"),d.x=d.xHigh,d.y=d.yHigh;u.drawDataLabels&&u.drawDataLabels.apply(this,arguments);for(a=c;a--;)if(k=b[a])p=l?k.plotHigh<k.plotLow:k.plotHigh>k.plotLow,k.dataLabelUpper=k.dataLabel,k.dataLabel=g[a],k.y=k.low,k.plotY=k._plotY,k.below=!p,q?e||(d.align=p?"left":"right"):r||(d.verticalAlign=p?"bottom":"top"),d.x=d.xLow,d.y=d.yLow;u.drawDataLabels&&u.drawDataLabels.apply(this,arguments)}d.align=e;d.verticalAlign=r},alignDataLabel:function(){t.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var b=this.points.length,c,f;u.drawPoints.apply(this,arguments);for(f=0;f<b;)c=this.points[f],c.origProps={plotY:c.plotY,plotX:c.plotX,isInside:c.isInside,negative:c.negative,zone:c.zone,y:c.y},c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c.plotY=c.plotHigh,v(c.plotHighX)&&(c.plotX=c.plotHighX),c.y=c.high,c.negative=c.high<(this.options.threshold||0),c.zone=this.zones.length&&c.getZone(),this.chart.polar||(c.isInside=c.isTopInside=void 0!==c.plotY&&0<=c.plotY&&
c.plotY<=this.yAxis.len&&0<=c.plotX&&c.plotX<=this.xAxis.len),f++;u.drawPoints.apply(this,arguments);for(f=0;f<b;)c=this.points[f],c.upperGraphic=c.graphic,c.graphic=c.lowerGraphic,a.extend(c,c.origProps),delete c.origProps,f++},setStackedPoints:a.noop},{setState:function(){var b=this.state,c=this.series,a=c.chart.polar;v(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));v(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=
c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);n.setState.apply(this,arguments);this.state=b;this.plotY=this.plotLow;this.graphic=this.lowerGraphic;a&&(this.plotX=this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic,c.lowerStateMarkerGraphic=void 0);n.setState.apply(this,arguments)},haloPath:function(){var b=this.series.chart.polar,
c=[];this.plotY=this.plotLow;b&&(this.plotX=this.plotLowX);this.isInside&&(c=n.haloPath.apply(this,arguments));this.plotY=this.plotHigh;b&&(this.plotX=this.plotHighX);this.isTopInside&&(c=c.concat(n.haloPath.apply(this,arguments)));return c},destroyElements:function(){m(["lowerGraphic","upperGraphic"],function(b){this[b]&&(this[b]=this[b].destroy())},this);this.graphic=null;return n.destroyElements.apply(this,arguments)}})})(x);(function(a){var m=a.seriesType;m("areasplinerange","arearange",null,
{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(x);(function(a){var m=a.defaultPlotOptions,w=a.each,v=a.merge,h=a.noop,t=a.pick,u=a.seriesType,n=a.seriesTypes.column.prototype;u("columnrange","arearange",v(m.column,m.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var b=this,c=b.yAxis,a=b.xAxis,g=a.startAngleRad,d,e=b.chart,r=b.xAxis.isRadial,l=Math.max(e.chartWidth,e.chartHeight)+999,k;n.translate.apply(b);w(b.points,function(f){var q=f.shapeArgs,
p=b.options.minPointLength,h,n;f.plotHigh=k=Math.min(Math.max(-l,c.translate(f.high,0,1,0,1)),l);f.plotLow=Math.min(Math.max(-l,f.plotY),l);n=k;h=t(f.rectPlotY,f.plotY)-k;Math.abs(h)<p?(p-=h,h+=p,n-=p/2):0>h&&(h*=-1,n-=h);r?(d=f.barX+g,f.shapeType="path",f.shapeArgs={d:b.polarArc(n+h,n,d,d+f.pointWidth)}):(q.height=h,q.y=n,f.tooltipPos=e.inverted?[c.len+c.pos-e.plotLeft-n-h/2,a.len+a.pos-e.plotTop-q.x-q.width/2,h]:[a.left-e.plotLeft+q.x+q.width/2,c.pos-e.plotTop+n+h/2,h])})},directTouch:!0,trackerGroups:["group",
"dataLabelsGroup"],drawGraph:h,getSymbol:h,crispCol:n.crispCol,drawPoints:n.drawPoints,drawTracker:n.drawTracker,getColumnMetrics:n.getColumnMetrics,pointAttribs:n.pointAttribs,animate:function(){return n.animate.apply(this,arguments)},polarArc:function(){return n.polarArc.apply(this,arguments)},translate3dPoints:function(){return n.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return n.translate3dShapes.apply(this,arguments)}},{setState:n.pointClass.prototype.setState})})(x);
(function(a){var m=a.each,w=a.isNumber,v=a.merge,h=a.pick,t=a.pInt,u=a.Series,n=a.seriesType,b=a.TrackerMixin;n("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,a=this.options,g=b.center;this.generatePoints();m(this.points,
function(c){var d=v(a.dial,c.dial),f=t(h(d.radius,80))*g[2]/200,l=t(h(d.baseLength,70))*f/100,k=t(h(d.rearLength,10))*f/100,p=d.baseWidth||3,q=d.topWidth||1,n=a.overshoot,m=b.startAngleRad+b.translate(c.y,null,null,null,!0);w(n)?(n=n/180*Math.PI,m=Math.max(b.startAngleRad-n,Math.min(b.endAngleRad+n,m))):!1===a.wrap&&(m=Math.max(b.startAngleRad,Math.min(b.endAngleRad,m)));m=180*m/Math.PI;c.shapeType="path";c.shapeArgs={d:d.path||["M",-k,-p/2,"L",l,-p/2,f,-q/2,f,q/2,l,p/2,-k,p/2,"z"],translateX:g[0],
translateY:g[1],rotation:m};c.plotX=g[0];c.plotY=g[1]})},drawPoints:function(){var b=this,a=b.yAxis.center,g=b.pivot,d=b.options,e=d.pivot,r=b.chart.renderer;m(b.points,function(c){var a=c.graphic,e=c.shapeArgs,f=e.d;v(d.dial,c.dial);a?(a.animate(e),e.d=f):c.graphic=r[c.shapeType](e).attr({rotation:e.rotation,zIndex:1}).addClass("highcharts-dial").add(b.group)});g?g.animate({translateX:a[0],translateY:a[1]}):b.pivot=r.circle(0,0,h(e.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],
a[1]).add(b.group)},animate:function(b){var c=this;b||(m(c.points,function(b){var d=b.graphic;d&&(d.attr({rotation:180*c.yAxis.startAngleRad/Math.PI}),d.animate({rotation:b.shapeArgs.rotation},c.options.animation))}),c.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);u.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,a){u.prototype.setData.call(this,b,!1);this.processData();
this.generatePoints();h(a,!0)&&this.chart.redraw()},drawTracker:b&&b.drawTrackerPoint},{setState:function(b){this.state=b}})})(x);(function(a){var m=a.each,w=a.noop,v=a.seriesType,h=a.seriesTypes;v("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},
whiskerLength:"50%"},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",drawDataLabels:w,translate:function(){var a=this.yAxis,u=this.pointArrayMap;h.column.prototype.translate.apply(this);m(this.points,function(h){m(u,function(b){null!==h[b]&&(h[b+"Plot"]=a.translate(h[b],0,1,0,1))})})},drawPoints:function(){var a=this,h=a.chart.renderer,n,b,c,f,g,d,e=0,r,l,k,p,q=!1!==a.doQuartiles,v,w=a.options.whiskerLength;m(a.points,
function(m){var t=m.graphic,u=t?"animate":"attr",z=m.shapeArgs;void 0!==m.plotY&&(r=z.width,l=Math.floor(z.x),k=l+r,p=Math.round(r/2),n=Math.floor(q?m.q1Plot:m.lowPlot),b=Math.floor(q?m.q3Plot:m.lowPlot),c=Math.floor(m.highPlot),f=Math.floor(m.lowPlot),t||(m.graphic=t=h.g("point").add(a.group),m.stem=h.path().addClass("highcharts-boxplot-stem").add(t),w&&(m.whiskers=h.path().addClass("highcharts-boxplot-whisker").add(t)),q&&(m.box=h.path(void 0).addClass("highcharts-boxplot-box").add(t)),m.medianShape=
h.path(void 0).addClass("highcharts-boxplot-median").add(t)),d=m.stem.strokeWidth()%2/2,e=l+p+d,m.stem[u]({d:["M",e,b,"L",e,c,"M",e,n,"L",e,f]}),q&&(d=m.box.strokeWidth()%2/2,n=Math.floor(n)+d,b=Math.floor(b)+d,l+=d,k+=d,m.box[u]({d:["M",l,b,"L",l,n,"L",k,n,"L",k,b,"L",l,b,"z"]})),w&&(d=m.whiskers.strokeWidth()%2/2,c+=d,f+=d,v=/%$/.test(w)?p*parseFloat(w)/100:w/2,m.whiskers[u]({d:["M",e-v,c,"L",e+v,c,"M",e-v,f,"L",e+v,f]})),g=Math.round(m.medianPlot),d=m.medianShape.strokeWidth()%2/2,g+=d,m.medianShape[u]({d:["M",
l,g,"L",k,g]}))})},setStackedPoints:w})})(x);(function(a){var m=a.each,w=a.noop,v=a.seriesType,h=a.seriesTypes;v("errorbar","boxplot",{grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:h.arearange?
function(){var a=this.pointValKey;h.arearange.prototype.drawDataLabels.call(this);m(this.data,function(m){m.y=m[a]})}:w,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||h.column.prototype.getColumnMetrics.call(this)}})})(x);(function(a){var m=a.correctFloat,w=a.isNumber,v=a.pick,h=a.Point,t=a.Series,u=a.seriesType,n=a.seriesTypes;u("waterfall","column",{dataLabels:{inside:!0}},{pointValKey:"y",showLine:!0,translate:function(){var b=this.options,c=this.yAxis,a,
g,d,e,r,l,k,p,q,h,t=v(b.minPointLength,5),u=t/2,w=b.threshold,x=b.stacking,y;n.column.prototype.translate.apply(this);p=q=w;g=this.points;a=0;for(b=g.length;a<b;a++)d=g[a],k=this.processedYData[a],e=d.shapeArgs,r=x&&c.stacks[(this.negStacks&&k<w?"-":"")+this.stackKey],y=this.getStackIndicator(y,d.x,this.index),h=v(r&&r[d.x].points[y.key],[0,k]),d.isSum?d.y=m(k):d.isIntermediateSum&&(d.y=m(k-q)),l=Math.max(p,p+d.y)+h[0],e.y=c.translate(l,0,1,0,1),d.isSum?(e.y=c.translate(h[1],0,1,0,1),e.height=Math.min(c.translate(h[0],
0,1,0,1),c.len)-e.y):d.isIntermediateSum?(e.y=c.translate(h[1],0,1,0,1),e.height=Math.min(c.translate(q,0,1,0,1),c.len)-e.y,q=h[1]):(e.height=0<k?c.translate(p,0,1,0,1)-e.y:c.translate(p,0,1,0,1)-c.translate(p-k,0,1,0,1),p+=r&&r[d.x]?r[d.x].total:k),0>e.height&&(e.y+=e.height,e.height*=-1),d.plotY=e.y=Math.round(e.y)-this.borderWidth%2/2,e.height=Math.max(Math.round(e.height),.001),d.yBottom=e.y+e.height,e.height<=t&&!d.isNull?(e.height=t,e.y-=u,d.plotY=e.y,d.minPointLengthOffset=0>d.y?-u:u):d.minPointLengthOffset=
0,e=d.plotY+(d.negative?e.height:0),this.chart.inverted?d.tooltipPos[0]=c.len-e:d.tooltipPos[1]=e},processData:function(b){var c=this.yData,a=this.options.data,g,d=c.length,e,r,l,k,h,q;r=e=l=k=this.options.threshold||0;for(q=0;q<d;q++)h=c[q],g=a&&a[q]?a[q]:{},"sum"===h||g.isSum?c[q]=m(r):"intermediateSum"===h||g.isIntermediateSum?c[q]=m(e):(r+=h,e+=h),l=Math.min(r,l),k=Math.max(r,k);t.prototype.processData.call(this,b);this.options.stacking||(this.dataMin=l,this.dataMax=k)},toYData:function(b){return b.isSum?
0===b.x?null:"sum":b.isIntermediateSum?0===b.x?null:"intermediateSum":b.y},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var b=this.data,c=b.length,a=this.graph.strokeWidth()+this.borderWidth,a=Math.round(a)%2/2,g=this.xAxis.reversed,d=this.yAxis.reversed,e=[],r,l,k;for(k=1;k<c;k++){l=b[k].shapeArgs;r=b[k-1].shapeArgs;l=["M",r.x+(g?0:r.width),r.y+b[k-1].minPointLengthOffset+a,"L",l.x+(g?r.width:0),r.y+b[k-1].minPointLengthOffset+a];if(0>b[k-1].y&&!d||0<b[k-1].y&&d)l[2]+=r.height,
l[5]+=r.height;e=e.concat(l)}return e},drawGraph:function(){t.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var b=this.options,c,a;t.prototype.setStackedPoints.apply(this,arguments);c=this.stackedYData?this.stackedYData.length:0;for(a=1;a<c;a++)b.data[a].isSum||b.data[a].isIntermediateSum||(this.stackedYData[a]+=this.stackedYData[a-1])},getExtremes:function(){if(this.options.stacking)return t.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var b=
h.prototype.getClassName.call(this);this.isSum?b+=" highcharts-sum":this.isIntermediateSum&&(b+=" highcharts-intermediate-sum");return b},isValid:function(){return w(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(a){var m=a.Series,w=a.seriesType,v=a.seriesTypes;w("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=m.prototype.getGraphPath.call(this),
t=a.length+1;t--;)(t===a.length||"M"===a[t])&&0<t&&a.splice(t,0,"z");return this.areaPath=a},drawGraph:function(){v.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:m.prototype.drawTracker,setStackedPoints:a.noop})})(x);(function(a){var m=a.arrayMax,w=a.arrayMin,v=a.Axis,h=a.each,t=a.isNumber,u=a.noop,n=a.pick,b=a.pInt,c=a.Point,f=a.seriesType,g=a.seriesTypes;f("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},
animationLimit:250,marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,getRadii:function(b,c,a,f){var d,e,g,r=this.zData,l=[],h=this.options,m="width"!==
h.sizeBy,n=h.zThreshold,t=c-b;e=0;for(d=r.length;e<d;e++)g=r[e],h.sizeByAbsoluteValue&&null!==g&&(g=Math.abs(g-n),c=t=Math.max(c-n,Math.abs(b-n)),b=0),null===g?g=null:g<b?g=a/2-1:(g=0<t?(g-b)/t:.5,m&&0<=g&&(g=Math.sqrt(g)),g=Math.ceil(a+g*(f-a))/2),l.push(g);this.radii=l},animate:function(b){!b&&this.points.length<this.options.animationLimit&&(h(this.points,function(b){var c=b.graphic,a;c&&c.width&&(a={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:b.plotX,y:b.plotY,width:1,height:1}),c.animate(a,
this.options.animation))},this),this.animate=null)},translate:function(){var b,c=this.data,f,l,k=this.radii;g.scatter.prototype.translate.call(this);for(b=c.length;b--;)f=c[b],l=k?k[b]:0,t(l)&&l>=this.minPxSize/2?(f.marker=a.extend(f.marker,{radius:l,width:2*l,height:2*l}),f.dlBox={x:f.plotX-l,y:f.plotY-l,width:2*l,height:2*l}):f.shapeArgs=f.plotY=f.dlBox=void 0},alignDataLabel:g.column.prototype.alignDataLabel,buildKDTree:u,applyZones:u},{haloPath:function(b){return c.prototype.haloPath.call(this,
0===b?0:(this.marker?this.marker.radius||0:0)+b)},ttBelow:!1});v.prototype.beforePadding=function(){var c=this,a=this.len,f=this.chart,g=0,k=a,p=this.isXAxis,q=p?"xData":"yData",u=this.min,v={},x=Math.min(f.plotWidth,f.plotHeight),B=Number.MAX_VALUE,C=-Number.MAX_VALUE,y=this.max-u,A=a/y,D=[];h(this.series,function(a){var d=a.options;!a.bubblePadding||!a.visible&&f.options.chart.ignoreHiddenSeries||(c.allowZoomOutside=!0,D.push(a),p&&(h(["minSize","maxSize"],function(c){var a=d[c],e=/%$/.test(a),
a=b(a);v[c]=e?x*a/100:a}),a.minPxSize=v.minSize,a.maxPxSize=Math.max(v.maxSize,v.minSize),a=a.zData,a.length&&(B=n(d.zMin,Math.min(B,Math.max(w(a),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),C=n(d.zMax,Math.max(C,m(a))))))});h(D,function(b){var a=b[q],d=a.length,e;p&&b.getRadii(B,C,b.minPxSize,b.maxPxSize);if(0<y)for(;d--;)t(a[d])&&c.dataMin<=a[d]&&a[d]<=c.dataMax&&(e=b.radii[d],g=Math.min((a[d]-u)*A-e,g),k=Math.max((a[d]-u)*A+e,k))});D.length&&0<y&&!this.isLog&&(k-=a,A*=(a+g-k)/a,h([["min",
"userMin",g],["max","userMax",k]],function(b){void 0===n(c.options[b[0]],c[b[1]])&&(c[b[0]]+=b[2]/A)}))}})(x);(function(a){var m=a.each,w=a.pick,v=a.Series,h=a.seriesTypes,t=a.wrap,u=v.prototype,n=a.Pointer.prototype;a.polarExtended||(a.polarExtended=!0,u.searchPointByAngle=function(b){var a=this.chart,f=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(b.chartX-f[0]-a.plotLeft,b.chartY-f[1]-a.plotTop)})},u.getConnectors=function(b,a,f,g){var c,e,h,l,k,m,q,n;e=g?
1:0;c=0<=a&&a<=b.length-1?a:0>a?b.length-1+a:0;a=0>c-1?b.length-(1+e):c-1;e=c+1>b.length-1?e:c+1;h=b[a];e=b[e];l=h.plotX;h=h.plotY;k=e.plotX;m=e.plotY;e=b[c].plotX;c=b[c].plotY;l=(1.5*e+l)/2.5;h=(1.5*c+h)/2.5;k=(1.5*e+k)/2.5;q=(1.5*c+m)/2.5;m=Math.sqrt(Math.pow(l-e,2)+Math.pow(h-c,2));n=Math.sqrt(Math.pow(k-e,2)+Math.pow(q-c,2));l=Math.atan2(h-c,l-e);q=Math.PI/2+(l+Math.atan2(q-c,k-e))/2;Math.abs(l-q)>Math.PI/2&&(q-=Math.PI);l=e+Math.cos(q)*m;h=c+Math.sin(q)*m;k=e+Math.cos(Math.PI+q)*n;q=c+Math.sin(Math.PI+
q)*n;e={rightContX:k,rightContY:q,leftContX:l,leftContY:h,plotX:e,plotY:c};f&&(e.prevPointCont=this.getConnectors(b,a,!1,g));return e},t(u,"buildKDTree",function(b){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");b.apply(this)}),u.toXY=function(b){var a,f=this.chart,g=b.plotX;a=b.plotY;b.rectPlotX=g;b.rectPlotY=a;a=this.xAxis.postTranslate(b.plotX,this.yAxis.len-a);b.plotX=b.polarPlotX=a.x-f.plotLeft;b.plotY=b.polarPlotY=a.y-f.plotTop;
this.kdByAngle?(f=(g/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>f&&(f+=360),b.clientX=f):b.clientX=b.plotX},h.spline&&(t(h.spline.prototype,"getPointSpline",function(b,a,f,g){this.chart.polar?g?(b=this.getConnectors(a,g,!0,this.connectEnds),b=["C",b.prevPointCont.rightContX,b.prevPointCont.rightContY,b.leftContX,b.leftContY,b.plotX,b.plotY]):b=["M",f.plotX,f.plotY]:b=b.call(this,a,f,g);return b}),h.areasplinerange&&(h.areasplinerange.prototype.getPointSpline=h.spline.prototype.getPointSpline)),
a.addEvent(v,"afterTranslate",function(){var b=this.chart,c,f;if(b.polar){this.kdByAngle=b.tooltip&&b.tooltip.shared;if(!this.preventPostTranslate)for(c=this.points,f=c.length;f--;)this.toXY(c[f]);this.hasClipCircleSetter||(this.hasClipCircleSetter=!!a.addEvent(this,"afterRender",function(){var c;b.polar&&(c=this.yAxis.center,this.group.clip(b.renderer.clipCircle(c[0],c[1],c[2]/2)),this.setClip=a.noop)}))}}),t(u,"getGraphPath",function(b,a){var c=this,g,d,e;if(this.chart.polar){a=a||this.points;for(g=
0;g<a.length;g++)if(!a[g].isNull){d=g;break}!1!==this.options.connectEnds&&void 0!==d&&(this.connectEnds=!0,a.splice(a.length,0,a[d]),e=!0);m(a,function(b){void 0===b.polarPlotY&&c.toXY(b)})}g=b.apply(this,[].slice.call(arguments,1));e&&a.pop();return g}),v=function(b,a){var c=this.chart,g=this.options.animation,d=this.group,e=this.markerGroup,h=this.xAxis.center,l=c.plotLeft,k=c.plotTop;c.polar?c.renderer.isSVG&&(!0===g&&(g={}),a?(b={translateX:h[0]+l,translateY:h[1]+k,scaleX:.001,scaleY:.001},d.attr(b),
e&&e.attr(b)):(b={translateX:l,translateY:k,scaleX:1,scaleY:1},d.animate(b,g),e&&e.animate(b,g),this.animate=null)):b.call(this,a)},t(u,"animate",v),h.column&&(h=h.column.prototype,h.polarArc=function(b,a,f,g){var c=this.xAxis.center,e=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],e-a,null,{start:f,end:g,innerR:e-w(b,e)})},t(h,"animate",v),t(h,"translate",function(b){var a=this.xAxis,f=a.startAngleRad,g,d,e;this.preventPostTranslate=!0;b.call(this);if(a.isRadial)for(g=this.points,
e=g.length;e--;)d=g[e],b=d.barX+f,d.shapeType="path",d.shapeArgs={d:this.polarArc(d.yBottom,d.plotY,b,b+d.pointWidth)},this.toXY(d),d.tooltipPos=[d.plotX,d.plotY],d.ttBelow=d.plotY>a.center[1]}),t(h,"alignDataLabel",function(a,c,f,g,d,e){this.chart.polar?(a=c.rectPlotX/Math.PI*180,null===g.align&&(g.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===g.verticalAlign&&(g.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),u.alignDataLabel.call(this,c,f,g,d,e)):a.call(this,c,
f,g,d,e)})),t(n,"getCoordinates",function(a,c){var b=this.chart,g={xAxis:[],yAxis:[]};b.polar?m(b.axes,function(a){var d=a.isXAxis,f=a.center,h=c.chartX-f[0]-b.plotLeft,f=c.chartY-f[1]-b.plotTop;g[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-Math.atan2(h,f):Math.sqrt(Math.pow(h,2)+Math.pow(f,2)),!0)})}):g=a.call(this,c);return g}),a.SVGRenderer.prototype.clipCircle=function(b,c,f){var g=a.uniqueKey(),d=this.createElement("clipPath").attr({id:g}).add(this.defs);b=this.circle(b,c,f).add(d);
b.id=g;b.clipPath=d;return b},a.addEvent(a.Chart,"getAxes",function(){this.pane||(this.pane=[]);m(a.splat(this.options.pane),function(b){new a.Pane(b,this)},this)}),a.addEvent(a.Chart,"afterDrawChartBox",function(){m(this.pane,function(a){a.render()})}),t(a.Chart.prototype,"get",function(b,c){return a.find(this.pane,function(a){return a.options.id===c})||b.call(this,c)}))})(x)});
