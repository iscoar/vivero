#include <Keypad.h>
#include <Servo.h>

const byte FILAS = 4;
const byte COLUMNAS = 4;
char keys [FILAS][COLUMNAS] = {
  {'1','2','3','A'},
  {'4','5','6','A'},
  {'7','8','9','A'},
  {'*','0','#','A'}
};

byte pinesFilas [FILAS] = {9,8,7,6};
byte pinesColumnas [FILAS] = {5,4,3,2};

Keypad teclado = Keypad(makeKeymap(keys), pinesFilas, pinesColumnas, FILAS, COLUMNAS);

char TECLA;
char CLAVE [7];
char CLAVE_MAESTRA[7]="111111";
byte INDICE = 0;

Servo myservo;



//int PIR = 11;
//int led = 12;
//int ESTADO =0;


void setup (){
  Serial.begin(9600);
   myservo.attach(10);
   //pinMode(PIR,INPUT);
    pinMode(12,OUTPUT);
  // delay(2000);
}


void loop () {
  TECLA = teclado.getKey();
  if(TECLA){
    CLAVE[INDICE]=TECLA;
    INDICE++;
    //Serial.print(TECLA);
  }
  if (INDICE == 6){
    if (!strcmp(CLAVE, CLAVE_MAESTRA))
    {
    INDICE = 0;
    Serial.println("key:1");
     myservo.write(0);
    // delay(1000);
       digitalWrite(12, HIGH);

          
       delay(4000);
       myservo.write(90);
        
        delay(4000);
         digitalWrite(12, LOW);
 
     }
    else
    {
    Serial.println("key:0");
    INDICE = 0;
//myservo.write(90);
       digitalWrite(11, LOW);
       delay(4000);
      }
  }
  /*
  ESTADO = digitalRead(12);
   if (ESTADO == 1)
  {
    digitalWrite(11, HIGH);
    delay(1000);
 }
 else
 {
     digitalWrite(11, LOW);
   
  }
 delay(100);
 */
 
}

