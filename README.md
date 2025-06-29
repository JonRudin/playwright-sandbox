# Playwright Testing Project

A TypeScript-based testing project using Playwright for API and UI tests, written in a BDD-style format. Tests use Playwright's `test.describe` and `test.step` with "Given-When-Then" comments for clarity. The project includes a custom API fixture and GitHub Actions for automated test execution and HTML reporting.

## Prerequisites
- Node.js 20.x or later
- Git

## Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my-playwright-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Project Structure
- `tests/api/api.spec.ts`: API tests (e.g., verifies JSONPlaceholder API responses).
- `tests/ui/ui.spec.ts`: UI tests (e.g., validates web page titles).
- `tests/fixtures/apiFixture.ts`: Custom Playwright fixture for reusable API requests.
- `playwright.config.ts`: Playwright configuration for test execution and reporting.
- `tsconfig.json`: TypeScript configuration using ES Modules.
- `.github/workflows/test.yml`: GitHub Actions workflow for automated testing and reporting.

## Running Tests
Run all tests:
```bash
npm test
```

View the HTML test report:
```bash
npm run test:report
```

## Tests
- API Testing: Uses a custom `apiRequest` fixture to verify API responses (e.g., status codes, response body).
- UI Testing: Uses Playwright's `page` fixture to validate web page behavior (e.g., page titles).
- Tests follow a BDD-style structure with `Given`, `When`, `Then` comments for readability.

## GitHub Actions
The `.github/workflows/test.yml` workflow:
- Triggers on push or pull requests to the `main` branch.
- Runs tests using Node.js 20.
- Generates and uploads a Playwright HTML report (`playwright-report/`) as an artifact.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License
MIT License