"use client"

import { parseISO, format } from "date-fns"
import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Check, ChevronDown, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { postRegistration } from "@/app/api/auth/postRegistration"
import { getCountries } from "@/app/api/countries/getCountries"
import { getLanguages } from "@/app/api/languages/getLanguages"
import type { Country } from "@/app/api/types/countries"
import type { Language } from "@/app/api/types/languages"
import { useLocale, useTranslations } from "next-intl"

export default function RegisterPage() {
  const router = useRouter()
  const t = useTranslations('register');
  const locale  = useLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    telephone: "",
    country: "",
    language: "",
    dateOfBirth: "", 
    source: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [countrySearch, setCountrySearch] = useState("")
  const [languageSearch, setLanguageSearch] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        source: window.location.origin,
      }))
    }
    const fetchData = async () => {
      try {
        const [countriesResponse, languagesData] = await Promise.all([getCountries(), getLanguages()])
        if (countriesResponse.success && countriesResponse.data) {
          const allCountries = countriesResponse.data
          setCountries(allCountries)
          try {
            const res = await fetch("https://ipapi.co/json/")
            const locationData = await res.json()
            const detectedCountryCode = locationData?.country_code
            if (detectedCountryCode) {
              const matched = allCountries.find((c) => c.code === detectedCountryCode)
              if (matched) {
                setFormData((prev) => ({
                  ...prev,
                  country: matched.code,
                }))
              }
            }
          } catch (geoError) {
            console.warn("Could not detect location via IP:", geoError)
          }
        }
        setLanguages(languagesData)
      } catch (error) {
        console.error("Error fetching countries or languages:", error)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : value,
    }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date ? format(date, "yyyy-MM-dd") : "", 
    }))
    setShowDatePicker(false) 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    if (formData.dateOfBirth) {
    const birthDate = parseISO(formData.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age-- // not had birthday yet this year
    }

    if (age < 18) {
      setError("You must be at least 18 years old to register.")
      setIsLoading(false)
      return
    }
  } else {
    setError("Please select your date of birth.")
    setIsLoading(false)
    return
  }
    const response = await postRegistration(formData)
    if (response?.errors) {
      setError(response.message ?? "An unknown error occurred")
      setIsLoading(false)
      return
    }
    router.push("/login?registered=true")
    setIsLoading(false)
  }

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase()),
  )
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
      language.code.toLowerCase().includes(languageSearch.toLowerCase()),
  )

  const handleCountrySelect = (countryCode: string) => {
    setFormData((prev) => ({ ...prev, country: countryCode }))
    setCountrySearch("")
    setShowCountryDropdown(false)
  }

  const handleLanguageSelect = (languageCode: string) => {
    setFormData((prev) => ({ ...prev, language: languageCode }))
    setLanguageSearch("")
    setShowLanguageDropdown(false)
  }

  const selectedCountry = countries.find((c) => c.code === formData.country)
  const selectedLanguage = languages.find((l) => l.code === formData.language)

  const dateOfBirthDate = formData.dateOfBirth ? parseISO(formData.dateOfBirth) : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-16 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Left-side Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto relative z-10">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
          <CardHeader className="pb-4">
            <Link href={`/${locale}`} className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("back")}
            </Link>
            <CardTitle className="text-3xl font-bold text-white text-center">{t("createAccount")}</CardTitle>
            <p className="text-gray-300 text-center">{t("subtitle")}</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-3 mb-4 bg-red-500/20 border border-red-400/50 rounded-lg backdrop-blur-sm">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">
                     {t("firstName")}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={t("pfirstName")}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">
                    {t("lastName")}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={t("plastName")}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder= {t("pemail")}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">
                  {t("username")}
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder= {t("pusername")}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
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
                  placeholder={t("ppassword")}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-200">
                   {t("phoneNumber")}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder= {t("pphoneNumber")}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 backdrop-blur-sm"
                />
              </div>
              {/* Country Selector */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-200">
                    {t("country")}
                </Label>
                <Popover open={showCountryDropdown} onOpenChange={setShowCountryDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={showCountryDropdown}
                      className="w-full justify-between bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm focus:border-emerald-400"
                      disabled={isLoading}
                    >
                      {selectedCountry ? selectedCountry.name : "Select your country"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white/10 backdrop-blur-xl border-white/30 text-white">
                    <Command className="bg-transparent text-white">
                      <CommandInput
                        placeholder={t("searchCountries")}
                        value={countrySearch}
                        onValueChange={setCountrySearch}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-emerald-400"
                      />
                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>{t("selectCountry")}</CommandEmpty>
                        <CommandGroup>
                          {filteredCountries.map((country) => (
                            <CommandItem
                              key={country.code}
                              value={country.name}
                              onSelect={() => handleCountrySelect(country.code)}
                              className="cursor-pointer hover:bg-white/20 text-white data-[selected=true]:bg-emerald-500/30"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.country === country.code ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {country.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* Language Selector */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-200">
                 {t("language")}
                </Label>
                <Popover open={showLanguageDropdown} onOpenChange={setShowLanguageDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={showLanguageDropdown}
                      className="w-full justify-between bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm focus:border-emerald-400"
                      disabled={isLoading}
                    >
                      <span className={selectedLanguage ? "text-white" : "text-gray-400"}>
                        {selectedLanguage ? selectedLanguage.name : t("selectLanguage")}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white/10 backdrop-blur-xl border-white/30 text-white">
                    <Command className="bg-transparent text-white">
                      <CommandInput
                        placeholder="Search languages..."
                        value={languageSearch}
                        onValueChange={setLanguageSearch}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-emerald-400"
                      />
                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {filteredLanguages
                            .sort((a, b) => {
                              const priorityOrder = ["en", "de"]
                              const indexA = priorityOrder.indexOf(a.code)
                              const indexB = priorityOrder.indexOf(b.code)
                              if (indexA !== -1 || indexB !== -1) {
                                return (
                                  (indexA === -1 ? Number.POSITIVE_INFINITY : indexA) -
                                  (indexB === -1 ? Number.POSITIVE_INFINITY : indexB)
                                )
                              }
                              return a.name.localeCompare(b.name)
                            })
                            .map((language) => (
                              <CommandItem
                                key={language.code}
                                value={language.name}
                                onSelect={() => handleLanguageSelect(language.code)}
                                className="cursor-pointer text-white hover:bg-white/20 data-[selected=true]:bg-emerald-500/30"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.language === language.code ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {language.name}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-200">
                 {t("dateOfBirth")}
                </Label>
                <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm focus:border-emerald-400",
                        !formData.dateOfBirth && "text-gray-400",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarDays className="mr-2 size-4" />
                      {formData.dateOfBirth ? format(dateOfBirthDate!, "PPP") : <span>{t("pickDate")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/10 backdrop-blur-xl border-white/30 text-white">
                    <Calendar
                      mode="single"
                      selected={dateOfBirthDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                       className="[&_td]:text-black-200 [&_th]:text-black-300 [&_button]:text-gray-200 [&_button]:hover:bg-white/20 [&_button]:focus:bg-white/20 [&_div.rdp-day_selected]:bg-emerald-500 [&_div.rdp-day_selected]:text-black [&_div.rdp-day_today]:text-emerald-400 [&_select]:bg-gray [&_select]:text-white [&_select]:border-white/30 [&_select]:rounded-md [&_select]:focus:ring-emerald-400"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full  bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg "
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("loading")}
                  </div>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
            <p className="text-center text-gray-300 mt-4">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-blue-600 font-medium transition-colors">
                {t("signIn")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Right-side Benefits Panel */}
      <div className="flex-1 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        </div>
        <div className="max-w-lg space-y-8 z-10 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white mb-8 leading-tight">{t("benefitsTitle")}</h2>
          <div className="space-y-6">
            {t.raw("benefits").map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 items-center sm:grid-cols-3 gap-6 pt-8 border-t border-white/20 mt-8">
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-1">{t("volume")}</p>
              <p className="text-3xl font-bold bg-blue-600 rounded-2xl">$5.2B+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-1">{t("traders")}</p>
              <p className="text-3xl font-bold bg-blue-600 rounded-2xl">750K+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-1">{t("countries")}</p>
              <p className="text-3xl font-bold bg-blue-600 rounded-2xl">195+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}