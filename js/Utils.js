/** @license
 * 
 * General Web Interface Platform (Utils.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   KeyPiece, Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */



/**
 * @constructor
 */
function Keyboard() {
    
}
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

/** @type {Array<boolean>} */
var Key = [];
/** @type {Array<boolean>} */
var KeyReleased = [];
/** @type {Array<boolean>} */
var KeyPressed = [];

for (var u = 0; u < 255; u += 1) {
    Key[u] = false;
    KeyPressed[u] = false;
    KeyReleased[u] = false;
}

function onKeyDown(event) {
    if (Key[event.keyCode] == false) {
        KeyPressed[event.keyCode] = true;
    }
    Key[event.keyCode] = true;
    console.log("keyboard: " + event.keyCode + "pressed");
}

function onKeyUp(event) {
    Key[event.keyCode] = false;
    KeyReleased[event.keyCode] = true;
}



var Mouse = {
    pos: new Vec2(),
    wheel: 0,
    pos_last: new Vec2(),
    button: [false, false, false, false, false, false],
    buttonPressed: [false, false, false, false, false, false],
    buttonReleased: [false, false, false, false, false, false]
};

window.addEventListener("mousedown", handleMouseEvent);
window.addEventListener("mouseup", handleMouseEventUp);

window.addEventListener("contextmenu", stopEvent);

function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();

    return false;
}

function onTouchDown(event) {
    Mouse.button[5] = true;
    Mouse.pos.x = event.changedTouches[0].pageX;
    Mouse.pos.y = event.changedTouches[0].pageY;
    //GUIManager.createSimpleNotification("press!"+Mouse.pos.x);
    // console.log("touch event: "+event.keyCode+"pressed");
}

function onTouchUp(event) {
    Mouse.button[5] = false;
}

window.addEventListener("touchstart", onTouchDown, false);
window.addEventListener("touchend", onTouchUp, false);

function handleMouseEvent(e) {
    //console.log("spoqn");
    // if (KERNAL.MOUSE_X > 0 && KERNAL.MOUSE_X)
    var evt = window.event || e;
    var mb = 1;
    if (evt.which) {
        if (evt.which == 3) mb = 2;
        if (evt.which == 2) mb = 4;
    } else if (evt.button) {
        if (evt.button == 2) mb = 2;
        if (evt.button == 4) mb = 4;
    }
    //       if (mb==0){
    //           mb=1;
    //  GUIManager.createSimpleNotification("assume left button "+mb);}
    Mouse.buttonPressed[mb] = true;
    Mouse.button[mb] = true;
    console.log(mb);
    return true;
}

function handleMouseEventUp(e) {
    var evt = window.event || e;
    var mb = 1;
    if (evt.which) {
        if (evt.which == 3) mb = 2;
        if (evt.which == 2) mb = 4;
    } else if (evt.button) {
        if (evt.button == 2) mb = 2;
        if (evt.button == 4) mb = 4;
    }
    Mouse.buttonReleased[mb] = true;
    Mouse.button[mb] = false;
    return true;
}

var Util = {
    meta: {
        mousePos: {
            x: 0,
            y: 0,
            lastx: 0,
            lasty: 0
        },
        getMousePosRect: {
            left: 0,
            top: 0
        }
    }
};

window.addEventListener("mousewheel", mouseWheelHandler);

function mouseWheelHandler(e) {
    e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    Mouse.wheel = delta;
    // SPARK.camera.zoom[1]-=delta; //Math.pow(delta/2,delta);
}

window.addEventListener('mousemove', function (evt) {
    Util.meta.mousePos = getMousePos(document.body, evt);
    Mouse.pos.x = Util.meta.mousePos.x;
    Mouse.pos.y = Util.meta.mousePos.y;
    // console.log(2);
}, false);

function getMousePos(elem, evt) {
    Util.meta.getMousePosRect = elem.getBoundingClientRect();
    return {
        x: evt.clientX - Util.meta.getMousePosRect.left,
        y: evt.clientY - Util.meta.getMousePosRect.top
    };
}



function bias(v, b) {
    return (v / ((1 / b - 2) * (1 - v) + 1));
}

String.prototype.makeStringSafe = function(){
    var s = "";
    s = this+"";
    s = s.replaceAll('\n','!lb!;').replaceAll('\r','!lb!;').replaceAll('"','&#34;').replaceAll("'","&#39;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('\\\\','\\\\');
   // console.log(s);

    return s;
};
String.prototype.makeStringNormal = function(){
    var s = "";
    s = this+"";
    s = s.replaceAll("!lb!;","<br />");
   // console.log(s);

    return s;
};

String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;
    
   // while (this.indexOf(search) != -1){
     //   this.splice(this.indexOf(search),search.length,replace);   
   // }
   // return this.replace("/"+search+"/g",replace);
//return this.replace("/"+search+"/g",replace);
    return this.replace(new RegExp('' + search + '', 'g'), replace);
};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



function timeAgo(dateString) {
    var rightNow = new Date();
    var then = new Date(dateString);

    //  if ($.browser.msie) {
    // IE can't parse these crazy Ruby dates
    then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
    //}

    var diff = rightNow - then;

    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    if (isNaN(diff) || diff < 0) {
        return "?"; // return blank string if unknown
    }

    if (diff < second * 2) {
        // within 2 seconds
        return "<div class='stats_info'>right now</div>";
    }

    if (diff < minute) {
        return Math.floor(diff / second) + "<div class='stats_info'> seconds uptime</div>";
    }


    if (diff < hour) {
        return Math.floor(diff / minute) + ":" +(((Math.floor(diff / second) % 60)<10)?"0":"")+ (Math.floor(diff / second) % 60) + "<div class='stats_info'> minutes uptime</div>";
    }


    if (diff < day) {
        return Math.floor(diff / hour) + ":" + (((Math.floor(diff / minute) % 60)<10)?"0":"")+(Math.floor(diff / minute) % 60) + "<div class='stats_info'>hours uptime</div>";
    }


    if (diff < day * 365) {
        return Math.floor(diff / day) + "<div class='stats_info'>days uptime</div>";
    } else {
        return "over a year ago";
    }
}

var console = console || window.console;

//base64Img = encodeURIComponent(base64Img);



// Generic database table
/** @constructor */
function DB() {
    this._data = [];
    /** @type {function(string,(number|boolean|string)):*} */
    this.selectIndexWhere = function (col, val) {
        var len, i;
        len = this._data.length;
        for (i = 0; i < len; i++) {
            //this.accounts.forEach(function(a){
            if (this._data[i][col] === val) {
                return this._data[i];
            }
        }
        return false;
    };
    /** @type {function(string,(number|boolean|string)):Array<*>} */
    this.selectArrayWhere = function (col, val) {
        var len, i, r;
        r = [];
        len = this._data.length;
        for (i = 0; i < len; i++) {
            //this.accounts.forEach(function(a){
            if (this._data[i][col] === val) {
                //return this._data[i];	
                r.push(this._data[i]);
            }
        }
        return r;
    };
    /** @type {function(*)} */
    this.insert = function (a) {
        this._data.push(a);
    };
    /** @type {function():number} */
    this.size = function () {
        return this._data.length;
    };
};


/** @type {function(Array<number>):number} */
function arrayGetAverage(a) {
    var ret = 0;
    a.forEach(function (list) {
        ret += list;
    });
    return ret / a.length;
}

/** @type {function(Array<number>):number} */
function arrayGetMin(a) {
    var ret = 0;
    a.forEach(function (list) {
        ret = Math.min(ret, list);
    });
    return ret;
}

/** @type {function(Array<number>):number} */
function arrayGetMax(a) {
    var ret = 0;
    a.forEach(function (list) {
        ret = Math.max(ret, list);
    });
    return ret;
}

/** @type {function(Array<*>,string,(number|boolean|string)):Array<*>} */
function arraySelectWhere(a, col, val) {
    var na, len, i;
    na = [];
    len = a.length;
    for (i = 0; i < len; i++) {
        //this.accounts.forEach(function(a){
        if (a[i][col] === val) {
            //return this._data[i];	
            na.push(a[i]);
        }
    }
    return na;
};

function arraySelectIndex(a, col, val) {
    var len, i;
    //na = -1;
    len = a.length;
    for (i = 0; i < len; i++) {
        //this.accounts.forEach(function(a){
        if (a[i][col] === val) {
            //return this._data[i];	
            return a[i];
        }
    }
    return -1;
};
