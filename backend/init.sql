-- ==========================
-- Таблица заказов
-- ==========================
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP,
  description TEXT
);

INSERT INTO orders (id, title, date, description) VALUES
(1, 'Order 1', '2017-06-29 12:09:33', 'desc'),
(2, 'Order 2', '2017-06-29 12:09:33', 'desc'),
(3, 'Order 3', '2017-06-29 12:09:33', 'desc');

-- ==========================
-- Таблица продуктов
-- ==========================
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  serial_number INT,
  is_new BOOLEAN,
  photo TEXT,
  title TEXT,
  type TEXT,
  specification TEXT,
  guarantee_start DATE,
  guarantee_end DATE,
  price_usd NUMERIC,
  price_uah NUMERIC,
  order_id INT,
  date DATE
);

INSERT INTO products (id, serial_number, is_new, photo, title, type, specification, guarantee_start, guarantee_end, price_usd, price_uah, order_id, date) VALUES
(1, 1234, TRUE, 'pathToFile.jpg', 'Product 1', 'Monitors', 'Specification 1', '2017-06-29', '2017-06-29', 100, 2600, 1, '2017-06-29'),
(10, 1234, FALSE, 'pathToFile.jpg', 'Product 2', 'Monitors', 'Specification 1', '2017-06-29', '2017-06-29', 100, 2600, 2, '2017-06-29'),
(3, 1234, TRUE, 'pathToFile.jpg', 'Product 3', 'Monitors', 'Specification 1', '2017-06-29', '2017-06-29', 100, 2600, 2, '2017-06-29'),
(4, 1234, FALSE, 'pathToFile.jpg', 'Product 4', 'Monitors', 'Specification 1', '2017-06-29', '2017-06-29', 100, 2600, 2, '2017-06-29'),
(5, 1234, TRUE, 'pathToFile.jpg', 'Product 5', 'Keyboard', 'Specification 1', '2017-06-29', '2017-06-29', 100, 2600, 3, '2017-06-29');
