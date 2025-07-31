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
- 📊 **Template-Specific Data**: Each template has its own data file

## Project Structure

```
email-preview/
├── preview.js              # Main server file
├── resources/
│   ├── data/              # Template-specific data files
│   └── images/            # Static assets
└── templates/
    ├── partials/
    │   ├── footers/       # Footer variants
    │   ├── styles.hbs     # Shared CSS styles
    │   └── logo.hbs       # Logo component
    ├── welcome-email.hbs
    ├── reset-password.hbs
    ├── activation-reminder.hbs
    └── registration-confirmation.hbs
```

### Directory Explanation

- **`preview.js`**: Express server that serves templates and handles live reload
- **`resources/`**: Static assets and data files
  - **`data/`**: Template-specific data files
    - **`data.json`**: Fallback data file for backward compatibility
    - **`[template].data.json`**: Template-specific variables and configuration
  - **`images/`**: Static images used in email templates
- **`templates/`**: Handlebars email templates
  - **`partials/`**: Reusable template components
    - **`styles.hbs`**: Shared CSS styles for all templates
    - **`logo.hbs`**: Logo component used across templates
    - **`footers/`**: Footer variants for different templates
      - **`welcome-email-footer.hbs`**: Footer for welcome email
      - **`reset-password-footer.hbs`**: Footer for password reset
      - **`activation-reminder-footer.hbs`**: Footer for activation reminder
      - **`registration-confirmation-footer.hbs`**: Footer for registration confirmation
  - **`welcome-email.hbs`**: Welcome email template
  - **`reset-password.hbs`**: Password reset email template
  - **`activation-reminder.hbs`**: Account activation reminder template
  - **`registration-confirmation.hbs`**: Registration confirmation template

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
