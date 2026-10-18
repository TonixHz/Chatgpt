# PROJECT: NULL

Prototipo de terror 3D retro en primera persona, creado con HTML, CSS, JavaScript y Three.js. Proyecto independiente.

## Cómo jugar
- Abrí index.html desde un servidor estático (por ejemplo, GitHub Pages).
- **WASD / flechas:** moverte.
- **Ratón:** mirar alrededor.
- **E:** interactuar con objetos.
- **F:** encender/apagar linterna.
- **Shift:** correr; la resistencia se consume y se recupera al caminar o descansar.
- **ESC:** pausar.

## Objetivo del prototipo
Explorá la estación abandonada, encontrá el fusible, activá el panel y llegá a la compuerta. Algo empieza a seguirte cuando restaurás la energía.

## Actualización de prototipo — BUILD 0.1.6
- Se eliminó el zumbido ambiental continuo.
- Se añadieron pulsos graves intermitentes cuando la criatura se acerca, en lugar de un tono constante.
- La criatura ahora se detiene si la iluminás y la mantenés a la vista; cuando dejás de apuntarle, vuelve a moverse.
- Los pasos y efectos breves de interferencia siguen activos.

## Publicar con GitHub Pages
1. Entrá a **Settings → Pages** en el repositorio.
2. En **Build and deployment**, elegí **Deploy from a branch**.
3. Seleccioná la rama principal y la carpeta raíz.
4. Guardá y esperá a que GitHub publique el sitio.

## Rendimiento
La escena usa geometría simple, materiales compartidos, sombras desactivadas y resolución interna reducida. El objetivo es funcionar en equipos modestos; 60 FPS depende del navegador y del hardware y debe comprobarse en pruebas reales.

## Próximas etapas
- Más zonas, eventos narrativos y varios finales.
- Audio ambiental, pasos, interferencias y pistas.
- Inventario, guardado y ajustes gráficos.
- Mejoras de accesibilidad y controles táctiles.

## Actualización de prototipo — BUILD 0.1.5
- Se agregó un ambiente sonoro grave y discreto usando Web Audio, sin descargar archivos de audio.
- Pasos con ritmo y tono diferentes al caminar y correr.
- Un tono grave aumenta según la proximidad de la criatura.
- Nuevos efectos breves para interferencias, susurros y el interruptor de la linterna.
- El audio se inicializa después de pulsar Entrar para respetar las restricciones del navegador.

## Actualización de prototipo — BUILD 0.1.4
- La linterna ahora tiene un haz más potente, ancho y de mayor alcance.
- Su intensidad disminuye progresivamente a medida que baja la batería.
- El parpadeo cercano a la criatura se integra con la intensidad variable de la batería.

## Actualización de prototipo — BUILD 0.1.3
- La criatura ahora calcula rutas alrededor de paredes y obstáculos con una búsqueda de caminos sobre una cuadrícula.
- Cuando se acerca mucho, la linterna puede parpadear para aumentar la tensión.

## Actualización de prototipo — BUILD 0.1.2
- La salida ahora tiene una breve secuencia antes de mostrar el final, para que se note el cierre de la compuerta.
- Tras restaurar la energía aparecen eventos ambientales aleatorios: interferencias, golpes y susurros.
- La criatura reacciona al ruido de correr e investiga la última posición ruidosa antes de volver a buscarte.

## Actualización de prototipo
- La compuerta se eleva al restaurar la energía.
- La criatura intenta respetar paredes y obstáculos en vez de avanzar atravesándolos.
- Se agregó resistencia para correr, con indicador en pantalla.
- La viñeta se intensifica cuando la criatura está cerca.