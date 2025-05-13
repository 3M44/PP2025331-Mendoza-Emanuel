let currentPage = 1;  // Página actual de series

// Definir una función para cargar las series de una página específica
const loadSeriesPage = async (page) => {
    const seriesContainer = document.getElementById('series');
    seriesContainer.innerHTML = '';  // Limpiar cualquier contenido anterior

    try {
        // Realizar 6 peticiones a la API para obtener las series de la página correspondiente
        const promises = [];
        for (let i = (page - 1) * 6 + 1; i <= page * 6; i++) {
            promises.push(
                fetch(`https://api.tvmaze.com/shows/${i}`)
                    .then(response => response.json())
                    .then(data => {
                        // Crear una instancia de la clase Serie con los datos obtenidos
                        return new Serie(
                            data.id,
                            data.url,
                            data.name,
                            data.language,
                            data.genres,
                            data.image ? data.image.medium : 'default-image.jpg'  // Usar imagen por defecto si no está disponible
                        );
                    })
            );
        }

        // Esperar a que todas las peticiones terminen
        const series = await Promise.all(promises);

        // Insertar cada serie en el DOM utilizando el método createHTMLElement
        series.forEach(serie => {
            const serieElement = serie.createHTMLElement();
            seriesContainer.appendChild(serieElement);
        });
    } catch (error) {
        console.error('Error fetching series:', error);
    }
};

// Función para ir a la siguiente página
const paginaSiguiente = () => {
    currentPage++;  // Incrementar la página actual
    loadSeriesPage(currentPage);  // Cargar las series de la siguiente página
};

// Función para ir a la página anterior
const paginaAnterior = () => {
    if (currentPage > 1) {
        currentPage--;  // Decrementar la página actual
        loadSeriesPage(currentPage);  // Cargar las series de la página anterior
    }
};

// Asignar los métodos a los botones de navegación
document.addEventListener('DOMContentLoaded', () => {
    // Cargar las series de la primera página al cargar la página
    loadSeriesPage(currentPage);

    // Asignar eventos a los botones de anterior y siguiente
    document.getElementById('anterior').addEventListener('click', paginaAnterior);
    document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
});
