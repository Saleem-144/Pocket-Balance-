import Groq from 'groq-sdk';
import { FinancialData, BudgetAdvice } from '@/types';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const aiService = {
  getBudgetAdvice: async (financialData: FinancialData): Promise<BudgetAdvice> => {
    try {
      const prompt = `
        Analyze the following financial data and provide personalized budget advice:
        
        Total Income: PKR ${financialData.totalIncome.toLocaleString()}
        Total Payments (Essential): PKR ${financialData.totalPayments.toLocaleString()}
        Total Personal Spending: PKR ${financialData.totalPersonal.toLocaleString()}
        Total Savings: PKR ${financialData.totalSavings.toLocaleString()}
        Remaining Balance: PKR ${financialData.remainingBalance.toLocaleString()}
        
        Number of transactions: ${financialData.transactions.length}
        
        Please provide:
        1. A brief assessment of the financial health
        2. 3-5 specific actionable suggestions for improvement
        3. Risk level assessment (low/medium/high)
        
        Format your response as JSON with the following structure:
        {
          "advice": "Your assessment here",
          "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
          "riskLevel": "low|medium|high"
        }
      `;

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response from AI');
      }

      // Try to parse JSON response
      try {
        const parsed = JSON.parse(response);
        return {
          advice: parsed.advice || 'Unable to generate advice at this time.',
          suggestions: parsed.suggestions || ['Review your spending patterns', 'Consider increasing savings'],
          riskLevel: parsed.riskLevel || 'medium',
        };
      } catch {
        // Fallback if JSON parsing fails
        return {
          advice: response.substring(0, 200) + '...',
          suggestions: [
            'Review your spending patterns',
            'Consider increasing your savings rate',
            'Track expenses more closely',
            'Set up automatic savings',
          ],
          riskLevel: 'medium',
        };
      }
    } catch (error) {
      console.error('Error getting budget advice:', error);
      return {
        advice: 'Unable to generate AI advice at this time. Please check your connection and try again.',
        suggestions: [
          'Review your spending patterns',
          'Consider increasing your savings rate',
          'Track expenses more closely',
          'Set up automatic savings',
        ],
        riskLevel: 'medium',
      };
    }
  },
};
