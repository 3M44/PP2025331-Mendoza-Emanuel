class Serie {
  constructor(id, url, name, language, genres, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.image = image;
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${this.image}" class="card-img-top" alt="${this.name}" />
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">${this.language}</p>
        <button class="btn-primary" onclick="guardarSerie(${this.id})">Guardar</button>
      </div>
    `;
    return div;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const seriesContainer = document.getElementById('series');

  const seriesData = [
    new Serie(1, 'http://example.com/serie1', 'Serie 1', 'Español', ['Acción'], 'https://via.placeholder.com/150'),
    new Serie(2, 'http://example.com/serie2', 'Serie 2', 'Inglés', ['Comedia'], 'https://via.placeholder.com/150'),
  ];

  seriesData.forEach(serie => {
    const serieElement = serie.createHTMLElement();
    seriesContainer.appendChild(serieElement);
  });
});

function guardarSerie(id) {
  const seriesData = [
    new Serie(1, 'http://example.com/serie1', 'Serie 1', 'Español', ['Acción'], 'https://via.placeholder.com/150'),
    new Serie(2, 'http://example.com/serie2', 'Serie 2', 'Inglés', ['Comedia'], 'https://via.placeholder.com/150'),
  ];

  const serie = seriesData.find(s => s.id === id);
  if (serie) {
    let savedSeries = JSON.parse(localStorage.getItem('savedSeries')) || [];
    const exists = savedSeries.some(s => s.id === serie.id);
    if (!exists) {
      savedSeries.push(serie);
      localStorage.setItem('savedSeries', JSON.stringify(savedSeries));
      alert('Serie guardada exitosamente');
    } else {
      alert('La serie ya está guardada');
    }
  }
}