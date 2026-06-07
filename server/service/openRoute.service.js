import axios from 'axios';



export const askAi = async (messages) => {
    try {
        if(!messages || messages.length === 0||!Array.isArray(messages)) {
            throw new Error('No messages provided');
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if(!apiKey) {
            throw new Error('OPENROUTER_API_KEY is not set in environment variables');
        }

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
        {
            "model": "openai/gpt-oss-20b:free",
            "messages": messages
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const content = response?.data?.choices?.[0]?.message?.content;
        if (!content|| !content.trim()) {
            throw new Error('No valid response from AI');
        }
        return content;
    } catch (error) {
        console.error("open router API error:", error.response?.data||error.message);
        throw new Error('Failed to get response from open router API');
    }
};