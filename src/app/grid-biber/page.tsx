'use client';

import React from 'react';

const architectureProjects = [
  { id: 1, title: 'JBF LTD Pop-up Restaurant', gradient: 'from-slate-400 to-slate-600' },
  { id: 2, title: 'Harley-Davidson Museum', gradient: 'from-slate-500 to-slate-700' },
  { id: 3, title: 'Oceanfront Residence', gradient: 'from-slate-300 to-slate-500' },
  { id: 4, title: 'Arizona Cardinals', gradient: 'from-slate-600 to-slate-800' },
  { id: 5, title: 'Riverways', gradient: 'from-slate-400 to-slate-500' },
];

const sketchbookProjects = [
  { id: 1, title: 'FESTOOL', gradient: 'from-gray-400 to-gray-600' },
  { id: 2, title: 'Swiss Army House', gradient: 'from-gray-500 to-gray-700' },
  { id: 3, title: 'Vertical Zoo', gradient: 'from-gray-300 to-gray-500' },
  { id: 4, title: 'Forever', gradient: 'from-gray-600 to-gray-800' },
  { id: 5, title: 'Kennedy Institute for the US Senate', gradient: 'from-gray-400 to-gray-600' },
];

const wordsProjects = [
  { id: 1, title: 'JBF LTD X 27', gradient: 'from-zinc-400 to-zinc-600' },
  { id: 2, title: 'Pictures of Pictures', gradient: 'from-zinc-500 to-zinc-700' },
  { id: 3, title: 'Le Corbusier Le Cabanon', gradient: 'from-zinc-300 to-zinc-500' },
  { id: 4, title: 'How I Became a Designer', gradient: 'from-zinc-600 to-zinc-800' },
  { id: 5, title: 'The Architecture of Identity', gradient: 'from-zinc-400 to-zinc-600' },
];

const ideas = [
  { id: 1, number: '001', title: 'Modular Urban Housing', description: 'Adaptable residential units for diverse city contexts' },
  { id: 2, number: '002', title: 'Green Infrastructure Bridge', description: 'Living structures that connect communities' },
  { id: 3, number: '003', title: 'Adaptive Heritage Spaces', description: 'Reimagining historical buildings for contemporary use' },
  { id: 4, number: '004', title: 'Digital Fabrication Studio', description: 'Community-driven design and production hub' },
  { id: 5, number: '005', title: 'Floating Market District', description: 'Waterfront commerce and cultural exchange' },
];

interface GridItemProps {
  title: string;
  gradient: string;
}

interface IdeaItemProps {
  number: string;
  title: string;
  description: string;
}

interface SectionProps {
  title: string;
  subLinks: string[];
  items: GridItemProps[];
}

const GridItem: React.FC<GridItemProps> = ({ title, gradient }) => (
  <div className="group cursor-pointer">
    <div
      className={`bg-gradient-to-br ${gradient} aspect-square mb-3 transition-opacity duration-300 group-hover:opacity-80`}
      aria-label={title}
    />
    <h4 className="text-xs leading-tight font-light text-gray-900 group-hover:text-gray-700 transition-colors">
      {title}
    </h4>
  </div>
);

const IdeaItem: React.FC<IdeaItemProps> = ({ number, title, description }) => (
  <div className="group cursor-pointer">
    <div className="bg-gradient-to-br from-stone-300 to-stone-500 aspect-square mb-3 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-80">
      <span className="text-2xl font-bold text-white tracking-wider">{number}</span>
    </div>
    <h4 className="text-xs font-light text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
      {title}
    </h4>
    <p className="text-xs text-gray-600 leading-tight font-light">{description}</p>
  </div>
);

const Section: React.FC<SectionProps> = ({ title, subLinks, items }) => (
  <section className="border-t border-gray-200 py-12">
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">{title}</h2>
        <div className="flex gap-6 mb-12">
          {subLinks.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="text-xs text-gray-700 hover:text-gray-900 transition-colors font-light border-b border-transparent hover:border-gray-900 pb-1"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {items.map((item, idx) => (
          <GridItem key={idx} title={item.title} gradient={item.gradient} />
        ))}
      </div>
    </div>
  </section>
);

export default function GridBiberPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-bold tracking-tighter">b'ber</div>
            <nav className="flex gap-24">
              <div className="flex flex-col gap-3">
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Architecture
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Sketchbook
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Words
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  100 Ideas™
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  About
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Contact
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Clients
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Press
                </a>
                <a href="#" className="text-xs hover:text-gray-600 transition-colors font-light">
                  Quick Tour
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Architecture Section */}
      <Section
        title="Architecture"
        subLinks={['Museums', 'Private Residences', 'Retail/Restaurant', 'Corporate/Institution', 'Civic/Urban']}
        items={architectureProjects}
      />

      {/* Sketchbook Section */}
      <Section
        title="Sketchbook"
        subLinks={['Competitions', 'Products', 'Art', 'Now in Progress']}
        items={sketchbookProjects}
      />

      {/* Words Section */}
      <Section
        title="Words"
        subLinks={['Essays', 'Talks', 'Publications', 'Blog']}
        items={wordsProjects}
      />

      {/* 100 Ideas Section */}
      <section className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">100 Ideas™</h2>
            <div className="flex gap-6 mb-12">
              <a href="#" className="text-xs text-gray-700 hover:text-gray-900 transition-colors font-light border-b border-transparent hover:border-gray-900 pb-1">
                100 Ideas for NY™
              </a>
              <a href="#" className="text-xs text-gray-700 hover:text-gray-900 transition-colors font-light border-b border-transparent hover:border-gray-900 pb-1">
                Your Ideas
              </a>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {ideas.map((idea) => (
              <IdeaItem
                key={idea.id}
                number={idea.number}
                title={idea.title}
                description={idea.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 font-light">© Biber Architects 2011</p>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-light">
                Instagram
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-light">
                Twitter
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-light">
                LinkedIn
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-light">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
