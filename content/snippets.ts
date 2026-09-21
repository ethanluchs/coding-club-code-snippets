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
};

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
];
