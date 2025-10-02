# 💰 Pocket Balance - Personal Budget Planner

A modern, AI-powered personal budget management application built with Next.js, React, and TypeScript. Track your income, expenses, and savings with intelligent budget advice powered by Groq AI.

![Pocket Balance](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 📊 Financial Dashboard
- **Real-time Balance Tracking** - Monitor your remaining balance instantly
- **Category-wise Overview** - Income, Payments, Personal Expenses, and Savings
- **Visual Financial Cards** - Color-coded categories for easy understanding

### 💳 Transaction Management
- **Add Transactions** - Income, payments, personal expenses, and savings
- **Transaction History** - View all transactions with dates and amounts
- **Delete Transactions** - Remove unwanted entries with confirmation
- **Form Persistence** - Your input is saved locally while filling forms

### 🤖 AI-Powered Budget Advice
- **Personalized Recommendations** - Get tailored advice based on your financial data
- **Risk Assessment** - Understand your financial health with low/medium/high risk levels
- **Actionable Suggestions** - Receive specific steps to improve your budget
- **Smart Analysis** - AI analyzes your spending patterns and provides insights

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme Support** - Beautiful interface with modern design
- **Intuitive Navigation** - Easy-to-use interface for all skill levels
- **Real-time Updates** - Instant feedback and calculations

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - Package manager
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saleem-144/Pocket-Balance-.git
   cd Pocket-Balance-
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```
   
   **To get a GROQ API key:**
   - Visit [Groq Console](https://console.groq.com/)
   - Sign up for a free account
   - Generate an API key
   - Copy the key to your `.env.local` file

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
pocket-balance/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── advice/
│   │   │       └── route.ts          # AI advice API endpoint
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout component
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── BudgetAdvice.tsx          # AI advice component
│   │   ├── Dashboard.tsx              # Main dashboard
│   │   ├── TransactionForm.tsx       # Transaction input form
│   │   └── TransactionList.tsx       # Transaction display
│   ├── services/
│   │   └── ai.ts                     # AI service functions
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   └── utils/
│       ├── storage.ts                # Local storage utilities
│       └── ui.ts                     # UI utility functions
├── .env.local                        # Environment variables
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Technologies Used

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.0** - Type safety
- **Tailwind CSS 4.0** - Styling framework

### Backend & AI
- **Groq SDK** - AI integration for budget advice
- **Next.js API Routes** - Serverless API endpoints
- **Local Storage** - Client-side data persistence

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundling
- **PostCSS** - CSS processing

## 💡 How It Works

1. **Add Transactions**: Users can add income, payments, personal expenses, and savings
2. **Real-time Calculations**: The app automatically calculates totals and remaining balance
3. **AI Analysis**: When requesting advice, the app sends financial data to Groq AI
4. **Personalized Recommendations**: AI provides tailored budget advice and suggestions
5. **Data Persistence**: All data is stored locally in the browser

## 🎯 Key Features Explained

### Financial Categories
- **Income** 💰 - Money coming in (salary, freelance, etc.)
- **Payments** 💳 - Essential expenses (rent, utilities, loans)
- **Personal** 🛍️ - Discretionary spending (entertainment, dining)
- **Savings** 🏦 - Money set aside for future goals

### AI Budget Advice
The AI analyzes your financial data and provides:
- **Financial Health Assessment** - Overall evaluation
- **Risk Level** - Low/Medium/High risk assessment
- **Actionable Suggestions** - Specific steps to improve your budget
- **Personalized Recommendations** - Tailored to your spending patterns

## 🔒 Privacy & Security

- **Local Storage Only** - Your financial data stays on your device
- **No External Data Sharing** - Data is only sent to AI for analysis
- **Secure API Keys** - Environment variables protect your API credentials
- **Client-Side Processing** - Sensitive calculations happen locally

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Add your `GROQ_API_KEY` to environment variables
4. Deploy!

### Other Platforms
- **Netlify** - Static site hosting
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** - For providing AI capabilities
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the powerful UI library

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/Saleem-144/Pocket-Balance-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Saleem-144/Pocket-Balance-/discussions)
- **Email**: Contact through GitHub profile

## 🎉 Getting Started Checklist

- [ ] Install Node.js (18.0+)
- [ ] Clone the repository
- [ ] Run `npm install`
- [ ] Create `.env.local` with GROQ_API_KEY
- [ ] Run `npm run dev`
- [ ] Open [http://localhost:3000](http://localhost:3000)
- [ ] Add your first transaction
- [ ] Try the AI advice feature

---

**Happy Budgeting! 💰✨**

Made with ❤️ by [Saleem](https://github.com/Saleem-144)