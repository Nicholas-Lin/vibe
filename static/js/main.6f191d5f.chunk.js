(this.webpackJsonpvibe=this.webpackJsonpvibe||[]).push([[0],{116:function(e,t,a){},121:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(21),i=a.n(s),c=(a(93),a(94),a(6)),o=a(7),l=a(9),u=a(8),p=(a(95),window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{})),m="".concat("https://accounts.spotify.com/authorize","?client_id=").concat("03448805c58d4c5ba555ea203c8ce771","&redirect_uri=").concat("http://localhost:3000/","&scope=").concat(["playlist-read-private","user-top-read","user-read-recently-played"].join("%20"),"&response_type=token&show_dialog=true"),d=a(26),h=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return this.props.isLoggedIn?null:r.a.createElement("div",null,r.a.createElement(d.a,{className:"submit-button",variant:"success",onClick:function(){return e.props.handleLogin()}},"Login with Spotify"))}}]),a}(r.a.Component),f=a(10),v=a(18);a(96);var b=function(){return r.a.createElement("div",{className:"sound-icon disabled"},r.a.createElement("div",{className:"sound-wave"},r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"}),r.a.createElement("i",{className:"bar"})))};var g=function(e){return e.isLoggedIn?null:r.a.createElement(v.a,null,r.a.createElement(f.a,{className:"d-flex align-items-center flex-column login justify-content-center"},r.a.createElement("header",null," Vibe "),r.a.createElement(b,null),r.a.createElement(h,{isLoggedIn:e.isLoggedIn,handleLogin:function(){return e.handleLogin()}}),r.a.createElement("h5",{className:"mt-5"},"Get insights into your vibe."),r.a.createElement("h6",{className:"mt-5"},"Your information will not be stored."),r.a.createElement("h6",null," ","Created by"," ",r.a.createElement("a",{href:"https://nicholas-lin.github.io/"}," Nicholas Lin. ")," Powered by"," ",r.a.createElement("a",{href:"https://developer.spotify.com/documentation/web-api/"}," ","Spotify's API."," ")," ")))},y=a(11),k=a.n(y),E=a(55),j=a(16),x=a(19),O=a.n(x);O.a.defaults.global.defaultFontColor="white",O.a.defaults.global.defaultColor="white",O.a.defaults.scale.gridLines.color="rgb(83,83,83)",O.a.defaults.LineWithLine=O.a.defaults.line,O.a.controllers.LineWithLine=O.a.controllers.line.extend({draw:function(e){if(O.a.controllers.line.prototype.draw.call(this,e),this.chart.tooltip._active&&this.chart.tooltip._active.length){var t=this.chart.tooltip._active[0],a=this.chart.ctx,n=t.tooltipPosition().x,r=this.chart.legend.bottom,s=this.chart.chartArea.bottom;a.save(),a.beginPath(),a.moveTo(n,r),a.lineTo(n,s),a.lineWidth=2,a.strokeStyle="rgb(255, 255, 255, 0.5)",a.stroke(),a.restore()}}});var w=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).chartRef=r.a.createRef(),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){new O.a(this.chartRef.current,{type:"LineWithLine",data:{labels:this.props.data.labels,datasets:this.props.data.datasets.map((function(e){return{data:e.data,label:e.label,borderColor:e.borderColor,borderWidth:2,fill:e.fill,backgroundColor:e.backgroundColor,pointBackgroundColor:e.borderColor,pointBorderWidth:1,pointBorderColor:"black",pointRadius:5,pointHitRadius:6,pointHoverBackgroundColor:"black",pointHoverBorderColor:e.borderColor}}))},options:{maintainAspectRatio:!1,tooltips:{mode:"index",intersect:!1,titleFontColor:"black",bodyFontColor:"black",backgroundColor:"rgba(255, 255, 255, 0.9)",callbacks:{label:function(e,t){var a=t.datasets[e.datasetIndex].label||"";return a&&(a+=": "),a+=Math.round(e.yLabel),a}}}}})}},{key:"render",value:function(){return r.a.createElement(f.a,{className:" h-100 d-flex flex-column justify-content-between align-items-center p-0"},r.a.createElement("h3",null,this.props.title),r.a.createElement("p",null,this.props.description),r.a.createElement("div",{className:"line-chart-container"},r.a.createElement("canvas",{ref:this.chartRef})))}}]),a}(r.a.Component),N=a(27),C=a.n(N),S=function(){function e(t){Object(c.a)(this,e),this.token=t}return Object(o.a)(e,[{key:"getUserFavorites",value:function(){var e=Object(j.a)(k.a.mark((function e(t,a){var n,r,s,i=arguments;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>2&&void 0!==i[2]?i[2]:20,r="https://api.spotify.com/v1/me/top/".concat(t),e.next=4,C.a.get(r,{headers:{Authorization:"Bearer ".concat(this.token)},params:{time_range:a,limit:n}});case 4:return s=e.sent,e.abrupt("return",s.data.items);case 6:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"searchForPlaylist",value:function(){var e=Object(j.a)(k.a.mark((function e(t,a){var n,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.spotify.com/v1/search",e.next=3,C.a.get("https://api.spotify.com/v1/search",{headers:{Authorization:"Bearer ".concat(this.token)},params:{q:t.join("%20"),type:"playlist",limit:"10"}});case 3:return n=e.sent,r=n.data.playlists.items.filter((function(e){var n=!0;return t.forEach((function(t){n=n&&e.name.toLowerCase().includes(t.toLowerCase())})),n&&e.owner.display_name.toLowerCase().includes(a.toLowerCase())})),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getPlaylist",value:function(){var e=Object(j.a)(k.a.mark((function e(t){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.spotify.com/v1/playlists/",e.next=3,C.a.get("".concat("https://api.spotify.com/v1/playlists/").concat(t),{headers:{Authorization:"Bearer ".concat(this.token)},params:{fields:"name,tracks.items(track)"}});case 3:return a=e.sent,e.abrupt("return",{name:a.data.name,tracks:a.data.tracks.items});case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getRecentTracks",value:function(){var e=Object(j.a)(k.a.mark((function e(){var t;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.spotify.com/v1/me/player/recently-played",e.next=3,C.a.get("https://api.spotify.com/v1/me/player/recently-played",{headers:{Authorization:"Bearer ".concat(this.token)},params:{limit:50}});case 3:return t=e.sent,e.abrupt("return",t.data.items);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getTrackFeatures",value:function(){var e=Object(j.a)(k.a.mark((function e(t,a){var n,r,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],t.forEach((function(e){n.push(e.track.id)})),"https://api.spotify.com/v1/audio-features",e.next=5,C.a.get("https://api.spotify.com/v1/audio-features",{headers:{Authorization:"Bearer ".concat(this.token)},params:{ids:n.join()}});case 5:return r=e.sent,s=[],r.data.audio_features.forEach((function(e){var n={};a.forEach((function(a){if("popularity"===a){var r=t.find((function(t){return t.track.id===e.id}));n[a]=r.track.popularity}else Object.keys(e).includes(a)&&(n[a]=e[a])})),s.push(n)})),e.abrupt("return",s);case 9:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()}]),e}(),L=a(15),T=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={token:n.props.token,data:[],features:[],isLoading:!0},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(k.a.mark((function e(){var t,a,n,r,s,i=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S(this.props.token),a=["id","acousticness","danceability","energy","valence"],e.next=4,t.searchForPlaylist(["Your Top Songs"],"Spotify");case 4:return n=e.sent,e.next=7,Promise.all(n.map(function(){var e=Object(j.a)(k.a.mark((function e(n){var r,s,c,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(19!==n.name.length){e.next=11;break}return e.next=3,t.getPlaylist(n.id);case 3:return r=e.sent,s=r.name.split(" ").pop(),c={year:s,tracks:r.tracks},i.setState({data:[].concat(Object(E.a)(i.state.data),[c])}),e.next=9,t.getTrackFeatures(c.tracks,a);case 9:o=e.sent,i.computeFeatures(s,o);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 7:return e.next=9,t.getUserFavorites("tracks","medium_term",50);case 9:return r=(r=e.sent).map((function(e){return{track:e}})),e.next=13,t.getTrackFeatures(r,a);case 13:s=e.sent,this.computeFeatures("2020",s),this.createGraphData();case 16:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"computeFeatures",value:function(e,t){var a={acousticness:0,danceability:0,energy:0,valence:0};for(var n in t.forEach((function(e){for(var t in e)"id"!==t&&(a[t]+=e[t])})),a)a[n]=Math.round(100*(100*a[n]/t.length+Number.EPSILON))/100;this.setState({features:[].concat(Object(E.a)(this.state.features),[{year:e,averages:a}])})}},{key:"createGraphData",value:function(){var e={acousticness:[],danceability:[],energy:[],valence:[]},t=[].concat(this.state.features).sort((function(e,t){return e.year.localeCompare(t.year)}));for(var a in t.forEach((function(t){for(var a in t.averages)e[a].push(t.averages[a])})),e)for(;e[a].length<5;)e[a].unshift(null);var n={},r={acousticness:[15.88,16.63,19.57,22.16,21.39],danceability:[63.25,69.68,71.65,71.38,71.99],energy:[67.24,66.07,65.91,64.06,65.05],valence:[45.15,51.7,48.44,54.6,53.1]},s={acousticness:[28.03,28.99,27.19,28.93,24.74],danceability:[60,61.23,66.5,64.42,67.31],energy:[59.29,58.67,59.06,57.88,61.19],valence:[43.08,41.45,44.71,46.59,48.28]};for(var i in e)n[i]={labels:["2016","2017","2018","2019","2020"],datasets:[{data:e[i],label:"Your Top Songs",fill:!0,borderColor:"rgba(29,185,84,1)",backgroundColor:"rgba(29,185,84,0.4)",spanGaps:!1},{data:s[i],label:"Average Song",fill:!1,borderColor:"rgba(255, 255, 255, 0.9)"},{data:r[i],label:"Top Spotify Songs",fill:!1,borderColor:"rgba(255,99,132,1)"}]};this.setState({formattedData:n,isLoading:!1}),this.props.load()}},{key:"render",value:function(){var e="Describes the musical positiveness conveyed by a track. Tracks with high valence sound more positive, while tracks with low valence sound more negative.",t="Describes how suitable a track is for dancing based on a combination of musical elements.",a="Represents a perceptual measure of intensity and activity based on dynamic range, general entropy, etc.",n="A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic.";return!this.state.isLoading&&r.a.createElement("div",null,r.a.createElement(v.a,{fluid:"lg"},r.a.createElement("header",null,"Your Vibe"),r.a.createElement(L.a,{className:"mt-4 mb-4"},r.a.createElement(f.a,{md:6,className:"mt-4 mb-4"},r.a.createElement(w,{title:"Valence (Happiness)",description:e,data:this.state.formattedData.valence})),r.a.createElement(f.a,{md:6,className:"mt-4 mb-4"},r.a.createElement(w,{title:"Danceability",description:t,data:this.state.formattedData.danceability}))),r.a.createElement(L.a,{className:"mb-4"},r.a.createElement(f.a,{md:6,className:"mt-4 mb-4"},r.a.createElement(w,{title:"Energy",description:a,data:this.state.formattedData.energy})),r.a.createElement(f.a,{md:6,className:"mt-4 mb-4"},r.a.createElement(w,{title:"Acousticness",description:n,data:this.state.formattedData.acousticness})))),r.a.createElement("hr",null))}}]),a}(r.a.Component),I=(a(116),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){for(var e,t,a=this.props.score,n=[0,30,50,70,90,100],s=["Hipster","Eccentric","Trendy","Mainstream","Basic"],i=["\ud83e\uddd0","\ud83e\udd14","\ud83d\ude0e","\ud83e\udd29","\ud83d\udc81\u200d\u2640\ufe0f"],c=0;c<n.length-1;c++){if(a>=n[c]&&a<n[c+1]){e=s[c],t=i[c];break}}return r.a.createElement(f.a,{className:"d-flex flex-column justify-content-center h-100"},r.a.createElement("svg",{viewBox:"0 0 36 36",className:"circular-chart green"},r.a.createElement("path",{className:"circle-bg",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("path",{className:"circle",strokeDasharray:"60, 100",d:"M18 2.0845\r a 15.9155 15.9155 0 0 1 0 31.831\r a 15.9155 15.9155 0 0 1 0 -31.831"}),r.a.createElement("text",{x:"50%",y:"50%",textAnchor:"middle",dy:".35em",className:"percentage"},Math.round(a))),r.a.createElement("h3",null,"Popularity Score: ","".concat(e," ").concat(t)))}}]),a}(n.Component));O.a.defaults.global.defaultFontColor="white";var R=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).chartRef=r.a.createRef(),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){for(var e=this.props.data,t={labels:[],data:[]},a=0;a<e.length&&a<10;a++)t.labels.push(e[a].key),t.data.push(e[a].value);if(e.length>=10){for(var n=0,r=10;r<e.length;r++)n+=e[r].value;t.labels.push("Other"),t.data.push(n)}var s=t.data.reduce((function(e,t){return e+t}),0);t.data=t.data.map((function(e){return Math.round(e/s*100)})),new O.a(this.chartRef.current,{type:"doughnut",data:{labels:t.labels,datasets:[{label:"Genres",backgroundColor:["rgba(255, 221, 0, 0.8)","rgba(255, 200, 0, 0.8)","rgba(255,166,0, 0.8)","rgba(255,124,67, 0.8)","rgba(249,93,106, 0.8)","rgba(212,80,135, 0.8)","rgba(160,81,149, 0.8)","rgba(102,81,145, 0.8)","rgba(47,75,124, 0.8)","rgba(29, 52, 130, 0.8)","rgba(10, 36, 66, 0.8)"],borderColor:["rgba(255, 221, 0, 1)","rgba(255, 200, 0, 1)","rgba(255,166,0, 1)","rgba(255,124,67, 1)","rgba(249,93,106, 1)","rgba(212,80,135, 1)","rgba(160,81,149, 1)","rgba(102,81,145, 1)","rgba(47,75,124, 1)","rgba(29, 52, 130, 1)","rgba(10, 36, 66, 1)"],data:t.data}]},options:{legend:{position:"bottom"},responsive:!0,maintainAspectRatio:!1,tooltips:{callbacks:{label:function(e,t){return t.labels[e.index]+": "+t.datasets[0].data[e.index]+"%"}}}}})}},{key:"render",value:function(){return r.a.createElement("div",{className:"doughnut-chart-container"},r.a.createElement("canvas",{ref:this.chartRef}))}}]),a}(r.a.Component),D=a(49),P=a(51),F=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e,t,a=this.props,n=a.percent,s=a.descriptions,i=a.emojis,c="";if(n<0?(e=r.a.createElement(D.a,{icon:P.a,size:"lg",color:"red",style:{marginRight:"0.5em"}}),c=s[0]):0===n?c=s[1]:(e=r.a.createElement(D.a,{icon:P.b,size:"lg",color:"rgba(73, 209, 0, 1)",style:{marginRight:"0.5em"}}),c=s[2]),n>100)t=i[i.length-1];else if(n<-100)t=i[0];else{var o=200/i.length;t=i[Math.floor((n+100)/o)]}return r.a.createElement("div",{className:"mb-3"},r.a.createElement("span",{className:"emoji"}," ",t," "),r.a.createElement(L.a,{className:"d-flex flex-direction-column justify-content-center align-items-center"},e,r.a.createElement("h2",null,Math.abs(n),"%")),r.a.createElement("h5",null,c))}}]),a}(n.Component);function M(e){var t=e.percentages,a=t.valence,n=t.danceability,s=t.energy,i=t.acousticness;return r.a.createElement(L.a,null,r.a.createElement("hr",null),r.a.createElement(f.a,{md:3},r.a.createElement(F,{percent:a,descriptions:["Less happy","Same hapiness","Happier"],emojis:["\ud83d\ude2d","\ud83d\ude22","\ud83d\ude15","\ud83d\ude03","\ud83d\ude01","\ud83d\ude0a"]})),r.a.createElement(f.a,{md:3},r.a.createElement(F,{percent:n,descriptions:["Less danceable","Same danceability","More danceable"],emojis:["\ud83d\udc83"]})),r.a.createElement(f.a,{md:3},r.a.createElement(F,{percent:s,descriptions:["Less energetic","Same energy","More energetic"],emojis:["\ud83d\ude34","\u26a1\ufe0f","\ud83d\udd25"]})),r.a.createElement(f.a,{md:3},r.a.createElement(F,{percent:i,descriptions:["Less acoustic","Same acousticness","More acoustic"],emojis:["\ud83c\udfb8","\ud83c\udfbb"]})),r.a.createElement("hr",null))}var _=a(31),A=a(146),B=a(86),H=a(145),U=a(85),z=a(71),G=(a(121),a(54));function W(e){var t=e.images.map((function(e){return r.a.createElement(G.a.Item,{key:e.key},r.a.createElement("img",{src:e.url,alt:"album cover"}))}));return r.a.createElement(G.a,{indicators:!1,controls:!1,fade:!1,interval:e.pause?null:5e3,onSelect:function(t){return e.handleSlide(t)},activeIndex:e.activeIndex},t)}var Y=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.title,n=e.color,s=e.tooltip,i=Object(B.a)({overrides:{MuiSlider:{thumb:{width:"15px",height:"15px"},track:{height:"5px"},rail:{height:"5px",color:"#b1b1b1"}}}});return r.a.createElement("div",null,r.a.createElement("span",{className:"slider-title"},r.a.createElement(U.a,{placement:"right",overlay:function(e){return r.a.createElement(z.a,e,s)}},r.a.createElement("span",{className:"slider-name"},a)),r.a.createElement("span",{className:"slider-value"},t)),r.a.createElement(H.a,{theme:i},r.a.createElement(A.a,{className:"slider--".concat(n),value:t,valueLabelDisplay:"auto"})))}}]),a}(n.Component),q=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.track,t=["yellow","orange","red","purple","blue","light-blue","aqua","green"],a=["Based on the total number of plays the track has had and how recent those plays are","Describes the musical positiveness conveyed by a track","Describes how suitable a track is for dancing based on tempo, rhythm, beat, etc.","Represents a perceptual measure of intensity and activity","A confidence measure from 0.0 to 1.0 of whether the track is acoustic","Detects the presence of an audience in the recording","Speechiness detects the presence of spoken words in a track","Predicts whether a track contains no vocals"],n=[],s=0;for(var i in e.features){var c=e.features[i];"popularity"!==i&&(c=Math.round(100*c));var o=i.charAt(0).toUpperCase()+i.slice(1);"Valence"===o&&(o="Happiness"),n.push(r.a.createElement(Y,{key:"".concat(i,"-slider"),title:o,value:c,color:t[s%t.length],tooltip:a[s]})),s++}return r.a.createElement(f.a,{className:"d-flex flex-column h-100 justify-content-between p-0"},n)}}]),a}(n.Component),V=a(87),J=(a(68),a(69),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={trackIsPlaying:!1},n}return Object(o.a)(a,[{key:"handlePlayPause",value:function(e){"play"===e.type?this.setState({trackIsPlaying:!0}):"pause"===e.type&&this.setState({trackIsPlaying:!1})}},{key:"handleEnded",value:function(e){this.props.nextSlide(e),this.setState({trackIsPlaying:!0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(W,{images:this.props.trackImages,handleSlide:this.props.handleSlide,pause:this.state.trackIsPlaying,activeIndex:this.props.currentIndex}),r.a.createElement(V.a,{autoPlay:this.state.trackIsPlaying,src:this.props.currentTrack.previewURL,onPlay:function(t){return e.handlePlayPause(t)},onPause:function(t){return e.handlePlayPause(t)},onClickPrevious:function(t){return e.props.previousSlide(t)},onClickNext:function(t){return e.props.nextSlide(t)},onEnded:function(t){return e.handleEnded(t)},showFilledProgress:!1,showDownloadProgress:!1,showSkipControls:!0,showJumpControls:!1,customProgressBarSection:[],volume:.2,autoPlayAfterSrcChange:this.state.trackIsPlaying}))}}]),a}(n.Component)),K=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={currentTrack:n.props.tracks[0],currentIndex:0},n.handleSlide=n.handleSlide.bind(Object(_.a)(n)),n.nextSlide=n.nextSlide.bind(Object(_.a)(n)),n.previousSlide=n.previousSlide.bind(Object(_.a)(n)),n}return Object(o.a)(a,[{key:"handleSlide",value:function(e){this.setState({currentIndex:e,currentTrack:this.props.tracks[e]})}},{key:"nextSlide",value:function(){var e=(this.state.currentIndex+1)%this.props.tracks.length;this.setState({currentIndex:e,currentTrack:this.props.tracks[e]})}},{key:"previousSlide",value:function(){var e=0===this.state.index?this.props.tracks.length-1:--this.state.index;this.setState({currentIndex:e,currentTrack:this.props.tracks[e]})}},{key:"render",value:function(){var e=this.props.tracks.map((function(e){return{key:e.id,url:e.image}}));return r.a.createElement("div",null,r.a.createElement("div",{style:{minHeight:"5em"}},r.a.createElement("h4",null,this.state.currentTrack.name),r.a.createElement("h6",null,this.state.currentTrack.artist)),r.a.createElement(L.a,{className:"d-flex justify-content-center mt-2"},r.a.createElement(f.a,{md:{span:6,order:2},className:"d-flex flex-column justify-content-center h-100"},r.a.createElement(J,{trackImages:e,handleSlide:this.handleSlide,currentTrack:this.state.currentTrack,currentIndex:this.state.currentIndex,nextSlide:this.nextSlide,previousSlide:this.previousSlide})),r.a.createElement(f.a,{md:{span:6,order:1}},r.a.createElement(q,{track:this.state.currentTrack}))))}}]),a}(n.Component),Q=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={isLoading:!0,percentages:{},popularity:0,trackImages:[],uniqueRecentTracks:[]},n}return Object(o.a)(a,[{key:"averageFeatures",value:function(e){var t={};for(var a in e.forEach((function(e){for(var a in e)"id"!==a&&(t[a]?t[a]+=e[a]:t[a]=e[a])})),t)t[a]=t[a]/e.length;return t}},{key:"calculatePercentDifferences",value:function(e,t){var a={};for(var n in e){var r=Math.round((t[n]-e[n])/e[n]*100);a[n]=r}return a}},{key:"getGenres",value:function(){var e=Object(j.a)(k.a.mark((function e(t){var a,n,r,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],t.forEach((function(e){a.push(e.track.artists[0].id)})),"https://api.spotify.com/v1/artists",e.next=5,C.a.get("https://api.spotify.com/v1/artists",{headers:{Authorization:"Bearer ".concat(this.props.token)},params:{ids:a.join()}});case 5:return n=e.sent,r=new Map,n.data.artists.forEach((function(e){var t=e.genres[0];t&&r.get(t)?r.set(t,r.get(t)+1):r.set(t,1)})),s=[],r.forEach((function(e,t){s.push({key:t,value:e})})),s.sort((function(e,t){return t.value-e.value})),e.abrupt("return",s);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(j.a)(k.a.mark((function e(){var t,a,n,r,s,i,c,o,l,u,p,m,d,h,f,v,b,g,y,E,j,x,O,w,N,C,L;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new S(this.props.token),a=["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence","popularity"],e.next=5,t.getRecentTracks();case 5:return n=e.sent,e.next=8,t.getTrackFeatures(n,a);case 8:for(r=e.sent,s=this.averageFeatures(r),i=[],c=0;c<n.length;c++)({}),l=n[c].track,u=r[c],p=u.popularity,m=u.valence,d=u.danceability,h=u.energy,f=u.acousticness,v=u.liveness,b=u.speechiness,g=u.instrumentalness,o={id:l.id,name:l.name,artist:l.artists[0].name,image:l.album.images[0].url,previewURL:l.preview_url,features:{popularity:p,valence:m,danceability:d,energy:h,acousticness:f,liveness:v,speechiness:b,instrumentalness:g}},i.push(o);return y=Array.from(new Set(i.map((function(e){return e.id})))).map((function(e){return i.find((function(t){return t.id===e}))})),e.next=15,this.getGenres(n);case 15:return E=e.sent,e.next=18,t.searchForPlaylist(["Today's top hits"],"Spotify");case 18:return j=e.sent,x=j[0].id,e.next=22,t.getPlaylist(x);case 22:return O=e.sent,a=["acousticness","danceability","energy","valence","popularity"],e.next=26,t.getTrackFeatures(O.tracks,a);case 26:w=e.sent,N=this.averageFeatures(w),C=this.calculatePercentDifferences(N,s),L=s.popularity,this.setState({uniqueRecentTracks:y,percentages:C,popularity:L,genres:E,isLoading:!1}),this.props.load(),e.next=38;break;case 34:e.prev=34,e.t0=e.catch(0),console.log(e.t0),e.t0.response&&401===e.t0.response.status&&this.props.handleTimeout();case 38:case"end":return e.stop()}}),e,this,[[0,34]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.isLoading?null:r.a.createElement("div",null,r.a.createElement(v.a,{fluid:!0,className:" d-flex flex-column mood-top-section"},r.a.createElement("header",null,"Your Mood"),r.a.createElement("h2",null,"How do your recent songs compare to today's top hits?"),r.a.createElement(I,{score:this.state.popularity}),r.a.createElement(M,{percentages:this.state.percentages})),r.a.createElement(v.a,{className:"mb-4 mt-2"},r.a.createElement(K,{tracks:this.state.uniqueRecentTracks})),r.a.createElement("hr",null),r.a.createElement(v.a,{fluid:!0,className:" d-flex flex-column",style:{minHeight:"90vh"}},r.a.createElement(L.a,null,r.a.createElement(f.a,{className:"justify-content-center"},r.a.createElement("h2",null,"Your Recent Genres"),r.a.createElement(R,{data:this.state.genres})))),r.a.createElement("hr",null))}}]),a}(n.Component),X=a(84),Z=a.n(X);function $(){return r.a.createElement("div",{style:{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},r.a.createElement("img",{src:Z.a,style:{maxHeight:"40vh",maxWidth:"80vw"},alt:"Cassette spinning loading animation"}),r.a.createElement("h1",null,"Loading your vibe..."))}var ee=a(52);a(125);var te=function(e){var t=e.type,a=e.position,n=e.title,s=e.subtitle,i=e.searchTerm,c=e.image,o=e.previewURL,l=-1===n.toLowerCase().indexOf(i),u=-1===s.toLowerCase().indexOf(i);if(l&&u)return null;var p=r.a.createElement("div",{className:"result-item"},r.a.createElement("span",{className:"order-number"},a),r.a.createElement("span",{className:"result-info"},r.a.createElement("span",{className:"result-cover",style:{backgroundImage:"url(".concat(c,")")}}),r.a.createElement("span",{className:"result-summary"},r.a.createElement("span",{className:"result-artist"},s),r.a.createElement("span",{className:"result-name"},n))));return"track"===t?r.a.createElement("div",{onClick:function(){return e.playTrack(o)}},p):r.a.createElement("div",null,p)},ae=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"playTrack",value:function(e){var t=document.querySelector("audio");t?(t.paused?t.play():t.pause(),t.src!==e&&(t.currentTime=0,t.src=e,t.play())):((t=new Audio(e)).volume=.25,document.getElementById("result-table").append(t),t.play())}},{key:"render",value:function(){var e,t=this;return e="tracks"===this.props.topType?this.props.data.map((function(e,a){return r.a.createElement(te,{type:"track",position:a+1,key:e.id,title:e.name,subtitle:e.artists[0].name,image:e.album.images[0].url,previewURL:e.preview_url,searchTerm:t.props.searchTerm,playTrack:t.playTrack})})):this.props.data.map((function(e,a){return r.a.createElement(te,{type:"artist",position:a+1,key:e.id,title:e.name,subtitle:e.genres.join(", "),image:e.images[0].url,searchTerm:t.props.searchTerm})})),r.a.createElement("div",{id:"result-table"},e||r.a.createElement("h3",{className:"no-results",style:{alignSelf:"center"}},"No Results"))}}]),a}(r.a.Component),ne=a(53),re=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return this.props.isLoggedIn?null:r.a.createElement("div",null,r.a.createElement(L.a,{className:"d-flex justify-content-between p-4"},r.a.createElement(f.a,{md:4,className:"mb-4"},r.a.createElement("input",{className:"search-field",name:"searchTerm",value:this.props.searchTerm,type:"text",placeholder:"Search",onChange:function(t){return e.props.handleChange(t)}})),r.a.createElement(f.a,{md:4,className:"mb-4"},r.a.createElement(ne.a,null,r.a.createElement(d.a,{variant:"outline-success",className:"short_term"===this.props.timeRange&&"active",type:"radio",name:"timeRange",value:"short_term",onClick:function(t){return e.props.handleChange(t)},checked:"short_term"===this.props.time_range,defaultChecked:!0},"Last Month"),r.a.createElement(d.a,{variant:"outline-success",className:"medium_term"===this.props.timeRange&&"active",type:"radio",name:"timeRange",value:"medium_term",onClick:function(t){return e.props.handleChange(t)},checked:"medium_term"===this.props.timeRange},"Last 6 Months"),r.a.createElement(d.a,{variant:"outline-success",className:"long_term"===this.props.timeRange&&"active",type:"radio",name:"timeRange",value:"long_term",onClick:function(t){return e.props.handleChange(t)},checked:"long_term"===this.props.timeRange},"All Time"))),r.a.createElement(f.a,{md:4,className:"mb-4"},r.a.createElement(ne.a,null,r.a.createElement(d.a,{variant:"outline-success",className:"tracks"===this.props.topType&&"active",type:"radio",name:"topType",value:"tracks",onClick:function(t){return e.props.handleChange(t)},checked:"tracks"===this.props.topType,defaultChecked:!0},"Tracks"),r.a.createElement(d.a,{variant:"outline-success",className:"artists"===this.props.topType&&"active",type:"radio",name:"topType",value:"artists",onClick:function(t){return e.props.handleChange(t)},checked:"artists"===this.props.topType,defaultChecked:!0},"Artists")))))}}]),a}(r.a.Component),se=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleChange=function(){var e=Object(j.a)(k.a.mark((function e(t){var a,r,s,i,c,o,l;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target,r=a.name,s=a.value,i=a.type,c=a.checked,"topType"===r&&n.setState({data:[]}),e.next=4,i;case 4:if(e.t0=e.sent,"checkbox"!==e.t0){e.next=9;break}n.setState(Object(ee.a)({},r,c)),e.next=10;break;case 9:n.setState(Object(ee.a)({},r,s));case 10:return o=new S(n.props.token),e.next=13,o.getUserFavorites(n.state.topType,n.state.timeRange,50);case 13:l=e.sent,n.setState({data:l,isLoading:!1});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={isLoading:!0,data:[],timeRange:"short_term",searchTerm:"",topType:"tracks"},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(k.a.mark((function e(){var t,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S(this.props.token),e.next=3,t.getUserFavorites(this.state.topType,this.state.timeRange,50);case 3:a=e.sent,this.setState({data:a,isLoading:!1}),this.props.load();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.isLoading?null:r.a.createElement("div",null,r.a.createElement("header",null,"Your Favorites"),r.a.createElement(re,{handleChange:this.handleChange,timeRange:this.state.timeRange,topType:this.state.topType}),r.a.createElement(ae,{topType:this.state.topType,data:this.state.data,searchTerm:this.state.searchTerm}))}}]),a}(r.a.Component),ie=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={isLoading:!0,moodDashboardIsLoading:!0,vibeDashboardIsLoading:!0,favoritesDisplayIsLoading:!0},n}return Object(o.a)(a,[{key:"updateLoadingStatus",value:function(){this.state.moodDashboardIsLoading||this.state.vibeDashboardIsLoading||this.state.favoritesDisplayIsLoading||this.setState({isLoading:!1})}},{key:"loadMoodDashboard",value:function(){this.setState({moodDashboardIsLoading:!1}),this.updateLoadingStatus()}},{key:"loadVibeDashboard",value:function(){this.setState({vibeDashboardIsLoading:!1}),this.updateLoadingStatus()}},{key:"loadFavorites",value:function(){this.setState({favoritesDisplayIsLoading:!1}),this.updateLoadingStatus()}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,this.state.isLoading&&r.a.createElement($,null),r.a.createElement(v.a,{fluid:"lg"},r.a.createElement(Q,{token:this.props.token,load:function(){return e.loadMoodDashboard()},handleTimeout:function(){return e.props.handleTimeout()}}),r.a.createElement(T,{token:this.props.token,load:function(){return e.loadVibeDashboard()}}),r.a.createElement(se,{token:this.props.token,load:function(){return e.loadFavorites()}})))}}]),a}(r.a.Component),ce=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={isLoggedIn:!1,token:null},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=p.access_token;e&&this.setState({token:e})}},{key:"handleLogin",value:function(){window.location.replace(m),this.setState({isLoggedIn:!0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},!this.state.token&&r.a.createElement(g,{isLoggedIn:this.state.isLoggedIn,handleLogin:function(){return e.handleLogin()}}),this.state.token&&r.a.createElement(ie,{token:this.state.token,handleTimeout:function(){return e.handleLogin()}}))}}]),a}(r.a.Component);i.a.render(r.a.createElement(ce,null),document.getElementById("root"))},69:function(e,t,a){},84:function(e,t,a){e.exports=a.p+"static/media/cassette.f720df37.gif"},88:function(e,t,a){e.exports=a(126)},94:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){}},[[88,1,2]]]);
//# sourceMappingURL=main.6f191d5f.chunk.js.map