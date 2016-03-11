/** @license
 * 
 * OA Integrated Engine (Vector2.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */
/**
 * @constructor
 */
function Vec2() {
    this.x = 0;
    this.y = 0;
};
/** @type {function():Vec2} */
Vec2.prototype.clear = function () {
    this.x = 0;
    this.y = 0;
    return this;
};
/** @type {function(number,number):Vec2} */
Vec2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
};
/** @type {function(Vec2):Vec2} */
Vec2.prototype.add = function (vec2) {
    this.x += vec2.x;
    this.y += vec2.y;
    return this;
};
/** @type {function(Vec2):Vec2} */
Vec2.prototype.sub = function (vec2) {
    this.x -= vec2.x;
    this.y -= vec2.y;
    return this;
};
/** @type {function(Vec2):Vec2} */
Vec2.prototype.mul = function (vec2) {
    this.x *= vec2.x;
    this.y *= vec2.y;
    return this;
};
/** @type {function(number):Vec2} */
Vec2.prototype.mulI = function (amt) {
    this.x *= amt;
    this.y *= amt;
    return this;
};
/** @type {function(number):Vec2} */
Vec2.prototype.divI = function (amt) {
    this.x /= amt;
    this.y /= amt;
    return this;
};
/** @type {function(Vec3):Vec3} */
Vec2.prototype.pointTo = function (vec) {
    //var a = this.clone();
    // a.sub(vec).divI(a.dist(vec));
    // var d = this.dist(vec);
    this.sub(vec).normalize();
    return this;
    // return a;
};
/** @type {function(Vec2):Vec2} */
Vec2.prototype.div = function (vec2) {
    this.x /= vec2.x;
    this.y /= vec2.y;
    return this;
};
/** @type {function():number} */
Vec2.prototype.toDeg = function () {
    var normalized = this.clone().normalize();
    return ((Math.atan2(normalized.x, normalized.y + 0.0000001) / Math.PI) * 180) + 180;
};
/** @type {function():Vec2} */
Vec2.prototype.normalize = function () {
    var mag = this.mag();
    this.x /= mag;
    this.y /= mag;
    return this;
};
/** @type {function():number} */
Vec2.prototype.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
/** @type {function(Vec2):number} */
Vec2.prototype.dot = function (a) {
    return (this.x * a.x + this.y * a.y);
};
/** @type {function():Vec2} */
Vec2.prototype.clone = function () {
    return (new Vec2().set(this.x, this.y));
};
/** @type {function(Vec2):Vec2} */
Vec2.prototype.copy = function (a) {
    this.x = a.x;
    this.y = a.y;
    return this;
};
/** @type {function(Vec2):number} */
Vec2.prototype.dist = function (vec) {
    return Math.sqrt(Math.pow((this.x - vec.x), 2) + Math.pow((this.y - vec.y), 2));
};