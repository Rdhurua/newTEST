const axios = require('axios');

exports.handler = async function (event, context) {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                apiKey: import.meta.env.VITE_API_KEY,  // Add your NewsAPI key here
                q: 'agriculture',
                language: 'en',
            }
        });

        // Return the filtered articles (up to 5)
        const articles = response.data.articles
            .filter(article => article.description && !article.description.includes('[Removed]'))
            .slice(0, 5);

        return {
            statusCode: 200,
            body: JSON.stringify({ articles }),
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching news.' }),
        };
    }
};
