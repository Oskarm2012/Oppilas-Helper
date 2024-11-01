document.getElementById('send-button-chatbox').addEventListener('click', sendMessage)

document.getElementById('user-input-chatbox').addEventListener('keypress', function (pressedKey) {
    if (pressedKey.key === 'Enter') {
      sendMessage();
    }
  });


async function sendMessage(){
    console.log("Viesti lähetetty")
    const userMessage = document.getElementById('user-input-chatbox').value;
    document.getElementById('user-input-chatbox').value = '';
    console.log(userMessage);
    addMessageToChat("Sinä: " + userMessage, "userMessage");

    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
            },
      body: JSON.stringify({ question: userMessage }) 

    });

    if (response.status == 200){
      const data = await response.json();
      console.log(data)
      console.log(data.reply);
      addMessageToChat("ChatGPT: " + data.reply, "bot-message");
      
      
      }
      else{
        console.log(response);
        addMessageToChat('ChatGPT: Jotain meni pieleen. Yritä uudelleen myöhemmin.', "bot-message");
      }

      


}

function sendImages(){
  const imageInput = document.getElementById('image-input');
  const files = imageInput.files;
  console.log(files);
  if (files.length === 0) {
    alert('Valitse kuvia ensin.');
    return;
  }  
}

function addMessageToChat(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    console.log(messageElement);

    document.getElementById('chatbox').appendChild(messageElement)
}
