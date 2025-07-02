const carouselInner = document.getElementById('carouselInner');
const cantidad = 6;
const fondo = './img/fondo-poke.jpg';

for (let i = 1; i <= cantidad; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(res => res.json())
        .then(data => {
            const precioOriginal = Math.floor(Math.random() * 10000 + 1000);
            const descuento = Math.floor(precioOriginal * (Math.random() * 0.3 + 0.1));
            const precioNuevo = precioOriginal - descuento;
            
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            if (i === 1) slide.classList.add('active');
            slide.style.backgroundImage = `url(${fondo})`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';

            slide.innerHTML = `
                <div class="container h-100 d-flex align-items-center justify-content-center">
                    <div class="row w-100 align-items-center">
                        <div class="col-md-6 text-center">
                            <img src="${data.sprites.front_default}" alt="${data.name}" style="width: 200px;">
                        </div>
                        <div class="col-md-6 text-white text-center">
                            <h2 class="fw-bold">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                            <p class="fs-4 text-decoration-line-through text-danger">$${precioOriginal}</p>
                            <p class="fs-2 fw-bold text-success">$${precioNuevo}</p>
                        </div>
                    </div>
                </div>
            `;

            carouselInner.appendChild(slide);
        })
        .catch(err => console.error('Error al cargar el Pokémon:', err));
    }
