import {
  Student,
  Teacher,
  SchoolClass,
  AttendanceRecord,
  StudentExamResult,
  Examination,
  AdmissionApplication,
  FeeInvoice,
  Book,
  BookBorrow,
  Homework,
  SchoolNotice,
  SchoolEvent,
  AuditLog,
  ClassRoutineSlot,
  UserAccount,
} from '../types';
import { calculateExamResult, assignMeritPositions } from './grading';

const STORAGE_KEY = 'edunexus_db_v1';

export interface AppDatabase {
  students: Student[];
  teachers: Teacher[];
  classes: SchoolClass[];
  attendance: AttendanceRecord[];
  examinations: Examination[];
  examResults: StudentExamResult[];
  admissions: AdmissionApplication[];
  invoices: FeeInvoice[];
  books: Book[];
  borrows: BookBorrow[];
  homeworks: Homework[];
  notices: SchoolNotice[];
  events: SchoolEvent[];
  auditLogs: AuditLog[];
  routines: Record<string, ClassRoutineSlot[]>; // classId -> slots
  userAccounts: UserAccount[];
}

// Initial deterministic seed data according to user specification
export function getInitialSeedData(): AppDatabase {
  const classes: SchoolClass[] = [
    { id: '6', name: 'Class 6', sections: ['A', 'B'], subjects: ['Bangla', 'English', 'Mathematics', 'General Science', 'ICT', 'Religion and Moral Education'] },
    { id: '7', name: 'Class 7', sections: ['A'], subjects: ['Bangla', 'English', 'Mathematics', 'General Science', 'ICT', 'Bangladesh and Global Studies'] },
    { id: '8', name: 'Class 8', sections: ['A'], subjects: ['Bangla', 'English', 'Mathematics', 'General Science', 'ICT', 'Bangladesh and Global Studies', 'Religion and Moral Education'] },
    { id: '9', name: 'Class 9', sections: ['Science', 'Business Studies'], subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT', 'Accounting', 'Business Entrepreneurship'] },
    { id: '10', name: 'Class 10', sections: ['Science', 'Humanities'], subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT', 'Bangladesh and Global Studies'] },
  ];

  const teachers: Teacher[] = [
    {
      id: 'TCH-001',
      name: 'Rahim Ahmed',
      subject: 'Mathematics',
      email: 'rahim.ahmed@greenfield.edu.bd',
      phone: '+880 1711-100200',
      designation: 'Senior Teacher & Head of Dept',
      qualification: 'M.Sc. in Applied Mathematics (DU)',
      joiningDate: '2016-03-15',
      assignedClasses: ['Class 10 - Science', 'Class 9 - Science', 'Class 8 - A'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'TCH-002',
      name: 'Nusrat Jahan',
      subject: 'English',
      email: 'nusrat.jahan@greenfield.edu.bd',
      phone: '+880 1711-200300',
      designation: 'Assistant Teacher',
      qualification: 'M.A. in English Literature (JU)',
      joiningDate: '2018-07-01',
      assignedClasses: ['Class 10 - Science', 'Class 10 - Humanities', 'Class 7 - A'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'TCH-003',
      name: 'Farhana Akter',
      subject: 'Bangla',
      email: 'farhana.akter@greenfield.edu.bd',
      phone: '+880 1711-300400',
      designation: 'Senior Teacher',
      qualification: 'M.A. in Bangla (DU)',
      joiningDate: '2015-01-10',
      assignedClasses: ['Class 10 - Science', 'Class 9 - Science', 'Class 6 - A'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'TCH-004',
      name: 'Mahmud Hasan',
      subject: 'Physics',
      email: 'mahmud.hasan@greenfield.edu.bd',
      phone: '+880 1711-400500',
      designation: 'Lecturer in Physics',
      qualification: 'M.Sc. in Physics (BUET)',
      joiningDate: '2019-09-01',
      assignedClasses: ['Class 10 - Science', 'Class 9 - Science'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'TCH-005',
      name: 'Sadia Islam',
      subject: 'Chemistry',
      email: 'sadia.islam@greenfield.edu.bd',
      phone: '+880 1711-500600',
      designation: 'Lecturer in Chemistry',
      qualification: 'M.Sc. in Chemistry (RU)',
      joiningDate: '2020-02-15',
      assignedClasses: ['Class 10 - Science', 'Class 9 - Science'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'TCH-006',
      name: 'Tanvir Hossain',
      subject: 'ICT',
      email: 'tanvir.hossain@greenfield.edu.bd',
      phone: '+880 1711-600700',
      designation: 'ICT Coordinator & Instructor',
      qualification: 'B.Sc. in CSE (AIUB)',
      joiningDate: '2021-04-10',
      assignedClasses: ['Class 10 - Science', 'Class 9 - Science', 'Class 8 - A'],
      status: 'active',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const students: Student[] = [
    { id: 'STU-2026-001', name: 'Arif Hossain', classId: '10', section: 'Science', roll: '01', gender: 'Male', dob: '2010-04-12', bloodGroup: 'B+', guardianName: 'Md. Kamal Hossain', guardianPhone: '+880 1819-123401', guardianEmail: 'kamal.parent@gmail.com', address: 'House 14, Road 5, Mirpur-10, Dhaka', admissionDate: '2021-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', attendanceRate: 96.5 },
    { id: 'STU-2026-002', name: 'Nusrat Jahan', classId: '10', section: 'Science', roll: '02', gender: 'Female', dob: '2010-08-25', bloodGroup: 'O+', guardianName: 'Enamul Haque', guardianPhone: '+880 1819-123402', guardianEmail: 'enamul.haque@gmail.com', address: 'Plot 45, Senpara Parbata, Mirpur-13, Dhaka', admissionDate: '2021-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', attendanceRate: 98.0 },
    { id: 'STU-2026-003', name: 'Samiul Islam', classId: '10', section: 'Science', roll: '03', gender: 'Male', dob: '2010-02-14', bloodGroup: 'A+', guardianName: 'Md. Kamal Hossain', guardianPhone: '+880 1819-123401', guardianEmail: 'kamal.parent@gmail.com', address: 'House 14, Road 5, Mirpur-10, Dhaka', admissionDate: '2021-01-12', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', attendanceRate: 91.2 },
    { id: 'STU-2026-004', name: 'Tasnim Akter', classId: '10', section: 'Science', roll: '04', gender: 'Female', dob: '2010-11-03', bloodGroup: 'AB+', guardianName: 'Abdur Rashid', guardianPhone: '+880 1819-123404', guardianEmail: 'rashid.akter@gmail.com', address: 'Block D, Section 6, Mirpur, Dhaka', admissionDate: '2021-01-15', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80', attendanceRate: 94.0 },
    { id: 'STU-2026-005', name: 'Fahim Ahmed', classId: '10', section: 'Science', roll: '05', gender: 'Male', dob: '2010-06-19', bloodGroup: 'B-', guardianName: 'Jalal Ahmed', guardianPhone: '+880 1819-123405', guardianEmail: 'jalal.ahmed@yahoo.com', address: 'Road 3, Block C, Pallabi, Mirpur, Dhaka', admissionDate: '2021-01-15', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', attendanceRate: 85.5 },
    { id: 'STU-2026-006', name: 'Mehedi Hasan', classId: '9', section: 'Science', roll: '01', gender: 'Male', dob: '2011-03-10', bloodGroup: 'A+', guardianName: 'Mostafa Kamal', guardianPhone: '+880 1819-123406', address: 'House 22, Road 2, Mirpur-2, Dhaka', admissionDate: '2022-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', attendanceRate: 95.0 },
    { id: 'STU-2026-007', name: 'Sumaiya Rahman', classId: '9', section: 'Science', roll: '02', gender: 'Female', dob: '2011-09-17', bloodGroup: 'O+', guardianName: 'Motiur Rahman', guardianPhone: '+880 1819-123407', address: 'Avenue 5, Mirpur DOHS, Dhaka', admissionDate: '2022-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80', attendanceRate: 93.5 },
    { id: 'STU-2026-008', name: 'Abdullah Khan', classId: '9', section: 'Science', roll: '03', gender: 'Male', dob: '2011-01-20', bloodGroup: 'B+', guardianName: 'Shahid Khan', guardianPhone: '+880 1819-123408', address: 'Road 11, Rupnagar R/A, Mirpur, Dhaka', admissionDate: '2022-01-11', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80', attendanceRate: 90.0 },
    { id: 'STU-2026-009', name: 'Jannatul Ferdous', classId: '9', section: 'Science', roll: '04', gender: 'Female', dob: '2011-12-05', bloodGroup: 'A-', guardianName: 'Golam Kibria', guardianPhone: '+880 1819-123409', address: 'House 5, Road 8, Mirpur-1, Dhaka', admissionDate: '2022-01-12', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80', attendanceRate: 96.0 },
    { id: 'STU-2026-010', name: 'Sakib Mahmud', classId: '9', section: 'Science', roll: '05', gender: 'Male', dob: '2011-07-29', bloodGroup: 'O-', guardianName: 'Faruk Mahmud', guardianPhone: '+880 1819-123410', address: 'Block B, Section 11, Mirpur, Dhaka', admissionDate: '2022-01-15', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', attendanceRate: 88.0 },
    { id: 'STU-2026-011', name: 'Ayesha Siddika', classId: '8', section: 'A', roll: '01', gender: 'Female', dob: '2012-05-14', bloodGroup: 'B+', guardianName: 'Anisur Rahman', guardianPhone: '+880 1819-123411', address: 'Monipuripara, Mirpur, Dhaka', admissionDate: '2023-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', attendanceRate: 97.2 },
    { id: 'STU-2026-012', name: 'Rakib Hasan', classId: '8', section: 'A', roll: '02', gender: 'Male', dob: '2012-10-08', bloodGroup: 'A+', guardianName: 'Harunur Rashid', guardianPhone: '+880 1819-123412', address: 'Kallyanpur, Dhaka', admissionDate: '2023-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', attendanceRate: 92.5 },
    { id: 'STU-2026-013', name: 'Mim Akter', classId: '8', section: 'A', roll: '03', gender: 'Female', dob: '2012-02-18', bloodGroup: 'O+', guardianName: 'Sirajul Islam', guardianPhone: '+880 1819-123413', address: 'Shewrapara, Mirpur, Dhaka', admissionDate: '2023-01-11', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', attendanceRate: 94.8 },
    { id: 'STU-2026-014', name: 'Adnan Kabir', classId: '8', section: 'A', roll: '04', gender: 'Male', dob: '2012-08-30', bloodGroup: 'AB-', guardianName: 'Kabir Hossain', guardianPhone: '+880 1819-123414', address: 'Kazipara, Mirpur, Dhaka', admissionDate: '2023-01-12', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80', attendanceRate: 91.0 },
    { id: 'STU-2026-015', name: 'Sanjida Islam', classId: '8', section: 'A', roll: '05', gender: 'Female', dob: '2012-11-22', bloodGroup: 'B+', guardianName: 'Shafiqul Islam', guardianPhone: '+880 1819-123415', address: 'Pirerbag, Mirpur, Dhaka', admissionDate: '2023-01-14', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', attendanceRate: 95.5 },
    { id: 'STU-2026-016', name: 'Rafi Ahmed', classId: '7', section: 'A', roll: '01', gender: 'Male', dob: '2013-04-05', bloodGroup: 'O+', guardianName: 'Tanveer Ahmed', guardianPhone: '+880 1819-123416', address: 'Section 12, Mirpur, Dhaka', admissionDate: '2024-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', attendanceRate: 96.0 },
    { id: 'STU-2026-017', name: 'Tanjila Rahman', classId: '7', section: 'A', roll: '02', gender: 'Female', dob: '2013-09-12', bloodGroup: 'A+', guardianName: 'Bazlur Rahman', guardianPhone: '+880 1819-123417', address: 'Section 14, Mirpur, Dhaka', admissionDate: '2024-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80', attendanceRate: 93.0 },
    { id: 'STU-2026-018', name: 'Imran Hossain', classId: '7', section: 'A', roll: '03', gender: 'Male', dob: '2013-01-15', bloodGroup: 'B+', guardianName: 'Amjad Hossain', guardianPhone: '+880 1819-123418', address: 'Paikpara, Mirpur, Dhaka', admissionDate: '2024-01-12', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', attendanceRate: 89.0 },
    { id: 'STU-2026-019', name: 'Zara Islam', classId: '6', section: 'A', roll: '01', gender: 'Female', dob: '2014-06-20', bloodGroup: 'AB+', guardianName: 'Aminul Islam', guardianPhone: '+880 1819-123419', address: 'Ibrahimpur, Mirpur, Dhaka', admissionDate: '2025-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', attendanceRate: 98.5 },
    { id: 'STU-2026-020', name: 'Fahad Karim', classId: '6', section: 'A', roll: '02', gender: 'Male', dob: '2014-03-08', bloodGroup: 'O+', guardianName: 'Rezaul Karim', guardianPhone: '+880 1819-123420', address: 'Kafrul, Mirpur, Dhaka', admissionDate: '2025-01-10', status: 'active', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', attendanceRate: 95.0 },
  ];

  // Demo examination
  const examination: Examination = {
    id: 'EXAM-2026-T1',
    name: 'First Term Examination 2026',
    classId: '10',
    session: '2026',
    startDate: '2026-03-01',
    endDate: '2026-03-12',
    status: 'published',
    subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'ICT'],
  };

  // Sample marks according to Part 6.E
  const rawResults = [
    {
      studentId: 'STU-2026-001',
      name: 'Arif Hossain',
      roll: '01',
      section: 'Science',
      marks: { Bangla: 85, English: 78, Mathematics: 95, Physics: 89, Chemistry: 86, ICT: 94 },
    },
    {
      studentId: 'STU-2026-002',
      name: 'Nusrat Jahan',
      roll: '02',
      section: 'Science',
      marks: { Bangla: 91, English: 88, Mathematics: 96, Physics: 92, Chemistry: 90, ICT: 97 },
    },
    {
      studentId: 'STU-2026-003',
      name: 'Samiul Islam',
      roll: '03',
      section: 'Science',
      marks: { Bangla: 72, English: 65, Mathematics: 55, Physics: 61, Chemistry: 58, ICT: 80 },
    },
    {
      studentId: 'STU-2026-004',
      name: 'Tasnim Akter',
      roll: '04',
      section: 'Science',
      marks: { Bangla: 88, English: 84, Mathematics: 90, Physics: 85, Chemistry: 84, ICT: 92 },
    },
    {
      studentId: 'STU-2026-005',
      name: 'Fahim Ahmed',
      roll: '05',
      section: 'Science',
      // Fails Mathematics (28) to test strict failure policy!
      marks: { Bangla: 75, English: 68, Mathematics: 28, Physics: 62, Chemistry: 59, ICT: 70 },
    },
  ];

  const calculatedExamResults = rawResults.map((r) =>
    calculateExamResult(
      examination.id,
      examination.name,
      r.studentId,
      r.name,
      '10',
      r.section,
      r.roll,
      r.marks,
      true
    )
  );

  const examResults = assignMeritPositions(calculatedExamResults);

  // Demo Attendance records for Class 10 and 9
  const attendance: AttendanceRecord[] = [
    {
      id: '2026-03-01_10_Science',
      date: '2026-03-01',
      classId: '10',
      section: 'Science',
      markedBy: 'TCH-001',
      records: {
        'STU-2026-001': 'present',
        'STU-2026-002': 'present',
        'STU-2026-003': 'present',
        'STU-2026-004': 'present',
        'STU-2026-005': 'late',
      },
    },
    {
      id: '2026-03-02_10_Science',
      date: '2026-03-02',
      classId: '10',
      section: 'Science',
      markedBy: 'TCH-001',
      records: {
        'STU-2026-001': 'present',
        'STU-2026-002': 'present',
        'STU-2026-003': 'absent',
        'STU-2026-004': 'present',
        'STU-2026-005': 'present',
      },
    },
    {
      id: '2026-03-03_10_Science',
      date: '2026-03-03',
      classId: '10',
      section: 'Science',
      markedBy: 'TCH-001',
      records: {
        'STU-2026-001': 'present',
        'STU-2026-002': 'present',
        'STU-2026-003': 'present',
        'STU-2026-004': 'leave',
        'STU-2026-005': 'absent',
      },
    },
    {
      id: '2026-03-04_10_Science',
      date: '2026-03-04',
      classId: '10',
      section: 'Science',
      markedBy: 'TCH-001',
      records: {
        'STU-2026-001': 'present',
        'STU-2026-002': 'present',
        'STU-2026-003': 'present',
        'STU-2026-004': 'present',
        'STU-2026-005': 'present',
      },
    },
    {
      id: '2026-03-05_10_Science',
      date: '2026-03-05',
      classId: '10',
      section: 'Science',
      markedBy: 'TCH-001',
      records: {
        'STU-2026-001': 'present',
        'STU-2026-002': 'present',
        'STU-2026-003': 'late',
        'STU-2026-004': 'present',
        'STU-2026-005': 'present',
      },
    },
  ];

  // Demo Invoices
  const invoices: FeeInvoice[] = [
    {
      id: 'INV-2026-001',
      studentId: 'STU-2026-001',
      studentName: 'Arif Hossain',
      classId: '10',
      title: 'Monthly Tuition Fee - March 2026',
      amount: 1500,
      discount: 0,
      paidAmount: 1500,
      dueAmount: 0,
      status: 'Paid',
      dueDate: '2026-03-10',
      paymentMethod: 'bKash',
      paymentDate: '2026-03-05',
      transactionId: 'BK-8794612301',
    },
    {
      id: 'INV-2026-002',
      studentId: 'STU-2026-002',
      studentName: 'Nusrat Jahan',
      classId: '10',
      title: 'Monthly Tuition Fee - March 2026',
      amount: 1500,
      discount: 200, // Merit scholarship discount
      paidAmount: 1300,
      dueAmount: 0,
      status: 'Paid',
      dueDate: '2026-03-10',
      paymentMethod: 'Nagad',
      paymentDate: '2026-03-04',
      transactionId: 'NG-991204856',
    },
    {
      id: 'INV-2026-003',
      studentId: 'STU-2026-003',
      studentName: 'Samiul Islam',
      classId: '10',
      title: 'Monthly Tuition Fee - March 2026',
      amount: 1500,
      discount: 0,
      paidAmount: 1000,
      dueAmount: 500,
      status: 'Partially Paid',
      dueDate: '2026-03-10',
      paymentMethod: 'bKash',
      paymentDate: '2026-03-07',
      transactionId: 'BK-55241890',
    },
    {
      id: 'INV-2026-004',
      studentId: 'STU-2026-004',
      studentName: 'Tasnim Akter',
      classId: '10',
      title: 'Monthly Tuition Fee - March 2026',
      amount: 1500,
      discount: 0,
      paidAmount: 0,
      dueAmount: 1500,
      status: 'Unpaid',
      dueDate: '2026-03-15',
    },
    {
      id: 'INV-2026-005',
      studentId: 'STU-2026-001',
      studentName: 'Arif Hossain',
      classId: '10',
      title: 'First Term Examination Fee 2026',
      amount: 500,
      discount: 0,
      paidAmount: 500,
      dueAmount: 0,
      status: 'Paid',
      dueDate: '2026-02-25',
      paymentMethod: 'SSLCommerz',
      paymentDate: '2026-02-20',
      transactionId: 'SSL-20260220-449',
    },
    {
      id: 'INV-2026-006',
      studentId: 'STU-2026-005',
      studentName: 'Fahim Ahmed',
      classId: '10',
      title: 'Monthly Tuition Fee - March 2026',
      amount: 1500,
      discount: 0,
      paidAmount: 0,
      dueAmount: 1500,
      status: 'Unpaid',
      dueDate: '2026-03-15',
    },
  ];

  // Demo Admissions
  const admissions: AdmissionApplication[] = [
    {
      id: 'ADM-2026-101',
      studentName: 'Tanvir Mahtab',
      appliedClass: '6',
      gender: 'Male',
      dob: '2014-05-18',
      guardianName: 'Mahtab Uddin',
      guardianPhone: '+880 1712-998877',
      guardianEmail: 'mahtab.uddin@gmail.com',
      address: 'House 8, Road 2, Mirpur-10, Dhaka',
      prevSchool: 'Mirpur Model Primary School',
      prevGpa: '5.00',
      status: 'approved',
      appliedDate: '2026-02-15',
      assignedStudentId: 'STU-2026-021',
      notes: 'Passed entrance viva with distinction.',
    },
    {
      id: 'ADM-2026-102',
      studentName: 'Farzana Haque',
      appliedClass: '9',
      gender: 'Female',
      dob: '2011-09-12',
      guardianName: 'Azizul Haque',
      guardianPhone: '+880 1712-445566',
      guardianEmail: 'azizul.h@gmail.com',
      address: 'Section 7, Mirpur, Dhaka',
      prevSchool: 'Dhaka Cantonment Girls School',
      prevGpa: '4.85',
      status: 'pending',
      appliedDate: '2026-02-28',
      notes: 'Documents under verification by academic committee.',
    },
    {
      id: 'ADM-2026-103',
      studentName: 'Mahir Faisal',
      appliedClass: '10',
      gender: 'Male',
      dob: '2010-01-22',
      guardianName: 'Faisal Kabir',
      guardianPhone: '+880 1712-112233',
      guardianEmail: 'fkabir@gmail.com',
      address: 'Pallabi, Mirpur, Dhaka',
      prevSchool: 'BCIC College Secondary Branch',
      prevGpa: '3.20',
      status: 'rejected',
      appliedDate: '2026-02-18',
      notes: 'Insufficient prerequisite credits in Science stream.',
    },
    {
      id: 'ADM-2026-104',
      studentName: 'Nabila Chowdhury',
      appliedClass: '7',
      gender: 'Female',
      dob: '2013-08-14',
      guardianName: 'Jahangir Chowdhury',
      guardianPhone: '+880 1712-334455',
      guardianEmail: 'j.chowdhury@gmail.com',
      address: 'Senpara, Mirpur-10, Dhaka',
      prevSchool: 'Monipur High School',
      prevGpa: '4.90',
      status: 'approved',
      appliedDate: '2026-02-20',
      notes: 'Fee payment pending for final enrollment.',
    },
    {
      id: 'ADM-2026-105',
      studentName: 'Zubair Al Hasan',
      appliedClass: '8',
      gender: 'Male',
      dob: '2012-04-10',
      guardianName: 'Mahbub Hasan',
      guardianPhone: '+880 1712-778899',
      guardianEmail: 'm.hasan@yahoo.com',
      address: 'Rupnagar, Mirpur, Dhaka',
      prevSchool: 'Govt. Laboratory High School',
      prevGpa: '4.70',
      status: 'pending',
      appliedDate: '2026-03-02',
      notes: 'Awaiting transfer certificate verification.',
    },
  ];

  // Demo Library Books (10+ books)
  const books: Book[] = [
    { id: 'BK-101', title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', category: 'Science', isbn: '978-8177091878', totalCopies: 15, availableCopies: 12, shelfLocation: 'Row 3, Shelf B' },
    { id: 'BK-102', title: 'Higher Secondary Mathematics', author: 'S.U. Ahamed & M.A. Jabbar', category: 'Mathematics', isbn: '978-9840102030', totalCopies: 20, availableCopies: 16, shelfLocation: 'Row 2, Shelf A' },
    { id: 'BK-103', title: 'Advanced Chemistry Guide', author: 'Dr. Soroj Kanti Singha', category: 'Science', isbn: '978-9840411224', totalCopies: 12, availableCopies: 9, shelfLocation: 'Row 3, Shelf C' },
    { id: 'BK-104', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Language', isbn: '978-1108457651', totalCopies: 25, availableCopies: 21, shelfLocation: 'Row 1, Shelf D' },
    { id: 'BK-105', title: 'Sanchayita (Selected Poems)', author: 'Rabindranath Tagore', category: 'Literature', isbn: '978-9844120013', totalCopies: 10, availableCopies: 8, shelfLocation: 'Row 4, Shelf A' },
    { id: 'BK-106', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'General Science', isbn: '978-0553380163', totalCopies: 8, availableCopies: 5, shelfLocation: 'Row 5, Shelf B' },
    { id: 'BK-107', title: 'Principles of Accounting', author: 'Needles & Powers', category: 'Commerce', isbn: '978-1133626985', totalCopies: 10, availableCopies: 10, shelfLocation: 'Row 2, Shelf D' },
    { id: 'BK-108', title: 'ICT Essentials for SSC', author: 'Prof. Mohammad Ali', category: 'Technology', isbn: '978-9843329012', totalCopies: 30, availableCopies: 26, shelfLocation: 'Row 1, Shelf A' },
    { id: 'BK-109', title: 'The Old Man and the Sea', author: 'Ernest Hemingway', category: 'Fiction', isbn: '978-0684801223', totalCopies: 14, availableCopies: 11, shelfLocation: 'Row 4, Shelf C' },
    { id: 'BK-110', title: 'Bangabandhu: The Unfinished Memoirs', author: 'Sheikh Mujibur Rahman', category: 'History', isbn: '978-9845020299', totalCopies: 15, availableCopies: 13, shelfLocation: 'Row 5, Shelf A' },
  ];

  // Book borrows
  const borrows: BookBorrow[] = [
    { id: 'BOR-001', bookId: 'BK-101', bookTitle: 'Concepts of Physics (Vol 1)', studentId: 'STU-2026-001', studentName: 'Arif Hossain', issueDate: '2026-02-20', dueDate: '2026-03-06', status: 'Issued', fine: 0 },
    { id: 'BOR-002', bookId: 'BK-104', bookTitle: 'English Grammar in Use', studentId: 'STU-2026-002', studentName: 'Nusrat Jahan', issueDate: '2026-02-15', dueDate: '2026-03-01', returnDate: '2026-02-28', status: 'Returned', fine: 0 },
    { id: 'BOR-003', bookId: 'BK-106', bookTitle: 'A Brief History of Time', studentId: 'STU-2026-003', studentName: 'Samiul Islam', issueDate: '2026-02-10', dueDate: '2026-02-24', status: 'Overdue', fine: 60 },
  ];

  // Homeworks
  const homeworks: Homework[] = [
    {
      id: 'HW-2026-01',
      title: 'Polynomial Functions & Quadratic Equations Exercise 3.2',
      description: 'Solve questions 1 through 15 from textbook Chapter 3. Show all calculation steps clearly.',
      subject: 'Mathematics',
      classId: '10',
      section: 'Science',
      teacherId: 'TCH-001',
      teacherName: 'Rahim Ahmed',
      assignedDate: '2026-03-02',
      dueDate: '2026-03-08',
      submissions: [
        {
          studentId: 'STU-2026-001',
          studentName: 'Arif Hossain',
          submittedAt: '2026-03-04 18:30',
          content: 'Completed all 15 problems. Attached solved equations in PDF format.',
          attachmentName: 'Arif_Math_HW3.2.pdf',
          marks: 95,
          feedback: 'Excellent step-by-step proofs. Great clarity.',
          status: 'graded',
        },
        {
          studentId: 'STU-2026-003',
          studentName: 'Samiul Islam',
          submittedAt: '2026-03-05 21:10',
          content: 'Finished exercises 1 to 12. Question 13 had some confusion on discriminant.',
          attachmentName: 'Samiul_Math_Exercise.pdf',
          status: 'submitted',
        },
      ],
    },
    {
      id: 'HW-2026-02',
      title: 'Newtonian Mechanics: Motion on Inclined Planes',
      description: 'Review Newton’s 2nd law free-body diagrams for friction-affected sliding masses.',
      subject: 'Physics',
      classId: '10',
      section: 'Science',
      teacherId: 'TCH-004',
      teacherName: 'Mahmud Hasan',
      assignedDate: '2026-03-03',
      dueDate: '2026-03-10',
      submissions: [
        {
          studentId: 'STU-2026-002',
          studentName: 'Nusrat Jahan',
          submittedAt: '2026-03-05 14:00',
          content: 'Attached free body diagram scans and vector derivations.',
          attachmentName: 'Nusrat_Physics_InclinedPlanes.pdf',
          marks: 98,
          feedback: 'Accurate trigonometric decomposition.',
          status: 'graded',
        },
      ],
    },
  ];

  // Notices according to Part 6.H
  const notices: SchoolNotice[] = [
    {
      id: 'NOT-001',
      title: 'First Term Examination Routine 2026',
      content: 'The First Term Examination 2026 for classes 6 to 10 will commence from March 15, 2026. All students must collect their admit cards by March 12 from the school accounts office after clearing dues.',
      category: 'Exam',
      audience: 'all',
      date: '2026-03-01',
      isPinned: true,
      priority: 'high',
    },
    {
      id: 'NOT-002',
      title: 'Annual Sports Day Announcement 2026',
      content: 'Our grand Annual Sports Day will take place on March 25, 2026 at the school main playground. Students are invited to register for track & field, relay races, and chess competitions with their class teachers.',
      category: 'Sports',
      audience: 'students',
      date: '2026-02-26',
      isPinned: true,
      priority: 'normal',
    },
    {
      id: 'NOT-003',
      title: 'School Holiday Notice - Shab-e-Barat & Independence Day',
      content: 'The school campus will remain closed on public holidays as per the Ministry of Education calendar. Online portal services remain accessible 24/7.',
      category: 'Holiday',
      audience: 'all',
      date: '2026-02-22',
      isPinned: false,
      priority: 'normal',
    },
    {
      id: 'NOT-004',
      title: 'Parent-Teacher Meeting (PTM) for Term Progress Review',
      content: 'All respected guardians of Class 9 & 10 students are cordially invited to the quarterly PTM on Saturday, March 21 at 10:00 AM in the school auditorium to discuss student academic progress.',
      category: 'Academic',
      audience: 'parents',
      targetClass: '10',
      date: '2026-02-18',
      isPinned: false,
      priority: 'high',
    },
    {
      id: 'NOT-005',
      title: 'Monthly Tuition Fee Reminder for March 2026',
      content: 'Respected parents are kindly requested to clear monthly tuition fees through bKash, Nagad, or the school cash counter by the 15th of March to avoid late surcharge.',
      category: 'Administrative',
      audience: 'parents',
      date: '2026-02-15',
      isPinned: false,
      priority: 'normal',
    },
  ];

  // Events according to Part 6.I
  const events: SchoolEvent[] = [
    {
      id: 'EV-01',
      title: 'Annual Sports Day 2026',
      category: 'sports',
      date: '2026-03-25',
      description: 'Inter-house athletic meet, march-past, and prize distribution ceremony.',
      location: 'Greenfield Main Sports Ground',
    },
    {
      id: 'EV-02',
      title: 'National Science Fair 2026',
      category: 'academic',
      date: '2026-04-10',
      endDate: '2026-04-11',
      description: 'Science project exhibitions, robotics demonstrations, and Olympiad problem-solving.',
      location: 'Science Building Auditorium',
    },
    {
      id: 'EV-03',
      title: 'Bangla Noboborsho Cultural Program',
      category: 'cultural',
      date: '2026-04-14',
      description: 'Traditional musical performances, poetry recitations, and seasonal festive fair.',
      location: 'Open Air Amphitheatre',
    },
    {
      id: 'EV-04',
      title: 'Parent-Teacher Meeting (PTM)',
      category: 'academic',
      date: '2026-03-21',
      description: 'One-on-one consultation with subject teachers and semester report evaluation.',
      location: 'Main Academic Building',
    },
    {
      id: 'EV-05',
      title: 'Independence Day Celebration',
      category: 'cultural',
      date: '2026-03-26',
      description: 'National flag hoisting, tribute to martyrs, and patriotic essay contest.',
      location: 'Campus Plaza',
    },
  ];

  // Audit Logs
  const auditLogs: AuditLog[] = [
    {
      id: 'LOG-001',
      timestamp: '2026-03-05 09:30:12',
      userName: 'Principal Dr. M. Rahman',
      userRole: 'principal',
      action: 'PUBLISH_EXAM_RESULTS',
      module: 'Examinations',
      details: 'Approved and published First Term Examination 2026 results for Class 10.',
    },
    {
      id: 'LOG-002',
      timestamp: '2026-03-05 08:45:00',
      userName: 'Rahim Ahmed (TCH-001)',
      userRole: 'teacher',
      action: 'SUBMIT_ATTENDANCE',
      module: 'Attendance',
      details: 'Marked daily attendance for Class 10 Science (5 students recorded).',
    },
    {
      id: 'LOG-003',
      timestamp: '2026-03-04 14:15:20',
      userName: 'Accountant Kabir Hossain',
      userRole: 'accountant',
      action: 'COLLECT_FEE',
      module: 'Fees & Finance',
      details: 'Recorded bKash payment ৳1,500 for student STU-2026-001 (Invoice INV-2026-001).',
    },
    {
      id: 'LOG-004',
      timestamp: '2026-03-03 11:20:00',
      userName: 'Super Admin',
      userRole: 'super_admin',
      action: 'APPROVE_ADMISSION',
      module: 'Admissions',
      details: 'Approved online application ADM-2026-101 for Tanvir Mahtab in Class 6.',
    },
  ];

  // Routines for Class 10
  const routines: Record<string, ClassRoutineSlot[]> = {
    '10': [
      { day: 'Sunday', time: '08:30 - 09:15', subject: 'Mathematics', teacherName: 'Rahim Ahmed', room: 'Room 301' },
      { day: 'Sunday', time: '09:15 - 10:00', subject: 'Physics', teacherName: 'Mahmud Hasan', room: 'Physics Lab' },
      { day: 'Sunday', time: '10:15 - 11:00', subject: 'English', teacherName: 'Nusrat Jahan', room: 'Room 301' },
      { day: 'Sunday', time: '11:00 - 11:45', subject: 'Chemistry', teacherName: 'Sadia Islam', room: 'Chemistry Lab' },
      { day: 'Sunday', time: '12:00 - 12:45', subject: 'ICT', teacherName: 'Tanvir Hossain', room: 'Computer Lab 1' },
      { day: 'Monday', time: '08:30 - 09:15', subject: 'Bangla', teacherName: 'Farhana Akter', room: 'Room 301' },
      { day: 'Monday', time: '09:15 - 10:00', subject: 'Mathematics', teacherName: 'Rahim Ahmed', room: 'Room 301' },
      { day: 'Monday', time: '10:15 - 11:00', subject: 'Chemistry', teacherName: 'Sadia Islam', room: 'Room 301' },
      { day: 'Monday', time: '11:00 - 11:45', subject: 'Physics', teacherName: 'Mahmud Hasan', room: 'Physics Lab' },
      { day: 'Tuesday', time: '08:30 - 09:15', subject: 'English', teacherName: 'Nusrat Jahan', room: 'Room 301' },
      { day: 'Tuesday', time: '09:15 - 10:00', subject: 'ICT', teacherName: 'Tanvir Hossain', room: 'Computer Lab 1' },
      { day: 'Tuesday', time: '10:15 - 11:00', subject: 'Mathematics', teacherName: 'Rahim Ahmed', room: 'Room 301' },
    ],
  };

  // Demo user accounts matching Part 7
  const userAccounts: UserAccount[] = [
    { id: 'usr-admin', email: 'admin@edunexus.demo', name: 'Super Administrator', role: 'super_admin' },
    { id: 'usr-principal', email: 'principal@edunexus.demo', name: 'Dr. M. A. Rahman', role: 'principal' },
    { id: 'usr-teacher', email: 'teacher@edunexus.demo', name: 'Rahim Ahmed', role: 'teacher', relatedId: 'TCH-001' },
    { id: 'usr-accountant', email: 'accountant@edunexus.demo', name: 'Kabir Hossain', role: 'accountant' },
    { id: 'usr-librarian', email: 'librarian@edunexus.demo', name: 'Shahela Parveen', role: 'librarian' },
    { id: 'usr-student', email: 'student@edunexus.demo', name: 'Arif Hossain', role: 'student', relatedId: 'STU-2026-001' },
    { id: 'usr-parent', email: 'parent@edunexus.demo', name: 'Md. Kamal Hossain', role: 'parent', studentIds: ['STU-2026-001', 'STU-2026-003'] },
  ];

  return {
    students,
    teachers,
    classes,
    attendance,
    examinations: [examination],
    examResults,
    admissions,
    invoices,
    books,
    borrows,
    homeworks,
    notices,
    events,
    auditLogs,
    routines,
    userAccounts,
  };
}

export class StorageService {
  private static loadDB(): AppDatabase {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to load local DB, initializing seed data', e);
    }
    const seed = getInitialSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  private static saveDB(db: AppDatabase): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  public static resetToSeed(): AppDatabase {
    const seed = getInitialSeedData();
    this.saveDB(seed);
    return seed;
  }

  public static getDB(): AppDatabase {
    return this.loadDB();
  }

  // --- Students ---
  public static getStudents(): Student[] {
    return this.loadDB().students;
  }

  public static saveStudent(student: Student): void {
    const db = this.loadDB();
    const idx = db.students.findIndex((s) => s.id === student.id);
    if (idx >= 0) {
      db.students[idx] = student;
    } else {
      db.students.unshift(student);
    }
    this.saveDB(db);
  }

  public static deleteStudent(studentId: string): void {
    const db = this.loadDB();
    db.students = db.students.filter((s) => s.id !== studentId);
    this.saveDB(db);
  }

  // --- Teachers ---
  public static getTeachers(): Teacher[] {
    return this.loadDB().teachers;
  }

  public static saveTeacher(teacher: Teacher): void {
    const db = this.loadDB();
    const idx = db.teachers.findIndex((t) => t.id === teacher.id);
    if (idx >= 0) {
      db.teachers[idx] = teacher;
    } else {
      db.teachers.unshift(teacher);
    }
    this.saveDB(db);
  }

  public static deleteTeacher(teacherId: string): void {
    const db = this.loadDB();
    db.teachers = db.teachers.filter((t) => t.id !== teacherId);
    this.saveDB(db);
  }

  // --- Attendance ---
  public static getAttendanceRecords(): AttendanceRecord[] {
    return this.loadDB().attendance;
  }

  public static saveAttendance(record: AttendanceRecord): void {
    const db = this.loadDB();
    const idx = db.attendance.findIndex((a) => a.id === record.id);
    if (idx >= 0) {
      db.attendance[idx] = record;
    } else {
      db.attendance.push(record);
    }
    this.saveDB(db);
  }

  // --- Exams & Results ---
  public static getExaminations(): Examination[] {
    return this.loadDB().examinations;
  }

  public static getExamResults(): StudentExamResult[] {
    return this.loadDB().examResults;
  }

  public static saveExamResult(result: StudentExamResult): void {
    const db = this.loadDB();
    const idx = db.examResults.findIndex((r) => r.examId === result.examId && r.studentId === result.studentId);
    if (idx >= 0) {
      db.examResults[idx] = result;
    } else {
      db.examResults.push(result);
    }
    // Re-calculate merit positions for that exam
    const forThisExam = db.examResults.filter((r) => r.examId === result.examId);
    const ranked = assignMeritPositions(forThisExam);
    db.examResults = [
      ...db.examResults.filter((r) => r.examId !== result.examId),
      ...ranked,
    ];
    this.saveDB(db);
  }

  public static publishExam(examId: string, published: boolean): void {
    const db = this.loadDB();
    const exam = db.examinations.find((e) => e.id === examId);
    if (exam) {
      exam.status = published ? 'published' : 'draft';
    }
    db.examResults = db.examResults.map((r) => (r.examId === examId ? { ...r, published } : r));
    this.saveDB(db);
  }

  // --- Admissions ---
  public static getAdmissions(): AdmissionApplication[] {
    return this.loadDB().admissions;
  }

  public static saveAdmission(app: AdmissionApplication): void {
    const db = this.loadDB();
    const idx = db.admissions.findIndex((a) => a.id === app.id);
    if (idx >= 0) {
      db.admissions[idx] = app;
    } else {
      db.admissions.unshift(app);
    }
    this.saveDB(db);
  }

  // --- Fees ---
  public static getInvoices(): FeeInvoice[] {
    return this.loadDB().invoices;
  }

  public static saveInvoice(inv: FeeInvoice): void {
    const db = this.loadDB();
    const idx = db.invoices.findIndex((i) => i.id === inv.id);
    if (idx >= 0) {
      db.invoices[idx] = inv;
    } else {
      db.invoices.unshift(inv);
    }
    this.saveDB(db);
  }

  // --- Library ---
  public static getBooks(): Book[] {
    return this.loadDB().books;
  }

  public static saveBook(book: Book): void {
    const db = this.loadDB();
    const idx = db.books.findIndex((b) => b.id === book.id);
    if (idx >= 0) {
      db.books[idx] = book;
    } else {
      db.books.unshift(book);
    }
    this.saveDB(db);
  }

  public static getBorrows(): BookBorrow[] {
    return this.loadDB().borrows;
  }

  public static saveBorrow(borrow: BookBorrow): void {
    const db = this.loadDB();
    const idx = db.borrows.findIndex((b) => b.id === borrow.id);
    if (idx >= 0) {
      db.borrows[idx] = borrow;
    } else {
      db.borrows.unshift(borrow);
    }
    this.saveDB(db);
  }

  // --- Homeworks ---
  public static getHomeworks(): Homework[] {
    return this.loadDB().homeworks;
  }

  public static saveHomework(hw: Homework): void {
    const db = this.loadDB();
    const idx = db.homeworks.findIndex((h) => h.id === hw.id);
    if (idx >= 0) {
      db.homeworks[idx] = hw;
    } else {
      db.homeworks.unshift(hw);
    }
    this.saveDB(db);
  }

  // --- Notices ---
  public static getNotices(): SchoolNotice[] {
    return this.loadDB().notices;
  }

  public static saveNotice(notice: SchoolNotice): void {
    const db = this.loadDB();
    const idx = db.notices.findIndex((n) => n.id === notice.id);
    if (idx >= 0) {
      db.notices[idx] = notice;
    } else {
      db.notices.unshift(notice);
    }
    this.saveDB(db);
  }

  public static deleteNotice(id: string): void {
    const db = this.loadDB();
    db.notices = db.notices.filter((n) => n.id !== id);
    this.saveDB(db);
  }

  // --- Events ---
  public static getEvents(): SchoolEvent[] {
    return this.loadDB().events;
  }

  // --- Audit Logs ---
  public static getAuditLogs(): AuditLog[] {
    return this.loadDB().auditLogs;
  }

  public static logAction(userName: string, userRole: any, action: string, module: string, details: string): void {
    const db = this.loadDB();
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userName,
      userRole,
      action,
      module,
      details,
    };
    db.auditLogs.unshift(newLog);
    if (db.auditLogs.length > 100) db.auditLogs.pop();
    this.saveDB(db);
  }
}
