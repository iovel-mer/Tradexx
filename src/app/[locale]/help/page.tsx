"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  TrendingUp,
  Shield,
  Users,
  Zap,
  Home,
  ArrowRight,
} from "lucide-react";

const Page = () => {
  const t = useTranslations("help");

  const helpCategories = [
    {
      icon: TrendingUp,
      title: t("categories.trading.title"),
      description: t("categories.trading.description"),
      gradient: "from-violet-400 via-fuchsia-500 to-purple-600",
      bgGlow: "bg-gradient-to-br from-violet-500/20 to-purple-500/20",
      items: [
        t("categories.trading.items.0"),
        t("categories.trading.items.1"),
        t("categories.trading.items.2"),
      ],
    },
    {
      icon: Shield,
      title: t("categories.security.title"),
      description: t("categories.security.description"),
      gradient: "from-amber-400 via-orange-500 to-red-600",
      bgGlow: "bg-gradient-to-br from-amber-500/20 to-red-500/20",
      items: [
        t("categories.security.items.0"),
        t("categories.security.items.1"),
        t("categories.security.items.2"),
      ],
    },
    {
      icon: Users,
      title: t("categories.account.title"),
      description: t("categories.account.description"),
      gradient: "from-teal-400 via-cyan-500 to-blue-600",
      bgGlow: "bg-gradient-to-br from-teal-500/20 to-blue-500/20",
      items: [
        t("categories.account.items.0"),
        t("categories.account.items.1"),
        t("categories.account.items.2"),
      ],
    },
    {
      icon: Zap,
      title: t("categories.features.title"),
      description: t("categories.features.description"),
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      bgGlow: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      items: [
        t("categories.features.items.0"),
        t("categories.features.items.1"),
        t("categories.features.items.2"),
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 sm:pt-8 md:pt-10 container mx-auto px-4 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        
        <div className='p-4 sm:p-8 md:p-12 lg:p-20'>
          <Link 
            href="/" 
            className='inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full 
              text-xs sm:text-sm font-medium text-white border-2 white hover:bg-white/20 hover:border-white/30 transition-all duration-300 group'
          >
            <Home className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
            {t('backToHome')}
            <ArrowRight className='h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 rotate-180 group-hover:-translate-x-1 transition-transform duration-300' />
          </Link>
        </div>

        <div className="max-w-6xl mx-auto rounded-2xl shadow-xl p-6 sm:p-10 
    ">
          
          {/* Hero Section */}
          <section className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full  mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 text-white" />
              <span className="text-white font-semibold text-xs sm:text-sm">{t('helpCenter')}</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </section>

          {/* Help Categories Section */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 sm:mb-6">
                {t("browse.title")}
              </h2>
              <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                {t("browse.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {helpCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm  hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-xl"
                  >
                    <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm  
                       flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 leading-tight">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 p-4 sm:p-6 pt-0 space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <p
                          key={itemIndex}
                          className="text-white/60 text-xs sm:text-sm hover:text-white/80 transition-colors duration-300 leading-relaxed"
                        >
                          {item}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;