import type { Locale } from './config'
import huMessages from './messages/hu'
import enMessages from './messages/en'
import type { Messages } from './I18nProvider'

const allMessages: Record<Locale, Messages> = {
  hu: huMessages,
  en: enMessages,
}

export function getMessages(locale: Locale): Messages {
  return allMessages[locale] ?? huMessages
}
