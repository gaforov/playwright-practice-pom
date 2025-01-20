# Playwright with JavaScript and TypeScript

This repository contains an Angular project tailored for testing components using Playwright with both JavaScript and TypeScript. It serves as a comprehensive resource for understanding how Playwright handles various UI elements and components. The project is based on a modified and lightweight version of the Ngx-Admin Angular 14 application from [akveo.com](https://github.com/akveo/ngx-admin).

## Project Structure

The project is organized as follows:

```plaintext
playwright-practice-pom/
├── .vscode/               # Visual Studio Code settings
├── src/                   # Source code of the Angular application
├── tests/                 # Playwright test scripts
├── .browserslistrc        # Browser compatibility configuration
├── .editorconfig          # Editor configuration
├── .gitignore             # Git ignore file
├── .prettierignore        # Prettier ignore file
├── .stylelintrc.json      # Stylelint configuration
├── LICENSE                # License information
├── README.md              # Project documentation
├── angular.json           # Angular CLI configuration
├── package-lock.json      # Lockfile for npm
├── package.json           # Project dependencies and scripts
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── tslint.json            # TSLint configuration
```

## Installation and Setup
To set up the project locally, follow these steps:

1. Clone the repository:

``` javascript
git clone https://github.com/gaforov/playwright-practice-pom.git
```
2. Navigate to the project directory:
``` javascript
cd playwright-practice-pom
```

3. Install the dependencies:

``` javascript
npm install
```
4. Install Playwright browsers:

``` javascript
npx playwright install
```
## Running the Tests
The project includes over 60 test cases, with 57 currently set to run successfully. To execute the tests, use the following command:

``` javascript
npx playwright test
```
This command will run all the tests located in the tests/ directory.

## Viewing Test Reports
After running the tests, you can view the detailed test report by executing:

``` javascript
npx playwright show-report
```
This will open an interactive HTML report in your default browser, providing insights into each test's execution.

## Additional Resources

- **Ngx-Admin Original Repository**: The original Ngx-Admin Angular 14 application can be found [here](https://github.com/akveo/ngx-admin).

##

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). 

## Author

This project is maintained by [Said](https://github.com/gaforov).  
Feel free to reach out or explore more projects on the GitHub profile.
