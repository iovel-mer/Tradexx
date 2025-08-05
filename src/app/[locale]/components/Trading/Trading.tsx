"use client"

import React from "react"
import { useLocale, useTranslations } from "next-intl"
import { CheckCircle, TrendingUp, Shield, Zap, DollarSign, HeadphonesIcon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Trading: React.FC = () => {
  const t = useTranslations("trade")
  const locale = useLocale();

  const featureIcons = [
    TrendingUp,
    Shield,
    Zap,
    DollarSign,
    HeadphonesIcon,
    Globe
  ]

  const features = [
    {
      icon: featureIcons[0],
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: featureIcons[1],
      title: t("features.security.title"),
      description: t("features.security.description"),
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: featureIcons[2],
      title: t("features.speed.title"),
      description: t("features.speed.description"),
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: featureIcons[3],
      title: t("features.fees.title"),
      description: t("features.fees.description"),
      gradient: "from-violet-400 to-purple-500"
    },
    {
      icon: featureIcons[4],
      title: t("features.support.title"),
      description: t("features.support.description"),
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: featureIcons[5],
      title: t("features.access.title"),
      description: t("features.access.description"),
      gradient: "from-cyan-400 to-blue-500"
    }
  ]

  return (
    <section className="relative py-20 px-6 mx-auto overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-orange-200 to-red-300 rounded-full blur-2xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      <div className="text-center relative z-10 max-w-7xl mx-auto">
        {/* Clean Badge */}
        <div className="mb-10 inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-200 px-8 py-4 rounded-full text-sm font-semibold text-emerald-700 shadow-lg shadow-emerald-100/50 hover:shadow-xl hover:shadow-emerald-200/60 transition-all duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>{t("badge")}</span>
        </div>

        {/* Modern Typography */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          <span className="text-gray-900 font-light">
            {t("title.line1")}
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent font-extrabold">
            {t("title.line2")}
          </span>
        </h2>

        {/* Elegant Description */}
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
          {t("description")}
        </p>

        {/* Clean Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index} 
                className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-200/60 hover:border-emerald-300/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-100/40"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl opacity-60`}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}