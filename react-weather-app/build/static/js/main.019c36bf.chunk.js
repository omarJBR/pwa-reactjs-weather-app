(this["webpackJsonpreact-weather-app"]=this["webpackJsonpreact-weather-app"]||[]).push([[0],{33:function(e,t,a){e.exports=a(62)},38:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),o=a.n(l),i=(a(38),a(12)),s=a(2);var c=Object(s.e)((function(){return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg"},r.a.createElement("a",{className:"nav navbar-brand"},"Weather App")))})),m=a(29),d=a(30),u=a(32),p=a(31),h=a(15),y=a.n(h),v=a(16),f=a.n(v),g=a(1),E=a.n(g),b=a(10),w=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).country="",e.daily_highchart_options={chart:{type:"area",backgroundColor:"none",height:250,color:"white"},title:{text:""},xAxis:{categories:[]},yAxis:{title:{text:""}},plotOptions:{area:{dataLabels:{enabled:!0},enableMouseTracking:!1}},tooltip:{valueSuffix:" \xb0C"},series:[{name:"",data:[]}]},e.hourly_highchart_options={chart:{type:"area",backgroundColor:"none",height:250,color:"white"},title:{text:""},xAxis:{categories:[]},yAxis:{title:{text:""}},plotOptions:{area:{dataLabels:{enabled:!0},enableMouseTracking:!1}},tooltip:{valueSuffix:" \xb0C"},series:[{name:"",data:[]}]},e.state={apidata:{},timezon:"",daily_temps:[],daily_times:[],hourly_temps:[],hourly_times:[],meet:Float32Array,feet:Float32Array,lat:Float32Array,lon:Float32Array,isLoaded:!1,error:null},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.state.lat=this.props.match.params.lat,this.state.lon=this.props.match.params.lon,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:31.963158,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:35.930359;return y.a.get("https://weather-api-backend.herokuapp.com/weather-data/"+e+"/"+t).then((function(e){return e.data}))}(this.state.lat,this.state.lon).then((function(t){e.setState({apidata:t,isLoaded:!0});for(var a=0;a<=23;a+=3)e.state.daily_temps.push(Math.round((t.hourly.data[a].temperature-32)*(5/9))),e.state.daily_times.push(new Date(1e3*t.hourly.data[a].time).toTimeString().slice(0,2));for(a=0;a<=23;a++)e.state.hourly_temps.push(Math.round((t.hourly.data[a].temperature-32)*(5/9))),e.state.hourly_times.push(new Date(1e3*t.hourly.data[a].time).toTimeString().slice(0,2));e.daily_highchart_options.xAxis.categories=e.state.daily_times,e.daily_highchart_options.series[0].data=e.state.daily_temps,e.hourly_highchart_options.xAxis.categories=e.state.hourly_times,e.hourly_highchart_options.series[0].data=e.state.hourly_temps,f.a.chart("daily-container",e.daily_highchart_options),f.a.chart("hourly-container",e.hourly_highchart_options),E()(".highcharts-yaxis-grid,.highcharts-yaxis-labels,.highcharts-legend-item,.highcharts-credits,.highcharts-axis-line").css("display","none"),E()(".highcharts-text-outline,.highcharts-graph").css("stroke","none"),E()(".highcharts-area").css("fill","#c0c0c087"),E()(".highcharts-point").css("fill","#e2dfdf"),E()("text").css("fill","white"),31.963158==e.props.match.params.lat||void 0===e.props.match.params.lat?e.country="Amman":29.531919==e.props.match.params.lat?e.country="Aqaba":32.551445==e.props.match.params.lat?e.country="Irbid":32.332687==e.props.match.params.lat?e.country="Ajloun":32.280818==e.props.match.params.lat?e.country="Jerash":32.342891==e.props.match.params.lat?e.country="Al Mafraq":e.country=""+t.timezone,E()(".name-of-country").html(""+e.country),E()("title").html("Weather App | "+e.country)}),(function(t){e.setState({isLoaded:!1,error:t})}))}},{key:"show_daily",value:function(){E()("#daily-container").css("display","block"),E()("#hourly-container").css("display","none"),E()(".hourly-btn").removeClass(" active-summary"),E()(".daily-btn").addClass(" active-summary")}},{key:"show_hourly",value:function(){E()("#daily-container").css("display","none"),E()("#hourly-container").css("display","block"),E()(".hourly-btn").addClass(" active-summary"),E()(".daily-btn").removeClass(" active-summary")}},{key:"get_elevation",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.state.lat=t.coords.latitude,e.state.lon=t.coords.longitude,e.elevation_data(e.state.lat,e.state.lon)}))}},{key:"elevation_data",value:function(e,t){var a,n,r=this;E()(".get-elevation-btn").attr({disabled:"disabled",title:"reload page"}),E()(".get-elevation-btn").css({cursor:"not-allowed",opacity:"0.5"}),E()(".load-circle,.loading-data").css("display","block"),document.body.scrollTop=1200,document.documentElement.scrollTop=1200,(a=e,n=t,y.a.get("https://weather-api-backend.herokuapp.com/elevation-data/"+a+"/"+n).then((function(e){return e.data}))).then((function(e){setTimeout((function(){E()(".load-circle,.loading-data").css("display","none"),E()(".elev-data").css("display","block"),r.apidata=e,r.state.meet=Math.round(r.apidata.elevations[0].elevation),r.state.feet=3.28*r.apidata.elevations[0].elevation,E()(".altitude-value").html(Math.round(r.apidata.elevations[0].elevation)+" Meter")}),2e3)}),(function(e){r.setState({isLoaded:!1,error:e})}))}},{key:"feet_to_meter",value:function(){var e=this.state.meet;E()(".altitude-value").hide(),E()(".meter-value").removeAttr("title"),E()(".feet-value").attr("title","Click here to feet value."),E()(".feet-or-meter-value").html(e+" Meter"),E()(".meter-value").css("color","silver"),E()(".feet-value").css("color","#c0c0c087")}},{key:"meter_to_feet",value:function(){var e=Math.round(this.state.feet);E()(".altitude-value").hide(),E()(".feet-value").removeAttr("title"),E()(".meter-value").attr("title","Click here to meter value."),E()(".feet-or-meter-value").html(e+" Feet"),E()(".feet-value").css("color","silver"),E()(".meter-value").css("color","#c0c0c087")}},{key:"get_current_position",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.lat=t.coords.latitude,e.lon=t.coords.longitude,window.location.replace("/"+e.lat+"/"+e.lon)}))}},{key:"get_map_location",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.lat=t.coords.latitude,e.lon=t.coords.longitude,E()(".get-map-btn").attr({disabled:"disabled",title:"reload page"}),E()(".get-map-btn").css({cursor:"not-allowed",opacity:"0.5"}),E()(".map-load-circle,.map-loading-data").css("display","block"),document.body.scrollTop=2200,document.documentElement.scrollTop=2200,setTimeout((function(){E()(".map-load-circle,.map-loading-data").css("display","none"),E()("#map").css("display","block"),document.body.scrollTop=2200,document.documentElement.scrollTop=2200;var t=b.map("map",{drawControl:!0}).setView([e.lat,e.lon],13);b.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}).addTo(t),b.marker([e.lat,e.lon]).bindPopup("<b>You are here.").addTo(t).openPopup()}),2e3)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.apidata,n=t.error,l=t.isLoaded;return n?r.a.createElement("div",null,"Error: ",n.message):l?r.a.createElement("div",{className:"weather-app-contents"},r.a.createElement("br",null),r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropdown-toggle","data-toggle":"dropdown"},r.a.createElement("span",{style:{marginLeft:"18px"},className:"name-of-country"})),r.a.createElement("i",{className:"fa fa-map-marker","aria-hidden":"true",onClick:function(){return e.get_current_position()},title:"Get the temperature at your specific location"}),r.a.createElement("div",{className:"dropdown-menu"},r.a.createElement("a",{className:"dropdown-item",href:"/31.963158/35.930359"},"Amman"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/29.531919/35.006084"},"Aqaba"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/32.551445/35.851479"},"Irbid"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/32.332687/35.751785"},"Ajloun"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/32.280818/35.899288"},"Jerash"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/32.342891/36.208038"},"Al Mafraq")))," ",r.a.createElement("br",null),r.a.createElement("div",{className:"elevation-and-map"},r.a.createElement("div",null,r.a.createElement("button",{type:"button",onClick:function(){return e.get_elevation()},className:"get-elevation-btn"},"Get your location's elevation"),r.a.createElement("p",{className:"load-circle"}),r.a.createElement("p",{className:"loading-data"},"Loading..."),r.a.createElement("div",{className:"elev-data",style:{display:"none"}},r.a.createElement("div",{className:"altitude"},r.a.createElement("span",{className:"your-altitude"},"Your location's altitude:"),r.a.createElement("br",null),r.a.createElement("span",{className:"altitude-value"}),r.a.createElement("span",{className:"feet-or-meter-value"})),r.a.createElement("div",{className:"meter-feet-btns"},r.a.createElement("span",{className:"meter-value",onClick:function(){return e.feet_to_meter()}},"m"),r.a.createElement("span",{title:"Click here to feet value.",onClick:function(){return e.meter_to_feet()},className:"feet-value"},"ft")))),r.a.createElement("div",null,r.a.createElement("button",{type:"button",onClick:function(){return e.get_map_location()},className:"get-map-btn"},"Get your location's at map"),r.a.createElement("p",{className:"map-load-circle"}),r.a.createElement("p",{className:"map-loading-data"},"Loading..."),r.a.createElement("div",{id:"map"}))),r.a.createElement("div",{className:"currently-temp"},r.a.createElement("div",null,r.a.createElement("span",{className:"temp"},Math.round((a.currently.temperature-32)*(5/9))),r.a.createElement("span",{className:"temp-unit"},"\xb0C")),r.a.createElement("div",{className:"feels-visibilty"},r.a.createElement("span",null,a.currently.summary),r.a.createElement("br",null),r.a.createElement("span",null,"Feels Like ",Math.round((a.currently.apparentTemperature-32)*(5/9)),"\xb0"),r.a.createElement("br",null),r.a.createElement("span",null,"Visibility ",Math.round(a.currently.visibility)," mi")),r.a.createElement("div",{className:"wind-humidity"},r.a.createElement("span",null,"Wind ",Math.round(a.currently.windSpeed)," mph"),r.a.createElement("br",null),r.a.createElement("span",null,"Humidity ",a.currently.humidity)),r.a.createElement("div",{className:"barometer-dewpoint"},r.a.createElement("span",null,"Barometer ",Math.round(a.currently.pressure)),r.a.createElement("br",null),r.a.createElement("span",null,"Dew Point ",Math.round(a.currently.dewPoint),"\xb0")),r.a.createElement("div",{className:"weather-summary",style:{display:"none"}},r.a.createElement("span",{style:{fontSize:"25px"}},a.currently.summary),r.a.createElement("br",null),r.a.createElement("span",null,Math.round(a.currently.windSpeed)," mph"),r.a.createElement("br",null))),r.a.createElement("div",{className:"six-days-temp"},a.daily.data.map((function(e){return r.a.createElement("div",{className:"day",key:a.daily.data.indexOf(e)},a.daily.data.indexOf(e)<=5&&r.a.createElement("div",{className:"day-contents"},r.a.createElement("span",{className:"day-name"},new Date(1e3*e.time).toDateString().slice(0,10)),r.a.createElement("br",null),r.a.createElement("span",null,"Hum: ",e.humidity),r.a.createElement("br",null),r.a.createElement("span",{className:"day-temp"},Math.round((e.temperatureHigh-32)*(5/9)),"\xb0"),r.a.createElement("br",null),r.a.createElement("span",{className:"night-temp"},Math.round((e.temperatureLow-32)*(5/9)),"\xb0")))}))),r.a.createElement("div",{className:"daily-hourly-temp"},r.a.createElement("div",{className:"change-summary"},r.a.createElement("button",{className:"daily-btn active-summary",onClick:function(){return e.show_daily()}},"DAILY SUMMARY"),r.a.createElement("button",{className:"hourly-btn",onClick:function(){return e.show_hourly()}},"HOURLY")),r.a.createElement("div",{className:"daily-summary"},r.a.createElement("div",{id:"daily-container"})),r.a.createElement("div",{className:"hourly-summary"},r.a.createElement("div",{id:"hourly-container",style:{display:"none"}})),r.a.createElement("div",{className:"data-source"},r.a.createElement("span",null,"Data from Dark Sky API")),r.a.createElement("br",null),r.a.createElement("br",null))):r.a.createElement("div",{className:"loading-page"},r.a.createElement("h2",null,"Loading..."))}}]),a}(n.Component);a(61);var N=function(){return r.a.createElement(i.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(c,null),r.a.createElement(s.a,{exact:!0,path:"/",component:w}),r.a.createElement(s.a,{exact:!0,path:"/:lat/:lon",component:w})))},k=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");k?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):_(t,e)}))}}()}},[[33,1,2]]]);