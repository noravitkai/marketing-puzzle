'use client'

import * as React from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/16/solid'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'

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
} & React.InputHTMLAttributes<HTMLInputElement>

export function InputGroup({ id, label, hint, leadingIcon, className, ...props }: InputGroupProps) {
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
      </div>
    </div>
  )
}
