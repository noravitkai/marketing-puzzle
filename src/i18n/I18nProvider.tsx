'use client'

import React, { createContext, useContext } from 'react'
import type { Locale } from './config'

export type Messages = Record<string, string>

type I18nContextValue = {
  locale: Locale
  messages: Messages
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

type I18nProviderProps = {
  locale: Locale
  messages: Messages
  children: React.ReactNode
}

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
