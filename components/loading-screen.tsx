"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-[#af363c]/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-[#af363c] rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
          <div className="absolute inset-4 bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[#af363c] font-bold text-xl">{progress}%</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent mb-4 animate-pulse">Loading...</h2>
        <div className="w-64 h-2 bg-slate-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#af363c] to-[#8b2635] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
