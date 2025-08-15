"use client";

import Link from "next/link";
import { Header } from "../components/Header/Header";
import { useTranslations } from "next-intl";
import { Home, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const t = useTranslations("about");

  return (
    <>
      <Header />
      <section className="min-h-screen pt-6 sm:pt-8 md:pt-10 container mx-auto px-4 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
       
        
        <div className="p-4 sm:p-8 md:p-12 lg:p-20">
          <Link
            href="/"
            className='inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group text-xs sm:text-sm font-medium text-white'
          >
            <Home className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
              {t('backToHome')}
            <ArrowRight className='h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 rotate-180 group-hover:-translate-x-1 transition-transform duration-300' />
          </Link>
        </div>

        <div className="px-2 sm:px-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16 leading-tight">
            {t("title")}
          </h1>
        </div>
        
        {/* HIGHLIGHTS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto pb-8 sm:pb-12 md:pb-16 lg:pb-20 relative z-10">
          <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{t("missionText")}</p>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4">
              {t("whoTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{t("whoText")}</p>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4">
              {t("whyTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{t("whyText")}</p>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              {t("guidesTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2 sm:mb-3">
                  {t("value1Title")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{t("value1Text")}</p>
              </div>
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2 sm:mb-3">
                  {t("value2Title")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{t("value2Text")}</p>
              </div>
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2 sm:mb-3">
                  {t("value3Title")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{t("value3Text")}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AboutPage;