import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `

Please review and give feedback of user's answer to quiz based on the following parameters:
The reply will only be the test text, no explanation of it.
`;

const feedbackAction = async (req, res) => {
  const { userInputAnswer, test } = req.body;
  console.log(`API: ${basePromptPrefix}
  ${req.body.userInputAnswer}
  ${req.body.test}
  

  `);

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Behave like a feedback system" },
      {
        role: "user",
        content: `${basePromptPrefix}
        Test:${req.body.test},
        User's Answer : ${req.body.userInputAnswer}



       
        `,
      },
    ],
  });
  console.log("baseCompletion: " + baseCompletion.data.choices[0].message);

  const basePromptOutput = baseCompletion.data.choices[0].message.content;
  console.log("basePromptOutPut: " + basePromptOutput);

  res.status(200).json({ output: basePromptOutput, status: 200 });
};

export default feedbackAction;
