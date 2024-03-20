CREATE DATABASE  IF NOT EXISTS `revshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `revshop`;

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `FK_PRODUCTCART` (`product_id`),
  CONSTRAINT `FK_PRODUCTCART` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`),
  CONSTRAINT `FK_USERCART` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
);


DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `FK_PRODUCTFAV` (`product_id`),
  CONSTRAINT `FK_PRODUCTFAV` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`),
  CONSTRAINT `FK_USERFAV` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
);


DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `FK_ORDER_ORDER_ITEM` (`order_id`),
  KEY `FK_PRODUCT_ORDER_ITEM` (`product_id`),
  CONSTRAINT `FK_ORDER_ORDER_ITEM` FOREIGN KEY (`order_id`) REFERENCES `orders` (`ID`),
  CONSTRAINT `FK_PRODUCT_ORDER_ITEM` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`)
) 




DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `street` varchar(40) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` char(25) DEFAULT NULL,
  `zip` char(5) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
) 

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `info` text,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) 


INSERT INTO `product` (`ID`, `product_name`, `info`, `price`, `img`, `category`) VALUES (1,'Rich Dad Poor Dad','A book about personal finance',13.89,'rich-dad-poor-dad.png','Finance'),(2,'War And Peace','A book about the art of war. How to crush your opponent',23.99,'war-and-peace.jpg','Business'),(3,'Atomic Habits','A book about the different habits of successful people. A deep dive into what you can do to achieve your potential.',15.37,'atomic-habits.jpg','Self Help'),(4,'Million Dollar Weekend','A book by Noah Kagan. The founder and CEO of AppSumo.com, Noah Kagan, knows how to launch a seven-figure business in a single weekend—and he’s done it seven times. Million Dollar Weekend will show you how.\n\nNow is the best time in history for entrepreneurship. More than ever, the world needs new businesses and it’s cheaper than ever to create them.\n\nAnd, let’s be frank: most day jobs suck. People spend too much time doing too much work for too little money—and they know it. They want out.\n\nBut, if the barriers to starting a business are getting lower and lower, why is it SO HARD TO DO for SO MANY PEOPLE? Why are there so many wantrepreneurs playing at business on social media and so few entrepreneurs actually running them?',24.50,'million-dollar-weekend.jpg','Finance'),(5,'Worthy: How to Believe You Are Enough and Transform Your Life','\nWhat has self-doubt already cost you in your life? WORTHY is how you change that.\n \nImagine what you\'d do, if you FULLY believed in YOU! When you stop doubting your greatness, build unshakable self-worth and embrace who you are, you transform your entire life! WORTHY teaches you how, with simple steps that lead to life-changing results!\n\n\"In life, you don\'t soar to the level of your hopes and dreams, you stay stuck at the level of your self-worth. In your business, leadership, relationships, friendships and ambitions, you don\'t rise to what you believe is possible, you fall to what you believe you\'re worthy of. When you build your self-worth, you change your entire life. WORTHY teaches you how. I wrote WORTHY for YOU if you have some self-doubt to destroy and a destiny to fulfill!\" - Jamie Kern Lima\n \nAuthor Jamie Kern Lima\'s first, instant New York Times bestselling book Believe It, captured her journey of going from Denny\'s waitress to billion-dollar entrepreneur by learning to believe in herself. And now her second, much anticipated, upcoming book Worthy, is the playbook for how YOU can believe in YOU! \n \nIf you\'ve ever struggled with self-doubt, felt like you don\'t have what it takes...or that who you truly are isn\'t enough, even if you\'re really good at hiding it from the world, WORTHY  is for you.  If you\'ve been underestimating your talent and gifts, or battle imposter syndrome, WORTHY is for you. If you\'ve been letting fear of failure and rejection hold you back, WORTHY is for you. If you\'ve learned to please others so much that you end up betraying yourself, WORTHY is for you. If you\'re sick and tired of what self-doubt has already cost you in your life, in your goals, in your relationships, and in your hopes and dreams, WORTHY is for you!  If you\'re ready to expand your self-love, ignite your self-confidence and wakeup your self-worth, WORTHY is for you!!\n',18.90,'worthy.jpg','Self Help'),(6,'Stop Overthinking','\n23 Techniques to Relieve Stress, Stop Negative Spirals, Declutter Your Mind, and Focus on the Present (The Path to Calm)',18.90,'stop-overthinking.jpg','Self Help');



DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `review` text,
  PRIMARY KEY (`review_id`),
  KEY `FK_UserReview` (`user_id`),
  KEY `FK_ProductReview` (`product_id`),
  CONSTRAINT `FK_ProductReview` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`),
  CONSTRAINT `FK_UserReview` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
) 



DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) 

