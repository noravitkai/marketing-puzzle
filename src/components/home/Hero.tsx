import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Lead, Paragraph } from '@/components/ui/Text'
import { PlayCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import image1 from '@/images/image-1.jpg'
import image2 from '@/images/image-2.jpg'
import image3 from '@/images/image-3.jpg'
import image4 from '@/images/image-4.jpg'
import image5 from '@/images/image-5.jpg'

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <Link
            key={image.src}
            href="@"
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-md bg-zinc-100 transition hover:scale-105 sm:w-72',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function Hero() {
  return (
    <>
      <Container className="mt-9">
        <div className="flex flex-col items-center gap-6 text-center">
          <Lead as="h1">
            Ötletközpontú <span className="text-primary">marketingmegoldások.</span>
          </Lead>
          <Paragraph className="max-w-2xl">
            Teljes körű, a marketingkommunikáció minden formáját tartalmazó szolgáltatást nyújtunk,
            mintha cégednek marketing, PPC és SM menedzserből, webfejlesztőből, grafikusból,
            szövegíróból álló, egész marketingosztálya lenne.
          </Paragraph>
          <div className="flex items-center gap-4">
            <Button
              href="@"
              variant="primary"
              trailingIcon={
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
              }
            >
              Ingyenes konzultáció
            </Button>
            <Button
              href="@"
              variant="secondary"
              trailingIcon={<PlayCircleIcon className="h-5 w-5" aria-hidden="true" />}
            >
              Összefoglaló videó
            </Button>
          </div>
        </div>
      </Container>
      <Photos />
    </>
  )
}
