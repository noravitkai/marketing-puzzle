import React from 'react'
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
} from '@heroicons/react/24/outline'
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
}

export default function Form({
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
}: FormProps) {
  const hasImage = Boolean(imageUrl)

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
              <form className="-mt-20 w-[90%] rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-28 sm:w-[80%] lg:-mt-44">
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        <div className="mt-40">Bla bla blaaa</div>
      </Container>
    </section>
  )
}
