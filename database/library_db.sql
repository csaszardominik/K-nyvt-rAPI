-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Okt 20. 12:29
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `library_db`
--
CREATE DATABASE IF NOT EXISTS `library_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `library_db`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `ID` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `author` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `publish_year` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`ID`, `title`, `author`, `category`, `publish_year`, `available`) VALUES
(1, 'Bogyó és Babóca', 'Jani', 'mese', 2001, 1),
(3, 'DS', 'Gábor Nád', 'kaland', 2026, 1),
(4, 'asd', 'Gábor Nád', 'kaland', 2026, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `loans`
--

CREATE TABLE `loans` (
  `ID` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `reader_id` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `loans`
--

INSERT INTO `loans` (`ID`, `book_id`, `reader_id`, `loan_date`, `due_date`, `return_date`) VALUES
(2, 4, 4, '2026-10-14', '2026-12-24', '2027-05-24'),
(3, 3, 6, '2026-05-14', '2026-12-24', '2027-05-24');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `readers`
--

CREATE TABLE `readers` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `registered_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `readers`
--

INSERT INTO `readers` (`ID`, `name`, `email`, `phone`, `registered_at`) VALUES
(2, 'Pista', 'pista@gmail.com', '+42364423', '2026-10-20 11:51:50'),
(3, 'Jani', 'pista@gmail.com', '+42364423', '2026-10-20 11:51:50'),
(4, 'Pista1', 'pista1@gmail.com', '+42364423', '2026-10-20 11:51:50');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `books_FK` (`book_id`),
  ADD KEY `readers_FK` (`reader_id`);

--
-- A tábla indexei `readers`
--
ALTER TABLE `readers`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email_unique` (`name`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `loans`
--
ALTER TABLE `loans`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `readers`
--
ALTER TABLE `readers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
