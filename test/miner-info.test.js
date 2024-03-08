import { test } from 'zinnia:test'
import { assertMatch, AssertionError } from 'zinnia:assert'
import { getMinerPeerId } from '../lib/miner-info.js'

const KNOWN_MINER_ID = 'f0142637'

test('get peer id of a known miner', async () => {
  const result = await getMinerPeerId(KNOWN_MINER_ID)
  assertMatch(result, /^12D3KooW/)
})

test('get peer id of a miner that does not exist', async () => {
  try {
    const result = await getMinerPeerId('f010')
    throw new AssertionError(
      `Expected "getMinerPeerId()" to fail, but it resolved with "${result}" instead.`
    )
  } catch (err) {
    assertMatch(err.toString(), /\bf010\b.*\bactor code is not miner/)
  }
})
