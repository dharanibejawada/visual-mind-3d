import { Lesson, Difficulty, SourceType } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export const PRESET_LESSONS: Record<string, Lesson> = {
  'human-heart': {
    id: 'preset-human-heart',
    title: 'How the Human Heart Pumps Blood',
    subject: 'Biology',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Identify the four chambers of the heart and their distinct roles',
      'Trace deoxygenated vs oxygenated blood pathways',
      'Understand how cardiac valves prevent backward flow',
      'Relate the cardiac cycle to heart rate and pulse'
    ],
    summary: 'The human heart is a muscular four-chambered pump that circulates blood through systemic and pulmonary circuits, supplying oxygen and nutrients to every cell in the human body.',
    sections: [
      {
        heading: 'The Four Chambers & Two Circulatory Loops',
        explanation: 'The heart is divided into right and left sides. The right side receives oxygen-depleted blood from the body and sends it to the lungs. The left side receives fresh oxygen-rich blood from the lungs and pumps it outward to the entire body.',
        keyPoints: [
          'Right Atrium: Receives deoxygenated blood from the vena cava.',
          'Right Ventricle: Pumps blood into the pulmonary artery toward the lungs.',
          'Left Atrium: Collects oxygenated blood from pulmonary veins.',
          'Left Ventricle: The thickest muscular wall, pumping high-pressure blood into the aorta.'
        ],
        example: 'Like a municipal water pumping station that draws greywater for filtration and delivers clean pressurized drinking water through high-capacity pipes.',
        visualizationStepIds: ['step-chambers']
      },
      {
        heading: 'The One-Way Valves',
        explanation: 'Four internal valves (Tricuspid, Pulmonary, Mitral/Bicuspid, and Aortic) act as mechanical one-way check valves. They snap shut when chamber pressure rises, preventing blood from flowing backward.',
        keyPoints: [
          'AV Valves (Tricuspid & Mitral) separate atria from ventricles.',
          'Semilunar Valves (Pulmonic & Aortic) control blood exit into great arteries.',
          'The familiar "lub-dub" heartbeat sound is the acoustic snap of these valves closing.'
        ],
        example: 'Like revolving doors in a building that turn in only one direction so people cannot push back into the entrance.',
        visualizationStepIds: ['step-valves']
      },
      {
        heading: 'Systole, Diastole, and Blood Flow Dynamics',
        explanation: 'The cardiac cycle consists of diastole (relaxation/filling phase) and systole (contraction/ejection phase). Pacemaker cells in the Sinoatrial (SA) node generate rhythmic electrical impulses that stimulate coordinated muscle contraction.',
        keyPoints: [
          'Diastole: Chambers relax and passively fill with blood.',
          'Systole: Ventricles contract forcefully, ejecting blood into the aorta.',
          'Resting heart beats approximately 60-100 times per minute.'
        ],
        example: 'Like squeezing and releasing a rubber water pump bulb in rhythmic pulses.',
        visualizationStepIds: ['step-flow']
      }
    ],
    visualization: {
      templateId: 'human-heart',
      title: 'Interactive 3D Human Heart',
      description: 'Explore the 3D anatomical chambers, heart valves, and pulsing blood flow pathways.',
      parameters: {
        beatSpeed: 1.0,
        showBloodFlowParticles: true,
      },
      steps: [
        {
          id: 'step-chambers',
          title: 'The Four Chambers',
          explanation: 'Click the Right Atrium, Right Ventricle, Left Atrium, and Left Ventricle to inspect internal wall thickness and position.',
          highlightIds: ['left-ventricle', 'right-ventricle', 'left-atrium', 'right-atrium'],
          cameraPreset: 'front'
        },
        {
          id: 'step-valves',
          title: 'Cardiac Valves & Blood Ejection',
          explanation: 'Observe the Aortic and Mitral valves opening during ventricular systole to prevent regurgitation.',
          highlightIds: ['aorta', 'mitral-valve'],
          cameraPreset: 'close-up'
        },
        {
          id: 'step-flow',
          title: 'Systemic & Pulmonary Circulation',
          explanation: 'Blue particles show deoxygenated blood returning to the lungs; red particles show oxygen-rich blood surging through the aorta.',
          highlightIds: ['aorta', 'pulmonary-artery', 'vena-cava'],
          cameraPreset: 'isometric'
        }
      ],
      interactiveElements: [
        { id: 'left-ventricle', label: 'Left Ventricle', description: 'Thick muscular chamber that pumps oxygenated blood into systemic circulation via the Aorta.', color: '#ef4444' },
        { id: 'right-ventricle', label: 'Right Ventricle', description: 'Chamber pumping deoxygenated blood into the Pulmonary Artery to oxygenate in lungs.', color: '#3b82f6' },
        { id: 'left-atrium', label: 'Left Atrium', description: 'Upper chamber collecting oxygen-rich blood returning from pulmonary veins.', color: '#f87171' },
        { id: 'right-atrium', label: 'Right Atrium', description: 'Upper chamber receiving venous deoxygenated blood from the superior & inferior vena cava.', color: '#60a5fa' },
        { id: 'aorta', label: 'Aorta', description: 'The main trunk of the systemic arterial system carrying oxygen-rich blood under high pressure.', color: '#dc2626' },
        { id: 'pulmonary-artery', label: 'Pulmonary Artery', description: 'Vessel carrying deoxygenated blood from right ventricle to lungs.', color: '#2563eb' }
      ]
    },
    keyTakeaways: [
      'The heart has four chambers: two atria for receiving blood and two ventricles for pumping blood.',
      'The right side handles deoxygenated blood; the left side handles oxygenated blood.',
      'Four heart valves ensure strictly unidirectional blood flow.',
      'The left ventricle has the thickest muscle wall because it must overcome systemic vascular resistance.'
    ],
    quiz: [
      {
        question: 'Which chamber of the heart has the thickest muscular wall and why?',
        options: [
          'Left Ventricle, because it pumps blood to the entire body through the aorta',
          'Right Atrium, because it receives blood from all major body veins',
          'Right Ventricle, because it pumps blood against high atmospheric pressure',
          'Left Atrium, because it holds blood the longest duration'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Left Ventricle pumps blood throughout the entire systemic circulation, requiring significantly higher contractile force than the right ventricle.'
      },
      {
        question: 'What is the primary role of the heart valves?',
        options: [
          'To oxygenate the blood before leaving the heart',
          'To prevent backward flow of blood during contractions',
          'To regulate body temperature',
          'To produce red blood cells'
        ],
        correctAnswerIndex: 1,
        explanation: 'Valves act as one-way gates that snap closed when pressures change, ensuring blood flows in one direction only.'
      },
      {
        question: 'Which vessel carries deoxygenated blood from the heart to the lungs?',
        options: [
          'Aorta',
          'Pulmonary Artery',
          'Pulmonary Vein',
          'Superior Vena Cava'
        ],
        correctAnswerIndex: 1,
        explanation: 'The pulmonary artery is unique because it is an artery (carries blood away from heart) that carries deoxygenated blood to the lungs.'
      },
      {
        question: 'What causes the audible "lub-dub" sound of a heartbeat?',
        options: [
          'Blood splashing against chamber walls',
          'The snapping shut of cardiac valves',
          'The electrical firing of the SA node',
          'The expansion of the rib cage'
        ],
        correctAnswerIndex: 1,
        explanation: 'The first sound (lub) is the closure of AV valves; the second sound (dub) is the closure of semilunar valves.'
      }
    ],
    revision: {
      keyDefinitions: [
        { term: 'Systole', definition: 'The phase of the cardiac cycle when the ventricles contract and pump blood into the arteries.' },
        { term: 'Diastole', definition: 'The phase when the heart muscle relaxes and chambers fill with blood.' },
        { term: 'Myocardium', definition: 'The specialized muscular tissue comprising the wall of the heart.' },
        { term: 'SA Node', definition: 'The Sinoatrial node, natural pacemaker located in right atrium generating electrical impulses.' }
      ],
      commonMistakes: [
        'Confusing arteries and veins: Arteries move blood AWAY from the heart; veins carry blood TOWARDS the heart.',
        'Thinking all arteries carry oxygenated blood: The pulmonary artery is an exception that carries deoxygenated blood.'
      ],
      flashcards: [
        { front: 'Which valve lies between the Left Atrium and Left Ventricle?', back: 'Mitral (Bicuspid) Valve' },
        { front: 'What is standard resting blood pressure?', back: '120/80 mmHg (Systolic / Diastolic)' },
        { front: 'Where does deoxygenated blood enter the heart?', back: 'Right Atrium via Superior & Inferior Vena Cava' }
      ],
      summaryPoints: [
        'Right heart = Pulmonary circulation (to lungs)',
        'Left heart = Systemic circulation (to rest of body)',
        'Unidirectional flow maintained by 4 valves',
        'SA Node dictates heart rhythm'
      ]
    },
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'solar-system': {
    id: 'preset-solar-system',
    title: 'The Solar System & Planetary Orbits',
    subject: 'Astronomy / Physics',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Understand the heliocentric arrangement of the eight major planets',
      'Distinguish terrestrial rocky planets from outer gas and ice giants',
      'Learn Kepler’s laws of planetary motion and orbital periods',
      'Understand gravitational attraction as the centripetal force of orbits'
    ],
    summary: 'Our Solar System consists of our central star, the Sun, orbited by eight diverse planets, dwarf planets, moons, asteroids, and comets bound together by mutual gravitational attraction.',
    sections: [
      {
        heading: 'The Sun: Gravitational Engine of the System',
        explanation: 'The Sun contains 99.86% of all mass in the Solar System. Its immense gravitational field curves space-time, keeping every planet, asteroid, and comet in stable elliptical orbits.',
        keyPoints: [
          'Massive G-type main-sequence star powered by nuclear fusion of hydrogen into helium.',
          'Provides heat, light, and solar wind that shapes planetary atmospheres.',
          'Gravity provides the centripetal acceleration holding planetary orbits.'
        ],
        example: 'Like an athlete swinging a heavy hammer in a circle: tension in the wire holds the mass in orbit.',
        visualizationStepIds: ['step-sun']
      },
      {
        heading: 'Inner Terrestrial Planets vs Outer Gas Giants',
        explanation: 'The inner four planets (Mercury, Venus, Earth, Mars) are rocky, dense worlds. Beyond the Asteroid Belt lie the gas giants (Jupiter, Saturn) and ice giants (Uranus, Neptune).',
        keyPoints: [
          'Terrestrial: High density, solid silicate crusts, few or no moons.',
          'Jovian Giants: Massive hydrogen/helium atmospheres, ring systems, dozens of moons.',
          'The Asteroid Belt marks the transition zone between rocky and gaseous realms.'
        ],
        example: 'Like pebbles resting near a campfire while lighter steam clouds drift further outward.',
        visualizationStepIds: ['step-planets']
      },
      {
        heading: 'Kepler’s Laws of Planetary Motion',
        explanation: 'Planets do not orbit in perfect circles, but in ellipses with the Sun at one focus. Johannes Kepler proved that planets orbit faster when closer to the Sun and slower when further away.',
        keyPoints: [
          '1st Law: Orbits are ellipses with the Sun at one focus.',
          '2nd Law: A line joining a planet and the Sun sweeps out equal areas in equal times.',
          '3rd Law: The square of orbital period is proportional to the cube of semi-major axis (T² ∝ a³).'
        ],
        example: 'A roller coaster accelerating down a dip and slowing down as it reaches the peak of a high loop.',
        visualizationStepIds: ['step-orbits']
      }
    ],
    visualization: {
      templateId: 'solar-system',
      title: '3D Interactive Solar System',
      description: 'Interact with the Sun and orbiting planets. Toggle speeds, view orbital trails, and inspect individual planetary profiles.',
      parameters: {
        orbitSpeedMultiplier: 1.0,
        showOrbits: true,
      },
      steps: [
        {
          id: 'step-sun',
          title: 'The Sun and Heliocentrism',
          explanation: 'The glowing solar sphere anchored at the center exerts gravitational influence across billions of kilometers.',
          highlightIds: ['sun'],
          cameraPreset: 'top'
        },
        {
          id: 'step-planets',
          title: 'Rocky Inner vs Giant Outer Worlds',
          explanation: 'Zoom in to see Mercury, Venus, Earth, Mars, Jupiter with its great red storm, and Saturn with its magnificent rings.',
          highlightIds: ['earth', 'jupiter', 'saturn'],
          cameraPreset: 'isometric'
        },
        {
          id: 'step-orbits',
          title: 'Orbital Dynamics & Periods',
          explanation: 'Notice how Mercury completes an orbit in just 88 days, whereas Neptune takes 165 Earth years.',
          highlightIds: ['mercury', 'neptune'],
          cameraPreset: 'front'
        }
      ],
      interactiveElements: [
        { id: 'sun', label: 'Sun', description: 'Central G-type yellow dwarf star containing 99.86% of the solar system mass.', color: '#fbbf24' },
        { id: 'mercury', label: 'Mercury', description: 'Innermost rocky planet, fastest orbital period (88 days), cratered surface.', color: '#94a3b8' },
        { id: 'venus', label: 'Venus', description: 'Hottest planet with runaway greenhouse effect and dense CO2 atmosphere.', color: '#f59e0b' },
        { id: 'earth', label: 'Earth', description: 'Our home planet, the only known world harboring liquid surface oceans and life.', color: '#38bdf8' },
        { id: 'mars', label: 'Mars', description: 'The Red Planet, rich in iron oxide dust, home to Olympus Mons and Valles Marineris.', color: '#ef4444' },
        { id: 'jupiter', label: 'Jupiter', description: 'Largest planet, gas giant with Great Red Spot storm and over 90 moons.', color: '#d97706' },
        { id: 'saturn', label: 'Saturn', description: 'Gas giant famous for its spectacular ring system composed of billions of ice particles.', color: '#eab308' },
        { id: 'uranus', label: 'Uranus', description: 'Ice giant tilted on its side at 98 degrees, cold methane atmosphere.', color: '#06b6d4' },
        { id: 'neptune', label: 'Neptune', description: 'Outermost ice giant, deepest blue color, fastest supersonic planetary winds.', color: '#2563eb' }
      ]
    },
    keyTakeaways: [
      'Gravity from the Sun holds all eight planets in stable, elliptical orbits.',
      'Planets closer to the Sun travel much faster and have much shorter orbital periods.',
      'The solar system has two distinct groups: inner rocky worlds and outer gas/ice giants.',
      'Kepler’s 3rd Law establishes that orbital period scales directly with orbital distance.'
    ],
    quiz: [
      {
        question: 'According to Kepler’s Third Law, how does a planet’s distance from the Sun affect its orbital period?',
        options: [
          'More distant planets take longer to complete an orbit',
          'All planets orbit at the same speed regardless of distance',
          'More distant planets orbit faster due to reduced friction',
          'Distance only affects the planet’s axial rotation, not its orbit'
        ],
        correctAnswerIndex: 0,
        explanation: 'Kepler’s Third Law states T² ∝ a³. As distance increases, the orbital circumference grows and orbital speed drops, so period increases significantly.'
      },
      {
        question: 'Which planet is the hottest in our solar system, and why?',
        options: [
          'Venus, due to an extreme runaway carbon dioxide greenhouse effect',
          'Mercury, because it is closest to the Sun',
          'Jupiter, because of internal gravitational compression heat',
          'Mars, because of iron radiation'
        ],
        correctAnswerIndex: 0,
        explanation: 'Venus has a thick atmosphere of 96% CO2 trapping heat at roughly 465°C, making it hotter than Mercury despite being further from the Sun.'
      },
      {
        question: 'What celestial belt separates the inner terrestrial planets from the outer gas giants?',
        options: [
          'The Kuiper Belt',
          'The Asteroid Belt',
          'The Oort Cloud',
          'Van Allen Radiation Belt'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Main Asteroid Belt resides between the orbits of Mars and Jupiter.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'atom': {
    id: 'preset-atom',
    title: 'Atomic Structure & Electron Shells',
    subject: 'Chemistry / Physics',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Locate protons, neutrons, and electrons within the atom',
      'Understand electrical charges: positive nucleus and negative electron cloud',
      'Explain quantized electron energy levels and shells',
      'Connect atomic number and valence electrons to chemical bonding'
    ],
    summary: 'The atom is the fundamental building block of chemistry, comprising a dense central nucleus of protons and neutrons surrounded by orbiting electrons distributed across quantized energy shells.',
    sections: [
      {
        heading: 'The Nucleus: Mass and Charge',
        explanation: 'Nearly 99.94% of an atom’s total mass is concentrated in the microscopic central nucleus. Protons carry a +1 elementary electrical charge, while neutrons carry zero charge, held together by the Strong Nuclear Force.',
        keyPoints: [
          'Atomic Number (Z) = Total number of protons, which defines the chemical element.',
          'Mass Number (A) = Protons + Neutrons.',
          'The strong nuclear force overcomes proton-proton electrostatic repulsion.'
        ],
        example: 'If an atom were the size of a football stadium, the nucleus would be a marble sitting on the 50-yard line, yet containing almost the whole stadium’s weight!',
        visualizationStepIds: ['step-nucleus']
      },
      {
        heading: 'Electron Shells and Quantum Orbitals',
        explanation: 'Electrons orbit the nucleus at specific, discrete energy levels known as shells (K, L, M, N... or n=1, 2, 3). Electrons cannot exist between these quantized levels.',
        keyPoints: [
          'Shell 1 (n=1) holds a maximum of 2 electrons.',
          'Shell 2 (n=2) holds up to 8 electrons.',
          'Valence electrons in the outermost shell determine reactivity and chemical bonding.'
        ],
        example: 'Like standing on ladder rungs: you can stand on rung 1 or rung 2, but you cannot hover in the empty air between them.',
        visualizationStepIds: ['step-shells']
      }
    ],
    visualization: {
      templateId: 'atom',
      title: '3D Rutherford-Bohr Atom Model',
      description: 'Interact with protons and neutrons inside the nucleus, and watch electrons orbiting in quantized 3D orbital rings.',
      parameters: {
        atomicNumber: 6,
        elementName: 'Carbon',
      },
      steps: [
        {
          id: 'step-nucleus',
          title: 'The Dense Nucleus',
          explanation: 'Inspect the compact nucleus composed of red protons (+ charge) and grey neutrons (neutral).',
          highlightIds: ['protons', 'neutrons'],
          cameraPreset: 'close-up'
        },
        {
          id: 'step-shells',
          title: 'Quantized Electron Orbitals',
          explanation: 'Blue electrons whirl along concentric orbital trajectories without collapsing into the nucleus.',
          highlightIds: ['inner-shell', 'outer-shell'],
          cameraPreset: 'front'
        }
      ],
      interactiveElements: [
        { id: 'protons', label: 'Protons', description: 'Positively charged subatomic particles in nucleus determining atomic number.', color: '#ef4444' },
        { id: 'neutrons', label: 'Neutrons', description: 'Electrically neutral nucleons providing nuclear stability via strong force.', color: '#94a3b8' },
        { id: 'electrons', label: 'Electrons', description: 'Negatively charged leptons occupying quantized orbital shells.', color: '#06b6d4' }
      ]
    },
    keyTakeaways: [
      'Protons and neutrons reside in the nucleus, providing almost all of the atom’s mass.',
      'Electrons orbit in quantized energy shells with fixed maximum capacities.',
      'Valence electrons determine an element’s chemical reactivity and bonding behavior.'
    ],
    quiz: [
      {
        question: 'Which subatomic particle defines the identity (atomic number) of an element?',
        options: [
          'Proton',
          'Neutron',
          'Electron',
          'Positron'
        ],
        correctAnswerIndex: 0,
        explanation: 'The atomic number is strictly the number of protons. Changing the number of protons changes the element itself.'
      },
      {
        question: 'What is the maximum number of electrons that the first electron shell (n=1) can hold?',
        options: [
          '2',
          '8',
          '18',
          '32'
        ],
        correctAnswerIndex: 0,
        explanation: 'According to the 2n² rule, the first shell holds 2(1)² = 2 electrons.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'dna': {
    id: 'preset-dna',
    title: 'DNA Double Helix & Molecular Structure',
    subject: 'Biology / Genetics',
    difficulty: 'intermediate',
    language: 'English',
    learningObjectives: [
      'Describe the antiparallel double-helix structure of deoxyribonucleic acid',
      'Identify the 4 nitrogenous bases and Watson-Crick complementary base pairing rules',
      'Explain the sugar-phosphate backbone and phosphodiester bonds',
      'Understand how DNA unzips during semi-conservative replication'
    ],
    summary: 'DNA (Deoxyribonucleic acid) stores genetic instructions for all living organisms in an elegant double-stranded helical polymer composed of repeating nucleotide building blocks.',
    sections: [
      {
        heading: 'The Double Helix Architecture',
        explanation: 'Discovered by Watson, Crick, and Franklin, DNA consists of two polynucleotide strands winding around a central axis in a right-handed spiral. The strands run in opposite directions (antiparallel: 5\' to 3\' and 3\' to 5\').',
        keyPoints: [
          'Sugar-phosphate backbones form the outer structural rails.',
          'Nitrogenous base pairs face inward like the rungs of a twisted rope ladder.',
          'Major and minor grooves along the helix allow regulatory proteins to bind.'
        ],
        example: 'A spiral staircase where the handrails are made of alternating sugar and phosphate, and the steps are base pairs.',
        visualizationStepIds: ['step-helix']
      },
      {
        heading: 'Complementary Base Pairing Rules',
        explanation: 'Adenine (A) always pairs with Thymine (T) via 2 hydrogen bonds. Guanine (G) always pairs with Cytosine (C) via 3 hydrogen bonds. This strict pairing allows precise replication.',
        keyPoints: [
          'A = T (2 Hydrogen Bonds)',
          'G ≡ C (3 Hydrogen Bonds, thermally more stable)',
          'Purines (A, G) always pair with Pyrimidines (T, C), maintaining constant helix width (2.0 nm).'
        ],
        example: 'Like two uniquely cut puzzle pieces or a key and its lock: A fits only with T, and G fits only with C.',
        visualizationStepIds: ['step-bases']
      }
    ],
    visualization: {
      templateId: 'dna',
      title: '3D DNA Double Helix',
      description: 'Rotate and examine the twisted double helix strand, color-coded nitrogenous base pairs (A, T, C, G), and hydrogen bonding.',
      parameters: {
        turns: 4,
        rotationSpeed: 0.8,
      },
      steps: [
        {
          id: 'step-helix',
          title: 'Antiparallel Sugar-Phosphate Strands',
          explanation: 'The blue and violet ribbons show the continuous sugar-phosphate backbone winding in a double helix.',
          highlightIds: ['backbone-1', 'backbone-2'],
          cameraPreset: 'front'
        },
        {
          id: 'step-bases',
          title: 'Complementary Base Pairs (A-T & G-C)',
          explanation: 'Inspect the horizontal color rungs: Red (Adenine) bonds with Green (Thymine), and Yellow (Cytosine) bonds with Cyan (Guanine).',
          highlightIds: ['base-at', 'base-gc'],
          cameraPreset: 'close-up'
        }
      ],
      interactiveElements: [
        { id: 'adenine', label: 'Adenine (A)', description: 'Purine nitrogenous base that forms two hydrogen bonds with Thymine.', color: '#ef4444' },
        { id: 'thymine', label: 'Thymine (T)', description: 'Pyrimidine nitrogenous base complementary to Adenine.', color: '#22c55e' },
        { id: 'cytosine', label: 'Cytosine (C)', description: 'Pyrimidine nitrogenous base that forms three hydrogen bonds with Guanine.', color: '#eab308' },
        { id: 'guanine', label: 'Guanine (G)', description: 'Purine nitrogenous base complementary to Cytosine.', color: '#06b6d4' },
        { id: 'backbone', label: 'Sugar-Phosphate Backbone', description: 'Deoxyribose sugars linked by phosphodiester bridges.', color: '#8b5cf6' }
      ]
    },
    keyTakeaways: [
      'DNA is an antiparallel double-stranded helix.',
      'A pairs with T (2 hydrogen bonds); G pairs with C (3 hydrogen bonds).',
      'Complementary pairing enables high-fidelity copying during cell division.'
    ],
    quiz: [
      {
        question: 'Which base pairs with Guanine in DNA, and how many hydrogen bonds connect them?',
        options: [
          'Cytosine, connected by 3 hydrogen bonds',
          'Thymine, connected by 2 hydrogen bonds',
          'Adenine, connected by 3 hydrogen bonds',
          'Uracil, connected by 1 hydrogen bond'
        ],
        correctAnswerIndex: 0,
        explanation: 'Guanine pairs strictly with Cytosine via three hydrogen bonds (G ≡ C).'
      },
      {
        question: 'What does the term "antiparallel" mean regarding DNA structure?',
        options: [
          'The two strands run in opposite 5\' to 3\' directions',
          'The bases face away from each other',
          'One strand is made of RNA and one is made of DNA',
          'The strands never twist'
        ],
        correctAnswerIndex: 0,
        explanation: 'One strand runs 5\' to 3\' and the complementary strand runs 3\' to 5\'.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'photosynthesis': {
    id: 'preset-photosynthesis',
    title: 'Photosynthesis & Solar Energy Conversion',
    subject: 'Biology / Botany',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Understand the chemical equation for oxygenic photosynthesis',
      'Distinguish Light-Dependent Reactions from the Calvin Cycle',
      'Identify chloroplast structures: thylakoids, grana, and stroma',
      'Explain how photon absorption produces ATP and NADPH'
    ],
    summary: 'Photosynthesis is the biochemical process by which green plants, algae, and cyanobacteria convert light energy from the sun into chemical energy stored in glucose molecules.',
    sections: [
      {
        heading: 'The Master Equation: Inputs & Outputs',
        explanation: '6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ (Glucose) + 6O₂. Water molecules are split to release oxygen gas into the atmosphere as a byproduct.',
        keyPoints: [
          'Carbon Dioxide enters through leaf stomata.',
          'Water is absorbed by roots and transported via xylem vessels.',
          'Chlorophyll pigments absorb blue and red wavelengths while reflecting green light.'
        ],
        example: 'Like a solar-powered bio-factory that uses sunlight to bind carbon atoms into sugar bars.',
        visualizationStepIds: ['step-equation']
      },
      {
        heading: 'Inside the Chloroplast: Thylakoid Membrane',
        explanation: 'Light reactions occur on the thylakoid membrane stacks (grana). Photons excite electrons in Photosystem II and I, driving a proton gradient across ATP synthase.',
        keyPoints: [
          'Photolysis: H₂O is split into 2H⁺, electrons, and O₂.',
          'Electron transport chain synthesizes ATP and reduces NADP⁺ to NADPH.',
          'Stroma: Fluid matrix where the light-independent Calvin Cycle fixes CO₂ into sugars.'
        ],
        example: 'A hydroelectric dam: protons accumulate inside like water behind a dam wall, spinning ATP synthase turbines as they rush out.',
        visualizationStepIds: ['step-chloroplast']
      }
    ],
    visualization: {
      templateId: 'photosynthesis',
      title: 'Photosynthesis Biochemical Model',
      description: 'Observe incoming photons, water molecules splitting, CO2 fixation, and sugar production inside a 3D chloroplast.',
      parameters: {
        photonSpeed: 1.2,
        leafOpacity: 0.9,
      },
      steps: [
        {
          id: 'step-equation',
          title: 'Sunlight, Water, and CO2 Input',
          explanation: 'Golden photon streams strike the green chlorophyll surface as H2O and CO2 enter.',
          highlightIds: ['light-photons', 'water-input', 'co2-input'],
          cameraPreset: 'front'
        },
        {
          id: 'step-chloroplast',
          title: 'Thylakoid Grana & Calvin Cycle',
          explanation: 'Inside the chloroplast, green thylakoid disks harness light to generate ATP and glucose.',
          highlightIds: ['thylakoids', 'stroma', 'glucose-output'],
          cameraPreset: 'close-up'
        }
      ],
      interactiveElements: [
        { id: 'chloroplast', label: 'Chloroplast', description: 'Double-membrane organelle hosting photosynthetic machinery.', color: '#10b981' },
        { id: 'thylakoid', label: 'Thylakoid Membrane', description: 'Site of light-dependent reactions, chlorophyll pigments, and ATP synthase.', color: '#059669' },
        { id: 'stroma', label: 'Stroma', description: 'Enzymatic fluid where Calvin Cycle fixes carbon dioxide into sugar.', color: '#34d399' },
        { id: 'glucose', label: 'Glucose (C6H12O6)', description: 'High-energy organic carbohydrate stored or metabolized for plant growth.', color: '#f59e0b' }
      ]
    },
    keyTakeaways: [
      'Photosynthesis converts sunlight, water, and CO2 into glucose and oxygen.',
      'Light reactions happen in thylakoids; dark reactions (Calvin cycle) happen in the stroma.',
      'Splitting water (photolysis) is the source of Earth’s atmospheric oxygen.'
    ],
    quiz: [
      {
        question: 'What is the primary source of the oxygen gas released during photosynthesis?',
        options: [
          'Water (H2O)',
          'Carbon Dioxide (CO2)',
          'Glucose (C6H12O6)',
          'Mitochondria'
        ],
        correctAnswerIndex: 0,
        explanation: 'During photolysis in Photosystem II, water molecules are split, liberating oxygen gas into the atmosphere.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'electric-circuit': {
    id: 'preset-electric-circuit',
    title: 'Electric Circuits, Current, and Ohm’s Law',
    subject: 'Physics / Electrical Engineering',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Define Voltage (V), Current (I), and Resistance (R)',
      'Apply Ohm’s Law: V = I × R to solve electrical problems',
      'Distinguish series vs parallel circuit branches',
      'Trace electron drift velocity vs conventional current direction'
    ],
    summary: 'An electric circuit is a closed conducting loop allowing electrical charge to flow from high electric potential to low potential, delivering energy to loads like lamps and resistors.',
    sections: [
      {
        heading: 'Ohm’s Law: The Fundamental Triad',
        explanation: 'Voltage (Potential Difference) pushes charge; Resistance opposes flow; Current is the rate of charge flow (Coulombs per second). Stated mathematically: V = I × R.',
        keyPoints: [
          'Voltage (V): Measured in Volts (V), energy per unit charge.',
          'Current (I): Measured in Amperes (A), flow of 1 Coulomb/sec.',
          'Resistance (R): Measured in Ohms (Ω), friction against charge carriers.'
        ],
        example: 'Like water in a hose: water pressure is Voltage, pipe diameter/narrowing is Resistance, and water flow rate is Current.',
        visualizationStepIds: ['step-ohms-law']
      },
      {
        heading: 'Closed Loops and Electron Flow',
        explanation: 'Electrons naturally drift from the negative terminal to the positive terminal. By historical convention, electrical current is depicted flowing from positive to negative.',
        keyPoints: [
          'A circuit must be a complete unbroken loop for continuous charge flow.',
          'Opening a switch creates infinite resistance, stopping current immediately.',
          'Loads convert electrical energy into heat, light, or mechanical torque.'
        ],
        example: 'Like a ski lift chair loop: if the cable snaps or stops, all skiers halt.',
        visualizationStepIds: ['step-closed-loop']
      }
    ],
    visualization: {
      templateId: 'electric-circuit',
      title: 'Interactive 3D Electric Circuit',
      description: 'Interact with a power source (battery), switch, resistor, and glowing light bulb with animated moving electron charges.',
      parameters: {
        voltage: 9,
        resistance: 10,
        switchClosed: true,
      },
      steps: [
        {
          id: 'step-ohms-law',
          title: 'Battery Potential & Current Flow',
          explanation: 'Observe the blue electron particles flowing through the conductive copper wire loop.',
          highlightIds: ['battery', 'switch', 'bulb'],
          cameraPreset: 'front'
        },
        {
          id: 'step-closed-loop',
          title: 'Load Resistance & Filament Glow',
          explanation: 'The tungsten filament resists electron movement, dissipating electrical energy as radiant heat and bright light.',
          highlightIds: ['bulb', 'resistor'],
          cameraPreset: 'close-up'
        }
      ],
      interactiveElements: [
        { id: 'battery', label: 'DC Battery', description: 'Chemical cell providing electromotive force (EMF) to drive electrons.', color: '#ef4444' },
        { id: 'switch', label: 'Switch', description: 'Mechanical contact that connects or breaks the circuit path.', color: '#94a3b8' },
        { id: 'bulb', label: 'Lamp / Bulb', description: 'Resistive electrical load that glows as current passes through its filament.', color: '#fbbf24' },
        { id: 'resistor', label: 'Resistor', description: 'Passive two-terminal component limiting electrical current flow.', color: '#64748b' }
      ]
    },
    keyTakeaways: [
      'Current is directly proportional to voltage and inversely proportional to resistance (V = I * R).',
      'Charge flows only when there is a closed, uninterrupted conducting loop.',
      'Electrons drift toward positive potential, while conventional current is defined from positive to negative.'
    ],
    quiz: [
      {
        question: 'If a 12V battery is connected across a 4Ω resistor, what is the current flowing through the circuit?',
        options: [
          '3 Amperes',
          '48 Amperes',
          '0.33 Amperes',
          '16 Amperes'
        ],
        correctAnswerIndex: 0,
        explanation: 'According to Ohm’s Law, I = V / R = 12V / 4Ω = 3 Amperes.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'linked-list': {
    id: 'preset-linked-list',
    title: 'Linked Lists & Dynamic Memory in Computer Science',
    subject: 'Computer Science',
    difficulty: 'intermediate',
    language: 'English',
    learningObjectives: [
      'Understand node anatomy: Value and Next Pointer',
      'Compare contiguous array allocation with dynamic heap linked lists',
      'Trace O(1) head insertion vs O(n) element search/traversal',
      'Distinguish Singly, Doubly, and Circular Linked Lists'
    ],
    summary: 'A linked list is a fundamental linear data structure consisting of discrete nodes connected by pointer references rather than occupying contiguous memory locations.',
    sections: [
      {
        heading: 'Anatomy of a Node',
        explanation: 'Each node in a singly linked list contains two attributes: the data payload, and a pointer (`next`) holding the memory address of the subsequent node. The final node points to `NULL` (or `nullptr`).',
        keyPoints: [
          'Head: Pointer to the very first node.',
          'Tail: Final node whose next pointer is NULL.',
          'Memory is allocated non-contiguously on the heap during runtime.'
        ],
        example: 'Like a treasure hunt where each clue box contains a prize and a written map slip telling you where the next clue box is buried.',
        visualizationStepIds: ['step-nodes']
      },
      {
        heading: 'Insertion and Traversal Operations',
        explanation: 'Inserting a node at the head is O(1) time because you only update two pointers. Accessing an element by index requires O(n) traversal from the head.',
        keyPoints: [
          'Insert at Head: NewNode.next = Head; Head = NewNode (O(1)).',
          'Access by index: Follow next pointers n times (O(n)).',
          'No need for expensive contiguous array resizing or copying.'
        ],
        example: 'Adding a link to a metal chain: unhook one link, insert the new loop, and clamp shut without rebuilding the entire chain.',
        visualizationStepIds: ['step-operations']
      }
    ],
    visualization: {
      templateId: 'linked-list',
      title: '3D Interactive Linked List',
      description: 'Visualize nodes with values and animated pointer arrows. Watch step-by-step insertions and traversals in 3D.',
      parameters: {
        nodeCount: 5,
        animatedPointers: true,
      },
      steps: [
        {
          id: 'step-nodes',
          title: 'Head, Nodes, and Next Pointers',
          explanation: 'Notice each node capsule containing data (e.g. 10, 24, 38) and a glowing arrow pointing to the next node in memory.',
          highlightIds: ['node-0', 'node-1', 'node-2'],
          cameraPreset: 'front'
        },
        {
          id: 'step-operations',
          title: 'Pointer Rewiring & Traversal',
          explanation: 'Traversing the list starts from the Head and hops sequentially across next pointers until reaching NULL.',
          highlightIds: ['node-head', 'pointer-head'],
          cameraPreset: 'isometric'
        }
      ],
      interactiveElements: [
        { id: 'node-head', label: 'Head Pointer', description: 'Reference variable pointing to the first node of the list.', color: '#38bdf8' },
        { id: 'node-data', label: 'Node Payload', description: 'The value or object stored in this memory block.', color: '#8b5cf6' },
        { id: 'node-pointer', label: 'Next Pointer', description: 'Memory reference linking to the next node or NULL.', color: '#10b981' }
      ]
    },
    keyTakeaways: [
      'Linked lists allocate memory dynamically without requiring contiguous space.',
      'Insertion and deletion at known pointer locations is O(1).',
      'Searching or accessing an element at index i requires O(n) linear traversal.'
    ],
    quiz: [
      {
        question: 'What is the time complexity of inserting a node at the head of a singly linked list?',
        options: [
          'O(1) Constant Time',
          'O(n) Linear Time',
          'O(log n) Logarithmic Time',
          'O(n²) Quadratic Time'
        ],
        correctAnswerIndex: 0,
        explanation: 'Inserting at head only requires assigning the new node’s next pointer to current head and updating head, which takes constant time O(1).'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'wave': {
    id: 'preset-wave',
    title: 'Wave Mechanics: Frequency, Wavelength, and Energy',
    subject: 'Physics',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Define wave parameters: amplitude, wavelength (λ), and frequency (f)',
      'Apply the wave speed equation: v = f × λ',
      'Distinguish transverse waves from longitudinal pressure waves',
      'Understand wave superposition and constructive/destructive interference'
    ],
    summary: 'A wave is an oscillating disturbance that propagates through space or a physical medium, transferring energy and momentum from one location to another without transporting matter.',
    sections: [
      {
        heading: 'Wave Anatomy & The Universal Wave Equation',
        explanation: 'Every periodic wave is characterized by its Crest (peak), Trough (lowest point), Amplitude (height from equilibrium), and Wavelength (distance between successive crests). Wave speed equals frequency times wavelength: v = f × λ.',
        keyPoints: [
          'Amplitude (A): Determines intensity or loudness/brightness.',
          'Wavelength (λ): Distance for one complete cycle.',
          'Frequency (f): Number of cycles passing a fixed point per second (Hertz, Hz).'
        ],
        example: 'Ripples spreading across a pond when a pebble drops: water molecules oscillate up and down, while the energy travels outward in rings.',
        visualizationStepIds: ['step-wave-anatomy']
      }
    ],
    visualization: {
      templateId: 'wave',
      title: '3D Interactive Harmonic Wave',
      description: 'Interact with amplitude, wavelength, and frequency. Watch transverse oscillating particles propagate energy in real time.',
      parameters: {
        amplitude: 1.0,
        frequency: 1.5,
        wavelength: 2.0,
      },
      steps: [
        {
          id: 'step-wave-anatomy',
          title: 'Wavelength & Crest/Trough Oscillation',
          explanation: 'Observe the sinusoidal particle wave oscillating vertically while energy flows horizontally.',
          highlightIds: ['crest', 'trough', 'amplitude'],
          cameraPreset: 'front'
        }
      ],
      interactiveElements: [
        { id: 'crest', label: 'Crest', description: 'Point on the wave with maximum positive displacement from equilibrium.', color: '#38bdf8' },
        { id: 'trough', label: 'Trough', description: 'Point on the wave with maximum negative displacement from equilibrium.', color: '#8b5cf6' },
        { id: 'equilibrium', label: 'Equilibrium Line', description: 'Undisturbed resting position of the medium.', color: '#64748b' }
      ]
    },
    keyTakeaways: [
      'Waves transport energy without transporting matter.',
      'Wave speed equation: v = f * λ.',
      'Higher frequency means shorter wavelength when velocity remains constant.'
    ],
    quiz: [
      {
        question: 'If a wave has a frequency of 50 Hz and a wavelength of 4 meters, what is its speed?',
        options: [
          '200 m/s',
          '12.5 m/s',
          '0.08 m/s',
          '54 m/s'
        ],
        correctAnswerIndex: 0,
        explanation: 'Using the wave equation v = f * λ = 50 Hz * 4 m = 200 m/s.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'black-hole': {
    id: 'preset-black-hole',
    title: 'Black Holes, Event Horizons & Gravitational Singularities',
    subject: 'Astrophysics',
    difficulty: 'intermediate',
    language: 'English',
    learningObjectives: [
      'Understand gravitational collapse and Schwarzschild radius (rs = 2GM/c²)',
      'Explain the Event Horizon: the point of no return where escape velocity equals the speed of light',
      'Describe relativistic effects: gravitational time dilation and gravitational lensing',
      'Visualize accretion disks and relativistic jets'
    ],
    summary: 'A black hole is a region of spacetime where gravity is so intense that nothing—not even particles or light—can escape past its boundary, known as the event horizon.',
    sections: [
      {
        heading: 'The Event Horizon & Schwarzschild Radius',
        explanation: 'According to Einstein’s General Theory of Relativity, when a dying massive star collapses past its Schwarzschild radius, space-time curves into an inescapable gravitational well.',
        keyPoints: [
          'Event Horizon: The spherical boundary marking the threshold where escape velocity = c.',
          'Singularity: Central point of infinite density and curvature according to classical physics.',
          'No Information Escape: Classical objects passing the horizon can never transmit signals outward.'
        ],
        example: 'Like paddling a kayak towards a roaring waterfall: beyond a certain line in the river, current speed exceeds your maximum rowing speed.',
        visualizationStepIds: ['step-horizon']
      },
      {
        heading: 'Accretion Disks and Gravitational Lensing',
        explanation: 'Matter falling toward a black hole forms a superheated, swirling accretion disk emitting high-energy X-rays. Extreme gravity bends light rays around the horizon, creating a luminous photon ring.',
        keyPoints: [
          'Accretion disk reaches millions of degrees Kelvin through friction and tidal forces.',
          'Gravitational Lensing: Light from behind the black hole is warped into visible halos.',
          'Gravitational time dilation slows down external clocks near the horizon.'
        ],
        example: 'Looking at streetlights through the base of a wine glass, warping straight lines into glowing curved arcs.',
        visualizationStepIds: ['step-lensing']
      }
    ],
    visualization: {
      templateId: 'black-hole',
      title: '3D Relativistic Black Hole Simulation',
      description: 'Interact with the central pitch-black event horizon, swirling luminous accretion disk, and warped photon ring.',
      parameters: {
        spin: 0.9,
        diskTemperature: 6000,
      },
      steps: [
        {
          id: 'step-horizon',
          title: 'Event Horizon and Photon Sphere',
          explanation: 'The black spherical shadow represents the event horizon where light rays are trapped forever.',
          highlightIds: ['event-horizon', 'photon-ring'],
          cameraPreset: 'front'
        },
        {
          id: 'step-lensing',
          title: 'Swirling Accretion Disk & Relativistic Warping',
          explanation: 'Watch particles accelerate to relativistic speeds, glowing with intense friction in the accretion disk.',
          highlightIds: ['accretion-disk'],
          cameraPreset: 'isometric'
        }
      ],
      interactiveElements: [
        { id: 'event-horizon', label: 'Event Horizon', description: 'The outer boundary where escape velocity equals the speed of light.', color: '#000000' },
        { id: 'photon-ring', label: 'Photon Ring', description: 'Orbits of unstable photons bent tightly around the black hole.', color: '#f59e0b' },
        { id: 'accretion-disk', label: 'Accretion Disk', description: 'Superheated swirling plasma of matter spiraling inward.', color: '#ea580c' }
      ]
    },
    keyTakeaways: [
      'Past the event horizon, escape velocity exceeds the speed of light.',
      'Black holes warp spacetime so intensely that light bends around them (gravitational lensing).',
      'Matter falling in heats up to extreme temperatures in the accretion disk before crossing the horizon.'
    ],
    quiz: [
      {
        question: 'What is the Event Horizon of a black hole?',
        options: [
          'The boundary beyond which nothing, not even light, can escape',
          'The solid core at the center of the black hole',
          'The outer edge of the galaxy containing the black hole',
          'The cloud of gas that created the black hole'
        ],
        correctAnswerIndex: 0,
        explanation: 'The event horizon is the boundary where the escape velocity equals the speed of light c.'
      }
    ],
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  'tiger': {
    id: 'preset-tiger',
    title: 'Panthera Tigris (Tiger): Anatomy, Biomechanics & Ecology of the Apex Predator',
    subject: 'Zoology & Animal Biology',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Analyze the musculoskeletal biomechanics that enable burst ambush acceleration up to 65 km/h',
      'Understand feline dentition, canine bite force (over 1,000 PSI), and jaw mechanics',
      'Examine the tapetum lucidum ocular adaptation powering acute nocturnal predation',
      'Explore camouflage disruptive coloration (melanin stripe patterns) and apex food web roles'
    ],
    summary: 'Tigers (Panthera tigris) are the largest extant cat species and apex predators. Their solitary hunting prowess relies on powerful muscular-skeletal adaptations, specialized night vision, and camouflage stripes tailored for forest canopy ambush.',
    sections: [
      {
        heading: 'Musculoskeletal Power & Ambush Biomechanics',
        explanation: 'The tiger skeleton is engineered for solitary ambush rather than long-distance endurance running. Dense, fast-twitch muscle fibers concentrated in the forequarters and spine allow tigers to leap 8 to 10 meters horizontally and achieve burst sprint speeds between 50 and 65 km/h.',
        keyPoints: [
          'Forequarter musculature provides the physical power to pull down prey three to five times the tiger\'s body mass.',
          'Flexible spine acts like a biological spring, extending stride length during explosive acceleration.',
          'Retractable claws remain sharp inside protective sheaths until deployed for gripping prey or climbing.'
        ],
        example: 'Like a high-performance drag-racing sports car optimized for 0-to-60 acceleration bursts over short distances rather than marathon fuel economy.',
        visualizationStepIds: ['step-muscles']
      },
      {
        heading: 'Sensory Specialization & The Tapetum Lucidum',
        explanation: 'Tigers hunt primarily between dusk and dawn. Their eyes possess a dense concentration of rod cells and a biological reflective layer known as the tapetum lucidum directly behind the retina. Unabsorbed photons bounce back through photoreceptors a second time, multiplying visual sensitivity by approximately six times compared to human vision.',
        keyPoints: [
          'Tapetum Lucidum reflects incoming photons back across rod photoreceptors for dual stimulation in deep darkness.',
          'Forward-facing stereoscopic eyes provide precise binocular depth perception essential for pouncing accuracy.',
          'Large rotatable outer ear pinnae detect high-frequency acoustic rustling from prey hidden in dense undergrowth.'
        ],
        example: 'Like military-grade night-vision goggles that amplify minute ambient starlight into high-contrast tactical clarity.',
        visualizationStepIds: ['step-senses']
      },
      {
        heading: 'Dentition, Canine Force & Apex Predation',
        explanation: 'With 30 specialized teeth, the tiger\'s dentition is dominated by conical canine teeth reaching up to 7.5 cm (3 inches) in length, containing pressure-sensing nerve endings that help the tiger pinpoint the precise cervical vertebra or trachea of its prey.',
        keyPoints: [
          'Canine teeth deliver crushing bite pressure exceeding 1,000 PSI, powered by massive temporalis and masseter muscles.',
          'Carnassial shear teeth slice cleanly through tough meat and tendon like industrial shears.',
          'Rough papillae on the tongue feature backward-facing keratin hooks that scrape meat clean from bone.'
        ],
        example: 'Like precision hydraulic rescue shears that combine focused piercing pressure with clean shearing capability.',
        visualizationStepIds: ['step-canines']
      },
      {
        heading: 'Disruptive Camouflage Coat & Ecological Balance',
        explanation: 'Every tiger possesses a unique fingerprint-like pattern of dark melanin stripes. Although orange seems vibrant to human trichromatic vision, ungulate prey (deer and wild boar) are dichromats lacking red-green retinal cones. To them, the tiger appears in shades of green and brown, seamlessly blending into sunlit forest foliage.',
        keyPoints: [
          'Disruptive coloration breaks up the animal\'s physical silhouette in tall grasses and dappled jungle sunlight.',
          'Dichromatic prey perceive the orange coat as greenish-brown camouflage.',
          'As apex predators, tigers regulate herbivore populations, preventing overgrazing and preserving riverine forest ecology.'
        ],
        example: 'Like an optical illusion coat that disguises a 250-kg carnivore as harmless bamboo shadows.',
        visualizationStepIds: ['step-coat']
      }
    ],
    visualization: {
      templateId: 'animal-biology',
      title: 'Panthera Tigris 3D Biological Explorer',
      description: 'Interactive 3D anatomical model highlighting musculoskeletal power, sensory tapetum lucidum, canine dentition, and disruptive camouflage.',
      parameters: {
        autoProwl: true,
        showAnatomyHighlights: true,
      },
      steps: [
        {
          id: 'step-muscles',
          title: 'Musculoskeletal Core & Ambush Biomechanics',
          explanation: 'Inspect the powerful torso, spine, and forelimb muscular system optimized for explosive ambush speed.',
          highlightIds: ['tiger-musculature'],
          cameraPreset: 'side'
        },
        {
          id: 'step-senses',
          title: 'Sensory Suite & Nocturnal Vision',
          explanation: 'Observe the head, binocular eyes with tapetum lucidum night vision, and directional acoustic pinnae.',
          highlightIds: ['tiger-senses'],
          cameraPreset: 'front'
        },
        {
          id: 'step-canines',
          title: 'Canine Dentition & Jaw Mechanics',
          explanation: 'Examine the conical 3-inch canines and scissor carnassials delivering over 1,000 PSI of shearing bite force.',
          highlightIds: ['tiger-canines'],
          cameraPreset: 'close-up'
        },
        {
          id: 'step-coat',
          title: 'Disruptive Camouflage Coat',
          explanation: 'Analyze the unique melanin stripe patterns that disrupt body contours against dichromatic ungulate prey.',
          highlightIds: ['tiger-coat'],
          cameraPreset: 'isometric'
        },
        {
          id: 'step-habitat',
          title: 'Habitat & Apex Ecological Territory',
          explanation: 'Review territory scale and the tiger\'s keystone role in maintaining healthy forest biodiversity.',
          highlightIds: ['tiger-habitat'],
          cameraPreset: 'top'
        }
      ],
      interactiveElements: [
        { id: 'tiger-musculature', label: 'Musculoskeletal Power Core', description: 'Dense fast-twitch muscle groups concentrated in the shoulders, spine, and hindquarters produce burst sprint speeds up to 65 km/h.', color: '#ea580c' },
        { id: 'tiger-senses', label: 'Tapetum Lucidum & Senses', description: 'Ocular retroreflective layer amplifies ambient night photons, enabling predation in light levels six times lower than human threshold.', color: '#38bdf8' },
        { id: 'tiger-canines', label: 'Canine Dentition (1,000+ PSI)', description: 'Massive conical canine teeth with nerve-sensitive tips paired with robust temporalis muscles deliver fatal precision bites.', color: '#f8fafc' },
        { id: 'tiger-coat', label: 'Disruptive Melanin Stripes', description: 'Disruptive camouflage breaks body outline; dichromatic herbivores perceive the reddish-orange pigment as green foliage.', color: '#1c1917' },
        { id: 'tiger-habitat', label: 'Apex Ecological Territory', description: 'Solitary territorial range requiring hundreds of square kilometers of contiguous forest and stable ungulate prey.', color: '#15803d' }
      ]
    },
    keyTakeaways: [
      'Tigers are solitary ambush predators utilizing dense fast-twitch musculature for explosive bursts rather than endurance chasing.',
      'The tapetum lucidum reflects photons back across retinal rods, providing superior nocturnal visual acuity.',
      'Canine bite force exceeding 1,000 PSI combined with sensor-rich teeth delivers quick prey dispatching.',
      'Disruptive stripe patterns exploit the dichromatic colorblindness of forest ungulates, rendering the predator camouflaged.',
      'As apex carnivores, tigers are keystone species protecting ecological food webs and forest biodiversity.'
    ],
    quiz: [
      {
        question: 'Why does a tiger\'s orange coat provide effective camouflage against forest prey such as deer?',
        options: [
          'Prey animals are dichromats lacking red-green color cones, so they see orange as greenish foliage',
          'Tigers can actively morph their pigment cells like chameleons',
          'Tigers only hunt in complete optical darkness where colors are invisible',
          'Deer and ungulates have only thermal infrared vision'
        ],
        correctAnswerIndex: 0,
        explanation: 'Ungulates like deer are dichromatic and cannot distinguish orange from green, making the tiger blend into green leaves and bamboo.'
      },
      {
        question: 'Which biological adaptation provides tigers with their superior low-light nocturnal vision?',
        options: [
          'Tapetum Lucidum behind the retina',
          'A secondary magnifying corneal lens',
          'Bioluminescent ocular receptors',
          'Thermal pit receptors located along the jawline'
        ],
        correctAnswerIndex: 0,
        explanation: 'The tapetum lucidum reflects unabsorbed light back through the retina, stimulating rod cells a second time in deep darkness.'
      },
      {
        question: 'What is the primary locomotion and hunting strategy of Panthera tigris?',
        options: [
          'Stealth stalk followed by an explosive short-distance ambush sprint',
          'Cooperative pack hunting over dozens of kilometers',
          'High-altitude aerial diving from tall tree branches',
          'Scavenging carcasses left behind by other apex predators'
        ],
        correctAnswerIndex: 0,
        explanation: 'Tigers are solitary ambush hunters that rely on dense cover to approach within 10-20 meters before bursting into high-speed acceleration.'
      },
      {
        question: 'Approximately what bite force can an adult tiger exert at its canines?',
        options: [
          'Over 1,000 PSI',
          'Under 100 PSI',
          'Around 200 PSI',
          'Over 10,000 PSI'
        ],
        correctAnswerIndex: 0,
        explanation: 'Adult tigers generate over 1,000 pounds per square inch (PSI) of canine bite force, sufficient to crush large cervical vertebrae.'
      }
    ],
    revision: {
      keyDefinitions: [
        { term: 'Panthera tigris', definition: 'The scientific binomial nomenclature for the tiger, the largest extant wild cat species.' },
        { term: 'Tapetum Lucidum', definition: 'A layer of tissue in the eye lying immediately behind the retina, reflecting visible light back through the photoreceptors.' },
        { term: 'Apex Predator', definition: 'A predator occupying the top trophic level of a food chain without natural predators of its own.' },
        { term: 'Disruptive Coloration', definition: 'Camouflage pattern of contrasting stripes or markings that breaks up an animal\'s visual outline.' }
      ],
      commonMistakes: [
        'Confusing tiger hunting behavior with lions; tigers are solitary hunters that do not hunt in packs.',
        'Assuming tigers pursue prey for long distances; their physiology is built for short explosive sprints, not marathons.',
        'Believing orange fur makes them obvious to all animals; prey ungulates perceive them as greenish-brown.'
      ],
      flashcards: [
        { front: 'What is the scientific name of the tiger?', back: 'Panthera tigris' },
        { front: 'Why is the tapetum lucidum critical for tigers?', back: 'It reflects light back through the retina, enhancing night vision sixfold for nocturnal hunting.' },
        { front: 'How do deer perceive a tiger\'s orange fur?', back: 'As green or brown because deer have dichromatic (two-color) vision lacking red-green discrimination.' },
        { front: 'What role do tigers play in their ecosystem?', back: 'Apex keystone predator preventing ungulate overpopulation and preserving vegetation.' }
      ],
      summaryPoints: [
        'Solitary apex predator of Asian tropical and temperate forests',
        'Burst ambush speed of 50-65 km/h powered by fast-twitch forequarter muscles',
        'Tapetum lucidum multiplies nocturnal photon absorption',
        'Canines generate over 1,000 PSI crushing pressure',
        'Disruptive camouflage is virtually invisible to dichromatic prey'
      ]
    },
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

export function matchPresetByTopic(query: string, difficulty: Difficulty, language: string): Lesson | null {
  const q = query.toLowerCase();

  // Tiger / Panthera / Apex Predator / Wildlife Big Cat
  if (
    /\b(tigers?|panthera tigris|panthera|big cat|feline predator|carnivore predator)\b/i.test(q) ||
    (q.includes('tiger') && !q.includes('paper tiger'))
  ) {
    const p = PRESET_LESSONS['tiger'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Heart / blood / cardiology
  if (/\b(hearts?|cardiac|cardiovascular|ventricles?|atrium|atria|aorta|blood flow|cardiology)\b/i.test(q)) {
    const p = PRESET_LESSONS['human-heart'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Solar system / planets / planetary orbits
  if (/\b(solar[ -]system|planets?|planetary|kepler|sun and orbit|orbits? of planets?)\b/i.test(q)) {
    const p = PRESET_LESSONS['solar-system'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Black hole / astrophysics
  if (/\b(black[ -]holes?|singularity|event horizon|accretion disk|schwarzschild)\b/i.test(q)) {
    const p = PRESET_LESSONS['black-hole'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Atom / atomic structure / subatomic
  if (/\b(atoms?|atomic|bohr model|protons?|electrons?|neutrons?|subatomic|electron shell)\b/i.test(q)) {
    const p = PRESET_LESSONS['atom'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // DNA / double helix / genetics
  if (/\b(dna|double helix|genetic code|chromosomes?|nucleotides?|dna replication|base pairs?)\b/i.test(q)) {
    const p = PRESET_LESSONS['dna'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Photosynthesis / plant biology / chloroplast
  if (/\b(photosynthesis|chloroplasts?|chlorophyll|calvin cycle|thylakoids?|light reaction)\b/i.test(q)) {
    const p = PRESET_LESSONS['photosynthesis'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Electric circuit / Ohm's law
  if (/\b(circuits?|electric circuit|ohm'?s law|resistors?|volts?|amperes?|current flow)\b/i.test(q)) {
    const p = PRESET_LESSONS['electric-circuit'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Wave mechanics
  if (/\b(waves?|wave mechanics|oscillat\w+|frequency|wavelength|sound waves?|amplitude)\b/i.test(q)) {
    const p = PRESET_LESSONS['wave'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  // Linked list (STRICT: Must be computer science / data structures, NEVER lone "list", "link", or "node")
  const isLinkedListTopic =
    /\b(linked[ -]?lists?|singly linked|doubly linked|linkedlist)\b/i.test(q) ||
    (/\b(data structure|c\+\+|pointer|pointers|heap memory)\b/i.test(q) && /\blists?\b/i.test(q));
  if (isLinkedListTopic) {
    const p = PRESET_LESSONS['linked-list'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

  return null;
}

export function createDynamicLesson(
  topic: string,
  difficulty: Difficulty,
  language: string,
  sourceType: SourceType,
  notesSnippet?: string
): Lesson {
  const cleanTitle = topic.charAt(0).toUpperCase() + topic.slice(1);
  const q = topic.toLowerCase();

  // Smart subject-aware template selection
  let templateId = 'interactive-diagram';
  let subject = 'General Science & Technology';

  const isAnimal = /\b(tiger|panthera|lion|cheetah|leopard|cat|dog|wolf|bear|elephant|predator|animal|fauna|mammal|wildlife|carnivore|herbivore|bird|reptile|amphibian|fish|shark|whale|zoology|species|prey)\b/i.test(q);
  const isCardio = /\b(heart|cardiac|blood|ventricle|atrium|artery|vein|circulation|pulse)\b/i.test(q);
  const isAstro = /\b(solar|planet|orbit|galaxy|space|astronomy|cosmos|jupiter|mars|saturn|earth|sun)\b/i.test(q);
  const isBlackHole = /\b(black hole|singularity|event horizon|accretion disk|relativity)\b/i.test(q);
  const isPhotosynthesis = /\b(photo|chloroplast|chlorophyll|thylakoid|plant|leaf|botany|calvin)\b/i.test(q);
  const isDna = /\b(dna|helix|genetic|chromosome|nucleotide|gene|mutation|rna)\b/i.test(q);
  const isAtomic = /\b(atom|electron|proton|neutron|bohr|quantum|nucleus|orbital|molecule|chemical|reaction|bond)\b/i.test(q);
  const isCircuit = /\b(circuit|electric|ohm|resistor|voltage|current|battery|electronics)\b/i.test(q);
  const isWave = /\b(wave|oscillation|frequency|wavelength|sound|optics|amplitude)\b/i.test(q);
  const isMath = /\b(math|derivative|calculus|function|geometry|algebra|coordinate|integral)\b/i.test(q);
  const isLinkedList = /\b(linked[ -]?list|singly linked|doubly linked)\b/i.test(q) || (/\b(data structure|c\+\+|pointer)\b/i.test(q) && /\blist\b/i.test(q));
  const isSorting = /\b(sort|quicksort|mergesort|algorithm|stack|queue|tree|binary search)\b/i.test(q);

  if (isAnimal) {
    templateId = 'animal-biology';
    subject = 'Zoology & Animal Biology';
  } else if (isCardio) {
    templateId = 'human-heart';
    subject = 'Biology & Medicine';
  } else if (isPhotosynthesis) {
    templateId = 'photosynthesis';
    subject = 'Plant Biology & Botany';
  } else if (isDna) {
    templateId = 'dna';
    subject = 'Genetics & Molecular Biology';
  } else if (isBlackHole) {
    templateId = 'black-hole';
    subject = 'Astrophysics';
  } else if (isAstro) {
    templateId = 'solar-system';
    subject = 'Astronomy & Planetary Science';
  } else if (isAtomic) {
    templateId = 'atom';
    subject = 'Chemistry & Atomic Physics';
  } else if (isCircuit) {
    templateId = 'electric-circuit';
    subject = 'Physics & Electrical Engineering';
  } else if (isWave) {
    templateId = 'wave';
    subject = 'Physics & Wave Mechanics';
  } else if (isLinkedList) {
    templateId = 'linked-list';
    subject = 'Computer Science & Data Structures';
  } else if (isSorting) {
    templateId = 'sorting-algorithm';
    subject = 'Computer Science & Algorithms';
  } else if (isMath) {
    templateId = 'coordinate-geometry';
    subject = 'Mathematics';
  }

  // Topic-specific section and visualization configuration
  if (isAnimal) {
    return {
      id: uuidv4(),
      title: `${cleanTitle}: Biology, Anatomy & Ecological Adaptations`,
      subject,
      difficulty,
      language,
      learningObjectives: [
        `Analyze the core anatomical and musculoskeletal adaptations of ${cleanTitle}`,
        `Understand specialized sensory mechanisms and predatory/survival behaviors`,
        `Examine camouflage, dietary energetics, and predatory-prey equilibrium`,
        `Explore the ecological niche and conservation significance of ${cleanTitle}`
      ],
      summary: notesSnippet
        ? `Derived from your notes: A comprehensive biological breakdown of ${cleanTitle}, examining its physiology, hunting biomechanics, sensory suite, and habitat role.`
        : `${cleanTitle} exhibits specialized evolutionary adaptations. This lesson analyzes its physical biomechanics, sensory capabilities, hunting and camouflage mechanisms, and ecological significance in nature.`,
      sections: [
        {
          heading: `Musculoskeletal Anatomy & Biomechanics of ${cleanTitle}`,
          explanation: notesSnippet
            ? `Based on your notes: ${notesSnippet.slice(0, 300)}...`
            : `The physical structure of ${cleanTitle} is finely tuned by natural selection. Dense muscle fibers, specialized skeletal limb articulation, and powerful tendons allow rapid acceleration, agile navigation of dense terrain, and exceptional physical leverage.`,
          keyPoints: [
            `Dense skeletal architecture engineered for high-impact force distribution.`,
            `High proportion of fast-twitch muscle fibers enabling explosive kinetic energy bursts.`,
            `Retractable or specialized appendages optimized for traction, grasping, and maneuvering.`
          ],
          example: `Like an agile off-road all-terrain vehicle designed with heavy-duty independent suspension for sudden directional pivots and rough-terrain sprint maneuvers.`,
          visualizationStepIds: ['step-muscles']
        },
        {
          heading: `Sensory Systems, Camouflage & Hunting Strategies`,
          explanation: `Survival for ${cleanTitle} depends upon acute sensory integration. Highly developed visual, acoustic, and olfactory receptors detect subtle environmental stimuli, while disruptive coat coloration breaks up the physical outline against surrounding vegetation.`,
          keyPoints: [
            `Specialized nocturnal or binocular sensory organs maximizing environmental signal detection.`,
            `Disruptive pigment patterns creating optical camouflage against forest and grassland backdrops.`,
            `Stealth stalking tactics conserving metabolic energy until striking within critical distance.`
          ],
          example: `Like high-resolution thermal imaging paired with disruptive optical camouflage netting in tactical operations.`,
          visualizationStepIds: ['step-senses', 'step-coat']
        },
        {
          heading: `Dietary Energetics, Dentition & Ecosystem Role`,
          explanation: `As a critical participant in its ecological community, ${cleanTitle} maintains top-down regulation over prey populations. Specialized jaw architecture and dentition provide the mechanical advantage required to dispatch and consume food efficiently.`,
          keyPoints: [
            `Specialized dental morphology designed for shearing and crushing pressure.`,
            `Apex trophic positioning maintaining ecological balance across trophic levels.`,
            `Large territorial ranges vital for population genetic diversity and resource stability.`
          ],
          example: `Like the keystone arch in a stone bridge; removing the apex predator causes the lower trophic levels to destabilize the entire ecosystem.`,
          visualizationStepIds: ['step-canines', 'step-habitat']
        }
      ],
      visualization: {
        templateId: 'animal-biology',
        title: `${cleanTitle} Biological Explorer 3D`,
        description: `Interactive 3D model detailing musculoskeletal anatomy, sensory organs, camouflage striping, and predatory adaptations of ${cleanTitle}.`,
        parameters: {
          autoRotate: true,
          showAnatomy: true,
        },
        steps: [
          {
            id: 'step-muscles',
            title: `Musculoskeletal Power Core`,
            explanation: `Examine the torso, shoulder girdles, and powerful hindquarter muscle groups delivering explosive sprint and leaping power.`,
            highlightIds: ['tiger-musculature'],
            cameraPreset: 'side'
          },
          {
            id: 'step-senses',
            title: `Sensory Organs & Nocturnal Perception`,
            explanation: `Observe the facial sensory cluster including forward-facing binocular eyes, nocturnal tapetum lucidum, and directional acoustic pinnae.`,
            highlightIds: ['tiger-senses'],
            cameraPreset: 'front'
          },
          {
            id: 'step-canines',
            title: `Cranial Architecture & Dentition`,
            explanation: `Inspect the conical canine teeth and powerful jaw musculature capable of delivering crushing bite pressures.`,
            highlightIds: ['tiger-canines'],
            cameraPreset: 'close-up'
          },
          {
            id: 'step-coat',
            title: `Disruptive Camouflage Coat`,
            explanation: `Analyze the distinctive disruptive coloration patterns that disguise the animal among natural light and vegetation shadows.`,
            highlightIds: ['tiger-coat'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-habitat',
            title: `Natural Habitat & Ecosystem Range`,
            explanation: `Review territorial boundary markers and the animal's keystone position in regulating biodiversity.`,
            highlightIds: ['tiger-habitat'],
            cameraPreset: 'top'
          }
        ],
        interactiveElements: [
          { id: 'tiger-musculature', label: 'Musculoskeletal Power Core', description: 'Dense fast-twitch muscle fibers provide explosive sprint acceleration and high-impact physical leverage.', color: '#ea580c' },
          { id: 'tiger-senses', label: 'Sensory Organs & Perception', description: 'Binocular visual tracking paired with high-frequency auditory pinnae detects subtle movements across long distances.', color: '#38bdf8' },
          { id: 'tiger-canines', label: 'Cranial Architecture & Dentition', description: 'Robust conical canines and carnassials engineered for crushing and shearing tough tissue.', color: '#f8fafc' },
          { id: 'tiger-coat', label: 'Disruptive Camouflage Fur', description: 'Contrasting pigmentation breaks up the silhouette against foliage and dappled shadows.', color: '#1c1917' },
          { id: 'tiger-habitat', label: 'Ecological Territory & Habitat', description: 'Large territorial ranges supporting trophic prey dynamics and keystone ecological balance.', color: '#15803d' }
        ]
      },
      keyTakeaways: [
        `${cleanTitle} possesses specialized musculoskeletal adaptations built for high-power ambush acceleration.`,
        `Sensory adaptations like binocular vision and tapetum lucidum maximize hunting success across diverse light conditions.`,
        `Disruptive camouflage coloration breaks up physical outlines against natural vegetation and shadows.`,
        `As an apex or keystone species, ${cleanTitle} prevents herbivore overpopulation and safeguards biodiversity.`
      ],
      quiz: [
        {
          question: `What primary adaptation enables ${cleanTitle} to achieve rapid ambush acceleration?`,
          options: [
            'A high proportion of fast-twitch muscle fibers in the forequarters and hindquarters',
            'Extremely low body weight comparable to avian species',
            'Lack of a rigid skeletal structure',
            'Constant perpetual running without resting'
          ],
          correctAnswerIndex: 0,
          explanation: 'Fast-twitch muscle fibers generate large amounts of kinetic force rapidly, powering sudden ambush sprints.'
        },
        {
          question: `How does disruptive camouflage assist ${cleanTitle} in its natural environment?`,
          options: [
            'It breaks up body contours and outlines against surrounding vegetation and shadows',
            'It causes the animal to glow brightly in direct sunlight',
            'It prevents the animal from making any physical contact with the ground',
            'It repels external parasitic insects exclusively'
          ],
          correctAnswerIndex: 0,
          explanation: 'Disruptive coloration patterns visually fragment the outline of an animal, making it difficult for prey or predators to detect.'
        },
        {
          question: `What is the ecological significance of apex predators like ${cleanTitle}?`,
          options: [
            'They regulate prey population sizes and prevent habitat degradation through overgrazing',
            'They consume only plant material to maintain forest canopy height',
            'They eliminate all competitor species from the entire continent',
            'They have no measurable influence on their surrounding ecosystem'
          ],
          correctAnswerIndex: 0,
          explanation: 'Apex predators maintain healthy ecosystem balance by controlling herbivore numbers, which prevents overconsumption of vegetation.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: cleanTitle, definition: `An organism studied within ${subject} known for specific evolutionary adaptations.` },
          { term: 'Disruptive Coloration', definition: 'A camouflage pattern of contrasting markings that obscures an animal\'s recognizable shape.' },
          { term: 'Apex Predator', definition: 'A carnivore at the topmost trophic tier without natural predators in its native range.' }
        ],
        commonMistakes: [
          `Assuming ${cleanTitle} relies primarily on long-distance marathon chasing rather than stealth ambush.`,
          `Overlooking the importance of large contiguous habitats for maintaining genetic diversity.`
        ],
        flashcards: [
          { front: `What is the primary hunting strategy of ${cleanTitle}?`, back: 'Stealth stalking followed by high-speed ambush bursts.' },
          { front: `Why is disruptive camouflage critical?`, back: 'It breaks up body contours against dappled sunlight and foliage.' },
          { front: `What ecological role does ${cleanTitle} serve?`, back: 'Keystone predator regulating herbivore populations and ecosystem health.' }
        ],
        summaryPoints: [
          `Specialized musculoskeletal design for rapid kinetic leverage`,
          `Acute sensory and optical adaptations for night and daytime awareness`,
          `Disruptive patterning disguising the animal from dichromatic prey`,
          `Vital keystone role in preserving biodiversity`
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Generic dynamic lesson fallback for other topics
  return {
    id: uuidv4(),
    title: `Understanding ${cleanTitle}`,
    subject,
    difficulty,
    language,
    learningObjectives: [
      `Grasp the core scientific principles of ${cleanTitle}`,
      `Identify the essential sub-components and their active interactions`,
      `Understand practical real-world applications and significance`,
      `Verify conceptual comprehension through interactive visual inspection`
    ],
    summary: notesSnippet 
      ? `This structured lesson is derived directly from your uploaded study material on "${cleanTitle}", highlighting core concepts, operational mechanics, and key revision points.`
      : `${cleanTitle} is a foundational educational topic. This lesson breaks down its core mechanism step by step with clear explanations, visual component mapping, and revision quizzes.`,
    sections: [
      {
        heading: `Introduction to ${cleanTitle}`,
        explanation: notesSnippet 
          ? `Based on your notes: ${notesSnippet.slice(0, 300)}...`
          : `${cleanTitle} operates on universal principles of cause, effect, and structural harmony. Understanding its fundamental definitions provides the baseline for advanced study.`,
        keyPoints: [
          `Primary concept definition and scope within ${subject}.`,
          `Fundamental relationship between primary variables or components.`,
          `Key terminology necessary for standard assessments.`
        ],
        example: `Think of ${cleanTitle} as a coordinated network where each element depends upon the stability of its neighbors.`,
        visualizationStepIds: ['step-intro']
      },
      {
        heading: 'Mechanisms and Step-by-Step Operations',
        explanation: `When analyzing how ${cleanTitle} functions in practice, we observe coordinated phases of action and equilibrium. Interactive controls allow you to step through each phase individually.`,
        keyPoints: [
          'Sequential execution of primary operational phases.',
          'Conserved properties and feedback loops.',
          'Safety bounds or operational thresholds.'
        ],
        example: 'Like an automated assembly line with designated checkpoints verifying quality before passing items to the next stage.',
        visualizationStepIds: ['step-mechanism']
      }
    ],
    visualization: {
      templateId,
      title: `${cleanTitle} Visual Explorer`,
      description: `Interactive visual model designed to illustrate the structural relationships and dynamic flow of ${cleanTitle}.`,
      parameters: {
        autoRotate: true,
        complexityLevel: difficulty === 'advanced' ? 3 : difficulty === 'intermediate' ? 2 : 1
      },
      steps: [
        {
          id: 'step-intro',
          title: `Overview of ${cleanTitle}`,
          explanation: `Inspect the visual composition and spatial layout of ${cleanTitle}.`,
          highlightIds: ['component-primary', 'component-secondary'],
          cameraPreset: 'front'
        },
        {
          id: 'step-mechanism',
          title: 'Dynamic Interaction Phase',
          explanation: `Observe the interaction between active components as states change.`,
          highlightIds: ['component-active'],
          cameraPreset: 'isometric'
        }
      ],
      interactiveElements: [
        { id: 'component-primary', label: 'Primary Core Unit', description: `Central coordinating element of ${cleanTitle}.`, color: '#06b6d4' },
        { id: 'component-secondary', label: 'Secondary Boundary', description: `Supporting matrix or structural interface.`, color: '#8b5cf6' },
        { id: 'component-active', label: 'Dynamic Channel', description: `Pathway through which energy, data, or fluid transfers.`, color: '#10b981' }
      ]
    },
    keyTakeaways: [
      `${cleanTitle} adheres to predictable rules governing structure and function.`,
      `Visualizing spatial relationships enables deeper long-term memory retention than memorizing text alone.`,
      `Review key definitions and verify understanding with the quiz.`
    ],
    quiz: [
      {
        question: `What is the most critical foundational principle when studying ${cleanTitle}?`,
        options: [
          'Understanding the interaction between core components and their environment',
          'Memorizing numbers without considering physical context',
          'Assuming systems never undergo state changes',
          'Ignoring foundational conservation laws'
        ],
        correctAnswerIndex: 0,
        explanation: 'Deep understanding in science and engineering comes from recognizing how parts interact within their system context.'
      },
      {
        question: `Which approach is most effective for solving problems related to ${cleanTitle}?`,
        options: [
          'Breaking the problem into sequential steps and identifying known variables',
          'Guessing random values until an answer appears',
          'Skipping theoretical definitions',
          'Treating all components as isolated and unrelated'
        ],
        correctAnswerIndex: 0,
        explanation: 'Systematic problem solving involves identifying boundaries, inputs, and step-by-step transformations.'
      }
    ],
    revision: {
      keyDefinitions: [
        { term: cleanTitle, definition: `The primary phenomenon or system being analyzed in ${subject}.` },
        { term: 'Equilibrium', definition: 'A state in which opposing forces or influences are balanced.' }
      ],
      commonMistakes: [
        'Confusing cause with effect when observing dynamic changes.',
        'Overlooking the impact of boundary conditions and environmental assumptions.'
      ],
      flashcards: [
        { front: `What is the primary role of ${cleanTitle}?`, back: `To enable coordinated function and transformation within ${subject}.` },
        { front: 'Why do we study this visually?', back: '3D spatial visualization creates intuitive mental models and enhances memory recall.' }
      ],
      summaryPoints: [
        `Grasp the definition of ${cleanTitle}`,
        'Trace inputs to outputs through the intermediate mechanism',
        'Review the key flashcards prior to examinations'
      ]
    },
    sourceType,
    sourceFilename: sourceType === 'notes' ? topic : undefined,
    extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
