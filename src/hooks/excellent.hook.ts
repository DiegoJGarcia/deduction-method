import { useState } from 'react';

const encouraging: string[] = [
	'Adelante, es hora de hacer historia',
	'¡Gran elección!',
	'¡Excelente nombre!',
	'¡Fantástico!',
	'¡Impresionante!',
	'¡Bravo!',
	'¡Increíble!',
	'¡Fabuloso!',
	'¡Estupendo!',
	'¡Genial decisión!',
	'¡Asombroso!',
	'¡Súper elección!',
	'¡Fantástico nombre!',
	'¡Bien hecho!',
	'¡Vamos allá!',
	'¡Sigue adelante!',
	'¡Todo es posible!',
	'¡A por ello!',
	'¡Triunfarás!',
	'¡Gran trabajo!',
	'¡Muy bien!',
	'¡Sigue así!',
	'¡Lo lograrás!',
	'¡Felicidades!',
	'¡A darlo todo!',
	'¡Éxito seguro!',
	'¡Buena elección!',
	'¡Adelante!',
	'¡Todo va bien!',
	'¡No te rindas!',
	'¡Sé valiente!',
	'¡A por todas!',
	'¡Ganador total!',
	'¡Vuela alto!',
	'¡Nunca pares!',
	'¡A triunfar!',
	'¡Sigue tu sueño!',
	'¡Maravilloso!',
	'¡Gigante!',
	'¡A por ello!',
	'¡Hazlo realidad!',
	'¡Eres genial!',
	'¡Puedes lograrlo!',
	'¡Muy bien hecho!',
	'¡Sé imparable!',
	'¡Sé audaz!',
	'¡Siempre adelante!',
	'¡Lograrás mucho!',
	'¡Es tu momento!',
	'¡Éxito asegurado!',
	'¡Vas por buen camino!',
];

const motivational: string[] = [
	`Bienvenido a tu propio universo de videojuegos`,
	'El éxito es ir de fracaso en fracaso sin perder el entusiasmo.',
	'El futuro pertenece a aquellos que creen en la belleza de sus sueños.',
	'Nunca es tarde para ser lo que podrías haber sido.',
	'El único modo de hacer un gran trabajo es amar lo que haces.',
	'Nunca te rindas en algo que realmente quieres. Es difícil de esperar, pero es peor arrepentirse.',
	'La única forma de lograr lo imposible es creer que es posible.',
	'No importa lo lento que vayas mientras no te detengas.',
	'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.',
	'Cree que puedes y estás a medio camino.',
	'El momento en el que estás más cerca de rendirte es generalmente cuando estás más cerca de tu meta.',
	'Las oportunidades no ocurren. Tú las creas.',
	'Sé tú mismo. Todos los demás ya están cogidos.',
	'Lo único imposible es aquello que no intentas.',
	'Cada día es una nueva oportunidad para cambiar tu vida.',
	'El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.',
	'El único límite para nuestras realizaciones de mañana serán nuestras dudas de hoy.',
	'La manera de empezar es dejar de hablar y empezar a hacer.',
	'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
	'Sé tan bueno que no puedan ignorarte.',
	'La única forma de hacer un gran trabajo es amar lo que haces.',
	'Toma el control de tu destino. Cree en ti mismo. Ignora a los que te dicen que no puedes hacerlo.',
	'La perseverancia es el único camino hacia el éxito.',
	'Lo único que se interpone entre tú y tu sueño es la voluntad de intentarlo y la creencia de que en realidad es posible.',
	'No tienes que ser grande para empezar, pero tienes que empezar para ser grande.',
	'Cree en ti mismo y todo será posible.',
	'La diferencia entre una persona exitosa y otras no es la falta de fuerza, no la falta de conocimiento, sino la falta de voluntad.',
	'El éxito no está en lo alto de una escalera, sino en cada paso que das.',
	'El camino hacia el éxito siempre está en construcción.',
	'El éxito no es definitivo, el fracaso no es fatal: es el coraje para continuar lo que cuenta.',
	'No tienes que ser genial para empezar, pero tienes que empezar para ser grande.',
	'La motivación te consigue en marcha, el hábito te mantiene en marcha.',
	'El camino hacia el éxito y el camino hacia el fracaso son casi exactamente los mismos.',
	'La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.',
	'Si te caes siete veces, levántate ocho.',
	'No esperes el momento perfecto, toma el momento y hazlo perfecto.',
	'La acción es la clave fundamental de todo éxito.',
	'El mayor placer en la vida es hacer lo que la gente dice que no puedes hacer.',
	'La vida no es acerca de encontrarte a ti mismo, es acerca de crearte a ti mismo.',
	'No permitas que nadie te diga que no eres lo suficientemente bueno.',
	'Si haces lo que siempre has hecho, obtendrás lo que siempre has obtenido.',
	'La vida es 10% lo que te pasa y 90% cómo reaccionas a ello.',
	'Nunca es demasiado tarde para ser lo que podrías haber sido.',
	'Cree que puedes y estás a medio camino.',
	'La única forma de hacer un gran trabajo es amar lo que haces.',
	'La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.',
	'El éxito no es definitivo, el fracaso no es fatal: es el coraje para continuar lo que cuenta.',
	'No tienes que ser genial para empezar, pero tienes que empezar para ser grande.',
];

export enum PhrasesTypes {
	ENCOURAGING = 'encouraging',
	MOTIVATIONAL = 'motivational',
}

const phrases = {
	[PhrasesTypes.ENCOURAGING]: encouraging,
	[PhrasesTypes.MOTIVATIONAL]: motivational,
};

const getRandomPhrase = (phrases: string[]): string => {
	const randomIndex = Math.floor(Math.random() * phrases.length);
	return phrases[randomIndex];
};

const useExcellent = (type: PhrasesTypes = PhrasesTypes.ENCOURAGING): [string, () => void] => {
	const [randomPhrase, setRandomPhrase] = useState<string>(
		type === PhrasesTypes.ENCOURAGING ? encouraging[0] : motivational[0],
	);

	const updateRandomPhrase = () => {
		const newRandomPhrase = getRandomPhrase(phrases[type]);
		setRandomPhrase(newRandomPhrase);
	};

	return [randomPhrase, updateRandomPhrase];
};

export default useExcellent;
