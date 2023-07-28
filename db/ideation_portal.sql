-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2023 at 12:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ideation_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `camp_id` varchar(300) NOT NULL,
  `camp_startdate` date DEFAULT NULL,
  `camp_enddate` date DEFAULT NULL,
  `vote_enddate` date NOT NULL,
  `manage_enddate` date NOT NULL,
  `camp_owner` varchar(30) DEFAULT NULL,
  `camp_title` varchar(300) NOT NULL,
  `camp_users` int(200) NOT NULL,
  `no_of_ideas` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `camp_id`, `camp_startdate`, `camp_enddate`, `vote_enddate`, `manage_enddate`, `camp_owner`, `camp_title`, `camp_users`, `no_of_ideas`) VALUES
(37, 'C0', '2023-07-01', '2023-07-03', '2023-07-05', '2023-07-06', 'Nishi Singh', 'How can we minimize flight delays and cancellations to improve customer satisfaction and on-time performance?', 3, 0),
(38, 'C1', '2023-07-03', '2023-07-05', '2023-07-06', '2023-07-08', 'Nishi Singh', 'What strategies can be implemented to reduce mishandled baggage incidents and enhance the efficiency of baggage handling processes?', 5, 0),
(39, 'C2', '2023-07-03', '2023-07-05', '2023-07-08', '2023-07-09', 'Nishi Singh', 'How can we enhance security measures and ensure passenger safety throughout their journey?', 5, 0),
(40, 'C3', '2023-07-04', '2023-07-06', '2023-07-08', '2023-07-10', 'Ritu', 'How to apply for a VISA?', 3, 0),
(41, 'C4', '2023-07-10', '2023-07-12', '2023-07-13', '2023-07-15', 'Ritu', 'How can we foster a more diverse and inclusive workforce to promote a positive company culture and enhance employee satisfaction?', 3, 0),
(42, 'C5', '2023-07-10', '2023-07-13', '2023-07-15', '2023-07-17', 'Nishi Singh', 'How to create a great travel experience for the passengers?', 3, 0),
(43, 'C6', '2023-07-12', '2023-07-15', '2023-07-17', '2023-07-19', 'Ritu', 'How can we stay compliant with evolving aviation regulations and adapt our operations to meet new industry standards?', 3, 0),
(44, 'C10', '2023-07-24', '2023-07-27', '2023-07-28', '2023-07-29', 'Nishi Singh', 'How can we better handle irregular operations, such as flight cancellations and diversions, to minimize the impact on passengers and maintain our reputation?', 3, 0),
(45, 'C11', '2023-07-23', '2023-07-26', '2023-07-27', '2023-07-28', 'Ritu', 'How can we improve website load times and performance to enhance user experience and reduce bounce rates?', 3, 0),
(46, 'C12', '2023-07-24', '2023-07-26', '2023-07-27', '2023-07-29', 'Ritu', 'What measures can we implement to enhance cybersecurity and protect customer data from potential breaches and cyberattacks?', 3, 0),
(47, 'C22', '2023-07-22', '2023-07-27', '2023-07-28', '2023-07-29', 'Ritu', 'How can we optimize mobile app user interfaces to increase user engagement and retention?', 1, 0),
(48, 'C23', '2023-07-24', '2023-07-27', '2023-07-29', '2023-07-30', 'James', 'What is the best approach to establish a reliable backup and disaster recovery solution to safeguard critical business data?', 1, 0),
(49, 'C24', '2023-07-24', '2023-07-26', '2023-07-28', '2023-07-30', 'Nishi Singh', 'How can we streamline software development processes to accelerate product delivery and reduce time-to-market?', 1, 0),
(50, 'C25', '2023-07-20', '2023-07-26', '2023-07-27', '2023-07-28', 'Nishi Singh', 'What strategies should we adopt to address compatibility issues across different devices and platforms for seamless user experiences?', 1, NULL),
(51, 'C35', '2023-07-22', '2023-07-27', '2023-07-29', '2023-08-01', 'James ', 'How can we enhance data analytics capabilities to derive actionable insights and make informed business decisions?', 1, NULL),
(52, 'C36', '2023-07-25', '2023-07-28', '2023-07-30', '2023-08-03', 'James', 'What steps can we take to reduce system downtime and promptly resolve technical issues to minimize service disruptions?', 1, NULL),
(53, 'C38', '2023-07-19', '2023-07-26', '2023-07-31', '2023-08-05', 'Nishi Singh', 'How can we leverage AI-driven automation to increase operational efficiency and reduce manual tasks?', 1, 0),
(54, 'C44', '2023-07-27', '2023-07-28', '2023-07-29', '2023-07-30', 'Nishi Singh', 'How to reduce QA cycle time?', 3, 0),
(55, 'C20', '2023-07-28', '2023-07-30', '2023-08-02', '2023-09-04', 'Nishi Singh', 'How to maintain high customer satisfaction?', 4, 0),
(56, 'C48', '2023-07-28', '2023-07-29', '2023-08-01', '2023-09-07', 'Nishi Singh', 'How to accelerate product delivery?', 5, 0),
(57, 'C33', '2023-07-28', '2023-07-31', '2023-08-02', '2023-09-08', 'Nishi Singh', 'How to bake a cake?', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `campaign_links`
--

CREATE TABLE `campaign_links` (
  `id` int(11) NOT NULL,
  `token` varchar(100) NOT NULL,
  `campaign_id` varchar(500) NOT NULL,
  `end_date` date NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign_links`
--

INSERT INTO `campaign_links` (`id`, `token`, `campaign_id`, `end_date`, `email`) VALUES
(45, 'a86780f69f7d0bf26219f368dcf572909f23bc47', 'C0', '2023-07-05', 'nishisingh1028@gmail.com'),
(46, '6b4deb280311cd8dd56e3dd0c95416cf750d63b1', 'C0', '2023-07-03', 'nishisingh1028@gmail.com'),
(47, '9bca82def6bd1967e43f96a7d2229675b38a2d36', 'C0', '2023-07-06', 'nishisingh1028@gmail.com'),
(48, '3feca7b2ab5b3d68f913077b44e246f1dfff13e3', 'C1', '2023-07-06', 'nishisingh1028@gmail.com'),
(49, '4adc76f8cb0094f00a35b2ccdc5b077569887834', 'C1', '2023-07-06', 'ritunishidhruv@gmail.com'),
(50, 'c5d372da7b763102c5c4ba90c1cbca770a5f1f88', 'C1', '2023-07-05', 'nishisingh1028@gmail.com'),
(51, '91c2d58e9a8eb60262e6592d2e1a3453b1598cff', 'C1', '2023-07-08', 'user1@gmail.com'),
(52, 'acd79e9cd6924f640a376e21808b94b05b4eca62', 'C1', '2023-07-08', 'ritunishidhruv@gmail.com'),
(53, 'b20adc046246b58c490d3a06966d62238a298a2a', 'C2', '2023-07-08', 'user1@gmail.com'),
(54, '4e9296e511d37cf1f1042d7da8d86df2c3172074', 'C2', '2023-07-08', 'user2@gmail.com'),
(55, '608411d512726003c0eef8ab52fc58c852fd53ef', 'C2', '2023-07-05', 'user1@gmail.com'),
(56, 'e2cae4ce27011fe983270785a686a432935d4890', 'C2', '2023-07-05', 'ritunishidhruv@gmail.com'),
(57, '349e7bccb8c0e11083028ef0a27e93fcaf2f7cf7', 'C2', '2023-07-09', 'nishisingh1028@gmail.com'),
(58, '7ce783e5fb2a45af5a0734150b595072339ea209', 'C3', '2023-07-08', 'ritunishidhruv@gmail.com'),
(59, '16e88933478d4223c5d5eabdede6be5099232be1', 'C3', '2023-07-06', 'nishisingh1028@gmail.com'),
(60, '8e0599d279aea6df7e9f80fc59331b12cfec847f', 'C3', '2023-07-10', 'nishisingh1028@gmail.com'),
(61, '6e62534c38a7c0bf1c8a85ac2d1a045f028b2191', 'C4', '2023-07-13', 'nishisingh1028@gmail.com'),
(62, 'd181e0ac998436e7b69662edfef9818ed2650d30', 'C4', '2023-07-12', 'ritunishidhruv@gmail.com'),
(63, '71c72354d81b81ffdce126cfdcf33bfa6c7f6870', 'C4', '2023-07-15', 'nishisingh1028@gmail.com'),
(64, '2455204ce17099ba4bb15819d68b0d1735a57577', 'C5', '2023-07-15', 'ritunishidhruv@gmail.com'),
(65, '169c7f85c0ab3cb779fb6f02e3b4fb8a2f2aa026', 'C5', '2023-07-13', 'nishisingh1028@gmail.com'),
(66, '503d1836ba6919afdc72646b6d851f6050f00bfd', 'C5', '2023-07-17', 'ritunishidhruv@gmail.com'),
(67, 'a5f154753fe235c2977d45db227a3103285b434f', 'C6', '2023-07-17', 'nishisingh1028@gmail.com'),
(68, '441cad006e757069d5135ea2eb23d28b7c2b151a', 'C6', '2023-07-15', 'ritunishidhruv@gmail.com'),
(69, 'cfd48f89cbb4d2b62366944ed5f5540796f055b8', 'C6', '2023-07-19', 'nishisingh1028@gmail.com'),
(70, '538473159521e64cde008eace0fcfb71a11c99ee', 'C10', '2023-07-28', 'nishisingh1028@gmail.com'),
(71, '7851bd369f4997a96b918a1b648a136624bb93f1', 'C10', '2023-07-27', 'nishisingh1028@gmail.com'),
(72, '8476e3768196fa0867648f5d0a091257b4b9af0a', 'C10', '2023-07-29', 'nishisingh1028@gmail.com'),
(73, '3286c79f9f17d03c4cd6e82c9d76b542e9563e60', 'C11', '2023-07-27', 'nishisingh1028@gmail.com'),
(74, 'de019badfc0a4b0f79b53e72de951dbe72561cb9', 'C11', '2023-07-26', 'nishisingh1028@gmail.com'),
(75, 'dd74c50eefdce3367368f35bab1cfba7a3d380c6', 'C11', '2023-07-28', 'nishisingh1028@gmail.com'),
(76, '58cc09c14726930f64ced5d6931461705e844d19', 'C12', '2023-07-27', 'nishisingh1028@gmail.com'),
(77, '8ab2b051b24889fbf0ea78a9c8b38cf971e978ac', 'C12', '2023-07-26', 'nishisingh1028@gmail.com'),
(78, 'e9bbcbfa419b2a36f16fe667a2220bdac090cbd5', 'C12', '2023-07-29', 'nishisingh1028@gmail.com'),
(79, '33c8348520699421335f2e432d1025e3fafbd6cc', 'C22', '2023-07-27', 'nishisingh1028@gmail.com'),
(80, '1964500c2fb8cd5cfeaa65b8ba7aab2b2291a656', 'C23', '2023-07-29', 'nishisingh1028@gmail.com'),
(81, '370941758119b1bc0134d04e90a41bfddfabe0da', 'C24', '2023-07-30', 'nishisingh1028@gmail.com'),
(82, '5d2130927aacdb29795df91c2c8b73bdc0962655', 'C44', '2023-07-29', 'nishisingh1028@gmail.com'),
(83, '2c72d57a4d21c1fb762a2f8522ac07b7b1fc8a4e', 'C44', '2023-07-28', 'nishisingh1028@gmail.com'),
(84, 'd19713eb6d5320a952da7b3949df11b044e2920f', 'C44', '2023-07-30', 'nishisingh1028@gmail.com'),
(85, '9f0559199bdf59e74412cad64fb493c074216e41', 'C20', '2023-09-04', 'user1@gmail.com'),
(86, '30eec5df30624e04efeb9ad38d0186c52418ac62', 'C20', '2023-09-04', 'user2@gmail.com'),
(87, 'eaa27f49185f74b95da75ec6a80a3d8ffb29d931', 'C20', '2023-09-04', 'ritunishidhruv@gmail.com'),
(88, '3b804e317d9786ec33d24ea9c968178d131db969', 'C20', '2023-09-04', 'user2@gmail.com'),
(89, '53fdee86d7fcff9b5f9f74b212a8a166530f13c4', 'C48', '2023-09-07', 'ritunishidhruv@gmail.com'),
(90, 'c09d92eeab6b8fe956d4e0116965c89bd7672692', 'C48', '2023-09-07', 'user1@gmail.com'),
(91, 'a6a1801319c50e162f58a6e7c7b4005f92742f2c', 'C48', '2023-09-07', 'ritunishidhruv@gmail.com'),
(92, '0581d3a8b3499889b7c5a4c1c05a0950bf11ac75', 'C48', '2023-09-07', 'user1@gmail.com'),
(93, 'dc2ce226c4dbc1e9c270366e0ebdaef7cd38a699', 'C48', '2023-09-07', 'user2@gmail.com'),
(94, '1e2d87558f25f459cc6d67e1e6fc4ddc03a182bf', 'C33', '2023-09-08', 'user1@gmail.com'),
(95, '33c0e2ed8b54747ec590b7af41c43b9f176bd0d5', 'C33', '2023-09-08', 'ritunishidhruv@gmail.com'),
(96, '31e178dd8bb8e923c5943746d3ac16ea38763a0c', 'C33', '2023-09-08', 'user2@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_user`
--

CREATE TABLE `campaign_user` (
  `id` int(11) NOT NULL,
  `camp_id` varchar(400) NOT NULL,
  `camp_user_email` varchar(10000) NOT NULL,
  `camp_user_role` varchar(60) NOT NULL,
  `camp_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign_user`
--

INSERT INTO `campaign_user` (`id`, `camp_id`, `camp_user_email`, `camp_user_role`, `camp_timestamp`) VALUES
(71, 'C0', 'nishisingh1028@gmail.com', 'I', '2023-07-25 08:40:28'),
(72, 'C0', 'nishisingh1028@gmail.com', 'V', '2023-07-25 08:40:28'),
(73, 'C0', 'nishisingh1028@gmail.com', 'M', '2023-07-25 08:40:28'),
(74, 'C1', 'nishisingh1028@gmail.com', 'I', '2023-07-25 08:42:53'),
(75, 'C1', 'nishisingh1028@gmail.com', 'V', '2023-07-25 08:42:53'),
(76, 'C1', 'ritunishidhruv@gmail.com', 'V', '2023-07-25 08:42:53'),
(77, 'C1', 'user1@gmail.com', 'M', '2023-07-25 08:42:53'),
(78, 'C1', 'ritunishidhruv@gmail.com', 'M', '2023-07-25 08:42:53'),
(79, 'C2', 'user1@gmail.com', 'I', '2023-07-25 09:13:58'),
(80, 'C2', 'ritunishidhruv@gmail.com', 'I', '2023-07-25 09:13:58'),
(81, 'C2', 'user1@gmail.com', 'V', '2023-07-25 09:13:58'),
(82, 'C2', 'user2@gmail.com', 'V', '2023-07-25 09:13:58'),
(83, 'C2', 'nishisingh1028@gmail.com', 'M', '2023-07-25 09:13:58'),
(84, 'C3', 'nishisingh1028@gmail.com', 'I', '2023-07-25 09:18:16'),
(85, 'C3', 'ritunishidhruv@gmail.com', 'V', '2023-07-25 09:18:16'),
(86, 'C3', 'nishisingh1028@gmail.com', 'M', '2023-07-25 09:18:16'),
(87, 'C4', 'ritunishidhruv@gmail.com', 'I', '2023-07-25 09:20:41'),
(88, 'C4', 'nishisingh1028@gmail.com', 'V', '2023-07-25 09:20:41'),
(89, 'C4', 'nishisingh1028@gmail.com', 'M', '2023-07-25 09:20:41'),
(93, 'C5', 'nishisingh1028@gmail.com', 'I', '2023-07-25 09:24:03'),
(94, 'C5', 'ritunishidhruv@gmail.com', 'V', '2023-07-25 09:24:03'),
(95, 'C5', 'ritunishidhruv@gmail.com', 'M', '2023-07-25 09:24:03'),
(99, 'C6', 'ritunishidhruv@gmail.com', 'I', '2023-07-25 09:41:46'),
(100, 'C6', 'nishisingh1028@gmail.com', 'V', '2023-07-25 09:41:46'),
(101, 'C6', 'nishisingh1028@gmail.com', 'M', '2023-07-25 09:41:46'),
(102, 'C10', 'nishisingh1028@gmail.com', 'I', '2023-07-25 11:52:33'),
(103, 'C10', 'nishisingh1028@gmail.com', 'V', '2023-07-25 11:52:33'),
(104, 'C10', 'nishisingh1028@gmail.com', 'M', '2023-07-25 11:52:33'),
(105, 'C11', 'nishisingh1028@gmail.com', 'I', '2023-07-25 12:41:57'),
(106, 'C11', 'nishisingh1028@gmail.com', 'V', '2023-07-25 12:41:57'),
(107, 'C11', 'nishisingh1028@gmail.com', 'M', '2023-07-25 12:41:57'),
(108, 'C12', 'nishisingh1028@gmail.com', 'V', '2023-07-25 12:45:30'),
(109, 'C12', 'nishisingh1028@gmail.com', 'I', '2023-07-25 12:45:30'),
(110, 'C12', 'nishisingh1028@gmail.com', 'M', '2023-07-25 12:45:30'),
(111, 'C22', 'nishisingh1028@gmail.com', 'I', '2023-07-25 12:47:50'),
(112, 'C23', 'nishisingh1028@gmail.com', 'V', '2023-07-25 12:47:50'),
(113, 'C24', 'nishisingh1028@gmail.com', 'M', '2023-07-25 12:47:50'),
(114, 'C25', 'nishisingh1028@gmail.com', 'I', '2023-07-25 13:01:09'),
(115, 'C35', 'nishisingh1028@gmail.com', 'I', '2023-07-25 13:01:09'),
(116, 'C36', 'nishisingh1028@gmail.com', 'I', '2023-07-25 13:01:09'),
(117, 'C38', 'nishisingh1028@gmail.com', 'I', '2023-07-25 13:02:40'),
(118, 'C25', 'nishisingh1028@gmail.com', 'V', '2023-07-25 13:51:20'),
(119, 'C44', 'nishisingh1028@gmail.com', 'I', '2023-07-27 08:27:35'),
(120, 'C44', 'nishisingh1028@gmail.com', 'V', '2023-07-27 08:27:35'),
(121, 'C44', 'nishisingh1028@gmail.com', 'M', '2023-07-27 08:27:35'),
(123, 'C20', 'ritunishidhruv@gmail.com', 'I', '2023-07-28 09:01:20'),
(124, 'C20', 'user2@gmail.com', 'M', '2023-07-28 09:01:20'),
(125, 'C20', 'user1@gmail.com', 'V', '2023-07-28 09:01:20'),
(126, 'C20', 'user2@gmail.com', 'V', '2023-07-28 09:01:20'),
(127, 'C48', 'ritunishidhruv@gmail.com', 'I', '2023-07-28 09:08:18'),
(128, 'C48', 'ritunishidhruv@gmail.com', 'V', '2023-07-28 09:08:18'),
(129, 'C48', 'user1@gmail.com', 'V', '2023-07-28 09:08:18'),
(130, 'C48', 'user1@gmail.com', 'M', '2023-07-28 09:08:19'),
(131, 'C48', 'user2@gmail.com', 'M', '2023-07-28 09:08:19'),
(132, 'C33', 'ritunishidhruv@gmail.com', 'I', '2023-07-28 10:19:35'),
(133, 'C33', 'user1@gmail.com', 'V', '2023-07-28 10:19:35'),
(134, 'C33', 'user2@gmail.com', 'M', '2023-07-28 10:19:35');

-- --------------------------------------------------------

--
-- Table structure for table `ideas`
--

CREATE TABLE `ideas` (
  `id` int(11) NOT NULL,
  `camp_id` varchar(1000) NOT NULL,
  `idea_title` varchar(300) NOT NULL,
  `idea_summary` varchar(1000) NOT NULL,
  `idea_description` varchar(10000) NOT NULL,
  `email` varchar(200) NOT NULL,
  `votes` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ideas`
--

INSERT INTO `ideas` (`id`, `camp_id`, `idea_title`, `idea_summary`, `idea_description`, `email`, `votes`) VALUES
(58, 'C10', 'Proactive Communication Hub', 'The Proactive Communication Hub is a centralized platform designed to provide real-time updates and alternative travel options to passengers during irregular operations, such as flight cancellations and diversions. This idea addresses one of the most common pain points for passengers - lack of timely and accurate information when facing disruptions in their travel plans.\n\nThe Proactive Communication Hub will leverage advanced technologies, including Artificial Intelligence (AI) and data analytics, to monitor flight statuses, weather conditions, airport operations, and other relevant factors that can affect flight schedules. This data will be continuously analyzed to identify potential disruptions or irregular operations.', 'The implementation of the Proactive Communication Hub will involve several key steps, from technology integration to process streamlining and employee training.\n\nTechnology Integration:\nThe airline company will need to invest in robust IT infrastructure and software development to create the Proactive Communication Hub. This will include data integration from various sources, AI algorithms for data analysis, and seamless connectivity with the airline\'s reservation and flight management systems. A team of skilled developers, data scientists, and IT specialists will be required to build and maintain the platform.\n\nData Collection and Analysis:\nTo ensure accurate and timely notifications, the hub must collect and process vast amounts of data. This includes real-time flight data, weather forecasts, air traffic information, and historical performance metrics. The AI algorithms will analyze this data to predict potential disruptions and identify optimal alternative travel options for affected passengers.\n\nCommunication Channels and Personalization:\nThe platform will support multiple communication channels, including SMS, email, mobile app notifications, and social media. The passenger\'s communication preferences will be stored securely and used to deliver notifications in their preferred format. Personalization will extend to tailoring notifications based on the passenger\'s travel history, loyalty status, and special needs.\n\nCrisis Management Protocol:\nThe airline will develop a comprehensive crisis management protocol that outlines the roles and responsibilities of various stakeholders during irregular operations. This includes the communication team, ground staff, customer service representatives, and social media managers. Clear guidelines for handling specific scenarios and passenger queries will be provided to ensure consistent and efficient responses.', 'nishisingh1028@gmail.com', 5),
(59, 'C10', 'Dynamic Resource Allocation System', 'The dynamic resource allocation system will enable the airline to swiftly respond to irregular operations by reallocating resources for prompt resolution and improved passenger experience.', 'Implement an AI-powered resource allocation system that optimizes crew, aircraft, and ground staff deployment during irregular operations. This system will ensure efficient utilization of resources to expedite recovery and reduce passenger inconvenience.', 'nishisingh1028@gmail.com', 2),
(60, 'C10', 'Contingency Travel Packages', 'Contingency travel packages will provide passengers with a seamless experience during irregular operations, offering them essential services and amenities for added comfort.\nContingency travel packages will provide passengers with a seamless experience during irregular operations, offering them essential services and amenities for added comfort.\nContingency travel packages will provide passengers with a seamless experience during irregular operations, offering them essential services and amenities for added comfort.', 'Introduce customized contingency travel packages for affected passengers, including accommodation, transportation, and meal vouchers during extended flight disruptions. These packages will be tailored to cater to individual needs and preferences.\nIntroduce customized contingency travel packages for affected passengers, including accommodation, transportation, and meal vouchers during extended flight disruptions. These packages will be tailored to cater to individual needs and preferences.\nIntroduce customized contingency travel packages for affected passengers, including accommodation, transportation, and meal vouchers during extended flight disruptions. These packages will be tailored to cater to individual needs and preferences.', 'nishisingh1028@gmail.com', 3),
(61, 'C10', 'Automated Rebooking Assistance', 'The automated rebooking assistance will save time and effort for passengers by swiftly rescheduling them on suitable alternative flights, reducing stress and inconvenience.', 'Develop an automated rebooking system that proactively rebooks passengers on alternative flights in case of cancellations or diversions. The system will take into account passenger preferences and flight availability for hassle-free reaccommodation.', 'nishisingh1028@gmail.com', 5),
(62, 'C10', 'Rapid Ground Transport Solutions', 'Rapid ground transport solutions will facilitate smooth travel for passengers affected by irregular operations, reducing delays and maintaining the airline\'s reputation for customer care.', 'Partner with local ground transport providers to establish swift and efficient ground transport solutions for affected passengers to their intended destinations. These arrangements will ensure a smooth continuation of their journey.', 'nishisingh1028@gmail.com', 2),
(63, 'C10', 'Passenger Care Teams', 'The introduction of passenger care teams will enhance the level of support and care provided to affected passengers during flight cancellations and diversions.', 'Deploy dedicated passenger care teams equipped with communication devices at airports to provide personalized assistance to affected travelers. These teams will address queries, concerns, and special needs during irregular operations.', 'nishisingh1028@gmail.com', 1),
(64, 'C10', 'Flexible Travel Policies', 'Flexible travel policies will empower passengers to adjust their travel plans without financial repercussions during unforeseen events, fostering goodwill and trust.', 'Revise and promote flexible travel policies that allow passengers to reschedule their flights without penalties during irregular operations. This customer-centric approach will enhance passenger confidence and loyalty.', 'nishisingh1028@gmail.com', 1),
(65, 'C10', 'Real-Time Flight Tracking and Status Updates', 'Real-time flight tracking and status updates will enable passengers to stay informed about their flights, making it easier to adjust their plans in case of irregular operations.', 'Enhance the airline\'s mobile app with real-time flight tracking and status updates, allowing passengers to receive timely information about their flight\'s progress and any potential disruptions.', 'nishisingh1028@gmail.com', 2),
(66, 'C10', 'Communication Training for Staff', 'Communication training for staff will equip them with the skills to handle challenging situations during irregular operations, leading to better passenger interactions and satisfaction.', 'Provide comprehensive communication training to frontline staff to ensure empathetic and efficient communication with passengers during irregular operations. This will help manage expectations and maintain a positive passenger experience.', 'nishisingh1028@gmail.com', 4),
(67, 'C10', 'Onboard Passenger Amenities', 'Onboard passenger amenities will create a more comfortable and enjoyable experience for passengers during irregular operations, fostering a positive perception of the airline.', 'Enhance onboard amenities, such as providing complimentary snacks, beverages, and entertainment during extended flight delays or diversions, to improve the onboard experience for affected passengers.', 'nishisingh1028@gmail.com', 1),
(68, 'C10', 'Customer Feedback Loop', 'The customer feedback loop will enable the airline to continuously improve its response to irregular operations and address passenger concerns effectively.', 'Establish a customer feedback loop to gather insights and suggestions from passengers who experienced irregular operations. Analyze this feedback to identify areas of improvement and implement necessary changes.', 'nishisingh1028@gmail.com', 3),
(69, 'C10', 'Collaboration with Partner Airlines', 'Collaborating with partner airlines will offer passengers a wider range of alternative flights, enhancing the airline\'s capacity to handle irregular operations smoothly.', 'Establish strategic partnerships with other airlines to create mutual rebooking agreements during irregular operations. This collaboration will provide passengers with more rebooking options, minimizing disruptions.', 'nishisingh1028@gmail.com', 1),
(70, 'C44', 'Automation', 'Automation', 'Automation', 'nishisingh1028@gmail.com', 5),
(71, 'C44', 'ontinuous Integration and Continuous Deployment (CI/CD)', 'ontinuous Integration and Continuous Deployment (CI/CD)', 'ontinuous Integration and Continuous Deployment (CI/CD)', 'nishisingh1028@gmail.com', 0),
(72, 'C33', 'Please search on youtube and chat gpt', 'Please search on youtube', 'Please search on youtube', 'ritunishidhruv@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `selected_ideas`
--

CREATE TABLE `selected_ideas` (
  `id` int(11) NOT NULL,
  `camp_id` varchar(300) NOT NULL,
  `idea_id` int(11) NOT NULL,
  `email` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selected_ideas`
--

INSERT INTO `selected_ideas` (`id`, `camp_id`, `idea_id`, `email`) VALUES
(4, 'C10', 58, 'nishisingh1028@gmail.com'),
(5, 'C10', 68, 'nishisingh1028@gmail.com'),
(6, 'C10', 63, 'nishisingh1028@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('1ba8CuzRlszHzz77Qm0q6yEIvGBtfeZ8', 1690556361, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T14:59:20.871Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('2LqhuI9t6_NaZ1kI00dqjsAkt3LbS-HW', 1690606883, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:01:22.528Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('2O4GLk_KV9jzJuaZIIfdgYCn__v8USxS', 1690614937, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T07:15:36.997Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('2fmtxUWwv0VgK4tudNpHAo-whbVuLEn8', 1690566400, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T17:46:40.186Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('2tyXKydI7RCpjGiRhWHH-4iidjFeSKNM', 1690613802, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:56:42.046Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('4bxt2H0u10_jVPYJVI8uK5EoCUc6L3sU', 1690607416, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:10:15.860Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('7iTJIbBkocKERydcXJaG0HZhgdUpDZOX', 1690608310, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:25:10.085Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('7kci9cYEjhh8LgDCFn3qWYbiRHq3yIoy', 1690540871, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:41:11.483Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('9lPo80BSinwBIA_93dlZhCQDsRq972Uq', 1690540420, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:33:39.860Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('BBzQNunQPWexj8h6quMYB10czNRalvUd', 1690613720, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:55:19.954Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('CVTejcHvwD8aH9iyddtqXQE2L1krI1bq', 1690606668, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T04:57:48.005Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('EHUSuUy63RfOdlxpQJbZXjz4wh3FZUGs', 1690602541, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-07-29T03:49:00.570Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('EMltWo_23jrfGGedVO0p-UZAEktP7oJB', 1690601710, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:35:09.732Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('EshnKkRAul7y4iNaHrQPE3KqvxpW5yGL', 1690605810, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T04:43:29.760Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('F6s0UxpIp6FaSkTNU9cjswBwEb9uhjxo', 1690541207, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:46:46.999Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('FJP-dgKfiI09QpgttoksFSFigzXkN-7D', 1690539934, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:25:33.791Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('Fh_VKgN4jHGSxK-DX93xpdT9LzRRoE_t', 1690622029, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T09:13:48.510Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('Fiu8v4A9vDDQU_KiB-BXXlNE7HOqX598', 1690607090, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:04:50.387Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('G12FgOUqhXEkdvlvpGEP72aJChUlPvWf', 1690543796, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T11:29:55.799Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('H9Ez2BowBm7rEBinc6PHJC24KhnRWYI2', 1690556340, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T14:58:59.772Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('HCmr5EeLTRAfx2ptNqDr3gkIVx8oQy9W', 1690602344, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:45:43.679Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('IFxz2VXtxqPYhD2le9Cyr3-eCBIXM8OS', 1690624043, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T09:47:23.213Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('IjdimKNFr6-OB_0Fy0Gf9DrPLat7ahpK', 1690609890, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:51:30.230Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('J29fAD5FJ6KfTQnWzWk7DMmrVqBd7mr0', 1690540149, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:29:08.563Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('JRXHyCm-9ce5jAlcxYmaKqt_aPVXePy9', 1690541272, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:47:51.746Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('KRP4tQKqxGh5LWsFAtT5VVtrt2lCpndn', 1690556524, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T15:02:04.262Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('Krjq53-9jDyRNvyxGWU3xWI4qB9Vv0Ya', 1690626235, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T10:23:55.406Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('LntdRu1DOoRe2SCr0Wm6E_M0HY96PQZP', 1690612080, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:28:00.294Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('N64Y1iCALyMMaOizGToJRoI36t9rnPxG', 1690542349, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T11:05:48.937Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('O_aRQmkhSQyiwr63pD8vnZBLvQc_1AWz', 1690625734, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T10:15:34.273Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('P2c5hbOKUP0zn1VTvTAC4tlNDLAG1cOr', 1690613205, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:46:44.835Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('PZhUMsgGx5KlPr4vUUlNLHtGxSgrHBI_', 1690540698, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:38:17.842Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('PpT6DKkSalIQH7FMw_YCs-dHXzqgZ7l-', 1690602045, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:40:45.479Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('PuPG1UefNzamXAQDKyy2fcnkn5_S2rSq', 1690567131, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T17:58:51.001Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('Q3UTltGFS_p-1a7ILU3k14d6NllV4yO3', 1690621870, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T09:11:10.164Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('RQDG56UjediHPURI8WCJrPOml5uCP842', 1690626100, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T10:21:40.281Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('Svsw8xb8vFKCDArF8gzQqyTVLWWeVDmE', 1690540056, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:27:36.300Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('UA2wRg50jdRWGb_W9nwa0uwvuB9pGxDq', 1690540267, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:31:07.285Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('UNUUerYbmwuKfrWrQqTf_Tje1hKhYGem', 1690611943, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:25:42.735Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('V-Pt2-UwhMIY7DxwmefYdujJHB1S2Sep', 1690540154, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:29:14.379Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('WKfM_fgLVgIlnbZ3qQFo4s9VSCVWI2um', 1690553854, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T14:17:34.048Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('X2tjZ8IYZ5qbSIJ3uNE3K3CxNSRrX56_', 1690567102, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T17:58:22.229Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('XESAscnqTy5Cy0Vroiu739NkiKaqrWl4', 1690611166, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:12:46.498Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('Y1WMICR8gOjTBOehqEeeX2h4V1vUQGVP', 1690555014, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T14:36:53.858Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('YNYD8EmvA1t7SeLR9RssA25I6SA_d68j', 1690601747, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:35:47.208Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('YftDbrsj53caXyxA730iJhK-_dxUCmwV', 1690540159, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:29:18.758Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('aY3S3cPE02wgOQf8FB0Eg1wqzQV0gnte', 1690614310, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T07:05:10.177Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('ajoKRQ1wczfUseRNMd48Ld4AKq5FseBv', 1690602775, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:52:55.095Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('bUzdKqCdSISAqC1O9BS1IxZcYefg6Snm', 1690611095, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:11:34.708Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('cARJOxcelInYeYuLOO5kEaZD5YbH0Soo', 1690607468, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:11:08.423Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('gtCLmiteAj4VJHgyIWj1aIVSgXsLDudN', 1690612881, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:41:20.560Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('ikX3Td6zvKBTnNUYmiiegYtz06JhtuVx', 1690556639, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T15:03:59.141Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('jGAbfyjdK1qcfz6YPuSp22XpVe3Abiwg', 1690540503, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:35:03.471Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('jJ_rn7r09jSkBKBU7Cfk1c0XtAkEHRSu', 1690613528, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:52:08.037Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('js9OYmpjfhqoDYhw_ojgXrFon0AQEs7u', 1690607807, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:16:46.963Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('m9WQYVjeshXXDbr9We1zJC63AEPldOJf', 1690550947, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T13:29:07.338Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('n5KqspfjIiuc7Wlgat1JTYybDIkPS1Fl', 1690611189, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:13:08.600Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('sMclJTmlBYXxGXkCQB1dVA9dvoluoNel', 1690608399, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T05:26:39.245Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('sX14BMdEIbBjRn62uV2uIXvvWp1wVnpZ', 1690540175, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:29:34.794Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('spbp35f2c5APjnswL8Hn0pI7yeprrkrh', 1690613228, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T06:47:07.776Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('tQUDEzObz9OtGDIyKkQy_uCF1FSNm_Nw', 1690540969, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:42:49.089Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('uHKhnwRnNwEYEx1_XVe6xwmWQUsIuBoM', 1690614028, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T07:00:27.718Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('umMr04LBUQi7hz-VQjKdLg6bS0-jatEk', 1690567083, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T17:58:03.277Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('vBoECLZg42Kjpb3-0dULRlTlgK-BKOxV', 1690540571, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T10:36:10.891Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('wagN04V1tjFdKxtxLOXqJUpC3dKNbNkN', 1690602100, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-29T03:41:39.660Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Ritu \",\"userRole\":\"user\"}'),
('yBgYE-h8offzjnS---E3daC90xt84DM-', 1690554021, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T14:20:21.064Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}'),
('ykeTCrwLW3fyWiyUXDO_INgO4n2mEFYx', 1690551359, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-28T13:35:59.112Z\",\"httpOnly\":true,\"path\":\"/\"},\"userName\":\"Nishi Singh\",\"userRole\":\"admin\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Nishi Singh', 'nishisingh1028@gmail.com', 'nishi@2810', 'admin'),
(2, 'User1', 'user1@gmail.com', 'testing@1', 'user'),
(3, 'User2', 'user2@gmail.com', 'testing@2', 'user'),
(5, 'Ritu ', 'ritunishidhruv@gmail.com', 'ritu@01', 'user'),
(8, 'Manoj', 'manoj.rawat@igtsolutions.com', '1234', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `id` int(11) NOT NULL,
  `idea_id` int(11) NOT NULL,
  `camp_id` varchar(3000) NOT NULL,
  `email` varchar(300) NOT NULL,
  `vote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`id`, `idea_id`, `camp_id`, `email`, `vote`) VALUES
(55, 58, 'C10', 'nishisingh1028@gmail.com', 5),
(56, 59, 'C10', 'nishisingh1028@gmail.com', 2),
(57, 60, 'C10', 'nishisingh1028@gmail.com', 3),
(58, 61, 'C10', 'nishisingh1028@gmail.com', 5),
(59, 62, 'C10', 'nishisingh1028@gmail.com', 2),
(60, 63, 'C10', 'nishisingh1028@gmail.com', 1),
(61, 64, 'C10', 'nishisingh1028@gmail.com', 1),
(62, 65, 'C10', 'nishisingh1028@gmail.com', 2),
(63, 66, 'C10', 'nishisingh1028@gmail.com', 4),
(64, 67, 'C10', 'nishisingh1028@gmail.com', 1),
(65, 68, 'C10', 'nishisingh1028@gmail.com', 3),
(66, 69, 'C10', 'nishisingh1028@gmail.com', 1),
(67, 70, 'C44', 'nishisingh1028@gmail.com', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `camp_id` (`camp_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `campaign_links`
--
ALTER TABLE `campaign_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `campaign_user`
--
ALTER TABLE `campaign_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ideas`
--
ALTER TABLE `ideas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selected_ideas`
--
ALTER TABLE `selected_ideas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `campaign_links`
--
ALTER TABLE `campaign_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `campaign_user`
--
ALTER TABLE `campaign_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `ideas`
--
ALTER TABLE `ideas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `selected_ideas`
--
ALTER TABLE `selected_ideas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vote`
--
ALTER TABLE `vote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
