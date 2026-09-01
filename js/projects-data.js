/* ============================================================
   PROJECT DATA
   Add new projects here — the site will render them automatically.
   Each project:
     id          – unique slug, no spaces
     title       – project name
     tags        – array of short category tags
     status      – "Complete" | "In Progress"
     date        – date or date range shown on the card
     summary     – 1-2 sentence description shown on the card
     details     – longer paragraph(s) shown in the popup (array of strings, one per paragraph)
     specs       – optional array of {k: label, v: value} shown as small spec badges
     images      – array of image paths in assets/images/. Leave empty [] for "image coming soon".
   ============================================================ */

const PROJECTS = [
  {
    id: "hydrogen-turbofan-combustor",
    title: "Hydrogen Turbofan Combustor",
    tags: ["SolidWorks", "ANSYS Fluent", "CFD"],
    status: "Complete",
    date: "Penn Jet Propulsion — Sept 2025 – Present",
    summary:
      "Injector micromixer CAD, Fluent maldistribution analyses, and the choked-flow calculations behind a hydrogen fuel delivery system.",
    details: [
      "Contributed to the injector micromixer and combustor CAD for Penn Jet Propulsion's hydrogen-powered turbojet, modeling the micromixer geometry in SolidWorks that distributes hydrogen to each injector post around the combustion chamber.",
      "Ran a series of ANSYS Fluent maldistribution analyses on the micromixer to check that mass flow split evenly across every outlet, tracking velocity, static pressure, and static temperature through the branching tube network.",
      "Also handled the choked-flow and mass-flow calculations sizing the hydrogen delivery system — regulator, tubing, and injectors — using Darcy-Weisbach pressure-drop and choked-flow relations constrained by a 0.0025 kg/s mass flow requirement."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "CFD", v: "ANSYS Fluent" },
      { k: "Analysis", v: "Choked flow / mass flow" }
    ],
    images: [
      "combustor-assembly.png",
      "combustor-section.png",
      "combustor-injector-cad.png",
      "combustor-cfd-pressure.png",
      "combustor-calcs.png"
    ]
  },
  {
    id: "catapult",
    title: "Catapult",
    tags: ["SolidWorks", "3D Printing", "Laser Cutting"],
    status: "Complete",
    date: "MEAM 1010 — Fall 2025",
    summary:
      "A tabletop launching mechanism designed from scratch and built by hand — from CAD model to working prototype.",
    details: [
      "Designed and manufactured as part of MEAM 1010, Introduction to Mechanical Design. The catapult combines a hand-wound winch, a pinned throwing arm, and a laser-cut plywood frame into a single hand-crank launching mechanism.",
      "The project was an introduction to full-cycle mechanical design: modeling every part in SolidWorks, checking fits and tolerances before manufacturing, and adjusting the frame geometry based on how the laser-cut parts actually fit together in the first prototype."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "Process", v: "3D Print + Laser Cut" },
      { k: "Mechanism", v: "Hand-crank winch" }
    ],
    images: ["catapult.png"]
  },
  {
    id: "lighthouse",
    title: "Lighthouse",
    tags: ["SolidWorks", "Laser Cutting", "Assembly Design"],
    status: "Complete",
    date: "MEAM 1010 — Fall 2025",
    summary:
      "A tiered, interlocking hexagonal-prism assembly — nicknamed for its tower-like, tapering silhouette.",
    details: [
      "This assembly is built entirely from laser-cut hexagonal panels that slot and press-fit into one another with no adhesive, relying on tabbed joints, fastener bosses, and engraved reference labels to line every layer up correctly on reassembly.",
      "The design pushed on precise slot-and-tab tolerancing — cutting each panel just tight enough to hold together under its own friction while still allowing the structure to be taken apart and rebuilt cleanly."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "Process", v: "Laser Cutting" },
      { k: "Joinery", v: "Press-fit, adhesive-free" }
    ],
    images: ["lighthouse.png"]
  },
  {
    id: "puzzle",
    title: "Puzzle",
    tags: ["SolidWorks", "Assembly Design", "DFM"],
    status: "Complete",
    date: "MEAM 1010 — Fall 2025",
    summary:
      "A six-piece interlocking burr puzzle, modeled so that six differently-shaped blocks nest into one solid cube.",
    details: [
      "Six uniquely shaped pieces — each modeled individually in SolidWorks — were designed to interlock into a single cube with exactly one valid assembly path. Getting there meant working backward from the finished cube geometry, subdividing it into pieces that could still physically slide into place without colliding.",
      "The project was as much about spatial reasoning and degrees-of-freedom checking as it was about CAD: every piece had to be verified in the assembly to make sure a full, un-forced insertion sequence actually existed."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "Pieces", v: "6, unique geometry" },
      { k: "Focus", v: "Assembly-level tolerancing" }
    ],
    images: ["puzzle-1.png", "puzzle-2.png"]
  },
  {
    id: "fidget-spinner",
    title: "Fidget Spinner",
    tags: ["SolidWorks", "3D Printing"],
    status: "Complete",
    date: "MEAM 1010 — Fall 2025",
    summary:
      "A six-bladed spinner modeled around a standard bearing bore, balancing form, mass distribution, and print-ability.",
    details: [
      "Designed as an exercise in rotational parts — the six-point star form was modeled around a central bearing seat sized to a standard bore, with blended fillets at the root of each blade to manage stress concentrations and keep the part balanced during spin-up."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "Process", v: "3D Printing" },
      { k: "Bearing", v: "Standard bore seat" }
    ],
    images: ["fidget-spinner.png"]
  },
  {
    id: "piston",
    title: "Piston",
    tags: ["SolidWorks", "Kinematics", "Mechanism Design"],
    status: "Complete",
    date: "MEAM 1010 — Fall 2025",
    summary:
      "A crank-slider mechanism modeled to study how rotary motion converts into linear, piston-like travel.",
    details: [
      "This assembly models a basic crank-slider linkage — a rotating crank drives a connecting rod that pushes a sliding block back and forth in a straight line, the same fundamental mechanism behind an engine's piston-crankshaft system.",
      "Building it in SolidWorks meant getting the mates right: rotational joints at the crank and rod ends, and a sliding joint at the piston, so the assembly could actually be driven through its full range of motion without over-constraining the model."
    ],
    specs: [
      { k: "CAD", v: "SolidWorks" },
      { k: "Mechanism", v: "Crank-slider" },
      { k: "Motion", v: "Rotary → linear" }
    ],
    images: ["piston.png"]
  },
  {
    id: "attention-span-corrector",
    title: "Attention Span Corrector",
    tags: ["Arduino", "Embedded Systems", "Product Design"],
    status: "In Progress",
    date: "August 2026 — Present",
    summary:
      "Smart glasses that detect when you're looking at a screen for too long and interrupt you before it becomes a habit.",
    details: [
      "A wearable built around a TCS34725 RGB color sensor and a Seeed XIAO nRF52840 microcontroller to identify when the wearer is looking at an electronic display, using RGB and light-intensity signatures to distinguish screens from the rest of the world.",
      "Currently developing the Arduino-based detection algorithm, with audio and haptic feedback planned next — the goal is a genuinely annoying nudge (an alarm if you stare at a screen too long) that breaks the habit of losing an hour to a phone without noticing."
    ],
    specs: [
      { k: "Sensor", v: "TCS34725 RGB" },
      { k: "MCU", v: "Seeed XIAO nRF52840" },
      { k: "Status", v: "Detection algorithm in dev" }
    ],
    images: []
  },
  {
    id: "stirling-engine",
    title: "Stirling Engine",
    tags: ["Machining", "Manufacturing", "Precision Fabrication", "Tolerancing"],
    status: "In Progress",
    date: "MEAM 2010 — Fall 2026",
    summary:
      "A tabletop Stirling engine machined almost entirely from raw stock — lathe, mill, and CNC work building toward a fully assembled, running engine.",
    details: [
      "MEAM 2010 builds a Stirling engine in three stages: starting from a few provided components, then machining parts directly from engineering drawings, and finally designing and manufacturing custom elements — mounting block, piston, bedplate, crankshaft bearing tube, flywheel subassembly, and more.",
      "Manufacturing the roughly 15-18 parts means working across the manual mill, lathe, and Prototrak CNC mill, with metrology and tolerancing tying it all together — every fit has to be precise enough for the finished engine to actually run under its own power."
    ],
    specs: [
      { k: "Machines", v: "Mill, Lathe, Prototrak CNC" },
      { k: "Parts", v: "15+ machined components" },
      { k: "Focus", v: "Metrology & tolerancing" }
    ],
    images: []
  }
];
