import { SubjectMark, StudentExamResult } from '../types';

export interface GradeRule {
  minMarks: number;
  maxMarks: number;
  grade: string;
  gpa: number;
}

export const DEFAULT_GRADING_RULES: GradeRule[] = [
  { minMarks: 80, maxMarks: 100, grade: 'A+', gpa: 5.0 },
  { minMarks: 70, maxMarks: 79, grade: 'A', gpa: 4.0 },
  { minMarks: 60, maxMarks: 69, grade: 'A-', gpa: 3.5 },
  { minMarks: 50, maxMarks: 59, grade: 'B', gpa: 3.0 },
  { minMarks: 40, maxMarks: 49, grade: 'C', gpa: 2.0 },
  { minMarks: 33, maxMarks: 39, grade: 'D', gpa: 1.0 },
  { minMarks: 0, maxMarks: 32, grade: 'F', gpa: 0.0 },
];

/**
 * Returns letter grade and GPA for a given score (0-100)
 */
export function getSubjectGradeAndGpa(
  score: number,
  rules: GradeRule[] = DEFAULT_GRADING_RULES
): { grade: string; gpa: number; isPassed: boolean } {
  const normalized = Math.min(100, Math.max(0, Math.round(score)));
  for (const rule of rules) {
    if (normalized >= rule.minMarks && normalized <= rule.maxMarks) {
      return {
        grade: rule.grade,
        gpa: rule.gpa,
        isPassed: rule.grade !== 'F' && rule.gpa > 0,
      };
    }
  }
  return { grade: 'F', gpa: 0.0, isPassed: false };
}

/**
 * Converts average GPA (0 - 5.0) back to overall letter grade
 */
export function getGradeFromGpa(gpa: number): string {
  if (gpa >= 5.0) return 'A+';
  if (gpa >= 4.0) return 'A';
  if (gpa >= 3.5) return 'A-';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.0) return 'C';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

/**
 * Calculates a complete StudentExamResult from raw subject marks.
 * Applies strict failure policy: if any subject has isPassed === false, overall GPA is 0.00 and grade is 'F'.
 */
export function calculateExamResult(
  examId: string,
  examName: string,
  studentId: string,
  studentName: string,
  classId: string,
  section: string,
  roll: string,
  rawMarks: Record<string, number>,
  published: boolean = true
): StudentExamResult {
  const subjects = Object.keys(rawMarks);
  const subjectMarks: SubjectMark[] = subjects.map((subject) => {
    const marks = rawMarks[subject] ?? 0;
    const { grade, gpa, isPassed } = getSubjectGradeAndGpa(marks);
    return {
      subject,
      marks,
      fullMarks: 100,
      passMarks: 33,
      grade,
      gpa,
      isPassed,
    };
  });

  const totalMarks = subjectMarks.reduce((acc, curr) => acc + curr.marks, 0);
  const totalFullMarks = subjectMarks.length * 100;
  const percentage = totalFullMarks > 0 ? Number(((totalMarks / totalFullMarks) * 100).toFixed(2)) : 0;

  const hasFailedSubject = subjectMarks.some((sm) => !sm.isPassed);

  let gpa = 0;
  let grade = 'F';
  let isPassed = false;

  if (subjectMarks.length > 0 && !hasFailedSubject) {
    const rawGpaSum = subjectMarks.reduce((acc, curr) => acc + curr.gpa, 0);
    gpa = Number((rawGpaSum / subjectMarks.length).toFixed(2));
    grade = getGradeFromGpa(gpa);
    isPassed = true;
  }

  let remarks = 'Needs substantial improvement';
  if (gpa >= 4.5) remarks = 'Outstanding Academic Performance';
  else if (gpa >= 4.0) remarks = 'Excellent performance, keep it up';
  else if (gpa >= 3.5) remarks = 'Very good, room for further growth';
  else if (gpa >= 3.0) remarks = 'Satisfactory, focus on weaker subjects';
  else if (!isPassed) remarks = 'Failed in one or more subjects. Supplemental required';

  return {
    examId,
    examName,
    studentId,
    studentName,
    classId,
    section,
    roll,
    subjectMarks,
    totalMarks,
    totalFullMarks,
    percentage,
    gpa,
    grade,
    isPassed,
    published,
    remarks,
  };
}

/**
 * Assigns merit positions to a list of results (sorted descending by GPA, then by totalMarks)
 */
export function assignMeritPositions(results: StudentExamResult[]): StudentExamResult[] {
  // Sort passed students first by GPA desc, then totalMarks desc
  // Failed students get ranked at the bottom by totalMarks
  const sorted = [...results].sort((a, b) => {
    if (a.isPassed !== b.isPassed) {
      return a.isPassed ? -1 : 1;
    }
    if (b.gpa !== a.gpa) {
      return b.gpa - a.gpa;
    }
    return b.totalMarks - a.totalMarks;
  });

  return sorted.map((res, index) => ({
    ...res,
    meritPosition: res.isPassed ? index + 1 : undefined,
  }));
}

/**
 * Calculates attendance statistics
 */
export function calculateAttendanceStats(statuses: ('present' | 'absent' | 'late' | 'leave')[]) {
  const total = statuses.length;
  if (total === 0) return { total: 0, present: 0, absent: 0, late: 0, leave: 0, rate: 0 };

  const present = statuses.filter((s) => s === 'present').length;
  const late = statuses.filter((s) => s === 'late').length;
  const leave = statuses.filter((s) => s === 'leave').length;
  const absent = statuses.filter((s) => s === 'absent').length;

  // Standard educational metric: present + late counts as attended
  const rate = Number((((present + late) / total) * 100).toFixed(1));

  return { total, present, absent, late, leave, rate };
}
