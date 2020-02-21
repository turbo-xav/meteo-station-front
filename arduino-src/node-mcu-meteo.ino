#define _DEBUG_
#define LED 14 
#define ROUGE 12 
#define VERT 13 
#define BLEU 15 

#define SERIAL_BAUD 115200

#include <ESP8266WiFi.h>
#include <ThingerESP8266.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)

#define WIFI_SSID "Bbox-xxxxx"
#define WIFI_PWD "xxxxxxxxxxxxxxxxxxxxxxxxx"

Adafruit_BME280 bme;

float temperature, humidity, pressure, altitude;

ThingerESP8266  meteoStation("turboxav", "meteostation", "turboxav");

void setup() {
  Serial.begin(SERIAL_BAUD);
  pinMode(LED, OUTPUT);
  pinMode(ROUGE, OUTPUT);
  pinMode(VERT, OUTPUT);
  pinMode(BLEU, OUTPUT);
 
  
  
  Serial.print("Connecting to : ");
  Serial.print(WIFI_SSID);
  Serial.print(" with pwd : ");
  Serial.println(WIFI_PWD);
  WiFi.begin(WIFI_SSID, WIFI_PWD); 
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
  meteoStation.add_wifi("TurboXav", "turboxav");
  //meteoStation.add_wifi(WIFI_SSID, WIFI_PWD);
  digitalWrite(LED,HIGH);
  bme.begin(0x76);
  meteoStation["led"] << digitalPin(LED);
  meteoStation["led-state"] >>  outputValue(digitalRead(LED));
  
  meteoStation["meteo"] >> [](pson& out){
    out["temperature"] = temperature;
    out["pressure"] = pressure;
    out["humidity"] = humidity;
  };

}

void loop() { 
  animation();
  mesure();
  delay(10);
}

void mesure(){
  temperature = bme.readTemperature();
  humidity = bme.readHumidity();
  pressure = bme.readPressure() / 100.0F;
  altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  meteoStation.handle();
}

void ledRgb(int rouge, int vert,int bleu ){
  if(digitalRead(LED) == HIGH){
    analogWrite(ROUGE,rouge);
    analogWrite(VERT,vert);
    analogWrite(BLEU,bleu);
  }else{
    analogWrite(ROUGE,0);
    analogWrite(VERT,0);
    analogWrite(BLEU,0);
  }
}

void animation() {
  
  for(int i = 0 ; i <= 255 ; i++){
    ledRgb(i, 0, 0 );
    mesure();
    delay(5);
  }

   for(int i = 0 ; i <= 255 ; i++){
    ledRgb(255, i , 0 );
    mesure();
    delay(5); 
  }

   for(int i = 0 ; i <= 255 ; i++){
    ledRgb(255, 255 , i );
    mesure(); 
    delay(5); 
  }

  for(int i = 255 ; i >= 0 ; i--){
    ledRgb(255, 255 , i );
    mesure();
    delay(5); 
  }

  for(int i = 255 ; i >= 0 ; i--){
    ledRgb(255, i , 0 );
    mesure();
    delay(5); 
  }

   for(int i = 255 ; i >= 0 ; i--){
    ledRgb(i, 0, 0 ); 
    mesure();
    delay(5); 
  }
  
}