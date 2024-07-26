const OpenAI = require("openai");

const configuration = {
  apiKey: "sk-proj-0MPMFMdMZs8QdYj7ZaewT3BlbkFJ8O7kPsamTCvs8iIW3TFv",
};

const openai = new OpenAI(configuration);

async function RequestOpenAI() {
  try {
    const completion = await openai.chat.completions.create({
      model:"gpt-4o",
      messages:[
        {"role": "user", "content": "Dime 5 cosas interesantes de colombia"}
      ],
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}