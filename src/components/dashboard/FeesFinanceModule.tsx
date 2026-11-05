import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { ExportService } from '../../services/exportService';
import { PdfService } from '../../services/pdfService';
import { FeeInvoice } from '../../types';
import {
  DollarSign,
  Plus,
  Search,
  Download,
  CreditCard,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const FeesFinanceModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => StorageService.getInvoices());
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Partially Paid' | 'Unpaid'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Payment Recording Modal (Workflow 5)
  const [isCollectFeeModalOpen, setIsCollectFeeModalOpen] = useState(false);
  const [collectData, setCollectData] = useState({
    studentId: 'STU-2026-004',
    title: 'Monthly Tuition Fee - March 2026',
    amount: 1500,
    discount: 0,
    paidAmount: 1500,
    paymentMethod: 'bKash' as 'bKash' | 'Nagad' | 'SSLCommerz' | 'Cash',
    transactionId: 'BK-78901234',
  });

  const refreshList = () => {
    setInvoices(StorageService.getInvoices());
  };

  const filteredInvoices = invoices.filter((i) => {
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    const matchesSearch =
      i.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDues = invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const db = StorageService.getDB();
    const student = db.students.find((s) => s.id === collectData.studentId) || db.students[0];

    const netAmount = Math.max(0, collectData.amount - collectData.discount);
    const paid = Math.min(netAmount, collectData.paidAmount);
    const due = Math.max(0, netAmount - paid);

    let status: 'Paid' | 'Partially Paid' | 'Unpaid' = 'Paid';
    if (paid === 0) status = 'Unpaid';
    else if (due > 0) status = 'Partially Paid';

    const newInvoice: FeeInvoice = {
      id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      studentId: student.id,
      studentName: student.name,
      classId: student.classId,
      title: collectData.title,
      amount: collectData.amount,
      discount: collectData.discount,
      paidAmount: paid,
      dueAmount: due,
      status,
      dueDate: new Date().toISOString().slice(0, 10),
      paymentMethod: collectData.paymentMethod,
      paymentDate: new Date().toISOString().slice(0, 10),
      transactionId: collectData.paymentMethod !== 'Cash' ? collectData.transactionId : undefined,
    };

    StorageService.saveInvoice(newInvoice);
    StorageService.logAction(
      user?.name || 'Accountant',
      user?.role || 'accountant',
      'RECORD_PAYMENT',
      'Fees & Finance',
      `Collected payment ৳${paid} for ${student.name} via ${collectData.paymentMethod} (Invoice ${newInvoice.id})`
    );

    addToast('success', 'Fee Payment Recorded', `Receipt generated for ${student.name} (৳${paid}).`);
    setIsCollectFeeModalOpen(false);
    refreshList();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Fees, Finance & Online Gateways (BDT ৳)
          </h1>
          <p className="text-xs text-slate-500">
            Automated invoice ledger, bKash/Nagad verification, and printable payment vouchers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => ExportService.exportFeeInvoices(invoices)}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Export Invoices (Excel)
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCollectFeeModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Record Fee Payment (Workflow 5)
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Total Realized Collection</span>
          <strong className="text-2xl font-extrabold text-emerald-600 mt-1 block">
            ৳{totalCollected.toLocaleString()}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Verified through bKash, Nagad & Cash</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Outstanding Unpaid Balance</span>
          <strong className="text-2xl font-extrabold text-rose-600 mt-1 block">
            ৳{totalDues.toLocaleString()}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Pending student invoices</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 block uppercase">Fee Invoices Logged</span>
          <strong className="text-2xl font-extrabold text-slate-900 mt-1 block">
            {invoices.length} Vouchers
          </strong>
          <span className="text-[11px] text-blue-600 mt-1 block">Session 2026</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Paid', 'Partially Paid', 'Unpaid'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, invoice ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Invoice No</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Particulars</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due</th>
                <th className="py-3 px-4">Method & Ref</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3 px-4">
                    <strong className="text-slate-900 block">{inv.studentName}</strong>
                    <span className="text-[11px] font-mono text-slate-400">{inv.studentId}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{inv.title}</td>
                  <td className="py-3 px-4">৳{inv.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">৳{inv.paidAmount.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-rose-600">৳{inv.dueAmount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {inv.paymentMethod ? (
                      <div>
                        <span className="font-semibold text-slate-800">{inv.paymentMethod}</span>
                        {inv.transactionId && (
                          <span className="block text-[10px] font-mono text-slate-400">{inv.transactionId}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        inv.status === 'Paid'
                          ? 'success'
                          : inv.status === 'Partially Paid'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const db = StorageService.getDB();
                        const student = db.students.find((s) => s.id === inv.studentId);
                        PdfService.generateFeeReceipt(inv, student);
                      }}
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      Receipt PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Payment Modal (Workflow 5) */}
      {isCollectFeeModalOpen && (
        <Modal
          isOpen={isCollectFeeModalOpen}
          onClose={() => setIsCollectFeeModalOpen(false)}
          title="Record Fee Payment (Workflow 5)"
          subtitle="Record tuition or exam collection with payment gateway verification"
          maxWidth="lg"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Student *
              </label>
              <select
                value={collectData.studentId}
                onChange={(e) => setCollectData({ ...collectData, studentId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
              >
                {StorageService.getStudents().map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.id} • Class {st.classId} {st.section} • Roll {st.roll})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Fee Particulars / Category *
              </label>
              <select
                value={collectData.title}
                onChange={(e) => {
                  let amt = 1500;
                  if (e.target.value.includes('Examination')) amt = 500;
                  if (e.target.value.includes('Admission')) amt = 5000;
                  if (e.target.value.includes('Library')) amt = 200;
                  setCollectData({
                    ...collectData,
                    title: e.target.value,
                    amount: amt,
                    paidAmount: amt,
                  });
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="Monthly Tuition Fee - March 2026">Monthly Tuition Fee (৳1,500)</option>
                <option value="First Term Examination Fee 2026">Examination Fee (৳500)</option>
                <option value="New Admission & Enrollment Fee">Admission Fee (৳5,000)</option>
                <option value="Annual Library & Laboratory Fee">Library & Lab Fee (৳200)</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Fee (৳)
                </label>
                <input
                  type="number"
                  required
                  value={collectData.amount}
                  onChange={(e) => setCollectData({ ...collectData, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Scholarship Waiver (৳)
                </label>
                <input
                  type="number"
                  value={collectData.discount}
                  onChange={(e) => setCollectData({ ...collectData, discount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Amount Received (৳)
                </label>
                <input
                  type="number"
                  required
                  value={collectData.paidAmount}
                  onChange={(e) => setCollectData({ ...collectData, paidAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold text-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Payment Gateway / Method *
                </label>
                <select
                  value={collectData.paymentMethod}
                  onChange={(e) =>
                    setCollectData({
                      ...collectData,
                      paymentMethod: e.target.value as any,
                      transactionId: e.target.value === 'Cash' ? '' : `TXN-${Date.now().toString().slice(-8)}`,
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                >
                  <option value="bKash">bKash Mobile Banking</option>
                  <option value="Nagad">Nagad Digital Wallet</option>
                  <option value="SSLCommerz">SSLCommerz Online Debit/Credit</option>
                  <option value="Cash">Cash at Accounts Counter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Transaction Reference ID
                </label>
                <input
                  type="text"
                  value={collectData.transactionId}
                  onChange={(e) => setCollectData({ ...collectData, transactionId: e.target.value })}
                  placeholder="e.g. BK-99881122"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsCollectFeeModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" icon={<Receipt className="w-4 h-4" />}>
                Record & Issue Voucher
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
