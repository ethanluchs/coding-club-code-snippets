/**
 * THE PIN MAP — single source of truth.
 *
 * Every snippet interpolates its pin numbers from here, so the code a kid
 * copies can never disagree with the wiring shown next to it.
 *
 * These match the wiring diagrams in the curriculum deck, week by week.
 * See docs/PINMAP.md for the full rationale.
 */

export const PINS = {
  /** Weeks 2 & 5 — servo on its own (deck p.21, p.29, p.61) */
  servoSolo: {
    signal: 9,
  },

  /** Week 3 — ultrasonic on its own (deck p.35) */
  sonar: {
    trig: 3,
    echo: 2,
  },

  /** Weeks 4-6 — L298N motor driver. Unchanged once introduced. (deck p.47) */
  motors: {
    ena: 11,
    in1: 10,
    in2: 9,
    in3: 7,
    in4: 6,
    enb: 5,
  },

  /**
   * Week 6 — the servo moves off pin 9, because pin 9 becomes IN2 on the
   * motor driver in the finished car. (deck p.69)
   */
  servoCar: {
    signal: 4,
  },
} as const;

/** Every pin number in use, for the build-time consistency check. */
export const ALL_PINS: number[] = [
  PINS.servoSolo.signal,
  PINS.sonar.trig,
  PINS.sonar.echo,
  PINS.motors.ena,
  PINS.motors.in1,
  PINS.motors.in2,
  PINS.motors.in3,
  PINS.motors.in4,
  PINS.motors.enb,
  PINS.servoCar.signal,
];
