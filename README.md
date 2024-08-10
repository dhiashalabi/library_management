# Library Management (Frappe + Next.js) App

## Overview

The **Library Management** application is designed to streamline the management of library resources. It includes both a backend built with Frappe and a frontend application built with Next.js. This combination allows for a robust, scalable, and modern library management system.

## Features

- **Backend**: Built with Frappe, providing a flexible and powerful backend to handle library data, such as books, authors, and borrowers.
- **Frontend**: Developed using Next.js, offering a responsive and dynamic user interface for interacting with the library management system.

## Getting Started

### Prerequisites

- Node.js and npm (for frontend development)
- Python and pip (for backend development)
- Docker (optional, for running Frappe and ERPNext in containers)

### Setup and Installation

#### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd library-management
   ```

2. Create a Python Virtual Environment

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install Backend Dependencies

    ```bash
    pip install -r requirements.txt
    ```

4. Setup Frappe

Follow the Frappe installation guide for detailed instructions on setting up Frappe.

5. Initialize the Database

    ```bash
    bench new-site library-management.local
    bench --site library-management.local install-app library_management
    ```

6.Start the Backend Server

    ```bash
    bench start
    ```

### Frontend Setup

1. Navigate to the Frontend Directory

    ```bash
    cd frontend
    ```

2. Install Frontend Dependencies

    ```bash
    npm install
    ```

3. Run the Development Server

    ```bash
    npm run dev
    ```

4. Open the Application

Visit http://localhost:3000 in your browser to view the frontend.

### Configuration

- Backend Configuration: Configuration for the Frappe backend can be managed via the `sites/common_site_config.json` file or the Frappe web interface.
- Frontend Configuration: Environment variables for the Next.js frontend can be set in a `.env.local` file.

### Usage

- Backend: Access the Frappe backend via `http://localhost:8000`. Use the Frappe web interface to manage library records and configurations.
- Frontend: Interact with the frontend application to view and manage library resources.

### Testing

- Backend Tests: Run backend tests using the Frappe testing tools.
- Frontend Tests: Run frontend tests using Jest or your preferred testing framework.

### Deployment

For deployment, consider using Docker or a cloud-based platform for both the backend and frontend. Detailed instructions can be found in the respective documentation for Frappe and Next.js.

### Contributing

1. Fork the Repository
2. Create a Feature Branch
3. Commit Your Changes
4. Push to the Branch
5. Open a Pull Request

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements

- Frappe Framework: Frappe
-mNext.js: Next.js
