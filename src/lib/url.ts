export function getDisplayUrl(rawUrl?: string | null) {
  if (!rawUrl) {
    return { href: null as string | null, label: null as string | null }
  }

  const trimmed = rawUrl.trim()
  if (!trimmed) {
    return { href: null as string | null, label: null as string | null }
  }

  const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  const label = href.replace(/^https?:\/\//i, '').replace(/\/$/, '')

  return { href, label }
}
