# Fitness AI - Your Personal AI Workout Coach 🏋️‍♂️

Fitness AI is a modern web application that provides personalized workout plans using artificial intelligence. Built with Next.js, TypeScript, and powered by OpenAI's GPT-4, this application helps users create customized fitness routines based on their individual needs and preferences.

## Features ✨

- **AI-Powered Workout Plans**: Get personalized workout routines based on your fitness goals, experience level, and preferences
- **Real-time Chat Interface**: Interact with an AI fitness coach for workout advice and modifications
- **User Authentication**: Secure authentication system using Supabase
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices
- **Progress Tracking**: Save and track your workout history
- **Modern UI**: Beautiful, intuitive interface with smooth animations and transitions

## Tech Stack 🛠️

- Next.js 14 (App Router)
- TypeScript
- Supabase (Authentication & Database)
- OpenAI GPT-4
- Tailwind CSS
- DaisyUI
- Vercel (Deployment)

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/fitness-ai.git
cd fitness-ai
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Set up your Supabase database tables:

   - Create a `workouts` table with the necessary columns (age, weight, fitness_goal, etc.)
   - Set up authentication providers in your Supabase dashboard

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

- `/app`: Main application routes and API endpoints
- `/components`: Reusable React components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and server actions
- `/utils`: Helper functions and constants
- `/interface`: TypeScript interfaces and types

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- OpenAI for providing the GPT-4 API
- Supabase for authentication and database services
- Vercel for hosting and deployment
- The Next.js team for the amazing framework

## Support 💬

For support, email your-email@example.com or open an issue in this repository.
