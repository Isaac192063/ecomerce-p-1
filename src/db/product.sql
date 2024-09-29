CREATE TABLE USERS(
    id_user SERIAL,
    name VARCHAR(20),
    lastname VARCHAR(20),
    birthdate DATE,
    username VARCHAR(25),
    password VARCHAR(80),
    email VARCHAR(40),
    image VARCHAR(150),
    status BOOLEAN DEFAULT 'Y',
    role VARCHAR(15),
    CONSTRAINT PK_ID_USER PRIMARY KEY(id_user),
    CONSTRAINT NN_NAME_USER CHECK (name IS NOT NULL),
    CONSTRAINT NN_LASTNAME_USER CHECK (lastname IS NOT NULL),
    CONSTRAINT UC_USERNAME UNIQUE(username), 
    CONSTRAINT UC_EMAIL UNIQUE(email),
    CONSTRAINT NN_ROLE_USER CHECK (role IS NOT NULL)
);

CREATE TABLE CATEGORIES(
   id_category SERIAL,
   name VARCHAR(40),
   description VARCHAR(255),
   status BOOLEAN DEFAULT 'y',
   CONSTRAINT PK_ID_CATEGORY PRIMARY KEY(id_category)
);

CREATE TABLE PRODUCTS(
    id_product SERIAL,
    name VARCHAR(130),
    price NUMERIC,
    image VARCHAR(150),
    description VARCHAR(200),
    status BOOLEAN DEFAULT 'y',
    id_cty INTEGER,
    CONSTRAINT PK_ID_PRODUCT PRIMARY KEY(id_product),
    CONSTRAINT FK_ID_CATEGORY FOREIGN KEY (id_cty) REFERENCES CATEGORIES(id_category),
    CONSTRAINT NN_NAME_PRODUCTS CHECK (name IS NOT NULL),
    CONSTRAINT CK_PRICE_PRODUCT CHECK (price > 0)
);


INSERT INTO CATEGORIES(id_category, name, description, status)
VALUES 
(default, 'Hogar', 'productos relacionados con el aseo de la casa, como aromatizantes limpiadores y utensilios esenciales en el día a día que se puedan utilizar', default),
(default, 'Tecnología', 'Productos tecnológicos modernos de gran calidad a gran precio', default),
(default, 'Ropa', 'Prendas de vestir con las últimas modas', default),
(default, 'Deportes', 'Artículos deportivos para diversas actividades físicas y recreativas', default),
(default, 'Electrodomésticos', 'Productos eléctricos para el hogar que facilitan las tareas diarias', default);

INSERT INTO PRODUCTS(id_product, name, price, image, description, id_cty)
VALUES 
-- Hogar (id_cty = 1)
(default, 'Escoba de cerdas duras', 25000, null, 'Escoba ideal para superficies exteriores con cerdas de alta resistencia', 1),
(default, 'Juego de toallas x3', 45000, null, 'Juego de toallas de algodón de alta absorción', 1),
(default, 'Aromatizante de lavanda', 12000, null, 'Aromatizante en spray con fragancia de lavanda', 1),
(default, 'Cortinas de baño impermeables', 36000, null, 'Cortinas para baño con revestimiento impermeable', 1),
(default, 'Funda de cojín decorativa', 22000, null, 'Funda decorativa para cojines, diseño moderno', 1),
(default, 'Juego de cubiertos x12', 78000, null, 'Cubiertos de acero inoxidable para toda la familia', 1),
(default, 'Sábanas King Size', 98000, null, 'Sábanas suaves de microfibra para camas King Size', 1),
(default, 'Bolsas para aspiradora', 15000, null, 'Bolsas desechables compatibles con varios modelos de aspiradoras', 1),
(default, 'Alfombra de sala', 145000, null, 'Alfombra de poliéster para sala con diseño moderno', 1),
(default, 'Porta toallas de acero', 22000, null, 'Porta toallas resistente para baños', 1),

-- Tecnología (id_cty = 2)
(default, 'Smart TV 55" 4K', 2200000, null, 'Televisor inteligente con resolución 4K y aplicaciones integradas', 2),
(default, 'Audífonos Bluetooth', 120000, null, 'Audífonos inalámbricos con cancelación de ruido', 2),
(default, 'Laptop HP Pavilion', 3200000, null, 'Laptop con procesador Intel Core i7 y 16GB de RAM', 2),
(default, 'Cámara digital 20MP', 680000, null, 'Cámara digital con lente de alta precisión y 20 megapíxeles', 2),
(default, 'Reloj inteligente Fitband', 190000, null, 'Reloj inteligente para seguimiento de actividad física', 2),
(default, 'Teclado mecánico RGB', 180000, null, 'Teclado mecánico retroiluminado con luces RGB', 2),
(default, 'Mouse gaming con sensor óptico', 80000, null, 'Mouse gaming con sensor óptico y alta precisión', 2),
(default, 'Tableta gráfica XP-Pen', 360000, null, 'Tableta gráfica para diseño digital con alta sensibilidad', 2),
(default, 'Bocina inteligente', 220000, null, 'Bocina con asistente de voz integrado y conexión Wi-Fi', 2),
(default, 'Cargador inalámbrico rápido', 65000, null, 'Cargador inalámbrico con tecnología de carga rápida', 2),

-- Ropa (id_cty = 3)
(default, 'Pantalón de mezclilla - Talla M', 98000, null, 'Pantalón de mezclilla azul clásico, resistente y cómodo', 3),
(default, 'Chaqueta de cuero sintético - Talla L', 340000, null, 'Chaqueta moderna en cuero sintético con detalles minimalistas', 3),
(default, 'Vestido de verano - Talla S', 120000, null, 'Vestido ligero y colorido ideal para días soleados', 3),
(default, 'Zapatos deportivos unisex - Talla 42', 260000, null, 'Zapatos deportivos con amortiguación para correr', 3),
(default, 'Gorra con visera plana', 25000, null, 'Gorra casual con diseño urbano', 3),
(default, 'Camiseta básica de algodón - Talla L', 45000, null, 'Camiseta clásica en algodón, disponible en varios colores', 3),
(default, 'Falda plisada - Talla S', 90000, null, 'Falda plisada con cintura elástica', 3),
(default, 'Bufanda de lana', 38000, null, 'Bufanda tejida en lana para días fríos', 3),
(default, 'Chaleco acolchado - Talla M', 160000, null, 'Chaleco acolchado ideal para clima frío', 3),
(default, 'Guantes táctiles de invierno', 45000, null, 'Guantes cálidos compatibles con pantallas táctiles', 3),

-- Deportes (id_cty = 4)
(default, 'Balón de fútbol profesional', 120000, null, 'Balón de fútbol oficial con certificación FIFA', 4),
(default, 'Raqueta de tenis', 250000, null, 'Raqueta ligera de fibra de carbono para jugadores intermedios', 4),
(default, 'Bicicleta de montaña', 1800000, null, 'Bicicleta de montaña con suspensión delantera y frenos de disco', 4),
(default, 'Set de pesas 10kg', 75000, null, 'Pesas ajustables para entrenamiento en casa', 4),
(default, 'Colchoneta de yoga', 30000, null, 'Colchoneta antideslizante para yoga o pilates', 4),

-- Electrodomésticos (id_cty = 5)
(default, 'Licuadora de 5 velocidades', 190000, null, 'Licuadora con vaso de vidrio resistente y múltiples velocidades', 5),
(default, 'Horno microondas 30L', 320000, null, 'Microondas con capacidad de 30 litros y varias funciones automáticas', 5),
(default, 'Aspiradora sin bolsa', 450000, null, 'Aspiradora ciclónica sin bolsa, ideal para todo tipo de superficies', 5),
(default, 'Plancha de vapor', 85000, null, 'Plancha con sistema de vapor para eliminar arrugas rápidamente', 5),
(default, 'Refrigerador No Frost', 2400000, null, 'Refrigerador de 2 puertas con tecnología No Frost', 5);
