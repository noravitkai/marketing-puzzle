'use client'

import React, { useState, FormEvent } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import {
  UserCircleIcon,
  AtSymbolIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { InputGroup, SelectGroup, TextareaGroup, ToggleGroup } from '@/components/ui/Form'

type ServiceOption = {
  value: string
  label: string
}

type FormProps = {
  heading: string
  lead?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  lastNameLabel: string
  lastNameHint?: string
  lastNamePlaceholder?: string
  firstNameLabel: string
  firstNameHint?: string
  firstNamePlaceholder?: string
  emailLabel: string
  emailHint?: string
  emailPlaceholder?: string
  phoneLabel: string
  phoneHint?: string
  phonePlaceholder?: string
  companyLabel: string
  companyHint?: string
  companyPlaceholder?: string
  websiteLabel: string
  websiteHint?: string
  websitePlaceholder?: string
  serviceLabel: string
  serviceHint?: string
  servicePlaceholder?: string
  serviceOptions: ServiceOption[]
  messageLabel: string
  messageHint?: string
  messagePlaceholder?: string
  toggleLabel: string
  toggleDescription?: string
  toggleFileUrl?: string
  submitLabel: string
  endpoint: string
}

export default function Form(props: FormProps) {
  const {
    heading,
    lead,
    description,
    imageUrl,
    imageAlt,
    lastNameLabel,
    lastNameHint,
    lastNamePlaceholder,
    firstNameLabel,
    firstNameHint,
    firstNamePlaceholder,
    emailLabel,
    emailHint,
    emailPlaceholder,
    phoneLabel,
    phoneHint,
    phonePlaceholder,
    companyLabel,
    companyHint,
    companyPlaceholder,
    websiteLabel,
    websiteHint,
    websitePlaceholder,
    serviceLabel,
    serviceHint,
    servicePlaceholder,
    serviceOptions,
    messageLabel,
    messageHint,
    messagePlaceholder,
    toggleLabel,
    toggleDescription,
    toggleFileUrl,
    submitLabel,
    endpoint,
  } = props

  const hasImage = Boolean(imageUrl)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {}

    const lastName = (formData.get('last-name') || '').toString().trim()
    const firstName = (formData.get('first-name') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()
    const message = (formData.get('message') || '').toString().trim()
    const services = formData.getAll('service').map((v) => v.toString())
    const consent = formData.get('toggle') === 'on'
    const phone = (formData.get('phone') || '').toString().trim()
    const website = (formData.get('website') || '').toString().trim()

    if (lastName.length < 2) {
      newErrors['last-name'] = 'Kérjük, add meg a vezetékneved (legalább 2 karakter).'
    }

    if (firstName.length < 2) {
      newErrors['first-name'] = 'Kérjük, add meg a keresztneved (legalább 2 karakter).'
    }

    if (!email) {
      newErrors['email'] = 'Kérjük, add meg az email címed, hogy válaszolni tudjunk.'
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(email)) {
        newErrors['email'] = 'Kérjük, hogy érvényes email formátumot használj (pl. nev@domain.hu).'
      }
    }

    if (services.length === 0) {
      newErrors['service'] = 'Kérjük, legalább egy szolgáltatást válassz.'
    }

    if (message.length < 10) {
      newErrors['message'] = 'Kérjük, írj pár szót arról, miben segíthetünk (legalább 10 karakter).'
    }

    if (!consent) {
      newErrors['toggle'] = 'A beküldés előtt kérjük, erősítsd meg a feltételek elfogadását.'
    }

    if (phone) {
      const phonePattern = /^\+?[0-9\s().-]{7,20}$/
      if (!phonePattern.test(phone)) {
        newErrors['phone'] =
          'Kérjük, a telefonszámod érvényes formátumban add meg (pl. +36 30 123 4567).'
      }
    }

    if (website) {
      const urlPattern = /^https?:\/\/[^\s]+$/i
      if (!urlPattern.test(website)) {
        newErrors['website'] = 'Kérjük, érvényes URL-t adj meg (pl. https://pelda.hu).'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const isValid = validate(formData)
    if (!isValid) {
      setErrorMessage('Kérjük, javítsd a hibás mezőket, és próbáld újra.')
      return
    }

    setIsSubmitting(true)

    try {
      const selectedServices = formData.getAll('service').map((v) => v.toString())

      const payload = {
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

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.status === 422) {
        throw new Error(
          'Valamely beküldött adatot a rendszer nem tudta elfogadni. Kérjük, hogy a kitöltött mezőket ellenőrizd.',
        )
      } else if (!response.ok) {
        throw new Error(
          'Az űrlap feldolgozása közben hiba történt, ezért kérünk, próbáld újra. Amennyiben a hiba ismét előfordul, telefonon vagy emailben is bátran kereshetsz.',
        )
      }

      await response.json()

      setSuccessMessage('Köszönjük megkeresésed – nemsokára jelentkezünk.')
      setErrors({})
      form.reset()
    } catch (error) {
      console.error(error)
      setErrorMessage(
        'Technikai hiba történt, ezért kérünk, próbáld újra. Amennyiben a hiba ismét előfordul, telefonon vagy emailben is bátran kereshetsz.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="ajanlatkeres">
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2">{heading}</Heading>
          {lead ? <Lead as="p">{lead}</Lead> : null}
          {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
        </div>
        {hasImage ? (
          <div className="mt-8">
            <div className="relative aspect-3/1 overflow-hidden rounded-md shadow-sm ring-1 ring-zinc-900/5">
              <Image
                src={imageUrl as string}
                alt={imageAlt ?? ''}
                fill
                sizes="(min-width: 1024px) 64rem, 42rem"
                className="object-cover"
              />
            </div>
            <div className="flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="-mt-20 w-[90%] rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-28 sm:w-[80%] lg:-mt-44"
              >
                {successMessage && (
                  <p className="bg-primary/10 text-primary mb-6 rounded-md px-3 py-2 text-xs sm:text-sm">
                    {successMessage}
                  </p>
                )}
                {errorMessage && (
                  <p className="mb-6 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 sm:text-sm">
                    {errorMessage}
                  </p>
                )}
                <div className="grid w-full gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <InputGroup
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    label={lastNameLabel}
                    hint={lastNameHint}
                    placeholder={lastNamePlaceholder}
                    leadingIcon={<UserCircleIcon className="h-4 w-4" />}
                    required
                    error={errors['last-name']}
                  />
                  <InputGroup
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    label={firstNameLabel}
                    hint={firstNameHint}
                    placeholder={firstNamePlaceholder}
                    leadingIcon={<UserCircleIcon className="h-4 w-4" />}
                    required
                    error={errors['first-name']}
                  />
                  <InputGroup
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    label={emailLabel}
                    hint={emailHint}
                    placeholder={emailPlaceholder}
                    leadingIcon={<AtSymbolIcon className="h-4 w-4" />}
                    required
                    error={errors['email']}
                  />
                  <InputGroup
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    label={phoneLabel}
                    hint={phoneHint}
                    placeholder={phonePlaceholder}
                    leadingIcon={<DevicePhoneMobileIcon className="h-4 w-4" />}
                    pattern="^\\+?[0-9\\s().-]{7,20}$"
                    error={errors['phone']}
                  />
                  <InputGroup
                    id="company-name"
                    name="company-name"
                    type="text"
                    autoComplete="organization"
                    label={companyLabel}
                    hint={companyHint}
                    placeholder={companyPlaceholder}
                    leadingIcon={<BriefcaseIcon className="h-4 w-4" />}
                    error={errors['company-name']}
                  />
                  <InputGroup
                    id="website"
                    name="website"
                    type="url"
                    autoComplete="url"
                    label={websiteLabel}
                    hint={websiteHint}
                    placeholder={websitePlaceholder}
                    leadingIcon={<GlobeAltIcon className="h-4 w-4" />}
                    error={errors['website']}
                  />
                  <div className="sm:col-span-2">
                    <SelectGroup
                      id="service"
                      name="service"
                      label={serviceLabel}
                      hint={serviceHint}
                      options={serviceOptions}
                      placeholder={servicePlaceholder}
                      leadingIcon={<RectangleGroupIcon className="h-4 w-4" />}
                      multiple
                      required
                      error={errors['service']}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextareaGroup
                      id="message"
                      name="message"
                      label={messageLabel}
                      hint={messageHint}
                      placeholder={messagePlaceholder}
                      leadingIcon={<ChatBubbleLeftEllipsisIcon className="h-4 w-4" />}
                      required
                      error={errors['message']}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <ToggleGroup
                      id="toggle"
                      name="toggle"
                      label={toggleLabel}
                      description={toggleDescription}
                      labelHref={toggleFileUrl}
                      defaultChecked
                    />
                    {errors['toggle'] ? (
                      <p className="mt-1 text-xs text-red-700">{errors['toggle']}</p>
                    ) : null}
                  </div>
                  <div className="flex justify-start sm:col-span-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      trailingIcon={<PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />}
                    >
                      {isSubmitting ? 'Folyamatban…' : submitLabel}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
