export const workshops = [
  {
    id: 1,
    slug: 'quantum-technologies',
    title: 'Quantum Technologies Workshop',
    tagline: 'Diving into the transformative world of Quantum Technologies',
    description:
      'An exclusive multi-track workshop exploring the frontiers of quantum computing, quantum metrology, and quantum algorithms. Led by world-class researchers from UC Berkeley and INRIM Italy, this workshop offers deep technical sessions for researchers and practitioners.',
    registrationLink: 'https://forms.gle/agvfFDFgodnG2s8u7',
    sessions: [
      {
        id: 1,
        title: 'Quantum Computing',
        instructor: {
          name: 'Prof. Dr. Irfan Siddiqi',
          title: 'Professor',
          institution: 'Department of Physics, UC Berkeley',
          country: 'USA',
          photo: '/speakers/irfan-siddiqi.jpg',
        },
        topics: [
          'Gates and noise mitigation',
          'CNOT and Toffoli operations',
          'Cross-resonance driving',
          'Parametric gates',
          'Floquet qubits',
          'Randomized benchmarking',
          'Gate set tomography',
          'Coherent and stochastic errors',
          'Randomized compiling',
        ],
      },
      {
        id: 2,
        title: 'Quantum Metrology, Sensing & Imaging',
        instructor: {
          name: 'Prof. Dr. Marco Genovese',
          title: 'Research Director, Quantum Optics Sector',
          institution: 'INRIM (National Institute of Metrological Research)',
          country: 'Italy',
          photo: '/speakers/marco-genovese.jpg',
        },
        topics: [
          'Beating the Heisenberg limit',
          'Shot noise experiments',
          'Diffuse quantum metrology on quantum internet',
          'Color centers in diamonds',
          'Rydberg atom sensors',
          'Quantum optical sensing and imaging',
        ],
      },
      {
        id: 3,
        title: 'Quantum Algorithms',
        instructor: {
          name: 'Dr. Jibran Rashid',
          title: 'Assistant Professor',
          institution: 'Institute of Business Administration (IBA)',
          country: 'Pakistan',
          photo: '/speakers/jibran-rashid.jpg',
        },
        topics: [
          'Introduction to quantum algorithms',
          'Quantum interactive proofs',
          'Identifying sources of quantum advantage',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'nlp-contrastive-learning',
    title: 'Implementing Contrastive Learning for Word Embedding in NLP',
    tagline: 'Robust, context-aware word representations for modern NLP',
    description:
      'This tutorial introduces participants to contrastive learning for creating robust word embeddings. It contrasts traditional static approaches (Word2Vec, GloVe) with dynamic, context-aware representations, demonstrating practical integration methods and real-world uses in information retrieval, semantic search, and text classification.',
    registrationLink: 'https://forms.gle/GP2xWDdHjaM6XSDQ8',
    targetAudience:
      'Students, faculty, researchers, and practitioners in NLP and ML familiar with word embeddings and basic deep learning. Intermediate Python skills and foundational knowledge of representation learning required.',
    sessions: [
      {
        id: 1,
        title: 'Contrastive Learning for NLP',
        instructor: {
          name: 'Prof. Dr. Muhammad Rafi',
          title: 'Professor & Department Head (AI & DS)',
          institution: 'FAST National University, Karachi',
          country: 'Pakistan',
          photo: '/speakers/muhammad-rafi.jpg',
        },
        topics: [
          'Contrastive learning fundamentals in word embedding contexts',
          'Implementing contrastive word embedding models',
          'Evaluation of contrastive embeddings',
          'Information retrieval applications',
          'Semantic search and text classification',
          'Advanced topics for future NLP research',
        ],
      },
    ],
    learningOutcomes: [
      'Grasp contrastive learning fundamentals in word embedding contexts',
      'Implement and evaluate contrastive word embedding models',
      'Explore advanced contrastive learning topics for future NLP research',
      'Receive handouts and code samples',
    ],
  },
];
