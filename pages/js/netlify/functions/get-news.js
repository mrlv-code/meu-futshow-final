exports.handler = async function(event, context) {
    const NEWS_API_KEY = '2f9d3eda984a465aa80debdc2575e23b';
    const topic = event.queryStringParameters.topic || 'futebol';
    const query = encodeURIComponent(topic);
    const API_URL = `https://newsapi.org/v2/everything?q=<span class="math-inline">\{query\}&language\=pt&sortBy\=publishedAt&apiKey\=</span>{NEWS_API_KEY}`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falha ao buscar notícias.' })
        };
    }
};
