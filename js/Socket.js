/** @license
 * 
 * General Web Interface Platform (Socket.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Socket() {
    this.connected = false;
    this.socket = null;
}
Socket.prototype.connect = function(address) {
    window.MozWebSocket = window.MozWebSocket || undefined;
    window.WebSocket = window.WebSocket || window.MozWebSocket || undefined;

    if (window.WebSocket != undefined) {

        this.socket = new WebSocket(address);

        // TRY UPGRADING CONNECTION TO SERVER
        var _this = this;
        this.socket.onopen = function () {

            console.log('WEBSOCKET connection to server Established.');
            //if (this.socket!= -1){
            console.log('Sending INIT message to server');
            //this.send('test');
            _this.socket.send('{"init":"client"}');
            /*if (localStorage.getItem("oa-site-user-token").length == 64) {
                Kernel.Socket.socket.send('{"auth":{"login":{"email":"' + localStorage.getItem("oa-site-user-email") + '","token":"' + localStorage.getItem("oa-site-user-token") + '"}}}');
                console.log("attempting to log in with a token");
            }*/
            //console.log();
            //this.send();	
        };

        this.socket.sendPacket = function (p) {
            if (p.indexOf("undefined") != -1) {
                _this.socket.send(p.makeStringSafe());
            }
        };

        this.socket.onerror = function (error) {

            console.error('WEBSOCKET error on socket!');
        };

        this.socket.onmessage = function (message) {

            if (message.data) {
                //if (message.data.indexOf("undefined") == -1){
                var json = JSON.parse(message.data);
                console.log(message.data);
               // _this.getPacket(json);
                //  }
            }

        };

    }

    if (typeof this.socket !== 'object') {
        this.socket = function () {
            console.error("SOCKET CONNECTION NOT FOUND..");
        }
    } else {
        this.socket.request = function (a) {
            //that.socket.send(JSON.stringify(a));	
        }
    }

}
