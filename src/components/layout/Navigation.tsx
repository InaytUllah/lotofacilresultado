'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_CATEGORIES } from '@/lib/constants';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenAccordion(null);
  }, [pathname]);

  const handleDropdownEnter = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(index);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-emerald-600 font-bold text-xl flex-shrink-0">
            🍀 Resultados Mega Sena
          </Link>

          {/* Desktop mega menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_CATEGORIES.map((category, catIndex) => (
              <div
                key={category.title}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(catIndex)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50">
                  {category.title}
                </button>

                {openDropdown === catIndex && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-xl border border-gray-200 p-4 min-w-[280px] z-50 animate-fadeInDown">
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xl leading-none mt-0.5">{item.emoji}</span>
                          <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-50 overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {NAV_CATEGORIES.map((category, catIndex) => (
              <div key={category.title} className="border-b border-gray-100 last:border-b-0">
                <button
                  className="flex items-center justify-between w-full py-3 text-left font-medium text-gray-900"
                  onClick={() => toggleAccordion(catIndex)}
                >
                  <span>{category.title}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openAccordion === catIndex ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openAccordion === catIndex && (
                  <div className="pb-3 pl-2 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl leading-none mt-0.5">{item.emoji}</span>
                        <div>
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
