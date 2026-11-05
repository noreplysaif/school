export type UserRole =
  | 'super_admin'
  | 'principal'
  | 'admin'
  | 'teacher'
  | 'accountant'
  | 'librarian'
  | 'student'
  | 'parent';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  relatedId?: string; // studentId or teacherId or parentId
  studentIds?: string[]; // for parents with multiple children
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export interface Student {
  id: string; // e.g. STU-2026-001
  name: string;
  classId: string; // e.g. '10'
  section: string; // e.g. 'Science' or 'A'
  roll: string; // e.g. '01'
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  address: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'transferred';
  photoUrl: string;
  attendanceRate?: number;
}

export interface Teacher {
  id: string; // e.g. TCH-001
  name: string;
  subject: string;
  email: string;
  phone: string;
  designation: string;
  qualification: string;
  joiningDate: string;
  assignedClasses: string[]; // e.g. ['Class 10 - Science', 'Class 9 - Science']
  status: 'active' | 'on_leave';
  photoUrl: string;
}

export interface ClassSubject {
  id: string;
  name: string;
  code: string;
  fullMarks: number;
  passMarks: number;
}

export interface SchoolClass {
  id: string; // '10'
  name: string; // 'Class 10'
  sections: string[]; // ['Science', 'Humanities']
  classTeacher?: string;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string; // YYYY-MM-DD_classId_section
  date: string; // YYYY-MM-DD
  classId: string;
  section: string;
  markedBy: string; // teacher id or admin
  records: {
    [studentId: string]: AttendanceStatus;
  };
}

export interface SubjectMark {
  subject: string;
  marks: number;
  fullMarks: number;
  passMarks: number;
  grade: string;
  gpa: number;
  isPassed: boolean;
}

export interface StudentExamResult {
  examId: string;
  examName: string;
  studentId: string;
  studentName: string;
  classId: string;
  section: string;
  roll: string;
  subjectMarks: SubjectMark[];
  totalMarks: number;
  totalFullMarks: number;
  percentage: number;
  gpa: number;
  grade: string;
  isPassed: boolean;
  meritPosition?: number;
  published: boolean;
  remarks?: string;
}

export interface Examination {
  id: string; // e.g. 'EXAM-2026-TERM1'
  name: string; // 'First Term Examination 2026'
  classId: string;
  session: string; // '2026'
  startDate: string;
  endDate: string;
  status: 'draft' | 'ongoing' | 'published';
  subjects: string[];
}

export interface AdmissionApplication {
  id: string; // ADM-2026-101
  studentName: string;
  appliedClass: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  prevSchool?: string;
  prevGpa?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  notes?: string;
  assignedStudentId?: string;
}

export interface FeeCategory {
  id: string;
  name: string;
  amount: number;
  type: 'monthly' | 'one_time' | 'term';
}

export interface FeeInvoice {
  id: string; // INV-2026-001
  studentId: string;
  studentName: string;
  classId: string;
  title: string; // e.g. 'Tuition Fee - March 2026'
  amount: number;
  discount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Paid' | 'Partially Paid' | 'Unpaid';
  dueDate: string;
  paymentMethod?: 'bKash' | 'Nagad' | 'SSLCommerz' | 'Cash' | 'Bank';
  paymentDate?: string;
  transactionId?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}

export interface BookBorrow {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  fine: number;
}

export interface HomeworkSubmission {
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachmentName?: string;
  marks?: number;
  feedback?: string;
  status: 'submitted' | 'graded';
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  classId: string;
  section: string;
  teacherId: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  attachmentUrl?: string;
  submissions: HomeworkSubmission[];
}

export interface SchoolNotice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Administrative' | 'Sports' | 'Holiday' | 'Exam';
  audience: 'all' | 'students' | 'teachers' | 'parents' | 'class';
  targetClass?: string;
  date: string;
  isPinned: boolean;
  priority: 'normal' | 'high';
}

export interface SchoolEvent {
  id: string;
  title: string;
  category: 'exam' | 'holiday' | 'sports' | 'cultural' | 'academic';
  date: string;
  endDate?: string;
  description: string;
  location: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  details: string;
}

export interface ClassRoutineSlot {
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  time: string;
  subject: string;
  teacherName: string;
  room: string;
}
