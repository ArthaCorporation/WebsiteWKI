import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0]

  // Option 1: path to the JSON file (easier for local dev)
  const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  if (keyPath) {
    const resolved = path.resolve(process.cwd(), keyPath)
    if (!fs.existsSync(resolved)) {
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_KEY: file not found at "${resolved}"`)
    }
    const serviceAccount = JSON.parse(fs.readFileSync(resolved, 'utf-8'))
    return initializeApp({ credential: cert(serviceAccount) })
  }

  // Option 2: raw JSON string in env var (for production / Vercel)
  const keyJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (keyJson) {
    try {
      const serviceAccount = JSON.parse(keyJson)
      return initializeApp({ credential: cert(serviceAccount) })
    } catch {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT_KEY is set but contains invalid JSON. ' +
        'For local development, use FIREBASE_SERVICE_ACCOUNT_PATH instead (point it to the .json file).'
      )
    }
  }

  throw new Error(
    'Firebase Admin not configured. Add FIREBASE_SERVICE_ACCOUNT_PATH=./your-key.json to .env.local'
  )
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}

// Returns null if the request carries a valid ID token for a user with the
// `admin` custom claim; otherwise returns the error response to send back.
export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  const header = request.headers.get('Authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    if (decoded.admin !== true) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return null
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
