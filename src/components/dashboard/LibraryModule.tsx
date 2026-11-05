import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../services/authContext';
import { Book, BookBorrow } from '../../types';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  RotateCcw,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const LibraryModule: React.FC = () => {
  const { user, addToast } = useAuth();
  const [books, setBooks] = useState<Book[]>(() => StorageService.getBooks());
  const [borrows, setBorrows] = useState<BookBorrow[]>(() => StorageService.getBorrows());
  const [activeTab, setActiveTab] = useState<'catalog' | 'circulation'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');

  // Issue Book Modal (Workflow 7)
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState<Book | null>(null);
  const [issueStudentId, setIssueStudentId] = useState('STU-2026-001');

  // Add Book Modal
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'Science',
    isbn: '978-0123456789',
    totalCopies: 10,
    availableCopies: 10,
    shelfLocation: 'Row 3, Shelf A',
  });

  const refreshData = () => {
    setBooks(StorageService.getBooks());
    setBorrows(StorageService.getBorrows());
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookForIssue) return;

    if (selectedBookForIssue.availableCopies <= 0) {
      addToast('error', 'Inventory Exhausted', 'All copies of this book are currently on loan.');
      return;
    }

    const db = StorageService.getDB();
    const student = db.students.find((s) => s.id === issueStudentId) || db.students[0];

    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14);

    const newBorrow: BookBorrow = {
      id: `BOR-${String(borrows.length + 1).padStart(3, '0')}`,
      bookId: selectedBookForIssue.id,
      bookTitle: selectedBookForIssue.title,
      studentId: student.id,
      studentName: student.name,
      issueDate: today.toISOString().slice(0, 10),
      dueDate: dueDate.toISOString().slice(0, 10),
      status: 'Issued',
      fine: 0,
    };

    // Update book inventory
    selectedBookForIssue.availableCopies -= 1;
    StorageService.saveBook(selectedBookForIssue);
    StorageService.saveBorrow(newBorrow);

    StorageService.logAction(
      user?.name || 'Librarian',
      user?.role || 'librarian',
      'ISSUE_BOOK',
      'Library',
      `Issued "${selectedBookForIssue.title}" to student ${student.name} (${student.id})`
    );

    addToast('success', 'Book Issued', `"${selectedBookForIssue.title}" issued to ${student.name}.`);
    setIsIssueModalOpen(false);
    refreshData();
  };

  const handleReturnBook = (borrow: BookBorrow) => {
    const book = books.find((b) => b.id === borrow.bookId);
    if (book) {
      book.availableCopies += 1;
      StorageService.saveBook(book);
    }

    borrow.status = 'Returned';
    borrow.returnDate = new Date().toISOString().slice(0, 10);
    StorageService.saveBorrow(borrow);

    StorageService.logAction(
      user?.name || 'Librarian',
      user?.role || 'librarian',
      'RETURN_BOOK',
      'Library',
      `Returned "${borrow.bookTitle}" from student ${borrow.studentName}`
    );

    addToast('success', 'Book Returned', `"${borrow.bookTitle}" checked back into inventory.`);
    refreshData();
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title?.trim()) return;

    const bookToSave: Book = {
      id: `BK-${100 + books.length + 1}`,
      title: newBook.title.trim(),
      author: newBook.author?.trim() || 'Author',
      category: newBook.category || 'General',
      isbn: newBook.isbn || 'N/A',
      totalCopies: Number(newBook.totalCopies) || 5,
      availableCopies: Number(newBook.totalCopies) || 5,
      shelfLocation: newBook.shelfLocation || 'Row 1',
    };

    StorageService.saveBook(bookToSave);
    addToast('success', 'Book Added', `"${bookToSave.title}" added to catalog.`);
    setIsAddBookModalOpen(false);
    refreshData();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Library Catalog & Book Circulation
          </h1>
          <p className="text-xs text-slate-500">
            Track {books.length} titles in inventory, student issues, returns, and late fines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddBookModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Book to Catalog
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Book Catalog ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('circulation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'circulation'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Borrowing & Circulation Ledger ({borrows.length})
        </button>
      </div>

      {activeTab === 'catalog' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Book ID</th>
                    <th className="py-3 px-4">Title & Author</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Shelf Location</th>
                    <th className="py-3 px-4">Available / Total</th>
                    <th className="py-3 px-4 text-right">Circulation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBooks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.id}</td>
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block font-semibold">{b.title}</strong>
                        <span className="text-[11px] text-slate-400">{b.author}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="primary" size="sm">{b.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{b.shelfLocation}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${b.availableCopies > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {b.availableCopies}
                        </span>{' '}
                        / {b.totalCopies} Copies
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={b.availableCopies <= 0}
                          onClick={() => {
                            setSelectedBookForIssue(b);
                            setIsIssueModalOpen(true);
                          }}
                          icon={<ArrowRightLeft className="w-3.5 h-3.5" />}
                        >
                          Issue Book (Workflow 7)
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Circulation Ledger */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Issue ID</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrowing Student</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {borrows.map((bor) => (
                  <tr key={bor.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{bor.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{bor.bookTitle}</td>
                    <td className="py-3 px-4">
                      <span className="block text-slate-900 font-medium">{bor.studentName}</span>
                      <span className="text-[11px] font-mono text-slate-400">{bor.studentId}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{bor.issueDate}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{bor.dueDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          bor.status === 'Returned'
                            ? 'success'
                            : bor.status === 'Overdue'
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {bor.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {bor.status !== 'Returned' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturnBook(bor)}
                          icon={<RotateCcw className="w-3.5 h-3.5" />}
                        >
                          Return Book
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-600 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Returned
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Issue Book Modal (Workflow 7) */}
      {isIssueModalOpen && selectedBookForIssue && (
        <Modal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
          title={`Issue Book: ${selectedBookForIssue.title}`}
          subtitle={`Available copies: ${selectedBookForIssue.availableCopies} of ${selectedBookForIssue.totalCopies}`}
          maxWidth="md"
        >
          <form onSubmit={handleIssueBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Borrowing Student *
              </label>
              <select
                value={issueStudentId}
                onChange={(e) => setIssueStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
              >
                {StorageService.getStudents().map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.id} • Class {st.classId} {st.section} • Roll {st.roll})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <div>Issue Date: <strong>{new Date().toISOString().slice(0, 10)}</strong></div>
              <div>Standard Loan Period: <strong>14 Days (Free)</strong></div>
              <div>Overdue Fine: <strong>৳5 / Day after due date</strong></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsIssueModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Confirm & Issue Book
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <Modal
          isOpen={isAddBookModalOpen}
          onClose={() => setIsAddBookModalOpen(false)}
          title="Add New Book to Library"
          subtitle="Catalog entry and shelf inventory assignment"
        >
          <form onSubmit={handleAddBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                placeholder="e.g. Higher Secondary Physics Guide"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="e.g. Dr. G. Shah"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Language">Language</option>
                  <option value="Literature">Literature</option>
                  <option value="Technology">Technology</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Total Copies In Stock
                </label>
                <input
                  type="number"
                  min="1"
                  value={newBook.totalCopies}
                  onChange={(e) => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Shelf Location
                </label>
                <input
                  type="text"
                  value={newBook.shelfLocation}
                  onChange={(e) => setNewBook({ ...newBook, shelfLocation: e.target.value })}
                  placeholder="e.g. Row 3, Shelf B"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setIsAddBookModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Add Book
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
