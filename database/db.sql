CREATE DATABASE  IF NOT EXISTS `node` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `node`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: node
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.29-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `enlaces`
--

DROP TABLE IF EXISTS `enlaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enlaces` (
  `IdEnlace` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(150) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `Descripcion` text,
  `Fecha_Creacion` datetime NOT NULL,
  PRIMARY KEY (`IdEnlace`),
  KEY `IX_Titulo` (`Titulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enlaces`
--

LOCK TABLES `enlaces` WRITE;
/*!40000 ALTER TABLE `enlaces` DISABLE KEYS */;
/*!40000 ALTER TABLE `enlaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posteo`
--

DROP TABLE IF EXISTS `posteo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posteo` (
  `IdUsuario` int(11) NOT NULL,
  `IdEnlace` int(11) NOT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`,`IdEnlace`),
  KEY `Ref11` (`IdUsuario`),
  KEY `Ref22` (`IdEnlace`),
  CONSTRAINT `RefEnlaces2` FOREIGN KEY (`IdEnlace`) REFERENCES `enlaces` (`IdEnlace`),
  CONSTRAINT `RefUsuarios1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posteo`
--

LOCK TABLES `posteo` WRITE;
/*!40000 ALTER TABLE `posteo` DISABLE KEYS */;
/*!40000 ALTER TABLE `posteo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(16) NOT NULL,
  `Contraseña` varchar(60) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  KEY `IX_Nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'node'
--

--
-- Dumping routines for database 'node'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-28 20:37:48
