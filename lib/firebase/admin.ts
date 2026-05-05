import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getAuth, type Auth } from "firebase-admin/auth"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

function initAdmin(): App {
  if (getApps().length > 0) return getApps()[0]
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export function getAdminAuth(): Auth {
  return getAuth(initAdmin())
}

export function getAdminDb(): Firestore {
  return getFirestore(initAdmin())
}

// Convenience accessors (initializes on first use, not at import time)
export const adminAuth = new Proxy({} as Auth, {
  get: (_, prop) => getAdminAuth()[prop as keyof Auth],
})

export const adminDb = new Proxy({} as Firestore, {
  get: (_, prop) => getAdminDb()[prop as keyof Firestore],
})
