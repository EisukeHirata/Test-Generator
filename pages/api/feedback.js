import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `

Please generate a personalized test based on the following parameters:
The reply will only be the test text, no explanation of it.
`;

const generateAction = async (req, res) => {
  const {
    userInputLevel,
    userInputType,
    userInputDomain,

    userInputText,
  } = req.body;
  console.log(`API: ${basePromptPrefix}
  ${req.body.userInputLevel}
  ${req.body.userInputType}
  

  ${req.body.userInputText}`);

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Behave like a test generation system" },
      {
        role: "user",
        content: `${basePromptPrefix}

        What kind of Test? : ${req.body.userInputText}


        Style:
        Difficulty Level:${req.body.userInputLevel},
        Type of Questions:${req.body.userInputType},
      

       
        `,
      },
    ],
  });
  console.log("baseCompletion: " + baseCompletion.data.choices[0].message);

  const basePromptOutput = baseCompletion.data.choices[0].message.content;
  console.log("basePromptOutPut: " + basePromptOutput);

  res.status(200).json({ output: basePromptOutput, status: 200 });
};

export default generateAction;
