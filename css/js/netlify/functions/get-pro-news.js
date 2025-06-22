exports.handler = async function(event, context) {
    const NEWS_API_KEY = '2f9d3eda984a465aa80debdc2575e23b'; // Sua chave da NewsAPI
    const GEMINI_API_KEY = 'SUA_CHAVE_GEMINI_AQUI'; // VOCÊ PRECISARÁ DE UMA CHAVE DA IA DO GOOGLE

    const newsUrl = `https://newsapi.org/v2/everything?q="futebol brasileiro"&language=pt&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`;

    try {
        // 1. Pega as notícias brutas
        const newsResponse = await fetch(newsUrl);
        const newsData = await newsResponse.json();

        if (newsData.status !== 'ok' || newsData.articles.length === 0) {
            throw new Error('Não foi possível buscar notícias da fonte.');
        }

        // 2. Prepara as notícias para a IA
        const rawText = newsData.articles.map(article => `NOTÍCIA: ${article.title}. ${article.description}`).join('\n---\n');
        const prompt = `Você é um editor de notícias esportivas brasileiro com um estilo de escrita elegante e persuasivo. Analise o bloco de textos a seguir, que contém várias notícias separadas por '---'. Para cada notícia, gere um objeto JSON com os seguintes campos: "title" (um título curto e chamativo com no máximo 10 palavras), "summary" (um resumo elegante da notícia em um parágrafo), "emoji" (um único emoji que represente o tema), e "main_team" (o nome do principal time brasileiro mencionado, como "Flamengo", "Palmeiras", etc., ou "null" se não houver um). Retorne uma lista de objetos JSON. Texto: ${rawText}`;

        // 3. Pede para a IA reescrever
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const geminiData = await geminiResponse.json();

        // Extrai e limpa a resposta da IA
        const iaResponseText = geminiData.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
        let enhancedArticles = JSON.parse(iaResponseText);

        // Adiciona data e hora a cada artigo
        enhancedArticles.forEach(article => {
            article.timestamp = new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        });

        // 4. Retorna as notícias reescritas
        return {
            statusCode: 200,
            body: JSON.stringify(enhancedArticles)
        };

    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Falha no processamento da IA.' }) };
    }
};
