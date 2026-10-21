/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  StudentProfile,
  AdminProfile,
  StudentRosterItem,
  Assignment,
  AttendanceRecord,
  TimetableSlot,
  ExamResult,
  Announcement,
  StudentClassResult
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'CSE-2024-042',
  name: 'Parth Gadhiya',
  email: 'gadhiyaparth07@gmail.com',
  rollNo: '24CSAIML042',
  program: 'B.Tech Computer Science & Engineering (AI & ML)',
  department: 'Department of Computer Engineering',
  semester: 3,
  division: 'Division A',
  batch: 'Batch A2',
  academicYear: '2026 - 2027',
  mentor: 'Dr. Sunita Deshmukh (Assoc. Professor)',
  avatarUrl: '/src/assets/images/student_avatar_profile_1792496874418.jpg',
  admissionStatus: 'Active Regular',
};

export const INITIAL_ADMIN_PROFILE: AdminProfile = {
  id: 'ADM-2024-001',
  name: 'Dr. Sunita Deshmukh',
  email: 'sunita.deshmukh@college.edu',
  role: 'admin',
  title: 'Head of Department & Assoc. Professor',
  department: 'Department of Computer Engineering (AI & ML)',
  employeeId: 'EMP-CSE-108',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
};

export const INITIAL_STUDENT_ROSTER: StudentRosterItem[] = [
  {
    id: 's-01',
    name: 'Parth Gadhiya',
    rollNo: '24CSAIML042',
    email: 'gadhiyaparth07@gmail.com',
    division: 'Division A',
    batch: 'Batch A2',
    attendancePct: 91.8,
    submittedAssignments: 3,
    totalAssignments: 7,
    sgpa: 9.33,
    status: 'In Good Standing',
  },
  {
    id: 's-02',
    name: 'Priya Sharma',
    rollNo: '24CSAIML008',
    email: 'priya.sharma@student.college.edu',
    division: 'Division A',
    batch: 'Batch A1',
    attendancePct: 95.4,
    submittedAssignments: 4,
    totalAssignments: 7,
    sgpa: 9.65,
    status: 'In Good Standing',
  },
  {
    id: 's-03',
    name: 'Rohan Mehta',
    rollNo: '24CSAIML019',
    email: 'rohan.mehta@student.college.edu',
    division: 'Division A',
    batch: 'Batch A1',
    attendancePct: 88.2,
    submittedAssignments: 3,
    totalAssignments: 7,
    sgpa: 8.90,
    status: 'In Good Standing',
  },
  {
    id: 's-04',
    name: 'Ananya Gupta',
    rollNo: '24CSAIML027',
    email: 'ananya.gupta@student.college.edu',
    division: 'Division A',
    batch: 'Batch A2',
    attendancePct: 93.0,
    submittedAssignments: 4,
    totalAssignments: 7,
    sgpa: 9.45,
    status: 'In Good Standing',
  },
  {
    id: 's-05',
    name: 'Devansh Kulkarni',
    rollNo: '24CSAIML033',
    email: 'devansh.k@student.college.edu',
    division: 'Division A',
    batch: 'Batch A2',
    attendancePct: 71.4,
    submittedAssignments: 2,
    totalAssignments: 7,
    sgpa: 7.40,
    status: 'Attendance Warning',
  },
  {
    id: 's-06',
    name: 'Sanya Mirza',
    rollNo: '24CSAIML045',
    email: 'sanya.m@student.college.edu',
    division: 'Division A',
    batch: 'Batch A3',
    attendancePct: 84.5,
    submittedAssignments: 3,
    totalAssignments: 7,
    sgpa: 8.75,
    status: 'In Good Standing',
  },
  {
    id: 's-07',
    name: 'Kabir Verma',
    rollNo: '24CSAIML052',
    email: 'kabir.v@student.college.edu',
    division: 'Division A',
    batch: 'Batch A3',
    attendancePct: 69.8,
    submittedAssignments: 1,
    totalAssignments: 7,
    sgpa: 6.85,
    status: 'Attendance Warning',
  },
  {
    id: 's-08',
    name: 'Neha Rathi',
    rollNo: '24CSAIML060',
    email: 'neha.r@student.college.edu',
    division: 'Division A',
    batch: 'Batch A3',
    attendancePct: 90.1,
    submittedAssignments: 4,
    totalAssignments: 7,
    sgpa: 9.15,
    status: 'In Good Standing',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Supervised Regression Pipeline with Scikit-Learn',
    subject: 'Machine Learning Foundations',
    code: 'CS301',
    description: 'Implement end-to-end polynomial and regularized Ridge regression on the California housing dataset with cross-validation and hyperparameter search.',
    assignedDate: '2026-10-12',
    dueDate: '2026-10-24',
    status: 'pending',
    maxMarks: 25,
    submissionType: 'Jupyter Notebook',
    faculty: 'Prof. Ramesh Kulkarni',
    learningObjectives: [
      'Data imputation and StandardScaler pipeline transformation',
      'K-Fold Cross-Validation implementation',
      'RMSE and R-squared metric benchmarking'
    ],
    rubric: {
      assignmentId: 'asg-01',
      assignmentTitle: 'Supervised Regression Pipeline with Scikit-Learn',
      courseCode: 'CS301',
      totalMarks: 25,
      generalNotes: 'Submissions must include documented random state seeds. Missing execution outputs will attract a 10% penalty.',
      criteria: [
        {
          id: 'c1',
          name: 'Data Ingestion & Leak-Free Pipeline',
          description: 'Constructs a modular scikit-learn Pipeline with ColumnTransformer, StandardScaler, and MedianImputer avoiding data leakage.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Flawless Pipeline integration; proper fit_transform on train split only; clean feature handling.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Functional pipeline with minor manual data conversions prior to pipeline entry.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Partial pipeline with risk of test data leakage during transformation steps.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'No pipeline architecture used; manual transformations with evident data leakage.' }
          ]
        },
        {
          id: 'c2',
          name: 'Regularization & Hyperparameter Search',
          description: 'Systematic Ridge/Lasso alpha tuning via GridSearchCV or RandomizedSearchCV with 5-fold cross-validation.',
          maxMarks: 7,
          levels: [
            { level: 'Exemplary', scoreRange: '7 Marks', description: 'Exhaustive grid parameter tuning over log-scale alphas; clear cross-validation variance curves.' },
            { level: 'Proficient', scoreRange: '5.5 - 6 Marks', description: 'Correct GridSearchCV setup with standard cross-validation; minor parameter range limitation.' },
            { level: 'Developing', scoreRange: '3.5 - 5 Marks', description: 'Basic manual hyperparameter trial with no automated CV search harness.' },
            { level: 'Beginning', scoreRange: '0 - 3 Marks', description: 'Default model parameters used without cross-validation or regularization analysis.' }
          ]
        },
        {
          id: 'c3',
          name: 'Metrics, Residuals & Error Analysis',
          description: 'Rigorous benchmarking using RMSE, MAE, R² score, and visual residual distribution and parity plots.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'All three metrics reported for train and test splits; labeled residual scatter plot and error histogram.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'RMSE and R² computed accurately with one clear visualization plot.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Metrics computed on test set but lacking visual error diagnosis or residual charts.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Only one raw metric without proper mathematical interpretation.' }
          ]
        },
        {
          id: 'c4',
          name: 'Code Quality, Docstrings & Narrative',
          description: 'Adherence to PEP-8, self-explanatory markdown commentary, structured narrative, and reproducibility.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Publication-grade notebook structure, type hints, docstrings, and insightful domain observations.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Well-organized notebook with clear section headings and clean code conventions.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Adequate code execution with sparse commentary and unformatted cell outputs.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Chaotic cell execution order, missing comments, and syntax/formatting flaws.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-02',
    title: 'Balanced Binary Search Trees (AVL & Red-Black)',
    subject: 'Data Structures & Algorithms',
    code: 'CS302',
    description: 'Implement AVL self-balancing rotations and benchmark search latency against standard unbalanced BST across 100,000 synthetic numeric keys.',
    assignedDate: '2026-10-14',
    dueDate: '2026-10-27',
    status: 'pending',
    maxMarks: 30,
    submissionType: 'GitHub Repository',
    faculty: 'Dr. Sunita Deshmukh',
    learningObjectives: [
      'Tree re-balancing with Left and Right rotation algorithms',
      'Height calculation and balance factor invariants',
      'Empirical O(log n) verification'
    ],
    rubric: {
      assignmentId: 'asg-02',
      assignmentTitle: 'Balanced Binary Search Trees (AVL & Red-Black)',
      courseCode: 'CS302',
      totalMarks: 30,
      generalNotes: 'Source code must pass all automated test suites and leak check verification (Valgrind or AddressSanitizer).',
      criteria: [
        {
          id: 'c1',
          name: 'AVL Rotation & Invariant Preservation',
          description: 'Correct implementation of Single (LL, RR) and Double (LR, RL) rotations maintaining height balance factors {-1, 0, 1}.',
          maxMarks: 10,
          levels: [
            { level: 'Exemplary', scoreRange: '9 - 10 Marks', description: 'All four rotation cases verified with recursive balance factor recalculations and zero edge-case crashes.' },
            { level: 'Proficient', scoreRange: '7 - 8.5 Marks', description: 'Correct rotation logic with minor edge issues on root deletion rebalancing.' },
            { level: 'Developing', scoreRange: '5 - 6.5 Marks', description: 'Only single rotations functioning properly; double rotation errors observed.' },
            { level: 'Beginning', scoreRange: '0 - 4.5 Marks', description: 'Incomplete tree rotation or corrupted tree pointers during insertion.' }
          ]
        },
        {
          id: 'c2',
          name: 'Empirical Benchmark & Complexity Verification',
          description: 'Benchmarking 100,000 insertion and lookup operations comparing skewed BST vs AVL tree latency.',
          maxMarks: 8,
          levels: [
            { level: 'Exemplary', scoreRange: '8 Marks', description: 'Statistically sound microbenchmarks with nanosecond timing, logarithmic curve fitting, and comparative charts.' },
            { level: 'Proficient', scoreRange: '6 - 7 Marks', description: 'Benchmark executes on 100k items with tabular output proving O(log n) performance.' },
            { level: 'Developing', scoreRange: '4 - 5.5 Marks', description: 'Basic wall-clock timing on limited sample sizes without latency plots.' },
            { level: 'Beginning', scoreRange: '0 - 3.5 Marks', description: 'Benchmark failed to run or showed inaccurate theoretical comparisons.' }
          ]
        },
        {
          id: 'c3',
          name: 'Memory Management & Edge Conditions',
          description: 'Zero memory leaks, proper recursive destructor/clean up, handling duplicate keys and empty tree queries.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Clean Valgrind report with 0 bytes leaked; exhaustive testing of duplicates and boundary conditions.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Proper memory deallocation with minor unhandled duplicate key edge warning.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Memory leaks detected during large scale node deletion.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Segmentation faults on empty tree operations or unfreed node buffers.' }
          ]
        },
        {
          id: 'c4',
          name: 'Repository Quality & Automated CI Tests',
          description: 'Git commit history, structured README with compilation instructions, and unit test coverage.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Granular semantic commit messages, automated Makefile/CMake, and unit tests with >90% coverage.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Clean repo with build script, instructions, and standard unit tests.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Single monolithic commit with minimal documentation on how to build.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Missing README or broken build commands.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-03',
    title: 'A* Heuristic Search for Grid Pathfinding',
    subject: 'Artificial Intelligence Lab',
    code: 'CS307',
    description: 'Develop Manhattan and Euclidean distance heuristics in Python to guide agents through obstacle-filled 50x50 grids with path trace visualizer.',
    assignedDate: '2026-10-10',
    dueDate: '2026-10-23',
    status: 'pending',
    maxMarks: 20,
    submissionType: 'Jupyter Notebook',
    faculty: 'Prof. Ananya Roy',
    learningObjectives: [
      'Admissible and consistent heuristic function formulation',
      'Priority queue state exploration with frontier management',
      'Visual path traversal plotting'
    ],
    rubric: {
      assignmentId: 'asg-03',
      assignmentTitle: 'A* Heuristic Search for Grid Pathfinding',
      courseCode: 'CS307',
      totalMarks: 20,
      generalNotes: 'Compare node expansions between Manhattan, Euclidean, and Zero heuristic (Dijkstra baseline).',
      criteria: [
        {
          id: 'c1',
          name: 'Heuristic Admissibility & Consistency',
          description: 'Mathematical proof and implementation of Manhattan, Diagonal, and Euclidean distance formulas ensuring h(n) <= c(n, a, n\') + h(n\').',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Formal proof of admissibility provided; all distance heuristics correctly implemented with tie-breaking.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Accurate heuristic functions with solid empirical performance on grid queries.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Heuristic occasionally overestimates cost in diagonal movement scenarios.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Inadmissible heuristic yielding suboptimal path lengths.' }
          ]
        },
        {
          id: 'c2',
          name: 'Frontier & Priority Queue Optimization',
          description: 'Optimal open list management using heapq, duplicate state handling, and closed set lookups.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'O(log N) heapq frontier with constant time closed set hashing and optimal node expansion count.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Functional priority queue with standard dictionary closed set implementation.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Inefficient list sorting causing noticeable lag on 50x50 mazes.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Algorithm enters infinite loop or misses goal state when obstacles are dense.' }
          ]
        },
        {
          id: 'c3',
          name: 'Interactive Visual Path Tracer',
          description: 'Visual display showing explored nodes, open set frontier, final shortest path, and obstacle walls.',
          maxMarks: 4,
          levels: [
            { level: 'Exemplary', scoreRange: '4 Marks', description: 'Clean color-coded matplotlib/curses animation highlighting explored frontier vs finalized path.' },
            { level: 'Proficient', scoreRange: '3 Marks', description: 'Static graphic of the grid showing start, goal, obstacles, and path trace.' },
            { level: 'Developing', scoreRange: '2 Marks', description: 'Text-based coordinate printout of coordinates with no visual grid.' },
            { level: 'Beginning', scoreRange: '0 - 1 Marks', description: 'Missing path output visualization.' }
          ]
        },
        {
          id: 'c4',
          name: 'Empirical Efficiency Comparison',
          description: 'Tabulation of nodes explored, path length, and execution time across 10 randomized grid maps.',
          maxMarks: 4,
          levels: [
            { level: 'Exemplary', scoreRange: '4 Marks', description: 'Comprehensive comparative table and bar chart contrasting BFS, Dijkstra, and A* variants.' },
            { level: 'Proficient', scoreRange: '3 Marks', description: 'Clear numeric table comparing Manhattan vs Euclidean expansions on standard maps.' },
            { level: 'Developing', scoreRange: '2 Marks', description: 'Metrics reported for only a single test configuration.' },
            { level: 'Beginning', scoreRange: '0 - 1 Marks', description: 'No comparative analysis included in report.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-04',
    title: 'Relational Schema Normalization (BCNF & 4NF)',
    subject: 'Database Management Systems',
    code: 'CS304',
    description: 'Case analysis of hospital inventory records: decompose un-normalized schemas into Boyce-Codd and 4th normal forms with dependency preservation.',
    assignedDate: '2026-10-02',
    dueDate: '2026-10-18',
    status: 'completed',
    maxMarks: 25,
    submissionType: 'PDF Report',
    faculty: 'Dr. Vikram Malhotra',
    learningObjectives: [
      'Functional and multi-valued dependency analysis',
      'Lossless join decomposition validation',
      'SQL DDL generation for normalized tables'
    ],
    rubric: {
      assignmentId: 'asg-04',
      assignmentTitle: 'Relational Schema Normalization (BCNF & 4NF)',
      courseCode: 'CS304',
      totalMarks: 25,
      generalNotes: 'Provide Chase Algorithm tableau proof to verify lossless join property.',
      criteria: [
        {
          id: 'c1',
          name: 'Functional & Multi-Valued Dependency Identification',
          description: 'Rigorous identification of trivial and non-trivial functional dependencies (FDs) and multivalued dependencies (MVDs).',
          maxMarks: 8,
          levels: [
            { level: 'Exemplary', scoreRange: '7.5 - 8 Marks', description: 'Complete minimal cover of FDs; accurate identification of candidate keys and MVDs.' },
            { level: 'Proficient', scoreRange: '6 - 7 Marks', description: 'Correct candidate keys and primary FDs with minor non-critical dependency oversight.' },
            { level: 'Developing', scoreRange: '4 - 5.5 Marks', description: 'Omission of transitive dependencies or misclassification of partial keys.' },
            { level: 'Beginning', scoreRange: '0 - 3.5 Marks', description: 'Incorrect identification of candidate keys.' }
          ]
        },
        {
          id: 'c2',
          name: 'Lossless Join & Dependency Preservation Proofs',
          description: 'Decomposition steps fulfilling BCNF criteria with explicit Chase tableau tests.',
          maxMarks: 8,
          levels: [
            { level: 'Exemplary', scoreRange: '7.5 - 8 Marks', description: 'Step-by-step BCNF tree decomposition with full Chase test verifying lossless join.' },
            { level: 'Proficient', scoreRange: '6 - 7 Marks', description: 'Valid BCNF relations with correct informal proof of lossless property.' },
            { level: 'Developing', scoreRange: '4 - 5.5 Marks', description: 'Decomposition loses a critical functional dependency without addressing 3NF tradeoff.' },
            { level: 'Beginning', scoreRange: '0 - 3.5 Marks', description: 'Decomposition produces lossy join anomalies.' }
          ]
        },
        {
          id: 'c3',
          name: '4NF Multivalued Normalization',
          description: 'Elimination of independent multivalued attributes according to Fagin theorem.',
          maxMarks: 5,
          levels: [
            { level: 'Exemplary', scoreRange: '5 Marks', description: 'Clear identification of independent 1-to-many relationships and flawless 4NF decomposition.' },
            { level: 'Proficient', scoreRange: '4 Marks', description: 'Accurate 4NF tables with valid justification of MVD elimination.' },
            { level: 'Developing', scoreRange: '2.5 - 3.5 Marks', description: 'Partial 4NF decomposition leaving Cartesian product anomalies.' },
            { level: 'Beginning', scoreRange: '0 - 2 Marks', description: 'MVD concepts conflated with standard functional dependencies.' }
          ]
        },
        {
          id: 'c4',
          name: 'Production SQL DDL & Foreign Key Schema',
          description: 'Executable PostgreSQL DDL statements with primary keys, foreign key constraints, and check invariants.',
          maxMarks: 4,
          levels: [
            { level: 'Exemplary', scoreRange: '4 Marks', description: 'Syntactically clean, indexed DDL scripts with referential actions (CASCADE/RESTRICT).' },
            { level: 'Proficient', scoreRange: '3 Marks', description: 'Working DDL schema with valid table structures and primary/foreign keys.' },
            { level: 'Developing', scoreRange: '2 Marks', description: 'Minor DDL errors or missing foreign key references between normalized tables.' },
            { level: 'Beginning', scoreRange: '0 - 1 Marks', description: 'Broken SQL scripts that fail execution.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-05',
    title: 'Euler & Hamiltonian Graph Traversal Proofs',
    subject: 'Discrete Mathematics',
    code: 'CS303',
    description: 'Provide formal mathematical proofs for graph vertex coloring bounds and planar Kuratowski subgraphs.',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-15',
    status: 'completed',
    maxMarks: 20,
    submissionType: 'PDF Report',
    faculty: 'Prof. Kavita Nair',
    learningObjectives: [
      'Inductive proof construction for planar graphs',
      'Four-Color Theorem boundary conditions',
      'Adjacency matrix eigenvector properties'
    ],
    rubric: {
      assignmentId: 'asg-05',
      assignmentTitle: 'Euler & Hamiltonian Graph Traversal Proofs',
      courseCode: 'CS303',
      totalMarks: 20,
      generalNotes: 'Mathematical proofs must use standard LaTeX notation and deductive rigor.',
      criteria: [
        {
          id: 'c1',
          name: 'Mathematical Rigor & Inductive Structure',
          description: 'Formal statement of base case, inductive hypothesis, and deductive steps for Euler characteristic V - E + F = 2.',
          maxMarks: 8,
          levels: [
            { level: 'Exemplary', scoreRange: '7.5 - 8 Marks', description: 'Flawless mathematical induction proof with explicit topological justifications.' },
            { level: 'Proficient', scoreRange: '6 - 7 Marks', description: 'Complete proof structure with minor step leaps in inductive step.' },
            { level: 'Developing', scoreRange: '4 - 5.5 Marks', description: 'Incomplete induction base case or unproven inductive assumptions.' },
            { level: 'Beginning', scoreRange: '0 - 3.5 Marks', description: 'Informal descriptive claims without algebraic or topological proof.' }
          ]
        },
        {
          id: 'c2',
          name: 'Planarity & Kuratowski Subgraph Reduction',
          description: 'Demonstrating non-planarity through homeomorphisms to K5 or K3,3 utilities graphs.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Precise edge contractions and vertex removals isolating forbidden subgraphs.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Correct identification of K3,3 or K5 minor with minor diagrammatic ambiguity.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Partial subgraph reduction without formal proof of topological equivalence.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Incorrect application of Kuratowski theorem.' }
          ]
        },
        {
          id: 'c3',
          name: 'Spectral Graph Theory & Adjacency Eigenvalues',
          description: 'Deriving bounds on chromatic number and clique size using adjacency matrix eigenvalues.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Rigorous derivation of Wilf eigenvalue bound χ(G) <= 1 + λ_max with concrete matrix examples.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Accurate calculation of characteristic polynomial and eigenvalues.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Calculation errors in eigenvalue determination for graphs with > 5 vertices.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Unsubstantiated spectral claims.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-06',
    title: 'Direct-Mapped & 4-Way Set Associative Cache Simulator',
    subject: 'Computer Organization & Architecture',
    code: 'CS305',
    description: 'Simulate L1/L2 cache hit/miss ratio for Valgrind memory trace benchmarks with Least Recently Used (LRU) block replacement policy.',
    assignedDate: '2026-09-20',
    dueDate: '2026-10-10',
    status: 'overdue',
    maxMarks: 30,
    submissionType: 'Project Archive',
    faculty: 'Prof. Sandeep Joshi',
    learningObjectives: [
      'Address breakdown into Tag, Index, and Block Offset',
      'LRU eviction queue management',
      'Cache miss classification (Compulsory, Capacity, Conflict)'
    ],
    rubric: {
      assignmentId: 'asg-06',
      assignmentTitle: 'Direct-Mapped & 4-Way Set Associative Cache Simulator',
      courseCode: 'CS305',
      totalMarks: 30,
      generalNotes: 'Late submission status: Requires special faculty clearance. Late penalty applies per academic regulations.',
      criteria: [
        {
          id: 'c1',
          name: 'Address Bit Parsing & Set Indexing',
          description: 'Bitwise masking and shifting to extract Tag, Set Index, and Byte Offset across configurable cache sizes (32KB, 64KB).',
          maxMarks: 10,
          levels: [
            { level: 'Exemplary', scoreRange: '9 - 10 Marks', description: 'Configurable bit-mask logic supporting arbitrary block and cache sizes with zero byte boundary errors.' },
            { level: 'Proficient', scoreRange: '7.5 - 8.5 Marks', description: 'Accurate direct-mapped and 4-way address slicing on 32-bit and 64-bit addresses.' },
            { level: 'Developing', scoreRange: '5 - 7 Marks', description: 'Off-by-one errors in offset bit calculation causing misplaced cache lines.' },
            { level: 'Beginning', scoreRange: '0 - 4.5 Marks', description: 'Hardcoded bit widths failing for test cases with varied geometry.' }
          ]
        },
        {
          id: 'c2',
          name: 'LRU Replacement Policy Implementation',
          description: 'Accurate temporal tracking of cache lines within sets using linked lists or timestamps to evict least recently accessed blocks.',
          maxMarks: 8,
          levels: [
            { level: 'Exemplary', scoreRange: '8 Marks', description: 'Doubly-linked list LRU queue with O(1) hit promotion and constant time eviction.' },
            { level: 'Proficient', scoreRange: '6 - 7 Marks', description: 'Correct counter/timestamp based LRU tracking matching gold simulator traces.' },
            { level: 'Developing', scoreRange: '4 - 5.5 Marks', description: 'Flawed eviction on simultaneous reads; approximates FIFO instead of true LRU.' },
            { level: 'Beginning', scoreRange: '0 - 3.5 Marks', description: 'Eviction logic causes cache line overwrite without checking age.' }
          ]
        },
        {
          id: 'c3',
          name: 'Memory Trace Parsing & 3C Miss Breakdown',
          description: 'Parses standard Valgrind/Dinero trace formats and categorizes misses into Compulsory, Capacity, and Conflict.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Full 3C miss classification with infinite-cache simulation baseline for compulsory misses.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Robust trace reader handling load/store opcodes with overall hit/miss rates.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Trace parser crashes on unexpected whitespace or large hex values.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Cannot parse real memory trace files.' }
          ]
        },
        {
          id: 'c4',
          name: 'Benchmarking Report & Architectural Tradeoffs',
          description: 'Written analysis comparing hit rates against associativity levels and write-through vs write-back policies.',
          maxMarks: 6,
          levels: [
            { level: 'Exemplary', scoreRange: '6 Marks', description: 'Insightful graphs illustrating the law of diminishing returns for associativity beyond 4-way.' },
            { level: 'Proficient', scoreRange: '4.5 - 5 Marks', description: 'Clear charts showing hit rate vs cache size for benchmark traces.' },
            { level: 'Developing', scoreRange: '3 - 4 Marks', description: 'Raw numbers tabulated without architectural insights or explanations.' },
            { level: 'Beginning', scoreRange: '0 - 2.5 Marks', description: 'Missing architectural report.' }
          ]
        }
      ]
    }
  },
  {
    id: 'asg-07',
    title: 'Exploratory Data Analysis with Pandas & Seaborn',
    subject: 'Python for Data Science Lab',
    code: 'CS306',
    description: 'Complete data cleaning, missing value imputation, and correlation heatmaps on World Bank socioeconomic metrics.',
    assignedDate: '2026-10-01',
    dueDate: '2026-10-14',
    status: 'completed',
    maxMarks: 20,
    submissionType: 'Jupyter Notebook',
    faculty: 'Prof. Ramesh Kulkarni',
    learningObjectives: [
      'Missing data imputation strategies',
      'Pairplot and multi-variate statistical distribution charts',
      'Data export formatting'
    ],
    rubric: {
      assignmentId: 'asg-07',
      assignmentTitle: 'Exploratory Data Analysis with Pandas & Seaborn',
      courseCode: 'CS306',
      totalMarks: 20,
      generalNotes: 'Submitted & Evaluated. Scored 19/20.',
      criteria: [
        {
          id: 'c1',
          name: 'Data Hygiene, Imputation & Outlier Detection',
          description: 'Identifies missing data mechanisms (MCAR/MAR), applies appropriate median/mode imputation, and flags IQR outliers.',
          maxMarks: 5,
          levels: [
            { level: 'Exemplary', scoreRange: '5 Marks', description: 'Detailed missingness matrix (missingno), justified domain imputation, and boxplot outlier analysis.' },
            { level: 'Proficient', scoreRange: '4 Marks', description: 'Proper dropna/fillna handling with statistical summaries.' },
            { level: 'Developing', scoreRange: '2.5 - 3.5 Marks', description: 'Arbitrary constant fillna without assessing feature skewness.' },
            { level: 'Beginning', scoreRange: '0 - 2 Marks', description: 'Untreated null values causing downstream plotting errors.' }
          ]
        },
        {
          id: 'c2',
          name: 'Statistical Distribution & Correlation Analysis',
          description: 'Univariate distributions, skewness quantification, and masked Pearson/Spearman correlation heatmaps.',
          maxMarks: 5,
          levels: [
            { level: 'Exemplary', scoreRange: '5 Marks', description: 'Clean triangular masked correlation heatmap, annotated coefficients, and distribution KDE plots.' },
            { level: 'Proficient', scoreRange: '4 Marks', description: 'Accurate correlation matrix with Seaborn heatmap.' },
            { level: 'Developing', scoreRange: '2.5 - 3.5 Marks', description: 'Overcrowded heatmap without coefficient annotations or readable font sizing.' },
            { level: 'Beginning', scoreRange: '0 - 2 Marks', description: 'Misinterpreted correlation coefficients.' }
          ]
        },
        {
          id: 'c3',
          name: 'Seaborn Multi-Variate Visualizations',
          description: 'Pairplots, facet grids, and categorical violin/box plots highlighting cross-regional disparities.',
          maxMarks: 5,
          levels: [
            { level: 'Exemplary', scoreRange: '5 Marks', description: 'Custom styled palette, informative title labels, and FacetGrid groupings demonstrating key socio-economic trends.' },
            { level: 'Proficient', scoreRange: '4 Marks', description: 'Multiple clean Seaborn charts with axis labels and legend styling.' },
            { level: 'Developing', scoreRange: '2.5 - 3.5 Marks', description: 'Default matplotlib plots with overlapping x-tick labels.' },
            { level: 'Beginning', scoreRange: '0 - 2 Marks', description: 'Charts missing axis labels or legends.' }
          ]
        },
        {
          id: 'c4',
          name: 'Analytical Storytelling & Executive Summary',
          description: 'Cohesive written narrative connecting empirical statistical findings with real-world policy insights.',
          maxMarks: 5,
          levels: [
            { level: 'Exemplary', scoreRange: '5 Marks', description: 'Compelling insights with clear takeaways and actionable hypotheses for predictive modeling.' },
            { level: 'Proficient', scoreRange: '4 Marks', description: 'Thoughtful written observations beneath each chart.' },
            { level: 'Developing', scoreRange: '2.5 - 3.5 Marks', description: 'Superficial descriptions stating obvious chart features without deeper context.' },
            { level: 'Beginning', scoreRange: '0 - 2 Marks', description: 'No markdown commentary or narrative conclusions.' }
          ]
        }
      ]
    }
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    subjectCode: 'CS301',
    subjectName: 'Machine Learning Foundations',
    faculty: 'Prof. Ramesh Kulkarni',
    attended: 38,
    total: 42,
    credits: 4,
    type: 'Lecture'
  },
  {
    subjectCode: 'CS302',
    subjectName: 'Data Structures & Algorithms',
    faculty: 'Dr. Sunita Deshmukh',
    attended: 44,
    total: 48,
    credits: 4,
    type: 'Lecture'
  },
  {
    subjectCode: 'CS303',
    subjectName: 'Discrete Mathematics & Graph Theory',
    faculty: 'Prof. Kavita Nair',
    attended: 31,
    total: 36,
    credits: 3,
    type: 'Lecture'
  },
  {
    subjectCode: 'CS304',
    subjectName: 'Database Management Systems',
    faculty: 'Dr. Vikram Malhotra',
    attended: 36,
    total: 40,
    credits: 4,
    type: 'Lecture'
  },
  {
    subjectCode: 'CS305',
    subjectName: 'Computer Organization & Architecture',
    faculty: 'Prof. Sandeep Joshi',
    attended: 25,
    total: 36,
    credits: 3,
    type: 'Lecture'
  },
  {
    subjectCode: 'CS306',
    subjectName: 'Python for Data Science Lab',
    faculty: 'Prof. Ramesh Kulkarni',
    attended: 18,
    total: 20,
    credits: 2,
    type: 'Lab'
  },
  {
    subjectCode: 'CS307',
    subjectName: 'Artificial Intelligence Lab',
    faculty: 'Prof. Ananya Roy',
    attended: 19,
    total: 20,
    credits: 2,
    type: 'Lab'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  {
    id: 'tt-mon-1',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    subject: 'Machine Learning Foundations',
    code: 'CS301',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Ramesh Kulkarni',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-2',
    day: 'Monday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    subject: 'Data Structures & Algorithms',
    code: 'CS302',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Sunita Deshmukh',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-3',
    day: 'Monday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    subject: 'Database Management Systems',
    code: 'CS304',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Vikram Malhotra',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-4',
    day: 'Monday',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    subject: 'Artificial Intelligence Lab (Batch A2)',
    code: 'CS307',
    room: 'AI Systems Lab 202',
    faculty: 'Prof. Ananya Roy',
    type: 'Lab'
  },

  // Tuesday
  {
    id: 'tt-tue-1',
    day: 'Tuesday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    subject: 'Discrete Mathematics',
    code: 'CS303',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Kavita Nair',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-2',
    day: 'Tuesday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    subject: 'Computer Organization & Arch',
    code: 'CS305',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Sandeep Joshi',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-3',
    day: 'Tuesday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    subject: 'Machine Learning Foundations',
    code: 'CS301',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Ramesh Kulkarni',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-4',
    day: 'Tuesday',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    subject: 'Python Data Science Lab (Batch A2)',
    code: 'CS306',
    room: 'Data Computing Lab 204',
    faculty: 'Prof. Ramesh Kulkarni',
    type: 'Lab'
  },

  // Wednesday
  {
    id: 'tt-wed-1',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    subject: 'Data Structures & Algorithms',
    code: 'CS302',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Sunita Deshmukh',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-2',
    day: 'Wednesday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    subject: 'Database Management Systems',
    code: 'CS304',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Vikram Malhotra',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-3',
    day: 'Wednesday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    subject: 'Discrete Mathematics',
    code: 'CS303',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Kavita Nair',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-4',
    day: 'Wednesday',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    subject: 'ML Foundations Tutorial',
    code: 'CS301',
    room: 'Seminar Hall B',
    faculty: 'Prof. Ramesh Kulkarni',
    type: 'Tutorial'
  },

  // Thursday
  {
    id: 'tt-thu-1',
    day: 'Thursday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    subject: 'Computer Organization & Arch',
    code: 'CS305',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Sandeep Joshi',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-2',
    day: 'Thursday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    subject: 'Machine Learning Foundations',
    code: 'CS301',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Ramesh Kulkarni',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-3',
    day: 'Thursday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    subject: 'Data Structures & Algorithms',
    code: 'CS302',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Sunita Deshmukh',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-4',
    day: 'Thursday',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    subject: 'DBMS Hands-On Lab (Batch A2)',
    code: 'CS304',
    room: 'Database Lab 201',
    faculty: 'Dr. Vikram Malhotra',
    type: 'Lab'
  },

  // Friday
  {
    id: 'tt-fri-1',
    day: 'Friday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    subject: 'Database Management Systems',
    code: 'CS304',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Vikram Malhotra',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-2',
    day: 'Friday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    subject: 'Discrete Mathematics',
    code: 'CS303',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Kavita Nair',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-3',
    day: 'Friday',
    startTime: '11:15 AM',
    endTime: '12:15 PM',
    subject: 'Computer Organization & Arch',
    code: 'CS305',
    room: 'Lecture Hall 304',
    faculty: 'Prof. Sandeep Joshi',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-4',
    day: 'Friday',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    subject: 'DSA Problem Solving Tutorial',
    code: 'CS302',
    room: 'Lecture Hall 304',
    faculty: 'Dr. Sunita Deshmukh',
    type: 'Tutorial'
  },

  // Saturday
  {
    id: 'tt-sat-1',
    day: 'Saturday',
    startTime: '09:30 AM',
    endTime: '11:30 AM',
    subject: 'Industry Project Mentorship Session',
    code: 'SEM3-PRJ',
    room: 'Auditorium Block 1',
    faculty: 'Dr. Sunita Deshmukh & Industry Mentors',
    type: 'Tutorial'
  },
  {
    id: 'tt-sat-2',
    day: 'Saturday',
    startTime: '11:45 AM',
    endTime: '01:00 PM',
    subject: 'AI/ML Club Technical Colloquium',
    code: 'AIML-ACT',
    room: 'Tinkering Lab 102',
    faculty: 'Student Technical Council',
    type: 'Lecture'
  }
];

export const INITIAL_RESULTS: ExamResult[] = [
  {
    subjectCode: 'CS301',
    subjectName: 'Machine Learning Foundations',
    internalMarks: 36,
    externalMarks: 54,
    totalMarks: 90,
    grade: 'O',
    gradePoint: 10,
    credits: 4,
    status: 'Pass'
  },
  {
    subjectCode: 'CS302',
    subjectName: 'Data Structures & Algorithms',
    internalMarks: 35,
    externalMarks: 52,
    totalMarks: 87,
    grade: 'A+',
    gradePoint: 9,
    credits: 4,
    status: 'Pass'
  },
  {
    subjectCode: 'CS303',
    subjectName: 'Discrete Mathematics & Graph Theory',
    internalMarks: 32,
    externalMarks: 49,
    totalMarks: 81,
    grade: 'A+',
    gradePoint: 9,
    credits: 3,
    status: 'Pass'
  },
  {
    subjectCode: 'CS304',
    subjectName: 'Database Management Systems',
    internalMarks: 37,
    externalMarks: 53,
    totalMarks: 90,
    grade: 'O',
    gradePoint: 10,
    credits: 4,
    status: 'Pass'
  },
  {
    subjectCode: 'CS305',
    subjectName: 'Computer Organization & Architecture',
    internalMarks: 30,
    externalMarks: 46,
    totalMarks: 76,
    grade: 'A',
    gradePoint: 8,
    credits: 3,
    status: 'Pass'
  },
  {
    subjectCode: 'CS306',
    subjectName: 'Python for Data Science Lab',
    internalMarks: 38,
    externalMarks: 57,
    totalMarks: 95,
    grade: 'O',
    gradePoint: 10,
    credits: 2,
    status: 'Pass'
  },
  {
    subjectCode: 'CS307',
    subjectName: 'Artificial Intelligence Lab',
    internalMarks: 39,
    externalMarks: 56,
    totalMarks: 95,
    grade: 'O',
    gradePoint: 10,
    credits: 2,
    status: 'Pass'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Semester 3 End Semester Examination (ESE) Timetable & Hall Ticket Notice',
    category: 'Examination',
    date: '2026-10-18',
    author: 'Controller of Examinations',
    department: 'Examination Cell',
    summary: 'The final timetable for Semester 3 Winter 2026 End Semester Theory & Practical examinations has been published.',
    content: 'All Semester 3 CSE (AI/ML) students are hereby informed that the End Semester Examination (ESE) is scheduled to commence from November 16, 2026. Hall tickets will be generated online through the portal on November 5, 2026. Please verify that all laboratory submissions and term-work clearances are completed by October 30 to avoid debarment.',
    isImportant: true,
    attachmentName: 'ESE_Winter2026_Schedule_CSE_AIML.pdf'
  },
  {
    id: 'ann-02',
    title: 'Smart India Hackathon (SIH 2026) Internal College Shortlisting',
    category: 'Events',
    date: '2026-10-16',
    author: 'Prof. K. R. Mehra',
    department: 'Innovation & Incubation Cell',
    summary: 'Student teams are invited to present problem statements for the SIH 2026 campus preliminary selection round.',
    content: 'The campus preliminary shortlisting round for SIH 2026 will be held on October 28 in Auditorium 1. Each team must submit a 5-slide PPT proposing solutions in AI, Healthcare, or Smart Mobility domains. Top 15 teams will represent our institution at the national level.',
    isImportant: true,
    attachmentName: 'SIH2026_Internal_Guidelines.pdf'
  },
  {
    id: 'ann-03',
    title: 'Distinguished Guest Lecture: Modern LLM Fine-Tuning & Quantization',
    category: 'Academic',
    date: '2026-10-14',
    author: 'Dr. Sunita Deshmukh',
    department: 'CSE (AI/ML) Department',
    summary: 'Special interactive lecture by Google Research Scientist Dr. Siddharth Rao on Low-Rank Adaptation (LoRA) and 4-bit quantization.',
    content: 'Department of Computer Science (AI/ML) is hosting an expert masterclass on Friday, October 24 at 02:00 PM in the Main Auditorium. Topics include efficient fine-tuning techniques, instruction-tuning datasets, and deploying models on consumer hardware. Attendance is mandatory for all Semester 3 students.',
    isImportant: false,
    attachmentName: 'Lecture_Brochure_Quantization_LLM.pdf'
  },
  {
    id: 'ann-04',
    title: 'Central Library Extended Study Hours for Examination Period',
    category: 'General',
    date: '2026-10-10',
    author: 'Chief Librarian',
    department: 'Central Library',
    summary: 'Central Library reading hall will remain open 24/7 starting October 25 until the conclusion of ESE examinations.',
    content: 'To support students during exam preparation, the Central Library reading halls and digital reference section will operate 24x7 from October 25, 2026. Wi-Fi facilities and water dispensers will be active on all floors. Please maintain strict discipline and carry your college ID card.',
    isImportant: false
  },
  {
    id: 'ann-05',
    title: 'Submission Guidelines for Continuous Assessment - Term Work 2',
    category: 'Academic',
    date: '2026-10-06',
    author: 'Academic Dean',
    department: 'Academic Affairs',
    summary: 'All continuous assessment laboratory journals and project reports must be submitted for faculty verification by October 25.',
    content: 'Students must submit signed code printouts and laboratory journals for CS306 and CS307 by October 25, 2026. Viva-voce assessments will carry 25% weightage of final internal marks. Late submissions will result in a deduction of 5 marks per day.',
    isImportant: false,
    attachmentName: 'TermWork2_Format_Template.docx'
  }
];

export const INITIAL_CLASS_RESULTS: StudentClassResult[] = [
  {
    id: 'res-s-01',
    studentName: 'Parth Gadhiya',
    enrollmentNo: '24CSAIML042',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A2',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 90, maxMarks: 100, grade: 'O' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 87, maxMarks: 100, grade: 'A+' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 81, maxMarks: 100, grade: 'A+' },
      { code: 'CS304', name: 'DBMS', marks: 90, maxMarks: 100, grade: 'O' },
      { code: 'CS305', name: 'COA', marks: 76, maxMarks: 100, grade: 'A' },
      { code: 'CS306', name: 'Python DS Lab', marks: 95, maxMarks: 100, grade: 'O' },
      { code: 'CS307', name: 'AI Lab', marks: 95, maxMarks: 100, grade: 'O' },
    ],
    totalMarks: 614,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 9.33,
    finalGrade: 'A+',
    status: 'Pass',
  },
  {
    id: 'res-s-02',
    studentName: 'Priya Sharma',
    enrollmentNo: '24CSAIML008',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A1',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 95, maxMarks: 100, grade: 'O' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 94, maxMarks: 100, grade: 'O' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 88, maxMarks: 100, grade: 'A+' },
      { code: 'CS304', name: 'DBMS', marks: 92, maxMarks: 100, grade: 'O' },
      { code: 'CS305', name: 'COA', marks: 85, maxMarks: 100, grade: 'A+' },
      { code: 'CS306', name: 'Python DS Lab', marks: 96, maxMarks: 100, grade: 'O' },
      { code: 'CS307', name: 'AI Lab', marks: 98, maxMarks: 100, grade: 'O' },
    ],
    totalMarks: 648,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 9.65,
    finalGrade: 'O',
    status: 'Pass',
  },
  {
    id: 'res-s-03',
    studentName: 'Rohan Mehta',
    enrollmentNo: '24CSAIML019',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A1',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 84, maxMarks: 100, grade: 'A+' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 82, maxMarks: 100, grade: 'A+' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 78, maxMarks: 100, grade: 'A' },
      { code: 'CS304', name: 'DBMS', marks: 86, maxMarks: 100, grade: 'A+' },
      { code: 'CS305', name: 'COA', marks: 74, maxMarks: 100, grade: 'A' },
      { code: 'CS306', name: 'Python DS Lab', marks: 88, maxMarks: 100, grade: 'A+' },
      { code: 'CS307', name: 'AI Lab', marks: 86, maxMarks: 100, grade: 'A+' },
    ],
    totalMarks: 578,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 8.90,
    finalGrade: 'A',
    status: 'Pass',
  },
  {
    id: 'res-s-04',
    studentName: 'Ananya Gupta',
    enrollmentNo: '24CSAIML027',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A2',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 92, maxMarks: 100, grade: 'O' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 89, maxMarks: 100, grade: 'A+' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 85, maxMarks: 100, grade: 'A+' },
      { code: 'CS304', name: 'DBMS', marks: 91, maxMarks: 100, grade: 'O' },
      { code: 'CS305', name: 'COA', marks: 81, maxMarks: 100, grade: 'A+' },
      { code: 'CS306', name: 'Python DS Lab', marks: 96, maxMarks: 100, grade: 'O' },
      { code: 'CS307', name: 'AI Lab', marks: 96, maxMarks: 100, grade: 'O' },
    ],
    totalMarks: 630,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 9.45,
    finalGrade: 'A+',
    status: 'Pass',
  },
  {
    id: 'res-s-05',
    studentName: 'Devansh Kulkarni',
    enrollmentNo: '24CSAIML033',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A2',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 68, maxMarks: 100, grade: 'B+' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 71, maxMarks: 100, grade: 'A' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 62, maxMarks: 100, grade: 'B+' },
      { code: 'CS304', name: 'DBMS', marks: 66, maxMarks: 100, grade: 'B+' },
      { code: 'CS305', name: 'COA', marks: 61, maxMarks: 100, grade: 'B+' },
      { code: 'CS306', name: 'Python DS Lab', marks: 72, maxMarks: 100, grade: 'A' },
      { code: 'CS307', name: 'AI Lab', marks: 72, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 472,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 7.40,
    finalGrade: 'B+',
    status: 'Pass',
  },
  {
    id: 'res-s-06',
    studentName: 'Sanya Mirza',
    enrollmentNo: '24CSAIML045',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A3',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 82, maxMarks: 100, grade: 'A+' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 79, maxMarks: 100, grade: 'A' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 75, maxMarks: 100, grade: 'A' },
      { code: 'CS304', name: 'DBMS', marks: 84, maxMarks: 100, grade: 'A+' },
      { code: 'CS305', name: 'COA', marks: 72, maxMarks: 100, grade: 'A' },
      { code: 'CS306', name: 'Python DS Lab', marks: 88, maxMarks: 100, grade: 'A+' },
      { code: 'CS307', name: 'AI Lab', marks: 85, maxMarks: 100, grade: 'A+' },
    ],
    totalMarks: 565,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 8.75,
    finalGrade: 'A',
    status: 'Pass',
  },
  {
    id: 'res-s-07',
    studentName: 'Kabir Verma',
    enrollmentNo: '24CSAIML052',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A3',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 54, maxMarks: 100, grade: 'B' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 51, maxMarks: 100, grade: 'B' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 46, maxMarks: 100, grade: 'C' },
      { code: 'CS304', name: 'DBMS', marks: 52, maxMarks: 100, grade: 'B' },
      { code: 'CS305', name: 'COA', marks: 44, maxMarks: 100, grade: 'P' },
      { code: 'CS306', name: 'Python DS Lab', marks: 70, maxMarks: 100, grade: 'A' },
      { code: 'CS307', name: 'AI Lab', marks: 71, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 388,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 5.85,
    finalGrade: 'C',
    status: 'Pass',
  },
  {
    id: 'res-s-08',
    studentName: 'Neha Rathi',
    enrollmentNo: '24CSAIML060',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A3',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 88, maxMarks: 100, grade: 'A+' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 86, maxMarks: 100, grade: 'A+' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 82, maxMarks: 100, grade: 'A+' },
      { code: 'CS304', name: 'DBMS', marks: 89, maxMarks: 100, grade: 'A+' },
      { code: 'CS305', name: 'COA', marks: 79, maxMarks: 100, grade: 'A' },
      { code: 'CS306', name: 'Python DS Lab', marks: 90, maxMarks: 100, grade: 'O' },
      { code: 'CS307', name: 'AI Lab', marks: 88, maxMarks: 100, grade: 'A+' },
    ],
    totalMarks: 602,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 9.15,
    finalGrade: 'A+',
    status: 'Pass',
  },
  {
    id: 'res-s-09',
    studentName: 'Aryan Joshi',
    enrollmentNo: '24CSAIML014',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A1',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 62, maxMarks: 100, grade: 'B+' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 64, maxMarks: 100, grade: 'B+' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 56, maxMarks: 100, grade: 'B' },
      { code: 'CS304', name: 'DBMS', marks: 60, maxMarks: 100, grade: 'B+' },
      { code: 'CS305', name: 'COA', marks: 58, maxMarks: 100, grade: 'B' },
      { code: 'CS306', name: 'Python DS Lab', marks: 70, maxMarks: 100, grade: 'A' },
      { code: 'CS307', name: 'AI Lab', marks: 70, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 440,
    maxMarks: 700,
    creditsEarned: 22,
    maxCredits: 22,
    cgpa: 6.80,
    finalGrade: 'B',
    status: 'Pass',
  },
  {
    id: 'res-s-10',
    studentName: 'Tanvi Bhatt',
    enrollmentNo: '24CSAIML038',
    semester: 3,
    division: 'Division A',
    batch: 'Batch A2',
    subjectScores: [
      { code: 'CS301', name: 'Machine Learning', marks: 32, maxMarks: 100, grade: 'F' },
      { code: 'CS302', name: 'Data Structures & Algorithms', marks: 36, maxMarks: 100, grade: 'F' },
      { code: 'CS303', name: 'Discrete Mathematics', marks: 35, maxMarks: 100, grade: 'F' },
      { code: 'CS304', name: 'DBMS', marks: 41, maxMarks: 100, grade: 'P' },
      { code: 'CS305', name: 'COA', marks: 38, maxMarks: 100, grade: 'F' },
      { code: 'CS306', name: 'Python DS Lab', marks: 45, maxMarks: 100, grade: 'C' },
      { code: 'CS307', name: 'AI Lab', marks: 48, maxMarks: 100, grade: 'C' },
    ],
    totalMarks: 275,
    maxMarks: 700,
    creditsEarned: 8,
    maxCredits: 22,
    cgpa: 3.90,
    finalGrade: 'F',
    status: 'Fail',
  },
];
