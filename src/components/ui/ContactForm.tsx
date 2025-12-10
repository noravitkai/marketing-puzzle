'use client'

import React, { FormEvent, useState } from 'react'
import {
  UserCircleIcon,
  AtSymbolIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import {
  InputGroup,
  SelectGroup,
  TextareaGroup,
  ToggleGroup,
  SelectOption,
} from '@/components/ui/FormControls'
import { buildContactPayload, validateContactForm, type ContactFormErrors } from '@/lib/form'

export type ContactFormProps = {
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
  serviceOptions: SelectOption[]
  messageLabel: string
  messageHint?: string
  messagePlaceholder?: string
  toggleLabel?: string
  toggleDescription?: string
  toggleFileUrl?: string
  submitLabel: string
  endpoint: string
  className?: string
}

export function ContactForm({
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
  className,
}: ContactFormProps) {
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectResetKey, setSelectResetKey] = useState(0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const validationErrors = validateContactForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setErrorMessage('Kérjük, javítsd a hibás mezőket, és próbáld újra.')
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const payload = buildContactPayload(formData)

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
      setSelectResetKey((prev) => prev + 1)
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

  const hasToggle = Boolean(toggleLabel && toggleLabel.trim())

  return (
    <form
      onSubmit={handleSubmit}
      className={className ?? 'rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5'}
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
            key={selectResetKey}
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

        {hasToggle && toggleLabel && (
          <div className="sm:col-span-2">
            <ToggleGroup
              id="toggle"
              name="toggle"
              label={toggleLabel}
              description={toggleDescription}
              labelHref={toggleFileUrl}
              defaultChecked
              required
            />
            {errors['toggle'] ? (
              <p className="mt-1 text-xs text-red-700">{errors['toggle']}</p>
            ) : null}
          </div>
        )}

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
  )
}
