import { QuizQuestion } from '@/types';

export const PRESET_QUESTIONS: Record<string, QuizQuestion[]> = {
  // --- DBMS: SQL Joins ---
  'DBMS-SQL Joins': [
    {
      id: 'q-sql-1',
      type: 'multiple_choice',
      topicName: 'SQL Joins',
      difficulty: 'intermediate',
      question: 'Given Table A with 5 rows and Table B with 4 rows, if you execute a FULL OUTER JOIN with NO matching condition (ON 1=1), how many rows will be returned?',
      options: [
        { id: 'opt-1a', text: '9 rows', isCorrect: false },
        { id: 'opt-1b', text: '20 rows (Cartesian product)', isCorrect: true },
        { id: 'opt-1c', text: '5 rows', isCorrect: false },
        { id: 'opt-1d', text: '0 rows', isCorrect: false },
      ],
      explanation: 'When an ON condition evaluates unconditionally to TRUE (ON 1=1), every row from Table A matches every row from Table B, resulting in 5 × 4 = 20 rows.',
    },
    {
      id: 'q-sql-2',
      type: 'multiple_choice',
      topicName: 'SQL Joins',
      difficulty: 'intermediate',
      question: 'Which SQL clause is used to filter rows AFTER an aggregation join operation has been computed?',
      options: [
        { id: 'opt-2a', text: 'WHERE', isCorrect: false },
        { id: 'opt-2b', text: 'HAVING', isCorrect: true },
        { id: 'opt-2c', text: 'GROUP BY', isCorrect: false },
        { id: 'opt-2d', text: 'QUALIFY', isCorrect: false },
      ],
      explanation: 'WHERE filters rows before aggregation occurs, while HAVING filters the grouped results after the aggregate functions have calculated values.',
    },
    {
      id: 'q-sql-3',
      type: 'true_false',
      topicName: 'SQL Joins',
      difficulty: 'beginner',
      question: 'A LEFT JOIN guarantees that every row from the left table will be present in the final result set at least once.',
      options: [
        { id: 'opt-3a', text: 'True', isCorrect: true },
        { id: 'opt-3b', text: 'False', isCorrect: false },
      ],
      explanation: 'True. In a LEFT JOIN, every record from the left table is included; if no match exists in the right table, right table fields will contain NULL.',
    },
    {
      id: 'q-sql-4',
      type: 'multiple_answer',
      topicName: 'SQL Joins',
      difficulty: 'advanced',
      question: 'Which of the following join algorithms are commonly implemented inside relational database query engines? (Select all that apply)',
      options: [
        { id: 'opt-4a', text: 'Nested Loop Join', isCorrect: true },
        { id: 'opt-4b', text: 'Hash Join', isCorrect: true },
        { id: 'opt-4c', text: 'Sort-Merge Join', isCorrect: true },
        { id: 'opt-4d', text: 'Bubble Sort Join', isCorrect: false },
      ],
      explanation: 'Modern RDBMS engines (PostgreSQL, MySQL, Oracle) utilize Nested Loop Join (ideal for indexed lookups), Hash Join (ideal for large unsorted sets with equality), and Sort-Merge Join (ideal when both inputs are pre-sorted). Bubble Sort Join does not exist.',
    },
    {
      id: 'q-sql-5',
      type: 'multiple_choice',
      topicName: 'SQL Joins',
      difficulty: 'intermediate',
      question: 'Consider: SELECT A.id FROM TableA A LEFT JOIN TableB B ON A.id = B.id WHERE B.id IS NULL. What does this query find?',
      options: [
        { id: 'opt-5a', text: 'All rows that exist in both TableA and TableB', isCorrect: false },
        { id: 'opt-5b', text: 'All rows in TableA that do NOT have any matching row in TableB (Difference A - B)', isCorrect: true },
        { id: 'opt-5c', text: 'All rows with NULL primary keys', isCorrect: false },
        { id: 'opt-5d', text: 'Only the symmetric difference of both tables', isCorrect: false },
      ],
      explanation: 'This anti-join pattern filters out all matched rows, leaving exclusively records in TableA that have no corresponding match in TableB.',
    },
  ],

  // --- Data Structures ---
  'Data Structures-Trees & Graphs': [
    {
      id: 'q-dsa-1',
      type: 'multiple_choice',
      topicName: 'Trees & Graphs',
      difficulty: 'intermediate',
      question: 'What is the maximum number of nodes at level L in a binary tree (where the root is at level 0)?',
      options: [
        { id: 'opt-dsa1-a', text: '2^L', isCorrect: true },
        { id: 'opt-dsa1-b', text: '2^(L+1) - 1', isCorrect: false },
        { id: 'opt-dsa1-c', text: '2^(L-1)', isCorrect: false },
        { id: 'opt-dsa1-d', text: 'L^2', isCorrect: false },
      ],
      explanation: 'At level 0, there is 2^0 = 1 node. At level 1, 2^1 = 2 nodes. In general, at level L, there are at most 2^L nodes.',
    },
    {
      id: 'q-dsa-2',
      type: 'true_false',
      topicName: 'Trees & Graphs',
      difficulty: 'beginner',
      question: 'An in-order traversal of a valid Binary Search Tree (BST) visits nodes in strictly non-decreasing sorted order.',
      options: [
        { id: 'opt-dsa2-a', text: 'True', isCorrect: true },
        { id: 'opt-dsa2-b', text: 'False', isCorrect: false },
      ],
      explanation: 'True. In-order traversal visits Left subtree → Node → Right subtree. By BST properties (Left < Node < Right), this yields elements in ascending order.',
    },
    {
      id: 'q-dsa-3',
      type: 'multiple_answer',
      topicName: 'Trees & Graphs',
      difficulty: 'advanced',
      question: 'Which of the following graph algorithms can detect negative-weight cycles in a directed graph? (Select all that apply)',
      options: [
        { id: 'opt-dsa3-a', text: 'Bellman-Ford Algorithm', isCorrect: true },
        { id: 'opt-dsa3-b', text: 'Floyd-Warshall Algorithm', isCorrect: true },
        { id: 'opt-dsa3-c', text: 'Dijkstra Algorithm with Fibonacci Heap', isCorrect: false },
        { id: 'opt-dsa3-d', text: 'Kruskal Algorithm', isCorrect: false },
      ],
      explanation: 'Bellman-Ford checks if relaxation is still possible on the V-th iteration to detect cycles. Floyd-Warshall detects negative cycles if any diagonal entry dist[i][i] < 0. Dijkstra fails with negative edge weights.',
    },
  ],

  // --- Operating Systems ---
  'Operating Systems-Deadlocks & Concurrency': [
    {
      id: 'q-os-1',
      type: 'multiple_choice',
      topicName: 'Deadlocks & Concurrency',
      difficulty: 'intermediate',
      question: 'In Dijkstra\'s Banker\'s Algorithm for deadlock avoidance, a system state is considered "safe" if:',
      options: [
        { id: 'opt-os1-a', text: 'No deadlocks currently exist and all resources are 100% allocated', isCorrect: false },
        { id: 'opt-os1-b', text: 'There exists at least one order in which all processes can finish without deadlocking', isCorrect: true },
        { id: 'opt-os1-c', text: 'Every process holds equal numbers of semaphore locks', isCorrect: false },
        { id: 'opt-os1-d', text: 'Preemption is disabled across kernel threads', isCorrect: false },
      ],
      explanation: 'A safe state exists if there is a safe sequence <P1, P2, ... Pn> such that for each Pi, the resources that Pi can still request can be satisfied by current available resources plus resources held by all Pj (j < i).',
    },
    {
      id: 'q-os-2',
      type: 'true_false',
      topicName: 'Deadlocks & Concurrency',
      difficulty: 'intermediate',
      question: 'A cycle in a Resource Allocation Graph always guarantees the existence of a deadlock, regardless of the number of instances per resource type.',
      options: [
        { id: 'opt-os2-a', text: 'True', isCorrect: false },
        { id: 'opt-os2-b', text: 'False', isCorrect: true },
      ],
      explanation: 'False. A cycle indicates deadlock ONLY when every resource type has exactly one instance. If multiple instances exist, a cycle is a necessary condition, but not sufficient.',
    },
  ],
};
