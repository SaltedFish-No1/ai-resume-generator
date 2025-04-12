// lib/firebase/client.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // 引入 Storage
import { ResumeData } from '@/types/resume';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (process.env.NODE_ENV === 'development') {
  console.log('🔥 Firebase Client Initialized')
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);  // 导出 Firestore
export const storage = getStorage(app); // 导出 storage



// 获取用户简历数据
export async function getUserProfile(uid: string): Promise<ResumeData | null> {
  const docRef = doc(db, 'users', uid, 'profile', 'base')
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? (docSnap.data() as ResumeData) : null
}