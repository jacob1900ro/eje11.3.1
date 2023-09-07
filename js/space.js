document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById('contenedor');
    const btn = document.getElementById('btnBuscar');

    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const galaxia = document.getElementById('inputBuscar').value;
        if (galaxia != '') {

            const url = `https://images-api.nasa.gov/search?q=${galaxia}`;

            function galaxiaCard(p) {
                const card = document.createElement("div");
                card.className = "col-md-4"
                card.innerHTML = `
                <div class="card mb-4 shadow-sm custom-card cursor-active">
                  <img
                    class="bd-placeholder-img card-img-top"
                    src="${p.links[0].href}"
                    alt="${p.data[0].title}"
                  />
                  <h3 class="m-3">${p.data[0].title}</h3>
                  <div class="card-body">
                    <p class="card-text">
                      ${p.data[0].description}
                    </p>
                    <small>
                        ${p.data[0].date_created}
                    </small>
                  </div>
                </div>
                `;
                return card;
            }

            function showGalaxia(galaxias) {
                lista.innerHTML = "";
                galaxias.forEach(element => {
                    let gCard = galaxiaCard(element);
                    lista.appendChild(gCard);
                });
            }

            let getJSONData = function (url) {
                let result = {};
                return fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw Error(response.statusText);
                        }
                    })
                    .then(function (response) {
                        result.status = 'ok';
                        result.datos = response;
                        console.log(result.datos);
                        return result;
                    })
                    .catch(function (error) {
                        result.status = 'error';
                        result.datos = error;
                        return result;
                    });
            }

            // getJSONData(url).then(function (response) {
            //     if (response.status === "ok") {
            //         const galaxias = response.data.items;
            //         console.log(galaxias);
            //         const filteredArray = galaxias.filter((item) => {
            //             // Filtra productos por título
            //             const title = item.title.toLowerCase();
            //             return title.includes(item);
            //         });
            //         showGalaxia(filteredArray);
            //     }
            // });

            // ...

            getJSONData(url).then(function (response) {
                if (response.status === "ok") {
                    const galaxias = response.datos.collection.items;
                    console.log(typeof galaxias);
                    const filteredArray = galaxias.filter((item) => {
                        // Filtra productos por título
                        console.log(typeof item.data[0].title);
                        const title = item.data[0].title.toLowerCase();
                        return title.includes(galaxia.toLowerCase());
                    });
                    showGalaxia(filteredArray);
                }
            });

            // ...


        } else {
            alert("No hay ingreso de busqueda");
        }

    });
});