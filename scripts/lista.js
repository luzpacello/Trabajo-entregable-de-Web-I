document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('listaPokemon');
	fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
		.then(response => response.json())
		.then(data => {
			data.results.forEach(pokemon => {
				fetch(pokemon.url)
					.then(resp => resp.json())
					.then(detail => {
						const price = (Math.random() * 10000 + 1000).toFixed(0);
						const stock = Math.floor(Math.random() * 50 + 10);
						const col = document.createElement('div');
						col.className = 'col';
						col.innerHTML = `
							<div class="pokemon-card">
								<img src="${detail.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
								<h5>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
								<p>Precio: $${price}</p>
								<p>Stock: ${stock}</p>
							</div>
						`;
						container.appendChild(col);
					});
			});
		})
		.catch(err => {
			console.error('Error al cargar los pokémons', err);
			container.innerHTML = '<p class="text-danger">No se pudieron cargar los productos.</p>';
		});
});