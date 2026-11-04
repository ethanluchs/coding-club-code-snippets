import { PINS } from "./pins";

const M = PINS.motors;
const U = PINS.sonar;

export interface WireRow {
  /** Hex of the actual wire in the diagram, or null for a plain row. */
  swatch: string | null;
  from: string;
  to: string;
}

export interface WiringDiagram {
  id: string;
  n: number;
  title: string;
  /** Path under /public. */
  img: string;
  width: number;
  height: number;
  /** Groups of rows; the heading is optional. */
  groups: { heading?: string; rows: WireRow[] }[];
  /** One short line under the table. */
  note?: string;
}

const BLACK = "#1c1c1c";
const RED = "#c40000";

export const diagrams: WiringDiagram[] = [
  {
    id: "motors",
    n: 1,
    title: "Motors to driver",
    img: "/wiring/motors.png",
    width: 913,
    height: 566,
    groups: [
      {
        heading: "Both motors on one side",
        rows: [
          { swatch: BLACK, from: "black", to: "OUT4" },
          { swatch: RED, from: "red", to: "OUT3" },
        ],
      },
      {
        heading: "Both motors on the other side",
        rows: [
          { swatch: BLACK, from: "black", to: "OUT1" },
          { swatch: RED, from: "red", to: "OUT2" },
        ],
      },
    ],
    note: "Two motors share each screw terminal. Same colour goes to the same screw — both blacks together, both reds together.",
  },
  {
    id: "driver",
    n: 2,
    title: "Driver to Arduino",
    img: "/wiring/driver.png",
    width: 422,
    height: 270,
    groups: [
      {
        rows: [
          { swatch: "#f07000", from: "ENA", to: `pin ${M.ena}` },
          { swatch: "#e838c0", from: "IN1", to: `pin ${M.in1}` },
          { swatch: "#17a81a", from: "IN2", to: `pin ${M.in2}` },
          { swatch: "#e8e020", from: "IN3", to: `pin ${M.in3}` },
          { swatch: RED, from: "IN4", to: `pin ${M.in4}` },
          { swatch: "#2b6fd8", from: "ENB", to: `pin ${M.enb}` },
        ],
      },
    ],
    note: "IN1 and IN2 drive one side, IN3 and IN4 the other. Which side is which depends on how your driver is mounted — test it and swap if the car turns the wrong way.",
  },
  {
    id: "power",
    n: 3,
    title: "Power",
    img: "/wiring/power.png",
    width: 682,
    height: 402,
    groups: [
      {
        heading: "Battery pack",
        rows: [
          { swatch: RED, from: "battery +", to: "driver 12V" },
          { swatch: BLACK, from: "battery −", to: "driver GND" },
        ],
      },
      {
        heading: "Driver",
        rows: [
          { swatch: BLACK, from: "driver GND", to: "Arduino GND" },
          { swatch: "#e8e020", from: "driver 5V", to: "breadboard + rail" },
        ],
      },
      {
        heading: "Breadboard",
        rows: [
          { swatch: "#f07000", from: "+ rail", to: "Arduino 5V" },
        ],
      },
    ],
    note: "The driver makes the 5V. It goes out to the breadboard rail, and the rail feeds both the Arduino and the sensor.",
  },
  {
    id: "sensor",
    n: 4,
    title: "Distance sensor",
    img: "/wiring/sensor.png",
    width: 466,
    height: 367,
    groups: [
      {
        rows: [
          { swatch: "#2ad4d4", from: "Vcc", to: "breadboard + rail" },
          { swatch: "#f07000", from: "Trig", to: `pin ${U.trig}` },
          { swatch: "#9b4fc8", from: "Echo", to: `pin ${U.echo}` },
          { swatch: "#7a4a2a", from: "Gnd", to: "Arduino GND" },
        ],
      },
    ],
    note: "Pin order on the sensor is Vcc, Trig, Echo, Gnd.",
  },
];
