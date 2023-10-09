// Clave de API de OpenWeatherMap
const ApiKey = "19631b889c86a9c043c45a2f5433a93a";

// Capturamos elementos HTML importantes
const form = document.querySelector(".top-banner form"); // Captura el formulario
const input = document.querySelector(".top-banner input"); // Captura el campo de entrada
const msg = document.querySelector(".top-banner .msg"); // Captura el elemento para mensajes
const list = document.querySelector(".ajax-section .cities"); // Captura la lista de ciudades

// Agregamos un evento al formulario cuando se envía (submit)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita la acción predeterminada del formulario (recargar la página)
  
  const inputVal = input.value.trim(); // Obtiene el valor del campo de entrada
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${ApiKey}&units=metric&lang=es`;


  try {
    // Realiza una solicitud fetch a la API de OpenWeatherMap
    const response = await fetch(url);

    if (response.ok) {
      // Si la respuesta es exitosa, obtenemos los datos JSON
      const data = await response.json();
      const temperature = data.main.temp; // Temperatura
      const cityName = data.name; // Nombre de la ciudad
      const weatherDescription = data.weather[0].description; // Descripción del clima
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Icono del clima

      // Creamos un nuevo elemento <li> para mostrar la información de la ciudad
      const li = document.createElement("li");
      li.classList.add("city");

      // Construimos el contenido HTML del <li> utilizando los datos obtenidos
      const markup = `
        <h2 class="city-name" data-name="${cityName},${data.sys.country}">
          <span>${cityName}</span>
          <sup>${data.sys.country}</sup>
        </h2>
        <span class="city-temp">${Math.round(temperature)}<sup>°C</sup></span>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weatherDescription}">
          <figcaption>${weatherDescription}</figcaption>
        </figure>
      `;

      // Establecemos el contenido del <li> con el contenido HTML que hemos creado
      li.innerHTML = markup;

      // Agregamos el <li> a la lista de ciudades
      list.appendChild(li);

      // Limpiamos el mensaje de error
      msg.textContent = "";
    } else {
      // Si la respuesta no es exitosa, lanzamos una excepción y mostramos un mensaje de error
      throw new Error("Respuesta de la API no exitosa");
    }
  } catch (error) {
    // Capturamos y manejamos cualquier error que pueda ocurrir
    msg.textContent = "Por favor, busca una ciudad válida 😩";
  }
});