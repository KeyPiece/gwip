/** @license
 * 
 * General Web Interface Platform (Process.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Process() {
    'use strict';
    this.meta = {
        title: "",
        author: "Unknown"
    };
    this._tmp = {};
    this.registered = false;
    //this.autoInit = false;
    this.has_initialized = false;
    this.has_focus = false;
    this.stay_focus = false;
}

Process.prototype.init = function(){
    if (this.has_initialized){
        return false;
    }else{
        this.has_initialized = true;
    }
    return true;
};

Process.prototype.update = function(){
    
};
Process.prototype.resize = function(){
    
};

Process.prototype.focus = function(){
    
};
Process.prototype.defocus = function(){
    
};