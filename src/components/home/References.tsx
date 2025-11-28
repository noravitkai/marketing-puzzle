import { Container } from '@/components/ui/Container'
import { Cta } from '@/components/ui/Cta'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'

export default function References() {
  return (
    <section id="referenciaink">
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2">Referenciáink</Heading>
          <Lead as="p">Megtervezzük, megvalósítjuk</Lead>
          <Paragraph className="max-w-2xl">
            Már számos vállalkozásnak segítettünk, hogy marketingtevékenységüket hatékonyabbá,
            márkájukat szerethetővé és sikeressé tegyék, ezáltal pedig a bevételeiket is növeljék.
          </Paragraph>
        </div>
        <Cta
          heading="Hiszünk a partnerségek inspiráló hatásában."
          body={
            <>
              <p>
                A dániai Business Academy SouthWest egyetemmel való együttműködésünk keretében ezért
                az iskola multimédia-tervezés és webfejlesztés szakos hallgatói szakmai
                gyakorlatukat több alkalommal nálunk teljesítették.
              </p>
              <p>
                A közös munka során a hallgatók valós projekteken dolgozva értékes tapasztalatokat
                szerezhettek, csapatunk pedig friss nézőpontokkal gyarapodott.
              </p>
            </>
          }
          primaryAction={{ label: 'Partnerintézmény', href: '/kapcsolat' }}
          secondaryAction={{ label: 'További infó', href: '/projektek' }}
          images={[
            { src: '/EASV-building.jpg', alt: 'EASV épülete' },
            { src: '/people-example.jpeg', alt: 'Hallgatók közös munkán' },
          ]}
          className="w-full"
        />
      </Container>
    </section>
  )
}
