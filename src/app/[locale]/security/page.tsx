'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Home,
} from 'lucide-react';
import { Header } from '../components/Header/Header';
import { useTranslations } from 'next-intl';

export default function SecurityPage() {
  const t = useTranslations('security');  

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 sm:pt-8 md:pt-10  mx-auto px-4 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
        <div className='p-4 sm:p-8 md:p-12 lg:p-20'>
          <Link
            href="/"
            className='inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group text-xs sm:text-sm font-medium text-white'
          >
            <Home className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
{t('backToHome')}
            <ArrowRight className='h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 rotate-180 group-hover:-translate-x-1 transition-transform duration-300' />
          </Link>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200">
          <div className='inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 sm:mb-6 lg:mb-8'>
            <ShieldCheck className='h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-amber-400 mr-1 sm:mr-2' />
            <span className='text-xs sm:text-sm font-medium text-white'>{t('enhancedTrustVerification')}</span>
          </div>

          <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight'>
            {t('yourDigitalSafetyReimagined')}
          </h1>

          <p className='text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-6 sm:mb-8'>
            {t('securityDescription')}
          </p>

          <div className='flex flex-wrap justify-start gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-white/80 mb-8 sm:mb-10 lg:mb-12'>
            <div className='flex items-center'>
              <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 text-teal-400 mr-1 sm:mr-2' />
              <span>{t('endToEndEncryption')}</span>
            </div>
            <div className='flex items-center'>
              <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 text-teal-400 mr-1 sm:mr-2' />
              <span>{t('multiLayerAccess')}</span>
            </div>
            <div className='flex items-center'>
              <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 text-teal-400 mr-1 sm:mr-2' />
              <span>{t('realTimeAudits')}</span>
            </div>
          </div>

          <section className='space-y-6 sm:space-y-8 md:space-y-10 text-white leading-relaxed'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              
              {/* Add your security cards here with your actual translation keys */}
              {/* Example structure - replace with your actual content:
              <Card className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader className="p-0 pb-2 sm:pb-3 lg:pb-4">
                  <CardTitle className="text-base sm:text-lg lg:text-xl text-white font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                    Your Title Here
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Your content here
                  </p>
                </CardContent>
              </Card>
              */}

            </div>
          </section>
        </div>
      </main>
    </>
  );
}