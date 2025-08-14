"use client";

import { useTranslations } from "next-intl";
import { Header } from "../components/Header/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Zap,
  Shield,
  HelpCircle,
  Clock,
  User,
  Home,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const t = useTranslations("blog");

  const tableOfContents = [
    { id: "overview", title: t("overview.title"), icon: BookOpen },
    { id: "quickStart", title: t("quickStart.title"), icon: Zap },
    { id: "authentication", title: t("authentication.title"), icon: Shield },
    { id: "faq", title: t("faq.title"), icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-4 pt-6 sm:pt-8 md:pt-10 container mx-auto px-4 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
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
          
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-white">{t("meta.readTime")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-white">{t("meta.updated")}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <article className="prose prose-lg prose-gray max-w-none">
              {/* Overview */}
              <section id="overview">
                <Card className="bg-white/5 backdrop-blur-sm border mb-6 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-white m-0">
                        {t("overview.title")}
                      </h2>
                    </div>
                    <p className="text-white/90 leading-relaxed m-0 text-sm sm:text-base">
                      {t("overview.content")}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Additional sections can be added here following the same pattern */}
              {tableOfContents.slice(1).map((section) => {
                const IconComponent = section.icon;
                return (
                  <section key={section.id} id={section.id}>
                    <Card className="bg-white/5 backdrop-blur-sm mb-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl">
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-white m-0">
                            {section.title}
                          </h2>
                        </div>
                        <p className="text-white/90 leading-relaxed m-0 text-sm sm:text-base">
                          {t(`${section.id}.content`) || 'Content for this section will be added here.'}
                        </p>
                      </CardContent>
                    </Card>
                  </section>
                );
              })}
            </article>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;