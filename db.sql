CREATE DATABASE airbnb;

USE airbnb;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    role TINYINT DEFAULT 0
);

CREATE TABLE city(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);

CREATE TABLE place(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    rooms INT NOT NULL,
    bathrooms INT NOT NULL,
    max_guests INT NOT NULL,
    price_by_night FLOAT NOT NULL,
    available TEXT NOT NULL,
    image_url VARCHAR(255),
    user_id INT NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE booking(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    check_in datetime NOT NULL,
    check_out datetime  NOT NULL,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (place_id) REFERENCES place(id)
);

