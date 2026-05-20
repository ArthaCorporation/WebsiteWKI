import { NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const auth = getAdminAuth()
    const result = await auth.listUsers(100)
    const users = result.users.map((u) => ({
      uid: u.uid,
      email: u.email ?? '',
      displayName: u.displayName ?? '',
      createdAt: u.metadata.creationTime,
      lastLogin: u.metadata.lastSignInTime,
    }))
    return NextResponse.json({ users })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const status = message.includes('FIREBASE_SERVICE_ACCOUNT_KEY') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    const auth = getAdminAuth()
    const user = await auth.createUser({ email, password, displayName: displayName || undefined })
    return NextResponse.json({ uid: user.uid, email: user.email })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { uid } = await request.json()
    if (!uid) return NextResponse.json({ error: 'uid is required' }, { status: 400 })
    const auth = getAdminAuth()
    await auth.deleteUser(uid)
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
