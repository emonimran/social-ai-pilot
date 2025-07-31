# Social AI Pilot 🚀

A powerful SaaS platform that transforms social media management with AI-powered content generation, smart scheduling, and automated posting across multiple platforms.

## ✨ Features

### 🎯 **AI Content Generation**
- Generate engaging captions and posts tailored to your brand voice
- Support for Instagram, LinkedIn, Twitter, and Facebook
- Multiple tone options: Professional, Casual, Friendly, Engaging, Informative
- Content variations and AI-powered suggestions

### 🖼️ **Smart Image Selection**
- Integrated stock photo search powered by Pexels API
- AI-suggested images based on your content topic
- High-quality photos with proper attribution

### 🔐 **User Authentication**
- Email/password authentication via Firebase
- Google OAuth integration
- Secure user sessions and profile management

### 📱 **Modern UI/UX**
- Beautiful, responsive design with Tailwind CSS
- Intuitive dashboard for content creation
- Real-time content preview and editing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI API**: Ready for Google AI Studio or OpenAI integration
- **Image API**: Pexels API integration
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase project set up
- API keys for AI and image services

### Installation

1. **Clone and install dependencies**
   ```bash
   cd social-ai-pilot
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

   # AI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here

   # Image API Configuration
   PEXELS_API_KEY=your_pexels_api_key_here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
social-ai-pilot/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AuthModal.tsx   # Authentication modal
│   │   ├── ContentGenerator.tsx  # AI content generation
│   │   ├── ImageSelector.tsx     # Image selection component
│   │   └── WaitlistForm.tsx      # Landing page waitlist
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── lib/                # Utility libraries
│   │   ├── firebase.ts     # Firebase configuration
│   │   ├── ai.ts          # AI content generation utilities
│   │   ├── images.ts      # Image API utilities
│   │   └── utils.ts       # General utilities
│   └── styles/
└── public/                 # Static assets
```

## 🔧 Development Roadmap

### ✅ Completed
- [x] Next.js project setup with TypeScript and Tailwind CSS
- [x] Landing page with waitlist capture
- [x] Firebase authentication (email/password + Google)
- [x] AI content generation with mock API
- [x] Image API integration with Pexels
- [x] Responsive dashboard with content generator

### 🚧 In Progress
- [ ] Post scheduling UI and Firestore integration
- [ ] Basic analytics dashboard

### 📋 Coming Soon
- [ ] User profile and brand setup flow
- [ ] Real AI API integration (OpenAI/Google AI)
- [ ] Social media platform integrations
- [ ] Advanced scheduling features
- [ ] Team collaboration tools
- [ ] Analytics and insights
- [ ] Subscription management

## 💡 Business Model

**Freemium SaaS** with tiered subscriptions:

- **Free Tier**: 1-2 social profiles, limited AI content generation
- **Starter ($19/month)**: More AI credits, additional profiles
- **Pro ($49/month)**: Unlimited generation, advanced analytics
- **Business ($99/month)**: Team features, white-labeling

## 🔑 API Integration Guide

### 🔥 Firebase Setup (Detailed Guide)

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `social-ai-pilot` (or your preferred name)
4. Disable Google Analytics for now (can be enabled later)
5. Click **"Create project"**

#### Step 2: Add Web App to Firebase Project
1. In your Firebase project dashboard, click the **web icon** `</>`
2. Register app with nickname: `social-ai-pilot-web`
3. **Don't check** "Set up Firebase Hosting"
4. Click **"Register app"**
5. **Copy the Firebase configuration object** - you'll need these values

#### Step 3: Get Your Firebase Configuration
Your Firebase config should look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC-example-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

#### Step 4: Create Environment File
Create `.env.local` in your project root with your Firebase values:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

#### Step 5: Enable Authentication Service
1. In Firebase Console, go to **"Authentication"** in the left sidebar
2. Click **"Get started"** to initialize Authentication
3. Go to **"Sign-in method"** tab

#### Step 6: Configure Sign-in Methods

**Enable Email/Password:**
1. Click on **"Email/Password"** provider
2. Toggle **"Enable"** to ON
3. Click **"Save"**

**Enable Google Sign-in:**
1. Click on **"Google"** provider
2. Toggle **"Enable"** to ON
3. Enter your **Project support email** (use your Gmail address)
4. Click **"Save"**

#### Step 7: Create Firestore Database
1. In Firebase Console, go to **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location close to your users
5. Click **"Done"**

#### Step 8: Set Security Rules (Optional for Development)
For development, your Firestore rules can be:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Step 9: Verify Setup
1. Restart your development server: `npm run dev`
2. Your app should load without Firebase errors
3. Authentication modal should work for both email/password and Google sign-in

#### 🚨 Common Issues & Solutions

**Error: "Firebase: Error (auth/invalid-api-key)"**
- ✅ Make sure `.env.local` file exists in project root
- ✅ Verify all environment variables are set correctly
- ✅ Restart development server after creating `.env.local`

**Error: "CONFIGURATION_NOT_FOUND"**
- ✅ Enable Authentication service in Firebase Console
- ✅ Enable Email/Password and Google sign-in methods
- ✅ Make sure you completed Step 5 and 6 above

**Error: "Firebase project not found"**
- ✅ Check `NEXT_PUBLIC_FIREBASE_PROJECT_ID` matches your Firebase project ID
- ✅ Ensure project exists in Firebase Console

#### 📋 Firebase Setup Checklist
- [ ] Firebase project created
- [ ] Web app registered in Firebase project
- [ ] `.env.local` file created with all config values
- [ ] Authentication service enabled
- [ ] Email/Password sign-in method enabled
- [ ] Google sign-in method enabled
- [ ] Firestore database created
- [ ] Development server restarted
- [ ] Authentication working without errors

### Setting up Pexels API
1. Sign up at [Pexels](https://www.pexels.com/api/)
2. Get your API key
3. Add to `.env.local` as `PEXELS_API_KEY`

### Setting up AI APIs
Choose one or both:
- **OpenAI**: Get API key from [OpenAI Platform](https://platform.openai.com)
- **Google AI**: Get API key from [Google AI Studio](https://makersuite.google.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

**Made with ❤️ for the social media community**

*Transform your social media presence with the power of AI!*