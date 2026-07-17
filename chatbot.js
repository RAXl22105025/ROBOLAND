async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const text = userInput.value.trim();

    if (text === '') return;

    // 1. Add User Message to Chat
    const userMessage = document.createElement('div');
    userMessage.className = 'user-msg';
    userMessage.innerText = text;
    chatBox.appendChild(userMessage);

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Show "Thinking..." Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-msg';
    typingIndicator.style.fontStyle = 'italic';
    typingIndicator.style.opacity = '0.7';
    typingIndicator.innerText = 'ROBOLAND AI is thinking...';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Ask the Backend (which asks OpenAI)
    try {
        // Create a controller to wait longer for the server to wake up
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // Wait 30 seconds

        const response = await fetch('https://roboland-backend.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
            signal: controller.signal
        });

        clearTimeout(timeoutId); // Stop the timer if it succeeds
        
        const data = await response.json();
        
        // Remove the typing indicator
        chatBox.removeChild(typingIndicator);

        // 4. Show the AI's real response
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
        chatBox.removeChild(typingIndicator);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'bot-msg';
        // Tell us WHY it failed in the chat window so we know for sure
        errorMsg.innerText = "Error: " + (error.name === 'AbortError' ? "Server took too long to wake up." : error.message);
        chatBox.appendChild(errorMsg);
        console.error("DEBUG:", error);
    }
// Allow Enter key to send
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
