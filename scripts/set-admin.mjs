// One-time setup: give an existing Firebase Auth account the `admin` custom claim.
// Usage: npm run set-admin -- admin@example.com
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import fs from 'fs'
import path from 'path'

const email = process.argv[2]
if (!email) {
  console.error('Usage: npm run set-admin -- <email>')
  process.exit(1)
}

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
const keyJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
const serviceAccount = keyPath
  ? JSON.parse(fs.readFileSync(path.resolve(process.cwd(), keyPath), 'utf-8'))
  : keyJson
    ? JSON.parse(keyJson)
    : null

if (!serviceAccount) {
  console.error('Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_KEY in .env.local')
  process.exit(1)
}

const auth = getAuth(initializeApp({ credential: cert(serviceAccount) }))
const user = await auth.getUserByEmail(email)
await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true })
console.log(`Granted admin to ${email} (uid ${user.uid}). Log out and back in for it to take effect.`)
