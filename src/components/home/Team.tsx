import clsx from 'clsx'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'

export type TeamMember = {
  id: string
  name: string
  positions?: string[]
  imageUrl?: string
  imageAlt?: string
  description?: string
}

type TeamProps = {
  heading?: string
  lead?: string
  description?: string
  members: TeamMember[]
}

const BADGE_POSITIONS: Record<number, string[]> = {
  1: ['top-2/3 -right-2 -rotate-2'],
  2: ['top-1/2 -left-2 -rotate-2', 'top-2/3 -right-2 rotate-1'],
  3: [
    'top-1/4 -left-2 -rotate-3',
    'top-1/2 -translate-y-1/2 -left-2 rotate-1',
    'top-1/2 -right-2 rotate-2',
  ],
  4: [
    'top-1/4 -left-2 rotate-1',
    'top-1/2 -translate-y-1/2 -left-2 -rotate-3',
    'top-1/2 -right-2 -rotate-2',
    'top-2/3 -right-2 rotate-0',
  ],
}

function getBadgePositionClasses(count: number, index: number): string {
  const safeCount = Math.min(Math.max(count, 1), 4)
  const layouts = BADGE_POSITIONS[safeCount]
  const safeIndex = Math.min(Math.max(index, 0), layouts.length - 1)
  return layouts[safeIndex]
}

export default function Team({ heading, lead, description, members }: TeamProps) {
  if (!members.length) {
    return null
  }

  const tiltVariants = ['rotate-0', 'rotate-1', '-rotate-1', 'rotate-1', 'rotate-0', '-rotate-1']
  const hasHeader = Boolean(heading || lead || description)

  return (
    <section id="csapat">
      <Container className="mt-16 sm:mt-20">
        {hasHeader ? (
          <div className="flex flex-col items-center gap-6 text-center">
            {heading ? <Heading as="h2">{heading}</Heading> : null}
            {lead ? <Lead as="p">{lead}</Lead> : null}
            {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
          </div>
        ) : null}
        <div className={hasHeader ? 'mt-8 px-0 md:px-2' : 'px-0 md:px-2'}>
          <ul role="list" className="grid grid-cols-2 gap-4 sm:gap-8 xl:grid-cols-3">
            {members.map((member, index) => {
              if (!member.imageUrl) return null
              const tiltClass = tiltVariants[index % tiltVariants.length]
              return (
                <li key={member.id} className="flex h-full">
                  <div className="flex flex-col items-center">
                    <div className={clsx('relative w-full transition-transform', tiltClass)}>
                      <img
                        src={member.imageUrl}
                        alt={member.imageAlt ?? ''}
                        className="aspect-video w-full rounded-md object-cover"
                      />
                      {member.positions && member.positions.length > 0 ? (
                        <div className="pointer-events-none absolute inset-0 hidden md:block">
                          {member.positions.slice(0, 4).map((position, posIndex) => {
                            const posClass = getBadgePositionClasses(
                              Math.min(member.positions!.length, 4),
                              posIndex,
                            )
                            return (
                              <div
                                key={position}
                                className={clsx('pointer-events-auto absolute', posClass)}
                              >
                                <Badge>{position}</Badge>
                              </div>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex w-full flex-1 justify-center">
                      <div className="-mt-4 inline-flex w-[80%] flex-col items-center gap-1 rounded-md bg-white/90 p-2 text-center text-xs shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-6 sm:p-4 md:items-start md:text-left">
                        <h3 className="font-medium tracking-tighter text-zinc-800 uppercase">
                          {member.name}
                        </h3>
                        {member.positions && member.positions.length > 0 ? (
                          <p className="text-zinc-600 md:hidden">{member.positions.join(' • ')}</p>
                        ) : null}
                        {member.description ? (
                          <p className="hidden text-zinc-600 md:block">{member.description}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
