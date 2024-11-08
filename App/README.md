# Question App - React

This project is a React timer component that includes both a visual countdown indicator and an audio alert feature. The timer starts with a set duration (30 seconds) and updates every second, with the countdown indicator reflecting the remaining time. An audio alert sounds when the timer reaches the last 10 seconds, and the color of the countdown indicator changes to warn the user.

## ScreenShot
[View Demo Link](https://question-app-gold.vercel.app)

![ScreenShot](./public/screenshot.png)

## Features

- **Visual Countdown Indicator**: A circle stroke animation shows the remaining time, resetting for each question.
- **Audio Alert**: An audio file plays when there are 10 seconds left to alert the user.
- **Dynamic Styling**: The indicator changes color during the last 5 seconds for additional urgency.
- **Automatic Reset**: The timer resets to the initial 30 seconds at the start of each question.


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ozgurdayanir/question-app.git
   ```

2. **Navigate to the project directory**:
    ```bash
    cd App
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ````

4. **Run the project**:
    ```bash
    npm run dev
    ````

## License

This project is open-source under the MIT license.