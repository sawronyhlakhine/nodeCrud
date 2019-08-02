-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2018 at 09:51 AM
-- Server version: 5.6.11
-- PHP Version: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `awesomestore`
--
CREATE DATABASE IF NOT EXISTS `awesomestore` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `awesomestore`;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', 'd2c3fa7a02bd4acf4ce1bf39ba039a02', '2018-07-18 16:26:24', '2018-07-18 16:26:24'),
(2, 'LG', '74bbb5fba899185ce04cacd0377d2665', '2018-07-18 16:43:53', '2018-07-18 17:09:44');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `icon`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Caregory 01', 'f7e514332b371bbaaa755c88a5788db9', NULL, '2018-07-17 13:51:22', '2018-07-17 14:30:04'),
(2, 'Category 02', '3fc26bbd850572f43ec466c4ad7f11ea', NULL, '2018-07-17 14:03:06', '2018-07-17 14:03:06');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `type`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Yangon', 2, 0, '2018-07-15 10:24:33', '2018-07-28 15:20:58'),
(2, 'Monywa', 1, 0, '2018-07-15 10:24:33', '0000-00-00 00:00:00'),
(3, 'Mandalay', 1, 0, '2018-07-15 10:42:07', '2018-07-15 10:42:07'),
(4, 'Bago', 1, 0, '2018-07-16 14:06:27', '2018-07-16 14:06:27'),
(5, 'Tarmwe', 0, 0, '2018-07-16 15:21:19', '2018-07-28 15:20:47'),
(7, 'Sanchaung', 1, 0, '2018-07-16 15:56:40', '2018-07-28 15:14:21'),
(8, 'NayPyiTaw', 1, 0, '2018-07-17 12:30:50', '2018-07-17 12:30:50');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `description` longtext,
  `created_by` int(10) unsigned NOT NULL,
  `type` int(11) NOT NULL COMMENT '0=>article, 1=>event/promotion',
  `township_id` int(10) unsigned DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `thumbnail`, `description`, `created_by`, `type`, `township_id`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sample News 01', '6ef0b8b7ba3b4fa99170ceaad46254d5', 'Sample Description', 1, 0, 2, '2018-06-10 00:00:00', '2018-06-10 00:00:00', 1, '2018-07-28 16:06:53', '2018-07-28 16:06:53'),
(2, 'Sample News 02', '34c50b5cca273b3484a6feee20ebe520', 'Sample Description ', 2, 1, 2, '2018-06-10 00:00:00', '2018-06-10 00:00:00', 0, '2018-07-28 16:15:23', '2018-07-28 16:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `thumbnail`, `category_id`, `brand_id`, `price`, `description`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Product 01', '5db69f3fd23fba134b5392f9e1893458', 1, 1, 2000, 'Description', 0, '2018-07-27 14:56:02', '2018-07-28 15:07:18'),
(2, 'Product 02', '35cc043057fb8c298f6d2642348585fe', 1, 2, 20000, 'Sample Description', 0, '2018-07-28 14:59:12', '2018-07-28 15:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT '1' COMMENT '1=>Customer, 2 => Staff, 3 => Admin',
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`phone`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `photo`, `email`, `password`, `phone`, `role`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Amin01', NULL, 'thandarkhine85@gmail.com', '$2a$10$HmLHN6OwiHM2XYfwtY7zxe0LWoEdOd0Snp5jkbFT2hv6qZzODxEPm', '09787171674', 3, 'Tarmwe', '2018-07-19 17:19:55', '2018-07-28 09:46:35'),
(2, 'Admin02', NULL, 'admin02@gmail.com', '$2a$10$123Qb8.YWJ5dova03FVBVuTswoKCTgKwaleUcdUGmt1MPps1lOufK', '123456', 1, 'Tarmwe', '2018-07-20 14:04:10', '2018-07-28 14:18:05');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
