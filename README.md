# HTG Accesorios — web navegable

Abrí `index.html` en un navegador o serví la carpeta con:

```bash
python3 -m http.server 8000
```

Luego entrá a `http://localhost:8000/`. No necesita instalación ni build.

## Recorridos

- "Minorista" es un ítem más del menú principal, en todas las páginas.
- Home mayorista (`index.html`): navegación por anclas, categorías y destacados.
- Minorista (`minorista.html`, estilos en `minorista.css`): hero con 3 diapositivas (puntos, flechas del teclado y deslizar), rubros que abren una ficha con consulta por Instagram (copia el mensaje), buscador propio (`?q=`), enlace directo a un rubro (`?rubro=audio`), marcas con flechas, Instagram, locales y novedades. Sin productos destacados ni precios: el brief define que los precios se ven solo con cuenta.
- Catálogo: búsqueda de rubros y enlaces con interés precargado para el alta.
- Alta mayorista: formulario con validación en línea que arma el mensaje de alta, lo copia al portapapeles y abre el chat de Instagram de @htgaccesorios. Si se completa `CONTACTO.whatsapp` en `site.js`, aparece también "Enviar por WhatsApp" con el mensaje precargado. No transmite ni guarda datos.

## Antes de publicar

1. Logo HTG y logos de marcas ya integrados (`assets/htg-logo.svg`, `assets/marcas/`). Si cambian, reemplazar esos archivos: los originales están en `htglogo-01.svg` y `logos-marcas/`.
2. Confirmar fotografías reales de local, equipo y productos. Los WebP actuales son recreaciones provisionales del prototipo.
3. Confirmar nombres, direcciones, teléfono, email y cuenta de Instagram; la web no enlaza a datos no verificados.
4. Conectar catálogo, stock, precios y autenticación al sistema comercial elegido.
5. Configurar un destino real y tratamiento de datos para el alta. El formulario actual sólo prepara un archivo local.
6. Renderizar escritorio y móvil, comparar contra el prototipo y corregir diferencias visuales antes de publicar.

La referencia visual y el inventario de decisiones están en `PROYECTO.md`.
