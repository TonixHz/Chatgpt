# PROJECT: NULL

Prototipo de terror 3D retro en primera persona, creado con HTML, CSS, JavaScript y Three.js. Proyecto independiente.

## Cómo jugar
- Abrí index.html desde un servidor estático (por ejemplo, GitHub Pages).
- **WASD / flechas:** moverte.
- **Ratón:** mirar alrededor.
- **E:** interactuar con objetos.
- **F:** encender/apagar linterna.
- **Shift:** correr; la resistencia se consume y se recupera al caminar o descansar.
- **Ctrl:** agacharte; avanzás más lento y bajás el perfil para moverte con más sigilo.
- **ESC:** pausar.

## Objetivo del prototipo
Explorá la estación abandonada, encontrá el fusible, activá el panel y llegá a la compuerta. Algo empieza a seguirte cuando restaurás la energía.

## Actualización de prototipo — BUILD 0.1.6
- Se eliminó el zumbido ambiental continuo.
- Se añadieron pulsos graves intermitentes cuando la criatura se acerca, en lugar de un tono constante.
- Comportamiento inicial de la criatura (reemplazado en BUILD 0.1.8): la luz afectaba su movimiento. Ahora es ciega, deambula y rastrea ruido o el calor de la linterna.
- Los pasos y efectos breves de interferencia siguen activos.

## Actualización de prototipo — BUILD 0.1.12
- El sigilo ahora cambia cómo te detecta la criatura: agacharte y moverte no genera ruido rastreable.
- Caminar puede atraerla si está a unos 5,5 metros; correr genera ruido detectable hasta unos 14 metros.
- Se eliminó el aviso repetitivo por cada paso al correr; el peligro se comunica cuando la criatura está relativamente cerca.

## Actualización de prototipo — BUILD 0.1.11
- Se corrigió el ancho de la abertura en la pared del fondo: ahora coincide con la compuerta industrial y deja espacio para atravesarla.

## Actualización de prototipo — BUILD 0.1.10
- Nueva mecánica de sigilo: agacharse con Ctrl reduce la velocidad y baja la cámara.
- Se corrigió la secuencia de salida para que el final no se active antes de cruzar el pasillo.

## Actualización de prototipo — BUILD 0.1.9
- Los marcadores rectangulares de interacción ahora son invisibles; se mantiene la detección por raycast y la tecla E.
- Se corrigió el mensaje de la linterna para que refuerce que la criatura rastrea el calor, no que se queda quieta.
- Nuevas texturas procedurales de pared, suelo, metal y madera con desgaste, juntas y óxido.
- Se añadieron cajas de carga, tuberías, señalética, un escritorio y una silla abandonados para sugerir el pasado industrial de la estación.

## Actualización de prototipo — BUILD 0.1.8
- La criatura es ciega: se eliminaron los ojos visibles y ahora se orienta hacia estímulos, no hacia la mirada del jugador.
- Tras activarse, deambula por la zona en lugar de perseguir automáticamente al jugador por proximidad.
- Correr produce ruido repetido que la atrae; apuntarle directamente con la linterna hace que detecte el calor, investigue y acelere.
- La nota de contención explica su ceguera, sus receptores táctiles y cómo evitar que te rastree.

## Actualización de prototipo — BUILD 0.1.7
- La luz directa acelera a la criatura en vez de detenerla.
- El fusible cambió de ubicación y hay más objetos que revisar.
- Nueva nota interactiva con el protocolo de luz/calor.
- Compuerta industrial de lamas animadas, cables visibles y pasillo de salida con transición a negro.

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