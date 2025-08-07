# Oddball Tech Challenge - Resume-Based Coding Challenge Generator

This application generates personalized coding challenges based on a candidate's resume and job description using AI. It creates a GitHub repository with the challenge and provides a development environment link.

## 🚀 Quick Demo

**Want to try it immediately?** Just run:

```bash
git clone https://github.com/Oddballers/oddball-tech-challenge.git
cd oddball-tech-challenge
npm install
npm run dev
```

Then visit http://localhost:9002/demo to try the interface (full functionality requires API keys - see setup below).

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Express.js with TypeScript (running on Bun)
- **AI Integration**: OpenAI GPT-4 for challenge generation
- **Version Control**: GitHub API for repository creation
- **File Processing**: Multer for resume and job description uploads
- **Authentication**: Firebase (optional - demo mode available)

## 🚀 Complete Setup Guide

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh) runtime
- GitHub account with personal access token
- OpenAI API account with credits
- (Optional) Firebase project for user authentication

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Oddballers/oddball-tech-challenge.git
cd oddball-tech-challenge

# Install frontend dependencies
npm install

# Install backend dependencies
cd backendV2
# Install bun if not already installed
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun install
cd ..
```

### 2. Configure Environment Variables

#### Frontend Configuration

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your configuration:
```env
# Firebase Configuration (Optional - for user authentication)
# Leave as dummy values to use demo mode without authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Backend Configuration

1. Configure the backend environment:
```bash
cd backendV2
# Edit .env file with your API keys
```

2. Add your API keys to `.env`:
```env
PORT=3000
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
OPENAI_API_KEY=your_openai_api_key
```

### 3. Get Required API Keys

#### GitHub Personal Access Token (Required)

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access public repositories)
4. Copy the generated token to your backend `.env` file

#### OpenAI API Key (Required for AI generation)

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key to your backend `.env` file
5. **Important**: Ensure you have credits in your OpenAI account

#### Firebase Setup (Optional - for user authentication)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and Firestore
4. Get your config values from Project Settings
5. Update your frontend `.env.local` with real Firebase values

### 4. Run the Application

#### Option A: Demo Mode (Recommended for testing)
```bash
# Start backend server (in one terminal)
cd backendV2
bun start

# Start frontend (in another terminal)
cd ..
npm run dev
```

Visit http://localhost:9002/demo for public access without authentication.

#### Option B: Full Authentication Mode
Ensure Firebase is properly configured in `.env.local`, then:
```bash
# Same commands as above
npm run dev
```

Visit http://localhost:9002 (will redirect to login/demo based on Firebase config).

## 📋 How to Use

### Demo Mode (No Authentication)
1. Visit http://localhost:9002/demo
2. **Paste Resume**: Copy and paste resume text into the first field
3. **Paste Job Description**: Copy and paste job posting into the second field  
4. **Generate Challenge**: Click "Generate Challenge" button
5. **Access Results**: Get links to GitHub repository and VS Code environment

### Full Mode (With Authentication)
1. Sign up or log in at http://localhost:9002
2. Use the challenge creation interface
3. Manage challenges through the dashboard

## 🔧 API Endpoints

### POST `/generate-challenge`

Generates a coding challenge based on uploaded files or text content.

**Request**: Multipart form data
- `resume`: Resume file (PDF/TXT, max 5MB) or text content
- `job_description`: Job description file (PDF/TXT, max 5MB) or text content

**Response**:
```json
{
  "challengeLink": "https://vscode.dev/github/username/repo/tree/branch",
  "githubRepo": "https://github.com/username/repo"
}
```

## 🛠️ Development & Testing

### Build and Test Commands

```bash
# Frontend
npm run build          # Build for production
npm run lint           # Run ESLint
npm run typecheck      # TypeScript checking

# Backend  
cd backendV2
bun start              # Start development server
```

### Project Structure

```
oddball-tech-challenge/
├── src/                    # Next.js frontend
│   ├── app/               # App router pages
│   │   ├── demo/          # Public demo page
│   │   ├── login/         # Authentication pages
│   │   └── ...            # Other protected pages
│   ├── components/        # React components
│   └── lib/              # Utilities & Firebase config
├── backendV2/            # Express.js backend
│   ├── index.ts          # Main server file
│   ├── .env              # Backend environment variables
│   └── uploads/          # Temporary file storage
├── .env.local.example    # Frontend environment template
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

1. **"OpenAI service error: ECONNREFUSED"**
   - The backend server isn't running
   - Run `cd backendV2 && bun start`

2. **"Invalid OpenAI API key" or OpenAI errors**
   - Verify your API key is correct in `backendV2/.env`
   - Check if you have credits in your OpenAI account
   - Ensure the key starts with `sk-`

3. **"GitHub permission denied"**
   - Ensure your GitHub token has `repo` permissions
   - Verify the username matches the token owner
   - Check token hasn't expired

4. **Build failures or Firebase errors**
   - Use the provided `.env.local.example` as a template
   - For demo-only usage, dummy Firebase values are sufficient
   - Ensure all required environment variables are set

5. **Port already in use**
   - Frontend: Change port with `npm run dev -- --port 3001`
   - Backend: Update `PORT` in `backendV2/.env`
   - Kill existing processes: `lsof -ti:3000 | xargs kill`

6. **CORS errors**
   - Ensure your frontend URL is in the backend CORS configuration
   - Check `backendV2/index.ts` CORS origins setting

### Development Tips

- Use the demo page for quick testing without authentication setup
- Check browser console for detailed error messages
- Backend logs provide useful debugging information
- Generated repositories are automatically cleaned up locally

## 📄 Tech Challenge Usage

This app is designed to streamline technical interviews by:

1. **Automated Challenge Creation**: Generates relevant coding challenges based on candidate background
2. **Immediate Environment Setup**: Provides instant VS Code development environment
3. **Version Control Integration**: Each challenge gets its own GitHub repository
4. **Scalable Architecture**: Supports multiple challenge types and technologies
5. **Easy Candidate Access**: Simple links for candidates to start coding immediately

## 🔒 Security & Configuration

- API keys stored securely in environment variables
- File uploads limited to 5MB with type validation
- Temporary files automatically cleaned up
- CORS configured for specific origins
- Firebase authentication optional for demo usage
- GitHub repositories can be public or private based on configuration

## 📈 Production Deployment

For production deployment:

1. Set up proper Firebase project with authentication
2. Configure production OpenAI and GitHub API keys
3. Set appropriate CORS origins for your domain
4. Use environment-specific configurations
5. Consider rate limiting and usage monitoring
6. Set up proper logging and error tracking

## 🤝 Contributing

This project serves as a technical challenge platform. For questions, improvements, or issues:

1. Check the troubleshooting section above
2. Review the console logs for specific error messages  
3. Ensure all API keys are properly configured
4. Test the demo page functionality first

## 📄 License

This project is part of the Oddball technical challenge system.
