import openai from "openai";
import { config } from "dotenv";
config({ path: '../Config/.env' });

const OpenAI = openai;

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};


const openaiClient = new OpenAI(configuration);

export const generateAnalysis = async (companyInfo) => {
  /* const prompt = `
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
  `; */
const prompt = `
Generate a comprehensive report with clear sections addressing each point of the analysis. Each section should be at least one paragraph long, providing insightful details and relevant recommendations.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}

Research and Analysis:

1.Buyer Persona Analysis:
  Utilize online resources and best practices to develop detailed buyer personas for ${companyInfo.name}'s target audience. Consider demographics, psychographics, pain points, and buying behaviors.

2.Market Research Insights:
  Leverage online data and industry reports to analyze the current market landscape for ${companyInfo.name}'s field. Identify key trends, growth potential, and any relevant regulations.

3.Trend Identification:
  Analyze current and emerging trends relevant to ${companyInfo.name}'s industry. Explore how these trends could impact ${companyInfo.name}'s products, services, and overall strategy.

Marketing Strategy Development:

4.Recommended Social Media Platforms:
  Based on the buyer persona analysis, identify the most appropriate social media platforms for reaching ${companyInfo.name}'s target audience. Research content types and best practices for each platform.

5.Content Strategy Development:
  Develop a content strategy that aligns with the buyer persona and identified social media platforms. Consider content formats (e.g., blog posts, infographics, videos) that resonate with the target audience and address their pain points.

6.Project Requirements Specification (Optional - adjust based on your needs)
  Define specific project requirements for any upcoming marketing initiatives, including budgets, timelines, and deliverables.

Competitive Landscape:

7.Competitor Analysis:
  Identify key competitors of ${companyInfo.name} in the market. Analyze their strengths, weaknesses, opportunities, and threats (SWOT analysis). 

8.Audience Analysis: (Combine with Buyer Persona Analysis if desired)
  Analyze the overall audience for ${companyInfo.name}'s products and services. Consider demographics, interests, and online behavior patterns. 

9.Advantages Over Competitors:
  Based on the competitor analysis, identify ${companyInfo.name}'s unique selling proposition (USP) and competitive advantages.

Performance Benchmarking:

10.Benchmarking:
  Identify industry benchmarks for key performance indicators (KPIs) relevant to ${companyInfo.name}'s business (e.g., website traffic, conversion rates, social media engagement).

Public Relations and Customer Strategy:

11.Public Relations Strategy:
  Develop a public relations strategy to enhance brand awareness and reputation for ${companyInfo.name}. Consider press releases, media relations, and influencer marketing opportunities.

12.Customer Loyalty Strategy:
  Develop strategies to increase customer retention and loyalty for ${companyInfo.name}. Explore loyalty programs, customer service initiatives, and personalized marketing tactics.

Pricing Strategy:

13.Price Competitiveness Analysis:
  Analyze the pricing strategies of competitors and evaluate ${companyInfo.name}'s pricing model to ensure competitiveness in the market.
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

/* const companyInfo = {
  name: "Lexpin",
  field: "Technology and E-Learning",
  country: "Venezuela",
  city: "Capital District",
  description: "We are a company dedicated to live online teaching of web programming and graphic design, our courses have a long duration of 9 months on average and we have a badge that is a personal advisor for each course with which students can review and clarify doubts at all times."
};

generateAnalysis(companyInfo); */
