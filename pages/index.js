import Head from "next/head";
import { useState, useEffect } from "react";
import { inject } from "@vercel/analytics";

inject();

const Home = () => {
  const [formData, setFormData] = useState({
    userInputLevel: "",
    userInputType: "",
    userInputText: "",
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [test, setTest] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted1, setMounted1] = useState(false);
  const [mounted2, setMounted2] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInputAnswer: formData.userInputLevel,
        userInputType: formData.userInputType,

        userInputText: formData.userInputText,
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output);

    setTest(`${output}`);
    setIsGenerating(false);
  };

  const callFeedbackEndpoint = async () => {
    // setIsGenerating(true);

    console.log("Feedback Calling OpenAI...");

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInputAnswer: userAnswer,
        test: test,
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output);

    setFeedback(`${output}`);
    // setIsGenerating(false);
  };

  const onFormSubmitTest = (event) => {
    event.preventDefault();
    const userInputLevel = event.target.userInputLevel.value;
    const userInputType = event.target.userInputType.value;

    const userInputText = event.target.userInputText.value;

    const newFormData = {
      ...formData,
      userInputLevel,
      userInputType,

      userInputText,
    };
    console.log("TEXT " + newFormData.userInputText);
    setFormData(newFormData);
    console.log("TEXT1 " + formData.userInputText);

    // callGenerateEndpoint();
  };
  const onFormSubmitAnswer = (event) => {
    event.preventDefault();
    const userInputAnswer = event.target.userInputAnswer.value;

    console.log("Answer TEXT :" + userInputAnswer);
    setUserAnswer(userInputAnswer);
    console.log("AnswerTEXT1 :" + userAnswer);
    // callGenerateEndpoint();
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(test);
  };

  useEffect(() => {
    if (mounted1) {
      callGenerateEndpoint();
    } else {
      setMounted1(true);
    }
  }, [formData]);

  useEffect(() => {
    if (mounted2) {
      callFeedbackEndpoint();
    } else {
      setMounted2(true);
    }
  }, [userAnswer]);

  return (
    <div className="root">
      <Head>
        <title>Tiimo</title>
      </Head>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="p-12">
          <div className="header">
            <button
              id="theme-toggle"
              type="button"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                class="hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                class="hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="header mt-10">
            <div className="header-title">
              <h1 className="text-5xl">Tiimo</h1>
            </div>
            <div className="header-subtitle">
              <p className="text-xl">AI Assistant for Test Prep</p>
            </div>
          </div>

          <form onSubmit={onFormSubmitTest}>
            <div className="mt-8">
              <label
                for="message"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                What kind of Test?
              </label>
              <textarea
                id="InputText"
                rows="4"
                name="userInputText"
                class="h-[320px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your text here..."
              ></textarea>
            </div>
            <div className="md:flex items-center my-3">
              <div className="mr-4 w-48">
                <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
                  Level:
                </h3>
              </div>
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-level-general"
                      type="radio"
                      value="Beginner"
                      name="userInputLevel"
                      defaultChecked
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-level-general"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Beginner{" "}
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-level-knowledgeable"
                      type="radio"
                      value="Intermediate"
                      name="userInputLevel"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-level-knowledgeable"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Intermediate
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-level-expert"
                      type="radio"
                      value="Advanced"
                      name="userInputLevel"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-level-expert"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Advanced
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="md:flex items-center my-2">
              <div className="mr-4 w-48">
                <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
                  Type:
                </h3>
              </div>
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-type-informal"
                      type="radio"
                      value="Multiple Choice"
                      name="userInputType"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-type-informal"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Multiple Choice{" "}
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-type-natural"
                      type="radio"
                      value="Short Answer"
                      name="userInputType"
                      defaultChecked
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-type-natural"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Short Answer
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-type-formal"
                      type="radio"
                      value="Essay"
                      name="userInputType"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="horizontal-list-radio-type-formal"
                      class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Essay
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="my-4 text-right
          "
            >
              <button
                type="submit"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Generate Test
              </button>
            </div>
          </form>
          {test && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Your Test</h3>
                </div>
              </div>
              <div className="my-4">
                <textarea
                  class="h-[320px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="text-to-copy"
                  rows="6"
                  value={test}
                  onChange={(event) => setTest(event.target.value)}
                ></textarea>
                {/*<div className="my-4 text-right">
                  <button
                    type="button"
                    class="  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
          </div>*/}
              </div>
              <form onSubmit={onFormSubmitAnswer}>
                <div className="mt-8">
                  <label
                    for="message"
                    class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Your Answer
                  </label>
                  <textarea
                    id="InputAnswer"
                    rows="4"
                    name="userInputAnswer"
                    class="h-[320px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your answer here..."
                  ></textarea>
                </div>

                <div
                  className="my-4 text-right
          "
                >
                  <button
                    type="submit"
                    class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Generate Feedback
                  </button>
                </div>
              </form>
              {feedback && (
                <div>
                  <label
                    for="message"
                    class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Feedback
                  </label>
                  <div class="block p-2.5 pb-10 w-full text-sm text-gray-900">
                    {feedback}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
