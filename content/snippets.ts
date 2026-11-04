import type { Snippet } from "@/lib/types";
import { PINS } from "./pins";

const S = PINS.servoSolo.signal;
const U = PINS.sonar;
const M = PINS.motors;
const SC = PINS.servoCar.signal;

/** One colour per week, pulled from the curriculum deck. */
export const weekColors: Record<number, string> = {
  1: "#2bb3d6", // blue
  2: "#f5a623", // amber
  3: "#e5326e", // pink
  4: "#8b5cf6", // purple
  5: "#22a06b", // green
  6: "#ff5a2b", // coral
  7: "#00ace0", // blue   - make it move
  8: "#1f9d55", // green  - make your own
  9: "#c0799c", // mauve  - make it decide
  10: "#cf0a3c", // red   - the maze
};

/** Weeks 8-10 have no code yet. */
export const comingSoon: number[] = [8, 9, 10];

/** Weeks already taught. Still readable, just dimmed and ticked. */
export const done: number[] = [1, 2, 3, 4, 5, 6];

/** The week the tabs open on. */
export const currentWeek = 7;

export const snippets: Snippet[] = [
  // ---------- Week 1 ----------
  {
    id: "hello-world",
    title: "Hello, World!",
    week: 1,
    code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello, World!");
  delay(1000);
}`,
  },
  {
    id: "blink-led",
    title: "Blink the Light",
    week: 1,
    code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
  },
  {
    id: "print-your-name",
    title: "Print Your Name",
    week: 1,
    code: `void setup() {
  Serial.begin(9600);
  Serial.println("My name is Ian Yu");
  Serial.println("My favorite colour is blue");
}

void loop() {
}`,
  },

  // ---------- Week 2 ----------
  {
    id: "servo-basic",
    title: "Move the Servo",
    week: 2,
    pins: `signal ${S} · red 5V · brown GND`,
    code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(${S});
}

void loop() {
  myServo.write(90);
  delay(1000);
  myServo.write(0);
  delay(1000);
}`,
  },
  {
    id: "servo-challenge",
    title: "Half a Turn",
    week: 2,
    pins: `signal ${S} · red 5V · brown GND`,
    code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(${S});
}

void loop() {
  myServo.write(0);
  delay(1000);
  myServo.write(180);
  delay(1000);
}`,
  },

  // ---------- Week 3 ----------
  {
    id: "ultrasonic-distance",
    title: "Distance Sensor",
    week: 3,
    pins: `Trig ${U.trig} · Echo ${U.echo} · Vcc 5V · Gnd GND`,
    code: `long duration;
int distance;

void setup() {
  pinMode(${U.trig}, OUTPUT);
  pinMode(${U.echo}, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(${U.trig}, LOW);
  delayMicroseconds(2);
  digitalWrite(${U.trig}, HIGH);
  delayMicroseconds(10);
  digitalWrite(${U.trig}, LOW);

  duration = pulseIn(${U.echo}, HIGH);
  distance = duration * 0.034 / 2;

  Serial.println(distance);
  delay(500);
}`,
  },
  {
    id: "ultrasonic-explained",
    title: "Distance Sensor, Tidier",
    week: 3,
    pins: `Trig ${U.trig} · Echo ${U.echo} · Vcc 5V · Gnd GND`,
    code: `long duration;
float distance;

void setup() {
  pinMode(${U.trig}, OUTPUT);
  pinMode(${U.echo}, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(${U.trig}, LOW);
  delayMicroseconds(2);
  digitalWrite(${U.trig}, HIGH);
  delayMicroseconds(10);
  digitalWrite(${U.trig}, LOW);

  duration = pulseIn(${U.echo}, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  delay(500);
}`,
  },
  {
    id: "ultrasonic-explain-challenge",
    title: "Explain Each Box",
    week: 3,
    code: `void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
}`,
  },

  // ---------- Week 4 ----------
  {
    id: "motors-basic",
    title: "Drive the Motors",
    week: 4,
    pins: `ENA ${M.ena} · IN1 ${M.in1} · IN2 ${M.in2} · IN3 ${M.in3} · IN4 ${M.in4} · ENB ${M.enb}`,
    code: `void setup() {
  pinMode(${M.in1}, OUTPUT);
  pinMode(${M.in2}, OUTPUT);
  pinMode(${M.in3}, OUTPUT);
  pinMode(${M.in4}, OUTPUT);
  pinMode(${M.enb}, OUTPUT);
  pinMode(${M.ena}, OUTPUT);
}

void loop() {
  digitalWrite(${M.in1}, HIGH);
  digitalWrite(${M.in2}, LOW);
  analogWrite(${M.ena}, 150);

  digitalWrite(${M.in3}, HIGH);
  digitalWrite(${M.in4}, LOW);
  analogWrite(${M.enb}, 150);

  delay(2000);

  digitalWrite(${M.in1}, LOW);
  digitalWrite(${M.in2}, HIGH);
  analogWrite(${M.ena}, 150);

  digitalWrite(${M.in3}, LOW);
  digitalWrite(${M.in4}, HIGH);
  analogWrite(${M.enb}, 150);

  delay(2000);
}`,
  },

  // ---------- Week 5 ----------
  {
    id: "servo-unscramble",
    title: "Unscramble the Servo Code",
    week: 5,
    pins: `signal ${S} · red 5V · brown GND`,
    code: `myServo.write(0);

Servo myServo;

delay(1000);

myServo.attach(${S});

myServo.write(90);

#include <Servo.h>`,
  },

  // ---------- Week 6 ----------
  {
    id: "if-statement",
    title: "The IF Statement",
    week: 6,
    code: `// Motor control based on distance
if (distance > 0 && distance < 20) {
  // STOP both motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
} else {
  // Move FORWARD (both motors forward)
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}`,
  },
  {
    id: "robot-car-full",
    title: "THE ROBOT CAR",
    week: 6,
    pins: `servo ${SC} · Trig ${U.trig} · Echo ${U.echo} · ENA ${M.ena} · IN1 ${M.in1} · IN2 ${M.in2} · IN3 ${M.in3} · IN4 ${M.in4} · ENB ${M.enb}`,
    code: `#include <Servo.h>

Servo myServo;

const int trigPin = ${U.trig};
const int echoPin = ${U.echo};
const int servoPin = ${SC};

const int ena = ${M.ena};  // Left motor speed
const int in1 = ${M.in1};  // Left motor IN1
const int in2 = ${M.in2};   // Left motor IN2
const int in3 = ${M.in3};   // Right motor IN3
const int in4 = ${M.in4};   // Right motor IN4
const int enb = ${M.enb};   // Right motor speed

long duration;
float distance;

int angle = 0;
int direction = 1;

void setup() {
  myServo.attach(servoPin);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(ena, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(enb, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Move the servo to current angle
  myServo.write(angle);
  delay(200);

  // Trigger ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read echo and compute distance
  duration = pulseIn(echoPin, HIGH, 30000);
  distance = duration * 0.0343 / 2;

  // Print to serial
  Serial.print("Angle: ");
  Serial.print(angle);
  Serial.print(" | Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Motor control based on distance
  if (distance > 0 && distance < 20) {
    // STOP both motors
    analogWrite(ena, 0);
    analogWrite(enb, 0);
    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);
    digitalWrite(in3, LOW);
    digitalWrite(in4, LOW);
  } else {
    // Move FORWARD (both motors forward)
    analogWrite(ena, 150);
    analogWrite(enb, 150);
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
    digitalWrite(in3, HIGH);
    digitalWrite(in4, LOW);
  }

  // Sweep the servo
  angle += 15 * direction;
  if (angle >= 180 || angle <= 0) {
    direction *= -1;
  }
}`,
  },

  // ---------- Week 7 ----------
  {
    id: "test-everything",
    title: "Test the Wheels",
    week: 7,
    pins: `ENA ${M.ena} · IN1 ${M.in1} · IN2 ${M.in2} · IN3 ${M.in3} · IN4 ${M.in4} · ENB ${M.enb}`,
    code: `/* ============================================================
   THE ROBOT CAR  —  TEST THE WHEELS

   Run this FIRST, before any of your own code.

   PUT THE CAR ON BLOCKS so the wheels spin in the air.
   A book under each end works.

   Open the Serial Monitor (Tools > Serial Monitor, set to 9600)
   and watch the words while you watch the wheels.

   It does four things, then stops:

     1. Both wheels FORWARD
     2. Both wheels BACKWARD
     3. Spin LEFT      (wheels turn opposite ways)
     4. Spin RIGHT     (the other way around)

   If a step does not match the words, that is your problem.
   Press RESET to run it again.

   ============================================================ */

const int ena = ${M.ena};   // one side, speed
const int in1 = ${M.in1};   // one side
const int in2 = ${M.in2};   // one side
const int in3 = ${M.in3};   // other side
const int in4 = ${M.in4};   // other side
const int enb = ${M.enb};   // other side, speed

const int SPEED = 180;     // 0 to 255
const int STEP  = 1500;    // how long each test runs, in ms


void setup() {
  pinMode(ena, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(enb, OUTPUT);

  Serial.begin(9600);

  stopCar();

  Serial.println("WHEELS OFF THE GROUND?");
  Serial.println("Starting in 3 seconds...");
  delay(3000);

  Serial.println("1. FORWARD  - both wheels the same way");
  bothForward();
  delay(STEP);
  stopCar();
  delay(600);

  Serial.println("2. BACKWARD - both wheels the other way");
  bothBackward();
  delay(STEP);
  stopCar();
  delay(600);

  Serial.println("3. SPIN LEFT  - wheels opposite ways");
  spinLeft();
  delay(STEP);
  stopCar();
  delay(600);

  Serial.println("4. SPIN RIGHT - wheels opposite ways");
  spinRight();
  delay(STEP);
  stopCar();

  Serial.println("DONE. Press RESET to test again.");
}


void loop() {
  // nothing here - the test runs one time, in setup()
}


// ---------- the four movements ----------

void bothForward() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  analogWrite(ena, SPEED);
  analogWrite(enb, SPEED);
}

void bothBackward() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  analogWrite(ena, SPEED);
  analogWrite(enb, SPEED);
}

void spinLeft() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  analogWrite(ena, SPEED);
  analogWrite(enb, SPEED);
}

void spinRight() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  analogWrite(ena, SPEED);
  analogWrite(enb, SPEED);
}

void stopCar() {
  analogWrite(ena, 0);
  analogWrite(enb, 0);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}`,
  },
  {
    id: "course-challenge",
    title: "Make It Move",
    week: 7,
    pins: `servo ${SC} · ENA ${M.ena} · IN1 ${M.in1} · IN2 ${M.in2} · IN3 ${M.in3} · IN4 ${M.in4} · ENB ${M.enb}`,
    code: `/* ============================================================
   THE ROBOT CAR  —  WEEK 7

   YOUR COMMANDS:

     go_forward(50);     drive forward about 50 cm
     turn_left(90);      turn left about 90 degrees
     turn_right(90);     turn right about 90 degrees

   The numbers are a request, not a promise. Your car is not
   exactly like anyone else's, so you will have to change them
   until your car does what you meant.

   HOW TO RUN IT:

     1. Upload your code
     2. You have 5 seconds to put the car on the start line
     3. Watch it go
     4. Press the RESET button on the Arduino to run it again

   ============================================================ */


// ============================================================
//  1.  YOUR COURSE          <-- YOU TYPE HERE
// ============================================================

void runCourse() {

  // your code goes here

}

// ============================================================
//  END OF YOUR COURSE
// ============================================================


// ============================================================
//  2.  YOUR CAR'S NUMBERS   <-- only when you calibrate
// ============================================================

//  Found in the ONE METER challenge.
//  Car goes too far?   make this number SMALLER.
//  Car stops short?    make this number BIGGER.
int MS_PER_CM = 25;

//  Found in the SQUARE challenge.
//  Car turns too far?  make this number SMALLER.
//  Not far enough?     make this number BIGGER.
int MS_PER_DEGREE = 6;

//  Only if your car will not drive straight.
//  Pulling LEFT?   make leftSpeed bigger.
//  Pulling RIGHT?  make rightSpeed bigger.
//  Biggest number allowed is 255.
int leftSpeed  = 180;
int rightSpeed = 180;

// ============================================================


/* ============================================================

   ,-----------------------------------------------------.
   |                                                     |
   |    DO NOT CHANGE ANYTHING BELOW THIS LINE           |
   |                                                     |
   |    This is the part that makes your commands work.  |
   |                                                     |
   \`-----------------------------------------------------'

   ============================================================ */

#include <Servo.h>
Servo myServo;

const int servoPin = ${SC};
const int trigPin  = ${U.trig};
const int echoPin  = ${U.echo};

const int ena = ${M.ena};   // left motor speed
const int in1 = ${M.in1};   // left motor
const int in2 = ${M.in2};    // left motor
const int in3 = ${M.in3};    // right motor
const int in4 = ${M.in4};    // right motor
const int enb = ${M.enb};    // right motor speed

const int SETTLE_MS = 150;   // tiny pause between moves


void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ena, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(enb, OUTPUT);

  Serial.begin(9600);

  myServo.attach(servoPin);
  myServo.write(90);          // point the sensor straight ahead
  delay(500);

  stopCar();

  Serial.println("Put the car on the start line!");
  delay(5000);

  Serial.println("Go.");
  runCourse();

  stopCar();
  Serial.println("Done. Press RESET to run again.");
}


void loop() {
  // nothing here - your course runs one time, in setup()
}


// ---------- the commands ----------

void go_forward(int cm) {
  Serial.print("forward ");
  Serial.print(cm);
  Serial.println(" cm");

  motorsForward();
  delay((unsigned long)cm * MS_PER_CM);
  stopCar();
  delay(SETTLE_MS);
}

void turn_left(int degrees) {
  Serial.print("left ");
  Serial.print(degrees);
  Serial.println(" degrees");

  motorsSpinLeft();
  delay((unsigned long)degrees * MS_PER_DEGREE);
  stopCar();
  delay(SETTLE_MS);
}

void turn_right(int degrees) {
  Serial.print("right ");
  Serial.print(degrees);
  Serial.println(" degrees");

  motorsSpinRight();
  delay((unsigned long)degrees * MS_PER_DEGREE);
  stopCar();
  delay(SETTLE_MS);
}


// ---------- motor control ----------

void motorsForward() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  analogWrite(ena, leftSpeed);
  analogWrite(enb, rightSpeed);
}

void motorsSpinLeft() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  analogWrite(ena, leftSpeed);
  analogWrite(enb, rightSpeed);
}

void motorsSpinRight() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  analogWrite(ena, leftSpeed);
  analogWrite(enb, rightSpeed);
}

void stopCar() {
  analogWrite(ena, 0);
  analogWrite(enb, 0);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}`,
  },
];
