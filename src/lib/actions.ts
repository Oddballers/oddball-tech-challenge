'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { PromptChallengeFormSchema } from '@/lib/schemas'
import { getFirebaseAdmin } from './firebase/server'
import type { UserProfile } from '@/types'
import { sendApprovalConfirmationEmail } from './email'

const sessionCookieName = 'codealchemist-session'

export async function createPromptedChallengeAction(
  data: z.infer<typeof PromptChallengeFormSchema>,
) {
  const { db } = getFirebaseAdmin()
  const validatedData = PromptChallengeFormSchema.safeParse(data)
  if (!validatedData.success) {
    throw new Error('Invalid form data.')
  }

  const { candidateName, candidateEmail, jobTitle, resume, jobDescription } = validatedData.data

  const formData = new FormData()
  formData.append('resume', new Blob([resume], { type: 'text/plain' }), 'resume.txt')
  formData.append(
    'job_description',
    new Blob([jobDescription], { type: 'text/plain' }),
    'job_description.txt',
  )

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-challenge`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Challenge service error: ${res.status} ${res.statusText}`)
  }

  const { challengeLink, githubRepo } = await res.json()

  try {
    await db.collection('challenges').add({
      candidateName,
      candidateEmail,
      jobTitle,
      challengeLink,
      githubRepo,
      status: 'Pending',
      createdAt: new Date(),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
    throw new Error('Could not save challenge to database.')
  }

  return { challengeLink, githubRepo }
}

export async function setSession(idToken: string) {
  const { auth } = getFirebaseAdmin()
  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
  cookies().set(sessionCookieName, sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function clearSession() {
  cookies().delete(sessionCookieName)
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const { db } = getFirebaseAdmin()
  const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get()
  const users: UserProfile[] = []
  usersSnapshot.forEach((doc) => {
    const data = doc.data()
    const createdAt = data.createdAt.toDate
      ? data.createdAt.toDate()
      : new Date(data.createdAt._seconds * 1000)
    users.push({
      ...data,
      createdAt: createdAt,
    } as UserProfile)
  })
  return users
}

export async function approveUser(uid: string): Promise<{ success: boolean; error?: string }> {
  const { db } = getFirebaseAdmin()
  try {
    const userRef = db.collection('users').doc(uid)
    const userDoc = await userRef.get()
    if (!userDoc.exists) {
      return { success: false, error: 'User not found.' }
    }
    const userData = userDoc.data() as UserProfile

    await userRef.update({
      status: 'active',
      role: 'user',
    })

    await sendApprovalConfirmationEmail(userData.email, userData.name)

    return { success: true }
  } catch (error: any) {
    console.error('Error approving user:', error)
    return { success: false, error: 'An unexpected error occurred during approval.' }
  }
}
