# Setup Guide

## Quick Start

1. Clone the repository
2. Copy `js/config.example.js` to `js/config.js`
3. Add your OpenAI API key in `js/config.js`
4. Open `index.html` in your browser

## Running Local Server

### Option 1: Node.js
```bash
cd server
node server.js
```
Then open: http://localhost:8000

### Option 2: Batch File (Windows)
```bash
cd server
start-server.bat
```

## Configuration

Edit `js/config.js`:
- `API_KEY`: Your OpenAI API key
- `USE_DEMO_MODE`: Set to `true` for demo mode (no API calls)

## Demo Mode

Demo mode works without API key and generates sample content for testing.
