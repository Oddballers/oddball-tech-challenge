'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { createPromptedChallengeAction } from '@/lib/actions'
import { PromptChallengeFormSchema } from '@/lib/schemas'
import { Loader2, PlusCircle } from 'lucide-react'
import type { ChallengeResult } from '@/types'
import { ChallengeResultDialog } from './challenge-result-dialog'

export function CreateChallengeDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ChallengeResult | null>(null)
  const [isResultOpen, setIsResultOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof PromptChallengeFormSchema>>({
    resolver: zodResolver(PromptChallengeFormSchema),
    defaultValues: {
      candidateName: '',
      candidateEmail: '',
      jobTitle: '',
      resume: '',
      jobDescription: '',
    },
  })

  async function onSubmit(values: z.infer<typeof PromptChallengeFormSchema>) {
    setIsLoading(true)
    try {
      const challengeResult = await createPromptedChallengeAction(values)
      setResult(challengeResult)
      setIsResultOpen(true)
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error creating challenge',
        description: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Challenge
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create New Challenge</DialogTitle>
            <DialogDescription>
              Generate a coding challenge using one of the methods below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="candidateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="candidateEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate's Resume</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste resume text here..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the JD here..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Challenge
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {result && (
        <ChallengeResultDialog isOpen={isResultOpen} setIsOpen={setIsResultOpen} result={result} />
      )}
    </>
  )
}
