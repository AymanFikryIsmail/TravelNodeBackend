-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2019 at 06:01 PM
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
(1, 'luxor', 'marse.2.jpg'),
(2, 'cairo', 'aa.jpeg'),
(3, 'alexandria', 'marse.jpg'),
(4, 'sharm elsheikh', '1560544678604.7363.jpg'),
(6, 'wady el rayaan', '1560672608432.0945.4.jpg'),
(7, 'el saheel', '1560672933582.298marse.2.jpg');

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
(1, 'travel', 'admin', '01111111111', 'travel@gg.com', 'alexandria', '26166621_1531556426965955_2487091143597023581_n.jpg', 'admin'),
(3, 'golden bird', 'gggg', '01987654320', 'golden@gmail.com', 'luxor', 'logo.jpg', 'company'),
(4, 'alyashmak', '1234', '01928374651', 'alyashmak@gmail.com', 'alexandria', '1560509609447.14334.jpg', 'company'),
(5, 'Book and Fly', '123456', '01928374656', 'bookandfly@gmail.com', 'alexandria', '1560514438788.3193logo.png', 'company');

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
(1, 5, 2, 5);

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
(5, 'luxor and aswan', 'alexandria', 'luxor', 2000, 1700, 10, 4, 20190831, 'This returns all the dates for each advertisement, concatenated by commas. Where there are no dates in Table2 for a particular advertisment, you\'ll get NULL for the dates column', 1, 20190520142019),
(8, 'أفريكانو بارك', 'alexandria', 'cairo', 180, 120, 23, 3, 20190628, 'أفريكانو باركأفريكانو باركأفريكانو باركأفريكانو باركأفريكانو باركأفريكانو باركأفريكانو باركأفريكانو بارك', 1, 20190610201709),
(20, 'sharm elshaikh', 'alexandria', 'sharm elsheikh', 3000, 2600, 20, 3, 1559512800000, 'olaaaaaaaaaaaaaaav', 1, 0);

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
(1, '1.jpg', 5),
(2, '4.jpg', 5),
(4, '2.jpg', 8),
(9, '1560630111999.51884.jpg', 20),
(10, '1560630115682.41775.1.jpg', 20),
(11, '1560630119119.69025.3.jpg', 20);

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
(1, 'walaa', 'walaa', 'walaa9402@gmail.com', '01120719197', 'alex', NULL),
(2, 'Doaa', 'doaa', 'doaa@gmail.com', 'path3', 'alexandria', NULL),
(4, 'sherif', '', 'sherif@gmail.com', '', '', 'iejfwdkunfkdefshvbnu,nbvtsdkjjucrehf8347hfwuiencjrewbvhiwsfubdcsjdhbcre');

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
(5, 1);

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
(5, 1, 3, 2, 20190529112452, 'Walaa Alaa Sayed'),
(5, 2, 2, 2, 20190601133338, 'Doaa Alaa Sayed');

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
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `package_photo`
--
ALTER TABLE `package_photo`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `suggested_cities`
--
ALTER TABLE `suggested_cities`
  MODIFY `suggestedCity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
