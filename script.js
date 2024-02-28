let intentos = 6;
let listado_palabras = ['LIMON', 'TIGRE', 'JARDN', 'ROBLE', 'LUZON', 'PIELA', 'EXCES', 'CALOR', 'NINOS', 'PLUMA'];
let palabra = listado_palabras[0];

const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const VALOR = INPUT.value;
const CONTENEDOR = document.getElementById("guesses");
const GRID = document.getElementById("grid");
	

window.addEventListener('load', init);
BUTTON.addEventListener('click', intentar);

function intentar() {
	const USER_INPUT = leerIntento();
	const ROW = document.createElement("div");
	ROW.className = "row";

	if (USER_INPUT === palabra) {
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
		terminar("PERDISTE!");
	}
}

function init() {
	console.log("El trigger funciona!");
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

