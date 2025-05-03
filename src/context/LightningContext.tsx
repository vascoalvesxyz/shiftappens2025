'use client'
import React, { createContext, useContext, useState } from "react"

type LightPosition = { x: number; y: number; z: number }

type LightingContextType = {
  lightColor: string
  setLightColor: (color: string) => void
  lightIntensity: number
  setLightIntensity: (val: number) => void
  ambientIntensity: number
  setAmbientIntensity: (val: number) => void
  lightPosition: LightPosition
  setLightPosition: (val: LightPosition) => void
}

const LightingContext = createContext<LightingContextType | undefined>(
  undefined
)

export const LightingProvider = ({ children }: { children: React.ReactNode }) => {
  const [lightColor, setLightColor] = useState("#ffffff")
  const [lightIntensity, setLightIntensity] = useState(2)
  const [ambientIntensity, setAmbientIntensity] = useState(0.2)
  const [lightPosition, setLightPosition] = useState<LightPosition>({
    x: 2,
    y: 5,
    z: 5,
  })

  return (
    <LightingContext.Provider
      value={{
        lightColor,
        setLightColor,
        lightIntensity,
        setLightIntensity,
        ambientIntensity,
        setAmbientIntensity,
        lightPosition,
        setLightPosition,
      }}
    >
      {children}
    </LightingContext.Provider>
  )
}

export const useLighting = () => {
  const ctx = useContext(LightingContext)
  if (!ctx) throw new Error("useLighting must be used within LightingProvider")
  return ctx
}
