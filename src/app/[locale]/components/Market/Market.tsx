"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getMarketData, type MarketData } from "@/app/api/market/actions"
import { TrendingUp, TrendingDown, Activity, RefreshCw, BarChart3 } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { log } from "console"

export const Market: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const t = useTranslations("Market")

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getMarketData()
      console.log(result)
      if (result.success) {
        setMarketData(result.data as any)
        setError(null)
      } else {
        setError(result.error || t("errorGeneric"))
      }
    } catch (err) {
      setError(t("errorFetch"))
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [t])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    const fractionDigits = price >= 1000 ? 2 : price >= 1 ? 4 : 6
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(price)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  const handleImageError = (symbol: string) => {
    setImageErrors((prev) => new Set(prev).add(symbol))
  }

  const CryptoLogo = ({ coin }: { coin: MarketData }) => {
    const hasError = imageErrors.has(coin.symbol)
    const logoSrc = `/assets/images/${coin.symbol.toLowerCase()}.png`

    if (hasError) {
      return (
        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg border border-white/10">
          <span className="text-xs sm:text-sm font-semibold">{coin.symbol?.slice(0, 2) || "??"}</span>
        </div>
      )
    }

    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative">
        <Image
          src={logoSrc}
          fill
          alt={`${coin.name || coin.symbol} logo`}
          className="object-cover rounded-xl"
          onError={() => handleImageError(coin.symbol)}
          unoptimized
        />
      </div>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-100 min-h-screen relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px] lg:bg-[size:60px_60px] pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-8 sm:left-16 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl sm:blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-2xl sm:blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full text-xs sm:text-sm font-semibold text-blue-700 shadow-lg shadow-blue-100/50 mb-6 sm:mb-8">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="tracking-wide">Live Market Intelligence</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
            Digital Asset
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
              Portfolio Tracker
            </span>
          </h3>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Real-time cryptocurrency market data with institutional-grade analytics 
            and comprehensive portfolio management tools for professional traders.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24 lg:py-32">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 sm:border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-4 sm:mt-6 text-gray-700 text-base sm:text-lg font-medium">Loading market data...</p>
            <div className="mt-3 sm:mt-4 flex space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 sm:py-24 lg:py-32">
            <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 max-w-md sm:max-w-lg mx-auto shadow-2xl shadow-red-100/50">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 rounded-full shadow-lg">
                <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="text-red-600 text-base sm:text-lg font-semibold">{error}</p>
            </div>
          </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {marketData.map((coin) => (
              <div
                key={coin.symbol}
                className="group bg-white/70 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:bg-white/80 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CryptoLogo coin={coin} />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900">{coin.name}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wider">{coin.symbol}</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold ${
                      coin.change >= 0
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {coin.change >= 0 ? (
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    ) : (
                      <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    )}
                    {formatChange(coin.change)}
                  </div>
                </div>
                <div className="mb-4 sm:mb-5">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{formatPrice(coin.price)}</p>
                  <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t("currentPrice")}
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-500 font-medium">{t("movement")}</span>
                    <span className={`font-bold ${coin.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {Math.abs(coin.change).toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        coin.change >= 0
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gradient-to-r from-red-400 to-red-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.abs(coin.change) * 8)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}