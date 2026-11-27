USE LeagueScout;

-- Somente administradores da Liga acessam o sistema.
-- Nenhum administrador fictício é cadastrado neste script.
CREATE TABLE IF NOT EXISTS usuario_liga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS lider_ginasio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55) NOT NULL UNIQUE,
    sexo CHAR(1),
    cidade VARCHAR(55) NOT NULL,
    tipo VARCHAR(55) NOT NULL,
    insignia VARCHAR(55) NOT NULL,
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    vitorias INT NOT NULL DEFAULT 0,
    derrotas INT NOT NULL DEFAULT 0,
    CONSTRAINT chk_lider_vitorias CHECK (vitorias >= 0),
    CONSTRAINT chk_lider_derrotas CHECK (derrotas >= 0)
);

-- Um líder tem vários Pokémon; cada Pokémon pertence a um único líder.
-- A exclusão do líder exclui automaticamente os Pokémon relacionados.
CREATE TABLE IF NOT EXISTS pokemon (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55) NOT NULL,
    nivel INT NOT NULL,
    tipo_primario VARCHAR(45) NOT NULL,
    tipo_secundario VARCHAR(45) DEFAULT NULL,
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lider_ginasio_id INT NOT NULL,
    CONSTRAINT chk_pokemon_nivel CHECK (nivel BETWEEN 1 AND 100),
    CONSTRAINT fk_pokemon_lider FOREIGN KEY (lider_ginasio_id)
        REFERENCES lider_ginasio(id) ON DELETE CASCADE
);

-- Líderes na ordem inicial de cadastro simulada para as KPIs.
-- As datas simuladas podem ser substituídas pelas datas reais no futuro.
INSERT INTO lider_ginasio
    (id, nome, sexo, cidade, tipo, insignia, data_registro)
VALUES
    (1, 'Cheren',  'M', 'Aspertia',   'Normal',   'Básica', '2026-01-05 10:00:00'),
    (2, 'Burgh',   'M', 'Castelia',   'Inseto',   'Inseto', '2026-01-16 10:00:00'),
    (3, 'Elesa',   'F', 'Nimbasa',    'Elétrico', 'Raio',   '2026-01-29 10:00:00'),
    (4, 'Clay',    'M', 'Driftveil',  'Terra',    'Tremor', '2026-02-12 10:00:00'),
    (5, 'Skyla',   'F', 'Mistralton', 'Voador',   'Jato',   '2026-02-25 10:00:00'),
    (6, 'Drayden', 'M', 'Opelucid',   'Dragão',   'Lenda',  '2026-03-12 10:00:00'),
    (7, 'Marlon',  'M', 'Humilau',    'Água',     'Onda',   '2026-03-30 10:00:00');

-- Pokémon usados nas batalhas dos respectivos ginásios (modo Normal).
-- Os IDs de líder correspondem aos INSERTs acima.
INSERT INTO pokemon
    (nome, nivel, tipo_primario, tipo_secundario, lider_ginasio_id)
VALUES
    -- Cheren: 2 Pokémon
    ('Patrat',    11, 'Normal',   NULL,       1),
    ('Lillipup',  13, 'Normal',   NULL,       1),

    -- Burgh: 3 Pokémon
    ('Swadloon',  22, 'Inseto',   'Planta',   2),
    ('Dwebble',   22, 'Inseto',   'Pedra',    2),
    ('Leavanny',  24, 'Inseto',   'Planta',   2),

    -- Elesa: 3 Pokémon
    ('Emolga',    28, 'Elétrico', 'Voador',   3),
    ('Flaaffy',   28, 'Elétrico', NULL,       3),
    ('Zebstrika', 30, 'Elétrico', NULL,       3),

    -- Clay: 3 Pokémon
    ('Krokorok',  31, 'Terra',    'Sombrio',  4),
    ('Sandslash', 31, 'Terra',    NULL,       4),
    ('Excadrill', 33, 'Terra',    'Aço',      4),

    -- Skyla: 3 Pokémon
    ('Swoobat',   37, 'Psíquico', 'Voador',   5),
    ('Skarmory',  37, 'Aço',      'Voador',   5),
    ('Swanna',    39, 'Água',     'Voador',   5),

    -- Drayden: 3 Pokémon
    ('Druddigon', 46, 'Dragão',   NULL,       6),
    ('Flygon',    46, 'Terra',    'Dragão',   6),
    ('Haxorus',   48, 'Dragão',   NULL,       6),

    -- Marlon: 3 Pokémon
    ('Carracosta',49, 'Água',     'Pedra',    7),
    ('Wailord',   49, 'Água',     NULL,       7),
    ('Jellicent', 51, 'Água',     'Fantasma', 7);

-- Conferência rápida para testes da API/Dashboard:
SELECT id, nome, cidade, tipo, insignia, data_registro, vitorias, derrotas
FROM lider_ginasio ORDER BY data_registro;

SELECT l.nome AS lider, COUNT(p.id) AS quantidade_pokemon
FROM lider_ginasio l
LEFT JOIN pokemon p ON p.lider_ginasio_id = l.id
GROUP BY l.id, l.nome
ORDER BY l.id;

SELECT COUNT(*) AS total_lideres FROM lider_ginasio;
SELECT COUNT(*) AS total_pokemon FROM pokemon;

-- LIMITES DE NEGÓCIO: até 8 líderes e até 6 Pokémon por líder (48 no total).
-- Esses limites devem ser verificados no back-end durante os INSERTs;
-- um CHECK de linha não consegue contar registros de outras linhas.
-- Para consultar a equipe de um líder:
-- SELECT p.* FROM pokemon p JOIN lider_ginasio l ON l.id = p.lider_ginasio_id WHERE l.nome = 'Cheren';
