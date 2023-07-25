import Redis from 'ioredis'

import config from '@/config'

const redis = new Redis(config.redis.url as string)

export async function getValue(key: string): Promise<object | undefined> {
  const value = await redis.get(key)

  if (!value) return

  return JSON.parse(value) as unknown as object
}

export async function setValue(
  key: string,
  value: string | number | boolean | object,
): Promise<void> {
  await redis.set(key, JSON.stringify(value))
}
