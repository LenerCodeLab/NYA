# MyLove

Pagina romantica hecha para Yenni.

Temporalmente, `index.html` muestra solo la declaracion para ser enamorados. Las demas vistas siguen guardadas en el proyecto, pero no estan enlazadas desde la entrada principal.

- `index.html`: entrada principal con la declaracion.
- `Vistas/`: paginas activas de la experiencia.
- `styles/`: estilos de cada pagina.
- `scripts/`: comportamiento de musica, botones y WhatsApp.
- `img/`: imagenes usadas por la pagina.
- `audios/`: canciones y audios.
- `prototipos/`: versiones anteriores o recursos de referencia que no forman parte directa del flujo principal.

## Recorrido principal

1. `index.html`
2. `Vistas/Septiembre.html`
3. `Vistas/FLORES.html`
4. `Vistas/Tarjeta.html`
5. `Vistas/Declaracion.html`

## Notas

- Las paginas dentro de `Vistas/` usan rutas relativas con `../` para acceder a `styles/`, `scripts/`, `img/` y `audios/`.
- Los navegadores suelen bloquear musica automatica hasta que la persona presiona un boton.
