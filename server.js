import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());






dotenv.config()



/*
  app.post('/ekatesti', (req, res) => {
    const userMessage = req.body.question;

    console.log("Käyttäjä lähetti backendille viestin: " + userMessage);
  if (userMessage) {
    res.json({ question: `Tämä on serverin palauttama viesti frontille: ${userMessage}`})
  } else {
    res.status(400).json({ error: `Kysymys puuttuu. `})
  }
  })
*/

app.post('/chat', async (req, res) => {
  const userMessage = req.body.question;

  console.log("Käyttäjä lähetti chatGPT:lle viestin viestin: " + userMessage);

  try {

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: userMessage }
      ],
      max_tokens: 400
    })
  });
  const data = await response.json();
  console.log('API response:', data.choices[0].message.content);
  const reply = data.choices[0].message.content;
  res.json({reply});
  }catch(error){
    console.error('Virheviesti',error.message)
  }

/*
if (userMessage) {
  res.json({ question: `Tämä on serverin palauttama viesti frontille: ${userMessage}`})
} else {
  res.status(400).json({ error: `Kysymys puuttuu. `})
}
  */
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});