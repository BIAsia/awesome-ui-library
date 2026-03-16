'use client';

import { useState } from 'react';

const books = [
  { id: 1, title: 'A Promised Land', author: 'Barack Obama', price: 28 },
  { id: 2, title: 'Memorial', author: 'Bryan Washington', price: 32, featured: true },
  { id: 3, title: "People's Free Food Program", author: 'Community', price: 24 },
  { id: 4, title: 'Women Race & Class', author: 'Angela Davis', price: 18 },
  { id: 5, title: 'How to Slowly Kill Yourself', author: 'Kiese Laymon', price: 16 },
  { id: 6, title: 'Our History Is The Future', author: 'Dina Gilio-Whitaker', price: 22 },
  { id: 7, title: 'Noah Davis', author: 'Various', price: 35 },
  { id: 8, title: 'The Souls of Black Folk', author: 'W.E.B. Du Bois', price: 14 },
  { id: 9, title: 'Revolutionary Suicide', author: 'Huey P. Newton', price: 26 },
  { id: 10, title: 'Freedom is a Constant Struggle', author: 'Angela Davis', price: 20 },
  { id: 11, title: 'The Bluest Eye', author: 'Toni Morrison', price: 17 },
  { id: 12, title: 'Beloved', author: 'Toni Morrison', price: 19 },
  { id: 13, title: 'Assata: An Autobiography', author: 'Assata Shakur', price: 18 },
  { id: 14, title: 'The New Jim Crow', author: 'Michelle Alexander', price: 19 },
  { id: 15, title: 'A People\'s History', author: 'Howard Zinn', price: 25 },
  { id: 16, title: 'Sister Outsider', author: 'Audre Lorde', price: 21 },
  { id: 17, title: 'The Wretched of the Earth', author: 'Frantz Fanon', price: 23 },
  { id: 18, title: 'In Defense of Looting', author: 'Vicky Osterweil', price: 17 },
  { id: 19, title: 'All About Love', author: 'bell hooks', price: 18 },
  { id: 20, title: 'The Second Sex', author: 'Simone de Beauvoir', price: 24 },
];

export default function GridBookclub() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [viewMode] = useState('STACK');
  const [sortMode] = useState('NEW');
  const [subject] = useState('ALL');

  const featuredBook = books.find((b) => b.featured) || books[1];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#a0a0a0' }}>
      {/* Top Navigation Banner */}
      <nav className="w-full px-6 py-4" style={{ backgroundColor: '#c8ff00' }}>
        <div className="flex items-center justify-between">
          {/* Left: Search */}
          <div className="flex items-center gap-3">
            <span className="font-black text-lg">SEARCH</span>
            <div className="w-4 h-4 bg-black"></div>
          </div>

          {/* Center: Menu Items */}
          <div className="flex items-center gap-8 font-bold text-sm">
            <span>Books, Audiobooks, Noname's Book Club, Home + Apparel, Gift Cards, All</span>
          </div>

          {/* Right: Cart */}
          <div className="font-black text-lg">CART (1)</div>
        </div>
      </nav>

      {/* Filter Bar */}
      <div className="w-full px-6 py-4 bg-gray-300 border-b-2 border-gray-400">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">View:</span>
            <button className="font-bold text-sm border border-black px-3 py-1 bg-white hover:bg-gray-100">
              {viewMode} ∨
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Sort by:</span>
            <button className="font-bold text-sm border border-black px-3 py-1 bg-white hover:bg-gray-100">
              {sortMode} ∨
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Subject:</span>
            <button className="font-bold text-sm border border-black px-3 py-1 bg-white hover:bg-gray-100">
              {subject} ∨
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="relative w-full">
        <div className="flex">
          {/* Book Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-5 gap-4">
              {books.map((book) => {
                const isFeatured = hoveredId === book.id || (hoveredId === null && book.featured);
                const isLarge = isFeatured;

                return (
                  <div
                    key={book.id}
                    className={`transition-all duration-200 ${
                      isLarge ? 'col-span-2 row-span-2' : 'col-span-1'
                    }`}
                    onMouseEnter={() => setHoveredId(book.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 transition-all duration-200"
                      style={{
                        backgroundColor: isLarge ? '#c8ff00' : '#ffffff',
                        aspectRatio: isLarge ? '2/3' : '3/4',
                        padding: isLarge ? '20px' : '16px',
                      }}
                    >
                      {isLarge ? (
                        <div className="w-full h-full flex flex-col justify-between">
                          {/* Book Cover Placeholder in Featured */}
                          <div
                            className="w-full flex-1 bg-gray-200 border-2 border-gray-400 flex items-center justify-center mb-4"
                            style={{ minHeight: '150px' }}
                          >
                            <div className="text-center px-2">
                              <p className="font-black text-xs text-gray-700 line-clamp-3">
                                {book.title}
                              </p>
                            </div>
                          </div>

                          {/* Featured Content */}
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-xs">{book.author}</p>
                            <p className="text-xs line-clamp-2 text-gray-800">
                              A powerful and essential work exploring contemporary themes and voices.
                            </p>
                            <p className="font-black text-sm">${book.price}</p>
                            <button
                              className="font-black text-xs bg-black text-white px-3 py-2 hover:bg-gray-800 w-full border border-black"
                              onClick={() => alert(`Viewing ${book.title}`)}
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-between">
                          {/* Book Cover Placeholder */}
                          <div
                            className="w-full flex-1 bg-gradient-to-b from-gray-300 to-gray-200 border-2 border-gray-400 flex items-center justify-center mb-2"
                            style={{ minHeight: '100px' }}
                          >
                            <p className="font-bold text-center text-xs text-gray-800 px-2 line-clamp-3">
                              {book.title}
                            </p>
                          </div>

                          {/* Price */}
                          <p className="font-black text-sm">${book.price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
