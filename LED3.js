"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    leap: { adaptor: "leapmotion" },
    arduino: { adaptor: "firmata", port: "/dev/cu.usbmodem1411" }
  },

  devices: {
    led1: { driver: "led", pin: 8, connection: "arduino" },
    led2: { driver: "led", pin: 12, connection: "arduino" },
    led3: { driver: "led", pin: 13, connection: "arduino" },
    leapmotion: { driver: 'leapmotion' }
  },

  work: function(my) {
    my.leapmotion.on("frame", function(frame) {
      if(frame.hands.length > 0) {
        //console.log(frame.hands[0])
     if(frame.hands[0].palmPosition[0] > 75) {
          my.led1.turnOn();
          my.led2.turnOff();
          my.led3.turnOff();
        } else if(frame.hands[0].palmPosition[0] > -75 && frame.hands[0].palmPosition[0] < 75) {
          my.led1.turnOff();
          my.led2.turnOn();
          my.led3.turnOff();
        } else if(frame.hands[0].palmPosition[0] < -75) {
          my.led1.turnOff();
          my.led2.turnOff();
          my.led3.turnOn();
        } else {
          my.led1.turnOff();
          my.led2.turnOff();
          my.led3.turnOff();
        }
      } else {
          my.led1.turnOff();
          my.led2.turnOff();
          my.led3.turnOff();
        }   
    });
  }  
}).start();