document.addEventListener('DOMContentLoaded', () => {
    mostrarBotonGuardar = false;
    const contenedor = document.getElementById('seriesGuardadas');
    const ordenar = document.getElementById('ordenar');
    const siguiente = document.getElementById('siguiente');
    const anterior = document.getElementById('anterior');
    const seriesGuardadas = JSON.parse(localStorage.getItem('seriesGuardadas'));
    let seriesMostradas = [...seriesGuardadas];
    let paginaInicio = 0;

    const renderizarPagina = () => {
        contenedor.innerHTML = '';
        const inicio = paginaInicio;
        const fin = paginaInicio + 6;

        seriesMostradas.slice(inicio, fin).forEach(data => {
            const jsonString = JSON.stringify(data);
            const serie = Serie.createFromJsonString(jsonString);
            const serieElement = serie.createHTMLElement(mostrarBotonGuardar);
            contenedor.appendChild(serieElement);
        });

        anterior.disabled = paginaInicio === 0;
        siguiente.disabled = paginaInicio + 6 >= seriesMostradas.length;
    };

    const ordenarPorNombre = () => {
        seriesMostradas.sort((a, b) => a.name.localeCompare(b.name));
    };

    const ordenarPorIdioma = () => {
        seriesMostradas.sort((a, b) => a.language.localeCompare(b.language));
    };

    const paginaSiguiente = () => {
        if (paginaInicio + 6 < seriesMostradas.length) {
            paginaInicio += 6;
            renderizarPagina();
        }
    };

    const paginaAnterior = () => {
        if (paginaInicio - 6 >= 0) {
            paginaInicio -= 6;
            renderizarPagina();
        }
    };

    ordenar.addEventListener('change', () => {
        paginaInicio = 0;
        switch (ordenar.value) {
            case 'nombre':
                ordenarPorNombre();
                break;
            case 'lenguaje':
                ordenarPorIdioma();
                break;
        }
        renderizarPagina();
    });

    siguiente.addEventListener('click', paginaSiguiente);
    anterior.addEventListener('click', paginaAnterior);

    if (seriesMostradas.length == 0) {
        contenedor.innerHTML = '<p>No hay series guardadas.</p>';
        siguiente.disabled = true;
        anterior.disabled = true;
    } else {
        renderizarPagina();
    }
});
