const tiposContainer = document.getElementById("tiposContainer");

fetch("https://pokeapi.co/api/v2/type")
    .then(res => res.json())
    .then(data => {
        const tipos = data.results;

        // Agregar card "Ver todos"
        const verTodos = document.createElement("div");
        verTodos.classList.add("col");
        verTodos.innerHTML = `
            <a href="lista.html#Todos" class="text-decoration-none">
                <div class="card tipo bg-dark">
                    Ver todos
                </div>
            </a>
        `;
        tiposContainer.appendChild(verTodos);

        // Agregar el resto de los tipos
        tipos.forEach(tipo => {
            const nombre = tipo.name;
            const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);

            const col = document.createElement("div");
            col.classList.add("col");

            col.innerHTML = `
                <a href="listado.html#${nombreCapitalizado}" class="text-decoration-none">
                    <div class="card tipo tipo-${nombre}">
                        ${nombreCapitalizado}
                    </div>
                </a>
            `;

            tiposContainer.appendChild(col);
        });
    })
    .catch(err => console.error("Error al cargar tipos:", err));
