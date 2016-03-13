/** @license
 *
 * General Web Interface Platform (Kernel.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Kernel() {
    this.active = false;
    this.ticks = 0;
    this.processes = [];

    return this;
}

Kernel.prototype.init = function () {

    if (this.active) {
        return false;
    }
    this.active = true;
    console.log("Kernel has initiated.");

    window.onresize = function () {kernel.resize();};
    kernelUpdate();
    return true;
};

Kernel.prototype.update = function () {

    if (!this.active) {
        return false;
    }
    this.ticks++;
    // Calls the update function for every registered package
    this.processes.forEach(function (process, index, array) {
        if (process.has_focus === true || process.stay_focus) {
            process.update();
        }
    });
    return true;
};

Kernel.prototype.focus = function (process) {

    //var that = this;
    if (!this.active || process.stay_focus || process.has_focus) {
        console.warn("P:" + process.meta.title + " has been denied focused");
        return false;
    }

    console.log("P:" + process.meta.title + " has been focused");
    // Calls the update function for every registered package

    this.processes.forEach(function (element, index, array) {
        if (element.has_focus) {
            element.defocus();
            element.has_focus = false;
        }
    });
    if (!process.has_initialized) {
        process.init();
        process.has_initialized = true;
    }
    process.has_focus = true;
    process.focus();
    return true;
};
Kernel.prototype.resize = function () {
    this.processes.forEach(function (element, index, array) {
        if (element.has_focus) {
            element.resize();
        }
    });
}
Kernel.prototype.registerProcess = function (process) {
    this.processes.push(process);

    console.log("Kernel has registered Process.");
    return true;
};


function kernelUpdate() {
    requestAnimationFrame(kernelUpdate);
    kernel.update();
}
