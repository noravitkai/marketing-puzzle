'use client'

import React, { createContext, useContext } from 'react'
import type { Locale } from './config'

export type Messages = Record<string, any>

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

function getNestedMessage(messages: Messages, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, messages)
}

export function useT() {
  const { messages } = useI18n()
  return (path: string, fallback?: string): string => {
    const value = getNestedMessage(messages, path)
    if (typeof value === 'string') return value
    return fallback ?? path
  }
}
