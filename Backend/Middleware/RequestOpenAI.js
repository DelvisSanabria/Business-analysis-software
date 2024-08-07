import openai from "openai";
import { config } from "dotenv";
import { model } from "mongoose";
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

  /* const prompt = `
  Generate a comprehensive report with clear sections addressing each point of the analysis. Each section should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.
  
  Company Analysis for ${companyInfo.name}
  
  Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.
  
  Company Information:
  
  Name: ${companyInfo.name}
  Field of Work: ${companyInfo.field}
  Country: ${companyInfo.country}
  City: ${companyInfo.city}
  Product and Services Description: ${companyInfo.description}
  Most Seller Product: ${companyInfo.mostSellerProduct}
  Most Seller Service: ${companyInfo.mostSellerService}
  Best Age Group: ${companyInfo.bestAgeGroup}
  Best Season: ${companyInfo.bestSeason}
  Company Size: ${companyInfo.companySize}
  Company Website: ${companyInfo.companyWebsite}
  Company Vision and Mission: ${companyInfo.companyVisionAndMission}
  Company Values: ${companyInfo.companyValues}
  Company Culture: ${companyInfo.companyCulture}
  Company History: ${companyInfo.companyHistory}
  Company Goals: ${companyInfo.companyGoals}
  Company Objectives: ${companyInfo.companyObjectives}
  Company Strengths: ${companyInfo.companyStrengths}
  
  Research and Analysis:
  
  1. Buyer Persona Analysis:
    Utilize online resources and best practices to develop detailed buyer personas for ${companyInfo.name}'s target audience. Consider demographics, psychographics, pain points, and buying behaviors. Provide an extensive explanation on how to gather this data, including specific methods and tools to use. Each section should be at least three paragraphs long.
  
  2. Market Research Insights:
    Leverage online data and industry reports to analyze the current market landscape for ${companyInfo.name}'s field. Identify key trends, growth potential, and any relevant regulations. Offer a detailed guide on how to conduct market research, including identifying reliable sources and analyzing the data. Each section should be at least three paragraphs long.
  
  3. Trend Identification:
    Analyze current and emerging trends relevant to ${companyInfo.name}'s industry. Explore how these trends could impact ${companyInfo.name}'s products, services, and overall strategy. Explain thoroughly how to monitor and identify trends, including tools and resources to use. Each section should be at least three paragraphs long.
  
  Marketing Strategy Development:
  
  4. Recommended Social Media Platforms:
    Based on the buyer persona analysis, identify the most appropriate social media platforms for reaching ${companyInfo.name}'s target audience. Research content types and best practices for each platform. Provide a detailed explanation on how to choose the right platforms and the types of content that perform well on each. Each section should be at least three paragraphs long.
  
  5. Content Strategy Development:
    Develop a content strategy that aligns with the buyer persona and identified social media platforms. Consider content formats (e.g., blog posts, infographics, videos) that resonate with the target audience and address their pain points. Offer an extensive guide on creating a content calendar and measuring content performance. Each section should be at least three paragraphs long.
  
  6. Project Requirements Specification (Optional - adjust based on your needs)
    Define specific project requirements for any upcoming marketing initiatives, including budgets, timelines, and deliverables. Provide detailed steps on how to set realistic project goals and manage resources efficiently. Each section should be at least three paragraphs long.
  
  Competitive Landscape:
  
  7. Competitor Analysis:
    Identify key competitors of ${companyInfo.name} in the market. Analyze their strengths, weaknesses, opportunities, and threats (SWOT analysis). Explain in detail how to gather competitive intelligence and perform a thorough SWOT analysis. Each section should be at least three paragraphs long.
  
  8. Audience Analysis:
    Analyze the overall audience for ${companyInfo.name}'s products and services. Consider demographics, interests, and online behavior patterns. Provide a comprehensive guide on how to segment and understand your audience effectively. Each section should be at least three paragraphs long.
  
  9. Advantages Over Competitors:
    Based on the competitor analysis, identify ${companyInfo.name}'s unique selling proposition (USP) and competitive advantages. Offer detailed steps on how to highlight and leverage these advantages in marketing efforts. Each section should be at least three paragraphs long.
  
  Performance Benchmarking:
  
  10. Benchmarking:
    Identify industry benchmarks for key performance indicators (KPIs) relevant to ${companyInfo.name}'s business (e.g., website traffic, conversion rates, social media engagement). Explain in detail how to benchmark performance, including tools and methods to use. Each section should be at least three paragraphs long.
  
  Public Relations and Customer Strategy:
  
  11. Public Relations Strategy:
    Develop a public relations strategy to enhance brand awareness and reputation for ${companyInfo.name}. Consider press releases, media relations, and influencer marketing opportunities. Provide a detailed guide on how to craft an effective PR strategy. Each section should be at least three paragraphs long.
  
  12. Customer Loyalty Strategy:
    Develop strategies to increase customer retention and loyalty for ${companyInfo.name}. Explore loyalty programs, customer service initiatives, and personalized marketing tactics. Offer extensive steps on how to implement these strategies effectively. Each section should be at least three paragraphs long.
  
  Pricing Strategy:
  
  13. Price Competitiveness Analysis:
    Analyze the pricing strategies of competitors and evaluate ${companyInfo.name}'s pricing model to ensure competitiveness in the market. Explain thoroughly how to conduct a pricing analysis and adjust pricing strategies accordingly. Each section should be at least three paragraphs long.
  `;   */

  const prompt1 = `
  Generate a comprehensive report on Buyer Persona Analysis for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.
  
  Company Analysis for ${companyInfo.name}
  
  Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.
  
  Company Information:
  
  Name: ${companyInfo.name}
  Field of Work: ${companyInfo.field}
  Country: ${companyInfo.country}
  City: ${companyInfo.city}
  Product and Services Description: ${companyInfo.description}
  Most Seller Product: ${companyInfo.mostSellerProduct}
  Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
  Best Age Group: ${companyInfo.bestAgeGroup}
  Best Season: ${companyInfo.bestSeason}
  Company Size: ${companyInfo.companySize}
  Company Website: ${companyInfo.companyWebsite}
  Company Vision and Mission: ${companyInfo.companyVisionAndMission}
  Company Values: ${companyInfo.companyValues}
  Company Culture: ${companyInfo.companyCulture}
  Company History: ${companyInfo.companyHistory}
  Company Goals: ${companyInfo.companyGoals}
  Company Objectives: ${companyInfo.companyObjectives}
  Company Strengths: ${companyInfo.companyStrengths}
  
  Research and Analysis:
  
  1. Buyer Persona Analysis:
    Utilize online resources and best practices to develop detailed buyer personas for ${companyInfo.name}'s target audience. Consider demographics, psychographics, pain points, and buying behaviors. Provide an extensive explanation on how to gather this data, including specific methods and tools to use. Each section should be at least three paragraphs long.
  `;
  const prompt2 = `
  Generate a comprehensive report on Market Research Insights for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.
  
  Company Analysis for ${companyInfo.name}
  
  Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.
  
  Company Information:
  
  Name: ${companyInfo.name}
  Field of Work: ${companyInfo.field}
  Country: ${companyInfo.country}
  City: ${companyInfo.city}
  Product and Services Description: ${companyInfo.description}
  Most Seller Product: ${companyInfo.mostSellerProduct}
  Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
  Best Age Group: ${companyInfo.bestAgeGroup}
  Best Season: ${companyInfo.bestSeason}
  Company Size: ${companyInfo.companySize}
  Company Website: ${companyInfo.companyWebsite}
  Company Vision and Mission: ${companyInfo.companyVisionAndMission}
  Company Values: ${companyInfo.companyValues}
  Company Culture: ${companyInfo.companyCulture}
  Company History: ${companyInfo.companyHistory}
  Company Goals: ${companyInfo.companyGoals}
  Company Objectives: ${companyInfo.companyObjectives}
  Company Strengths: ${companyInfo.companyStrengths}
  
  Research and Analysis:
  
  2. Market Research Insights:
    Leverage online data and industry reports to analyze the current market landscape for ${companyInfo.name}'s field. Identify key trends, growth potential, and any relevant regulations. Offer a detailed guide on how to conduct market research, including identifying reliable sources and analyzing the data. Each section should be at least three paragraphs long.
  `;
  const prompt3 = `
Generate a comprehensive report on Trend Identification for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Research and Analysis:

3. Trend Identification:
  Analyze current and emerging trends relevant to ${companyInfo.name}'s industry. Explore how these trends could impact ${companyInfo.name}'s products, services, and overall strategy. Explain thoroughly how to monitor and identify trends, including tools and resources to use. Each section should be at least three paragraphs long.
`;
const prompt4 = `
Generate a comprehensive report on Recommended Social Media Platforms for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Marketing Strategy Development:

4. Recommended Social Media Platforms:
  Based on the buyer persona analysis, identify the most appropriate social media platforms for reaching ${companyInfo.name}'s target audience. Research content types and best practices for each platform. Provide a detailed explanation on how to choose the right platforms and the types of content that perform well on each. Each section should be at least three paragraphs long.
`;
const prompt5 = `
Generate a comprehensive report on Content Strategy Development for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Marketing Strategy Development:

5. Content Strategy Development:
  Develop a content strategy that aligns with the buyer persona and identified social media platforms. Consider content formats (e.g., blog posts, infographics, videos) that resonate with the target audience and address their pain points. Offer an extensive guide on creating a content calendar and measuring content performance. Each section should be at least three paragraphs long.
`;
const prompt6 = `
Generate a comprehensive report on Project Requirements Specification for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Marketing Strategy Development:

6. Project Requirements Specification:
  Define specific project requirements for any upcoming marketing initiatives, including budgets, timelines, and deliverables. Provide detailed steps on how to set realistic project goals and manage resources efficiently. Each section should be at least three paragraphs long.
`;
const prompt7 = `
Generate a comprehensive report on Competitor Analysis for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Competitive Landscape:

7. Competitor Analysis:
  Identify key competitors of ${companyInfo.name} in the market. Analyze their strengths, weaknesses, opportunities, and threats (SWOT analysis). Explain in detail how to gather competitive intelligence and perform a thorough SWOT analysis. Each section should be at least three paragraphs long.
`;
const prompt8 = `
Generate a comprehensive report on Audience Analysis for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Competitive Landscape:

8. Audience Analysis:
  Analyze the overall audience for ${companyInfo.name}'s products and services. Consider demographics, interests, and online behavior patterns. Provide a comprehensive guide on how to segment and understand your audience effectively. Each section should be at least three paragraphs long.
`;
const prompt9 = `
Generate a comprehensive report on Advantages Over Competitors for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
  Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
  Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Competitive Landscape:

9. Advantages Over Competitors:
  Based on the competitor analysis, identify ${companyInfo.name}'s unique selling proposition (USP) and competitive advantages. Offer detailed steps on how to highlight and leverage these advantages in marketing efforts. Each section should be at least three paragraphs long.
`;
const prompt10 = `
Generate a comprehensive report on Benchmarking for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Performance Benchmarking:

10. Benchmarking:
  Identify industry benchmarks for key performance indicators (KPIs) relevant to ${companyInfo.name}'s business (e.g., website traffic, conversion rates, social media engagement). Explain in detail how to benchmark performance, including tools and methods to use. Each section should be at least three paragraphs long.
`;
const prompt11 = `
Generate a comprehensive report on Public Relations Strategy for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Public Relations and Customer Strategy:

11. Public Relations Strategy:
  Develop a public relations strategy to enhance brand awareness and reputation for ${companyInfo.name}. Consider press releases, media relations, and influencer marketing opportunities. Provide a detailed guide on how to craft an effective PR strategy. Each section should be at least three paragraphs long.
`;
const prompt12 = `
Generate a comprehensive report on Customer Loyalty Strategy for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Public Relations and Customer Strategy:

12. Customer Loyalty Strategy:
  Develop strategies to increase customer retention and loyalty for ${companyInfo.name}. Explore loyalty programs, customer service initiatives, and personalized marketing tactics. Offer extensive steps on how to implement these strategies effectively. Each section should be at least three paragraphs long.
`;
const prompt13 = `
Generate a comprehensive report on Price Competitiveness Analysis for ${companyInfo.name}. The report should be at least three paragraphs long, providing insightful details and relevant recommendations. Additionally, feel free to search the internet for information about ${companyInfo.name} to gather data and insights.

Company Analysis for ${companyInfo.name}

Objective: Conduct a comprehensive analysis of ${companyInfo.name} to inform marketing, sales, and overall business strategy.

Company Information:

Name: ${companyInfo.name}
Field of Work: ${companyInfo.field}
Country: ${companyInfo.country}
City: ${companyInfo.city}
Product and Services Description: ${companyInfo.description}
Most Seller Product: ${companyInfo.mostSellerProduct}
Most Seller Service: ${companyInfo.mostSellerService}
Most Seller Service Price: ${companyInfo.mostSellerServicePrice}
Most Seller Product Price: ${companyInfo.mostSellerProductPrice}
Best Age Group: ${companyInfo.bestAgeGroup}
Best Season: ${companyInfo.bestSeason}
Company Size: ${companyInfo.companySize}
Company Website: ${companyInfo.companyWebsite}
Company Vision and Mission: ${companyInfo.companyVisionAndMission}
Company Values: ${companyInfo.companyValues}
Company Culture: ${companyInfo.companyCulture}
Company History: ${companyInfo.companyHistory}
Company Goals: ${companyInfo.companyGoals}
Company Objectives: ${companyInfo.companyObjectives}
Company Strengths: ${companyInfo.companyStrengths}

Pricing Strategy:

13. Price Competitiveness Analysis:
  Analyze the pricing strategies of competitors and evaluate ${companyInfo.name}'s pricing model to ensure competitiveness in the market. Explain thoroughly how to conduct a pricing analysis and adjust pricing strategies accordingly. Each section should be at least three paragraphs long.
`;


  try {
    const responses = await Promise.all([
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt1 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt2 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt3 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt4 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt5 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt6 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt7 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt8 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt9 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt10 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt11 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt12 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
      openaiClient.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt13 }],
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    ]);
    
    const analysisData = responses.map((response, index) => ({
      prompt: `Prompt ${index + 1}`,
      content: response.choices[0].message.content
    }));

    console.log(analysisData);
    return analysisData;

  } catch (error) {
    console.error("Error:", error);
  }
}

const companyInfo = {
  name: "Lexpin",
  field: "Technology and E-Learning",
  country: "Venezuela",
  city: "Capital District",
  description: "We are a company dedicated to live online teaching of web programming and graphic design, our courses have a long duration of 9 months on average and we have a badge that is a personal advisor for each course with which students can review and clarify doubts at all times.",
  mostSellerProduct: "Web Development Full stack Course",
  mostSellerService:"Web Development Full stack Course",
  mostSellerProductPrice: "$75 per month",
  mostSellerServicePrice: "$75 per month",
  bestAgeGroup: "25-28",
  bestSeason: "Winter",
  companySize:"9 employees",
  companyWebsite: "https://lexpin.online",
  companyVisionAndMission:"Our mission is to prepare highly competitive personnel for the labor market who are at the forefront.Our vision is that anyone with enough discipline can become a great web developer.",
  companyValues:"Our values ​​are temperance, perseverance, camaraderie, collaboration and learning.",
  companyStrengths:"The company has a strong commitment to innovation, creativity, and innovation",
  companyCulture:"The culture is a culture of practical teaching, with a clear focus on learning before grading.",
  companyHistory:"Lexpin was born from the need seen by our founder in computer science graduates who did not really come out of university training prepared. It is a path to truly prepare developers",
  companyGoals:"To prepare highly competitive personnel for the labor market who are at the forefront.Our vision is that anyone with enough discipline can become a great web developer.",
  companyObjectives:"Our main objective as a company is to dominate the market in our fields in order to expand lexpin internationally.",
  companyStrengths:"Our main strength is our attention to the student, he is never alone with the challenges."

};

/* generateAnalysis(companyInfo); */
