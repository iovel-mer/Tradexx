"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import type { LoginCredentials } from "@/app/api/types/auth"
import { postLogin } from "@/app/api/auth/postLogin"
import { useCredentials } from "@/hooks/use-credentials"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale, useTranslations } from "next-intl"

export default function LoginPage() {
  const { storeCredentials } = useCredentials()
  const router = useRouter()
  const t = useTranslations("login")
  const locale = useLocale();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    twoFactorCode: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const credentials: LoginCredentials = {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password,
      ...(showTwoFactor && { twoFactorCode: formData.twoFactorCode }),
      ...(formData.rememberMe && { rememberMe: formData.rememberMe }),
    }

    const response = await postLogin(credentials)

    if (!response.success) {
      setError(response.message || "Login failed")
      setIsLoading(false)
      return
    }

    storeCredentials(credentials)
    window.location.href = "/dashboard"
  }

  const benefits = [
    t("benefits.pairAccess"),
    t("benefits.advancedTools"),
    t("benefits.secureWallet"),
    t("benefits.customerSupport"),
  ];

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
  {/* Background Grid */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

  {/* Floating Elements */}
  <div className="absolute top-20 left-16 w-40 h-40 bg-gradient-to-br from-sky-200 to-blue-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

  <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 relative z-10">
    {/* Left Side - Login Form */}
    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
      <Link href={`/${locale}`} className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("backToHome")}
      </Link>

      <Card className="w-full bg-white/5 backdrop-blur-sm border-white/20 text-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">{t("signIn")}</CardTitle>
          <CardDescription className="text-gray-300">{t("welcomeBack")}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 mb-4 bg-red-500/20 border border-red-400/50 rounded-lg backdrop-blur-sm">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername" className="text-gray-200">
                {t("emailOrUsername")}
              </Label>
              <Input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                placeholder={t("placemail")}
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                {t("password")}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("placepass")}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
                required
              />
            </div>
            {showTwoFactor && (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode" className="text-gray-200">
                  {t("twoFactorCode")}
                </Label>
                <Input
                  id="twoFactorCode"
                  name="twoFactorCode"
                  type="text"
                  placeholder="Enter 2FA code"
                  value={formData.twoFactorCode}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("signingIn")}
                </div>
              ) : (
                t("signIn")
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col">
          <p className="text-gray-300">
            {t("dontHaveAccount")}{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              {t("signUp")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>

    {/* Right Side - Trading Benefits */}
    <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm flex flex-col justify-center border-l border-white/20 lg:border-t-0 border-t">
      <h2 className="text-3xl font-bold text-white mb-8">{t("startTrading")}</h2>

      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-200 leading-relaxed">{benefit}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/20">
        <div className="text-center">
          <p className="text-gray-300 text-sm mb-1">{t("totalVolume")}</p>
          <p className="text-2xl font-bold text-blue-400">$4.2B+</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm mb-1">{t("activeTraders")}</p>
          <p className="text-2xl font-bold text-blue-400">650K+</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300 text-sm mb-1">{t("countries")}</p>
          <p className="text-2xl font-bold text-blue-400">190+</p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}