export type DisplayUrl = {
  href: string | null
  label: string | null
}

export function getDisplayUrl(rawUrl?: string | null, customLabel?: string | null): DisplayUrl {
  if (!rawUrl) {
    return { href: null, label: null }
  }

  const trimmed = rawUrl.trim()
  if (!trimmed) {
    return { href: null, label: null }
  }

  const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  const pretty = href.replace(/^https?:\/\//i, '').replace(/\/$/, '')

  const label = customLabel?.trim() || pretty || null

  return { href, label }
}
