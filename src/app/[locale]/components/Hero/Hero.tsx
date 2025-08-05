"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { getHeroMarketData, type MarketData } from "@/app/api/market/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Coins, BarChart3, Globe, Rocket, Play, ChevronRight, TrendingUp, Users, DollarSign, Crown, Star, Zap, UserPlus } from "lucide-react"

export const Hero: React.FC = () => {
  const t = useTranslations("hero")
  const locale = useLocale();
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getHeroMarketData()
        if (result.success) {
          setMarketData(result.data as any)
          setError(null)
        } else {
          setError(result.error || "Failed to load data")
        }
      } catch (err) {
        setError("Failed to load market data")
        console.error("Hero data fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await getHeroMarketData()
        if (result.success) {
          setMarketData(result.data as any)
        }
      } catch (err) {
        console.warn("Failed to update hero data:", err)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-screen">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-lg">
              <Crown size={16} className="text-yellow-500" />
              <span className="text-blue-700 font-semibold text-sm">{t("liveMarkets")}</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse animation-delay-100"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  <span className="block">{t("nextGen")}</span>
                  <span className="block text-blue-600">{t("trading")}</span>
                  <span className="block text-gray-700">{t("platform")}</span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-yellow-500" />
                    <span className="font-medium">{t("specs.execution")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-green-500" />
                    <span className="font-medium">{t("specs.uptime")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-blue-500" />
                    <span className="font-medium">{t("specs.grade")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={`/${locale}/login`}>
                <Button className="flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold 
                  bg-blue-600 text-white border-0 shadow-lg
                  hover:bg-blue-700 hover:shadow-xl hover:translate-y-[-2px]
                  transition-all duration-300 ease-out cursor-pointer">
                  <UserPlus size={18} />
                  <span>{t("startTrading")}</span>
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <DollarSign size={24} className="text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">$2.4T</div>
                <div className="text-sm text-gray-600 font-medium">{t("stats.volume")}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Users size={24} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">5.7M</div>
                <div className="text-sm text-gray-600 font-medium">{t("stats.traders")}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">0.08%</div>
                <div className="text-sm text-gray-600 font-medium">{t("stats.fees")}</div>
              </div>
            </div>
          </div>

          {/* Market Terminal */}
          <div className="lg:col-span-5 mb-40">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t("marketFeed")}</h3>
                      <p className="text-sm text-gray-600">{t("Advanced")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 text-sm font-semibold uppercase">{t("live")}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <div className="text-center space-y-2">
                      <h4 className="text-gray-900 font-semibold">{t("loading.title")}</h4>
                      <p className="text-gray-600 text-sm">{t("loading.sub")}</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h4 className="text-red-600 font-semibold mb-2">{t("error.title")}</h4>
                    <p className="text-gray-600 text-sm">{t("error.sub")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {marketData.map((coin, index) => (
                      <div key={coin.symbol} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                              <img
                                src={`/assets/images/${coin.symbol.toLowerCase()}.png`}
                                alt={`${coin.symbol} logo`}
                                className="w-6 h-6"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  target.style.display = 'none';
                                  if (fallback) fallback.style.display = 'block';
                                }}
                              />
                              <Coins size={20} className="text-blue-600 hidden" />
                            </div>
                            <div>
                              <div className="text-gray-900 font-bold text-lg">{coin.symbol}</div>
                              <div className="text-gray-600 text-sm">{t("USD")}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-900 font-bold text-xl mb-1">{formatPrice(coin.price)}</div>
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                              coin.change >= 0
                                ? "text-green-700 bg-green-100"
                                : "text-red-700 bg-red-100"
                            }`}>
                              <TrendingUp size={12} className={coin.change >= 0 ? "" : "rotate-180"} />
                              {coin.change >= 0 ? "+" : ""}
                              {coin.change.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center w-full text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>{t("updated")}: {mounted ? new Date().toLocaleTimeString() : "--:--:--"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-gray-500" />
                    <span>{t("volume")}: {marketData[0]?.volume || "$3.2T"}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}