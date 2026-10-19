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
  },

  'snake': {
    id: 'preset-snake',
    title: 'Serpent Biology: Anatomy, Venom Apparatus & Locomotion Biomechanics',
    subject: 'Zoology & Herpetology',
    difficulty: 'beginner',
    language: 'English',
    learningObjectives: [
      'Examine the vertebral column and ribs powering serpentine lateral undulation locomotion',
      'Analyze the solenoglyphous venom apparatus including venom glands and hinged hollow fangs',
      'Understand the chemosensory role of the bifurcated forked tongue and Jacobson\'s organ',
      'Investigate infrared heat-sensing pit organs (loreal pits) for nocturnal prey detection',
      'Explore cranial kinesis and mandibular symphysis enabling swallowing of large prey whole'
    ],
    summary: 'Snakes (Suborder Serpentes) are limbless, elongated ectothermic reptiles exhibiting evolutionary engineering marvels: an articulated spine of 200–400 ribbed vertebrae for lateral undulation, specialized hollow venom fangs acting as hypodermic needles, forked chemosensory tongues, infrared thermal vision pits, and highly kinetic unhinged skulls.',
    sections: [
      {
        heading: 'Serpentine Locomotion & Lateral Undulation',
        explanation: 'Snakes lack pectoral and pelvic girdles, relying on a continuous axial skeleton of 200 to over 400 articulated vertebrae, each with an attached pair of mobile ribs. Through lateral undulation, sequential waves of muscular contraction pass posteriorly along the body, pushing against irregularities in terrain. Broad ventral scutes (belly scales) act like micro-cleats, providing unidirectional friction to prevent backward slipping.',
        keyPoints: [
          'Axial skeleton consists of 200–400 vertebrae, providing immense rotational flexibility.',
          'Lateral undulation pushes lateral waves against physical terrain anchor points.',
          'Ventral scutes provide anisotropic friction, allowing forward gliding while arresting backward recoil.'
        ],
        example: 'Like an undulating cross-country train where each carriage has independent traction treads to glide smoothly across uneven terrain.',
        visualizationStepIds: ['step-spine', 'step-scales']
      },
      {
        heading: 'Solenoglyphous Venom Apparatus & Hinged Hollow Fangs',
        explanation: 'Venomous snakes possess specialized hollow maxilla teeth known as solenoglyphous fangs. Connected via venom ducts to modified salivary venom glands surrounded by compressor muscles, these fangs act like hypodermic injection needles. When striking, maxilla rotation swings the fangs forward 90 degrees out of their mucosal sheath to deliver enzymatic hemotoxic or neurotoxic proteins directly into prey tissue.',
        keyPoints: [
          'Long hollow fangs rotate forward up to 90 degrees during strike impact.',
          'Temporal compressor muscles contract to squeeze venom glands, pressurizing venom ejection.',
          'Venom blends complex enzymes breaking down circulatory tissue (hemotoxins) or neural transmission (neurotoxins).'
        ],
        example: 'Like precision spring-loaded medical syringes that automatically deploy and discharge micro-doses of fluid under pressure.',
        visualizationStepIds: ['step-fangs', 'step-venom-glands']
      },
      {
        heading: 'Forked Tongue Chemosensation & Jacobson\'s Organ',
        explanation: 'A snake\'s deeply bifurcated forked tongue constantly flicks into the air to capture microscopic odorant molecules. When retracted into the mouth, the two tips deliver chemical samples to paired sensory cavities in the palate called Jacobson\'s (vomeronasal) organ. The split tips provide stereoscopic chemical gradients, allowing the snake to determine precisely whether prey or mates are to the left or right.',
        keyPoints: [
          'Tongue flicks in air collecting non-volatile chemical odorants on its moist surface.',
          'Tips insert into Jacobson\'s (vomeronasal) organ in the palate for neural signal processing.',
          'Bifurcated (split) geometry provides directional stereo-olfaction across chemical gradients.'
        ],
        example: 'Like a dual-antenna wireless receiver comparing signal strength between left and right channels to pinpoint the source transmitter.',
        visualizationStepIds: ['step-tongue']
      },
      {
        heading: 'Infrared Thermal Vision & Loreal Heat Pits',
        explanation: 'Pit vipers, boas, and pythons possess specialized facial loreal pits between the eye and nostril. Inside each pit, a thin sensory membrane suspended in air houses thousands of heat-sensitive TRPA1 ion channel receptors. This allows snakes to detect minute temperature differences (as small as 0.003°C), generating a radiant thermal image in the optic tectum to hunt warm-blooded prey in absolute darkness.',
        keyPoints: [
          'Facial loreal pits house an ultra-sensitive infrared thermal membrane.',
          'Detects temperature variations as fine as 0.003°C in radiant infrared wavelengths.',
          'Thermal spatial signals fuse with optical vision in the brain, creating a night-vision thermal map.'
        ],
        example: 'Like military forward-looking infrared (FLIR) cameras overlaying thermal heat signatures onto standard night vision goggles.',
        visualizationStepIds: ['step-pits']
      },
      {
        heading: 'Kinetic Skull Architecture & Jaw Unhinging',
        explanation: 'Contrary to common myth, snakes do not dislocate their jaws; instead, their skulls possess extraordinary cranial kinesis. The quadrate bone functions as a free-floating double joint, and the lower jaw (mandible) is joined at the chin not by rigid bone, but by an elastic, highly stretchable ligament. Furthermore, the left and right halves of the jaw move independently, executing a "pterygoid walk" to ratchet large prey whole into the esophagus.',
        keyPoints: [
          'Mandibles are joined at the front by flexible elastic ligaments rather than rigid bone fusion.',
          'Quadrate bones articulate loosely with the skull, providing immense vertical and horizontal gape.',
          'Alternating unilateral movements ("jaw walking") drag prey incrementally into the alimentary canal.'
        ],
        example: 'Like an expanding elastic sleeve paired with two alternating mechanical ratchets walking around cargo twice its normal diameter.',
        visualizationStepIds: ['step-jaw']
      }
    ],
    visualization: {
      templateId: 'snake',
      title: 'Serpent Biology & Biomechanics 3D Explorer',
      description: 'Interactive 3D anatomical serpent model highlighting lateral undulation spine, retractable venom fangs, venom compressor glands, infrared heat pits, and forked tongue.',
      parameters: {
        autoSlither: true,
        showAnatomyHighlights: true
      },
      steps: [
        {
          id: 'step-spine',
          title: 'Vertebral Spine & Lateral Undulation',
          explanation: 'Inspect the articulated axial skeleton composed of 200-400 ribbed vertebrae executing lateral serpentine locomotion.',
          highlightIds: ['snake-spine'],
          cameraPreset: 'side'
        },
        {
          id: 'step-fangs',
          title: 'Solenoglyphous Venom Fangs',
          explanation: 'Examine the paired, curved hollow fangs hinged to maxillae that swing forward to inject venom.',
          highlightIds: ['snake-fangs'],
          cameraPreset: 'close-up'
        },
        {
          id: 'step-venom-glands',
          title: 'Venom Glands & Compressor Muscles',
          explanation: 'Observe the modified temporal venom sacs and duct pathways delivering pressurized venom during a strike.',
          highlightIds: ['snake-venom-glands'],
          cameraPreset: 'front'
        },
        {
          id: 'step-tongue',
          title: 'Forked Chemosensory Tongue & Jacobson\'s Organ',
          explanation: 'Follow the bifurcated tongue delivering stereo-chemical odor particles to the roof of the mouth.',
          highlightIds: ['snake-tongue'],
          cameraPreset: 'close-up'
        },
        {
          id: 'step-pits',
          title: 'Infrared Thermal Sensory Pits',
          explanation: 'Discover the loreal pit organs containing infrared-sensitive membranes detecting thermal radiation from endothermic prey.',
          highlightIds: ['snake-heat-pits'],
          cameraPreset: 'front'
        },
        {
          id: 'step-jaw',
          title: 'Kinetic Skull & Unhinged Mandibles',
          explanation: 'Analyze the elastic ligamentous symphysis and quadrate bones allowing swallowing of large prey.',
          highlightIds: ['snake-jaw'],
          cameraPreset: 'isometric'
        },
        {
          id: 'step-scales',
          title: 'Ventral Locomotion Scutes & Keratin Scales',
          explanation: 'Inspect the overlapping dorsal epidermal scales and wide ventral belly scutes providing directional friction.',
          highlightIds: ['snake-scales'],
          cameraPreset: 'top'
        }
      ],
      interactiveElements: [
        {
          id: 'snake-fangs',
          label: 'Hollow Solenoglyphous Fangs',
          description: 'Hinged hollow maxilla teeth acting like hypodermic needles that fold back against the palate when the mouth is closed and swing forward 90 degrees during strike.',
          color: '#f8fafc'
        },
        {
          id: 'snake-venom-glands',
          label: 'Venom Gland & Compressor Musculature',
          description: 'Paired posterior-temporal glandular capsules producing complex enzymatic cocktails (hemotoxins, neurotoxins, and myotoxins) pressurized by compressor muscles.',
          color: '#a855f7'
        },
        {
          id: 'snake-heat-pits',
          label: 'Loreal Infrared Thermal Pits',
          description: 'Deep facial sensory cavities lined with a thin membrane housing TRPA1 heat receptor channels sensitive to temperature differentials as minute as 0.003°C.',
          color: '#ef4444'
        },
        {
          id: 'snake-tongue',
          label: 'Bifurcated Chemosensory Tongue',
          description: 'Flexible forked tongue flicked into ambient airflow to capture airborne pheromones and prey scent molecules, transferring them directly to Jacobson\'s organ.',
          color: '#ec4899'
        },
        {
          id: 'snake-spine',
          label: 'Articulated Vertebral Column (200-400 Vertebrae)',
          description: 'Extremely flexible axial spine with ball-and-socket (procoelous) intervertebral joints and associated ribs driving lateral undulation locomotion.',
          color: '#38bdf8'
        },
        {
          id: 'snake-scales',
          label: 'Overlapping Keratin Scales & Ventral Scutes',
          description: 'Epidermal beta-keratin plates providing mechanical protection, water retention, and specialized wide ventral scutes generating forward directional friction.',
          color: '#10b981'
        },
        {
          id: 'snake-jaw',
          label: 'Kinetic Skull & Elastic Mandibular Symphysis',
          description: 'Loosely attached quadrate bones and elastic ligamentous chin joint permitting massive oral expansion and alternating pterygoid walk ingestion.',
          color: '#eab308'
        }
      ]
    },
    keyTakeaways: [
      'Snakes possess 200–400 articulated vertebrae with mobile ribs that produce serpentine lateral undulation.',
      'Solenoglyphous venomous snakes use hinged, hollow needle fangs pressurized by compressor muscles around venom glands.',
      'The bifurcated forked tongue delivers stereoscopic chemical particles to the palate Jacobson\'s organ.',
      'Loreal heat pits detect infrared radiant thermal signatures from warm-blooded prey in total darkness.',
      'Elastic ligaments join lower jaw halves rather than fused bone, enabling swallowing prey much wider than the snake\'s head.'
    ],
    quiz: [
      {
        question: 'Which anatomical adaptation allows snakes to swallow prey significantly larger than the diameter of their heads?',
        options: [
          'Mandibles joined by elastic stretchable ligaments and mobile quadrate bones',
          'A dislocatable spinal cord that unhooks during swallowing',
          'Soft cartilage ribs that dissolve during food ingestion',
          'A hollow gular pouch similar to a pelican'
        ],
        correctAnswerIndex: 0,
        explanation: 'Snakes do not dislocate their jaws; their lower jaw halves are connected by flexible elastic ligaments, and quadrate bones allow tremendous vertical and lateral expansion.'
      },
      {
        question: 'What is the primary sensory function of the bifurcated forked tongue in snakes?',
        options: [
          'Delivering odor molecules to Jacobson\'s organ with directional stereo-olfaction',
          'Injecting venom droplets into prey tissue',
          'Detecting vibrations directly through air soundwaves',
          'Regulating internal blood body temperature through evaporative cooling'
        ],
        correctAnswerIndex: 0,
        explanation: 'The forked tongue collects airborne chemical odorants; having two tips allows the snake to detect chemical concentration gradients left vs right, transferring them to Jacobson\'s organ in the mouth.'
      },
      {
        question: 'How do pit vipers and pythons locate warm-blooded prey in absolute darkness?',
        options: [
          'Using loreal infrared pit organs that detect minute thermal radiation differences',
          'Using echolocation clicks generated inside the glottis',
          'Through bioluminescent ocular pigment receptors',
          'Through magnetic field sensors located on the tail rattle'
        ],
        correctAnswerIndex: 0,
        explanation: 'Loreal facial pit organs contain a heat-sensitive membrane with TRPA1 channels detecting radiant infrared thermal energy down to 0.003°C differentials.'
      },
      {
        question: 'What is the mechanical locomotion method most commonly used by snakes across uneven terrain?',
        options: [
          'Lateral undulation pushing sinusoidal waves against terrain irregularities',
          'Bipedal hopping using modified ventral muscles',
          'Pure hydraulic jet propulsion using stored cloacal fluid',
          'Rigid rotational cartwheeling down sloped ground'
        ],
        correctAnswerIndex: 0,
        explanation: 'Lateral undulation is the primary mode of serpentine locomotion, generating horizontal waves along the 200-400 vertebrae that push backward against surface irregularities.'
      }
    ],
    revision: {
      keyDefinitions: [
        { term: 'Solenoglyphous', definition: 'The most advanced snake dentition, featuring long hollow fangs on rotating maxillae that fold against the roof of the mouth.' },
        { term: 'Jacobson\'s Organ', definition: 'A chemosensory auxiliary olfactory organ located in the roof of the oral cavity that processes chemical cues from the tongue tips.' },
        { term: 'Loreal Pit', definition: 'A deep sensory organ between the eye and nostril containing an infrared-sensitive membrane for thermal detection.' },
        { term: 'Lateral Undulation', definition: 'The serpentine locomotion mode where wave-like body curves push backward against physical points in the environment.' }
      ],
      commonMistakes: [
        'Believing snakes dislocate their jaws; in reality, elastic ligaments and double-jointed quadrate bones allow natural expansion without joint dislocation.',
        'Thinking snake venom is injected through external grooves like a fountain pen; solenoglyphous and proteroglyphous fangs are fully hollow tubes functioning like hypodermic needles.',
        'Assuming snakes sting or taste with their tongue; the tongue is purely an odor-gathering tool for chemical sensing.'
      ],
      flashcards: [
        { front: 'What organ processes the chemical particles collected by a snake\'s tongue?', back: 'Jacobson\'s (vomeronasal) organ in the roof of the mouth.' },
        { front: 'What is the function of loreal facial pits in pit vipers?', back: 'Infrared heat detection, allowing them to sense warm-blooded prey in total darkness.' },
        { front: 'How many vertebrae can a snake have in its axial skeleton?', back: 'Between 200 and over 400 articulated vertebrae with attached ribs.' },
        { front: 'What is solenoglyphous dentition?', back: 'Long, hollow retractable venom fangs on hinged maxillae that fold back when the mouth is closed.' }
      ],
      summaryPoints: [
        'Limbless axial anatomy with 200–400 vertebrae executing serpentine lateral undulation',
        'Ventral scutes provide unidirectional forward traction against substrate',
        'Solenoglyphous hollow fangs deliver pressurized venom from temporal venom glands',
        'Forked tongue provides stereoscopic directionality to Jacobson\'s organ',
        'Loreal pit membranes detect 0.003°C infrared thermal radiation',
        'Cranial kinesis and flexible chin ligaments enable macro-predatory ingestion'
      ]
    },
    sourceType: 'preset',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

export function matchPresetByTopic(query: string, difficulty: Difficulty, language: string): Lesson | null {
  const q = query.toLowerCase();

  // Snake / Serpent / Viper / Cobra / Python / Rattlesnake
  if (
    /\b(snakes?|serpents?|vipers?|cobras?|pythons?|rattlesnakes?|anacondas?|black mamba|boas?|mambas?|reptilian predator|squamata)\b/i.test(q)
  ) {
    const p = PRESET_LESSONS['snake'];
    return { ...p, difficulty, language, id: uuidv4() };
  }

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
  const normalized = q;

  // Smart subject-aware template selection: Default to universal-3d
  let templateId: any = 'universal-3d';
  let subject = 'General Science & Technology';

  const isSnake = /\b(snakes?|serpents?|vipers?|cobras?|pythons?|rattlesnakes?|anacondas?|black mamba|boas?|mambas?|squamata)\b/i.test(q);
  const isAnimal = !isSnake && /\b(tiger|panthera|lion|cheetah|leopard|cat|dog|wolf|bear|elephant|predator|animal|fauna|mammal|wildlife|carnivore|herbivore|bird|reptile|amphibian|fish|shark|whale|zoology|species|prey)\b/i.test(q);
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

  if (isSnake) {
    const p = PRESET_LESSONS['snake'];
    return {
      ...p,
      id: uuidv4(),
      title: `${cleanTitle}: Serpent Biology, Venom Apparatus & Locomotion Biomechanics`,
      difficulty,
      language
    };
  }

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

  // 1. Water Cycle
  if (normalized.includes('water cycle') || normalized.includes('hydrologic') || normalized.includes('hydrological')) {
    return {
      id: uuidv4(),
      title: 'The Water Cycle (Hydrologic Cycle)',
      subject: 'Earth Science & Geography',
      difficulty,
      language,
      learningObjectives: [
        'Understand the continuous movement of water on, above, and below the surface of the Earth.',
        'Trace the key phases: evaporation, transpiration, condensation, precipitation, surface runoff, and infiltration.',
        'Analyze how solar thermal energy powers the cycle and maintains global climatic equilibrium.'
      ],
      summary: 'The water cycle describes how water evaporates from the Earth\'s surface, rises into the atmosphere, cools and condenses into rain or snow in clouds, and falls again to the surface as precipitation.',
      sections: [
        {
          heading: '1. Evaporation & Solar Radiation',
          explanation: 'Thermal energy from the Sun heats liquid water in oceans, lakes, and soil. As kinetic energy increases, water molecules break free from intermolecular bonds, transforming into invisible water vapor and rising into the troposphere.',
          keyPoints: [
            'Oceans contribute over 86% of global evaporated water.',
            'Latent heat of vaporization stores vast energy in the atmosphere.',
            'Plants contribute via transpiration through leaf stomata.'
          ],
          example: 'Sun heating ocean waters, generating thermal updrafts of moisture-rich air.',
          visualizationStepIds: ['step-evap']
        },
        {
          heading: '2. Condensation & Cloud Formation',
          explanation: 'As warm vapor ascends, atmospheric pressure decreases and the air expands adiabatically, cooling toward its dew point. Vapor molecules condense onto microscopic cloud condensation nuclei (aerosols), forming visible clouds.',
          keyPoints: [
            'Dew point is the temperature at which air reaches 100% relative humidity.',
            'Droplets collide and coalesce within updrafts to form cumulonimbus and stratus clouds.',
            'Releases latent heat, powering storms and global wind patterns.'
          ],
          example: 'Water droplets collecting around airborne dust particles high in the atmosphere.',
          visualizationStepIds: ['step-condense']
        },
        {
          heading: '3. Precipitation & Groundwater Flow',
          explanation: 'When droplet mass exceeds upward aerodynamic resistance, water falls as precipitation (rain, snow, hail). Water collects into streams, rivers, and enters underground aquifers via soil percolation before returning to oceans.',
          keyPoints: [
            'Surface runoff feeds watersheds and carved river systems.',
            'Infiltration recharges deep groundwater aquifers.',
            'The cycle has no beginning or end—it is an endless closed thermodynamic loop.'
          ],
          example: 'Rain falling onto mountain peaks and cascading downstream into reservoirs and the sea.',
          visualizationStepIds: ['step-precip']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D Hydrologic Cycle Simulator',
        description: 'Interactive 3D model demonstrating solar evaporation, atmospheric condensation, precipitation, and subterranean percolation.',
        parameters: { autoRotate: true, complexityLevel: 2 },
        steps: [
          {
            id: 'step-evap',
            title: 'Solar Heating & Evaporation',
            explanation: 'Observe thermal energy driving water vapor from ocean reservoirs upward toward the troposphere.',
            highlightIds: ['sun', 'ocean', 'vapor_plume'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-condense',
            title: 'Cloud Condensation',
            explanation: 'Water vapor cools at higher altitudes, condensing into dense cloud droplets.',
            highlightIds: ['cloud_1', 'cloud_2'],
            cameraPreset: 'front'
          },
          {
            id: 'step-precip',
            title: 'Precipitation & Percolation',
            explanation: 'Gravity pulls raindrops down onto mountain terrain, replenishing rivers and deep groundwater aquifers.',
            highlightIds: ['rain_stream', 'mountain_terrain', 'groundwater_layer'],
            cameraPreset: 'side'
          }
        ],
        interactiveElements: [
          { id: 'sun', label: 'The Sun (Energy Driver)', description: 'Nuclear fusion furnace supplying electromagnetic radiation that powers evaporation.', color: '#f59e0b' },
          { id: 'ocean', label: 'Ocean Water Body', description: 'Primary reservoir holding 96.5% of Earth\'s global water inventory.', color: '#0284c7' },
          { id: 'vapor_plume', label: 'Evaporation Updraft', description: 'Thermal vapor streams ascending adiabatically through the atmosphere.', color: '#38bdf8' },
          { id: 'cloud_1', label: 'Cumulus Cloud Base', description: 'Condensed colloidal droplets suspended by atmospheric buoyancy.', color: '#e0e7ff' },
          { id: 'rain_stream', label: 'Precipitation Stream', description: 'Condensed water returning to land and marine surfaces under gravitational acceleration.', color: '#60a5fa' },
          { id: 'mountain_terrain', label: 'Mountain Watershed', description: 'Topographical catchment facilitating runoff, gravity fed streams, and snowpack.', color: '#15803d' },
          { id: 'groundwater_layer', label: 'Aquifer Infiltration', description: 'Permeable rock stratum storing deep freshwater reservoirs via gravitational percolation.', color: '#b45309' }
        ],
        scene: {
          category: 'environmental_terrain',
          topic: 'The Water Cycle',
          metaphor: 'Closed thermodynamic moisture and energy loop',
          cameraPreset: [0, 5, 13],
          targetPreset: [0, 0, 0],
          environmentLighting: 'outdoor',
          groundPlane: { show: true, type: 'water', color: '#0284c7' },
          objects: [
            {
              id: 'sun',
              name: 'Sun (Solar Power Source)',
              description: 'Provides electromagnetic heat driving thermal phase transformation from liquid to vapor.',
              geometry: 'sphere',
              position: [4.5, 4.2, -1],
              scale: [1.2, 1.2, 1.2],
              color: '#f59e0b',
              label: 'Sun (Solar Energy)',
              animation: { type: 'pulse', speed: 1.5, amplitude: 0.1 }
            },
            {
              id: 'ocean',
              name: 'Ocean Reservoir',
              description: 'Vast reservoir of liquid water absorbing solar irradiance.',
              geometry: 'box',
              position: [2.5, -1.8, 0],
              scale: [4.5, 0.6, 4],
              color: '#0284c7',
              label: 'Ocean Reservoir'
            },
            {
              id: 'mountain_terrain',
              name: 'Mountain Catchment',
              description: 'Elevated topography driving orographic lift and watershed runoff.',
              geometry: 'cone',
              position: [-3.2, -0.6, 0],
              scale: [2.4, 2.5, 2.4],
              color: '#15803d',
              label: 'Mountain Catchment'
            },
            {
              id: 'cloud_1',
              name: 'Atmospheric Cloud System',
              description: 'Microscopic droplets condensed around airborne condensation nuclei.',
              geometry: 'capsule',
              position: [-1, 2.8, 0],
              rotation: [0, 0, Math.PI / 2],
              scale: [0.8, 1.8, 0.8],
              color: '#e2e8f0',
              label: 'Condensation (Clouds)',
              animation: { type: 'float', speed: 1.2, amplitude: 0.15 }
            },
            {
              id: 'cloud_2',
              name: 'Secondary Cloud Matrix',
              description: 'Expanding high-altitude moisture accumulation.',
              geometry: 'sphere',
              position: [0.6, 3.1, 0.3],
              scale: [1, 0.8, 0.9],
              color: '#cbd5e1',
              label: 'Cloud Formation'
            },
            {
              id: 'vapor_plume',
              name: 'Evaporative Updraft',
              description: 'Upward molecular kinetic movement of heated water vapor.',
              geometry: 'cylinder',
              position: [2.8, 0.6, 0],
              scale: [0.35, 2.6, 0.35],
              color: '#38bdf8',
              opacity: 0.7,
              label: 'Evaporation Updraft',
              animation: { type: 'oscillate', speed: 2, axis: 'y', amplitude: 0.2 }
            },
            {
              id: 'rain_stream',
              name: 'Precipitation Zone',
              description: 'Droplets falling under gravity back to terrestrial soil and lakes.',
              geometry: 'arrow',
              position: [-2.2, 1.1, 0],
              rotation: [0, 0, -Math.PI / 2],
              scale: [0.6, 1.8, 0.6],
              color: '#60a5fa',
              label: 'Precipitation (Rain)',
              animation: { type: 'piston', speed: 3, axis: 'y', amplitude: 0.3 }
            },
            {
              id: 'groundwater_layer',
              name: 'Groundwater Aquifer',
              description: 'Subterranean porous strata filtering and storing underground aquifers.',
              geometry: 'box',
              position: [-1.2, -2.6, 0],
              scale: [6.5, 0.8, 3.8],
              color: '#78350f',
              label: 'Groundwater & Infiltration'
            }
          ],
          connections: [
            { id: 'conn-evap', fromId: 'ocean', toId: 'cloud_2', type: 'particle_flow', label: 'Evaporation', color: '#38bdf8', animatedFlow: true },
            { id: 'conn-drift', fromId: 'cloud_2', toId: 'cloud_1', type: 'tube', label: 'Wind Advection', color: '#94a3b8', animatedFlow: true },
            { id: 'conn-precip', fromId: 'cloud_1', toId: 'mountain_terrain', type: 'arrow', label: 'Rainfall', color: '#60a5fa', animatedFlow: true },
            { id: 'conn-runoff', fromId: 'mountain_terrain', toId: 'ocean', type: 'tube', label: 'River Runoff', color: '#0ea5e9', animatedFlow: true },
            { id: 'conn-infiltrate', fromId: 'mountain_terrain', toId: 'groundwater_layer', type: 'dashed_line', label: 'Percolation', color: '#b45309', animatedFlow: true }
          ]
        }
      },
      keyTakeaways: [
        'The water cycle is powered by solar radiation and modulated by Earth\'s gravity.',
        'Total water mass on Earth remains constant; only its thermodynamic phase and physical location shift.',
        'Human civilization relies on precipitation and aquifer filtration for agricultural and municipal survival.'
      ],
      quiz: [
        {
          question: 'What is the primary thermodynamic energy engine powering the water cycle?',
          options: [
            'Solar thermal radiation from the Sun',
            'Geothermal heat from Earth\'s core',
            'Gravitational tidal pull from the Moon',
            'Wind friction over mountain peaks'
          ],
          correctAnswerIndex: 0,
          explanation: 'Solar irradiance provides the latent heat of vaporization necessary to break hydrogen bonds in liquid water and drive evaporation.'
        },
        {
          question: 'What happens during the condensation phase?',
          options: [
            'Water vapor cools and transitions from gas to suspended liquid droplets',
            'Liquid water breaks down into oxygen and hydrogen gas',
            'Water infiltrates deep into rock bedrock',
            'Ice sublimates directly into vapor without liquid transition'
          ],
          correctAnswerIndex: 0,
          explanation: 'As vapor ascends and cools to its dew point, molecules coalesce onto aerosol nuclei to form clouds.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'Evaporation', definition: 'The physical phase transition where liquid water converts into gaseous vapor through thermal kinetic energy.' },
          { term: 'Condensation', definition: 'The process where gaseous water vapor cools and transitions into liquid water droplets, forming clouds.' },
          { term: 'Precipitation', definition: 'Water released from clouds in the form of rain, freezing rain, sleet, snow, or hail.' },
          { term: 'Percolation', definition: 'The downward movement of water through soil and rock layers recharging deep aquifers.' }
        ],
        commonMistakes: [
          'Assuming water disappearing during evaporation is permanently lost from the planetary system.',
          'Believing clouds are made of water vapor gas (they actually consist of suspended liquid droplets or ice crystals).'
        ],
        flashcards: [
          { front: 'What is transpiration?', back: 'The release of water vapor from plant stomata into the atmosphere.' },
          { front: 'Why does air cool as it rises?', back: 'Adiabatic expansion due to decreasing atmospheric pressure at higher altitudes.' }
        ],
        summaryPoints: [
          'Solar energy evaporates water from oceans, soils, and vegetative transpiration.',
          'Ascending moist air cools adiabatically and condenses into cloud formations.',
          'Gravity precipitates water back to terrain, driving erosion, runoff, and groundwater recharge.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 2. Pythagoras' Theorem
  if (normalized.includes('pythagor') || normalized.includes('right triangle') || normalized.includes('hypotenuse')) {
    return {
      id: uuidv4(),
      title: 'Pythagorean Theorem: a² + b² = c²',
      subject: 'Mathematics & 3D Geometry',
      difficulty,
      language,
      learningObjectives: [
        'Understand the fundamental geometric relationship between the sides of any right-angled triangle.',
        'Visualize how the square of the hypotenuse equals the sum of the squares of the perpendicular legs (a² + b² = c²).',
        'Apply the theorem to calculate distances in 2D and 3D Euclidean space.'
      ],
      summary: 'In any right-angled triangle, the area of the square whose side is the hypotenuse (the side opposite the right angle) is equal to the sum of the areas of the squares on the other two legs.',
      sections: [
        {
          heading: '1. Anatomy of the Right-Angled Triangle',
          explanation: 'A right-angled triangle possesses one interior angle measuring exactly 90 degrees (π/2 radians). The two sides forming this angle are perpendicular legs a and b, while the longest side opposite the 90° angle is the hypotenuse c.',
          keyPoints: [
            'Hypotenuse (c) is always strictly longer than either individual leg.',
            'The right angle serves as the orthogonal reference frame in Cartesian coordinate systems.',
            'Standard integer examples include the primitive Pythagorean triples (3, 4, 5) and (5, 12, 13).'
          ],
          example: 'A triangle with base a = 3 units, altitude b = 4 units, and hypotenuse c = 5 units.',
          visualizationStepIds: ['step-triangle']
        },
        {
          heading: '2. Geometric Proof by Area Equivalence',
          explanation: 'Geometrically, a² represents the physical area of a square constructed on leg a (3×3 = 9). Similarly, b² is the area of a square constructed on leg b (4×4 = 16). The hypotenuse square c² has an area of 5×5 = 25. Notice that 9 + 16 = 25.',
          keyPoints: [
            'Area of Square A: a² = 9 sq units.',
            'Area of Square B: b² = 16 sq units.',
            'Sum of Areas: 9 + 16 = 25 sq units = Area of Square C (c²).'
          ],
          example: 'Rearranging four identical triangles within a bounding square proves the area conservation without algebra.',
          visualizationStepIds: ['step-squares']
        },
        {
          heading: '3. Applications in Vectors and 3D Coordinates',
          explanation: 'Pythagoras\' theorem directly underpins Euclidean distance metrics across spatial dimensions. In 3D space, distance d = √(Δx² + Δy² + Δz²), extending the theorem into game graphics, structural physics, and celestial navigation.',
          keyPoints: [
            '2D Euclidean Distance: d = √((x₂ - x₁)² + (y₂ - y₁)²).',
            '3D Space Extension: d² = x² + y² + z².',
            'Foundation of trigonometry: sin²(θ) + cos²(θ) = 1.'
          ],
          example: 'Calculating distance between a camera position and an object in a 3D graphics rendering pipeline.',
          visualizationStepIds: ['step-application']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D Pythagorean Geometric Demonstration',
        description: 'Interactive spatial model of a 3-4-5 right triangle with extruded square area slabs demonstrating a² + b² = c².',
        parameters: { autoRotate: false, complexityLevel: 2 },
        steps: [
          {
            id: 'step-triangle',
            title: 'Right-Angled Triangle Base',
            explanation: 'Inspect the right triangle with leg a = 3 (cyan), leg b = 4 (emerald), and hypotenuse c = 5 (amber).',
            highlightIds: ['leg_a', 'leg_b', 'hypotenuse_c', 'right_angle_marker'],
            cameraPreset: 'front'
          },
          {
            id: 'step-squares',
            title: 'Area Equivalence: a² + b² = c²',
            explanation: 'Observe the extruded area slabs: Square a² (9 units) and Square b² (16 units) combine to exactly match Square c² (25 units).',
            highlightIds: ['square_a', 'square_b', 'square_c'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-application',
            title: '3D Spatial Distance',
            explanation: 'Rotate freely to understand how orthogonal legs form the metric tensor for distances in Euclidean space.',
            highlightIds: ['square_c', 'hypotenuse_c'],
            cameraPreset: 'top'
          }
        ],
        interactiveElements: [
          { id: 'leg_a', label: 'Leg a (Base = 3)', description: 'Horizontal orthogonal leg of length 3 units.', color: '#06b6d4' },
          { id: 'leg_b', label: 'Leg b (Altitude = 4)', description: 'Vertical orthogonal leg of length 4 units perpendicular to leg a.', color: '#10b981' },
          { id: 'hypotenuse_c', label: 'Hypotenuse c (Length = 5)', description: 'Opposite the 90° angle; length calculated as √(3² + 4²) = 5.', color: '#f59e0b' },
          { id: 'right_angle_marker', label: 'Right Angle (90°)', description: 'Perpendicular orthogonal junction establishing Euclidean orthogonality.', color: '#ef4444' },
          { id: 'square_a', label: 'Square on Leg a (Area = 9)', description: 'Extruded square slab measuring 3 × 3 = 9 square units.', color: '#22d3ee' },
          { id: 'square_b', label: 'Square on Leg b (Area = 16)', description: 'Extruded square slab measuring 4 × 4 = 16 square units.', color: '#34d399' },
          { id: 'square_c', label: 'Square on Hypotenuse c (Area = 25)', description: 'Extruded square slab measuring 5 × 5 = 25 square units. Notice: 9 + 16 = 25.', color: '#fbbf24' }
        ],
        scene: {
          category: 'geometric_math',
          topic: 'Pythagorean Theorem',
          metaphor: 'Orthogonal right triangle area conservation a² + b² = c²',
          cameraPreset: [0, 5, 12],
          targetPreset: [0, 0, 0],
          environmentLighting: 'studio',
          groundPlane: { show: true, type: 'grid', color: '#0f172a' },
          objects: [
            {
              id: 'leg_a',
              name: 'Leg a (Base = 3)',
              description: 'Base leg along the horizontal axis with length 3.',
              geometry: 'cylinder',
              position: [-0.5, -1.5, 0],
              rotation: [0, 0, Math.PI / 2],
              scale: [0.12, 3, 0.12],
              color: '#06b6d4',
              label: 'Leg a (3)'
            },
            {
              id: 'leg_b',
              name: 'Leg b (Altitude = 4)',
              description: 'Altitude leg along the vertical axis with length 4.',
              geometry: 'cylinder',
              position: [1, 0.5, 0],
              rotation: [0, 0, 0],
              scale: [0.12, 4, 0.12],
              color: '#10b981',
              label: 'Leg b (4)'
            },
            {
              id: 'hypotenuse_c',
              name: 'Hypotenuse c (Length = 5)',
              description: 'Diagonal segment connecting endpoints (-2, -1.5) to (1, 2.5).',
              geometry: 'cylinder',
              position: [-0.5, 0.5, 0],
              rotation: [0, 0, -0.6435],
              scale: [0.14, 5, 0.14],
              color: '#f59e0b',
              label: 'Hypotenuse c (5)'
            },
            {
              id: 'right_angle_marker',
              name: '90° Orthogonal Corner',
              description: 'Indicates the perpendicular right angle between legs a and b.',
              geometry: 'box',
              position: [0.75, -1.25, 0],
              scale: [0.4, 0.4, 0.1],
              color: '#ef4444',
              label: '90° Angle'
            },
            {
              id: 'square_a',
              name: 'Square a² (Area = 9)',
              description: 'Constructed on leg a with area 3 × 3 = 9.',
              geometry: 'box',
              position: [-0.5, -3.1, 0],
              scale: [3, 3, 0.25],
              color: '#0891b2',
              opacity: 0.85,
              label: 'Area a² = 9'
            },
            {
              id: 'square_b',
              name: 'Square b² (Area = 16)',
              description: 'Constructed on leg b with area 4 × 4 = 16.',
              geometry: 'box',
              position: [3.1, 0.5, 0],
              scale: [4, 4, 0.25],
              color: '#059669',
              opacity: 0.85,
              label: 'Area b² = 16'
            },
            {
              id: 'square_c',
              name: 'Square c² (Area = 25)',
              description: 'Constructed on hypotenuse c with area 5 × 5 = 25.',
              geometry: 'box',
              position: [-2.1, 2.6, 0],
              rotation: [0, 0, -0.6435],
              scale: [5, 5, 0.25],
              color: '#d97706',
              opacity: 0.85,
              label: 'Area c² = 25 (9+16)'
            }
          ],
          connections: [
            { id: 'conn-a-c', fromId: 'square_a', toId: 'square_c', type: 'tube', label: '9 units', color: '#06b6d4', animatedFlow: true },
            { id: 'conn-b-c', fromId: 'square_b', toId: 'square_c', type: 'tube', label: '16 units', color: '#10b981', animatedFlow: true }
          ]
        }
      },
      keyTakeaways: [
        'In any right triangle with perpendicular sides a and b, a² + b² = c².',
        'The hypotenuse is the side strictly opposite the 90° right angle.',
        'This geometric property forms the cornerstone of trigonometry, 3D graphics, and spatial physics.'
      ],
      quiz: [
        {
          question: 'In a right triangle with legs measuring 6 units and 8 units, what is the length of the hypotenuse?',
          options: ['10 units', '14 units', '12 units', '48 units'],
          correctAnswerIndex: 0,
          explanation: 'c² = 6² + 8² = 36 + 64 = 100. Taking the square root, c = √100 = 10.'
        },
        {
          question: 'To which type of triangles does the Pythagorean theorem directly apply in flat geometry?',
          options: [
            'Only right-angled triangles with a 90° angle',
            'Any equilateral triangle',
            'All acute triangles',
            'Only obtuse triangles'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Pythagorean theorem holds strictly for right triangles where one angle is 90° (non-right triangles require the Law of Cosines).'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'Hypotenuse', definition: 'The longest side of a right-angled triangle, situated directly opposite the right (90°) angle.' },
          { term: 'Pythagorean Triple', definition: 'A set of three positive integers (a, b, c) that perfectly satisfy a² + b² = c² (e.g., 3, 4, 5).' },
          { term: 'Euclidean Metric', definition: 'The straight-line spatial distance formula derived directly from Pythagoras\' theorem.' }
        ],
        commonMistakes: [
          'Attempting to apply a² + b² = c² to triangles that do not contain a 90° right angle.',
          'Adding side lengths directly (a + b = c) instead of adding their squared areas (a² + b² = c²).'
        ],
        flashcards: [
          { front: 'What is the Pythagorean theorem equation?', back: 'a² + b² = c², where c is the hypotenuse.' },
          { front: 'What is √(9² + 12²)?', back: '√(81 + 144) = √225 = 15.' }
        ],
        summaryPoints: [
          'Identifies the relationship between legs and hypotenuse in right triangles.',
          'Area of the square on the hypotenuse equals the sum of the areas of the squares on the legs.',
          'Used universally to calculate distances in geometry, engineering, and computer graphics.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 3. Car Engine / Internal Combustion
  if (normalized.includes('engine') || normalized.includes('internal combustion') || normalized.includes('piston') || normalized.includes('cylinder')) {
    return {
      id: uuidv4(),
      title: 'Four-Stroke Internal Combustion Engine',
      subject: 'Mechanical Engineering & Thermodynamics',
      difficulty,
      language,
      learningObjectives: [
        'Understand how reciprocating linear piston motion converts into rotational torque via the crankshaft.',
        'Analyze the 4 cycles of the Otto thermodynamic cycle: Intake, Compression, Power, and Exhaust.',
        'Inspect the mechanical assembly of cylinder block, piston, connecting rod, camshaft valves, and spark plug.'
      ],
      summary: 'The four-stroke internal combustion engine converts chemical energy stored in hydrocarbon fuel into mechanical rotational energy through controlled thermodynamic expansion inside sealed cylinders.',
      sections: [
        {
          heading: '1. Intake & Compression Strokes',
          explanation: 'During the Intake stroke, the intake valve opens and the piston descends from Top Dead Center (TDC) to Bottom Dead Center (BDC), drawing in air-fuel mixture. In the Compression stroke, valves seal and the piston ascends, compressing the mixture to ~10:1 ratio.',
          keyPoints: [
            'Intake: Piston moves downward, creating partial vacuum that draws fuel-air mixture.',
            'Compression: Valves close, compressing gas and elevating temperature and pressure.',
            'Crankshaft rotates 360° across these two preparatory strokes.'
          ],
          example: 'Air and gasoline atomized and forced into high-pressure readiness inside the combustion chamber.',
          visualizationStepIds: ['step-intake-compression']
        },
        {
          heading: '2. Power (Combustion) Stroke',
          explanation: 'Near TDC, the spark plug fires an electrical arc (~20,000V), detonating the compressed mixture. Rapid thermal expansion of combustion gases drives the piston downward with immense kinetic force, delivering mechanical work.',
          keyPoints: [
            'Spark ignition triggers rapid exothermic chemical chain reaction.',
            'Peak pressures reach 40 to 80 atmospheres pushing the piston down.',
            'This is the only stroke that produces net positive thermodynamic power.'
          ],
          example: 'Expanding gas pushing the piston head down, driving the connecting rod against the crankshaft journal.',
          visualizationStepIds: ['step-power']
        },
        {
          heading: '3. Exhaust & Crankshaft Rotation',
          explanation: 'As the piston nears BDC, the exhaust valve opens. Momentum stored in the heavy flywheel drives the piston back up toward TDC, scavenging spent exhaust gases through the manifold and completing the 720° two-revolution Otto cycle.',
          keyPoints: [
            'Exhaust valve releases spent combustion products (CO₂, H₂O, N₂).',
            'Flywheel inertia sustains rotational energy across the non-power strokes.',
            'Crankshaft translates reciprocating linear oscillation into driving wheel torque.'
          ],
          example: 'Spinning crankshaft delivering rotational torque through the transmission to turn vehicle wheels.',
          visualizationStepIds: ['step-exhaust']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D Reciprocating Engine Cylinder Assembly',
        description: 'Interactive cutaway model of a 4-stroke engine cylinder showing reciprocating piston, connecting rod, rotating crankshaft, overhead valves, and spark plug.',
        parameters: { autoRotate: false, complexityLevel: 2 },
        steps: [
          {
            id: 'step-intake-compression',
            title: 'Intake & Compression Phases',
            explanation: 'Inspect the cylindrical bore where the piston creates vacuum to draw and compress fuel mixture.',
            highlightIds: ['cylinder_block', 'piston_assembly', 'intake_valve'],
            cameraPreset: 'front'
          },
          {
            id: 'step-power',
            title: 'Ignition & Power Stroke',
            explanation: 'Spark plug ignites the pressurized fuel mixture, driving the piston head down under high expansion pressure.',
            highlightIds: ['spark_plug', 'piston_assembly', 'connecting_rod'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-exhaust',
            title: 'Torque Conversion & Exhaust',
            explanation: 'Connecting rod transmits linear downward force to rotate the crankshaft and flywheel, while the exhaust valve clears spent gases.',
            highlightIds: ['crankshaft_journal', 'exhaust_valve', 'flywheel_gear'],
            cameraPreset: 'side'
          }
        ],
        interactiveElements: [
          { id: 'cylinder_block', label: 'Cylinder Block (Cutaway)', description: 'Rigid cast-iron or aluminum alloy sleeve guiding the linear piston motion.', color: '#475569' },
          { id: 'piston_assembly', label: 'Reciprocating Piston', description: 'Cylindrical alloy component that reciprocates vertically, sealed with tensioned piston rings.', color: '#38bdf8' },
          { id: 'connecting_rod', label: 'Connecting Rod (Conrod)', description: 'Forged steel beam pivoting between wrist pin and crank journal, translating linear force.', color: '#94a3b8' },
          { id: 'crankshaft_journal', label: 'Crankshaft', description: 'Offset counterweighted shaft converting reciprocating piston motion into continuous rotational torque.', color: '#f59e0b' },
          { id: 'spark_plug', label: 'High-Voltage Spark Plug', description: 'Ceramic-insulated electrode providing timed electrical spark ignition at peak compression.', color: '#ef4444' },
          { id: 'intake_valve', label: 'Intake Poppet Valve', description: 'Camshaft-actuated valve admitting ambient air-fuel charge into the chamber.', color: '#10b981' },
          { id: 'exhaust_valve', label: 'Exhaust Poppet Valve', description: 'Spring-loaded valve releasing hot spent combustion products into the exhaust manifold.', color: '#f97316' },
          { id: 'flywheel_gear', label: 'Inertial Flywheel Gear', description: 'Heavy rotating disc that dampens torsional vibration and stores momentum across non-power strokes.', color: '#6366f1' }
        ],
        scene: {
          category: 'mechanical',
          topic: 'Four-Stroke Engine',
          metaphor: 'Reciprocating thermodynamic work converted into rotational shaft torque',
          cameraPreset: [0, 1, 9],
          targetPreset: [0, 0, 0],
          environmentLighting: 'laboratory',
          groundPlane: { show: true, type: 'checkerboard', color: '#334155' },
          objects: [
            {
              id: 'cylinder_block',
              name: 'Engine Cylinder Block',
              description: 'Precision honed cylinder wall housing reciprocating piston displacement.',
              geometry: 'cylinder',
              position: [0, 1.2, 0],
              scale: [1.3, 2.8, 1.3],
              color: '#334155',
              wireframe: true,
              label: 'Cylinder Bore'
            },
            {
              id: 'piston_assembly',
              name: 'Reciprocating Piston Head',
              description: 'Transfers high pressure gas expansion force into linear mechanical displacement.',
              geometry: 'cylinder',
              position: [0, 1.4, 0],
              scale: [1.15, 0.7, 1.15],
              color: '#38bdf8',
              label: 'Piston Head',
              animation: { type: 'piston', speed: 4, axis: 'y', amplitude: 0.7 }
            },
            {
              id: 'connecting_rod',
              name: 'Connecting Rod',
              description: 'Articulated beam linking piston wrist-pin to rotating crankshaft journal.',
              geometry: 'capsule',
              position: [0, -0.3, 0],
              scale: [0.25, 1.8, 0.25],
              color: '#94a3b8',
              label: 'Connecting Rod',
              animation: { type: 'oscillate', speed: 4, axis: 'z', amplitude: 0.2 }
            },
            {
              id: 'crankshaft_journal',
              name: 'Rotating Crankshaft',
              description: 'Transforms reciprocating vertical work into rotational driving torque.',
              geometry: 'cylinder',
              position: [0, -2.2, 0],
              rotation: [Math.PI / 2, 0, 0],
              scale: [0.6, 1.2, 0.6],
              color: '#f59e0b',
              label: 'Crankshaft',
              animation: { type: 'rotate', speed: 4, axis: 'z' }
            },
            {
              id: 'flywheel_gear',
              name: 'Flywheel Gear Ring',
              description: 'Rotational inertia stabilizer storing kinetic energy.',
              geometry: 'gear',
              position: [0, -2.2, -0.8],
              rotation: [0, 0, 0],
              scale: [1.5, 1.5, 0.3],
              color: '#6366f1',
              label: 'Flywheel',
              animation: { type: 'rotate', speed: 4, axis: 'z' }
            },
            {
              id: 'spark_plug',
              name: 'Spark Plug Electrode',
              description: 'Fires high voltage ignition spark detonating compressed air-fuel charge.',
              geometry: 'capsule',
              position: [0, 2.9, 0],
              scale: [0.25, 0.7, 0.25],
              color: '#ef4444',
              label: 'Spark Plug',
              animation: { type: 'pulse', speed: 8, amplitude: 0.1 }
            },
            {
              id: 'intake_valve',
              name: 'Intake Poppet Valve',
              description: 'Opens downward to admit fresh air-fuel mixture during intake stroke.',
              geometry: 'cone',
              position: [-0.6, 2.7, 0],
              rotation: [0, 0, Math.PI],
              scale: [0.35, 0.6, 0.35],
              color: '#10b981',
              label: 'Intake Valve',
              animation: { type: 'piston', speed: 2, axis: 'y', amplitude: 0.15 }
            },
            {
              id: 'exhaust_valve',
              name: 'Exhaust Poppet Valve',
              description: 'Opens to vent post-combustion exhaust gases into header.',
              geometry: 'cone',
              position: [0.6, 2.7, 0],
              rotation: [0, 0, Math.PI],
              scale: [0.35, 0.6, 0.35],
              color: '#f97316',
              label: 'Exhaust Valve',
              animation: { type: 'piston', speed: 2, axis: 'y', amplitude: 0.15 }
            }
          ],
          connections: [
            { id: 'conn-piston-rod', fromId: 'piston_assembly', toId: 'connecting_rod', type: 'tube', label: 'Wrist Pin', color: '#38bdf8', animatedFlow: true },
            { id: 'conn-rod-crank', fromId: 'connecting_rod', toId: 'crankshaft_journal', type: 'tube', label: 'Crank Journal', color: '#f59e0b', animatedFlow: true }
          ]
        }
      },
      keyTakeaways: [
        'A 4-stroke engine completes four distinct piston movements across two crankshaft rotations (720°).',
        'Only the power stroke generates mechanical work; the other three strokes consume flywheel inertia.',
        'Thermal efficiency is dictated by the compression ratio and combustion temperature limits.'
      ],
      quiz: [
        {
          question: 'In a four-stroke engine, how many rotations of the crankshaft complete one full Otto cycle?',
          options: ['Two rotations (720 degrees)', 'One rotation (360 degrees)', 'Four rotations (1440 degrees)', 'Half rotation (180 degrees)'],
          correctAnswerIndex: 0,
          explanation: 'Each stroke is a 180° crank turn. Four strokes (Intake, Compression, Power, Exhaust) equal 4 × 180° = 720°, or two complete crank revolutions.'
        },
        {
          question: 'What is the primary function of the connecting rod?',
          options: [
            'Convert reciprocating linear motion of the piston into rotational torque on the crankshaft',
            'Deliver electricity to the spark plug',
            'Filter carbon deposits from fuel injectors',
            'Cool the intake air before compression'
          ],
          correctAnswerIndex: 0,
          explanation: 'The connecting rod bridges the linear translation of the piston wrist pin to the eccentric rotational radius of the crankshaft.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'Top Dead Center (TDC)', definition: 'The highest vertical point reached by the piston crown within the cylinder bore.' },
          { term: 'Compression Ratio', definition: 'The ratio of cylinder volume at BDC compared to the clearance volume remaining at TDC.' },
          { term: 'Otto Cycle', definition: 'The idealized four-stroke thermodynamic cycle describing spark-ignition internal combustion engines.' }
        ],
        commonMistakes: [
          'Confusing a 4-stroke cycle with needing 4 crankshaft rotations instead of 2 rotations.',
          'Assuming both valves stay open simultaneously during the power stroke (both are firmly seated and closed).'
        ],
        flashcards: [
          { front: 'Name the four engine strokes in order:', back: 'Intake -> Compression -> Power -> Exhaust.' },
          { front: 'Which stroke delivers net positive mechanical power?', back: 'The power (combustion) stroke.' }
        ],
        summaryPoints: [
          'Intake draws fuel-air mixture downward; compression compresses it upward.',
          'Spark ignition unleashes high gas pressure driving the power stroke.',
          'Exhaust evacuates combustion products, sustained by flywheel inertia.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 4. Binary Search Tree (BST)
  if (normalized.includes('binary search tree') || normalized.includes(' bst ') || normalized.includes('binary tree') || normalized.includes('tree node')) {
    return {
      id: uuidv4(),
      title: 'Binary Search Tree (BST) Data Structure',
      subject: 'Computer Science & Algorithms',
      difficulty,
      language,
      learningObjectives: [
        'Understand the core invariant: for any node, left subtree values are strictly smaller and right subtree values are strictly greater.',
        'Analyze average time complexities: O(log n) for search, insertion, and deletion versus O(n) worst case in skewed trees.',
        'Visualize in-order traversal producing a sorted monotonic numerical sequence.'
      ],
      summary: 'A Binary Search Tree is a hierarchical node-based data structure where each node holds a key and at most two child pointers, satisfying the BST invariant to enable rapid logarithmic search and ordering.',
      sections: [
        {
          heading: '1. The BST Ordering Invariant',
          explanation: 'Every node in a BST holds a comparable key. All keys in the node\'s left subtree must be strictly less than the node\'s key (left < key), and all keys in the right subtree must be strictly greater (key < right). Duplicate keys are handled by policy or discarded.',
          keyPoints: [
            'Root node anchors the tree at depth 0.',
            'Left child < Parent < Right child ordering enforced recursively at every level.',
            'No cycles: each child has exactly one parent reference.'
          ],
          example: 'Root with key 50 branching left to 30 and right to 70.',
          visualizationStepIds: ['step-tree-structure']
        },
        {
          heading: '2. Search Algorithm Traversal',
          explanation: 'To search for target value 60, start at root (50). Since 60 > 50, discard the entire left subtree and descend right to 70. Since 60 < 70, descend left to 60. Found in just 2 comparisons instead of scanning all nodes linearly.',
          keyPoints: [
            'Each step eliminates half the remaining search space in balanced trees.',
            'Average time complexity: O(log₂ n) search time.',
            'Requires only O(h) memory space where h is tree height.'
          ],
          example: 'Target 60: 50 -> 70 -> 60 found efficiently.',
          visualizationStepIds: ['step-search-traversal']
        },
        {
          heading: '3. Tree Traversals & Balancing',
          explanation: 'In-order traversal (Left, Root, Right) recursively visits nodes to output values in ascending sorted order: [20, 30, 40, 50, 60, 70, 80]. If elements are inserted sorted without balancing, the tree degenerates into a linear linked list O(n), which self-balancing trees (AVL, Red-Black) prevent.',
          keyPoints: [
            'In-order traversal yields monotonic sorted array in O(n) time.',
            'Pre-order traversal preserves tree serialization structure.',
            'Self-balancing variants (AVL, Red-Black) maintain O(log n) height guarantees.'
          ],
          example: 'Traversing nodes yields perfectly ordered data.',
          visualizationStepIds: ['step-inorder']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D Binary Search Tree Explorer',
        description: 'Hierarchical 3D node-and-edge visualization of a BST rooted at 50 with branching child nodes and search pointer.',
        parameters: { autoRotate: false, complexityLevel: 2 },
        steps: [
          {
            id: 'step-tree-structure',
            title: 'Hierarchical Tree Structure',
            explanation: 'Inspect the root node (50) branching to left child (30) and right child (70).',
            highlightIds: ['node_50', 'node_30', 'node_70'],
            cameraPreset: 'front'
          },
          {
            id: 'step-search-traversal',
            title: 'Search Traversal (Locating 60)',
            explanation: 'Follow search pointer: Compare with root (50) -> branch right to (70) -> branch left to reach target (60).',
            highlightIds: ['search_cursor', 'node_50', 'node_70', 'node_60'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-inorder',
            title: 'In-Order Traversal [20..80]',
            explanation: 'Visiting Left -> Root -> Right outputs keys in perfect ascending sorted sequence.',
            highlightIds: ['node_20', 'node_30', 'node_40', 'node_50', 'node_60', 'node_70', 'node_80'],
            cameraPreset: 'top'
          }
        ],
        interactiveElements: [
          { id: 'node_50', label: 'Root Node (Key: 50)', description: 'Primary root element anchoring the binary search tree.', color: '#6366f1' },
          { id: 'node_30', label: 'Left Subtree Root (Key: 30)', description: 'Values strictly smaller than 50 (30 < 50).', color: '#06b6d4' },
          { id: 'node_70', label: 'Right Subtree Root (Key: 70)', description: 'Values strictly larger than 50 (70 > 50).', color: '#10b981' },
          { id: 'node_20', label: 'Leaf Node (Key: 20)', description: 'Left child of 30: smallest element in tree.', color: '#38bdf8' },
          { id: 'node_40', label: 'Leaf Node (Key: 40)', description: 'Right child of 30: between 30 and 50.', color: '#38bdf8' },
          { id: 'node_60', label: 'Target Node (Key: 60)', description: 'Left child of 70: located in 2 comparison steps.', color: '#f59e0b' },
          { id: 'node_80', label: 'Leaf Node (Key: 80)', description: 'Right child of 70: largest element in tree.', color: '#34d399' },
          { id: 'search_cursor', label: 'Active Search Pointer', description: 'Visual cursor tracing logarithmic query path through tree branches.', color: '#ef4444' }
        ],
        scene: {
          category: 'computer_science',
          topic: 'Binary Search Tree',
          metaphor: 'Hierarchical logarithmic branching sorted by key order',
          cameraPreset: [0, 1, 9],
          targetPreset: [0, 0, 0],
          environmentLighting: 'space',
          groundPlane: { show: true, type: 'grid', color: '#1e1b4b' },
          objects: [
            {
              id: 'node_50',
              name: 'Root Node (50)',
              description: 'Central root key 50 dividing left and right partitions.',
              geometry: 'sphere',
              position: [0, 2.4, 0],
              scale: [0.9, 0.9, 0.9],
              color: '#6366f1',
              label: 'Root: 50',
              animation: { type: 'pulse', speed: 1.2, amplitude: 0.08 }
            },
            {
              id: 'node_30',
              name: 'Node (30)',
              description: 'Left child of 50; root of smaller partition.',
              geometry: 'sphere',
              position: [-2.4, 0.8, 0],
              scale: [0.8, 0.8, 0.8],
              color: '#06b6d4',
              label: '30 (< 50)'
            },
            {
              id: 'node_70',
              name: 'Node (70)',
              description: 'Right child of 50; root of larger partition.',
              geometry: 'sphere',
              position: [2.4, 0.8, 0],
              scale: [0.8, 0.8, 0.8],
              color: '#10b981',
              label: '70 (> 50)'
            },
            {
              id: 'node_20',
              name: 'Node (20)',
              description: 'Left leaf of 30 (20 < 30).',
              geometry: 'sphere',
              position: [-3.6, -1.0, 0],
              scale: [0.7, 0.7, 0.7],
              color: '#38bdf8',
              label: '20'
            },
            {
              id: 'node_40',
              name: 'Node (40)',
              description: 'Right leaf of 30 (40 > 30).',
              geometry: 'sphere',
              position: [-1.2, -1.0, 0],
              scale: [0.7, 0.7, 0.7],
              color: '#38bdf8',
              label: '40'
            },
            {
              id: 'node_60',
              name: 'Target Node (60)',
              description: 'Left child of 70 (60 < 70).',
              geometry: 'sphere',
              position: [1.2, -1.0, 0],
              scale: [0.75, 0.75, 0.75],
              color: '#f59e0b',
              label: 'Target: 60',
              animation: { type: 'pulse', speed: 2, amplitude: 0.12 }
            },
            {
              id: 'node_80',
              name: 'Node (80)',
              description: 'Right leaf of 70 (80 > 70).',
              geometry: 'sphere',
              position: [3.6, -1.0, 0],
              scale: [0.7, 0.7, 0.7],
              color: '#34d399',
              label: '80'
            },
            {
              id: 'search_cursor',
              name: 'Active Traversal Indicator',
              description: 'Animated pointer demonstrating search path down right branch.',
              geometry: 'arrow',
              position: [1.8, 0.0, 0.4],
              rotation: [0, 0, -2.3],
              scale: [0.5, 1.0, 0.5],
              color: '#ef4444',
              label: 'Search Path',
              animation: { type: 'oscillate', speed: 2.5, axis: 'y', amplitude: 0.2 }
            }
          ],
          connections: [
            { id: 'conn-50-30', fromId: 'node_50', toId: 'node_30', type: 'tube', label: 'Left (< 50)', color: '#06b6d4', animatedFlow: true },
            { id: 'conn-50-70', fromId: 'node_50', toId: 'node_70', type: 'tube', label: 'Right (> 50)', color: '#10b981', animatedFlow: true },
            { id: 'conn-30-20', fromId: 'node_30', toId: 'node_20', type: 'arrow', label: '< 30', color: '#38bdf8', animatedFlow: false },
            { id: 'conn-30-40', fromId: 'node_30', toId: 'node_40', type: 'arrow', label: '> 30', color: '#38bdf8', animatedFlow: false },
            { id: 'conn-70-60', fromId: 'node_70', toId: 'node_60', type: 'tube', label: '< 70', color: '#f59e0b', animatedFlow: true },
            { id: 'conn-70-80', fromId: 'node_70', toId: 'node_80', type: 'arrow', label: '> 70', color: '#34d399', animatedFlow: false }
          ]
        }
      },
      keyTakeaways: [
        'A Binary Search Tree enforces the left < parent < right invariant at every node.',
        'Balanced BSTs provide O(log n) average time complexity for lookup, insertion, and deletion.',
        'In-order tree traversal visits nodes in strictly increasing sorted numerical order.'
      ],
      quiz: [
        {
          question: 'In a valid Binary Search Tree, where must all values strictly smaller than the root reside?',
          options: [
            'Entirely in the root\'s left subtree',
            'Entirely in the root\'s right subtree',
            'Distributed randomly across leaf nodes',
            'In the highest depth nodes only'
          ],
          correctAnswerIndex: 0,
          explanation: 'The fundamental BST property requires every key in the left subtree of a node to be strictly less than that node\'s key.'
        },
        {
          question: 'What is the average time complexity for searching an element in a balanced BST containing n items?',
          options: ['O(log n)', 'O(n²)', 'O(n)', 'O(1)'],
          correctAnswerIndex: 0,
          explanation: 'Because each step halves the remaining candidates in a balanced tree of height log₂ n, average search runs in O(log n) time.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'BST Invariant', definition: 'The condition that for any node x, all keys in left(x) < key(x) and all keys in right(x) > key(x).' },
          { term: 'Tree Height', definition: 'The length of the longest simple path from root to a leaf node.' },
          { term: 'In-Order Traversal', definition: 'Recursive traversal pattern (Left -> Root -> Right) yielding keys in ascending sorted order.' }
        ],
        commonMistakes: [
          'Assuming a tree is a valid BST if each node is only greater than its immediate left child while violating an ancestor\'s bound.',
          'Forgetting that inserting pre-sorted data into an un-balanced BST degrades search performance to linear O(n).'
        ],
        flashcards: [
          { front: 'What traversal yields sorted elements in a BST?', back: 'In-order traversal (Left, Root, Right).' },
          { front: 'What causes worst-case O(n) search in a BST?', back: 'An unbalanced, skewed tree where each node has only one child.' }
        ],
        summaryPoints: [
          'Binary search trees partition elements into recursive left (<) and right (>) subtrees.',
          'Provides fast O(log n) retrieval in balanced conditions.',
          'Forms the algorithmic foundation for database indices and priority sets.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 5. French Revolution (Historical Spatial Timeline)
  if (normalized.includes('french revolution') || normalized.includes('bastille') || normalized.includes('louis xvi') || normalized.includes('robespierre')) {
    return {
      id: uuidv4(),
      title: 'The French Revolution (1789–1799)',
      subject: 'World History & Political Science',
      difficulty,
      language,
      learningObjectives: [
        'Understand the structural breakdown of the Ancien Régime and the Estates-General of 1789.',
        'Trace the spatial transformation of Paris: Storming of the Bastille, Declaration of the Rights of Man, and the National Assembly.',
        'Analyze the radicalization into the Reign of Terror and the eventual rise of Napoleon Bonaparte.'
      ],
      summary: 'The French Revolution was a monumental epoch of political and societal transformation in France that dismantled the absolute monarchy, abolished feudal privileges, and established modern republican ideals of liberty, equality, and fraternity.',
      sections: [
        {
          heading: '1. Crisis of the Ancien Régime & The Three Estates',
          explanation: 'By 1789, severe fiscal bankruptcy from foreign wars, coupled with disastrous harvest famines, forced King Louis XVI to convene the Estates-General. French society was rigidly divided into Three Estates: First (Clergy: 0.5%), Second (Nobility: 1.5%), and Third (Commoners: 98%), yet voting was unfairly weighted one vote per estate.',
          keyPoints: [
            'Third Estate represented 98% of the population but was outvoted 2-to-1.',
            'June 1789: The Third Estate broke away to form the National Assembly at the Tennis Court Oath.',
            'Demanded a written constitution guaranteeing popular sovereignty.'
          ],
          example: 'Commoners, peasants, and bourgeois lawyers united in rejecting feudal taxation.',
          visualizationStepIds: ['step-estates']
        },
        {
          heading: '2. Storming of the Bastille & Rights of Man (1789)',
          explanation: 'On July 14, 1789, Parisian insurgents besieged and dismantled the royal fortress-prison of the Bastille, seizing gunpowder and toppling the premier physical symbol of Bourbon monarchical tyranny. In August, the Assembly issued the Declaration of the Rights of Man and of the Citizen, proclaiming universal civil liberty and legal equality.',
          keyPoints: [
            'July 14: Fall of the Bastille transformed civil unrest into armed revolution.',
            'August 1789: Feudalism and aristocratic privileges formally abolished.',
            'Declaration codified liberty, private property, security, and resistance to oppression.'
          ],
          example: 'Citizens tearing down Bastille stone by stone as monument to liberation.',
          visualizationStepIds: ['step-bastille']
        },
        {
          heading: '3. Radicalization: Reign of Terror & Republic',
          explanation: 'Foreign invasions by European royal coalitions and internal royalist revolts triggered radical political panic. Under Maximilien Robespierre and the Committee of Public Safety (1793–1794), the revolutionary government executed thousands by guillotine during the Reign of Terror before the Thermidorian Reaction stabilized power, culminating in Napoleon Bonaparte\'s 1799 coup.',
          keyPoints: [
            'Execution of Louis XVI (January 1793) marked the end of the Bourbon monarchy.',
            'Reign of Terror instituted extreme martial measures to preserve the infant Republic.',
            'Laid the permanent ideological framework for secular modern democracies.'
          ],
          example: 'The Place de la Révolution transformed into a forum of republican ideology and civic conflict.',
          visualizationStepIds: ['step-republic']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D French Revolution Spatial Monument & Timeline',
        description: 'Interactive historical 3D spatial forum visualizing the Three Estates pyramid, the Bastille fortress plinth, the Declaration of Rights monolith, and the Revolutionary Republic altar.',
        parameters: { autoRotate: false, complexityLevel: 2 },
        steps: [
          {
            id: 'step-estates',
            title: 'Social Inequality: The Three Estates (1789)',
            explanation: 'Inspect the tiered social hierarchy where the massive Third Estate supported the exempt Clergy and Nobility.',
            highlightIds: ['estates_plinth', 'clergy_spire', 'nobility_column', 'third_estate_base'],
            cameraPreset: 'front'
          },
          {
            id: 'step-bastille',
            title: 'Fall of the Bastille (July 14, 1789)',
            explanation: 'The royal stone fortress representing royal absolutism, breached and dismantled by armed citizens.',
            highlightIds: ['bastille_fortress', 'bastille_tower_left', 'bastille_tower_right'],
            cameraPreset: 'isometric'
          },
          {
            id: 'step-republic',
            title: 'The Declaration & The Republic (1789–1799)',
            explanation: 'The central monolith symbolizing the Declaration of the Rights of Man and the triumph of popular sovereignty.',
            highlightIds: ['rights_monolith', 'liberty_torch'],
            cameraPreset: 'side'
          }
        ],
        interactiveElements: [
          { id: 'estates_plinth', label: 'Estates-General Forum', description: 'Parliamentary forum representing the breakdown of the royal feudal voting order.', color: '#475569' },
          { id: 'third_estate_base', label: 'Third Estate Base (98% People)', description: 'Bourgeoisie, urban artisans, and rural peasants carrying the nation\'s fiscal tax burden.', color: '#3b82f6' },
          { id: 'nobility_column', label: 'Second Estate (Aristocracy)', description: 'Feudal aristocracy holding land and monopolizing high military offices.', color: '#a855f7' },
          { id: 'clergy_spire', label: 'First Estate (Clergy)', description: 'Catholic ecclesiastical hierarchy collecting church tithes exempt from direct taxation.', color: '#ec4899' },
          { id: 'bastille_fortress', label: 'Bastille Fortress Gate', description: 'Fourteenth-century royal stronghold stormed by the Parisian militia on July 14, 1789.', color: '#64748b' },
          { id: 'bastille_tower_left', label: 'Western Rampart Tower', description: 'Defensive stone bastions holding royal gunpowder stores.', color: '#475569' },
          { id: 'bastille_tower_right', label: 'Eastern Rampart Tower', description: 'Symbol of monarchical arbitrary imprisonment without trial.', color: '#475569' },
          { id: 'rights_monolith', label: 'Declaration of Rights Monolith', description: 'Inscribed monument codifying universal liberty, equality, and representative law.', color: '#eab308' },
          { id: 'liberty_torch', label: 'Liberty Torch (Liberté, Égalité)', description: 'Illuminating beacon representing republican enlightenment and abolition of feudalism.', color: '#ef4444' }
        ],
        scene: {
          category: 'historical_spatial',
          topic: 'The French Revolution',
          metaphor: 'Spatial monument of the Three Estates, Bastille, and Republic',
          cameraPreset: [0, 4, 11],
          targetPreset: [0, 0, 0],
          environmentLighting: 'outdoor',
          groundPlane: { show: true, type: 'terrain', color: '#334155' },
          objects: [
            {
              id: 'estates_plinth',
              name: 'Civic Plaza Platform',
              description: 'Large stone forum anchoring the historical monuments of Paris.',
              geometry: 'box',
              position: [0, -1.5, 0],
              scale: [8.5, 0.4, 6],
              color: '#334155',
              label: 'Place de la Révolution'
            },
            {
              id: 'third_estate_base',
              name: 'Third Estate Base',
              description: 'Broad foundation slab representing the 98% common populace.',
              geometry: 'box',
              position: [-2.8, -1.0, 0],
              scale: [2.5, 0.6, 2.5],
              color: '#2563eb',
              label: 'Third Estate (98%)'
            },
            {
              id: 'nobility_column',
              name: 'Second Estate Column',
              description: 'Privileged aristocratic column supported by commoners.',
              geometry: 'cylinder',
              position: [-2.8, -0.1, -0.6],
              scale: [0.45, 1.2, 0.45],
              color: '#7c3aed',
              label: 'Nobility (1.5%)'
            },
            {
              id: 'clergy_spire',
              name: 'First Estate Spire',
              description: 'Clerical spire exempt from royal taxes.',
              geometry: 'cone',
              position: [-2.8, 1.0, 0.6],
              scale: [0.5, 1.4, 0.5],
              color: '#db2777',
              label: 'Clergy (0.5%)'
            },
            {
              id: 'bastille_fortress',
              name: 'Bastille Main Gate',
              description: 'Stone bastion stormed on July 14, 1789.',
              geometry: 'box',
              position: [2.8, -0.3, 0],
              scale: [2.4, 1.8, 1.6],
              color: '#64748b',
              label: 'The Bastille (1789)'
            },
            {
              id: 'bastille_tower_left',
              name: 'Bastille West Tower',
              description: 'Fortress tower guarding gunpowder stores.',
              geometry: 'cylinder',
              position: [1.6, 0.2, 0],
              scale: [0.65, 2.8, 0.65],
              color: '#475569',
              label: 'West Tower'
            },
            {
              id: 'bastille_tower_right',
              name: 'Bastille East Tower',
              description: 'Symbol of monarchical absolutism.',
              geometry: 'cylinder',
              position: [4.0, 0.2, 0],
              scale: [0.65, 2.8, 0.65],
              color: '#475569',
              label: 'East Tower'
            },
            {
              id: 'rights_monolith',
              name: 'Declaration of the Rights of Man',
              description: 'Erected monument of liberty, equality, and civic law.',
              geometry: 'box',
              position: [0, 0.6, 0],
              scale: [1.2, 2.8, 0.4],
              color: '#eab308',
              label: 'Rights of Man (1789)',
              animation: { type: 'pulse', speed: 1.0, amplitude: 0.05 }
            },
            {
              id: 'liberty_torch',
              name: 'Liberty Torch Beacon',
              description: 'Enlightenment beacon atop the central civic monolith.',
              geometry: 'sphere',
              position: [0, 2.3, 0],
              scale: [0.4, 0.5, 0.4],
              color: '#ef4444',
              label: 'Liberty Flame',
              animation: { type: 'float', speed: 2.0, amplitude: 0.1 }
            }
          ],
          connections: [
            { id: 'conn-revolt', fromId: 'third_estate_base', toId: 'bastille_fortress', type: 'arrow', label: 'Popular Uprising (July 14)', color: '#38bdf8', animatedFlow: true },
            { id: 'conn-rights', fromId: 'bastille_fortress', toId: 'rights_monolith', type: 'tube', label: 'Overthrow of Absolutism', color: '#eab308', animatedFlow: true }
          ]
        }
      },
      keyTakeaways: [
        'The French Revolution replaced absolute hereditary monarchy with constitutional republicanism and popular sovereignty.',
        'The storming of the Bastille on July 14, 1789 marked the turning point toward active revolution.',
        'The Declaration of the Rights of Man established fundamental human rights that inspire international law today.'
      ],
      quiz: [
        {
          question: 'What event on July 14, 1789 became the preeminent symbol of the French Revolution?',
          options: [
            'The Storming of the Bastille fortress',
            'The execution of Napoleon Bonaparte',
            'The signing of the Treaty of Versailles',
            'The coronation of King Louis XVI'
          ],
          correctAnswerIndex: 0,
          explanation: 'The seizure of the royal prison-fortress Bastille marked the common people\'s armed rebellion against royal tyranny.'
        },
        {
          question: 'Which social class comprised approximately 98% of the French population under the Ancien Régime?',
          options: [
            'The Third Estate (peasants, urban workers, and bourgeoisie)',
            'The First Estate (clergy)',
            'The Second Estate (feudal nobility)',
            'The Royal Family and Court'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Third Estate encompassed virtually all non-noble, non-clerical citizens who carried the fiscal tax burden without proportional political power.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'Ancien Régime', definition: 'The feudal political and social system established in France under the absolute Bourbon monarchs before 1789.' },
          { term: 'Estates-General', definition: 'The traditional legislative assembly representing the Three Estates (Clergy, Nobility, and Commoners).' },
          { term: 'Reign of Terror', definition: 'A period of radical revolutionary violence (1793–1794) led by Robespierre to purge internal and foreign enemies.' }
        ],
        commonMistakes: [
          'Confusing the French Revolution of 1789 with the July Revolution of 1830 or the Paris Commune of 1871.',
          'Assuming the Revolution instantly formed a stable modern democracy rather than undergoing decades of shifting regimes.'
        ],
        flashcards: [
          { front: 'What were the core revolutionary slogans?', back: 'Liberté, Égalité, Fraternité (Liberty, Equality, Fraternity).' },
          { front: 'What document proclaimed universal civil equality in August 1789?', back: 'The Declaration of the Rights of Man and of the Citizen.' }
        ],
        summaryPoints: [
          'Severe economic debt and feudal inequality precipitated the crisis of 1789.',
          'Bastille breached; feudal privileges abolished; civil liberties codified.',
          'Triggered global political shifts leading to the Napoleonic era and modern nation-states.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 6. Supply and Demand (Economic System)
  if (normalized.includes('supply and demand') || normalized.includes('market equilibrium') || normalized.includes('microeconomic')) {
    return {
      id: uuidv4(),
      title: 'Law of Supply and Demand & Market Equilibrium',
      subject: 'Economics & Market Analysis',
      difficulty,
      language,
      learningObjectives: [
        'Understand the downward-sloping Law of Demand (inverse relationship between price and quantity demanded).',
        'Analyze the upward-sloping Law of Supply (direct relationship between price and quantity supplied).',
        'Visualize how market forces naturally gravitate toward the equilibrium price and clearing quantity (P*, Q*).'
      ],
      summary: 'Supply and Demand is the fundamental microeconomic model explaining how competitive prices and output quantities are determined in a market where buyers and sellers trade goods and services.',
      sections: [
        {
          heading: '1. The Law of Demand',
          explanation: 'The Law of Demand states that, ceteris paribus (all other factors held constant), as the price of a good increases, the quantity demanded by consumers decreases. This downward-sloping relationship reflects diminishing marginal utility and consumer budget constraints.',
          keyPoints: [
            'Inverse relationship: High Price -> Lower Quantity Demanded.',
            'Substitution Effect: Consumers seek alternative substitutes when prices rise.',
            'Income Effect: Higher price reduces the real purchasing power of consumer income.'
          ],
          example: 'If apple prices double from $1 to $2, consumers substitute with oranges and purchase fewer apples.',
          visualizationStepIds: ['step-demand']
        },
        {
          heading: '2. The Law of Supply',
          explanation: 'The Law of Supply states that, ceteris paribus, as market price increases, producers are incentivized to manufacture and supply a greater quantity to maximize profitability and cover increasing marginal production costs.',
          keyPoints: [
            'Direct relationship: High Price -> Higher Quantity Supplied.',
            'Driven by increasing marginal costs of production (diminishing returns).',
            'Higher prices incentivize new firms to enter the industry.'
          ],
          example: 'A high market price for crude oil incentivizes exploration of costlier deep-sea extraction wells.',
          visualizationStepIds: ['step-supply']
        },
        {
          heading: '3. Market Equilibrium & Price Discovery',
          explanation: 'Equilibrium occurs at the intersection where Quantity Demanded equals Quantity Supplied (Qd = Qs). At equilibrium price P*, the market clears with no surplus (excess supply) and no shortage (excess demand). Price mechanisms naturally correct market imbalances through competitive bidding.',
          keyPoints: [
            'Surplus (Price > P*): Excess inventory forces sellers to discount prices downward.',
            'Shortage (Price < P*): Depleted inventory allows sellers to bid prices upward.',
            'Equilibrium maximizes total economic consumer and producer surplus.'
          ],
          example: 'Stock exchange matching buy and sell orders at an instantaneous clearing price.',
          visualizationStepIds: ['step-equilibrium']
        }
      ],
      visualization: {
        templateId: 'universal-3d',
        title: '3D Supply and Demand Equilibrium Model',
        description: 'Interactive spatial coordinate model showing intersecting Supply and Demand curves, Market Equilibrium node (P*, Q*), and price axis planes.',
        parameters: { autoRotate: false, complexityLevel: 2 },
        steps: [
          {
            id: 'step-demand',
            title: 'Downward-Sloping Demand Curve',
            explanation: 'Inspect the downward-sloping Demand vector (red): as Price rises on the vertical axis, Quantity contracts along the horizontal axis.',
            highlightIds: ['demand_curve', 'price_axis', 'quantity_axis'],
            cameraPreset: 'front'
          },
          {
            id: 'step-supply',
            title: 'Upward-Sloping Supply Curve',
            explanation: 'Observe the upward-sloping Supply vector (green): as Price rises, suppliers expand production output.',
            highlightIds: ['supply_curve', 'price_axis', 'quantity_axis'],
            cameraPreset: 'side'
          },
          {
            id: 'step-equilibrium',
            title: 'Market Equilibrium Point (P*, Q*)',
            explanation: 'The intersection point where supply matches demand, clearing the market with zero shortage or surplus.',
            highlightIds: ['equilibrium_point', 'surplus_zone', 'shortage_zone'],
            cameraPreset: 'isometric'
          }
        ],
        interactiveElements: [
          { id: 'price_axis', label: 'Price Axis (P)', description: 'Vertical spatial coordinate representing the monetary price of the commodity.', color: '#94a3b8' },
          { id: 'quantity_axis', label: 'Quantity Axis (Q)', description: 'Horizontal spatial coordinate representing total volume of units transacted.', color: '#94a3b8' },
          { id: 'demand_curve', label: 'Demand Curve (D)', description: 'Downward-sloping schedule demonstrating consumer price elasticity and willingness to pay.', color: '#ef4444' },
          { id: 'supply_curve', label: 'Supply Curve (S)', description: 'Upward-sloping schedule reflecting marginal production cost curves.', color: '#10b981' },
          { id: 'equilibrium_point', label: 'Market Equilibrium (P*, Q*)', description: 'Optimal market clearing state where Quantity Demanded equals Quantity Supplied.', color: '#f59e0b' },
          { id: 'surplus_zone', label: 'Surplus Zone (P > P*)', description: 'Region of excess supply driving downward deflationary pressure on market price.', color: '#38bdf8' },
          { id: 'shortage_zone', label: 'Shortage Zone (P < P*)', description: 'Region of excess demand driving upward inflationary pressure on market price.', color: '#f97316' }
        ],
        scene: {
          category: 'economic_system',
          topic: 'Supply and Demand Equilibrium',
          metaphor: 'Coordinate price-discovery equilibrium intersection',
          cameraPreset: [0, 1.5, 9],
          targetPreset: [0, 0, 0],
          environmentLighting: 'studio',
          groundPlane: { show: true, type: 'grid', color: '#0f172a' },
          objects: [
            {
              id: 'price_axis',
              name: 'Price Axis (Vertical)',
              description: 'Cartesian Y axis measuring price per unit.',
              geometry: 'arrow',
              position: [-3.2, 0, 0],
              rotation: [0, 0, 0],
              scale: [0.35, 4.2, 0.35],
              color: '#94a3b8',
              label: 'Price (P)'
            },
            {
              id: 'quantity_axis',
              name: 'Quantity Axis (Horizontal)',
              description: 'Cartesian X axis measuring output volume.',
              geometry: 'arrow',
              position: [0, -2.1, 0],
              rotation: [0, 0, -Math.PI / 2],
              scale: [0.35, 6.2, 0.35],
              color: '#94a3b8',
              label: 'Quantity (Q)'
            },
            {
              id: 'demand_curve',
              name: 'Demand Curve (D)',
              description: 'Downward sloping curve: high price -> low quantity.',
              geometry: 'cylinder',
              position: [0, 0, 0],
              rotation: [0, 0, 0.65],
              scale: [0.16, 5.4, 0.16],
              color: '#ef4444',
              label: 'Demand Curve (D)',
              animation: { type: 'pulse', speed: 1.2, amplitude: 0.06 }
            },
            {
              id: 'supply_curve',
              name: 'Supply Curve (S)',
              description: 'Upward sloping curve: high price -> high quantity.',
              geometry: 'cylinder',
              position: [0, 0, 0],
              rotation: [0, 0, -0.65],
              scale: [0.16, 5.4, 0.16],
              color: '#10b981',
              label: 'Supply Curve (S)',
              animation: { type: 'pulse', speed: 1.2, amplitude: 0.06 }
            },
            {
              id: 'equilibrium_point',
              name: 'Equilibrium Point (P*, Q*)',
              description: 'Optimal clearing intersection where Qd = Qs.',
              geometry: 'sphere',
              position: [0, 0, 0],
              scale: [0.65, 0.65, 0.65],
              color: '#f59e0b',
              label: 'Equilibrium (P*, Q*)',
              animation: { type: 'pulse', speed: 2.0, amplitude: 0.15 }
            },
            {
              id: 'surplus_zone',
              name: 'Surplus Zone',
              description: 'Excess supply above equilibrium causing downward price correction.',
              geometry: 'cone',
              position: [0, 1.3, 0],
              scale: [1.4, 1.2, 0.4],
              color: '#38bdf8',
              opacity: 0.45,
              label: 'Surplus (P > P*)'
            },
            {
              id: 'shortage_zone',
              name: 'Shortage Zone',
              description: 'Excess demand below equilibrium causing upward price pressure.',
              geometry: 'cone',
              position: [0, -1.3, 0],
              rotation: [0, 0, Math.PI],
              scale: [1.4, 1.2, 0.4],
              color: '#f97316',
              opacity: 0.45,
              label: 'Shortage (P < P*)'
            }
          ],
          connections: [
            { id: 'conn-demand-eq', fromId: 'demand_curve', toId: 'equilibrium_point', type: 'arrow', label: 'Qd = Qs', color: '#ef4444', animatedFlow: true },
            { id: 'conn-supply-eq', fromId: 'supply_curve', toId: 'equilibrium_point', type: 'arrow', label: 'Market Clears', color: '#10b981', animatedFlow: true }
          ]
        }
      },
      keyTakeaways: [
        'Demand slopes downward due to the inverse relationship between price and quantity demanded.',
        'Supply slopes upward as higher market prices incentivize higher production output.',
        'Market equilibrium is the self-stabilizing point where supply balances demand.'
      ],
      quiz: [
        {
          question: 'What occurs in a free competitive market when the current price is set above the equilibrium price?',
          options: [
            'A market surplus develops, driving prices downward toward equilibrium',
            'A shortage develops, forcing consumers to ration goods',
            'Demand shifts rightward immediately',
            'Supply drops to zero instantly'
          ],
          correctAnswerIndex: 0,
          explanation: 'When price exceeds equilibrium, quantity supplied exceeds quantity demanded, causing unsold excess inventory (surplus) that forces sellers to cut prices.'
        },
        {
          question: 'Why does the demand curve typically slope downward to the right?',
          options: [
            'As price falls, consumers are willing and able to purchase more units (Law of Demand)',
            'Producers charge more to manufacture fewer units',
            'Taxes increase as output decreases',
            'Supply always equals zero at zero price'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Law of Demand states that lower prices increase consumer quantity demanded through both substitution and income effects.'
        }
      ],
      revision: {
        keyDefinitions: [
          { term: 'Equilibrium Price (P*)', definition: 'The unique price where quantity demanded by consumers matches quantity supplied by producers.' },
          { term: 'Ceteris Paribus', definition: 'Latin phrase meaning "all other things being held equal or constant".' },
          { term: 'Surplus', definition: 'A condition where quantity supplied exceeds quantity demanded at the prevailing market price.' }
        ],
        commonMistakes: [
          'Confusing a "change in demand" (shift of the entire curve) with a "change in quantity demanded" (movement along the curve).',
          'Assuming equilibrium is a permanent static state rather than an active balance responding to supply/demand shocks.'
        ],
        flashcards: [
          { front: 'What happens at market equilibrium?', back: 'Quantity Demanded equals Quantity Supplied (Qd = Qs); the market clears.' },
          { front: 'What causes a movement along a demand curve?', back: 'A change in the price of the good itself.' }
        ],
        summaryPoints: [
          'Demand schedule reflects consumer utility and price sensitivity.',
          'Supply schedule reflects producer cost structure and capacity.',
          'Equilibrium discovery coordinates decentralized resource allocation across the economy.'
        ]
      },
      sourceType,
      sourceFilename: sourceType === 'notes' ? topic : undefined,
      extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // 7. Universal Topic Dynamic 3D Lesson Generator
  // Constructs an intelligent, topic-specific 3D scene and educational curriculum for ANY topic
  const topicTerms = cleanTitle.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const primaryEntity = topicTerms[0] ? topicTerms[0].charAt(0).toUpperCase() + topicTerms[0].slice(1).toLowerCase() : 'Core';
  const secondaryEntity = topicTerms[1] ? topicTerms[1].charAt(0).toUpperCase() + topicTerms[1].slice(1).toLowerCase() : 'Structure';

  return {
    id: uuidv4(),
    title: `Understanding ${cleanTitle}`,
    subject,
    difficulty,
    language,
    learningObjectives: [
      `Analyze the foundational principles and structural organization of ${cleanTitle}.`,
      `Identify the essential components, forces, or variables that govern ${cleanTitle}.`,
      `Understand how energy, data, or state changes propagate across ${cleanTitle}.`,
      `Verify conceptual comprehension using the interactive 3D spatial model and revision quizzes.`
    ],
    summary: notesSnippet 
      ? `This structured lesson is derived directly from your study material on "${cleanTitle}", highlighting core mechanisms, spatial relationships, and key revision points.`
      : `${cleanTitle} is a critical topic in ${subject}. This lesson breaks down its structural components, operational dynamics, and practical significance through an interactive 3D visual model.`,
    sections: [
      {
        heading: `1. Foundations and Core Architecture of ${cleanTitle}`,
        explanation: notesSnippet 
          ? `Based on your notes: ${notesSnippet.slice(0, 300)}...`
          : `${cleanTitle} operates on fundamental principles within ${subject}. Its functional behavior is governed by the structural arrangement of its core components and their mutual equilibrium.`,
        keyPoints: [
          `Primary scope, physical or conceptual boundaries, and definitions within ${subject}.`,
          `Essential governing laws, mathematical relations, or operational constraints.`,
          `Role of the central coordinating element (${primaryEntity}) in maintaining stability.`
        ],
        example: `Analyzing ${cleanTitle} by observing how ${primaryEntity} coordinates the surrounding elements.`,
        visualizationStepIds: ['step-intro']
      },
      {
        heading: '2. Dynamic Interaction and Process Flow',
        explanation: `When active, ${cleanTitle} undergoes coordinated state changes where inputs are processed and transmitted through intermediary channels to generate stable outputs.`,
        keyPoints: [
          'Sequential execution of operational stages or thermodynamic/logical phases.',
          'Feedback loops and conserved physical, spatial, or informational quantities.',
          'Response to external perturbations or boundary condition shifts.'
        ],
        example: `Traces of energy, force, or data moving continuously between ${primaryEntity} and supporting structures.`,
        visualizationStepIds: ['step-mechanism']
      },
      {
        heading: '3. Real-World Applications and System Analysis',
        explanation: `Mastery of ${cleanTitle} provides critical diagnostic, analytical, and design capabilities across academic and professional applications in ${subject}.`,
        keyPoints: [
          'Modern practical implementations and engineering or scientific significance.',
          'Standard diagnostic methods for detecting failure modes or edge cases.',
          'Technological, environmental, or theoretical advancements stemming from this concept.'
        ],
        example: `Real-world systems relying directly on the stability and optimization of ${cleanTitle}.`,
        visualizationStepIds: ['step-advanced']
      }
    ],
    visualization: {
      templateId: 'universal-3d',
      title: `${cleanTitle} 3D Visualizer`,
      description: `Topic-specific 3D spatial model illustrating the core components, functional geometry, and interactive dynamics of ${cleanTitle}.`,
      parameters: {
        autoRotate: true,
        complexityLevel: difficulty === 'advanced' ? 3 : difficulty === 'intermediate' ? 2 : 1
      },
      steps: [
        {
          id: 'step-intro',
          title: `Spatial Composition of ${cleanTitle}`,
          explanation: `Inspect the central ${primaryEntity} and primary structural anchors of ${cleanTitle}.`,
          highlightIds: ['obj-core', 'obj-structural-base'],
          cameraPreset: 'front'
        },
        {
          id: 'step-mechanism',
          title: 'Interaction & Dynamic Flow',
          explanation: `Observe the dynamic transfer channels connecting the core unit to supporting components.`,
          highlightIds: ['obj-channel', 'obj-dynamic-node'],
          cameraPreset: 'isometric'
        },
        {
          id: 'step-advanced',
          title: 'System Equilibrium & Boundary',
          explanation: `Rotate and zoom to analyze the complete system boundary and surrounding environmental interface.`,
          highlightIds: ['obj-boundary', 'obj-core'],
          cameraPreset: 'top'
        }
      ],
      interactiveElements: [
        { id: 'obj-core', label: `${primaryEntity} Core Unit`, description: `The primary hub and coordinating focus of ${cleanTitle}.`, color: '#06b6d4' },
        { id: 'obj-structural-base', label: `${secondaryEntity} Support Base`, description: `The foundational structural platform stabilizing the system.`, color: '#6366f1' },
        { id: 'obj-dynamic-node', label: `Active Functional Node`, description: `Specialized component executing operational transformations in ${cleanTitle}.`, color: '#10b981' },
        { id: 'obj-channel', label: 'Conduction Channel', description: 'Directional pathway facilitating energetic, informational, or fluid flux.', color: '#f59e0b' },
        { id: 'obj-boundary', label: 'Equilibrium Field Boundary', description: 'Surrounding interface defining the spatial limits and interaction threshold.', color: '#ec4899' }
      ],
      scene: {
        category: 'conceptual_system',
        topic: cleanTitle,
        metaphor: `Dynamic coordinated 3D system of ${cleanTitle}`,
        cameraPreset: [0, 2, 8],
        targetPreset: [0, 0, 0],
        environmentLighting: 'studio',
        groundPlane: { show: true, type: 'grid', color: '#0f172a' },
        objects: [
          {
            id: 'obj-core',
            name: `${primaryEntity} Core Hub`,
            description: `Central hub governing the properties and operation of ${cleanTitle}.`,
            geometry: 'sphere',
            position: [0, 0.4, 0],
            scale: [1.2, 1.2, 1.2],
            color: '#06b6d4',
            label: `${primaryEntity} Core`,
            animation: { type: 'pulse', speed: 1.5, amplitude: 0.1 }
          },
          {
            id: 'obj-structural-base',
            name: `${secondaryEntity} Foundation Platform`,
            description: `Structural base anchoring ${cleanTitle} in Euclidean 3D space.`,
            geometry: 'cylinder',
            position: [0, -1.8, 0],
            scale: [2.6, 0.4, 2.6],
            color: '#4f46e5',
            label: `${secondaryEntity} Base`
          },
          {
            id: 'obj-dynamic-node',
            name: `Active Processing Node`,
            description: `Intermediary unit executing dynamic state changes.`,
            geometry: 'box',
            position: [2.2, 0.5, 0],
            rotation: [0, Math.PI / 4, 0],
            scale: [0.8, 0.8, 0.8],
            color: '#10b981',
            label: 'Active Node',
            animation: { type: 'float', speed: 1.8, amplitude: 0.15 }
          },
          {
            id: 'obj-channel',
            name: `Flux Transmission Channel`,
            description: `Directional conduit linking core processes to output endpoints.`,
            geometry: 'capsule',
            position: [-2.0, 0.5, 0],
            rotation: [0, 0, Math.PI / 6],
            scale: [0.35, 1.4, 0.35],
            color: '#f59e0b',
            label: 'Flux Conduit',
            animation: { type: 'oscillate', speed: 2.2, axis: 'y', amplitude: 0.18 }
          },
          {
            id: 'obj-boundary',
            name: `Equilibrium Field Ring`,
            description: `Orbital boundary demonstrating the field of influence of ${cleanTitle}.`,
            geometry: 'torus',
            position: [0, 0.4, 0],
            rotation: [Math.PI / 3, 0, 0],
            scale: [2.2, 2.2, 0.15],
            color: '#ec4899',
            label: 'Boundary Field',
            animation: { type: 'rotate', speed: 1.0, axis: 'z' }
          }
        ],
        connections: [
          { id: 'conn-core-node', fromId: 'obj-core', toId: 'obj-dynamic-node', type: 'tube', label: 'Active Link', color: '#10b981', animatedFlow: true },
          { id: 'conn-channel-core', fromId: 'obj-channel', toId: 'obj-core', type: 'arrow', label: 'Input Flow', color: '#f59e0b', animatedFlow: true },
          { id: 'conn-base-core', fromId: 'obj-structural-base', toId: 'obj-core', type: 'dashed_line', label: 'Structural Support', color: '#6366f1', animatedFlow: false }
        ]
      }
    },
    keyTakeaways: [
      `${cleanTitle} adheres to orderly, predictable principles governing structure and dynamics.`,
      `Visualizing components in 3D space builds intuitive spatial intuition and enhances conceptual retention.`,
      `Review key terminology and test understanding with the interactive revision quiz.`
    ],
    quiz: [
      {
        question: `What is the most critical foundational principle when analyzing ${cleanTitle}?`,
        options: [
          `Understanding how ${primaryEntity} coordinates functional interactions across the system`,
          'Memorizing names without considering structural mechanisms',
          'Assuming systems remain static regardless of environmental inputs',
          'Ignoring boundary conditions and physical conservation laws'
        ],
        correctAnswerIndex: 0,
        explanation: `Systemic mastery in ${subject} requires understanding how core coordinating components (${primaryEntity}) interact with surrounding mechanisms.`
      },
      {
        question: `Which methodology is most effective when troubleshooting or designing models of ${cleanTitle}?`,
        options: [
          'Tracing inputs, state transitions, and boundary constraints through sequential stages',
          'Relying on arbitrary guesses without measuring key variables',
          'Treating each component as isolated from its neighbors',
          'Ignoring fundamental conservation and equilibrium laws'
        ],
        correctAnswerIndex: 0,
        explanation: 'Systematic analysis involves establishing boundaries, identifying active channels, and evaluating state changes.'
      }
    ],
    revision: {
      keyDefinitions: [
        { term: cleanTitle, definition: `The primary system, process, or mathematical structure analyzed within ${subject}.` },
        { term: `${primaryEntity} Core`, definition: `The central coordinating node responsible for primary operational stability in ${cleanTitle}.` },
        { term: 'Equilibrium', definition: 'A stable state in which opposing forces, fluxes, or reactions balance one another.' }
      ],
      commonMistakes: [
        'Confusing cause and effect when observing dynamic changes in the system.',
        'Neglecting the boundary conditions and assumptions governing model validity.'
      ],
      flashcards: [
        { front: `What is the primary function of ${cleanTitle}?`, back: `To enable coordinated transformation, transfer, or structural harmony within ${subject}.` },
        { front: 'Why visualize this system in 3D?', back: 'Interactive 3D manipulation builds spatial mental models that dramatically improve comprehension and memory recall.' }
      ],
      summaryPoints: [
        `Grasp the fundamental definition and scope of ${cleanTitle}.`,
        `Trace the operational flow from input channels to core coordination.`,
        'Verify your knowledge through the interactive quiz questions.'
      ]
    },
    sourceType,
    sourceFilename: sourceType === 'notes' ? topic : undefined,
    extractedSnippet: notesSnippet ? notesSnippet.slice(0, 300) : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
