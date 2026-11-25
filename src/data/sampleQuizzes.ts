import { Quiz } from '../types/quiz';

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'cs-fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Master core concepts of Operating Systems, Data Structures, Computer Architecture, and Networking.',
    subject: 'Computer Science',
    durationMinutes: 15,
    totalMarks: 20,
    passingPercentage: 60,
    difficulty: 'Beginner',
    createdAt: '2026-03-01',
    author: 'Prof. Rajesh Sharma',
    questions: [
      {
        id: 'cs-q1',
        question: 'Which of the following time complexities represents the average case of searching in a balanced Binary Search Tree (BST)?',
        type: 'multiple-choice',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'In a balanced binary search tree (like AVL or Red-Black Tree), each comparison halves the search space, giving an average and worst-case time complexity of O(log n).'
      },
      {
        id: 'cs-q2',
        question: 'Which of the following conditions are necessary for a Deadlock to occur in an operating system?',
        type: 'multiple-select',
        options: [
          'Mutual Exclusion',
          'Hold and Wait',
          'Preemption Allowed',
          'Circular Wait'
        ],
        correctAnswers: [0, 1, 3],
        marks: 2,
        explanation: 'Coffman conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (preemption NOT allowed), 4. Circular Wait.'
      },
      {
        id: 'cs-q3',
        question: 'True or False: In a Stack data structure, the element inserted first is the first element to be removed (FIFO).',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'False. A Stack follows LIFO (Last In, First Out). A Queue follows FIFO (First In, First Out).'
      },
      {
        id: 'cs-q4',
        question: 'What protocol operates at the Transport Layer of the OSI model and provides reliable, connection-oriented byte-stream delivery?',
        type: 'multiple-choice',
        options: ['UDP (User Datagram Protocol)', 'IP (Internet Protocol)', 'TCP (Transmission Control Protocol)', 'HTTP (Hypertext Transfer Protocol)'],
        correctAnswers: [2],
        marks: 2,
        explanation: 'TCP operates at the Transport Layer (Layer 4) and provides reliable, connection-oriented data transmission using a three-way handshake and acknowledgments.'
      },
      {
        id: 'cs-q5',
        question: 'In database management systems, what does the "I" stand for in the ACID properties acronym?',
        type: 'multiple-choice',
        options: ['Integrity', 'Isolation', 'Indexability', 'Immutability'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures concurrent transactions do not interfere with one another.'
      },
      {
        id: 'cs-q6',
        question: 'Which type of memory is the fastest and closest to the CPU processor registers?',
        type: 'multiple-choice',
        options: ['L1 Cache', 'L3 Cache', 'Main Memory (RAM)', 'Solid State Drive (SSD)'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'L1 Cache is built directly into each CPU core and has the lowest latency (typically 1-4 clock cycles), faster than L2/L3 cache and system RAM.'
      },
      {
        id: 'cs-q7',
        question: 'Which of the following data structures can be used to implement Breadth-First Search (BFS) in a graph?',
        type: 'multiple-choice',
        options: ['Stack', 'Queue', 'Priority Queue', 'Disjoint Set'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'BFS explores vertices level by level using a Queue (FIFO). DFS typically uses a Stack (or function recursion stack).'
      },
      {
        id: 'cs-q8',
        question: 'Which of the following are valid components of the CPU (Central Processing Unit)?',
        type: 'multiple-select',
        options: [
          'Arithmetic Logic Unit (ALU)',
          'Control Unit (CU)',
          'Instruction Register (IR)',
          'Hard Disk Controller'
        ],
        correctAnswers: [0, 1, 2],
        marks: 2,
        explanation: 'The CPU contains the ALU, Control Unit, and internal Registers (like IR and Program Counter). The hard disk controller is an external I/O controller.'
      },
      {
        id: 'cs-q9',
        question: 'True or False: Virtual memory allows execution of processes whose memory requirements exceed physical RAM through paging or segmentation.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'True. Virtual memory maps virtual addresses to physical pages and uses secondary storage swap space to run programs larger than available physical RAM.'
      },
      {
        id: 'cs-q10',
        question: 'What is the worst-case time complexity of QuickSort when a naive pivot (e.g., always picking the first element on an already sorted array) is chosen?',
        type: 'multiple-choice',
        options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'],
        correctAnswers: [3],
        marks: 2,
        explanation: 'When the partition is consistently unbalanced (e.g. 0 elements vs n-1 elements), QuickSort degenerates into O(n²) comparisons.'
      }
    ]
  },
  {
    id: 'programming-in-c',
    title: 'Programming in C',
    description: 'Test your understanding of pointers, dynamic memory allocation, control flow, functions, and structs in C.',
    subject: 'Programming in C',
    durationMinutes: 20,
    totalMarks: 20,
    passingPercentage: 60,
    difficulty: 'Intermediate',
    createdAt: '2026-03-05',
    author: 'Prof. Rajesh Sharma',
    questions: [
      {
        id: 'c-q1',
        question: 'What will be the output of the following C code snippet?',
        codeSnippet: `#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40};
    int *ptr = arr;
    printf("%d", *(ptr + 2));
    return 0;
}`,
        type: 'multiple-choice',
        options: ['10', '20', '30', '40'],
        correctAnswers: [2],
        marks: 2,
        explanation: '`arr` decays to a pointer to the first element (index 0). Pointer arithmetic `ptr + 2` moves 2 integer widths forward to `arr[2]`, which has value 30.'
      },
      {
        id: 'c-q2',
        question: 'Which standard library function in `<stdlib.h>` allocates memory and initializes all allocated bytes to zero?',
        type: 'multiple-choice',
        options: ['malloc()', 'calloc()', 'realloc()', 'free()'],
        correctAnswers: [1],
        marks: 2,
        explanation: '`calloc(num_elements, element_size)` allocates memory and clears all bits to 0. `malloc()` leaves allocated memory uninitialized (garbage values).'
      },
      {
        id: 'c-q3',
        question: 'True or False: In C, strings are represented as null-terminated character arrays ending with the byte `\\0`.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'True. In C, standard strings are sequences of `char` terminated by the null character `\\0` (ASCII 0).'
      },
      {
        id: 'c-q4',
        question: 'What is the output of the following bitwise operation in C?',
        codeSnippet: `#include <stdio.h>
int main() {
    int a = 5; // Binary: 0101
    int b = 3; // Binary: 0011
    printf("%d", a ^ b);
    return 0;
}`,
        type: 'multiple-choice',
        options: ['2', '6', '7', '15'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'The `^` operator is bitwise XOR: 0101 XOR 0011 = 0110 in binary, which is decimal 6.'
      },
      {
        id: 'c-q5',
        question: 'Which of the following are valid storage classes in C?',
        type: 'multiple-select',
        options: ['auto', 'register', 'static', 'dynamic'],
        correctAnswers: [0, 1, 2],
        marks: 2,
        explanation: 'The four storage classes in C are `auto`, `register`, `static`, and `extern`. `dynamic` is not a C storage class keyword.'
      },
      {
        id: 'c-q6',
        question: 'What is the return type of the `malloc()` function in C?',
        type: 'multiple-choice',
        options: ['int *', 'void *', 'char *', 'size_t'],
        correctAnswers: [1],
        marks: 2,
        explanation: '`malloc()` returns a generic pointer of type `void *` representing the starting memory address, which can be implicitly converted to any pointer type.'
      },
      {
        id: 'c-q7',
        question: 'What does this recursive function return when called with `f(4)`?',
        codeSnippet: `int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}`,
        type: 'multiple-choice',
        options: ['10', '16', '24', '120'],
        correctAnswers: [2],
        marks: 2,
        explanation: 'This computes factorial: 4! = 4 * 3 * 2 * 1 = 24.'
      },
      {
        id: 'c-q8',
        question: 'True or False: In a C `union`, all members share the same contiguous memory location, and the size of the union is the size of its largest member.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'True. Unlike a struct where each member has distinct memory offsets, all union members overlap in memory, so only one member can be stored meaningfully at a time.'
      },
      {
        id: 'c-q9',
        question: 'Which header file must be included to use the `strlen()` and `strcpy()` functions?',
        type: 'multiple-choice',
        options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<ctype.h>'],
        correctAnswers: [2],
        marks: 2,
        explanation: '`<string.h>` declares C string manipulation functions such as `strlen`, `strcpy`, `strcat`, `strcmp`, and `memset`.'
      },
      {
        id: 'c-q10',
        question: 'Which of the following will cause a compile-time or runtime error regarding pointer dereferencing?',
        type: 'multiple-select',
        options: [
          'Dereferencing a NULL pointer',
          'Accessing memory after it has been freed (dangling pointer)',
          'Declaring a pointer without immediately assigning it',
          'Dereferencing a void pointer without typecasting'
        ],
        correctAnswers: [0, 1, 3],
        marks: 2,
        explanation: 'Dereferencing NULL triggers a segmentation fault; accessing freed memory is undefined behavior/crash; dereferencing a void pointer directly is a compilation error in standard C because void has no size. Simply declaring an unassigned pointer is legal syntax.'
      }
    ]
  },
  {
    id: 'ai-basics',
    title: 'Artificial Intelligence Basics',
    description: 'Explore fundamental AI principles: search algorithms, heuristic evaluation, machine learning paradigms, and neural networks.',
    subject: 'Artificial Intelligence',
    durationMinutes: 15,
    totalMarks: 20,
    passingPercentage: 60,
    difficulty: 'Beginner',
    createdAt: '2026-03-08',
    author: 'Prof. Rajesh Sharma',
    questions: [
      {
        id: 'ai-q1',
        question: 'Which heuristic search algorithm evaluates nodes by combining the path cost g(n) and the estimated cost to the goal h(n): f(n) = g(n) + h(n)?',
        type: 'multiple-choice',
        options: ['Depth-First Search (DFS)', 'A* Search', 'Greedy Best-First Search', 'Breadth-First Search (BFS)'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'A* search uses f(n) = g(n) + h(n). If the heuristic h(n) is admissible (never overestimates), A* is guaranteed to find an optimal path.'
      },
      {
        id: 'ai-q2',
        question: 'Which of the following are examples of Supervised Learning tasks?',
        type: 'multiple-select',
        options: [
          'Email Spam Classification (Spam vs Not Spam)',
          'House Price Prediction using historical sales data',
          'K-Means Customer Segmentation without pre-existing labels',
          'Handwritten Digit Recognition with labeled MNIST images'
        ],
        correctAnswers: [0, 1, 3],
        marks: 2,
        explanation: 'Supervised learning uses labeled pairs (input, ground-truth target). K-Means clustering is unsupervised learning because it operates on unlabeled data.'
      },
      {
        id: 'ai-q3',
        question: 'True or False: A heuristic function is called "admissible" if it never underestimates the true cost to reach the goal state.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'True. In AI search theory, an admissible heuristic h(n) <= h*(n) for all n, meaning it never overestimates the actual minimal cost to the nearest goal.'
      },
      {
        id: 'ai-q4',
        question: 'What is the primary function of the ReLU (Rectified Linear Unit) activation function in artificial neural networks?',
        type: 'multiple-choice',
        options: [
          'It maps any real number strictly into the range [0, 1]',
          'It returns max(0, x), introducing non-linearity while mitigating vanishing gradients',
          'It normalizes outputs into a probability distribution summing to 1',
          'It scales weights using L2 regularization'
        ],
        correctAnswers: [1],
        marks: 2,
        explanation: 'ReLU is defined as f(x) = max(0, x). Its constant gradient of 1 for positive values helps prevent the vanishing gradient problem during backpropagation.'
      },
      {
        id: 'ai-q5',
        question: 'What phenomenon occurs when a machine learning model learns training data noise too closely and fails to generalize to unseen test data?',
        type: 'multiple-choice',
        options: ['Underfitting', 'Overfitting', 'Data Augmentation', 'Feature Scaling'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'Overfitting happens when a model is overly complex relative to the data, achieving very low training error but high test/validation error.'
      },
      {
        id: 'ai-q6',
        question: 'Which of the following techniques are commonly used to prevent overfitting in Machine Learning models?',
        type: 'multiple-select',
        options: [
          'Cross-validation',
          'L1 / L2 Regularization',
          'Dropout in Deep Neural Networks',
          'Increasing model parameters arbitrarily without more data'
        ],
        correctAnswers: [0, 1, 2],
        marks: 2,
        explanation: 'Cross-validation, L1/L2 weight penalties, early stopping, and Dropout all constrain model complexity to curb overfitting. Increasing parameters without data worsens overfitting.'
      },
      {
        id: 'ai-q7',
        question: 'In 1950, who proposed the "Imitation Game" benchmark test to assess whether a machine can exhibit intelligent behavior indistinguishable from that of a human?',
        type: 'multiple-choice',
        options: ['John McCarthy', 'Alan Turing', 'Marvin Minsky', 'Claude Shannon'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'Alan Turing introduced the Turing Test in his seminal 1950 paper "Computing Machinery and Intelligence".'
      },
      {
        id: 'ai-q8',
        question: 'True or False: In Reinforcement Learning, the agent learns an optimal policy through trial-and-error interactions guided by rewards and penalties.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'True. In RL, an agent perceives environment state, takes actions, and receives scalar feedback (rewards or penalties) to maximize cumulative return.'
      },
      {
        id: 'ai-q9',
        question: 'Which evaluation metric represents the ratio of correctly predicted positive observations to total predicted positive observations (TP / (TP + FP))?',
        type: 'multiple-choice',
        options: ['Precision', 'Recall (Sensitivity)', 'Specificity', 'Accuracy'],
        correctAnswers: [0],
        marks: 2,
        explanation: 'Precision = TP / (TP + FP). Recall = TP / (TP + FN).'
      },
      {
        id: 'ai-q10',
        question: 'What algorithm is universally used in multi-layer perceptrons to compute gradients of the loss function with respect to weights via the chain rule?',
        type: 'multiple-choice',
        options: ['Minimax Search', 'Backpropagation', 'Simulated Annealing', 'Expectation-Maximization'],
        correctAnswers: [1],
        marks: 2,
        explanation: 'Backpropagation applies the calculus chain rule recursively backwards through network layers to calculate partial derivatives of loss with respect to all weights.'
      }
    ]
  }
];
