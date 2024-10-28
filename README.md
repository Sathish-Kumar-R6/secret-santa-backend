# Secret Santa Backend

- This is the backend application for the Secret Santa project. The backend provides the necessary API routes for the frontend and includes a health check route.

## Dependencies

- Ensure that you have Node.js and Yarn installed on your system.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   In the terminal, type:
   ```bash
   yarn
   ```

3. **Available Scripts**:
   - Start the development server:
     ```bash
     yarn dev
     ```
   - Run tests:
     ```bash
     yarn test
     ```
   - Run tests in watch mode:
     ```bash
     yarn test:watch
     ```

4. **Run the Application**:
   - Start the server:
     ```bash
     yarn dev
     ```
   - Server runs on [http://localhost:4000](http://localhost:4000)
   - Open [http://localhost:4000/health-check](http://localhost:4000/health-check) in your browser to check the server health status.

5. **API Routes**:
   - The base API URL is `http://localhost:4000/secret-santa-be/api/v1`.
   - Use the `GET /health-check` endpoint to verify server health.
