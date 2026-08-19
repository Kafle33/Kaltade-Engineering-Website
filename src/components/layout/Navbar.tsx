'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  FileText,
  Building2,
  Scale,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '/services',
      hasDropdown: true,
      subItems: [
        {
          name: 'Engineering Consultancy',
          href: '/services/engineering',
          desc: 'Building design, structural analysis, site inspection & municipal approvals',
          icon: Compass,
        },
        {
          name: 'Detailed Project Report (DPR)',
          href: '/services/dpr',
          desc: 'Bankable DPRs, feasibility studies & financial modeling',
          icon: FileText,
        },
        {
          name: 'Property Valuation',
          href: '/valuation',
          desc: 'Institutional property valuation for banks, BFIs & owners',
          icon: Scale,
        },
        {
          name: 'Real Estate Consultancy',
          href: '/real-estate',
          desc: 'Advisory, buying, selling, due diligence & development',
          icon: Building2,
        },
      ],
    },
    { name: 'Valuation', href: '/valuation' },
    { name: 'Real Estate', href: '/real-estate' },
    { name: 'Properties', href: '/properties' },
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-xs dark:shadow-card-dark border-b border-slate-200/80 dark:border-dark-border py-2.5 sm:py-3'
            : isHomePage
            ? 'bg-gradient-to-b from-navy-950/95 via-navy-950/60 to-transparent py-3 sm:py-4 text-white'
            : 'bg-white dark:bg-dark-bg border-b border-slate-200 dark:border-dark-border py-2.5 sm:py-3'
        )}
      >
        {/* Top mini-bar for contact & fast action */}
        {!isScrolled && isHomePage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2.5 mb-2 border-b border-white/10 hidden md:flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                LN. Chowk, Dhangadhi, Nepal
              </span>
              <a href="tel:+9779858425256" className="hover:text-white transition-colors text-amber-300 font-semibold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                +977-9858425256
              </a>
              <span>Engineering • Property Valuation • Real Estate</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:kaltadeengineeringservices@gmail.com"
                className="hover:text-white transition-colors text-slate-300"
              >
                kaltadeengineeringservices@gmail.com
              </a>

            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-slate-200/80 dark:border-dark-border bg-white p-0.5 shadow-xs transition-transform group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="Kaltade Engineering Services Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    'font-black text-lg sm:text-xl tracking-tight leading-tight',
                    !isScrolled && isHomePage
                      ? 'text-white'
                      : 'text-navy-950 dark:text-white'
                  )}
                >
                  KALTADE
                </span>
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-tight',
                    !isScrolled && isHomePage
                      ? 'text-blue-200'
                      : 'text-navy-700 dark:text-sky-400'
                  )}
                >
                  Engineering Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
                          !isScrolled && isHomePage
                            ? 'text-slate-200 hover:text-white hover:bg-white/10'
                            : isActive
                            ? 'text-navy-900 dark:text-sky-300 bg-navy-50 dark:bg-dark-card'
                            : 'text-slate-700 dark:text-slate-200 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
                        )}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </button>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 pt-2 z-50">
                          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-xl dark:shadow-card-dark border border-slate-200 dark:border-dark-border p-2 text-slate-800 dark:text-slate-200">
                            {link.subItems?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-card transition-colors group/sub"
                              >
                                <div className="p-2 rounded-lg bg-navy-50 dark:bg-navy-900/60 text-navy-800 dark:text-sky-400 group-hover/sub:bg-navy-900 group-hover/sub:text-white dark:group-hover/sub:bg-navy-800 transition-colors">
                                  <sub.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-navy-950 dark:text-white group-hover/sub:text-navy-700 dark:group-hover/sub:text-sky-300">
                                    {sub.name}
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            ))}
                            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-dark-border px-2 pb-1">
                              <Link
                                href="/services"
                                className="text-xs font-semibold text-navy-700 dark:text-sky-400 hover:text-navy-900 dark:hover:text-sky-300 flex items-center justify-between"
                              >
                                <span>View All Capabilities</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
                      !isScrolled && isHomePage
                        ? isActive
                          ? 'text-white bg-white/15'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                        : isActive
                        ? 'text-navy-900 dark:text-sky-300 bg-navy-50 dark:bg-dark-card'
                        : 'text-slate-700 dark:text-slate-200 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Action Buttons + Theme Toggle */}
            <div className="hidden sm:flex items-center gap-2.5">
              <ThemeToggle size="md" />

              <Button
                href="/valuation"
                variant={!isScrolled && isHomePage ? 'white' : 'secondary'}
                size="sm"
                className="hidden xl:inline-flex"
              >
                Request Valuation
              </Button>
              <Button
                href="/contact"
                variant={!isScrolled && isHomePage ? 'accent' : 'primary'}
                size="sm"
              >
                Get Consultation
              </Button>
            </div>

            {/* Mobile Menu Button + Mobile Theme Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  !isScrolled && isHomePage
                    ? 'text-white hover:bg-white/10'
                    : 'text-navy-950 dark:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
                )}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-navy-950/70 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white dark:bg-dark-bg shadow-2xl z-10 flex flex-col overflow-y-auto border-l border-slate-200 dark:border-dark-border">
            <div className="p-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between bg-slate-50 dark:bg-dark-surface">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-dark-border bg-white p-0.5">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-extrabold text-base text-navy-950 dark:text-white">
                  KALTADE
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-elevated"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 space-y-1">
              {/* Theme toggle row in mobile drawer */}
              <div className="pb-3 mb-2 border-b border-slate-100 dark:border-dark-border">
                <ThemeToggle variant="labeled" />
              </div>

              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors',
                      pathname === link.href
                        ? 'bg-navy-50 dark:bg-dark-card text-navy-900 dark:text-sky-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-card'
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 py-1 space-y-1">
                      {link.subItems?.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-2 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-sky-300 hover:bg-slate-50 dark:hover:bg-dark-card"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-dark-border space-y-2 mt-4">
                <Link
                  href="/properties/find"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
                >
                  🔍 Tell Us What Property You Need
                </Link>
                <Link
                  href="/properties/list"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
                >
                  📝 List Your Property
                </Link>

              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-dark-border bg-slate-50 dark:bg-dark-surface space-y-2">
              <Button href="/valuation" variant="secondary" className="w-full">
                Request Property Valuation
              </Button>
              <Button href="/contact" variant="primary" className="w-full">
                Get Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
