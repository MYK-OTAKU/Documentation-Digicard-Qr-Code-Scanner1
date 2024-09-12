---
id: technical-design
title: Conception technique
sidebar_label: Conception technique

---

# Conception technique

Le backend de l'application est conçu avec Node.js et Sequelize comme ORM pour gérer la communication avec PostgreSQL. Le frontend utilise React Native avec Expo pour simplifier le déploiement sur Android.


## Détails Techniques

- **Scan de QR Code :** Utilisation de la bibliothèque `expo-camera` pour accéder à la caméra et scanner les QR codes.
- **Analyse de QR Code :** Utilisation de la fonction `analyzeQRCode` pour extraire les informations des QR codes.
- **Vérification de la sécurité des liens :** Utilisation de la fonction `checkUrlSafety` pour vérifier les liens via l'API VirusTotal.
- **Authentification Biométrique :** Utilisation de la bibliothèque `expo-local-authentication` pour l'authentification par empreinte digitale.