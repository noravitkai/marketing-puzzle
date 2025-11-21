export type ContactFormErrors = Record<string, string>

export function validateContactForm(formData: FormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  const lastName = (formData.get('last-name') || '').toString().trim()
  const firstName = (formData.get('first-name') || '').toString().trim()
  const email = (formData.get('email') || '').toString().trim()
  const message = (formData.get('message') || '').toString().trim()
  const services = formData.getAll('service').map((v) => v.toString())
  const consent = formData.get('toggle') === 'on'
  const phone = (formData.get('phone') || '').toString().trim()
  const website = (formData.get('website') || '').toString().trim()

  if (lastName.length < 2) {
    errors['last-name'] = 'Kérjük, add meg a vezetékneved (legalább 2 karakter).'
  }

  if (firstName.length < 2) {
    errors['first-name'] = 'Kérjük, add meg a keresztneved (legalább 2 karakter).'
  }

  if (!email) {
    errors['email'] = 'Kérjük, add meg az email címed, hogy válaszolni tudjunk.'
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      errors['email'] = 'Kérjük, hogy érvényes email formátumot használj (pl. nev@domain.hu).'
    }
  }

  if (services.length === 0) {
    errors['service'] = 'Kérjük, legalább egy szolgáltatást válassz.'
  }

  if (message.length < 10) {
    errors['message'] = 'Kérjük, írj pár szót arról, miben segíthetünk (legalább 10 karakter).'
  }

  if (!consent) {
    errors['toggle'] = 'A beküldés előtt kérjük, erősítsd meg a feltételek elfogadását.'
  }

  if (phone) {
    const phonePattern = /^\+?[0-9\s().-]{7,20}$/
    if (!phonePattern.test(phone)) {
      errors['phone'] =
        'Kérjük, a telefonszámod érvényes formátumban add meg (pl. +36 30 123 4567).'
    }
  }

  if (website) {
    const urlPattern = /^https?:\/\/[^\s]+$/i
    if (!urlPattern.test(website)) {
      errors['website'] = 'Kérjük, érvényes URL-t adj meg (pl. https://pelda.hu).'
    }
  }

  return errors
}

export type ContactFormPayload = {
  vezeteknev: string
  keresztnev: string
  email: string
  telefonszam: string
  cegnev: string
  weboldal: string
  szolgaltatasok: string
  uzenet: string
  hozzajarulas: string
}

export function buildContactPayload(formData: FormData): ContactFormPayload {
  const selectedServices = formData.getAll('service').map((v) => v.toString())

  return {
    vezeteknev: (formData.get('last-name') || '').toString(),
    keresztnev: (formData.get('first-name') || '').toString(),
    email: (formData.get('email') || '').toString(),
    telefonszam: (formData.get('phone') || '').toString(),
    cegnev: (formData.get('company-name') || '').toString(),
    weboldal: (formData.get('website') || '').toString(),
    szolgaltatasok: selectedServices.join(', '),
    uzenet: (formData.get('message') || '').toString(),
    hozzajarulas: formData.get('toggle') === 'on' ? 'igen' : 'nem',
  }
}
