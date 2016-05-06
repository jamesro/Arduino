"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    leap: { adaptor: "leapmotion" },
    arduino: { adaptor: "firmata", port: "/dev/cu.usbmodem1411" }
  },

  devices: {
    led: { driver: "led", pin: 13, connection: "arduino" },
    leapmotion: { driver: 'leapmotion' }
  },

  work: function(my) {
    my.leapmotion.on("frame", function(frame) {
      if(frame.hands.length > 0) {
        //console.log(frame.hands[0].sphereRadius);
        if(frame.hands[0].sphereRadius > 70) {
          my.led.turnOn();
        } else {
          my.led.turnOff();
        }
      }
    });
  }  
}).start();