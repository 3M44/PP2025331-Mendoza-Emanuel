document.addEventListener('DOMContentLoaded', () => {
    let paginaInicio = 0;

    const cargarSeries = async () => {
        const seriesContenedor = document.getElementById('series');
        seriesContenedor.innerHTML = '';
        
        try {
            const promesas = [];
            const inicio = paginaInicio + 1;
            const fin = paginaInicio + 6;

            for (let i = inicio; i <= fin; i++) {
                promesas.push(fetch(`https://api.tvmaze.com/shows/${i}`)
                    .then(response => response.json()));
            }

            const seriesData = await Promise.all(promesas);

            const series = seriesData.map(data => new Serie(
                data.id,
                data.url,
                data.name,
                data.language,
                data.genres,
                data.image ? data.image.medium : 'default-image.jpg' 
            ));

            series.forEach(serie => {
                const serieElementos = serie.createHTMLElement();
                seriesContenedor.appendChild(serieElementos);
            });

            if (paginaInicio == 0){
                anterior.disabled = true;
            } else {
                anterior.disabled = false;
            }


        } catch (error) {
            console.error('Error :', error);
        }
    };

    const paginaSiguiente = () => {
        paginaInicio += 6;
        cargarSeries();
    };

    const paginaAnterior = () => {
        if (paginaInicio > 0) {
            paginaInicio -= 6;
            cargarSeries();
        }
    }

    document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
    document.getElementById('anterior').addEventListener('click', paginaAnterior);

    cargarSeries();
});
