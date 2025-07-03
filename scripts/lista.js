document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('listaPokemon');
	let allPokemons = [];

	async function loadAllPokemons() {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
			const data = await response.json();
			
			const pokemonPromises = data.results.map(async (pokemon) => {
				const resp = await fetch(pokemon.url);
				const detail = await resp.json();
				return {
					name: pokemon.name,
					image: detail.sprites.other['official-artwork'].front_default,
					types: detail.types.map(type => type.type.name),
					price: (Math.random() * 10000 + 1000).toFixed(0),
					stock: Math.floor(Math.random() * 50 + 10),
					id: detail.id,
					height: detail.height,
					weight: detail.weight,
					abilities: detail.abilities
				};
			});

			allPokemons = await Promise.all(pokemonPromises);
			displayPokemons(allPokemons);
		} catch (err) {
			console.error('Error al cargar los pokémons', err);
			container.innerHTML = '<p class="text-danger">No se pudieron cargar los productos.</p>';
		}
	}

	function displayPokemons(pokemons) {
		container.innerHTML = '';
		pokemons.forEach(pokemon => {
			const col = document.createElement('div');
			col.className = 'col';
			col.innerHTML = `
				<div class="pokemon-card" onclick="goToFicha('${pokemon.name}', ${pokemon.id})">
					<div class="pokemon-id-back">#${pokemon.id.toString().padStart(3, '0')}</div>
					<div class="pokemon-imagen">
						<img src="${pokemon.image}" alt="${pokemon.name}">
					</div>
					<div class="pokemon-info">
						<div class="nombre-contenedor">
							<p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
							<h5 class="pokemon-nombre">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
						</div>
						<div class="pokemon-tipos">
							${pokemon.types.map(type => `<p class="${type}">${type}</p>`).join('')}
						</div>
						<div class="pokemon-stats">
							<div class="stat">
								<p class="stat-titulo">Precio</p>
								<p class="stat-numero">$${pokemon.price}</p>
							</div>
							<div class="stat">
								<p class="stat-titulo">Stock</p>
								<p class="stat-numero">${pokemon.stock}</p>
							</div>
						</div>
					</div>
				</div>
			`;
			container.appendChild(col);
		});
	}

	function filterPokemonByType(type) {
		if (type === 'all') {
			displayPokemons(allPokemons);
		} else {
			const filtered = allPokemons.filter(pokemon => 
				pokemon.types.includes(type)
			);
			displayPokemons(filtered);
		}
	}

	document.getElementById('ver-todos').addEventListener('click', () => {
		filterPokemonByType('all');
		document.querySelectorAll('.btn-header').forEach(btn => btn.classList.remove('active'));
		document.getElementById('ver-todos').classList.add('active');
	});

	document.getElementById('fire').addEventListener('click', () => {
		filterPokemonByType('fire');
		document.querySelectorAll('.btn-header').forEach(btn => btn.classList.remove('active'));
		document.getElementById('fire').classList.add('active');
	});

	document.getElementById('water').addEventListener('click', () => {
		filterPokemonByType('water');
		document.querySelectorAll('.btn-header').forEach(btn => btn.classList.remove('active'));
		document.getElementById('water').classList.add('active');
	});

	document.getElementById('grass').addEventListener('click', () => {
		filterPokemonByType('grass');
		document.querySelectorAll('.btn-header').forEach(btn => btn.classList.remove('active'));
		document.getElementById('grass').classList.add('active');
	});

	document.getElementById('electric').addEventListener('click', () => {
		filterPokemonByType('electric');
		document.querySelectorAll('.btn-header').forEach(btn => btn.classList.remove('active'));
		document.getElementById('electric').classList.add('active');
	});

	window.goToFicha = function(pokemonName, pokemonId) {
		const pokemon = allPokemons.find(p => p.name === pokemonName && p.id === pokemonId);
		if (pokemon) {
			sessionStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
			window.location.href = '1ficha.html';
		}
	};

	loadAllPokemons();
});