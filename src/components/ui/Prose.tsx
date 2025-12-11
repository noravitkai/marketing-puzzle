import React from 'react'
import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/24/outline'

type LexicalNode = {
  type: string
  children?: LexicalNode[]
  format?: string | number | null
  tag?: string
  text?: string
  url?: string
  listType?: 'number' | 'bullet' | 'check'
  checked?: boolean
  relationTo?: string
  value?: unknown
  fields?: unknown
  [key: string]: unknown
}

type ProseProps = {
  value: { root?: { children?: LexicalNode[] } } | null | undefined
  className?: string
}

const headingTagMap: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

const HEADING_BASE = 'leading-none font-extrabold tracking-tighter text-zinc-800'

const HEADING_SIZES: Record<string, string> = {
  h1: 'text-4xl sm:text-5xl',
  h2: 'text-3xl sm:text-4xl',
  h3: 'text-xl sm:text-2xl',
  h4: 'text-lg sm:text-xl',
  h5: 'text-base sm:text-lg',
  h6: 'text-xs sm:text-sm uppercase',
}

function getAlignmentClass(format?: string | number | null): string {
  if (!format || typeof format !== 'string') return ''

  if (format.includes('center')) return 'text-center'
  if (format.includes('right')) return 'text-right'
  if (format.includes('justify')) return 'text-justify'
  if (format.includes('left')) return 'text-left'

  return ''
}

function isBold(format?: string | number | null): boolean {
  if (!format) return false
  if (typeof format === 'number') {
    return (format & 1) !== 0
  }
  return format.includes('bold')
}

function isItalic(format?: string | number | null): boolean {
  if (!format) return false
  if (typeof format === 'number') {
    return (format & 2) !== 0
  }
  return format.includes('italic')
}

function isUnderline(format?: string | number | null): boolean {
  if (!format) return false
  if (typeof format === 'number') {
    return (format & 4) !== 0
  }
  return format.includes('underline')
}

function renderInlineText(node: LexicalNode, key: React.Key): React.ReactNode {
  const rawText = node.text ?? ''
  if (!rawText) return null

  let content: React.ReactNode = rawText

  if (isUnderline(node.format)) {
    content = <span className="underline">{content}</span>
  }

  if (isItalic(node.format)) {
    content = <em>{content}</em>
  }

  if (isBold(node.format)) {
    content = <strong>{content}</strong>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderChildren(children?: LexicalNode[]): React.ReactNode {
  if (!children?.length) return null
  return children.map((child, index) => renderNode(child, index))
}

function extractCaptionFromFields(fields: any): string {
  if (!fields) return ''

  if (typeof fields.caption === 'string') return fields.caption

  const captionRoot = fields.caption?.root
  const captionChildren: LexicalNode[] | undefined = captionRoot?.children

  if (!Array.isArray(captionChildren) || captionChildren.length === 0) return ''

  const firstBlock = captionChildren[0]
  if (!firstBlock?.children?.length) return ''

  return firstBlock.children.map((c: any) => c.text ?? '').join('')
}

function renderNode(node: LexicalNode, index: number, blockClassName?: string): React.ReactNode {
  switch (node.type) {
    case 'paragraph': {
      const alignClass = getAlignmentClass(node.format)

      return (
        <p key={index} className={clsx(alignClass, blockClassName)}>
          {renderChildren(node.children)}
        </p>
      )
    }

    case 'heading': {
      const tag = node.tag ?? 'h2'
      const Tag = (headingTagMap[tag] ?? 'h2') as React.ElementType
      const alignClass = getAlignmentClass(node.format)

      const sizeClasses = HEADING_SIZES[tag] ?? HEADING_SIZES.h3
      const baseClasses = clsx(HEADING_BASE, sizeClasses)

      return (
        <Tag key={index} className={clsx(baseClasses, alignClass, blockClassName)}>
          {renderChildren(node.children)}
        </Tag>
      )
    }

    case 'list': {
      const isOrdered = node.listType === 'number'
      const isChecklist = node.listType === 'check'

      if (isChecklist) {
        return (
          <ul key={index} className={clsx('list-none space-y-4', blockClassName)}>
            {node.children?.map((item, itemIndex) => {
              const checked = Boolean(item.checked)

              return (
                <li key={itemIndex} className="flex items-start gap-2">
                  <span
                    className={clsx(
                      'mt-1 inline-flex h-4 w-4 items-center justify-center rounded-lg ring-1',
                      checked ? 'bg-primary ring-primary' : 'ring-zinc-900/15',
                    )}
                    aria-hidden="true"
                  >
                    {checked && <CheckIcon className="h-3 w-3 text-white" />}
                  </span>
                  <div className="flex-1">{renderChildren(item.children)}</div>
                </li>
              )
            })}
          </ul>
        )
      }

      const ListTag = (isOrdered ? 'ol' : 'ul') as React.ElementType

      return (
        <ListTag
          key={index}
          className={clsx(
            'space-y-4 pl-5',
            'list-outside',
            isOrdered ? 'list-decimal' : 'list-disc',
            blockClassName,
          )}
        >
          {node.children?.map((item, itemIndex) => (
            <li key={itemIndex} className="marker:text-zinc-400">
              {renderChildren(item.children)}
            </li>
          ))}
        </ListTag>
      )
    }

    case 'quote': {
      const alignClass = getAlignmentClass(node.format)

      return (
        <blockquote
          key={index}
          className={clsx('border-l-2 border-zinc-200 pl-2 italic', alignClass, blockClassName)}
        >
          {renderChildren(node.children)}
        </blockquote>
      )
    }

    case 'link': {
      const fields = (node.fields ?? {}) as { url?: string | null }
      const rawUrl =
        (typeof node.url === 'string' && node.url.trim()) ||
        (typeof fields.url === 'string' && fields.url.trim()) ||
        ''

      if (!rawUrl) {
        return <React.Fragment key={index}>{renderChildren(node.children)}</React.Fragment>
      }

      const href = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary underline decoration-1 underline-offset-4 transition-colors duration-300"
        >
          {renderChildren(node.children)}
        </a>
      )
    }

    case 'upload':
    case 'image': {
      let src = ''
      let alt = ''

      if (node.type === 'upload') {
        if (node.relationTo === 'media' && node.value && typeof node.value === 'object') {
          const media = node.value as any
          src = media.url ?? ''
          alt = media.alt ?? ''
        }
      } else {
        const anyNode = node as any
        src = anyNode.src ?? ''
        alt = anyNode.altText ?? anyNode.alt ?? ''
      }

      if (!src) return null

      const caption =
        node.fields && typeof node.fields === 'object' ? extractCaptionFromFields(node.fields) : ''

      return (
        <figure key={index} className={blockClassName}>
          <div className="aspect-video overflow-hidden rounded-md bg-white/90 shadow-sm ring-1 ring-zinc-900/5">
            <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
          {caption && <figcaption className="mt-3 text-sm text-zinc-500">{caption}</figcaption>}
        </figure>
      )
    }

    case 'linebreak': {
      return <br key={index} />
    }

    case 'text': {
      return renderInlineText(node, index)
    }

    default: {
      return <React.Fragment key={index}>{renderChildren(node.children)}</React.Fragment>
    }
  }
}

export function Prose({ value, className }: ProseProps) {
  const rootChildren = value?.root?.children ?? []

  if (!Array.isArray(rootChildren) || rootChildren.length === 0) {
    return null
  }

  return (
    <div
      className={clsx('max-w-none text-sm leading-relaxed text-zinc-600 sm:text-base', className)}
    >
      {rootChildren.map((node, index) => {
        const isHeading = node.type === 'heading'
        const isFirst = index === 0
        const isLast = index === rootChildren.length - 1

        let blockClassName: string

        if (isHeading) {
          const mt = isFirst ? 'mt-0' : 'mt-6'
          const mb = isLast ? 'mb-0' : 'mb-6'
          blockClassName = `${mt} ${mb}`
        } else {
          const mt = isFirst ? 'mt-0' : 'mt-4'
          const mb = isLast ? 'mb-0' : 'mb-4'
          blockClassName = `${mt} ${mb}`
        }

        return renderNode(node as LexicalNode, index, blockClassName)
      })}
    </div>
  )
}
