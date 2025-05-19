-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 16, 2025 alle 12:51
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parentup`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
(1, 2, 1, 'czc', '2025-05-14 17:46:15'),
(2, 2, 1, 'ciao gino', '2025-05-14 18:00:58'),
(7, 4, 3, 'xSCsA', '2025-05-14 19:03:01'),
(8, 3, 3, 'scACA', '2025-05-14 19:03:05'),
(9, 8, 2, 'CSAc', '2025-05-14 19:18:19'),
(10, 8, 3, 'czxC', '2025-05-14 19:18:58'),
(11, 7, 3, 'dsaFD', '2025-05-14 19:19:03'),
(12, 8, 3, 'vDV', '2025-05-14 19:36:45'),
(13, 10, 4, 'csca', '2025-05-15 12:45:38'),
(14, 10, 4, 'scsacas', '2025-05-15 12:45:42'),
(15, 10, 4, 'VcV', '2025-05-15 12:50:58'),
(22, 10, 5, 'csCAc', '2025-05-15 13:12:01'),
(23, 10, 5, 'csacshRRY POTTER ', '2025-05-15 13:12:07'),
(24, 11, 5, 'HARRY POTTER', '2025-05-15 13:12:16'),
(25, 11, 4, 'VVV', '2025-05-15 13:21:13'),
(26, 11, 4, 'vVAV', '2025-05-15 13:21:16'),
(27, 10, 5, 'DVDV', '2025-05-15 15:11:11'),
(28, 11, 5, 'SDVDV', '2025-05-15 15:11:15');

-- --------------------------------------------------------

--
-- Struttura della tabella `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`, `created_at`) VALUES
(1, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 18:23:22'),
(2, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 18:23:32'),
(3, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 18:30:49'),
(4, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 18:30:55'),
(5, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 19:03:01'),
(6, 1, 'Qualcuno ha commentato il tuo post.', 1, '2025-05-14 19:03:05');

-- --------------------------------------------------------

--
-- Struttura della tabella `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `genere` varchar(20) DEFAULT NULL,
  `data_nascita` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `nome`, `cognome`, `email`, `password`, `genere`, `data_nascita`, `created_at`) VALUES
(1, 'Katiuscia', 'Balia', 'katiusciabalia@gmail.com', '$2y$10$tEHd/0dTvN6WaoJoKuC8lus9cmbuQ1kidBtYxRF69SQe/ppviO3Aa', 'Donna', '1993-03-21', '2025-05-15 12:38:55'),
(5, 'harry', 'potter', 'harrypotter@example.it', '$2y$10$QPES6sKPp5r083lQU8LQFObX2svqxO17TsBoSs8AQVSPyFgidJS8K', 'Uomo', '1888-07-25', '2025-05-15 12:54:02');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT per la tabella `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
