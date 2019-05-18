// SENSOR DE GAS LP
#include <Keypad.h>
#include <Servo.h>
#define         MQ1                       (0)     //define la entrada analogica para el sensor
#define         RL_VALOR             (5)     //define el valor de la resistencia mde carga en kilo ohms
#define         RAL       (9.83)  // resistencia del sensor en el aire limpio / RO, que se deriva de la                                             tabla de la hoja de datos
#define         GAS_LP                      (0)
String inputstring = "";                                                        //Cadena recibida desde el PC
float           LPCurve[3]  =  {2.3,0.21,-0.47};
float           Ro           =  10;

// FIN DE SENSOR DE GAS LP


// KEYPAD AND SERVOMOTOR


const byte FILAS = 4;
const byte COLUMNAS = 4;
char keys [FILAS][COLUMNAS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte pinesFilas [FILAS] = {9,8,7,6};
byte pinesColumnas [FILAS] = {5,4,3,2};

Keypad teclado = Keypad(makeKeymap(keys), pinesFilas, pinesColumnas, FILAS, COLUMNAS);

char TECLA;
char CLAVE [7];
char CLAVE_MAESTRA[7]="111111";
byte INDICE = 0;

Servo myservo;

// FIN KEYPAD


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  //GAS LP
  Serial.println("Iniciando ...");
  //configuracion del sensor...
  Serial.print("Calibrando...\n");
  Ro = Calibracion(MQ1);                        //Calibrando el sensor. Por favor de asegurarse que el sensor se encuentre en una zona de aire limpio mientras se calibra
  Serial.print("Calibracion finalizada...\n");
  Serial.print("Ro=");
  Serial.print(Ro);
  Serial.print("kohm");
  Serial.print("\n");
  //FIN GAS LP
  //KEYPAD AND SERVOMOTOR
   myservo.attach(10);
   pinMode(12,OUTPUT);
  //FIN KEYPAD

}

void loop() {
  // KEYPAD Y SERVOMOTOR
   TECLA = teclado.getKey();
  if(TECLA){
    CLAVE[INDICE]=TECLA;
    INDICE++;
   // Serial.print(TECLA);
  }
  if (INDICE == 6){
    if (!strcmp(CLAVE, CLAVE_MAESTRA))
    {
    INDICE = 0;
    Serial.println("key:1");
     myservo.write(0);
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
       digitalWrite(12, LOW);
       delay(4000);
      }
  }

  // FIN KEYPAD Y SERVOMOTOR

 


// SENSOR DE HUMEDAD

 if (analogRead(A1) >= 700)
  {
      Serial.print("humedad:");
      Serial.println(analogRead(A1));
      digitalWrite(13, HIGH);
      digitalWrite(11, HIGH);
      delay(4000);
    
  }
  else if (analogRead(A1) <= 700 )
  {
    
      
         Serial.print("humedad:");
         Serial.println(analogRead(A1));
         digitalWrite(13, LOW);
         digitalWrite(11, LOW);
         delay(4000);
        
      
      
  }

 // TERMINACION SENSOR DE HUMEDAD

 // SENSOR DE GAS

   if(porcentaje_gas(lecturaMQ(MQ1)/Ro,GAS_LP) != 0)
   {
    Serial.print("LP:");
    Serial.println(porcentaje_gas(lecturaMQ(MQ1)/Ro,GAS_LP) );

    delay(200);
    //digitalWrite(11, HIGH);
   }
   else
   {
    if(porcentaje_gas(lecturaMQ(MQ1)/Ro,GAS_LP) == 0)
       {
       // digitalWrite(11, LOW);
       }
   }
   


 // TERMINAACION SENSOR DE GAS
}





// SENSOR DE GAS LP (METODOS DE FUNCIONAMIENTO)

float calc_res(int raw_adc)
{
  return ( ((float)RL_VALOR*(1023-raw_adc)/raw_adc));
}
 
float Calibracion(float mq_pin){
  int i;
  float val=0;
    for (i=0;i<50;i++) {                                                                               //tomar múltiples muestras
    val += calc_res(analogRead(mq_pin));
    delay(500);
  }
  val = val/50;                                                                                         //calcular el valor medio
  val = val/RAL;
  return val;
}
 
float lecturaMQ(int mq_pin){
  int i;
  float rs=0;
  for (i=0;i<5;i++) {
    rs += calc_res(analogRead(mq_pin));
    delay(50);
  }
rs = rs/5;
return rs;
}
 
int porcentaje_gas(float rs_ro_ratio, int gas_id){
   if ( gas_id == GAS_LP ) {
     return porcentaje_gas(rs_ro_ratio,LPCurve);
   }
  return 0;
}
 
int porcentaje_gas(float rs_ro_ratio, float *pcurve){
  return (pow(10, (((log(rs_ro_ratio)-pcurve[1])/pcurve[2]) + pcurve[0])));
}
// SENSOR DE GAS LP (FIN DE METODO)
