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
      <section className="min-h-screen relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-0 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* HERO SECTION */}
        <section className="py-24 md:py-32 text-center px-6 md:px-12 max-w-4xl mx-auto relative z-10">
          <div className="flex justify-start mb-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-white/20 text-white hover:text-white hover:border-white/40 transition-all duration-300 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              <Home className="h-4 w-4 mr-2" />
              {t("backToHome")}
              <ArrowRight className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t("subtitle")}
          </p>
        </section>

        {/* HIGHLIGHTS */}
        <section className="grid md:grid-cols-3 gap-8 px-6 md:px-12 max-w-5xl mx-auto pb-20 relative z-10">
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed">{t("missionText")}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("whoTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed">{t("whoText")}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("whyTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed">{t("whyText")}</p>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-20 px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
              {t("guidesTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-medium text-white mb-3">
                  {t("value1Title")}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("value1Text")}</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-medium text-white mb-3">
                  {t("value2Title")}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("value2Text")}</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-medium text-white mb-3">
                  {t("value3Title")}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("value3Text")}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AboutPage;