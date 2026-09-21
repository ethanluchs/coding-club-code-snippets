# Snippet Inventory

Every code snippet extracted from `YMCA 6 weeks.pdf`, in curriculum order.
Source page numbers refer to the PDF. This is the source of truth for
`content/snippets/*.ts` — transcribe from here, not from the PDF.

Status key: **VERBATIM** = copied exactly from a slide. **RECONSTRUCTED** =
slide was truncated or split; assembled and needs sign-off.

> **Pin numbers below match each week's own wiring diagram.** Two slides
> (p.34 and p.71/72) disagreed with their diagrams and have been corrected
> here; both are marked **RE-PINNED** and explained in `docs/PINMAP.md`.

---

## Week 1 — Getting Started

### 1.1 Hello, World! (Serial Print)
- id: `hello-world`
- week: 1
- source: p.12, p.28, p.40 (repeated 3x in deck)
- status: VERBATIM
- wiring: none — USB only
- blurb: Your very first program. It writes a message to the Serial Monitor
  once every second.
- note: Open the **Serial Monitor** (top right of the editor) to see it.

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello, World!");
  delay(1000);
}
```

### 1.2 Blink the Built-in LED
- id: `blink-led`
- week: 1
- source: p.16
- status: VERBATIM
- wiring: none — uses the LED already on the board
- blurb: Turns the little light on the Arduino on and off, once a second.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

### 1.3 Print Your Name — CHALLENGE
- id: `print-your-name`
- week: 1
- source: p.23
- status: VERBATIM
- kind: challenge
- wiring: none
- blurb: Change the words so it prints YOUR name and YOUR favourite colour.
  Then make it repeat every 2 seconds. Show someone next to you.
- note: The starter prints only once, because the printing is in `setup()`.
  To repeat it, the lines need to move into `loop()`.

```cpp
void setup() {
  Serial.begin(9600);
  Serial.println("My name is Ian Yu");
  Serial.println("My favorite colour is blue");
}

void loop() {
}
```

---

## Week 2 — Servo Motor

### 2.1 Servo Sweep 0 and 90
- id: `servo-basic`
- week: 2
- source: p.20, p.21, p.29, p.61 (repeated 4x)
- status: VERBATIM
- wiring: Servo signal (orange) -> **pin 9**, red -> **5V**, brown -> **GND**
- blurb: Makes the servo turn to 90 degrees, wait a second, turn back to 0,
  and repeat forever.

```cpp
#include <Servo.h>

Servo myServo;  // Create a Servo object

void setup() {
  myServo.attach(9);  // Attach the servo to pin 9
}

void loop() {
  myServo.write(90);  // Rotate the servo to 90 degrees
  delay(1000);        // Wait for 1 second
  myServo.write(0);   // Rotate the servo to 0 degrees
  delay(1000);        // Wait for 1 second
}
```

### 2.2 Servo Full Sweep — CHALLENGE
- id: `servo-challenge`
- week: 2
- source: p.36
- status: VERBATIM
- kind: challenge
- wiring: same as 2.1
- blurb: This one swings all the way from 0 to 180. Can you change it so it
  only turns 90 degrees? Show someone next to you.

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(0);
  delay(1000);
  myServo.write(180);
  delay(1000);
}
```

---

## Week 3 — Ultrasonic Sensor

### 3.1 Distance Sensor (pins 2 and 3)
- id: `ultrasonic-distance`
- week: 3
- source: p.35
- status: VERBATIM
- wiring: Vcc -> **5V**, Trig -> **pin 3**, Echo -> **pin 2**, Gnd -> **GND**
- blurb: Measures how far away an object is and prints the distance in
  centimetres, twice a second.
- note: This is the version that matches the Week 3 wiring diagram. Use this
  one when the sensor is on its own on a breadboard.

```cpp
long duration;
int distance;

void setup() {
  pinMode(3, OUTPUT);
  pinMode(2, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(3, LOW);
  delayMicroseconds(2);
  digitalWrite(3, HIGH);
  delayMicroseconds(10);
  digitalWrite(3, LOW);

  duration = pulseIn(2, HIGH);
  distance = duration * 0.034 / 2;

  Serial.println(distance);
  delay(500);
}
```

### 3.2 Distance Sensor, explained
- id: `ultrasonic-explained`
- week: 3
- source: p.34
- status: **RE-PINNED** — slide showed 9/10, corrected to 3/2 to match the
  Week 3 wiring diagram (p.35). p.34 has no diagram of its own.
- wiring: Trig -> **pin 3**, Echo -> **pin 2** (same as 3.1)
- blurb: The same idea as above, but with a nicer print-out. The teaching
  slide breaks it into four parts: variables, set up, fire the pulse, then
  work out the distance from how long the echo took.
- note: **Speed of sound = 340 m/s = 0.034 cm per microsecond.** We divide by
  2 because the sound travels there AND back.

```cpp
long duration;
float distance;

void setup() {
  pinMode(3, OUTPUT);
  pinMode(2, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(3, LOW);
  delayMicroseconds(2);
  digitalWrite(3, HIGH);
  delayMicroseconds(10);
  digitalWrite(3, LOW);

  duration = pulseIn(2, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  delay(500);
}
```

### 3.3 Explain Each Box — CHALLENGE
- id: `ultrasonic-explain-challenge`
- week: 3
- source: p.39, p.48
- status: VERBATIM
- kind: challenge
- wiring: n/a — reading exercise
- blurb: No typing for this one. Read the three boxes and explain out loud to
  someone what each one does. Box 1 fires the pulse. Box 2 — what does it do?
  Box 3?
- note: `trigPin` and `echoPin` are names for pin numbers. Whoever wrote this
  code picked the names so it is easier to read.

```cpp
void loop() {
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
}
```

---

## Week 4 — Motors and the L298N

### 4.1 Two Motors, Forward then Backward
- id: `motors-basic`
- week: 4
- source: p.46, p.47, p.57, p.58, p.62 (repeated 5x)
- status: VERBATIM
- wiring: ENA -> **11**, IN1 -> **10**, IN2 -> **9**, IN3 -> **7**,
  IN4 -> **6**, ENB -> **5**, plus GND to GND and battery pack to +12V
- blurb: Drives both wheels forward for 2 seconds, then both backward for 2
  seconds, over and over.
- note: `analogWrite` sets the **speed**, any number from 0 to 255. The two
  `digitalWrite` lines set the **direction** — swap which one is HIGH and the
  wheel spins the other way.

```cpp
void setup() {
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(10, HIGH);
  digitalWrite(9, LOW);
  analogWrite(11, 150);

  digitalWrite(7, HIGH);
  digitalWrite(6, LOW);
  analogWrite(5, 150);

  delay(2000);

  digitalWrite(10, LOW);
  digitalWrite(9, HIGH);
  analogWrite(11, 150);

  digitalWrite(7, LOW);
  digitalWrite(6, HIGH);
  analogWrite(5, 150);

  delay(2000);
}
```

---

## Week 5 — Assembly and Servo Practice

### 5.1 Unscramble the Servo Code — CHALLENGE
- id: `servo-unscramble`
- week: 5
- source: p.60
- status: VERBATIM (as jumbled lines)
- kind: challenge
- wiring: signal -> **pin 9**, red -> **5V**, brown -> **GND**
- blurb: These six lines are in the WRONG ORDER. Put them back together so the
  servo turns left and right every 2 seconds.
- note: Display these as six separate lines, NOT as one code block. Each line
  individually copyable. The answer is NOT shown on the site.

Jumbled lines, in the order shown on the slide:
```
myServo.write(0);
Servo myServo;
delay(1000);
myServo.attach(9);
myServo.write(90);
#include <Servo.h>
```

Correct order, **for your reference only — not shown on the site**:
`#include <Servo.h>` / `Servo myServo;` / `myServo.attach(9);` (in setup) /
then in loop: `myServo.write(0);` / `delay(1000);` / `myServo.write(90);`
(plus a second `delay(1000);`).

Note the slide gives only six lines, so the kids also have to supply the
`void setup()` and `void loop()` wrappers and the second `delay`.

---

## Week 6 — The Finished Robot Car

### 6.1 If Statement — Stop When Something Is Close
- id: `if-statement`
- week: 6
- source: p.70
- status: VERBATIM
- wiring: n/a — this is a piece of the full sketch below
- blurb: The brain of the car. IF something is closer than 20cm, stop all four
  motor pins. Otherwise (ELSE), drive forward.
- note: `&&` means AND. So this reads: if distance is more than 0 AND less
  than 20. We check for more than 0 because the sensor returns 0 when it
  does not hear an echo back at all.

```cpp
// Motor control based on distance
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
}
```

### 6.2 THE ROBOT CAR — Full Sketch
- id: `robot-car-full`
- week: 6
- source: p.71 (setup) + p.72 (loop, truncated at bottom of slide)
- status: **RE-PINNED** — code structure is from p.71/72, pin numbers are from
  the p.69 wiring diagram. See `docs/PINMAP.md`.
- featured: true
- wiring: Servo -> **pin 4**. Trig -> **3**, Echo -> **2**.
  ENA -> **11**, IN1 -> **10**, IN2 -> **9**, IN3 -> **7**, IN4 -> **6**,
  ENB -> **5**. (Motors unchanged from Week 4.)
- blurb: Everything put together. The servo sweeps the sensor left and right
  like a radar, and the car drives forward until something gets within 20cm.
- note: Heads up — the servo is on **pin 4** now, not pin 9 like in Week 2.
  Pin 9 is a motor in the finished car. Everything else keeps the pins it had.
- warn: The pin numbers printed on slides p.71/72 do NOT match the p.69 wiring
  diagram and will not work. The numbers below are the corrected ones.

```cpp
#include <Servo.h>

Servo myServo;

const int trigPin = 3;
const int echoPin = 2;
const int servoPin = 4;

const int ena = 11;  // Left motor speed
const int in1 = 10;  // Left motor IN1
const int in2 = 9;   // Left motor IN2
const int in3 = 7;   // Right motor IN3
const int in4 = 6;   // Right motor IN4
const int enb = 5;   // Right motor speed

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
  Serial.print("° | Distance: ");
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
}
```

---

## Not included (deliberately)

**p.52** shows five loose code fragments floating on a blank slide:
`void setup() {`, `void loop() {`, `delay(1000);`,
`Serial.println("Hello, World!");`, `Serial.begin(9600);`.

This is an in-class sorting/recall activity, not a snippet to copy. It is the
Hello World program cut into pieces. Not on the site — but if you want it,
it would be a second `unscramble` challenge using the same component as 5.1.

All other code-bearing pages (12, 16, 20, 21, 23, 28, 29, 34, 35, 36, 39, 40,
46, 47, 48, 57, 58, 60, 61, 62, 70, 71, 72) are covered above.

---

## Decisions made

1. **Code matches the wiring diagram on its own week's slide.** That is the
   rule. Pins are recorded per week in **`docs/PINMAP.md`**.
2. **Two slides were wrong and are corrected on the site:**
   - **p.34** used trig=9 / echo=10 with no diagram. Corrected to **3 / 2** to
     match Week 3's actual diagram (p.35).
   - **p.71/72** used servo=5, trig=10, echo=11, IN1-4 = 6,7,8,9. Every one
     collides with the confirmed motor wiring, so the sketch is re-pinned to
     the p.69 diagram: **servo 4, trig 3, echo 2, ENA 11, IN1 10, IN2 9,
     IN3 7, IN4 6, ENB 5**.

   Both slides should be fixed in the deck so they agree with the site.
3. **The servo is the only thing that moves** — pin 9 in Weeks 2 & 5, pin 4 in
   Week 6, because pin 9 becomes IN2. Every Week 6 page says so explicitly.
4. **Example name stays "Ian Yu" / "blue"** in 1.3.
5. **No answers shown on the site** for any challenge (1.3, 2.2, 3.3, 5.1).
6. **`float distance` everywhere.** p.34 uses `float`, p.35 uses `int`.
   `float` is correct — `int` throws away the decimals.
7. **Desktop Arduino IDE**, not the web editor.
8. **ENA/ENB added to the Week 6 sketch.** p.71 had no speed control at all;
   with ENA=11 / ENB=5 wired per the diagram, `analogWrite()` works, so the
   finished car uses it. Both are PWM pins the Servo library does not disturb.

## Still needs your eye

- **p.72 is cut off.** The final car's `loop()` ends at `direction *= -1; }`
  with a scroll arrow, so the closing `}` of `loop()` is assumed. Check
  against your original that there is no trailing `delay()`.
- **p.69 servo label** renders as a small boxed "4". Read as pin 4, which is
  consistent (it is free, and everything else on that slide checks out).
  Worth a glance at the original to be sure.
- **Deck-only:** the Week-by-Week slide dates run backwards (W1 July 7th,
  W6 June 2nd).
