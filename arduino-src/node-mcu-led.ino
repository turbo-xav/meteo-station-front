#define _DEBUG_
#include <ESP8266WiFi.h>
#include <ThingerESP8266.h>


ThingerESP8266  thing("turboxav", "turboxav", "xxxxxx");

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  thing.add_wifi("Bbox-Bxxxx", "xxxxxxx");
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
  
  Serial.println();
  
  thing["led"] << digitalPin(13);
  thing["led-state"] >>  outputValue(digitalRead(13));
   // resource output example (i.e. reading a sensor value)
  thing["millis"] >> outputValue(millis());
}

void loop() {
  thing.handle();  
}