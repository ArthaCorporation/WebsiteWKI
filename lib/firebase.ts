import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Guard: only initialize Firebase when config is available (client-side or configured server).
// This prevents build-time errors when env vars are absent.
const isConfigured = !!(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: FirebaseApp = isConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : ({} as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: Firestore = isConfigured ? getFirestore(app) : ({} as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const auth: Auth = isConfigured ? getAuth(app) : ({} as any)

export { app, db, auth }
