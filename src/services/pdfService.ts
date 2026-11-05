import { jsPDF } from 'jspdf';
import { Student, StudentExamResult, FeeInvoice } from '../types';

export class PdfService {
  /**
   * Generates a printable Student ID Card PDF
   */
  public static generateStudentIdCard(student: Student): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98], // Standard CR80 ID Card dimensions
    });

    // Background styling
    doc.setFillColor(15, 23, 42); // Navy top header
    doc.rect(0, 0, 85.6, 15, 'F');

    // School Crest & Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('GREENFIELD MODEL SCHOOL & COLLEGE', 42.8, 6, { align: 'center' });

    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(56, 189, 248); // Sky blue accent
    doc.text('MIRPUR, DHAKA • ESTD. 2005 • EIIN: 134250', 42.8, 10, { align: 'center' });

    // Body container
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 15, 85.6, 38.98, 'F');

    // Photo Box Placeholder
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(6, 18, 20, 24, 1.5, 1.5, 'FD');
    doc.setFontSize(5.5);
    doc.setTextColor(100, 116, 139);
    doc.text('STUDENT', 16, 28, { align: 'center' });
    doc.text('PHOTO', 16, 32, { align: 'center' });

    // Student Info
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(student.name.toUpperCase(), 30, 21);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);

    doc.text(`Student ID:`, 30, 26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(`${student.id}`, 47, 26);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Class & Sec:`, 30, 30);
    doc.setTextColor(15, 23, 42);
    doc.text(`Class ${student.classId} (${student.section})`, 47, 30);

    doc.setTextColor(71, 85, 105);
    doc.text(`Roll No:`, 30, 34);
    doc.setTextColor(15, 23, 42);
    doc.text(`${student.roll}`, 47, 34);

    doc.setTextColor(71, 85, 105);
    doc.text(`Blood Group:`, 30, 38);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text(`${student.bloodGroup}`, 47, 38);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Emergency:`, 30, 42);
    doc.setTextColor(15, 23, 42);
    doc.text(`${student.guardianPhone}`, 47, 42);

    // Footer bar
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 48, 85.6, 5.98, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text('VALID ACADEMIC SESSION: 2026 • PRINCIPAL SIGNATURE VERIFIED', 42.8, 52, { align: 'center' });

    doc.save(`Student_ID_${student.id}.pdf`);
  }

  /**
   * Generates a formal Examination Report Card PDF
   */
  public static generateReportCard(result: StudentExamResult, student?: Student): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header Border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);

    // Inner fine border
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.rect(12, 12, 186, 273);

    // School Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text('GREENFIELD MODEL SCHOOL & COLLEGE', 105, 25, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text('Mirpur, Dhaka-1216, Bangladesh | Phone: +880 2 55000000 | info@greenfield.edu.bd', 105, 31, { align: 'center' });

    // Title banner
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(45, 36, 120, 9, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text('ACADEMIC TRANSCRIPT & REPORT CARD', 105, 42, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(result.examName.toUpperCase(), 105, 50, { align: 'center' });

    // Student Information Grid
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(15, 54, 180, 26, 2, 2, 'F');

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Student Name:', 20, 61);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(result.studentName, 45, 61);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Student ID:', 120, 61);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(result.studentId, 145, 61);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Class & Section:', 20, 68);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`Class ${result.classId} (${result.section})`, 45, 68);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Roll Number:', 120, 68);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(result.roll, 145, 68);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Guardian Name:', 20, 75);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(student?.guardianName || 'Md. Kamal Hossain', 45, 75);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Academic Session:', 120, 75);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('2026', 150, 75);

    // Subject Table Header
    let y = 87;
    doc.setFillColor(15, 23, 42);
    doc.rect(15, y, 180, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('SL', 20, y + 5.5);
    doc.text('SUBJECT', 35, y + 5.5);
    doc.text('FULL MARKS', 85, y + 5.5);
    doc.text('PASS MARKS', 115, y + 5.5);
    doc.text('OBTAINED', 145, y + 5.5);
    doc.text('LETTER GRADE', 170, y + 5.5);
    doc.text('GPA', 187, y + 5.5, { align: 'right' });

    // Table rows
    y += 8;
    result.subjectMarks.forEach((sm, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, y, 180, 7, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);

      doc.text(String(idx + 1), 20, y + 5);
      doc.text(sm.subject, 35, y + 5);
      doc.text(String(sm.fullMarks), 92, y + 5);
      doc.text(String(sm.passMarks), 122, y + 5);

      // Obtained marks
      doc.setFont('helvetica', 'bold');
      if (sm.marks < sm.passMarks) {
        doc.setTextColor(220, 38, 38);
      } else {
        doc.setTextColor(15, 23, 42);
      }
      doc.text(String(sm.marks), 150, y + 5);

      doc.text(sm.grade, 175, y + 5);
      doc.text(sm.gpa.toFixed(2), 187, y + 5, { align: 'right' });

      // Bottom line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(15, y + 7, 195, y + 7);

      y += 7;
    });

    // Summary Box
    y += 5;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(15, y, 180, 25, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Total Obtained Marks:', 22, y + 8);
    doc.setTextColor(37, 99, 235);
    doc.text(`${result.totalMarks} / ${result.totalFullMarks} (${result.percentage}%)`, 65, y + 8);

    doc.setTextColor(15, 23, 42);
    doc.text('Final GPA:', 130, y + 8);
    doc.setFontSize(12);
    if (result.isPassed) {
      doc.setTextColor(22, 163, 74);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(`${result.gpa.toFixed(2)}`, 155, y + 8);

    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Overall Grade:', 22, y + 17);
    doc.setFontSize(11);
    if (result.isPassed) {
      doc.setTextColor(22, 163, 74);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(result.grade, 65, y + 17);

    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Merit Position:', 130, y + 17);
    doc.setTextColor(37, 99, 235);
    doc.text(result.meritPosition ? `#${result.meritPosition}` : 'N/A (Failed)', 155, y + 17);

    // Remarks
    y += 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text('Remarks & Evaluation:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(result.remarks || 'Satisfactory academic performance.', 60, y);

    // Grading System Legend
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('OFFICIAL GRADING SCALE (GAZIPUR / DHAKA BOARD STANDARD):', 15, y);

    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('80-100: A+ (5.00)  |  70-79: A (4.00)  |  60-69: A- (3.50)  |  50-59: B (3.00)  |  40-49: C (2.00)  |  33-39: D (1.00)  |  0-32: F (0.00)', 15, y);

    // Signatures
    const sigY = 250;
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.5);

    doc.line(20, sigY, 65, sigY);
    doc.line(80, sigY, 125, sigY);
    doc.line(145, sigY, 190, sigY);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text('Class Teacher Signature', 23, sigY + 5);
    doc.text('Exam Controller', 89, sigY + 5);
    doc.text('Principal Signature', 153, sigY + 5);

    doc.save(`Report_Card_${result.studentId}_${result.examId}.pdf`);
  }

  /**
   * Generates a formal School Fee Receipt PDF
   */
  public static generateFeeReceipt(invoice: FeeInvoice, student?: Student): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5', // A5 format for payment receipt
    });

    // Outer Border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.8);
    doc.rect(8, 8, 132, 194);

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(8, 8, 132, 22, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('GREENFIELD MODEL SCHOOL & COLLEGE', 74, 15, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(56, 189, 248);
    doc.text('Accounts & Finance Department • Mirpur, Dhaka', 74, 20, { align: 'center' });
    doc.text('OFFICIAL MONEY RECEIPT / FEE VOUCHER', 74, 25, { align: 'center' });

    // Receipt Meta
    let y = 36;
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Receipt No:', 12, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.id, 32, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Date:', 90, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.paymentDate || new Date().toISOString().slice(0, 10), 105, y);

    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Student Name:', 12, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.studentName, 35, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Student ID:', 90, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(invoice.studentId, 105, y);

    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Class & Roll:', 12, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`Class ${invoice.classId} (Roll ${student?.roll || '01'})`, 35, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Payment Mode:', 90, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 163, 74);
    doc.text(invoice.paymentMethod || 'bKash Online', 112, y);

    // Line items
    y += 10;
    doc.setFillColor(241, 245, 249);
    doc.rect(12, y, 124, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('DESCRIPTION / FEE HEAD', 15, y + 4.5);
    doc.text('AMOUNT (BDT ৳)', 128, y + 4.5, { align: 'right' });

    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(invoice.title, 15, y + 6);
    doc.text(`৳${invoice.amount.toLocaleString()}`, 128, y + 6, { align: 'right' });

    if (invoice.discount > 0) {
      y += 8;
      doc.setTextColor(22, 163, 74);
      doc.text('Less: Scholarship / Special Waiver', 15, y + 6);
      doc.text(`- ৳${invoice.discount.toLocaleString()}`, 128, y + 6, { align: 'right' });
    }

    y += 14;
    doc.setDrawColor(203, 213, 225);
    doc.line(12, y, 136, y);

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Net Paid Amount:', 15, y);
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(10);
    doc.text(`৳${invoice.paidAmount.toLocaleString()}`, 128, y, { align: 'right' });

    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('Remaining Balance Due:', 15, y);
    if (invoice.dueAmount > 0) {
      doc.setTextColor(220, 38, 38);
    } else {
      doc.setTextColor(22, 163, 74);
    }
    doc.text(`৳${invoice.dueAmount.toLocaleString()}`, 128, y, { align: 'right' });

    // Status stamp
    y += 12;
    doc.setFillColor(invoice.status === 'Paid' ? 220 : 254, invoice.status === 'Paid' ? 252 : 243, invoice.status === 'Paid' ? 231 : 199);
    doc.roundedRect(12, y, 60, 10, 1.5, 1.5, 'F');
    if (invoice.status === 'Paid') {
      doc.setTextColor(22, 163, 74);
    } else {
      doc.setTextColor(180, 83, 9);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`STATUS: ${invoice.status.toUpperCase()}`, 18, y + 6.5);

    if (invoice.transactionId) {
      y += 15;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`Transaction Reference: ${invoice.transactionId}`, 12, y);
    }

    // Signatures
    const sigY = 180;
    doc.setDrawColor(148, 163, 184);
    doc.line(16, sigY, 52, sigY);
    doc.line(92, sigY, 128, sigY);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('Depositor / Student', 18, sigY + 4);
    doc.text('Accounts Officer Seal', 94, sigY + 4);

    doc.save(`Fee_Receipt_${invoice.id}.pdf`);
  }

  /**
   * Generates Character or Enrollment Certificate PDF
   */
  public static generateCertificate(
    type: 'character' | 'enrollment' | 'transfer',
    student: Student
  ): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Outer decorative border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 277, 190);

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, 271, 184);

    // School Name & Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text('GREENFIELD MODEL SCHOOL & COLLEGE', 148.5, 30, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Mirpur, Dhaka, Bangladesh • Established 2005 • Board of Intermediate & Secondary Education, Dhaka', 148.5, 38, { align: 'center' });

    // Certificate Title
    let title = 'CERTIFICATE OF CHARACTER & CONDUCT';
    if (type === 'enrollment') title = 'STUDENT ENROLLMENT CERTIFICATE';
    if (type === 'transfer') title = 'TRANSFER CERTIFICATE (TC)';

    doc.setFillColor(37, 99, 235);
    doc.roundedRect(68, 48, 160, 12, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text(title, 148.5, 56, { align: 'center' });

    // Certificate body text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);

    const bodyY = 78;
    const certText = `This is to certify that ${student.name.toUpperCase()}, Son/Daughter of ${student.guardianName.toUpperCase()}, bearing Student ID: ${student.id} and Class Roll: ${student.roll}, is a regular bonafide student of Class ${student.classId} (Section: ${student.section}) of this institution during the academic session 2026.`;

    const splitText = doc.splitTextToSize(certText, 230);
    doc.text(splitText, 148.5, bodyY, { align: 'center' });

    const praiseText = type === 'transfer'
      ? `He/She has cleared all institutional dues up to the date of leaving. We wish him/her every success in all future academic pursuits.`
      : `To the best of our knowledge and school institutional records, he/she possesses commendable moral character and active participation in academic curriculum. He/She has maintained an attendance rate of ${student.attendanceRate ?? 95}%. We wish him/her continuous bright success in life.`;

    const splitPraise = doc.splitTextToSize(praiseText, 230);
    doc.text(splitPraise, 148.5, bodyY + 22, { align: 'center' });

    // Issue Date and Ref
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Certificate Ref: GMSC/${type.toUpperCase()}/2026/${student.roll}`, 25, 150);
    doc.text(`Issue Date: ${new Date().toLocaleDateString('en-GB')}`, 25, 157);

    // Signatures
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.6);
    doc.line(60, 175, 110, 175);
    doc.line(190, 175, 240, 175);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Prepared by (Head Clerk)', 85, 181, { align: 'center' });
    doc.text('Principal / Headmaster', 215, 181, { align: 'center' });

    doc.save(`${type}_certificate_${student.id}.pdf`);
  }
}
