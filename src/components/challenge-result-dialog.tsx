'use client'

import type { ChallengeResult } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink, Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ChallengeResultDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  result: ChallengeResult | null // { challengeLink: string; githubRepo: string }
}

export function ChallengeResultDialog({ isOpen, setIsOpen, result }: ChallengeResultDialogProps) {
  const { toast } = useToast()
  if (!result) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: 'Copied to clipboard!' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Challenge Generated Successfully!
          </DialogTitle>
          <DialogDescription>Share the links below with the candidate.</DialogDescription>
        </DialogHeader>

        {/* VS Code link */}
        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <h3 className="font-semibold">Challenge Link</h3>
            <div className="relative rounded-md bg-muted p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => copyToClipboard(result.challengeLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <p className="truncate pr-10">{result.challengeLink}</p>
            </div>
          </div>

          {/* GitHub repo */}
          <div className="space-y-1">
            <h3 className="font-semibold">GitHub Repo</h3>
            <div className="relative rounded-md bg-muted p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => copyToClipboard(result.githubRepo)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <p className="truncate pr-10">{result.githubRepo}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in VSCode.dev
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
