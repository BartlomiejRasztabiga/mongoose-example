load('api_timer.js');
load('api_dht.js');
load('api_mqtt.js');

let dhtPin = 5;

let dht = DHT.create(dhtPin, DHT.DHT22);

Timer.set(2000, Timer.REPEAT, function () {
  let t = dht.getTemp();
  let h = dht.getHumidity();

  if (isNaN(t) || isNaN(h)) {
    print("Failed to read data from DHT sensor");
    return;
  }


  print("t: ", t);
  print("h: ", h);

  if (MQTT.isConnected()) {
    print("chuj");
    let topic = 'devices/' + Cfg.get('device.id') + '/events';
    print('== Publishing to ' + topic + ':', message);
    MQTT.pub(topic, message, 0);
  } else {
    print("nie polaczono");
  }

}, null)

// GPIO.set_button_handler(btn, btnPull, btnEdge, 20, function () {
//   state.btnCount++;
//   let message = JSON.stringify(state);
//   
//   if (MQTT.isConnected()) {
//     let topic = 'devices/' + Cfg.get('device.id') + '/events';
//     print('== Publishing to ' + topic + ':', message);
//     MQTT.pub(topic, message, 0);
//   } else {
//     print('== Not connected!');
//   }
// }, null);
