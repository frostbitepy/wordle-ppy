let intentos = 6;
//let listado_palabras = ['LIMON', 'TIGRE', 'SALIR', 'ROBLE', 'GRUPO', 'ZORRO', 'CARNE', 'CALOR', 'PERRO', 'PLUMA'];
// let palabra = listado_palabras[Math.floor(Math.random() * listado_palabras.length)];


const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const VALOR = INPUT.value;
const CONTENEDOR = document.getElementById("guesses");
const GRID = document.getElementById("grid");
const openaiApiKey = 'test'; // Replace with your OpenAI API key


window.addEventListener('load', init);

// Supongamos que tienes una variable secreta llamada MY_SECRET_KEY
const secretKey = process.env.API_KEY;




async function setup() {
    const WORD = await api_call();

    BUTTON.addEventListener('click', function () {
        intentar(WORD);
    });
}

setup();

async function api_call() {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
    	method: 'POST',
    	headers: {
      	'Content-Type': 'application/json',
      	'Authorization': `Bearer ${openaiApiKey}`,
    	},
    	body: JSON.stringify({
      		model: 'gpt-3.5-turbo',
			messages: [{"role": "user", "content": "Genera una palabra aleatoria en español de 5 letras, devuelve solo la una palabra donde palabra.len == 5 "}],
      		// prompt: 'Genera una palabra en español de 5 letras:',
      		max_tokens: 5,
      		temperature: 0.6, // Set temperature to the maximum for more randomness
    	}),
    });

	const result = await response.json();
	console.log(result);
	console.log(result.choices[0]?.message?.content);
  	const generatedWord = result.choices[0]?.message?.content;

	return generatedWord.trim();
}

async function intentar(WORD) {
	const USER_INPUT = leerIntento();
	const ROW = document.createElement("div");
	ROW.className = "row";
	console.log("Al darle intentar la palabra es: " + WORD);
	const palabra = WORD.toUpperCase();

	if (USER_INPUT === palabra) {
		console.log("Al ganar la palabra es: " + palabra)
		terminar("GANASTE!");
		for (let i in USER_INPUT) {
			const SPAN = document.createElement("span");
			SPAN.className = "letter";
			SPAN.innerHTML = USER_INPUT[i];
			SPAN.style.backgroundColor = "#79b851"
			ROW.appendChild(SPAN);
		}
		GRID.appendChild(ROW);
		return;
	}
	
	for (let i in palabra) {
		console.log("dentro del for palabra: " + palabra)
		const SPAN = document.createElement("span");
		SPAN.className = "letter";
		if (USER_INPUT[i] === palabra[i]) {
			SPAN.innerHTML = USER_INPUT[i];
			SPAN.style.backgroundColor = "#79b851";
			console.log(USER_INPUT[i], "verde");
		} else if (palabra.includes(USER_INPUT[i])) {
			SPAN.innerHTML = USER_INPUT[i];
			SPAN.style.backgroundColor = "#f3c237";
			console.log(USER_INPUT[i], "amarillo");
		} else {
			SPAN.innerHTML = USER_INPUT[i];
			SPAN.style.backgroundColor = "#a4aec4";
			console.log(USER_INPUT[i], "gris");
		}
		ROW.appendChild(SPAN);
	}
	GRID.appendChild(ROW);	

	intentos --; // Reduce la cantidad de intentos
	
	if (intentos == 0 ) {
		console.log("al perder la palabra es: " + palabra);
		terminar("PERDISTE!");
	}
}

function init() {
	console.log("El trigger funciona!");
	console.log(secretKey);
}

function leerIntento() {
	let intento = INPUT; 
	intento = intento.value;
	intento = intento.toUpperCase();
	return intento;
}

function terminar(mensaje) {
	INPUT.style.display = "none";
	BUTTON.style.display = "none";
	CONTENEDOR.style.display = "block";
	CONTENEDOR.innerHTML = mensaje;
}

