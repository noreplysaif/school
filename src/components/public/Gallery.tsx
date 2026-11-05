import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Science' | 'Cultural';
  imageUrl: string;
  date: string;
}

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const galleryItems: GalleryItem[] = [
    {
      id: 'G1',
      title: 'Annual Athletic Meet & March Past',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      date: 'March 2026',
    },
    {
      id: 'G2',
      title: 'State of the Art Physics Laboratory',
      category: 'Science',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      date: 'February 2026',
    },
    {
      id: 'G3',
      title: 'Main Academic Campus & Courtyard',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      date: 'January 2026',
    },
    {
      id: 'G4',
      title: 'Bangla Noboborsho Cultural Festival',
      category: 'Cultural',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      date: 'April 2025',
    },
    {
      id: 'G5',
      title: 'Robotics & STEM Exhibition Project',
      category: 'Science',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      date: 'January 2026',
    },
    {
      id: 'G6',
      title: 'Inter-House Basketball Final Match',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      date: 'February 2026',
    },
    {
      id: 'G7',
      title: 'Central Digital Reading Library',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      date: 'November 2025',
    },
    {
      id: 'G8',
      title: 'Victory Day Patriotic Musical Choir',
      category: 'Cultural',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      date: 'December 2025',
    },
  ];

  const categories = ['All', 'Campus', 'Sports', 'Science', 'Cultural'];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Campus Life in Pictures</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Events & Photo Gallery</h1>
          <p className="text-slate-600 text-sm">
            Capturing vibrant moments of scientific discovery, athletic competition, cultural heritage, and academic rigor.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
                <span className="text-xs text-slate-400 mt-1 block">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
