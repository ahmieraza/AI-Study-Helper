// Configuration
let API_KEY, API_ENDPOINT, USE_DEMO_MODE;

// Check if config.js is loaded (local development)
if (typeof CONFIG !== 'undefined') {
    API_KEY = CONFIG.API_KEY;
    API_ENDPOINT = CONFIG.API_ENDPOINT;
    USE_DEMO_MODE = CONFIG.USE_DEMO_MODE;
    console.log('Config loaded from config.js');
} else {
    // Fallback for GitHub Pages (config.js not available)
    API_KEY = 'YOUR_API_KEY_HERE';
    API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
    USE_DEMO_MODE = true; // Always use demo mode when config not found
    console.log('Running in demo mode (config.js not found)');
}

console.log('Demo Mode:', USE_DEMO_MODE);

// DOM Elements
const topicInput = document.getElementById('topicInput');
const difficultyLevel = document.getElementById('difficultyLevel');
const contentType = document.getElementById('contentType');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const outputSection = document.getElementById('outputSection');
const outputContent = document.getElementById('outputContent');

// Check URL parameters and set defaults
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set content type from URL
    const typeParam = urlParams.get('type');
    if (typeParam && (typeParam === 'notes' || typeParam === 'quiz' || typeParam === 'both')) {
        contentType.value = typeParam;
    }
    
    // Set difficulty from URL
    const difficultyParam = urlParams.get('difficulty');
    if (difficultyParam && (difficultyParam === 'beginner' || difficultyParam === 'intermediate' || difficultyParam === 'advanced')) {
        difficultyLevel.value = difficultyParam;
    }
    
    // Focus on topic input
    topicInput.focus();
});

// Event Listeners
generateBtn.addEventListener('click', generateStudyMaterial);
clearBtn.addEventListener('click', clearOutput);
topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateStudyMaterial();
});

// Main Function
async function generateStudyMaterial() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
        alert('Please enter a topic!');
        return;
    }
    
    const difficulty = difficultyLevel.value;
    const type = contentType.value;
    
    // Show loading
    loadingSpinner.classList.remove('hidden');
    outputSection.classList.add('hidden');
    generateBtn.disabled = true;
    
    try {
        const prompt = buildPrompt(topic, difficulty, type);
        const response = USE_DEMO_MODE ? getDemoContent(topic, difficulty, type) : await callAI(prompt);
        displayOutput(response, type);
    } catch (error) {
        console.error('Error:', error);
        outputContent.innerHTML = `
            <div style="color: #ef4444; padding: 20px; text-align: center;">
                <h3>⚠️ Error</h3>
                <p>${error.message}</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #a1a1aa;">
                    Make sure to add your API key in script.js
                </p>
            </div>
        `;
        outputSection.classList.remove('hidden');
    } finally {
        loadingSpinner.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Build AI Prompt
function buildPrompt(topic, difficulty, type) {
    let prompt = `You are an expert educational assistant. Create study material for the topic: "${topic}" at ${difficulty} level.\n\n`;
    
    if (type === 'notes' || type === 'both') {
        prompt += `Provide:\n`;
        prompt += `1. A clear summary (2-3 paragraphs)\n`;
        prompt += `2. Key points (5-7 bullet points)\n`;
        prompt += `3. Important concepts to remember\n\n`;
    }
    
    if (type === 'quiz' || type === 'both') {
        prompt += `Also create 5 multiple choice questions with:\n`;
        prompt += `- 4 options each (A, B, C, D)\n`;
        prompt += `- Correct answer marked\n`;
        prompt += `- Brief explanation for each answer\n\n`;
    }
    
    prompt += `Format the response in a clear, structured way.`;
    
    return prompt;
}

// Demo Content Generator
function getDemoContent(topic, difficulty, type) {
    let content = `# ${topic}\n**Difficulty Level:** ${difficulty.toUpperCase()}\n\n`;
    
    if (type === 'notes' || type === 'both') {
        content += `## 📖 Comprehensive Summary\n\n`;
        
        // Detailed introduction
        content += `${topic} is a fundamental concept that plays a crucial role in its field. `;
        content += `Understanding ${topic} requires a systematic approach that combines theoretical knowledge with practical application. `;
        content += `At the ${difficulty} level, we'll explore this topic in depth, covering essential principles, real-world applications, and advanced concepts.\n\n`;
        
        content += `The study of ${topic} has evolved significantly over time, incorporating new methodologies and technologies. `;
        content += `Modern approaches to ${topic} emphasize both foundational understanding and innovative problem-solving techniques. `;
        content += `This comprehensive guide will help you master the core concepts and develop practical skills.\n\n`;
        
        // Historical context
        content += `### 🕰️ Background and Context\n\n`;
        content += `${topic} emerged as a response to specific challenges and needs in its domain. `;
        content += `Over the years, researchers and practitioners have refined our understanding, leading to the sophisticated frameworks we use today. `;
        content += `The evolution of ${topic} reflects broader trends in technology, methodology, and theoretical development.\n\n`;
        
        // Core concepts
        content += `### 🎯 Core Concepts and Principles\n\n`;
        content += `**1. Fundamental Definition:**\n`;
        content += `${topic} can be defined as a systematic approach to understanding and solving problems within its domain. `;
        content += `It encompasses various techniques, methodologies, and best practices that have been proven effective through research and application.\n\n`;
        
        content += `**2. Key Components:**\n`;
        content += `The study of ${topic} involves several interconnected components that work together to create a comprehensive framework. `;
        content += `Each component plays a vital role in the overall understanding and application of the concept.\n\n`;
        
        content += `**3. Theoretical Framework:**\n`;
        content += `The theoretical foundation of ${topic} is built on established principles from related fields. `;
        content += `These theories provide the conceptual basis for practical applications and guide decision-making processes.\n\n`;
        
        // Detailed key points
        content += `### 📌 Essential Key Points\n\n`;
        content += `• **Foundation and Basics:** Understanding ${topic} begins with grasping its fundamental principles and core definitions. `;
        content += `This includes recognizing the problem space it addresses and the solutions it provides.\n\n`;
        
        content += `• **Practical Applications:** ${topic} has numerous real-world applications across various industries and contexts. `;
        content += `From everyday scenarios to complex professional environments, its principles can be applied effectively.\n\n`;
        
        content += `• **Methodological Approaches:** Different methodologies exist for implementing ${topic}, each with its own strengths and use cases. `;
        content += `Understanding when and how to apply each approach is crucial for success.\n\n`;
        
        content += `• **Best Practices and Standards:** The field has established best practices that guide effective implementation. `;
        content += `Following these standards ensures quality outcomes and minimizes common pitfalls.\n\n`;
        
        content += `• **Common Challenges:** Practitioners often encounter specific challenges when working with ${topic}. `;
        content += `Being aware of these challenges and their solutions is essential for effective problem-solving.\n\n`;
        
        content += `• **Tools and Resources:** Various tools, frameworks, and resources are available to support work in ${topic}. `;
        content += `Familiarity with these resources enhances efficiency and effectiveness.\n\n`;
        
        content += `• **Future Trends:** The field continues to evolve with emerging technologies and methodologies. `;
        content += `Staying informed about trends helps maintain relevance and competitive advantage.\n\n`;
        
        // Advanced concepts
        content += `### 🚀 Advanced Concepts\n\n`;
        content += `For ${difficulty} level learners, it's important to explore more sophisticated aspects of ${topic}. `;
        content += `This includes understanding complex interactions, optimization techniques, and advanced problem-solving strategies. `;
        content += `Advanced practitioners should also be familiar with edge cases, performance considerations, and scalability issues.\n\n`;
        
        // Practical tips
        content += `### 💡 Practical Tips for Mastery\n\n`;
        content += `**Study Strategies:**\n`;
        content += `- Break down complex concepts into manageable chunks\n`;
        content += `- Practice regularly with hands-on exercises and real-world examples\n`;
        content += `- Connect new knowledge to existing understanding\n`;
        content += `- Seek out diverse resources and perspectives\n`;
        content += `- Engage with communities and experts in the field\n\n`;
        
        content += `**Application Guidelines:**\n`;
        content += `- Start with simple scenarios before tackling complex problems\n`;
        content += `- Document your learning process and insights\n`;
        content += `- Experiment with different approaches and techniques\n`;
        content += `- Learn from mistakes and iterate on solutions\n`;
        content += `- Stay updated with latest developments and research\n\n`;
        
        // Important reminders
        content += `### ⚠️ Important Reminders\n\n`;
        content += `Remember that mastering ${topic} is a journey that requires consistent effort and practice. `;
        content += `Don't rush through the fundamentals—a strong foundation is essential for advanced understanding. `;
        content += `Apply concepts in practical scenarios whenever possible, as hands-on experience reinforces theoretical knowledge. `;
        content += `Collaborate with others, ask questions, and don't hesitate to revisit challenging concepts.\n\n`;
        
        content += `The ${difficulty} level approach to ${topic} balances depth with accessibility, ensuring you build comprehensive understanding `;
        content += `while maintaining engagement and practical relevance. Keep practicing, stay curious, and enjoy the learning process!\n\n`;
    }
    
    if (type === 'quiz' || type === 'both') {
        content += `## 📝 Comprehensive Quiz\n\n`;
        content += `Test your understanding of ${topic} with these carefully crafted questions:\n\n`;
        
        content += `**Question 1: Fundamental Understanding**\n\n`;
        content += `What is the primary purpose and main objective of ${topic}?\n\n`;
        content += `A) To create unnecessary complexity in problem-solving\n`;
        content += `B) To provide a systematic, structured approach to understanding and solving domain-specific problems\n`;
        content += `C) To replace all traditional methods without consideration\n`;
        content += `D) To serve as a theoretical concept with no practical application\n\n`;
        content += `**✓ Correct Answer: B**\n`;
        content += `**Explanation:** ${topic} is designed to provide a systematic and structured approach to problem-solving. `;
        content += `It combines theoretical frameworks with practical methodologies to address real-world challenges effectively. `;
        content += `This approach has been refined through research and practical application across various contexts.\n\n`;
        
        content += `---\n\n`;
        
        content += `**Question 2: Practical Applications**\n\n`;
        content += `Which of the following best describes the practical applications of ${topic}?\n\n`;
        content += `A) Limited to academic and theoretical contexts only\n`;
        content += `B) Applicable across diverse industries and real-world scenarios with proven effectiveness\n`;
        content += `C) Only useful in very specific, narrow circumstances\n`;
        content += `D) Outdated and no longer relevant in modern contexts\n\n`;
        content += `**✓ Correct Answer: B**\n`;
        content += `**Explanation:** ${topic} has broad practical applications across multiple industries and contexts. `;
        content += `From everyday scenarios to complex professional environments, its principles can be effectively applied. `;
        content += `Real-world implementations have demonstrated its value and versatility in solving diverse challenges.\n\n`;
        
        content += `---\n\n`;
        
        content += `**Question 3: Learning Approach**\n\n`;
        content += `At the ${difficulty} level, what should be your primary focus when studying ${topic}?\n\n`;
        content += `A) Memorizing every detail without understanding context\n`;
        content += `B) Understanding core concepts, practicing regularly, and applying knowledge in practical scenarios\n`;
        content += `C) Skipping fundamentals and jumping to advanced topics\n`;
        content += `D) Only reading theory without any hands-on practice\n\n`;
        content += `**✓ Correct Answer: B**\n`;
        content += `**Explanation:** Effective learning at the ${difficulty} level requires a balanced approach. `;
        content += `Focus on understanding fundamental concepts deeply, practice regularly with hands-on exercises, `;
        content += `and apply your knowledge in practical scenarios. This combination of theory and practice leads to true mastery.\n\n`;
        
        content += `---\n\n`;
        
        content += `**Question 4: Best Practices**\n\n`;
        content += `Which approach represents best practices when working with ${topic}?\n\n`;
        content += `A) Using a single method for all situations regardless of context\n`;
        content += `B) Following established standards, adapting to specific contexts, and learning from experience\n`;
        content += `C) Ignoring documented best practices and guidelines\n`;
        content += `D) Avoiding collaboration and working in isolation\n\n`;
        content += `**✓ Correct Answer: B**\n`;
        content += `**Explanation:** Best practices in ${topic} involve following established standards while remaining flexible `;
        content += `enough to adapt to specific contexts. Learning from both successes and failures, collaborating with others, `;
        content += `and staying updated with current methodologies are all essential components of professional practice.\n\n`;
        
        content += `---\n\n`;
        
        content += `**Question 5: Key Success Factors**\n\n`;
        content += `What is the most important factor for achieving mastery in ${topic}?\n\n`;
        content += `A) Speed of learning without depth of understanding\n`;
        content += `B) Consistent practice, deep understanding of principles, and practical application over time\n`;
        content += `C) Memorization of facts without comprehension\n`;
        content += `D) Avoiding challenging aspects and focusing only on easy topics\n\n`;
        content += `**✓ Correct Answer: B**\n`;
        content += `**Explanation:** True mastery of ${topic} comes from consistent, deliberate practice combined with `;
        content += `deep understanding of underlying principles. Practical application reinforces learning and reveals nuances `;
        content += `that theory alone cannot teach. This long-term, comprehensive approach builds genuine expertise.\n\n`;
        
        content += `---\n\n`;
        
        content += `### 🎯 Quiz Summary\n\n`;
        content += `These questions cover fundamental concepts, practical applications, learning strategies, best practices, `;
        content += `and success factors related to ${topic}. Review any questions you found challenging and revisit `;
        content += `the corresponding sections in the notes above. Remember, understanding why answers are correct `;
        content += `is more valuable than simply memorizing the answers themselves.\n\n`;
    }
    
    return content;
}

// Call AI API
async function callAI(prompt) {
    // Check if API key is set
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error('Please add your API key in script.js file');
    }
    
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Change to 'gemini-pro' if using Gemini
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Display Output
function displayOutput(content, type) {
    // Format the content with proper HTML
    let formattedContent = content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Wrap in paragraph tags
    formattedContent = `<p>${formattedContent}</p>`;
    
    // Parse quiz questions if present
    if (type === 'quiz' || type === 'both') {
        formattedContent = parseQuizQuestions(formattedContent);
    }
    
    outputContent.innerHTML = formattedContent;
    outputSection.classList.remove('hidden');
    
    // Smooth scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Parse Quiz Questions
function parseQuizQuestions(content) {
    // This is a simple parser - you can enhance it based on AI response format
    const lines = content.split('<br>');
    let html = '';
    let inQuestion = false;
    
    lines.forEach(line => {
        if (line.match(/^\d+\./)) {
            if (inQuestion) html += '</div>';
            html += '<div class="quiz-question">';
            html += `<strong>${line}</strong>`;
            inQuestion = true;
        } else if (line.match(/^[A-D]\)/)) {
            html += `<div class="quiz-option">${line}</div>`;
        } else if (line.match(/correct|answer/i)) {
            html += `<div class="correct-answer">✓ ${line}</div>`;
        } else {
            html += line + '<br>';
        }
    });
    
    if (inQuestion) html += '</div>';
    
    return html;
}

// Clear Output
function clearOutput() {
    outputSection.classList.add('hidden');
    outputContent.innerHTML = '';
    topicInput.value = '';
    topicInput.focus();
}
