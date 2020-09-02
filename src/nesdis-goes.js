
// gif.js 0.2.0 - https://github.com/jnordberg/gif.js
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GIF=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}else{var err=new Error('Uncaught, unspecified "error" event. ('+er+")");err.context=er;throw err}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-- >0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length}return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],2:[function(require,module,exports){var UA,browser,mode,platform,ua;ua=navigator.userAgent.toLowerCase();platform=navigator.platform.toLowerCase();UA=ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0];mode=UA[1]==="ie"&&document.documentMode;browser={name:UA[1]==="version"?UA[3]:UA[1],version:mode||parseFloat(UA[1]==="opera"&&UA[4]?UA[4]:UA[2]),platform:{name:ua.match(/ip(?:ad|od|hone)/)?"ios":(ua.match(/(?:webos|android)/)||platform.match(/mac|win|linux/)||["other"])[0]}};browser[browser.name]=true;browser[browser.name+parseInt(browser.version,10)]=true;browser.platform[browser.platform.name]=true;module.exports=browser},{}],3:[function(require,module,exports){var EventEmitter,GIF,browser,extend=function(child,parent){for(var key in parent){if(hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child},hasProp={}.hasOwnProperty,indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},slice=[].slice;EventEmitter=require("events").EventEmitter;browser=require("./browser.coffee");GIF=function(superClass){var defaults,frameDefaults;extend(GIF,superClass);defaults={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:false,dither:false};frameDefaults={delay:500,copy:false};function GIF(options){var base,key,value;this.running=false;this.options={};this.frames=[];this.freeWorkers=[];this.activeWorkers=[];this.setOptions(options);for(key in defaults){value=defaults[key];if((base=this.options)[key]==null){base[key]=value}}}GIF.prototype.setOption=function(key,value){this.options[key]=value;if(this._canvas!=null&&(key==="width"||key==="height")){return this._canvas[key]=value}};GIF.prototype.setOptions=function(options){var key,results,value;results=[];for(key in options){if(!hasProp.call(options,key))continue;value=options[key];results.push(this.setOption(key,value))}return results};GIF.prototype.addFrame=function(image,options){var frame,key;if(options==null){options={}}frame={};frame.transparent=this.options.transparent;for(key in frameDefaults){frame[key]=options[key]||frameDefaults[key]}if(this.options.width==null){this.setOption("width",image.width)}if(this.options.height==null){this.setOption("height",image.height)}if(typeof ImageData!=="undefined"&&ImageData!==null&&image instanceof ImageData){frame.data=image.data}else if(typeof CanvasRenderingContext2D!=="undefined"&&CanvasRenderingContext2D!==null&&image instanceof CanvasRenderingContext2D||typeof WebGLRenderingContext!=="undefined"&&WebGLRenderingContext!==null&&image instanceof WebGLRenderingContext){if(options.copy){frame.data=this.getContextData(image)}else{frame.context=image}}else if(image.childNodes!=null){if(options.copy){frame.data=this.getImageData(image)}else{frame.image=image}}else{throw new Error("Invalid image")}return this.frames.push(frame)};GIF.prototype.render=function(){var i,j,numWorkers,ref;if(this.running){throw new Error("Already running")}if(this.options.width==null||this.options.height==null){throw new Error("Width and height must be set prior to rendering")}this.running=true;this.nextFrame=0;this.finishedFrames=0;this.imageParts=function(){var j,ref,results;results=[];for(i=j=0,ref=this.frames.length;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){results.push(null)}return results}.call(this);numWorkers=this.spawnWorkers();if(this.options.globalPalette===true){this.renderNextFrame()}else{for(i=j=0,ref=numWorkers;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){this.renderNextFrame()}}this.emit("start");return this.emit("progress",0)};GIF.prototype.abort=function(){var worker;while(true){worker=this.activeWorkers.shift();if(worker==null){break}this.log("killing active worker");worker.terminate()}this.running=false;return this.emit("abort")};GIF.prototype.spawnWorkers=function(){var j,numWorkers,ref,results;numWorkers=Math.min(this.options.workers,this.frames.length);(function(){results=[];for(var j=ref=this.freeWorkers.length;ref<=numWorkers?j<numWorkers:j>numWorkers;ref<=numWorkers?j++:j--){results.push(j)}return results}).apply(this).forEach(function(_this){return function(i){var worker;_this.log("spawning worker "+i);worker=new Worker(_this.options.workerScript);worker.onmessage=function(event){_this.activeWorkers.splice(_this.activeWorkers.indexOf(worker),1);_this.freeWorkers.push(worker);return _this.frameFinished(event.data)};return _this.freeWorkers.push(worker)}}(this));return numWorkers};GIF.prototype.frameFinished=function(frame){var i,j,ref;this.log("frame "+frame.index+" finished - "+this.activeWorkers.length+" active");this.finishedFrames++;this.emit("progress",this.finishedFrames/this.frames.length);this.imageParts[frame.index]=frame;if(this.options.globalPalette===true){this.options.globalPalette=frame.globalPalette;this.log("global palette analyzed");if(this.frames.length>2){for(i=j=1,ref=this.freeWorkers.length;1<=ref?j<ref:j>ref;i=1<=ref?++j:--j){this.renderNextFrame()}}}if(indexOf.call(this.imageParts,null)>=0){return this.renderNextFrame()}else{return this.finishRendering()}};GIF.prototype.finishRendering=function(){var data,frame,i,image,j,k,l,len,len1,len2,len3,offset,page,ref,ref1,ref2;len=0;ref=this.imageParts;for(j=0,len1=ref.length;j<len1;j++){frame=ref[j];len+=(frame.data.length-1)*frame.pageSize+frame.cursor}len+=frame.pageSize-frame.cursor;this.log("rendering finished - filesize "+Math.round(len/1e3)+"kb");data=new Uint8Array(len);offset=0;ref1=this.imageParts;for(k=0,len2=ref1.length;k<len2;k++){frame=ref1[k];ref2=frame.data;for(i=l=0,len3=ref2.length;l<len3;i=++l){page=ref2[i];data.set(page,offset);if(i===frame.data.length-1){offset+=frame.cursor}else{offset+=frame.pageSize}}}image=new Blob([data],{type:"image/gif"});return this.emit("finished",image,data)};GIF.prototype.renderNextFrame=function(){var frame,task,worker;if(this.freeWorkers.length===0){throw new Error("No free workers")}if(this.nextFrame>=this.frames.length){return}frame=this.frames[this.nextFrame++];worker=this.freeWorkers.shift();task=this.getTask(frame);this.log("starting frame "+(task.index+1)+" of "+this.frames.length);this.activeWorkers.push(worker);return worker.postMessage(task)};GIF.prototype.getContextData=function(ctx){return ctx.getImageData(0,0,this.options.width,this.options.height).data};GIF.prototype.getImageData=function(image){var ctx;if(this._canvas==null){this._canvas=document.createElement("canvas");this._canvas.width=this.options.width;this._canvas.height=this.options.height}ctx=this._canvas.getContext("2d");ctx.setFill=this.options.background;ctx.fillRect(0,0,this.options.width,this.options.height);ctx.drawImage(image,0,0);return this.getContextData(ctx)};GIF.prototype.getTask=function(frame){var index,task;index=this.frames.indexOf(frame);task={index:index,last:index===this.frames.length-1,delay:frame.delay,transparent:frame.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:browser.name==="chrome"};if(frame.data!=null){task.data=frame.data}else if(frame.context!=null){task.data=this.getContextData(frame.context)}else if(frame.image!=null){task.data=this.getImageData(frame.image)}else{throw new Error("Invalid frame")}return task};GIF.prototype.log=function(){var args;args=1<=arguments.length?slice.call(arguments,0):[];if(!this.options.debug){return}return console.log.apply(console,args)};return GIF}(EventEmitter);module.exports=GIF},{"./browser.coffee":2,events:1}]},{},[3])(3)});
//# sourceMappingURL=gif.js.map

base_url = "https://cdn.star.nesdis.noaa.gov"

sectors = [            
    //Sector Schema:
    //{"formal-names": ["REGION_ID", "NAME_FORMAL", "SAT_ID"], "keywords": ["A", "COUPLE", "OF", "QUERY", "RICH", "TERMS"]},
    //(Terms should be ordered from GREATEST SIGNIFICANCE TO LEAST -> -> )

    // WEST
    {"formal-names": ["CONUS", "PACUS", "GOES17"], "keywords": ["pacific", "northwest", "northern", "ocean", "asia", "polynesia", "conus"]},
    {"formal-names": ["FD", "South Pacific - Full Disk", "GOES17"], "keywords": ["pacific", "south", "southern", "ocean", "full", "disk"]},
    {"formal-names": ["pnw", "Pacific Northwest", "GOES17"], "keywords": [
        "pacific", "northwest", "north", "west", "ocean", "close", "oregon", "washington", "california", "state"
        ]},
    {"formal-names": ["psw", "Pacific Southwest", "GOES17"], "keywords": ["pacific", "southwest", "south", "west", "ocean", "close"]},
    {"formal-names": ["wus", "U.S. West Coast", "GOES17"], "keywords": ["pacific", "coast", "west", "california", "state", "ocean", "francisco", "angeles", "la", "city"]},
    {"formal-names": ["ak", "Alaska", "GOES17"], "keywords": ["alaska", "main", "state", "full"]},
    {"formal-names": ["cak", "Central Alaska", "GOES17"], "keywords": ["alaska", "central", "zoom", "anchorage", "city", "state"]},
    {"formal-names": ["sea", "Southeastern Alaska", "GOES17"], "keywords": ["alaska", "south", "eastern", "southeastern", "east", "state", "canada" , "western"]},
    {"formal-names": ["np", "Northern Pacific Ocean", "GOES17"], "keywords": ["pacific", "north", "northern", "ocean", "west", "peninsula"]},
    {"formal-names": ["hi", "Hawaii", "GOES17"], "keywords": ["hawaii", "state", "islands", "pacific", "maui", "city"]},
    {"formal-names": ["tpw", "Tropical Pacific Ocean", "GOES17"], "keywords": ["pacific", "tropic", "tropical", "ocean"]},
    {"formal-names": ["tsp", "South Pacific", "GOES17"], "keywords": ["pacific", "south", "ocean"]},

    //// EAST
    {"formal-names": ["CONUS", "CONUS", "GOES16"], "keywords": ["conus", "usa", "america", "state", "country"]},
    {"formal-names": ["FD", "South Atlantic - Full Disk", "GOES16"], "keywords": [
        "south", "full", "disk", "america", "contintent", "brazil", "country", "uruguay", "peru", "colombia",
        "argentina", "bolivia", "chile", "ecuador", "french guiana", "guyana", "paraguay", "suriname", "venezuela"
        ]},
    {"formal-names": ["nr", "Northern Rockies", "GOES16"], "keywords": [
        "northern", "us", "rockies", "central", "colorado", "state", "denver", "city", "montana", "boseman", "utah", "wyoming", "idaho", "nevada"
        ]},
    {"formal-names": ["umv", "Upper Mississippi Valley", "GOES16"], "keywords": [
        "northern", "us", "upper", "mississippi", "valley", "kansas", "nebraska", "dakota", "minnesota", "missouri", "kentucky", "state"
        ]},
    {"formal-names": ["cgl", "Great Lakes", "GOES16"], "keywords": [
        "great", "lakes", "northern", "state", "southeastern", "wisconsin", "michigan", "ohio", "indiana", "illinois", "penn", "west vir", "erie"
        ]},
    {"formal-names": ["ne", "Northeast", "GOES16"], "keywords": [
        "us", "north", "northeast", "northeastern", "state", "penn", "mary", "conn", "mass", "maine", "nova", "montreal", "ottawa", "rhode", "york", "ny", "boston"
        ]},
    {"formal-names": ["sr", "Southern Rockies", "GOES16"], "keywords": ["southern", "rockies", "arizona", "new mexico", "state"]},
    {"formal-names": ["sp", "Southern Plains", "GOES16"], "keywords": ["southern", "plains", "texas", "okla", "state", "dallas", "city", "louisi", "gulf"]},
    {"formal-names": ["smv", "Southern Mississippi Valley", "GOES16"], "keywords": [
        "south", "valley", "northern", "southeastern", "mississippi", "arkan", "alabama", "tenne", "kenucky", "state"
        ]},
    {"formal-names": ["se", "Southeast", "GOES16"], "keywords": ["south", "deep", "southeast", "state", "florida", "georgia", "carolina", "tenn", "forida"]},      
    {"formal-names": ["eus", "U.S. Atlantic Coast", "GOES16"], "keywords": [
        "atlantic", "coast", "jersey", "virginia", "delaware", "maine", "eastern", "seaboard", "state"
        ]},
    {"formal-names": ["can", "Northern Atlantic", "GOES16"], "keywords": [
        "atlantic", "north", "ireland", "greenland", "iceland", "nova", "scotia", "labrador", "sea", "quebec", "newfound", "country", "scotland"
        ]},
    {"formal-names": ["car", "Caribbean", "GOES16"], "keywords": ["carribbean", "cuba", "dominican", "venez", "north", "country"]},
    {"formal-names": ["gm", "Gulf of Mexico", "GOES16"], "keywords": ["gulf", "mexico", "of", "south", "sea", "texas", "baja"]},
    {"formal-names": ["pr", "Puerto Rico", "GOES16"], "keywords": [
        "puerto", "rico", "country", "virgin", "island", "guadel", "montserrat", "antigua", "dominica", "lucia", "martini"
        ]},
    {"formal-names": ["taw", "Tropical Atlantic", "GOES16"], "keywords": ["atlantic", "tropical", "ocean", "region", "section", "large"]},
    {"formal-names": ["eep", "Eastern East Pacific", "GOES16"], "keywords": ["pacific", "eastern", "east", "southeast", "central", "american", "coast"]},
    {"formal-names": ["mex", "Mexico", "GOES16"], "keywords": ["mexico", "country", "mex", "city"]},
    {"formal-names": ["cam", "Central America", "GOES16"], "keywords": ["central", "america", "costa", "guata", "nicar", "panama", "honduras", "country", "region"]},
    {"formal-names": ["nsa", "South America - Northern", "GOES16"], "keywords": ["north", "south amer", "region", "large"]},
    {"formal-names": ["ssa", "South America - Southern", "GOES16"], "keywords": ["south", "south amer", "region", "large"]}
]

bands = [
    //Band Schema:
    //{"formal-names": ["ACTUAL_NAME_HANDLE"], "keywords": ["A", "COUPLE", "OF", "QUERY", "RICH", "TERMS"]},
    {"formal-names": ["GEOCOLOR"], "keywords": ["geo", "color", "topo", "spatial"]},
    {"formal-names": ["AirMass"], "keywords": ["air", "mass", "particle", "part"]},
    {"formal-names": ["Sandwich"], "keywords": ["sand", "wich", "thermal", "dynamic"]},
    {"formal-names": ["DayCloudPhase"], "keywords": ["day", "cloud", "phase", "weather"]},
    {"formal-names": ["NightMicrophysics"], "keywords": ["night", "micro", "phys", "rgb", "contrast", "fog"]},
    {"formal-names": ["01"], "keywords": ["band", "01", "1", "-", "blue", "visi"]},
    {"formal-names": ["02"], "keywords": ["band", "02", "2", "-", "red", "visi"]},
    {"formal-names": ["03"], "keywords": ["band", "03", "3", "-", "veggie", "near", "ir", "inf"]},
    {"formal-names": ["04"], "keywords": ["band", "04", "4", "-", "cirrus", "near", "ir", "inf"]},
    {"formal-names": ["05"], "keywords": ["band", "05", "5", "-", "snow", "near", "ice", "ir", "inf"]},
    {"formal-names": ["06"], "keywords": ["band", "06", "6", "-", "cloud", "particle", "near", "ir", "inf"]},
    {"formal-names": ["07"], "keywords": ["band", "07", "7", "-", "short", "wave", "window", "ir", "inf"]},
    {"formal-names": ["08"], "keywords": ["band", "08", "8", "-", "water", "vapor", "inf", "ir", "upper", "level"]},
    {"formal-names": ["09"], "keywords": ["band", "09", "9", "-", "water", "vapor", "inf", "ir", "mid", "level"]},
    {"formal-names": ["10"], "keywords": ["band", "10", "10", "-", "water", "vapor", "inf", "ir", "lower", "level"]},
    {"formal-names": ["11"], "keywords": ["band", "11", "11", "-", "cloud", "top", "inf", "ir"]},
    {"formal-names": ["12"], "keywords": ["band", "12", "12", "-", "ozone", "ir", "inf"]},
    {"formal-names": ["13"], "keywords": ["band", "13", "13", "-", "clean", "long", "wave", "window", "ir", "inf"]},
    {"formal-names": ["14"], "keywords": ["band", "14", "14", "-", "long", "wave", "ir", "inf"]},
    {"formal-names": ["15"], "keywords": ["band", "15", "15", "-", "dirty", "long", "wave", "ir", "inf"]},
    {"formal-names": ["16"], "keywords": ["band", "16", "16", "-", "atmos", "co2", "long", "wave", "oxy", "ir", "inf"]},
]

month_conversion = [
    ["ja", "01"],
    ["fe", "02"],
    ["ma", "03"],
    ["ap", "04"],
    ["ma", "05"],
    ["jun", "06"],
    ["jul", "07"],
    ["au", "08"],
    ["se", "09"],
    ["oc", "10"],
    ["no", "11"],
    ["de", "12"]
]

types = [
    "default",
    //meaning: main image set
    "unknown", 
    //"meaning": "unknown image type
    "thumbnail"
    ]

function preloadimages(arr){
    var newimages=[], loadedimages=0, completeStack=[], initialLen=0;
    var postaction=function(){};
    var arr=(typeof arr!="object")? [arr] : arr;
    initialLen = arr.length;
    function imageloadpost(){
        loadedimages++
        if (loadedimages==initialLen){
            postaction(completeStack); //call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<arr.length; i++){
        if (arr[i].includes("x"))
        {
            newimages[i]=new Image();
            newimages[i].src=arr[i];
            newimages[i].crossOrigin = "Anonymous";
            //newimages[i].setAttribute('crossOrigin', '');

            newimages[i].onload=function()
            {
                //progress.innerText = `Processing ${initialLen} images... Please wait...`;
                completeStack.push(this);
                imageloadpost();
            }
            newimages[i].onerror=function()
            {
                initialLen -= 1;
                imageloadpost();
            }
        }
        else
        {
            initialLen -= 1;
        }
    }
    return{//return blank object with done() method
        done:function(f){
            postaction=f || postaction; //remember user defined callback functions to be called when images load
        }
    }
}

// Compares our set query against our set dataset then returns the index of the [best] match (if found).
function searchDriver(searchableObject, keepRange, query)
{
    var indexOfFinal = 1000;
    query = query.toLowerCase();
    var AttemptRecursion = keepRange;
    var contin = true;

    // Create attempt cycle based on range
    for (var attempt=0; attempt < keepRange;attempt++)
    {
        if (!contin){break}

        // Create cycle based on dataset size
        for (var x=0; x < searchableObject.length;x++)
        {

            if (!contin){break}

            //Check for explicit formal name
            for (var z=0; z < searchableObject[x]["formal-names"].length;z++)
            {
                if (!contin){break}

                if (query == searchableObject[x]["formal-names"][z])
                {
                    indexOfFinal = x;
                    contin = false;
                    break;
                }

                if (!contin){break}
            }

            if (!contin){break}
            
            // Check for keywords->
            var hits = 0
            for (var y=0; y < searchableObject[x]["keywords"].length;y++)
            {
                if (!contin){break}

                if (query.includes(searchableObject[x]["keywords"][y].toLowerCase()))
                    if (AttemptRecursion == 1)
                    {
                        if (searchableObject[x]["keywords"][y].toLowerCase() != "state" || searchableObject[x]["keywords"][y].toLowerCase() != "country")
                        {
                            hits += 1;
                        }
                    }
                    else
                    {
                        hits += 1;
                    }

                    if (!contin){break}

                // <-Accepting positives if hits >= current $attemptRecursion
                if (hits >= AttemptRecursion)
                {
                    indexOfFinal = x;
                    contin = false;
                    break;
                }
                
                if (!contin){break}

            }
            // Adjust our keeprange recursively for next attempt cycle
            AttemptRecursion = keepRange - attempt; 
            if (AttemptRecursion == 0 || !contin)
            {
                break;
            }
        }
    }
    // Return None if we dont find a match    
    if (indexOfFinal == 1000)
        {indexOfFinal = None}
    
    return indexOfFinal;    

}



function getImagery(SECTOR_QUERY, BAND_QUERY, DIMENSION, callback)
{
    const bandQuery = BAND_QUERY.toLowerCase();
    const sectorQuery = SECTOR_QUERY.toLowerCase();

    // CHECK FOR QUERY MATCH: SECTORS
    const indexOfFinalSector = searchDriver(sectors, 4, sectorQuery);

    // CHECK FOR QUERY MATCH: BANDS
    const indexOfFinalBand = searchDriver(bands, 4, bandQuery);    

    var a = base_url + "/" + sectors[indexOfFinalSector]['formal-names'][2];
    a += "/ABI/SECTOR/" + sectors[indexOfFinalSector]['formal-names'][0] + "/";
    a += bands[indexOfFinalBand]['formal-names'][0] + "/";

    const uriObj = {"uri": a, "sector-index": indexOfFinalSector, "band-index": indexOfFinalBand};
    let xhr = new XMLHttpRequest;
    xhr.open("GET", uriObj["uri"]);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {
            var lines = xhr.responseText.split("\n");
            var parsedLines = [];
        
            for (var line=0;line < lines.length;line++)
            {
                if (lines[line].includes("<a") &&  (!lines[line].includes("../")))
                {
                    if (lines[line].includes(`${DIMENSION}x`))
                    {
                        parsedLines.push(a + lines[line].split("href=\"")[1].split("\"")[0]);
                    }
                }
            }
            if(callback) callback(parsedLines);
        };
    }
};

// VSC Says that setImagery is never read, but:
function setImagery(list, callback)
{
    preloadimages(list).done(function(images)
    {
        var final = [];
        for (var x=0; x < images.length;x++)
        {
            var dupe = false;
            for (var y=0; y < final.length;y++)
            {
                if (images[x].src == final[y].src)
                {
                    dupe = true;
                }
            }
            if (!dupe)
            {
                final.push(images[x]);
            }
        }
        var gif = new GIF({ workers: 2, quality: 10 });
        for (var i=0; i < final.length;i++)
        {
            gif.addFrame(final[i]);
        }
        gif.on('finished', function(blob)
        {   //..Look below lol (it works)
            if(callback) callback(URL.createObjectURL(blob))
        });
        gif.render();
    });
}
