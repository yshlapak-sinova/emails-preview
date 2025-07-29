# Email Preview

A development server for previewing and testing email templates with live reload functionality.

## Overview

This project provides a local development environment for creating and previewing email templates using Handlebars templating engine. It includes live reload functionality to automatically refresh the browser when templates or data files are modified.

## Features

- 🚀 **Live Reload**: Automatic browser refresh when files change
- 📧 **Email Templates**: Handlebars-based email templates
- 🎨 **Responsive Design**: Mobile-friendly email layouts
- 📁 **Modular Structure**: Reusable partials and components
- 🔧 **Easy Development**: Simple setup and development workflow

## Project Structure

```
email-preview/
├── preview.js              # Main server file
├── resources/
│   ├── data.json          # Template data and variables
│   └── images/            # Static assets
└── templates/
    └── partials/
        └── styles.hbs     # Shared CSS styles
```

### Directory Explanation

- **`preview.js`**: Express server that serves templates and handles live reload
- **`resources/`**: Static assets and data files
  - **`data.json`**: Contains template variables and configuration
  - **`images/`**: Static images used in email templates
- **`templates/`**: Handlebars email templates
  - **`partials/`**: Reusable template components
    - **`styles.hbs`**: Shared CSS styles for all templates
    - **`footer1.hbs`** & **`footer2.hbs`**: Different footer variants
  - **`welcome-email.hbs`**: Welcome email template
  - **`reset-password.hbs`**: Password reset email template

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd email-preview
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3002`

## Scripts

- **`npm run dev`**: Start development server with live reload
