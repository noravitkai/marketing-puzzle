'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getPayloadClient() {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload
}
