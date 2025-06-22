const teamShields = {
    // Mapeamento de nomes de times para URL dos escudos
    "Flamengo": "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
    "Palmeiras": "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
    "Corinthians": "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
    "São Paulo": "https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png",
    "Santos": "https://logodetimes.com/times/santos/logo-santos-256.png",
    "Grêmio": "https://logodetimes.com/times/gremio/logo-gremio-256.png",
    "Internacional": "https://logodetimes.com/times/internacional/logo-internacional-256.png",
    "Atlético Mineiro": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
    "Cruzeiro": "https://logodetimes.com/times/cruzeiro/logo-cruzeiro-256.png",
    "Vasco da Gama": "https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-256.png",
    "Botafogo": "https://logodetimes.com/times/botafogo/logo-botafogo-256.png",
    "Fluminense": "https://logodetimes.com/times/fluminense/logo-fluminense-256.png",
    // Adicionar outros times conforme necessário
};

async function buscarNoticias() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `<p>IA está gerando as notícias mais quentes...</p>`;

    const url = `/.netlify/functions/get-pro-news`;

    try {
        const response = await fetch(url);
        const articles = await response.json();

        newsContainer.innerHTML = ''; // Limpa a mensagem

        articles.forEach(article => {
            // Encontra o escudo correspondente, ou usa um padrão
            const shieldUrl = teamShields[article.main_team] || 'https://logodetimes.com/wp-content/uploads/cbf.png';

            const articleCard = `
                <div class="news-card">
                    <div class="card-header">
                        <img src="${shieldUrl}" alt="Escudo do <span class="math-inline">\{article\.main\_team \|\| 'Time'\}" class\="team\-shield"\>
