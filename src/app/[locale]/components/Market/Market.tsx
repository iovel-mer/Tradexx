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

  const CryptoLogo = ({ coin, size = 48 }: { coin: MarketData; size?: number }) => {
    const hasError = imageErrors.has(coin.symbol)
    const logoSrc = `/assets/images/${coin.symbol.toLowerCase()}.png`

    if (hasError) {
      return (
        <div
          className="flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg border border-white/10"
          style={{ 
            width: size, 
            height: size
          }}
        >
          <span className="text-sm font-semibold">{coin.symbol?.slice(0, 2) || "??"}</span>
        </div>
      )
    }

    return (
      <div 
        // className="relative overflow-hidden  shadow-lg border border-white/10"
        // style={{ 
        //   width: size, 
        //   height: size
        // }}
      >
        <Image
          src={logoSrc}
          width={size}
          height={size}
          alt={`${coin.name || coin.symbol} logo`}
          className="object-cover rounded-xl"
          onError={() => handleImageError(coin.symbol)}
          unoptimized
        />
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-gray-100 min-h-screen relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-16 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-lg shadow-blue-100/50 mb-8">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="tracking-wide">Live Market Intelligence</span>
          </div>
          
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight">
            Digital Asset
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
              Portfolio Tracker
            </span>
          </h3>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Real-time cryptocurrency market data with institutional-grade analytics 
            and comprehensive portfolio management tools for professional traders.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <RefreshCw className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-6 text-gray-700 text-lg font-medium">Loading market data...</p>
            <div className="mt-4 flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-2xl p-12 max-w-lg mx-auto shadow-2xl shadow-red-100/50">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mx-auto mb-6 rounded-full shadow-lg">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <p className="text-red-600 text-lg font-semibold">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {marketData.map((coin, index) => (
              <div
                key={coin.symbol}
                className="group relative bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-100/40 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-2xl"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <CryptoLogo coin={coin} size={52} />
                      <div>
                        <h4 className="font-bold text-lg pr-2 text-gray-900">{coin.name}</h4>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{coin.symbol}</p>
                      </div>
                    </div>
                    
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${
                        coin.change >= 0
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {formatChange(coin.change)}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {formatPrice(coin.price)}
                    </p>
                    {/* <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Current Market Price
                    </p> */}
                  </div>

                  {/* Movement Section */}
                  <div className="space-y-4">
                    {/* <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium text-sm">24h Change</span>
                      <span className={`font-bold ${coin.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {Math.abs(coin.change).toFixed(2)}%
                      </span>
                    </div> */}
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          coin.change >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'
                        }`}
                        style={{ width: `${Math.min(Math.abs(coin.change) * 10, 100)}%` }}
                      ></div>
                    </div>
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