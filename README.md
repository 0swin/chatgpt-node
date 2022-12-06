# chatgpt-node

This project is a simple chat bot built using OpenAI and Puppeteer. It logs in to the OpenAI chat website and sends a message to the chat.

<br/>

## Prerequisites

To run this project, you will need the following:

- Node.js and npm installed on your computer
- A free OpenAI account (https://beta.openai.com/)
- A .env file containing your OpenAI credentials in the root directory of this project

<br/>

## Installation

1. Clone this repository to your local computer
2. Open a terminal in the root directory of this project
3. Install the dependencies by running npm install
4. Create a .env file in the root directory of this project with the following format:
   ```
   OPENAI_USERNAME=your_username
   OPENAI_PASSWORD=your_password
   ```
5. Run the project by running `npm start`

<br/>

## Usage

After starting the project, the bot will log in to OpenAI and send a message to the chat. You can edit the message that is sent by changing the message variable in the main() function.

<br/>

## Notes

- The bot uses a cookies.json file to store the authentication cookies after logging in. This means that the bot will not have to log in again if you restart the project.
- If you want to log out, simply delete the cookies.json file.
- The bot is currently set to run in headless mode (i.e., without a visible browser window). You can change this by setting the headless option in the puppeteer.launch() method to false.
- This Readme file was made by ChatGPT itself. It can be innacurate.
