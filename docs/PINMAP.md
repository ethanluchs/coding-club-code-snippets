# Pin Map — matches the wiring diagrams, week by week

**Rule: the code on each week's page uses the same pins as the wiring diagram
on that week's slide.** A kid looking at a diagram and the code together
should never see two different numbers.

---

## Week by week

### Week 2 & 5 — Servo on its own
Diagram: p.21, p.29, p.61

| Wire | Pin |
|---|---|
| Signal (orange) | **9** |
| Power (red) | 5V |
| Ground (brown) | GND |

### Week 3 — Ultrasonic on its own
Diagram: p.35

| Wire | Pin |
|---|---|
| Vcc | 5V |
| Trig | **3** |
| Echo | **2** |
| Gnd | GND |

### Week 4 & 5 — Motors + L298N
Diagram: p.47, p.58, p.62

| Wire | Pin |
|---|---|
| ENA | **11** |
| IN1 | **10** |
| IN2 | **9** |
| IN3 | **7** |
| IN4 | **6** |
| ENB | **5** |
| GND | GND |
| +12V | battery pack + |

### Week 6 — The whole car
Diagram: p.69 (all three panels)

| Component | Wire | Pin |
|---|---|---|
| **Servo** | signal | **4** |
| | power / ground | 5V / GND |
| **Ultrasonic** | Trig | **3** |
| | Echo | **2** |
| | Vcc / Gnd | 5V / GND |
| **L298N** | ENA | **11** |
| | IN1 | **10** |
| | IN2 | **9** |
| | IN3 | **7** |
| | IN4 | **6** |
| | ENB | **5** |
| | GND / +12V | GND / battery + |

Free pins in the finished car: **8, 12, 13**.

---

## The one thing that changes between weeks

**The servo moves from pin 9 (Weeks 2 & 5) to pin 4 (Week 6).**

That is not a mistake — in the finished car pin 9 is IN2 on the motor driver.
The servo has to move. It is the only component that moves all course.

Every Week 6 page says so in one line:
> *Heads up: the servo is on **pin 4** now, not pin 9. Pin 9 is a motor in the
> finished car.*

Motors and the ultrasonic sensor keep the same pins from the week they are
introduced right through to the finished car. Nothing else gets rewired.

---

## Corrections to the deck

Two slides disagree with their own week's diagram. The site follows the
**diagrams**; these two slides need fixing in the deck.

**1. p.34 (Week 3 teaching slide) uses trig=9 / echo=10.**
Week 3's actual diagram (p.35) says trig=3 / echo=2. p.34 has no diagram of
its own, so the site uses 3 and 2 and p.34's numbers are dropped. The slide
should be updated to 3 and 2 so it matches p.35.

**2. p.71/72 (final car code) uses servo=5, trig=10, echo=11, IN1–IN4 =
6,7,8,9.** Every one of those collides with the confirmed motor wiring:

| p.71 code says | collides with |
|---|---|
| servo = 5 | ENB = 5 |
| trig = 10 | IN1 = 10 |
| echo = 11 | ENA = 11 |
| in1..in4 = 6,7,8,9 | IN4=6, IN3=7, IN2=9 (and 8 is unused) |

Wired as p.69 shows, the p.71 sketch cannot work — which confirms p.69 is the
real build and the p.71 code is stale. The site ships the sketch re-pinned to
the diagram. **The p.71/72 code slides need updating in the deck to match.**

Confirmed by Ethan: motors are ENA 11, IN1 10, IN2 9, IN3 7, IN4 6, ENB 5,
carried from Week 4 into Week 6.

---

## Why the free pins land where they do

Once the motors are fixed at 5, 6, 7, 9, 10, 11, the only pins left are
2, 3, 4, 8, 12, 13. Servo=4 and Trig/Echo=3/2 fall straight out of that —
and they are exactly what the Week 3 and Week 6 diagrams already show. The
diagrams were right; only the code slides drifted.

Two details worth knowing, both satisfied by this map:

- **ENA and ENB must be PWM pins** for `analogWrite()` speed control to do
  anything. On an Uno those are 3, 5, 6, 9, 10, 11. ENA=11 and ENB=5 ✓
- **The Servo library takes over the timer driving PWM on pins 9 and 10**, so
  `analogWrite()` stops working on those two once `Servo.h` is included. ENA
  and ENB avoid both. ✓ Speed control still works in the finished car.

Also: pull the **ENA/ENB jumper caps** off the L298N, or the board ignores
those pins and runs the motors flat out regardless of `analogWrite()`.

---

## Keeping it consistent in the code

Pins live in one file, `content/pins.ts`, grouped by the stage they belong to:

```ts
export const PINS = {
  // Weeks 2 & 5 — servo alone
  servoSolo: { signal: 9 },

  // Week 3 — ultrasonic alone
  sonar: { trig: 3, echo: 2 },

  // Weeks 4-6 — motors (unchanged once introduced)
  motors: { ena: 11, in1: 10, in2: 9, in3: 7, in4: 6, enb: 5 },

  // Week 6 — servo moves off pin 9 to make room for IN2
  servoCar: { signal: 4 },
} as const;
```

Snippets interpolate from this rather than hardcoding, so a snippet's code and
its on-page wiring table can never drift apart:

```ts
code: `const int servoPin = ${PINS.servoCar.signal};`
```

`npm run check-pins` fails the build if a snippet hardcodes a pin number or
lists a wire that is not in `PINS`. Wire it into `npm run build`.
