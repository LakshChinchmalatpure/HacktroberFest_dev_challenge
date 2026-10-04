import { Flashcard, QuizQuestion, AdaptiveRecommendation } from '@/types';
import { PRESET_FLASHCARDS } from '@/data/presetFlashcards';
import { PRESET_QUESTIONS } from '@/data/presetQuestions';

export interface GenerateCardsParams {
  subjectId: string;
  subjectName: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  count: number;
  apiKey?: string;
  provider?: string;
}

export interface GenerateQuizParams {
  subjectId: string;
  subjectName: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  count: number;
  apiKey?: string;
  provider?: string;
}

// AI Service with resilient fallback knowledge base and dynamic generator
class AIService {
  // 1. Generate Flashcards
  async generateFlashcards(params: GenerateCardsParams): Promise<Flashcard[]> {
    // Simulate real AI network latency for UX realism
    await new Promise((res) => setTimeout(res, 900));

    const { subjectId, subjectName, topic, difficulty, count } = params;

    // Check if we have exact preset matches
    const matchedPresets = PRESET_FLASHCARDS.filter(
      (c) =>
        c.subjectName.toLowerCase() === subjectName.toLowerCase() ||
        c.topicName.toLowerCase().includes(topic.toLowerCase())
    );

    const generated: Flashcard[] = [];

    if (matchedPresets.length > 0) {
      for (let i = 0; i < Math.min(count, matchedPresets.length); i++) {
        const item = matchedPresets[i];
        generated.push({
          ...item,
          id: `fc-gen-${Date.now()}-${i}`,
          difficulty,
          mastery: 'new',
          reviewCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          nextReviewDate: new Date().toISOString(),
        });
      }
    }

    // If more are needed, dynamically generate realistic subject-specific flashcards
    const remaining = count - generated.length;
    for (let i = 0; i < remaining; i++) {
      const card = this.createDynamicFlashcard(subjectId, subjectName, topic, difficulty, i);
      generated.push(card);
    }

    return generated;
  }

  private createDynamicFlashcard(
    subjectId: string,
    subjectName: string,
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    index: number
  ): Flashcard {
    const templates = [
      {
        q: `What is the core architectural advantage of ${topic} in ${subjectName}?`,
        a: `${topic} optimizes throughput and memory locality by enforcing strict data partitioning, caching intermediate state, and reducing redundant boundary transitions.`,
      },
      {
        q: `How does time complexity behave for search operations in ${topic}?`,
        a: `In average cases, operations achieve O(log N) or O(1) amortized performance; edge cases involving un-indexed skewed hierarchies may degrade to O(N).`,
      },
      {
        q: `Compare and contrast ${topic} against naive sequential alternatives.`,
        a: `While sequential approaches suffer from O(N^2) worst-case scaling, ${topic} introduces logarithmic partitioning and localized memory access, significantly lowering latency.`,
      },
      {
        q: `What key trade-offs must be evaluated before deploying ${topic}?`,
        a: `1. Memory footprint overhead vs lookup speed\n2. Mutation/write latency (re-indexing or re-balancing)\n3. Concurrency locking contention under high write loads.`,
      },
      {
        q: `What common failure mode or bottleneck occurs when implementing ${topic}?`,
        a: `Cache invalidation overhead, unbalanced branching under non-uniform hash distributions, and thread starvation during lock acquisition.`,
      },
    ];

    const template = templates[index % templates.length];
    return {
      id: `fc-gen-${Date.now()}-${index}`,
      subjectId,
      subjectName,
      topicId: `top-gen-${index}`,
      topicName: topic,
      question: template.q,
      answer: template.a,
      difficulty,
      mastery: 'new',
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      nextReviewDate: new Date().toISOString(),
      bookmarked: false,
    };
  }

  // 2. Generate Interactive Quiz
  async generateQuiz(params: GenerateQuizParams): Promise<QuizQuestion[]> {
    await new Promise((res) => setTimeout(res, 1000));

    const { subjectName, topic, difficulty, count } = params;

    // Check if preset questions exist for this subject/topic
    const key = `${subjectName}-${topic}`;
    const preset = PRESET_QUESTIONS[key];

    const questions: QuizQuestion[] = [];

    if (preset && preset.length > 0) {
      for (let i = 0; i < Math.min(count, preset.length); i++) {
        questions.push({
          ...preset[i],
          id: `q-dyn-${Date.now()}-${i}`,
          difficulty,
        });
      }
    }

    // Generate remaining if needed
    const remaining = count - questions.length;
    for (let i = 0; i < remaining; i++) {
      questions.push(this.createDynamicQuizQuestion(subjectName, topic, difficulty, i));
    }

    return questions;
  }

  private createDynamicQuizQuestion(
    subjectName: string,
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    index: number
  ): QuizQuestion {
    const questionTemplates = [
      {
        type: 'multiple_choice' as const,
        question: `Which fundamental principle governs the optimal execution of ${topic} in ${subjectName}?`,
        options: [
          { id: `opt-${index}-a`, text: 'Spatial and temporal memory locality', isCorrect: true },
          { id: `opt-${index}-b`, text: 'Linear unbuffered polling', isCorrect: false },
          { id: `opt-${index}-c`, text: 'Arbitrary preemption of kernel routines', isCorrect: false },
          { id: `opt-${index}-d`, text: 'Exhaustive quadratic backtracking', isCorrect: false },
        ],
        explanation: `In ${subjectName}, ${topic} prioritizes spatial and temporal locality to maximize CPU cache hit rates and eliminate redundant I/O bottlenecks.`,
      },
      {
        type: 'true_false' as const,
        question: `True or False: Under heavy concurrent write loads, ${topic} eliminates all lock contention without auxiliary synchronization.`,
        options: [
          { id: `opt-${index}-a`, text: 'True', isCorrect: false },
          { id: `opt-${index}-b`, text: 'False', isCorrect: true },
        ],
        explanation: `False. Any shared mutable state requires concurrency control such as MVCC, read-write mutexes, or atomic primitives to prevent race conditions.`,
      },
      {
        type: 'multiple_choice' as const,
        question: `When debugging an efficiency bottleneck in ${topic}, what is the first diagnostic step?`,
        options: [
          { id: `opt-${index}-a`, text: 'Analyze cache miss ratios and query execution plans', isCorrect: true },
          { id: `opt-${index}-b`, text: 'Immediately rewrite in lower-level assembly', isCorrect: false },
          { id: `opt-${index}-c`, text: 'Disable all logging and monitoring agents', isCorrect: false },
          { id: `opt-${index}-d`, text: 'Restart the entire operating environment', isCorrect: false },
        ],
        explanation: `Profiling metrics and execution plan analysis pinpoint whether the degradation stems from algorithmic complexity, missing indexes, or I/O waits.`,
      },
    ];

    const chosen = questionTemplates[index % questionTemplates.length];
    return {
      id: `q-dyn-${Date.now()}-${index}`,
      type: chosen.type,
      question: chosen.question,
      options: chosen.options,
      explanation: chosen.explanation,
      difficulty,
      topicName: topic,
    };
  }

  // 3. AI Study Assistant Chat
  async askCogniva(
    userMessage: string,
    context?: { currentSubject?: string; weakTopics?: string[] }
  ): Promise<{ response: string; suggestedAction?: any }> {
    await new Promise((res) => setTimeout(res, 750));

    const msg = userMessage.toLowerCase();

    // Deadlock prompt
    if (msg.includes('deadlock') || msg.includes('coffman')) {
      return {
        response: `### 🚦 Understanding Deadlocks (Beginner-Friendly Analogy)\n\nImagine a single-lane bridge where two cars meet head-on from opposite directions:\n- **Car A** is halfway across, refusing to back up.\n- **Car B** is halfway across, also refusing to back up.\n\nNeither can proceed, neither can finish their journey. That is a **Deadlock**!\n\n#### The 4 Necessary Coffman Conditions:\n1. **Mutual Exclusion**: Only one car can occupy a piece of bridge at a time.\n2. **Hold and Wait**: Car A holds its bridge segment while waiting for Car B to move.\n3. **No Preemption**: You cannot forcibly lift Car B off the bridge with a crane.\n4. **Circular Wait**: Car A waits for Car B, Car B waits for Car A.\n\n💡 **Key Takeaway**: If you eliminate just *one* condition (e.g. enforce an ordering or allow preemption), deadlocks are mathematically impossible!`,
        suggestedAction: {
          type: 'create_quiz',
          label: 'Take Deadlocks Quiz (3 Questions)',
          payload: { subjectName: 'Operating Systems', topic: 'Deadlocks & Concurrency' },
        },
      };
    }

    // Flashcards prompt
    if (msg.includes('create') && msg.includes('flashcard')) {
      const subject = context?.currentSubject || 'DBMS';
      return {
        response: `✨ I have analyzed your study syllabus for **${subject}** and generated high-yield flashcard concepts focusing on core architectural principles, edge cases, and interview-level questions.\n\nReady to add them directly into your smart spaced-repetition deck?`,
        suggestedAction: {
          type: 'create_cards',
          label: `Generate 10 Flashcards on ${subject}`,
          payload: { subjectName: subject, topic: 'Core Concepts', count: 10 },
        },
      };
    }

    // Quiz prompt
    if (msg.includes('quiz me') || (msg.includes('quiz') && msg.includes('test'))) {
      const subject = context?.currentSubject || 'Operating Systems';
      return {
        response: `🎯 Let's test your active recall on **${subject}**! I have prepared a diagnostic assessment with mixed question types (Multiple Choice, True/False, and Multi-Answer).\n\nFocus on rationale rather than speed. Ready to begin?`,
        suggestedAction: {
          type: 'create_quiz',
          label: `Launch Diagnostic Quiz on ${subject}`,
          payload: { subjectName: subject, topic: 'General Diagnostic', count: 5 },
        },
      };
    }

    // Quiz mistakes prompt
    if (msg.includes('mistake') || msg.includes('wrong') || msg.includes('error')) {
      return {
        response: `🔍 **Diagnostic Review of Recent Mistakes:**\n\n1. **SQL Joins - Cartesian Products:**\n   - *Mistake*: Assuming a \`FULL OUTER JOIN ON 1=1\` yields A + B rows.\n   - *Correction*: When the ON condition is always TRUE, every row in A pairs with every row in B. You get A × B (Cartesian Product) rows!\n\n2. **HAVING vs WHERE:**\n   - Remember: \`WHERE\` filters records *before* \`GROUP BY\` aggregation happens. \`HAVING\` filters aggregated summaries *after* the groups are formed.\n\nWould you like me to schedule a 25-minute Pomodoro focus session to solidify SQL join mechanics?`,
        suggestedAction: {
          type: 'start_pomodoro',
          label: 'Start 25m Focus on SQL Joins',
          payload: { subjectName: 'DBMS', topic: 'SQL Joins' },
        },
      };
    }

    // Study plan prompt
    if (msg.includes('study plan') || msg.includes('7-day') || msg.includes('schedule')) {
      return {
        response: `📅 **Personalized 7-Day Mastery Plan:**\n\n* **Day 1 (Mon)**: *Data Structures* - AVL Rotations & Balancing (2x 25m Pomodoros + 10 Flashcards)\n* **Day 2 (Tue)**: *DBMS* - SQL Outer Joins & Anti-Joins (1x 25m Focus + Diagnostic Quiz)\n* **Day 3 (Wed)**: *Operating Systems* - Deadlock Avoidance & Banker's Algorithm\n* **Day 4 (Thu)**: *Computer Networks* - TCP 3-Way Handshake & Congestion Windows\n* **Day 5 (Fri)**: *DBMS Remedial* - Re-test SQL Joins & B+ Tree Indexes\n* **Day 6 (Sat)**: *Comprehensive Review* - 50 Spaced Repetition Cards due this week\n* **Day 7 (Sun)**: *Mock Diagnostic* - Full timed quiz simulation + Streaks update\n\nTargeting 45 mins/day will easily preserve your 12-day streak and earn +400 XP!`,
      };
    }

    // Default intelligent response
    return {
      response: `I'm **Cogniva AI**, your intelligent learning co-pilot. I analyze your quiz accuracies, flashcard intervals, and study time across your 5 enrolled subjects.\n\n**Here are a few ways I can help right now:**\n- 💡 Break down complex theorems or algorithms into plain English\n- ⚡ Generate interactive quiz questions or active-recall flashcards\n- 🎯 Diagnose your recent test errors and formulate remedial drills\n- ⏱️ Launch a focused Pomodoro block tailored to your weakest topic (${context?.weakTopics?.[0] || 'SQL Joins'})`,
    };
  }
}

export const aiService = new AIService();
