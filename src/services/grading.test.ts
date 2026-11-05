import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSubjectGradeAndGpa,
  getGradeFromGpa,
  calculateExamResult,
  assignMeritPositions,
  calculateAttendanceStats,
} from './grading.js';

test('getSubjectGradeAndGpa maps boundary marks correctly', () => {
  assert.deepEqual(getSubjectGradeAndGpa(95), { grade: 'A+', gpa: 5.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(80), { grade: 'A+', gpa: 5.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(75), { grade: 'A', gpa: 4.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(65), { grade: 'A-', gpa: 3.5, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(55), { grade: 'B', gpa: 3.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(45), { grade: 'C', gpa: 2.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(35), { grade: 'D', gpa: 1.0, isPassed: true });
  assert.deepEqual(getSubjectGradeAndGpa(32), { grade: 'F', gpa: 0.0, isPassed: false });
  assert.deepEqual(getSubjectGradeAndGpa(0), { grade: 'F', gpa: 0.0, isPassed: false });
});

test('calculateExamResult calculates GPA and honors failure policy', () => {
  // All passed
  const passingMarks = {
    Bangla: 85, // A+ 5.0
    English: 78, // A 4.0
    Mathematics: 95, // A+ 5.0
    Physics: 89, // A+ 5.0
    Chemistry: 86, // A+ 5.0
    ICT: 94, // A+ 5.0
  };
  const passedRes = calculateExamResult(
    'EXAM-1',
    'First Term',
    'STU-001',
    'Arif Hossain',
    '10',
    'Science',
    '01',
    passingMarks
  );

  assert.equal(passedRes.isPassed, true);
  assert.equal(passedRes.totalMarks, 527);
  // Avg GPA = (5 + 4 + 5 + 5 + 5 + 5) / 6 = 29 / 6 = 4.83
  assert.equal(passedRes.gpa, 4.83);
  assert.equal(passedRes.grade, 'A');

  // One subject failed (Math = 25)
  const failingMarks = {
    Bangla: 80,
    English: 70,
    Mathematics: 25, // FAIL
    Physics: 75,
  };
  const failedRes = calculateExamResult(
    'EXAM-1',
    'First Term',
    'STU-002',
    'Test Student',
    '10',
    'Science',
    '02',
    failingMarks
  );

  assert.equal(failedRes.isPassed, false);
  assert.equal(failedRes.gpa, 0.0);
  assert.equal(failedRes.grade, 'F');
});

test('assignMeritPositions ranks passed students ahead of failed and orders by GPA / totalMarks', () => {
  const r1 = calculateExamResult('E1', 'Exam', 'S1', 'Student 1', '10', 'A', '1', {
    Bangla: 90,
    English: 90,
  }); // GPA 5.0, total 180
  const r2 = calculateExamResult('E1', 'Exam', 'S2', 'Student 2', '10', 'A', '2', {
    Bangla: 80,
    English: 80,
  }); // GPA 5.0, total 160
  const r3 = calculateExamResult('E1', 'Exam', 'S3', 'Student 3', '10', 'A', '3', {
    Bangla: 70,
    English: 70,
  }); // GPA 4.0, total 140
  const rFail = calculateExamResult('E1', 'Exam', 'S4', 'Student 4', '10', 'A', '4', {
    Bangla: 95,
    English: 20,
  }); // Failed

  const ranked = assignMeritPositions([r3, rFail, r1, r2]);

  assert.equal(ranked[0].studentId, 'S1');
  assert.equal(ranked[0].meritPosition, 1);

  assert.equal(ranked[1].studentId, 'S2');
  assert.equal(ranked[1].meritPosition, 2);

  assert.equal(ranked[2].studentId, 'S3');
  assert.equal(ranked[2].meritPosition, 3);

  assert.equal(ranked[3].studentId, 'S4');
  assert.equal(ranked[3].isPassed, false);
  assert.equal(ranked[3].meritPosition, undefined);
});

test('calculateAttendanceStats calculates correct percentages', () => {
  const stats = calculateAttendanceStats(['present', 'present', 'present', 'late', 'absent']);
  assert.equal(stats.total, 5);
  assert.equal(stats.present, 3);
  assert.equal(stats.late, 1);
  assert.equal(stats.absent, 1);
  assert.equal(stats.rate, 80.0); // (3 + 1)/5 = 80%
});
