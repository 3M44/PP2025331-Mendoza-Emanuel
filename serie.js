class Serie {
    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    static guardarSerie(serie) {
        let series = JSON.parse(localStorage.getItem('seriesGuardadas'));
        if (!series.some(s => s.id === serie.id)) {
            series.push(serie);
            localStorage.setItem('seriesGuardadas', JSON.stringify(series));
            alert('Serie guardada correctamente.');
        } else {
            alert('Esta serie ya está guardada.');
        }
    }

    toJsonString(){
        return JSON.stringify({
            id: this.id,
            url: this.url,
            name: this.name,
            language: this.language,
            genres: this.genres,
            image: this.image
        });
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    createHTMLElement(mostrarBoton = true) {
        const SerieDiv = document.createElement('div');
        SerieDiv.className = 'serie';

        const Link = document.createElement('a');
        Link.href = this.url;
        Link.target = '_blank';

        const Imagen = document.createElement('img');
        Imagen.src = this.image;
        Imagen.alt = this.name;

        Link.appendChild(Imagen);

        const Nombre = document.createElement('h2');
        Nombre.textContent = this.name;

        const Lenguaje = document.createElement('p');
        Lenguaje.textContent = `Language: ${this.language}`;

        const Genero = document.createElement('p');
        Genero.textContent = `Generos: ${this.genres.join(', ')}`;

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'guardar';
        guardarBtn.addEventListener('click', () => Serie.guardarSerie(this));
        
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'eliminar';
        eliminarBtn.addEventListener('click', () => Serie.eliminarSerie(this));

        SerieDiv.appendChild(Link);
        SerieDiv.appendChild(Nombre);
        SerieDiv.appendChild(Lenguaje);
        SerieDiv.appendChild(Genero);

        if (mostrarBoton) {
            SerieDiv.appendChild(guardarBtn);
        } else {
            SerieDiv.appendChild(eliminarBtn);
        }

        return SerieDiv;
    }

    static eliminarSerie(serie) {
        let series = JSON.parse(localStorage.getItem('seriesGuardadas'));
        series = series.filter(s => s.id !== serie.id);
        localStorage.setItem('seriesGuardadas', JSON.stringify(series));
        alert('Serie eliminada correctamente.');
        location.reload();
    }
}
