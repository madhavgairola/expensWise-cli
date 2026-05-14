# Expenswise CLI (`ewise`)

A powerful, command-line interface for the **Expenswise 2.0** application. Record expenses, manage budgets, check your dashboard, and interact with the Expenswise AI assistant right from your terminal!

## Features

- **AI-Powered Expense Entry**: Talk to the CLI naturally! Built on top of the Expenswise conversational AI `/chat` endpoint.
- **Real-Time Dashboards**: Instantly fetch your dashboard stats (Total Expenses, Total Income, Balance, by-Category).
- **Transaction History**: View a chronological history of all your combined income and expense events.
- **Budget Management**: Set and ask about budgets.
- **Secure Authentication**: Log in with email, sign up new accounts, or try it out using Guest Mode. 

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine (v14 or higher recommended).

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/expenswise-cli.git
   cd expenswise-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link the CLI globally:**
   ```bash
   # This creates the global `ewise` command on your system
   npm link
   ```

## Usage

Once linked, you can use the `ewise` command from anywhere in your terminal. 

### Authentication
Before doing anything, you need to log in!

```bash
ewise login
# Prompts you to select "Email and Password" or "Guest Mode".

ewise signup
# Let's you create a brand new account securely.

ewise logout
# Clears your local authentication token.
```

### Core Commands

**1. Record an Expense (`spend`)**
Records an expense by sending a conversational message to the AI.
```bash
ewise spend 10 coffee
ewise spend 250 food "groceries from Walmart"
```

**2. View Dashboard Stats (`stats`)**
Fetches your dashboard analytics including total balance, income, expenses, and a breakdown by category.
```bash
ewise stats
```

**3. View Recent History (`history`)**
Fetches your most recent transactions (combined incomes and expenses) in chronological order.
```bash
ewise history
```

**4. Manage Budgets (`budget`)**
Tell the AI to set or fetch your current budget restrictions.
```bash
ewise budget set groceries 500
ewise budget view
```

## Configuration

By default, the CLI connects to your production backend at `https://expenswise.onrender.com/api`.

If you want to run the CLI against a **local development server**, you can set the `EXPENSWISE_API_URL` environment variable before running a command:

**On Linux / macOS:**
```bash
EXPENSWISE_API_URL=http://localhost:3000/api ewise login
```

**On Windows (PowerShell):**
```powershell
$env:EXPENSWISE_API_URL="http://localhost:3000/api"; ewise login
```

## Tech Stack
- **Node.js**: Runtime environment
- **Commander.js**: Command-line argument parsing and routing
- **Inquirer**: Interactive, secure terminal prompts (passwords, menus)
- **Axios**: HTTP API client
- **Chalk**: Beautiful terminal coloring
