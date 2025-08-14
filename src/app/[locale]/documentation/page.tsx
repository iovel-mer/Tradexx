"use client";

import { useTranslations } from "next-intl";
import { Header } from "../components/Header/Header";
import Link from "next/link";
import { ArrowRight, Home, BookOpen, Shield, TrendingUp, Lightbulb } from "lucide-react";

const page = () => {
  const t = useTranslations("docs");

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 sm:pt-8 md:pt-10 container mx-auto px-4 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
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
          
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              {t("title")}
            </h1>
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-10 text-white leading-relaxed">
            {/* SECTION TEMPLATE */}
            {[
              {
                icon: <Shield className="w-4 h-4 sm:w-5 sm:w-5 lg:w-6 lg:h-6 text-white" />,
                title: t("blockchain.title"),
                text: t("blockchain.text"),
              },
              {
                icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:w-5 lg:w-6 lg:h-6 text-white" />,
                title: t("popular.title"),
                content: (
                  <ul className="space-y-3 sm:space-y-4 text-white/90 text-sm sm:text-base">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                      <span><strong className="text-white">Bitcoin (BTC):</strong> {t("popular.bitcoin")}</span>
                    </li>
                  </ul>
                ),
              },
              {
                icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:w-5 lg:w-6 lg:h-6 text-white" />,
                title: t("buy.title"),
                content: (
                  <ol className="space-y-3 sm:space-y-4 text-white/90 text-sm sm:text-base">
                    {[1, 2].map((step) => (
                      <li key={step} className="flex items-start gap-3 sm:gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                          {step}
                        </div>
                        <span className="leading-relaxed">{t(`buy.step${step}`)}</span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:w-5 lg:w-6 lg:h-6 text-white" />,
                title: t("tips.title"),
                content: (
                  <ul className="space-y-3 sm:space-y-4 text-white/90 text-sm sm:text-base">
                    {[1, 2].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{t(`tips.tip${tip}`)}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map(({ icon, title, text, content }, i) => (
              <section
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
              >
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    {icon}
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-white leading-tight">{title}</h2>
                </div>
                {text && (
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {text}
                  </p>
                )}
                {content}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default page;