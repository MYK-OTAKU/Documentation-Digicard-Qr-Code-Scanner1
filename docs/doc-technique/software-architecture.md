---
id: software-architecture
title: Architecture Logicielle
sidebar_label: Architecture Logicielle

---

# Architecture logicielle

L'application DigiCard utilise une architecture basée sur React Native pour le frontend et Node.js pour le backend. Les données des scans sont stockées dans une base de données PostgreSQL, tandis que la vérification des URLs est effectuée via l'API VirusTotal.

L'architecture de **QRCODEAPP** suit une approche **MVC** (Modèle-Vue-Contrôleur) pour séparer la logique métier de l'interface utilisateur.

## Composants principaux

- **Frontend (React Native)** : Interface utilisateur et logique de navigation.
- **Backend (Node.js)** : Serveur de vérification et stockage des scans.
- **Base de données (PostgreSQL)** : Stockage des scans et des paramètres utilisateur.
e Données :** Utilisation de MongoDB pour stocker les données des utilisateurs et des scans.
- **API :** Utilisation de l'API VirusTotal pour vérifier la sécurité des liens.

## Diagrammes

- **Diagramme de Composants :** Décrit les différents composants de l'application et leurs interactions.
- **Diagramme de Séquence :** Décrit les interactions entre les composants pour les principales fonctionnalités (scan, vérification de sécurité, etc.).