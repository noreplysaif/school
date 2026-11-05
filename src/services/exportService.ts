import * as XLSX from 'xlsx';
import { Student, StudentExamResult, FeeInvoice, AttendanceRecord } from '../types';

export class ExportService {
  /**
   * Export students list to Excel or CSV
   */
  public static exportStudents(students: Student[], format: 'xlsx' | 'csv' = 'xlsx'): void {
    const data = students.map((s) => ({
      'Student ID': s.id,
      'Full Name': s.name,
      'Class': s.classId,
      'Section': s.section,
      'Roll Number': s.roll,
      'Gender': s.gender,
      'Date of Birth': s.dob,
      'Blood Group': s.bloodGroup,
      'Guardian Name': s.guardianName,
      'Guardian Phone': s.guardianPhone,
      'Guardian Email': s.guardianEmail || '',
      'Address': s.address,
      'Admission Date': s.admissionDate,
      'Status': s.status,
      'Attendance Rate (%)': s.attendanceRate ?? 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    if (format === 'csv') {
      XLSX.writeFile(workbook, `Greenfield_Students_${new Date().toISOString().slice(0, 10)}.csv`, { bookType: 'csv' });
    } else {
      XLSX.writeFile(workbook, `Greenfield_Students_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
  }

  /**
   * Export Exam Merit List to Excel
   */
  public static exportExamResults(results: StudentExamResult[], examName: string): void {
    const data = results.map((r) => {
      const row: Record<string, any> = {
        'Merit Rank': r.meritPosition ?? 'Failed',
        'Roll': r.roll,
        'Student ID': r.studentId,
        'Student Name': r.studentName,
        'Class': r.classId,
        'Section': r.section,
      };

      r.subjectMarks.forEach((sm) => {
        row[`${sm.subject} (Marks)`] = sm.marks;
        row[`${sm.subject} (Grade)`] = sm.grade;
      });

      row['Total Marks'] = r.totalMarks;
      row['Max Marks'] = r.totalFullMarks;
      row['Percentage (%)'] = r.percentage;
      row['GPA'] = r.gpa;
      row['Final Grade'] = r.grade;
      row['Result Status'] = r.isPassed ? 'Passed' : 'Failed';
      row['Remarks'] = r.remarks ?? '';

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Merit List');
    XLSX.writeFile(workbook, `${examName.replace(/\s+/g, '_')}_Merit_List.xlsx`);
  }

  /**
   * Export Fee Collection Invoices to Excel
   */
  public static exportFeeInvoices(invoices: FeeInvoice[]): void {
    const data = invoices.map((inv) => ({
      'Invoice No': inv.id,
      'Student ID': inv.studentId,
      'Student Name': inv.studentName,
      'Class': inv.classId,
      'Fee Particulars': inv.title,
      'Total Amount (৳)': inv.amount,
      'Waiver/Discount (৳)': inv.discount,
      'Paid Amount (৳)': inv.paidAmount,
      'Due Balance (৳)': inv.dueAmount,
      'Status': inv.status,
      'Due Date': inv.dueDate,
      'Payment Date': inv.paymentDate || 'Pending',
      'Method': inv.paymentMethod || 'N/A',
      'Transaction Ref': inv.transactionId || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fee Collections');
    XLSX.writeFile(workbook, `Fee_Collection_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  /**
   * Export Attendance Log to Excel
   */
  public static exportAttendance(attendanceRecords: AttendanceRecord[], students: Student[]): void {
    const studentMap = new Map(students.map((s) => [s.id, s]));
    const data: Record<string, any>[] = [];

    attendanceRecords.forEach((rec) => {
      Object.entries(rec.records).forEach(([studentId, status]) => {
        const student = studentMap.get(studentId);
        data.push({
          'Date': rec.date,
          'Class': rec.classId,
          'Section': rec.section,
          'Student ID': studentId,
          'Student Name': student?.name || 'Unknown',
          'Roll': student?.roll || '',
          'Status': status.toUpperCase(),
          'Marked By': rec.markedBy,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Records');
    XLSX.writeFile(workbook, `Attendance_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  /**
   * Parse uploaded Excel or CSV file for student bulk import
   */
  public static parseStudentFile(file: File): Promise<Partial<Student>[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const buffer = e.target?.result;
          const workbook = XLSX.read(buffer, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

          const parsedStudents: Partial<Student>[] = json.map((row, idx) => ({
            id: row['Student ID'] || row['id'] || `STU-2026-${String(21 + idx).padStart(3, '0')}`,
            name: row['Full Name'] || row['name'] || row['Student Name'] || 'New Student',
            classId: String(row['Class'] || row['classId'] || '10'),
            section: row['Section'] || row['section'] || 'A',
            roll: String(row['Roll Number'] || row['roll'] || row['Roll'] || (idx + 1)),
            gender: (row['Gender'] || row['gender'] || 'Male') as any,
            dob: row['Date of Birth'] || row['dob'] || '2012-01-01',
            bloodGroup: row['Blood Group'] || row['bloodGroup'] || 'A+',
            guardianName: row['Guardian Name'] || row['guardianName'] || 'Guardian',
            guardianPhone: row['Guardian Phone'] || row['guardianPhone'] || '+880 1711-000000',
            guardianEmail: row['Guardian Email'] || row['guardianEmail'] || '',
            address: row['Address'] || row['address'] || 'Mirpur, Dhaka',
            admissionDate: row['Admission Date'] || row['admissionDate'] || new Date().toISOString().slice(0, 10),
            status: 'active',
            photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
          }));

          resolve(parsedStudents);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }
}
