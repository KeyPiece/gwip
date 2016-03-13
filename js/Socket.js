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
    this.registerQueue = [];
}
Socket.prototype.register = function (identifier, f) {
    this.registerQueue.push({
        identifier: identifier,
        f: f
    });
    console.log("Function has been bound to packet identifier " + identifier);
};

Socket.prototype.connect = function (address) {
    window.MozWebSocket = window.MozWebSocket || undefined;
    window.WebSocket = window.WebSocket || window.MozWebSocket || undefined;

    if (window.WebSocket != undefined) {

        this.socket = new WebSocket(address);

        // TRY UPGRADING CONNECTION TO SERVER
        var _this = this;
        this.socket.onopen = function () {

            console.log('WEBSOCKET connection to server Established.');
            console.log('Sending INIT message to server');
            _this.socket.send('{"init":"client"}');
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
                for (var i = 0; i < _this.registerQueue.length; i++) {
                    if (json[_this.registerQueue[i].identifier]) {
                        _this.registerQueue[i].f(json);
                    }
                }
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
