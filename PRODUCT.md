# Product — Sara Kafetegia

## Register

brand

## Users

Vecinos y vecinas de **Bera** (Bera de Bidasoa, Navarra) y de los pueblos del
Bidasoa y la comarca de Cinco Villas / Bortziriak (Lesaka, Etxalar, Igantzi,
Arantza), más viajeros y senderistas que cruzan la frontera con Francia
(Sara/Sare, Ainhoa, San Juan de Luz) y turistas de paso por el valle.

Contexto de uso: alguien busca con el móvil "cafetería en Bera", "desayunos
cerca", "dónde tomar café de especialidad en el Bidasoa", "merienda con niños",
o llega desde Google Maps / Instagram. Quiere saber en 10 segundos: qué es este
sitio, qué ambiente tiene, qué puede tomar, a qué hora abre y dónde está. Mucho
tráfico es móvil, en la calle, con prisa o con hambre.

Trabajo a resolver (job-to-be-done): decidir *este* sitio para su café,
desayuno, merienda o encuentro — y saber cómo llegar y cuándo. La web no vende
online; **convierte una búsqueda en una visita** al local.

## Product Purpose

Web de presencia y captación local para una cafetería de barrio con alma de
café de especialidad en Bera. Existe para que Sara Kafetegia **aparezca y
convenza** en Google, en los mapas y en las respuestas de IA cuando alguien de
la zona busca dónde tomar algo bueno; y para transmitir, antes de cruzar la
puerta, la experiencia real del local: granos tostados, luz cálida de bombillas
Edison, plantas, repostería, trato cercano de pueblo.

Éxito = el visitante entiende el sitio al instante, le entran ganas de ir,
encuentra horario + dirección + cómo llegar sin fricción, y la web alimenta bien
a Google/IA con datos estructurados para salir en búsquedas locales.

## Brand Personality

Tres palabras: **cálida · artesana · sin prisa** (*warm · hand-crafted ·
unhurried*).

Voz: cercana y de pueblo, pero cuidada; nada corporativa, nada "tercera ola
hipster fría". Habla de tú, con calidez vasca-navarra. El café es bueno y se
nota que les importa, pero el tono es acogedor, no pretencioso. Emoción objetivo:
**calidez, hospitalidad, antojo, pertenencia** ("este es mi sitio en el pueblo").

Identidad visual heredada (manda sobre cualquier sugerencia automática): logo
dibujado a mano (croissant + taza de café con espuma + canela), tipografía
manuscrita del logo en **marrón espresso-oxblood profundo** (muestreado del
logo real: ~`#541818` / `#48180c` / `#3c180c`). Esa marca ya está comprometida:
identity-preservation manda — la web se construye alrededor de ese marrón
cálido, no de una paleta inventada.

## Anti-references

- **NO la cafetería beige-crema genérica de IA**: fondo casi-blanco tintado de
  "warm sand / cream / parchment", una foto de latte art de stock y tres cards
  iguales con iconitos. Es exactamente el cliché que cualquiera adivinaría de
  la categoría "coffee shop". Lo evitamos por norma.
- **NO el café de especialidad frío/industrial de tercera ola**: gris cemento,
  mono como disfraz "técnico", minimalismo sin alma. Sara es de pueblo y cálida.
- **NO editorial-magazine por defecto**: serif display en cursiva + drop caps +
  rejilla de periódico + etiquetas mono diminutas en mayúsculas sobre cada
  sección. Esa lane está saturada; no es una cafetería de pueblo.
- **NO Starbucks / cadena corporativa**: verde corporativo, vasos genéricos,
  sensación de franquicia.
- **NO emojis como iconos**, ni gradientes morados/rosas de IA, ni cards dentro
  de cards, ni texto gris sobre fondo de color, ni rebote/elastic en las
  animaciones.

## Design Principles

1. **El marrón es la voz, no el fondo crema.** La calidez la llevan el marrón
   espresso de la marca, la tipografía y las fotos reales del local — no un
   beige tintado near-white. Comprometemos el color de marca; el lienzo es
   disciplinado.
2. **Enseña el local de verdad.** Café de pueblo = confianza por prueba real:
   fotos propias del interior, los granos, la luz Edison, Bera. Nada de stock
   que no pegue. Una foto decisiva vale más que cinco mediocres.
3. **De búsqueda a visita en 10 segundos.** Qué es, qué ambiente, qué tomar,
   horario, dónde, cómo llegar — sin fricción, mobile-first, una sola llamada a
   la acción dominante por pantalla (Cómo llegar / Llámanos).
4. **Artesanía sin ruido.** Animación con intención (1–2 elementos por vista,
   ease-out exponencial, sin rebote), microinteracciones que recompensan, y
   limpieza: nada abrumador, nada asimétrico, ni una fila huérfana en las
   rejillas.
5. **Hospitalidad local también para la IA.** Datos estructurados, FAQ
   atómicas, NAP coherente, euskera/comarca como señal de proximidad — para
   salir cuando la zona pregunta "mejor café en Bera".

## Accessibility & Inclusion

- Objetivo **WCAG 2.2 AA**. Contraste ≥4.5:1 en texto normal, ≥3:1 en texto
  grande; placeholders también 4.5:1. El marrón espresso profundo sobre crema
  cálido y la crema sobre marrón se verifican ambos.
- `prefers-reduced-motion`: toda animación tiene alternativa (crossfade o
  estado final inmediato); el page-loader y los reveals nunca ocultan contenido.
- Navegación por teclado completa con foco visible; targets táctiles ≥44px.
- HTML semántico, jerarquía de encabezados sin saltos, `alt` descriptivo en
  todas las imágenes con significado, `lang` correcto por idioma.
- Color nunca como único indicador.
