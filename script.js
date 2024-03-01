let intentos = 6;
let listado_palabras = ['LIMON', 'TIGRE', 'SALIR', 'ROBLE', 'GRUPO', 'LUNAR', 'CARNE', 'CALOR', 'POLAR', 'PLUMA'];
// let palabra = listado_palabras[Math.floor(Math.random() * listado_palabras.length)];


const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const VALOR = INPUT.value;
const CONTENEDOR = document.getElementById("guesses");
const GRID = document.getElementById("grid");
const openaiApiKey = 'some_api_key'; // Replace with your OpenAI API key


window.addEventListener('load', init);

setup();



async function intentar(WORD) {
	const USER_INPUT = read_input();
	const ROW = document.createElement("div");
	ROW.className = "row";
	console.log("Al darle intentar la palabra es: " + WORD);
	const palabra = WORD.toUpperCase();
	console.log("Don't cheat!! " + palabra);

	if (USER_INPUT === palabra){
		winning(ROW, USER_INPUT, palabra);
		return;
	} else {
		continuing(ROW, USER_INPUT, palabra);
	}		

	intentos --; 
	
	losing(intentos, palabra);
}

function init() {
	console.log("El trigger funciona!");
}

async function setup() {
    WORD = await api_call();
    BUTTON.addEventListener('click', function () {
        intentar(WORD);
    });
}

function read_input() {
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

function winning(ROW, USER_INPUT, palabra){
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

function continuing(ROW, USER_INPUT, palabra){
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
}

function losing(intentos, palabra) {
	if (intentos == 0 ) {
		console.log("Se acabaron los intentos, la palabra era: " + palabra);
		terminar("PERDISTE!");
	}
}

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
      		temperature: 0.6, 
    	}),
    });

	const result = await response.json();

	if (!response.ok) {
        const generateWord = listado_palabras[Math.floor(Math.random() * listado_palabras.length)];
		return generateWord
    } else {
		console.log(result);
		console.log(result.choices[0]?.message?.content);
  		const generatedWord = result.choices[0]?.message?.content;
		return generatedWord.trim();
	}	
}