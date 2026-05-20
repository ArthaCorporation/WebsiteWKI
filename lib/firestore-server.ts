/**
 * Server-side Firestore helpers using the REST API.
 * Requires no additional credentials for publicly readable collections.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

export interface BeritaDoc {
  id: string
  title: string
  content: string
  imageUrl: string
  date: string
  slug: string
  createdAt?: string
}

function parseValue(value: unknown): unknown {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  if ('stringValue' in v) return v.stringValue
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  if ('booleanValue' in v) return v.booleanValue
  if ('timestampValue' in v) return v.timestampValue
  if ('nullValue' in v) return null
  if ('arrayValue' in v) {
    const arr = v.arrayValue as { values?: unknown[] }
    return (arr.values || []).map(parseValue)
  }
  if ('mapValue' in v) {
    const map = v.mapValue as { fields?: Record<string, unknown> }
    return parseFields(map.fields || {})
  }
  return null
}

function parseFields(fields: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(fields)) {
    result[key] = parseValue(val)
  }
  return result
}

export async function getBeritaList(): Promise<BeritaDoc[]> {
  try {
    const res = await fetch(`${BASE_URL}:runQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'berita' }],
          orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
        },
      }),
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const rows = await res.json()
    return (rows as Array<{ document?: { name: string; fields?: Record<string, unknown> } }>)
      .filter((row) => row.document)
      .map((row) => {
        const id = row.document!.name.split('/').pop()!
        return { id, ...parseFields(row.document!.fields || {}) } as BeritaDoc
      })
  } catch {
    return []
  }
}

export async function getBeritaById(id: string): Promise<BeritaDoc | null> {
  try {
    const res = await fetch(`${BASE_URL}/berita/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const doc = await res.json() as { name: string; fields?: Record<string, unknown> }
    if (!doc.fields) return null
    const docId = doc.name.split('/').pop()!
    return { id: docId, ...parseFields(doc.fields) } as BeritaDoc
  } catch {
    return null
  }
}
