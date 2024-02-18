# Technical Test Freelance QA - PT LNK

This repository contains test cases and automation scripts for the Technical Test Freelance QA at PT LNK.

## Description
This project aims to validate the functionality of a given online form using automated tests. It includes both test cases and Cypress automation scripts.

## How to Run
To run the tests, follow these steps:

1. Initialize a new Node.js project:
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to initialize your project.
   - Run the following command to initialize a new Node.js project:
     ```
     npm init
     ```

2. Install Cypress:
  Run the following command in your terminal to install Cypress:
     ```
     npm install cypress --save-dev
     ```

3. Clone this repository to your local machine.
4. Navigate to the project directory.
5. Open Cypress by running the following command:
     ```
     npx cypress open
     ```
6. Once Cypress opens, you can select the desired test script to run in the Cypress Test Runner interface.

## Folder Structure

- TestCases
  - form-test-cases.xlsx
- Automation
  - cypress
    - e2e
      - onlineForm.cy.js
    - support
- cypress.config.js
- package-lock.json
- package.json
