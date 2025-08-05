"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { LogIn, UserPlus, Hexagon, Menu, X, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLocale, useTranslations } from "next-intl"

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations("Header")

  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  {/* <Hexagon size={20} className="text-white" /> */}
                  <Target size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Tradex
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href={`/${locale}/login`}>
              <Button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium 
                bg-blue-600 text-white border-0 shadow-sm
                  hover:translate-y-[-1px]
                transition-all duration-200 ease-out cursor-pointer">
                <LogIn size={16} />
                <span>{t("signIn")}</span>
              </Button>
            </Link>
            
            <Link href={`/${locale}/register`}>
              <Button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium 
                bg-blue-600 text-white border-0 shadow-sm
                  hover:translate-y-[-1px]
                transition-all duration-200 ease-out cursor-pointer">
                <UserPlus size={16} />
                <span>{t("getStarted")}</span>
              </Button>
            </Link>

            <div className="ml-3 pl-3 border-l  border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
            <Link href={`/${locale}/login`} onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium 
                bg-blue-600 text-white border-0 shadow-sm
                  hover:translate-y-[-1px]
                transition-all duration-200 ease-out cursor-pointer">
                <LogIn size={16} />
                <span>{t("signIn")}</span>
              </Button>
            </Link>
            
            <Link href={`/${locale}/register`} onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium 
                bg-blue-600 text-white border-0 shadow-sm
                  hover:translate-y-[-1px]
                transition-all duration-200 ease-out cursor-pointer">
                <UserPlus size={16} />
                <span>{t("getStarted")}</span>
              </Button>
            </Link>
            
            <div className="pt-3 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}