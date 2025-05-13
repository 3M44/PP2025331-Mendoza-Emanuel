document.addEventListener('DOMContentLoaded', () => {
    const loadSeries = async () => {
        const seriesContainer = document.getElementById('series');
        seriesContainer.innerHTML = '';
        try {
            const promises = [];
            for (let i = 1; i <= 6; i++) {
                promises.push(fetch(`https://api.tvmaze.com/shows/${i}`).then(response => response.json()));
            }

            const seriesData = await Promise.all(promises);

            const series = seriesData.map(data => new Serie(
                data.id,
                data.url,
                data.name,
                data.language,
                data.genres,
                data.image ? data.image.medium : 'default-image.jpg' 
            ));

            
            series.forEach(serie => {
                const serieElement = serie.createHTMLElement();
                seriesContainer.appendChild(serieElement);
            });
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    };
    loadSeries();
});