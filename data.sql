
CREATE SCHEMA revstay;
SET search_path TO revstay;

-- CREATE TYPE status AS ENUM('accepted', 'rejected', 'pending');


CREATE TABLE owner (
  business_id SERIAL PRIMARY KEY,
  email VARCHAR(45) ,
  password VARCHAR(90),  
  first_name VARCHAR(45) ,
  last_name VARCHAR(45)
  );



CREATE TABLE  Hotel (
  hotel_id SERIAL PRIMARY KEY,
  business_id INT NOT NULL,

  name VARCHAR(45) ,
  description TEXT,
  street VARCHAR(45) ,
  city VARCHAR(45),
  state VARCHAR(45),
  zip VARCHAR(9),
  img VARCHAR(255),
  CONSTRAINT business_hotel
    FOREIGN KEY (business_id)
    REFERENCES Owner (business_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;
CREATE TABLE Room (
  room_id SERIAL PRIMARY KEY,
  hotel_id INT NOT NULL,
  room_name VARCHAR(45),

  description TEXT,
  img VARCHAR(255),
  quantity INT ,
  price DECIMAL ,
  CONSTRAINT hotel_room

    FOREIGN KEY (hotel_id)
    REFERENCES Hotel (hotel_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,

  email VARCHAR(45) ,
  password VARCHAR(90) NULL,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL
)
;


CREATE TABLE revstay.Bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  check_in DATE ,
  check_out DATE ,
  guests INT ,
  room_id INT NOT NULL ,
  num_rooms INT,
  status VARCHAR(10),
  read boolean,
  CONSTRAINT room_booking

    FOREIGN KEY (room_id)
    REFERENCES Room (room_id),
  CONSTRAINT user_booking
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT hotel_booking
    FOREIGN KEY (hotel_id)
    REFERENCES Hotel (hotel_id)
    );

CREATE TABLE Review (
  review_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,

  rating INT NULL,
  text TEXT NULL,
  feedback VARCHAR(45) NULL,
  CONSTRAINT hotel_review
    FOREIGN KEY (hotel_id)
    REFERENCES Hotel (hotel_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_review
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE TABLE Favorites (
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  PRIMARY KEY (user_id, hotel_id),
  CONSTRAINT user_favorite
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT hotel_favorite
    FOREIGN KEY (hotel_id)
    REFERENCES Hotel (hotel_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE TABLE Unavailable(
  id  SERIAL PRIMARY KEY,
  room_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT room_unavailable
    FOREIGN KEY (room_id)
    REFERENCES Room (room_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)

