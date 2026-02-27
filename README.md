# 🧠 AI Study Helper Web App

AI-powered study material generator for students. Generate notes, summaries, and quizzes instantly!

## ✨ Features

- 📝 AI-generated notes and summaries
- 🎯 Quiz generation with MCQs
- 📊 Difficulty level selection (Beginner/Intermediate/Advanced)
- 🌙 Dark theme UI
- 📱 Mobile-friendly responsive design
- ⚡ Fast and simple interface

## 🚀 Setup Instructions

1. **Get API Key**
   - OpenAI: https://platform.openai.com/api-keys
   - OR Gemini: https://makersuite.google.com/app/apikey

2. **Configure API Key (Secure Method)**
   - Copy `config.example.js` to `config.js`
   - Open `config.js` and add your API key
   - The `config.js` file is in `.gitignore` so it won't be uploaded to GitHub
   - If using Gemini, update the API_ENDPOINT as well

3. **Run the App**
   - Simply open `index.html` in your browser
   - No installation needed!

## 🔒 Security

- `config.js` contains your API key and is NOT tracked by git
- Never commit `config.js` to GitHub
- Only share `config.example.js` (without real API key)
- If you accidentally commit your key, regenerate it immediately on OpenAI dashboard

## 📖 How to Use

1. Enter your study topic
2. Select difficulty level
3. Choose content type (Notes/Quiz/Both)
4. Click "Generate Study Material"
5. Review your AI-generated content!

## 🛠 Tech Stack

- HTML5
- CSS3 (Dark Theme)
- Vanilla JavaScript
- OpenAI/Gemini API

## 📁 Project Structure

```
ai-study-helper/
├── index.html      # Main UI
├── style.css       # Dark theme styling
├── script.js       # Logic + AI integration
└── README.md       # Documentation
```

## 🔮 Future Enhancements

- PDF download
- User authentication
- Save history
- Multi-language support
- Progress tracking
- Flashcards generation

## 📝 Notes

- Make sure to keep your API key secure
- Don't commit API keys to public repositories
- Consider using environment variables for production

---

Made with ❤️ for students
