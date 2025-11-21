'use client'

import React, { Fragment } from 'react'
import clsx from 'clsx'
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'

const baseFieldClasses =
  'focus:outline-none focus:ring-1 focus:ring-primary block w-full rounded-md py-2 px-3 text-xs sm:text-sm text-zinc-800 bg-white ring-1 ring-zinc-900/10 shadow-sm shadow-zinc-800/5 disabled:cursor-not-allowed disabled:opacity-50'

const floatingLabelClasses =
  'absolute -top-2 left-2 inline-flex items-center gap-1 rounded-md bg-white px-1.5 text-xs font-medium tracking-tighter text-zinc-800 uppercase'

export type InputGroupProps = {
  id: string
  label: string
  hint?: string
  leadingIcon?: React.ReactNode
  className?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function InputGroup({
  id,
  label,
  hint,
  leadingIcon,
  className,
  error,
  ...props
}: InputGroupProps) {
  const baseInputClasses = clsx(baseFieldClasses, 'placeholder:text-zinc-400 placeholder:text-xs')

  return (
    <div className="space-y-1">
      <div className="relative">
        <label htmlFor={id} className={floatingLabelClasses}>
          <span className="uppercase">{label}</span>
          {hint ? <span className="font-normal text-zinc-500 normal-case">{hint}</span> : null}
        </label>
        {leadingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            {leadingIcon}
          </span>
        ) : null}
        <input
          id={id}
          className={clsx(baseInputClasses, leadingIcon ? 'pl-10' : 'pl-3', 'pr-3', className)}
          {...props}
        />
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  )
}

export type TextareaGroupProps = {
  id: string
  label: string
  hint?: string
  leadingIcon?: React.ReactNode
  className?: string
  error?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextareaGroup({
  id,
  label,
  hint,
  leadingIcon,
  className,
  rows = 4,
  error,
  ...props
}: TextareaGroupProps) {
  const baseTextareaClasses = clsx(
    baseFieldClasses,
    'placeholder:text-zinc-400 placeholder:text-xs',
    'resize-y min-h-[6rem]',
  )

  return (
    <div className="space-y-1">
      <div className="relative">
        <label htmlFor={id} className={floatingLabelClasses}>
          <span className="uppercase">{label}</span>
          {hint ? <span className="font-normal text-zinc-500 normal-case">{hint}</span> : null}
        </label>
        {leadingIcon ? (
          <span className="pointer-events-none absolute top-3 left-3 flex items-center text-zinc-400">
            {leadingIcon}
          </span>
        ) : null}
        <textarea
          id={id}
          rows={rows}
          className={clsx(
            baseTextareaClasses,
            leadingIcon ? 'pl-10' : 'pl-3',
            'pt-2.5 pr-3 pb-2.5',
            className,
          )}
          {...props}
        />
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  )
}

export type SelectOption = {
  value: string
  label: string
}

export type SelectGroupProps = {
  id: string
  name: string
  label: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  leadingIcon?: React.ReactNode
  className?: string
  defaultValue?: string | string[]
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  error?: string
}

export function SelectGroup({
  id,
  name,
  label,
  hint,
  options,
  placeholder = 'Kérünk, válassz.',
  leadingIcon,
  className,
  defaultValue = '',
  disabled,
  required,
  multiple = false,
  error,
}: SelectGroupProps) {
  const [value, setValue] = React.useState<string | string[]>(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) return defaultValue
      if (typeof defaultValue === 'string' && defaultValue) return [defaultValue]
      return []
    }

    if (Array.isArray(defaultValue)) return defaultValue[0] ?? ''
    return defaultValue ?? ''
  })

  let displayLabel = placeholder
  let isPlaceholder = true

  if (multiple) {
    const selectedValues = Array.isArray(value) ? value : value ? [value] : []
    const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value))

    if (selectedOptions.length === 0) {
      displayLabel = placeholder
      isPlaceholder = true
    } else if (selectedOptions.length === 1) {
      displayLabel = selectedOptions[0].label
      isPlaceholder = false
    } else {
      displayLabel = `${selectedOptions.length} lehetőség kiválasztva`
      isPlaceholder = false
    }
  } else {
    const stringValue = Array.isArray(value) ? (value[0] ?? '') : value
    const selectedOption = options.find((opt) => opt.value === stringValue) ?? null
    displayLabel = selectedOption?.label ?? placeholder
    isPlaceholder = !selectedOption
  }

  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : []
    }
    const v = Array.isArray(value) ? (value[0] ?? '') : value
    return v ? [v] : []
  }, [multiple, value])

  return (
    <div className="space-y-1">
      <div className="relative">
        <label htmlFor={id} className={floatingLabelClasses}>
          <span className="uppercase">{label}</span>
          {hint ? <span className="font-normal text-zinc-500 normal-case">{hint}</span> : null}
        </label>
        <Listbox
          value={value}
          onChange={setValue}
          name={name}
          disabled={disabled}
          multiple={multiple}
        >
          {({ open }) => (
            <>
              <Listbox.Button
                id={id}
                className={clsx(
                  baseFieldClasses,
                  'cursor-pointer text-left',
                  leadingIcon ? 'pl-10' : 'pl-3',
                  'pr-10',
                  className,
                )}
              >
                {leadingIcon ? (
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                    {leadingIcon}
                  </span>
                ) : null}
                <span
                  className={clsx(
                    'block',
                    isPlaceholder
                      ? 'text-xs text-zinc-400 sm:text-xs'
                      : 'text-xs text-zinc-800 sm:text-sm',
                  )}
                >
                  {displayLabel}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronDownIcon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute bottom-full z-20 mb-1 max-h-40 w-full overflow-auto rounded-md bg-white text-xs shadow-lg ring-1 ring-black/5 focus:outline-none sm:max-h-50 sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default px-3 py-2 select-none',
                          active ? 'bg-primary/10 text-primary' : 'text-zinc-900',
                        )
                      }
                    >
                      {({ selected }) => (
                        <div className="flex min-w-0 items-center gap-2">
                          {selected ? (
                            <CheckIcon
                              className="text-primary h-4 w-4 flex-none"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="h-4 w-4 flex-none" />
                          )}
                          <span
                            className={clsx(
                              'max-w-full truncate',
                              selected ? 'font-medium' : 'font-normal',
                            )}
                          >
                            {option.label}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
        {selectedValues.map((v, index) => (
          <input key={index} type="hidden" name={name} value={v} />
        ))}
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  )
}

export type ToggleGroupProps = {
  id: string
  name: string
  label: string
  description?: string
  labelHref?: string
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id' | 'name' | 'className'>

export function ToggleGroup({
  id,
  name,
  label,
  description,
  labelHref,
  className,
  ...props
}: ToggleGroupProps) {
  return (
    <div className={clsx('flex items-center justify-between gap-4', className)}>
      <span className="flex grow flex-col">
        <label
          htmlFor={id}
          className="text-xs font-medium tracking-tighter text-zinc-800 uppercase"
        >
          {label}
        </label>
        {description ? (
          <span
            id={`${id}-description`}
            className="mt-0.5 flex items-start gap-1.5 text-xs text-zinc-500"
          >
            {labelHref ? (
              <a
                href={labelHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-start justify-center"
                aria-label="Letöltés"
              >
                <ArrowDownTrayIcon className="hover:text-primary h-4 w-4 flex-none text-zinc-400 transition duration-300 ease-in-out" />
              </a>
            ) : null}
            <span className="flex-1">{description}</span>
          </span>
        ) : null}
      </span>
      <div className="group outline-primary has-checked:bg-primary relative inline-flex w-9 shrink-0 rounded-full bg-zinc-200 p-0.5 outline-offset-2 transition-colors duration-200 ease-in-out has-focus-visible:outline-2">
        <span className="relative h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-4">
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center opacity-100 transition-opacity duration-200 ease-in group-has-checked:opacity-0 group-has-checked:duration-100 group-has-checked:ease-out"
          >
            <XMarkIcon className="h-3 w-3 text-zinc-400" />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-has-checked:opacity-100 group-has-checked:duration-200 group-has-checked:ease-in"
          >
            <CheckIcon className="text-primary h-3 w-3" />
          </span>
        </span>
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-label={label}
          aria-describedby={description ? `${id}-description` : undefined}
          className="absolute inset-0 cursor-pointer appearance-none focus:outline-none"
          {...props}
        />
      </div>
    </div>
  )
}
