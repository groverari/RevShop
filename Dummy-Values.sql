-- Adding Dummy Owner Values For Testing
{
  "email": "owner1@email.com",
  "password": "password",
  "firstName": "Netti",
  "lastName": "Dabs"
}, {
  "email": "owner2@email.com",
  "password": "password",
  "firstName": "Ethel",
  "lastName": "Redmell"
}, {
  "email": "owner3@email.com",
  "password": "password",
  "firstName": "Faina",
  "lastName": "Smy"
}, {
  "email": "owner4@email.com",
  "password": "password",
  "firstName": "Claire",
  "lastName": "Maciejak"
}, {
  "email": "owner5@email.com",
  "password": "password",
  "firstName": "Silvan",
  "lastName": "Vizor"
}


-- Adding Dummy User Values For Testing
{
  "email": "user1@email.com",
  "password": "password",
  "firstName": "Laurent",
  "lastName": "Melan"
}, {
  "email": "user2@email.com",
  "password": "password",
  "firstName": "Linda",
  "lastName": "Creasy"
}, {
  "email": "user3@email.com",
  "password": "password",
  "firstName": "Nancey",
  "lastName": "Chasson"
}, {
  "email": "user4@email.com",
  "password": "password",
  "firstName": "Celeste",
  "lastName": "Meachen"
}, {
  "email": "user5@email.com",
  "password": "password",
  "firstName": "Jorgan",
  "lastName": "Breche"
}


-- Adding dummy hotel values for testing
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (4, 'Méghane', 'ut dolor morbi vel lectus in quam fringilla rhoncus mauris', 'http://dummyimage.com/330x185.png/5fa2dd/ffffff', 36, 510.99);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (3, 'Aloïs', 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet', 'http://dummyimage.com/330x185.png/ff4444/ffffff', 55, 409.55);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (4, 'Camélia', 'turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus', 'http://dummyimage.com/330x185.png/ff4444/ffffff', 0, 89.05);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (3, 'Gaïa', 'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida', 'http://dummyimage.com/330x185.png/5fa2dd/ffffff', 98, 321.38);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (2, 'Fèi', 'suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus', 'http://dummyimage.com/330x185.png/5fa2dd/ffffff', 2, 877.6);

-- Adding dummy favorite values for testing 
INSERT INTO revstay.favorites (userid,hotelid)


-- Adding dummy reviews for testing
insert into Review (user_id, hotel_id, rating, text, feedback) values (4, 2, 4, 'quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere', 'in tempor turpis nec euismod scelerisque');
insert into Review (user_id, hotel_id, rating, text, feedback) values (1, 5, 4, 'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus', 'at nibh in hac habitasse platea');
insert into Review (user_id, hotel_id, rating, text, feedback) values (1, 2, 4, 'eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus', 'aliquet maecenas leo odio condimentum');
insert into Review (user_id, hotel_id, rating, text, feedback) values (5, 3, 2, 'integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed', 'aenean auctor gravida sem praesent id');
insert into Review (user_id, hotel_id, rating, text, feedback) values (2, 3, 5, 'varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla', 'justo in blandit ultrices enim');

-- adding dummy rooms for testing	
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (4, 'Måns', 'quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in', 'http://dummyimage.com/252x194.png/dddddd/000000', 79, 511.91);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (2, 'Athéna', 'leo maecenas pulvinar lobortis est phasellus sit amet erat nulla', 'http://dummyimage.com/252x194.png/ff4444/ffffff', 92, 473.41);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (2, 'Bérénice', 'nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut', 'http://dummyimage.com/252x194.png/5fa2dd/ffffff', 0, 985.52);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (4, 'Ruò', 'interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis', 'http://dummyimage.com/252x194.png/dddddd/000000', 1, 397.53);
insert into revstay.room (hotel_id, room_name, description, img, quantity, price) values (5, 'Cécilia', 'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna', 'http://dummyimage.com/252x194.png/5fa2dd/ffffff', 92, 793.89);

-- Adding dummy bookings for testing
insert into revstay.bookings (booking_id	, user_id	, hotel_id	, check_in	, check_out	, guests	, room_id	, num_rooms	, status	, "read") values (9990, 9990,9990, '06/05/2023', '10/09/2023', 5, 9990, 4, 'accepted', false);
insert into revstay.bookings (booking_id	, user_id	, hotel_id	, check_in	, check_out	, guests	, room_id	, num_rooms	, status	, "read") values (9991, 9992,9990, '09/09/2023', '09/09/2023', 4, 9993, 5, 'pending', true);
insert into revstay.bookings (booking_id	, user_id	, hotel_id	, check_in	, check_out	, guests	, room_id	, num_rooms	, status	, "read") values (9992, 9991,9991, '06/18/2023', '12/28/2023', 10, 9991, 10, 'pending', false);
insert into revstay.bookings (booking_id	, user_id	, hotel_id	, check_in	, check_out	, guests	, room_id	, num_rooms	, status	, "read") values (9993, 9992,9993, '10/26/2023', '11/07/2023', 2, 9992, 6, 'rejected', false);

-- Adding dummy unavailables for testing
INSERT INTO revstay.unavailable (roomid,startdate,enddate,quantity) VALUES
