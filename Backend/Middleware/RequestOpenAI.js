import openai from "openai";
import { config } from "dotenv";
config({ path: '../Config/.env' });

const OpenAI = openai;

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};


const openaiClient = new OpenAI(configuration);

export const generateAnalysis = async (companyInfo) => {
  const prompt = `
  Based on the following company information, provide a highly detailed and exhaustive analysis for each of the specified fields. Where necessary, search the internet to provide the most accurate and up-to-date information.
  
  Company Name: ${companyInfo.name}
  Field of Work: ${companyInfo.field}
  Country: ${companyInfo.country}
  City: ${companyInfo.city}
  Product and Services Description: ${companyInfo.description}
  
  Provide your evaluation based on the following criteria:
    - Relevance
    - Clarity
    - Exhaustiveness
  
  Ensure that each analysis is thorough, with comprehensive details and relevant insights. Each section should be at least one paragraph long.
  
  Analysis required:
  1. Buyer Persona Analysis
  2. Market Research Insights
  3. Trend Identification
  4. Recommended Social Media Platforms
  5. Content Strategy Development
  6. Project Requirements Specification
  7. Competitor Analysis
  8. Audience Analysis
  9. Advantages Over Competitors
  10. Benchmarking
  11. Public Relations Strategy
  12. Customer Loyalty Strategy
  13. Price Competitiveness Analysis
  `;

  try {
    const response = await
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        n: 1,
        stop: null,
        temperature: 0.5,
      })

      const analysisData = response.choices[0].message.content;
      console.log(analysisData);
      return analysisData;

  } catch (error) {
    console.error("Error:", error);
  }
}

/* // Example company info
const companyInfo = {
  name: "Lexpin",
  field: "Technology and E-Learning",
  country: "Venezuela",
  city: "Capital District",
  description: "We are a company dedicated to live online teaching of web programming and graphic design, our courses have a long duration of 9 months on average and we have a badge that is a personal advisor for each course with which students can review and clarify doubts at all times."
};

generateAnalysis(companyInfo); */
