// // service.js
// export async function askQuestions({ extractedText, pattern }) {
//   const message = `
// You are a question paper generator. Based on the following text, generate questions.
// Use the pattern, important note arrange the question foramt corrtly give like  profeestional question format leva some space between question num and question and make quistion comes in correct line format

//  "${pattern}":
// ${extractedText}
// if Pattern  Semester End Examination (SEE)
// Time: 3 Hours
// Total Marks: 100

// Instructions:

// Answer all questions from Section A.

// Answer one full question from each of the five questions in Section B.

// Draw neat diagrams wherever necessary.

// SECTION - A
// (Answer ALL questions)

// Q1. Very short answer type question. (2 Marks)
// Q2. Very short answer type question. (2 Marks)
// Q3. Very short answer type question. (2 Marks)
// Q4. Very short answer type question. (2 Marks)
// Q5. Very short answer type question. (2 Marks)
// Q6. Very short answer type question. (2 Marks)
// Q7. Very short answer type question. (2 Marks)
// Q8. Very short answer type question. (2 Marks)
// Q9. Very short answer type question. (2 Marks)
// Q10. Very short answer type question. (2 Marks)

// SECTION - B
// (Answer any ONE full question from each of the five questions: Q11, Q12, Q13, Q14, Q15)

// Q11.
// a) First sub-question, e.g., a theory or a short problem.
// OR
// b) Second sub-question, an alternative to part (a).
// (16 Marks)

// Q12.
// a) First sub-question.
// OR
// b) Second sub-question.
// (16 Marks)

// Q13.
// a) First sub-question.
// OR
// b) Second sub-question.
// (16 Marks)

// Q14.
// a) First sub-question.
// OR
// b) Second sub-question.
// (16 Marks)

// Q15.
// a) A more complex sub-question, potentially with further parts like (i) and (ii).
// OR
// b) Another complex sub-question as an alternative.
// (16 Marks)

// Total Marks: Section A (20) + Section B (80) = 100 Marks

// If pattern is Sessional:

// Time: 2 Hours
// Total Marks: 50

// Instructions:

// Answer all questions from Section A.

// Answer all questions from Section B.

// Draw neat diagrams wherever necessary.

// SECTION - A
// (Answer ALL questions)

// Q1. Very short answer type question. (2 Marks)
// Q2. Very short answer type question. (2 Marks)
// Q3. Very short answer type question. (2 Marks)
// Q4. Very short answer type question. (2 Marks)
// Q5. Very short answer type question. (2 Marks)

// SECTION - B
// (Answer ALL questions)

// Q6. A long, comprehensive question requiring detailed explanation, derivation, or a large problem. (16 Marks)

// Q7. A long, comprehensive question requiring detailed explanation, derivation, or a large problem. (16 Marks)

// Q8. A moderately long question, shorter than Q6 or Q7. (8 Marks)

// Total Marks: Section A (10) + Section B (40) = 50 Marks

// `;

//   const res = await fetch("http://localhost:5000/ask", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message }),
//   });

//   return res.json();
// }
export async function askQuestions({ extractedText, pattern, difficulty }) {
const message = `
You are a question paper generator. Use the following pattern: ${pattern}
Subject Content: ${extractedText}

Instructions:

1. For each question, generate content strictly according to the difficulty level specified:
${Object.entries(difficulty).map(([q, lvl]) => `${q}: ${lvl}`).join("\n")}

2. Do NOT generate any questions outside the content of the subject. Use only the provided text.

3. Do NOT include any stars, asterisks, or other symbols (like *, **, #) in your output.

4. Maintain proper question paper formatting, including sections, numbering, and marks aligned to the right.
5. Dont leave line gap for instruction section
6. for bold letter put those letter inside $ so react can recogonize
7. Follow these exact patterns:
// 8.dont bold the headline
-- If Pattern is Semester End Examination (SEE) --
Name of Subject
Time: 3 Hours
Total Marks: 100

Instructions:
- Answer all questions from Section A.
- Answer one full question from each of the five questions in Section B.
- Draw neat diagrams wherever necessary.

SECTION - A
(Answer ALL questions)
Q1. Very short answer type question. (2 Marks)
Q2. Very short answer type question. (2 Marks)
Q3. Very short answer type question. (2 Marks)
Q4. Very short answer type question. (2 Marks)
Q5. Very short answer type question. (2 Marks)
Q6. Very short answer type question. (2 Marks)
Q7. Very short answer type question. (2 Marks)
Q8. Very short answer type question. (2 Marks)
Q9. Very short answer type question. (2 Marks)
Q10. Very short answer type question. (2 Marks)

SECTION - B
(Answer any ONE full question from each of the five questions: Q11, Q12, Q13, Q14, Q15)
Q11.
a) First sub-question (theory or short problem)
OR
b) Second sub-question (alternative)
(16 Marks)
Q12.
a) First sub-question
OR
b) Second sub-question
(16 Marks)
Q13.
a) First sub-question
OR
b) Second sub-question
(16 Marks)
Q14.
a) First sub-question
OR
b) Second sub-question
(16 Marks)
Q15.
a) More complex sub-question with further parts
OR
b) Another complex sub-question as alternative
(16 Marks)

Total Marks: Section A (20) + Section B (80) = 100

-- If Pattern is Sessional/Internal Examination --
Name of Subject
Time: 2 Hours
Total Marks: 50

Instructions:
  Answer all questions from Section A.
  Answer all questions from Section B.
  Draw neat diagrams wherever necessary.

SECTION - A
(Answer ALL questions)
Q1. Question (2 Marks)
Q2. Question (2 Marks)
Q3. Question (2 Marks)
Q4. Question (2 Marks)
Q5. Question (2 Marks)

SECTION - B
(Answer ALL questions)
Q6. Long, comprehensive question (16 Marks)
Q7. Long, comprehensive question (16 Marks)
Q8. Moderately long question (8 Marks)

Total Marks: Section A (10) + Section B (40) = 50 Marks

Format your output exactly according to the chosen pattern: maintain sections, numbering, marks aligned to the right, and no extra symbols. Each question's marks must appear at the far right. Keep all formatting consistent with a standard question paper.
`;


  const res = await fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}
