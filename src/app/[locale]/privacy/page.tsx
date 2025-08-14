"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "../components/Header/Header"
import { ArrowRight, Home } from "lucide-react"

const PrivacyPolicyPage = () => {
  const t = useTranslations("Privacy")

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
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            {t("title")}
          </h1>
          
          <CardDescription className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg">
            {t("description")}
          </CardDescription>
          
          <div className="space-y-6 sm:space-y-8 md:space-y-10 text-white leading-relaxed">
            <p className="text-sm text-white/60">{t("lastUpdated")}</p>

            <ol className="space-y-6 list-decimal list-inside">
              {Array.from({ length: 9 }, (_, i) => {
                const section = i + 1
                return (
                  <li key={section}>
                    <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4">
                      {t(`section${section}.title`)}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                      {t(`section${section}.description`)}
                    </p>
                    {t.raw(`section${section}.list`)?.length > 0 && (
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-white/80">
                        {t.raw(`section${section}.list`).map((item: string, idx: number) => (
                          <li key={idx} className="text-sm sm:text-base">{item}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ol>

            <div>
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-white mb-2 sm:mb-3 lg:mb-4">
                {t("section9.title")}
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {t("section9.description")}
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-white/80">
                <li className="text-sm sm:text-base">
                  {t("contact.email")}:{" "}
                  <Link href="mailto:support@example.com" className="text-white hover:text-white/80 hover:underline transition-colors">
                    support@example.com
                  </Link>
                </li>
                <li className="text-sm sm:text-base">
                  {t("contact.page")}:{" "}
                  <Link href="/contact" className="text-white hover:text-white/80 hover:underline transition-colors">
                    /contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default PrivacyPolicyPage