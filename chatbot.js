// ==============================
// ROBOLAND AI CHATBOT
// ==============================

function sendMessage(){

```
const userInput =
document.getElementById('userInput');

const chatBox =
document.getElementById('chatBox');

const text =
userInput.value.trim();

if(text === '') return;

// User Message

const userMessage =
document.createElement('div');

userMessage.className = 'user-msg';

userMessage.innerText = text;

chatBox.appendChild(userMessage);

let response =
'I am ROBOLAND AI.';

const lower =
text.toLowerCase();

if(lower.includes('hello')){

    response =
    'Hello! Welcome to ROBOLAND 🚀';

}

else if(lower.includes('robot')){

    response =
    'Robotics combines sensors, controllers and actuators to perform tasks automatically.';

}

else if(lower.includes('arduino')){

    response =
    'Arduino is an open-source microcontroller platform widely used in robotics and IoT projects.';

}

else if(lower.includes('linux')){

    response =
    'Linux is a powerful open-source operating system used by developers and engineers worldwide.';

}

else if(lower.includes('ai')){

    response =
    'Artificial Intelligence enables machines to learn, reason and make decisions.';

}

else if(lower.includes('project')){

    response =
    'ROBOLAND offers projects in Robotics, AI, Linux, Electronics and IoT.';

}

else{

    response =
    'Interesting question. ROBOLAND AI is still learning.';

}

setTimeout(() => {

    const botMessage =
    document.createElement('div');

    botMessage.className = 'bot-msg';

    botMessage.innerText = response;

    chatBox.appendChild(botMessage);

    chatBox.scrollTop =
    chatBox.scrollHeight;

}, 800);

userInput.value = '';
```

}
