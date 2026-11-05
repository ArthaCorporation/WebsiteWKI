import { NextResponse } from 'next/server'
import { getAdminAuth, requireAdmin } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  const denied = await requireAdmin(request)
  if (denied) return denied

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
  const denied = await requireAdmin(request)
  if (denied) return denied

  try {
    const { email, password, displayName } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    const auth = getAdminAuth()
    const user = await auth.createUser({ email, password, displayName: displayName || undefined })
    await auth.setCustomUserClaims(user.uid, { admin: true })
    return NextResponse.json({ uid: user.uid, email: user.email })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin(request)
  if (denied) return denied

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
