
  function Visualizar() {
    const pokeapi = "https://pokeapi.co/api/v2/pokemon/pikachu";
    fetch(pokeapi)
      .then(response => response.json())
      .then(data => {
        const imagen = data.sprites.front_default;
        contenedordeimagen.innerHTML = `<img src="${imagen}">`;
        const nombre = data.name;
        nombrepokemon.innerHTML = ` ${nombre} `;
        const tipos = data.types[0].type.name;
        quetipoes.innerHTML = `${tipos}` 
        const habili = data.abilities[0].ability.name;
        habilidades.innerHTML = `${habili}`
        const habili2 = data.abilities[1].ability.name;
        habilidades1.innerHTML = `${habili2}`
      })

    }

Visualizar()
