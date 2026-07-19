```# SmartBot

A Slack bot that lets you request random animal facts, pictures, and jokes directly inside your workspace using Slash commands.

<img width="1600" height="413" alt="Gemini_Generated_Image_yqfbazyqfbazyqfb" src="https://github.com/user-attachments/assets/fc625a16-4907-4738-9195-22b61e74b8f7" />

## Quick Start

The bot is already running live on the server. To use it in Slack, just type any of the commands below in your chat bar.

## Features

* `/smartbot-ping` - Measures the bot's response latency in milliseconds.
* `/smartbot-help` - Lists all available commands.
* `/smartbot-catfact` & `/smartbot-dogfact` - Fetches a random animal fact from external APIs.
* `/smartbot-catpicture` & `/smartbot-duckpicture` - Grabs a random image or GIF of a cat or duck.
* `/smartbot-joke` - Delivers a random setup and punchline joke.

## How to run it locally

### Prerequisites
* Node.js (Version 18 or higher)
* A Slack App configured with Socket Mode enabled

### Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install```

Create a .env file in the root directory and add your Slack tokens:
```SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_APP_TOKEN=your-slack-app-token```

Start the local development server:
```node index.js```

How it works
The bot is built using Node.js and the official @slack/bolt framework running in Socket Mode. Instead of exposing a public HTTP endpoint and dealing with webhooks, the bot establishes a secure, persistent WebSocket connection to Slack's servers.

All commands are asynchronous. When a user requests an image or a fact, the bot acknowledges the request immediately to prevent Slack's strict 3-second timeout, fetches the data from the respective third-party API using axios, and then delivers the payload back to the channel. The production version runs as a managed systemd service on a Linux VPS to ensure uptime and automatic restarts.

Credits
Slack Bolt Framework for the core setup.

The Cat API, Dog API, and Random Duck API for providing the media feeds.

Official Joke API for the jokes.
