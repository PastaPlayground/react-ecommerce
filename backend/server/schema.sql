-- database init

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS accounts (
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (username),
  UNIQUE KEY username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS stores (
    storename varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    website varchar(255) DEFAULT NULL,
    PRIMARY KEY (storename),
    UNIQUE KEY storename (storename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS items (
    storename varchar(255) NOT NULL,
    itemname varchar(255) NOT NULL,
    quantity int NOT NULL,
    price float NOT NULL,
    PRIMARY KEY (storename),
    KEY itemname_idx (itemname),
    CONSTRAINT storename FOREIGN KEY (storename) REFERENCES stores (storename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- insert dummy data
INSERT INTO accounts (username, password, created) VALUES ("admin", "Password0!", NOW());

INSERT INTO stores (storename, country, website) VALUES ("Adidas", "Singapore", "adidas@gmail.com");
INSERT INTO items (storename, itemname, quantity, price) VALUES ("Adidas", "Adidas Black Duffle Bag", 1000, 25.5);
