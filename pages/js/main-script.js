async function buscarNoticias() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return; 
    const topic = document.body.dataset.topic || 'futebol';
    newsContainer.innerHTML = `<p class="text-center col-span-full">Carregando notícias sobre ${topic}...</p>`;
    const url = `/.netlify/functions/get-news?topic=${encodeURIComponent(topic)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'ok') {
            newsContainer.innerHTML = '';
            const articles = data.articles.filter(article => article.urlToImage).slice(0, 9);
            if (articles.length === 0) {
                newsContainer.innerHTML = '<p class="text-center col-span-full">Não encontramos notícias sobre este tópico.</p>';
                return;
            }
            articles.forEach(article => {
                const articleCard = `
                    <a href="<span class="math-inline">\{article\.url\}" target\="\_blank" rel\="noopener noreferrer" class\="card hover\:shadow\-accent transition\-all duration\-300 group cursor\-pointer block"\>
