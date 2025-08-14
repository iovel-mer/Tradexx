'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Shield, TrendingUp, Zap } from 'lucide-react';

export default function Footer() {
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const routeMapping = {
    'About Us': `/${locale}/about`,
    Security: `/${locale}/security`,
    'Help Center': `/${locale}/help`,
    'Contact Us': `/${locale}/contact`,
    Blog: `/${locale}/blog`,
    Documentation: `/${locale}/documentation`,
    TermsOfService: `/${locale}/terms`,
    PrivacyPolicy: `/${locale}/privacy`,
    CookiePolicy: `/${locale}/cookie`,
  };

  const translationMapping = {
    'About Us': 'aboutUs',
    Security: 'security',
    'Help Center': 'helpCenter',
    'Contact Us': 'contactUs',
    Blog: 'blog',
    Documentation: 'documentation',
    TermsOfService: 'terms.title',
    PrivacyPolicy: 'privacy.title',
    CookiePolicy: 'cookies.title',
  };

  return (
    <div className='relative'>
      {/* Footer */}
      <footer className='py-20 px-6 bg-black text-white overflow-hidden'>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-16 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500"></div>

        <div className='container mx-auto relative z-10'>
          <div className='grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16'>
            <div className='lg:col-span-2 md:col-span-2'>
              <div className='flex items-center space-x-4 mb-8'>
                <span className='text-3xl font-bold tracking-wide text-white'>
                  TradeX
                </span>
              </div>
              <p className='text-gray-300 mb-8 max-w-sm text-lg leading-relaxed'>
                {tFooter('description')}
              </p>
              
              {/* Decorative Lines */}
              <div className="space-y-2 opacity-60">
                <div className="h-px bg-gradient-to-r from-emerald-500 to-transparent w-3/4"></div>
                <div className="h-px bg-gradient-to-r from-blue-500 to-transparent w-1/2"></div>
                <div className="h-px bg-gradient-to-r from-violet-500 to-transparent w-2/3"></div>
              </div>
            </div>

            {[
              {
                title: tFooter('company'),
                links: ['About Us', 'Security'],
                color: 'from-emerald-400 to-teal-500'
              },
              {
                title: tFooter('terms.title'),
                links: ['TermsOfService', 'PrivacyPolicy', 'CookiePolicy'],
                color: 'from-blue-400 to-indigo-500'
              },
              {
                title: tFooter('support'),
                links: ['Help Center', 'Contact Us'],
                color: 'from-violet-400 to-purple-500'
              },
              {
                title: tFooter('resources'),
                links: ['Blog', 'Documentation'],
                color: 'from-cyan-400 to-blue-500'
              },
            ].map((section, index) => (
              <div key={section.title} className='md:col-span-1'>
                <h3 className={`font-bold mb-6 text-lg bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                  {section.title}
                </h3>
                <ul className='space-y-4'>
                  {section.links.map(link => (
                    <li key={link} className="relative group">
                      <Link
                        href={routeMapping[link as keyof typeof routeMapping]}
                        className='text-gray-300  cursor-pointer font-medium text-base relative inline-block '
                      >
                        <span className="relative z-10">
                          {tFooter(
                            translationMapping[
                              link as keyof typeof translationMapping
                            ]
                          )}
                        </span>
                       
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Legal Info Section */}
          <div className='relative bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-10 mb-12 shadow-lg'>
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 rounded-t-2xl"></div>
            
            <div className='flex flex-col w-full space-y-6'>
              <p className='text-gray-300 font-medium text-base leading-relaxed'>{tFooter('company_info')}</p>
              <p className='text-gray-300 font-medium text-base leading-relaxed'>{tFooter('risk_warning')}</p>
              <p className='text-gray-300 text-base leading-relaxed'>{tFooter('execution_notice')}</p>
              <p className='text-gray-300 font-medium text-base leading-relaxed'>{tFooter('age_restriction')}</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <span className="text-gray-300 text-lg">
              © {new Date().getFullYear()} TradeX {tFooter('rights')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}