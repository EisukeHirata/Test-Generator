import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `

Rewrite the following text  in the following style. 
The reply will only be the rewritten text, no explanation of it.
If you can't find the text to be rewritten, look  for it again and again
`;

const generateAction = async (req, res) => {
  const {
    userInputAudience,
    userInputFormality,
    userInputDomain,
    userInputVolume,
    userInputLanguage,
    userInputSimple,
    userInputCompelling,
    userInputCondition,
    userInputText,
  } = req.body;
  console.log(`API: ${basePromptPrefix}
  ${req.body.userInputAudience}
  ${req.body.userInputFormality}
  ${req.body.userInputDomain}
  ${req.body.userInputVolume}
  ${req.body.userInputLanguage}
  ${req.body.userInputSimple}
  ${req.body.userInputCompelling}
  ${req.body.userInputCondition}
  ${req.body.userInputText}`);

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Behave like a writting support system" },
      {
        role: "user",
        content: `${basePromptPrefix}

        Passage: ${req.body.userInputText}


        Writing style:
        Knowledge level of the intended audience of the rewritten text:${req.body.userInputAudience},
        Formality of the rewritten text:${req.body.userInputFormality},
        Who you are going to rewrite the text as:${req.body.userInputDomain},
        Volume of the rewritten text:${req.body.userInputVolume},
        Language of the rewritten text:${req.body.userInputLanguage},
        Simplicity of the rewritten text:${req.body.userInputSimple},
        Compelling power of the rewritten text:${req.body.userInputCompelling},
      

       
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
