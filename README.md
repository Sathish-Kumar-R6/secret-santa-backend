Here are the `README.md` files for both your frontend and backend applications, including the setup steps and commands:

---

### Frontend README

```markdown
# Secret Santa Frontend

This is the frontend application for the Secret Santa project. Follow the steps below to get started.

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
     yarn start
     ```
   - Build the app for production:
     ```bash
     yarn build
     ```
   - Run tests:
     ```bash
     yarn test
     ```
   - Eject configuration (if needed):
     ```bash
     yarn eject
     ```
   - Additional scripts:
     - Prettify code: `yarn prettify`
     - Lint staged files with ESLint: `yarn lint:staged`
     - Lint staged CSS files: `yarn lint:stagedcss`
     - TypeScript check: `yarn ts:check`
     - Commit with commitizen: `yarn commit`
     - Prepare Husky for Git hooks: `yarn prepare`

4. **Run the Application**:
   - Start the application:
     ```bash
     yarn start
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Once on the app, you can upload two CSV files as required for the project.

## Dependencies

- Ensure that you have Node.js and Yarn installed on your system.

```

---

### Backend README

```markdown
# Secret Santa Backend

This is the backend application for the Secret Santa project. The backend provides the necessary API routes for the frontend and includes a health check route.

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
   - Fix linting issues in staged files:
     ```bash
     yarn lint:staged:fix
     ```
   - Prettify code:
     ```bash
     yarn prettify
     ```
   - TypeScript check:
     ```bash
     yarn ts:check
     ```
   - Run tests:
     ```bash
     yarn test
     ```
   - Run tests in watch mode:
     ```bash
     yarn test:watch
     ```
   - Prepare Husky for Git hooks:
     ```bash
     yarn prepare
     ```

4. **Run the Application**:
   - Start the server:
     ```bash
     yarn dev
     ```
   - Open [http://localhost:4000/health-check](http://localhost:4000/health-check) in your browser to check the server health status.

5. **API Routes**:
   - The base API URL is `http://localhost:4000/secret-santa-be/api/v1`.
   - Use the `GET /health-check` endpoint to verify server health.

---

Let me know if you'd like further customizations!