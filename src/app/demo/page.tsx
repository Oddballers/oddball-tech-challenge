'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Github, Code, Zap } from "lucide-react";

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<{challengeLink: string, githubRepo: string} | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume.trim() || !jobDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both resume and job description.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      
      // Create text files from the input
      const resumeFile = new File([resume], 'resume.txt', { type: 'text/plain' });
      const jobFile = new File([jobDescription], 'job_description.txt', { type: 'text/plain' });
      
      formData.append('resume', resumeFile);
      formData.append('job_description', jobFile);
      
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/generate-challenge', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate challenge');
      }
      
      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Challenge Generated!",
        description: "Your personalized coding challenge is ready.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Unable to generate challenge. Please check if the backend is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold font-headline text-primary mb-4">
            CodeAlchemist Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate personalized coding challenges with AI
          </p>
        </div>

        {/* Demo Form */}
        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Generate Your Challenge
              </CardTitle>
              <CardDescription>
                Paste your resume and the job description to create a tailored coding challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="resume">Resume Content</Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="min-h-[200px] mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[200px] mt-2"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Challenge
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Results */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Code className="h-5 w-5" />
                Challenge Generated Successfully!
              </CardTitle>
              <CardDescription>
                Your personalized coding challenge is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="h-5 w-5" />
                    <h3 className="font-semibold">GitHub Repository</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    View the challenge files and repository structure
                  </p>
                  <Button asChild className="w-full">
                    <a href={result.githubRepo} target="_blank" rel="noopener noreferrer">
                      Open GitHub Repo
                    </a>
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5" />
                    <h3 className="font-semibold">Development Environment</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start coding immediately in VS Code online
                  </p>
                  <Button asChild className="w-full" variant="outline">
                    <a href={result.challengeLink} target="_blank" rel="noopener noreferrer">
                      Open VS Code
                    </a>
                  </Button>
                </Card>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={() => setResult(null)} 
                  variant="outline" 
                  className="w-full"
                >
                  Generate Another Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <Card className="text-center p-6">
            <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Challenges tailored to your skills and job requirements
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <Github className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">GitHub Integration</h3>
            <p className="text-sm text-muted-foreground">
              Automatic repository creation with project structure
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Instant Environment</h3>
            <p className="text-sm text-muted-foreground">
              Ready-to-use VS Code development environment
            </p>
          </Card>
        </div>

        {/* Backend Status Note */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-sm">
              <strong>Note:</strong> This demo requires the backend server to be running on localhost:3000 
              with proper API keys configured (OpenAI and GitHub). See the README for setup instructions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}