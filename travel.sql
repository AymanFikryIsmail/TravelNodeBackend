-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2019 at 12:39 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `city_photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`, `city_photo`) VALUES
(8, 'luxor', '1560875953825.3145download.jpg'),
(9, 'sharm', '1560876090107.8416download (1).jpg'),
(10, 'cairo', 'cairo.jpg'),
(11, 'alexandria', '1560876518115.5886download (2).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `cid` int(11) NOT NULL,
  `c_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `c_password` varchar(100) NOT NULL,
  `c_phone` text NOT NULL,
  `c_email` varchar(100) NOT NULL,
  `c_location` varchar(200) NOT NULL,
  `c_photo_path` varchar(200) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'company'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`cid`, `c_name`, `c_password`, `c_phone`, `c_email`, `c_location`, `c_photo_path`, `role`) VALUES
(6, 'We Travel', 'wetraveladmindashboard', '01120719197', 'WeTravelApp@gmail.com', 'Alexandria', 'logo.png', 'admin'),
(7, 'book and fly', '123456789', '01234567890', 'fly@gmail.com', 'alexandria', '1560878468882.30881560514438788.3193logo.png', 'company');

-- --------------------------------------------------------

--
-- Table structure for table `company_rate`
--

CREATE TABLE `company_rate` (
  `cid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `value` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_rate`
--

INSERT INTO `company_rate` (`cid`, `pid`, `uid`, `value`) VALUES
(6, 34, 5, 4),
(6, 34, 6, 5),
(6, 34, 7, 5),
(6, 34, 8, 3),
(6, 34, 9, 4),
(6, 35, 7, 3),
(7, 37, 6, 3),
(7, 37, 10, 4);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `pid` int(11) NOT NULL,
  `p_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `travel_from` varchar(100) NOT NULL,
  `travel_to` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `discounted_price` int(11) NOT NULL,
  `avail_tickets` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `date` bigint(20) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `cid` int(11) NOT NULL,
  `addingDate` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`pid`, `p_name`, `travel_from`, `travel_to`, `price`, `discounted_price`, `avail_tickets`, `duration`, `date`, `description`, `cid`, `addingDate`) VALUES
(34, 'Luxor and Aswan', 'alexandria', 'luxor', 2000, 1500, 9, 2, 1561500000000, 'this is oakcage from alex to aswan ', 6, 1561500000000),
(35, 'beautiful luxor ', 'alexandria', 'luxor', 3000, 2500, 8, 4, 1561068000000, 'package aaaaa', 6, 1561068000000),
(36, 'sharm', 'alexandria', 'sharm', 5000, 4000, 4, 5, 1561759200000, 'ggggggg', 6, 1561759200000),
(37, 'luxor', 'alexandria', 'luxor', 7000, 6000, 5, 7, 1561327200000, 'gggggg', 7, 1561327200000);

-- --------------------------------------------------------

--
-- Table structure for table `package_photo`
--

CREATE TABLE `package_photo` (
  `photo_id` int(11) NOT NULL,
  `photo_path` varchar(200) CHARACTER SET utf8 NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package_photo`
--

INSERT INTO `package_photo` (`photo_id`, `photo_path`, `pid`) VALUES
(36, '1560876621755.687download.jpg', 34),
(37, '1560876684069.7803images.jpg', 34),
(38, '1560876687945.4673download (3).jpg', 34),
(39, '1560876760702.1304images.jpg', 35),
(40, '1560876764294.3748download.jpg', 35),
(41, '1560876833784.6978images.jpg', 35),
(42, '1560876898345.0112download (1).jpg', 36),
(43, '1560876916124.8105download (4).jpg', 36),
(44, '1560876936201.8926download (5).jpg', 36),
(45, '1560878540969.36041560876687945.4673download (3).jpg', 37),
(46, '1560878545187.31521560876684069.7803images.jpg', 37),
(47, '1560878551593.80831560876833784.6978images.jpg', 37),
(48, '1560878560300.57711560878540969.36041560876687945.4673download (3).jpg', 37);

-- --------------------------------------------------------

--
-- Table structure for table `suggested_cities`
--

CREATE TABLE `suggested_cities` (
  `suggestedCity_id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_phone` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `token` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `name`, `password`, `email`, `user_phone`, `city`, `token`) VALUES
(5, 'ayman', '123456', 'ayman@gmail.com', '01234567890', 'alex', NULL),
(6, 'Raghda', '123456789', 'raghdahany@gmail.com', '12345678912', 'Alex', NULL),
(7, 'Esraa Rashad', '123456', 'resraa52@gmail.com', '01093882675', 'Alexandria', NULL),
(8, 'aa', '123456', 'a@a.ca', '01234567890', 'alex', NULL),
(9, 'ayman', '123456', 'youssef4242014@gmail.com', '01234567890', 'Alex', NULL),
(10, 'esraa', '1234567', 'resraa52d@gmail.com', '01093882675', 'akex', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_favourite`
--

CREATE TABLE `user_favourite` (
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_favourite`
--

INSERT INTO `user_favourite` (`pid`, `uid`) VALUES
(34, 5),
(34, 8),
(34, 9),
(36, 5),
(36, 7),
(36, 10),
(37, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_package`
--

CREATE TABLE `user_package` (
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `tickets` int(11) NOT NULL,
  `discounted_tickets` int(11) NOT NULL,
  `booking_date` bigint(20) NOT NULL,
  `name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_package`
--

INSERT INTO `user_package` (`pid`, `uid`, `tickets`, `discounted_tickets`, `booking_date`, `name`) VALUES
(34, 5, 1, 2, 1560877666087, 'ayman'),
(34, 5, 2, 1, 1560949185921, 'ayman'),
(34, 6, 1, 1, 1560877654155, 'Raghda Hany'),
(34, 7, 2, 1, 1560877758685, 'esraa rashad'),
(34, 8, 2, 1, 1560933485031, 'aywa '),
(34, 9, 2, 1, 1560941415203, 'ayman'),
(35, 6, 1, 1, 1560877759244, 'Raghda'),
(35, 7, 2, 1, 1560878629635, 'esraa rashad'),
(37, 6, 1, 0, 1560878621067, 'raghda'),
(37, 10, 2, 1, 1560941447441, 'esraa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD UNIQUE KEY `city_name` (`city_name`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `c_location` (`c_location`);

--
-- Indexes for table `company_rate`
--
ALTER TABLE `company_rate`
  ADD PRIMARY KEY (`pid`,`uid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `travel_from` (`travel_from`),
  ADD KEY `travel_to` (`travel_to`);

--
-- Indexes for table `package_photo`
--
ALTER TABLE `package_photo`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `suggested_cities`
--
ALTER TABLE `suggested_cities`
  ADD PRIMARY KEY (`suggestedCity_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_favourite`
--
ALTER TABLE `user_favourite`
  ADD PRIMARY KEY (`pid`,`uid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `user_package`
--
ALTER TABLE `user_package`
  ADD PRIMARY KEY (`pid`,`uid`,`booking_date`),
  ADD KEY `uid` (`uid`),
  ADD KEY `pid` (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `package_photo`
--
ALTER TABLE `package_photo`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `suggested_cities`
--
ALTER TABLE `suggested_cities`
  MODIFY `suggestedCity_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `company_rate`
--
ALTER TABLE `company_rate`
  ADD CONSTRAINT `company_rate_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `company` (`cid`),
  ADD CONSTRAINT `company_rate_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `company_rate_ibfk_3` FOREIGN KEY (`pid`) REFERENCES `packages` (`pid`);

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `company` (`cid`),
  ADD CONSTRAINT `packages_ibfk_2` FOREIGN KEY (`travel_to`) REFERENCES `cities` (`city_name`);

--
-- Constraints for table `package_photo`
--
ALTER TABLE `package_photo`
  ADD CONSTRAINT `package_photo_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `packages` (`pid`);

--
-- Constraints for table `suggested_cities`
--
ALTER TABLE `suggested_cities`
  ADD CONSTRAINT `suggested_cities_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`cid`);

--
-- Constraints for table `user_favourite`
--
ALTER TABLE `user_favourite`
  ADD CONSTRAINT `user_favourite_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `packages` (`pid`),
  ADD CONSTRAINT `user_favourite_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- Constraints for table `user_package`
--
ALTER TABLE `user_package`
  ADD CONSTRAINT `user_package_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `user_package_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `packages` (`pid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
