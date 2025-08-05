import { z } from 'zod'

export const PromptChallengeFormSchema = z.object({
  candidateName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  candidateEmail: z.string().email({ message: 'Please enter a valid email.' }),
  jobTitle: z.string().min(2, { message: 'Job title must be at least 2 characters.' }),
  resume: z.string().min(100, { message: 'Resume must be at least 100 characters.' }),
  jobDescription: z
    .string()
    .min(100, { message: 'Job description must be at least 100 characters.' }),
})

export type CustomChallengeFormValues = z.infer<typeof PromptChallengeFormSchema>
