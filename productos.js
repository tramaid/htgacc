/* Productos de muestra: catálogo SOUL Sep. 2026 (HTG es distribuidor oficial).
   Sirven para que la web muestre productos por categoría y su ficha mientras no
   esté online la tienda de PepperLabs. Sin precios: en mayorista se ven solo con
   cuenta y en minorista se consultan. Fotos en assets/productos/<id>.webp. */
window.HTG_RUBROS = {
  cargadores: { t: 'Cables y cargadores', bajada: 'Cables, cargadores, cargadores de auto, power banks y bases de carga.' },
  audio: { t: 'Audio', bajada: 'Auriculares, TWS, manos libres, parlantes y micrófonos.' },
  fundas: { t: 'Fundas', bajada: 'Silicona, antishock, magnéticas y flip covers para los modelos más buscados.' },
  pantalla: { t: 'Protección de pantalla', bajada: 'Vidrios templados, hidrogel y protectores de cámara.' },
  soportes: { t: 'Soportes', bajada: 'Para auto, bici y moto, escritorio, notebook y monitor.' },
  creadores: { t: 'Creadores de contenido', bajada: 'Aros de luz, luces LED, trípodes y selfie sticks.' },
  gaming: { t: 'Gaming', bajada: 'Joysticks, teclados, mouses, auriculares y sillas gamer.' },
  oficina: { t: 'Computación y oficina', bajada: 'Teclados, mouses, combos, webcams, mochilas y fundas para notebook.' },
  smartwatch: { t: 'Smartwatch y wearables', bajada: 'Relojes inteligentes, smart bands y smart rings.' },
  celulares: { t: 'Celulares y tablets', bajada: 'Equipos y accesorios para celulares y tablets.' }
};

window.HTG_PRODUCTOS = [
  { id: 'usb-ma', cat: 'cargadores', cod: 'USB-MA', n: 'Cable de datos mallado', r: ['Cable mallado reforzado', 'Disponible USB a Tipo C, Lightning y Micro USB', 'Carga rápida 3,1 A', '1,2 metros'] },
  { id: 'usb-rgbpd60', cat: 'cargadores', cod: 'USB-RGBPD60', n: 'Cable RGB USB-C a USB-C 60 W', r: ['Luces RGB', 'Tipo C a Tipo C', 'Carga rápida 60 W'] },
  { id: 'usb-m60', cat: 'cargadores', cod: 'USB-M60', n: 'Cable magnético 60 W', r: ['Conector magnético', 'Tipo C y Lightning', 'Carga rápida 60 W'] },
  { id: 'cvjpd-20w', cat: 'cargadores', cod: 'CVJPD 20W', n: 'Cargador Compact 20 W', r: ['1 puerto Tipo C', 'Carga rápida 20 W PD', 'Con cable Tipo C o Lightning, o sin cable'] },
  { id: 'cvq-pd65', cat: 'cargadores', cod: 'CVQ-PD65', n: 'Cargador PD 65 W', r: ['Carga rápida 65 W', 'Puertos USB y Tipo C', 'Incluye cable de carga'] },
  { id: 'ca-fm50', cat: 'cargadores', cod: 'CA-FM50', n: 'Cargador para auto FM 50', r: ['Transmisor FM', 'Reproduce música por Bluetooth', 'Lector de micro SD', 'Puerto USB de carga'] },
  { id: 'pbs-c41022tl', cat: 'cargadores', cod: 'PBS-C41022TL', n: 'Power bank Classic 400 10.000 mAh', r: ['10.000 mAh', 'Display LED', '2 cables incorporados', 'Potencia 22,5 W'] },
  { id: 'bci-3en1', cat: 'cargadores', cod: 'BCI-3EN1', n: 'Base de carga inalámbrica 3 en 1', r: ['Carga inalámbrica Qi', 'Magnética', '22,5 W', 'Celular, auriculares y reloj a la vez'] },

  { id: 'aur-bt881', cat: 'audio', cod: 'AUR-BT881', n: 'Auriculares Sport S600', r: ['Manos libres con micrófono', 'Conector 3,5 mm'] },
  { id: 'aur-bt350', cat: 'audio', cod: 'AUR-BT350', n: 'Auriculares Dream Flow BT350', r: ['Bluetooth', 'Sonido de alta definición', 'Manos libres con micrófono', 'Batería recargable'] },
  { id: 'aur-tws1100', cat: 'audio', cod: 'AUR-TWS1100', n: 'Auriculares TWS 1100', r: ['Inalámbricos con estuche de carga', 'Control táctil', 'Manos libres con micrófono'] },
  { id: 'aur-s150', cat: 'audio', cod: 'AUR-S150', n: 'Auriculares Free Go S150', r: ['Conducción por aire', 'Resistentes a salpicaduras', 'Manos libres', 'Batería recargable'] },
  { id: 'mls-s289', cat: 'audio', cod: 'MLS-S289', n: 'Manos libres S289', r: ['In ear con micrófono', 'Conector 3,5 mm o Tipo C'] },
  { id: 'plt-xs20', cat: 'audio', cod: 'PLT-XS20', n: 'Parlante Party Teen XS20', r: ['Bluetooth y entrada auxiliar', 'Potencia 5 W', 'Batería recargable'] },
  { id: 'plt-xm2850', cat: 'audio', cod: 'PLT-XM2850', n: 'Parlante Boom House XM2850', r: ['Potencia 20 W', 'Función TWS', 'Batería recargable'] },
  { id: 'plt-xs5000', cat: 'audio', cod: 'PLT-XS5000', n: 'Parlante Ultra Hit XL5000', r: ['Potencia 300 W', 'Luces', 'Función TWS', 'Alimentación 220 V'] },
  { id: 'mic-fct1', cat: 'audio', cod: 'MIC-FCT1', n: 'Micrófono inalámbrico Simple', r: ['Corbatero inalámbrico', 'Alcance hasta 20 metros', 'Batería recargable'] },

  { id: 'pss', cat: 'fundas', cod: 'PSS', n: 'Funda antishock transparente', r: ['Esquinas reforzadas', 'Transparente', 'Consultá modelos disponibles'] },
  { id: 'prsi', cat: 'fundas', cod: 'PRSI', n: 'Funda Silicone Case', r: ['Silicona con interior suave', 'Consultá modelos y colores'] },
  { id: 'prm', cat: 'fundas', cod: 'PRM', n: 'Funda magnética color', r: ['Compatible con carga magnética', 'Consultá modelos y colores'] },
  { id: 'psac', cat: 'fundas', cod: 'PSAC', n: 'Funda de silicona con correa', r: ['Silicona', 'Correa para la muñeca', 'Consultá modelos y colores'] },
  { id: 'psmf', cat: 'fundas', cod: 'PSMF', n: 'Funda magnética Force', r: ['Anillo magnético', 'Bordes reforzados', 'Consultá modelos y colores'] },
  { id: 'fcus', cat: 'fundas', cod: 'FCUS', n: 'Flip cover de silicona universal', r: ['Para pantallas de 6,5" a 6,9"', 'Doble tarjetero', 'Consultá colores'] },

  { id: 'fdn', cat: 'pantalla', cod: 'FDN', n: 'Vidrio templado Nano Glass', r: ['Alta transparencia', 'Sensibilidad al tacto', 'Protección asegurada'] },
  { id: 'fdnp', cat: 'pantalla', cod: 'FDNP', n: 'Vidrio templado Full Glue Privacy', r: ['Antiespía', 'Adhesivo total', 'Sensibilidad al tacto'] },
  { id: 'dfhd', cat: 'pantalla', cod: 'DFHD', n: 'Vidrio templado Dust Free Clear HD', r: ['Colocación simple, con aplicador', 'Adherencia perfecta', 'Gran protección'] },
  { id: 'oc', cat: 'pantalla', cod: 'OC', n: 'Protector de cámara', r: ['Para iPhone y Samsung', 'Consultá colores'] },
  { id: 'plotter', cat: 'pantalla', cod: 'PLOTTER', n: 'Plotter de hidrogel', r: ['Corta protectores para cualquier dispositivo', 'Alta rentabilidad', 'Menos stock y menos espacio'] },
  { id: 'hydropic', cat: 'pantalla', cod: 'HYDROPIC', n: 'Hydropic: láminas personalizadas', r: ['Imprimí la foto de tu cliente desde su celular', 'Calidad 300 DPI', 'Impresión en 80 segundos'] },

  { id: 'sop-q40', cat: 'soportes', cod: 'SOP-Q40', n: 'Soporte magnético Q40', r: ['Sujeción magnética', 'Rotación 360°', 'Incluye anillo adhesivo'] },
  { id: 'sop-zb11', cat: 'soportes', cod: 'SOP-ZB11', n: 'Soporte para notebook plegable', r: ['12 posiciones ajustables', 'Siliconado antideslizante', 'Plegable'] },
  { id: 'sop-q400', cat: 'soportes', cod: 'SOP-Q400', n: 'Soporte trípode Q400', r: ['Universal', 'Posición ajustable', 'Base triangular'] },
  { id: 'sop-q300', cat: 'soportes', cod: 'SOP-Q300', n: 'Soporte para auto Q300', r: ['Universal', 'Posición ajustable', 'Fácil colocación'] },
  { id: 'sop-q700', cat: 'soportes', cod: 'SOP-Q700', n: 'Soporte para auto Q700', r: ['Carga inalámbrica', 'Magnético', 'Rotación 360°'] },
  { id: 'sop-q900', cat: 'soportes', cod: 'SOP-Q900', n: 'Soporte bici y moto Q900', r: ['Universal', 'Funda protectora', 'Rotación 360°'] },
  { id: 'sop-m100', cat: 'soportes', cod: 'SOP-M100', n: 'Soporte para monitor M100', r: ['Capacidad 8 kg', 'Orificios VESA', 'Brazo articulado'] },

  { id: 'lself-ring10', cat: 'creadores', cod: 'LSELF-RING10', n: 'Aro de luz LED 11" con trípode', r: ['Luces RGB', 'Niveles de luz ajustables', 'Trípode de 2 metros'] },
  { id: 'self-jl50', cat: 'creadores', cod: 'SELF-JL50', n: 'Luz LED JL50', r: ['Sujeción magnética', 'Con espejo', 'Batería recargable, carga USB-C'] },
  { id: 'self-jl70', cat: 'creadores', cod: 'SELF-JL70', n: 'Luz LED magnética JL70', r: ['Sujeción magnética', 'Batería recargable, carga USB-C'] },
  { id: 'self-h50', cat: 'creadores', cod: 'SELF-H50', n: 'Selfie stick H50', r: ['Base triangular', 'Control remoto inalámbrico', 'Rotación 360°'] },
  { id: 'self-j450', cat: 'creadores', cod: 'SELF-J450', n: 'Selfie trípode J450', r: ['Sujeción con clip', 'Apertura automática', 'Rotación 360°'] },
  { id: 'self-j500', cat: 'creadores', cod: 'SELF-J500', n: 'Selfie trípode J500', r: ['Sujeción magnética', 'Apertura automática', 'Hasta 1,80 metros'] },

  { id: 'joy-p500', cat: 'gaming', cod: 'JOY-P500', n: 'Joystick inalámbrico P500', r: ['Luces RGB', 'PC, Android e iOS', 'Conexión inalámbrica'] },
  { id: 'joy-p600', cat: 'gaming', cod: 'JOY-P600', n: 'Joystick inalámbrico P600', r: ['Luces RGB', 'PC, Android, iOS, PS3 y PS4', 'Conexión inalámbrica'] },
  { id: 'game-xh250', cat: 'gaming', cod: 'GAME-XH250', n: 'Auriculares gamer Show Time XH250', r: ['Micrófono incluido', 'Luces RGB', 'Control de volumen'] },
  { id: 'game-xm600', cat: 'gaming', cod: 'GAME-XM600', n: 'Mouse gamer XM600', r: ['Hasta 4.800 DPI', '7 botones', 'Luces RGB'] },
  { id: 'game-xk950', cat: 'gaming', cod: 'GAME-XK950', n: 'Teclado gamer XK950', r: ['Súper resistente', 'Luces RGB', 'Conexión USB'] },
  { id: 'game-kit4e1', cat: 'gaming', cod: 'GAME-KIT4E1', n: 'Kit gamer 4 en 1', r: ['Teclado y mouse con luz RGB', 'Auricular con micrófono', 'Mousepad'] },
  { id: 'game-ch100', cat: 'gaming', cod: 'GAME-CH100', n: 'Silla gamer', r: ['Respaldo reclinable', 'Altura regulable', 'Eco cuero, soporte lumbar'] },

  { id: 'per-ocw150', cat: 'oficina', cod: 'PER-OCW150', n: 'Combo inalámbrico mouse y teclado OCW150', r: ['Inalámbrico', 'Teclado en español', 'Windows, Mac y Linux'] },
  { id: 'per-omv410', cat: 'oficina', cod: 'PER-OMV410', n: 'Mouse ergonómico vertical OMV410', r: ['Reduce la tensión de la muñeca', 'Inalámbrico 2,4 GHz', '1.600 DPI'] },
  { id: 'per-kbt02', cat: 'oficina', cod: 'PER-KBT02', n: 'Teclado plegable KBT02', r: ['Diseño plegable', 'Bluetooth', 'Batería recargable'] },
  { id: 'per-oweb100', cat: 'oficina', cod: 'PER-OWEB100', n: 'Webcam Full HD OWEB100', r: ['Full HD', 'Con soporte y cobertor', 'Conexión USB'] },
  { id: 'cam-ipc20', cat: 'oficina', cod: 'CAM-IPC20', n: 'Cámara de seguridad WiFi IPC20', r: ['Full HD', 'Giro 360°', 'Visión nocturna y detector de movimiento'] },
  { id: 'moc-s02', cat: 'oficina', cod: 'MOC-S02', n: 'Mochila con puerto USB S02', r: ['Puerto USB', '40 x 29 x 10 cm'] },
  { id: 'fnsi-fol', cat: 'oficina', cod: 'FNSI-FOL', n: 'Funda para notebook Folder', r: ['13" y 15"', '2 bolsillos', 'Interior de felpa'] },

  { id: 'smw-r', cat: 'smartwatch', cod: 'SMW-R', n: 'Smart Ring', r: ['Control de ritmo cardíaco', 'Monitoreo de sueño', 'Contador de pasos'] },
  { id: 'smw-h1', cat: 'smartwatch', cod: 'SMW-H1', n: 'Smart Band', r: ['Ideal para deportes', 'Alerta de sedentarismo', 'Batería recargable'] },
  { id: 'smw-evo300', cat: 'smartwatch', cod: 'SMW-EVO300', n: 'Smartwatch EVO 300', r: ['Alerta de llamadas', 'Contador de pasos', 'Batería recargable'] },
  { id: 'smw-evo900p', cat: 'smartwatch', cod: 'SMW-EVO900P', n: 'Smartwatch EVO 900 Plus', r: ['Alerta de llamadas', 'Ideal para deportes', 'Batería recargable'] },
  { id: 'smw-evo1100', cat: 'smartwatch', cod: 'SMW-EVO1100', n: 'Smartwatch EVO 1100', r: ['GPS', 'Ideal para deportes', 'Batería recargable'] },
  { id: 'smw-evo1400', cat: 'smartwatch', cod: 'SMW-EVO1400', n: 'Smartwatch EVO 1400', r: ['Alerta de llamadas y mensajes', 'Contador de pasos', 'Batería recargable'] }
];
