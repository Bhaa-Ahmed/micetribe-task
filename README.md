# Angular Form with Undo/Redo Functionality

![Angular](https://img.shields.io/badge/angular-v17.3.8-red.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Implementation Details](#implementation-details)
- [Testing the Undo/Redo Functionality](#testing-the-undoredo-functionality)

## Introduction

This Angular application demonstrates a form with Undo/Redo functionality. The form allows users to input and edit various fields, and the Undo/Redo feature enables users to revert changes or redo previously undone changes.

## Features

- Reactive form with multiple input fields including text inputs, checkboxes, and dropdowns.
- Undo and Redo buttons to revert and reapply changes.
- State management using two arrays (`undoArray` and `redoArray`) to track changes.
- Visual feedback indicating the availability of Undo/Redo actions.

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or later)
- npm (version 9.x or later)
- Angular CLI (version 17.x or later)
```sh
npm install -g @angular/cli
```

## Installation Steps
1. Clone the repo
```sh
git clone https://github.com/Bhaa-Ahmed/micetribe-task.git
```
2. Navigate to the project directory
```sh
cd micetribe-task
```
3. Install NPM packages
```sh
npm install
```

## Running the Application
Run the following command to start a development server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
```sh
ng serve
```

## Implementation Details
### Form Setup
- Created a form with multiple input fields (text inputs, checkboxes, dropdowns) using Angular's reactive forms module.

### Undo/Redo Buttons
- Added Undo and Redo buttons to the form interface.
- The Undo button reverts the most recent change.
- The Redo button reapplies the most recently undone change.

### Undo/Redo Actions
- Implemented function to handle Undo and Redo actions:
  - `dispatchFormChange(historyArrayEnum: HistoryArray)`:Reverts the most recent change by restoring the previous state from `undoArray` and Reapplies the most recently undone change from `redoArray` based on the `historyArrayEnum`.
### User Experience
- Provided visual feedback to users when Undo/Redo actions are available.
- Disabled the Undo button when there are no changes to undo.
- Disabled the Redo button when there are no changes to redo.

### Testing the Undo/Redo Functionality
1. Make changes to the form fields.
2. Click the Undo button to revert the most recent change.
3. Click the Redo button to reapply the undone change.
4. Observe the visual feedback indicating the availability of Undo/Redo actions.