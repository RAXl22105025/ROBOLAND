async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const text = userInput.value.trim();

    if (text === '') return;

    // 1. Add User Message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-msg';
    userMessage.innerText = text;
    chatBox.appendChild(userMessage);

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Show "Thinking..."
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-msg';
    typingIndicator.innerText = 'ROBOLAND AI is thinking...';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Ask Backend
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch('https://roboland-backend.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        const data = await response.json();
        chatBox.removeChild(typingIndicator);

        const botMessage = document.createElement('div');
        botMessage.className = 'bot-msg';
        
        if (response.ok) {
            botMessage.innerText = data.reply;
        } else {
            botMessage.innerText = "Error: " + (data.error || "Server issue");
        }
        
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        if (chatBox.contains(typingIndicator)) chatBox.removeChild(typingIndicator);
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'bot-msg';
        errorMsg.innerText = "Error: " + (error.name === 'AbortError' ? "Server took too long to wake up." : error.message);
        chatBox.appendChild(errorMsg);
    }
}

// THIS MUST BE OUTSIDE THE FUNCTION
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
