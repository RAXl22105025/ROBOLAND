// ==============================
// ROBOLAND AI CHATBOT
// ==============================

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const text = userInput.value.trim();

    if (text === '') return;

    // 1. Add User Message to Chat
    const userMessage = document.createElement('div');
    userMessage.className = 'user-msg';
    userMessage.innerText = text;
    chatBox.appendChild(userMessage);

    // Clear input field and scroll down immediately
    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Show "Typing..." Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-msg';
    typingIndicator.style.fontStyle = 'italic';
    typingIndicator.style.opacity = '0.7';
    typingIndicator.innerText = 'ROBOLAND AI is typing...';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Determine the Bot's Response
    let response = 'I am ROBOLAND AI.';
    const lower = text.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi')) {
        response = 'Hello! Welcome to ROBOLAND 🚀';
    } else if (lower.includes('robot')) {
        response = 'Robotics combines sensors, controllers and actuators to perform tasks automatically.';
    } else if (lower.includes('arduino')) {
        response = 'Arduino is an open-source microcontroller platform widely used in robotics and IoT projects.';
    } else if (lower.includes('linux')) {
        response = 'Linux is a powerful open-source operating system used by developers and engineers worldwide.';
    } else if (lower.includes('ai') || lower.includes('artificial intelligence')) {
        response = 'Artificial Intelligence enables machines to learn, reason and make decisions.';
    } else if (lower.includes('project')) {
        response = 'ROBOLAND offers projects in Robotics, AI, Linux, Electronics and IoT.';
    } else {
        response = 'Interesting question. ROBOLAND AI is still learning, but I am here to help you build amazing things!';
    }

    // 4. Replace Typing Indicator with Real Response after a delay
    setTimeout(() => {
        // Remove the "typing..." message
        chatBox.removeChild(typingIndicator);

        // Add the real bot message
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-msg';
        botMessage.innerText = response;
        chatBox.appendChild(botMessage);

        // Scroll to the bottom again
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // 1 second delay feels a bit more natural
}

// 5. Allow user to press "Enter" on their keyboard to send
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
