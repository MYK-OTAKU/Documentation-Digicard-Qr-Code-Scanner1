---
id: source-code
title: Source Code Documentation
---

# Documentation du Code Source

## Structure du Code

- **`App.tsx` :** Fichier principal de l'application, gère la navigation et l'authentification.
- **`src/screens/ScanScreen.tsx` :** Écran de scan de QR code.
- **`src/screens/HistoryScreen.tsx` :** Écran de l'historique des scans.
- **`src/screens/FavoritesScreen.tsx` :** Écran des favoris.
- **`src/screens/ResultScreen.tsx` :** Écran des résultats de scan.
- **`src/components/UserScreen.tsx` :** Écran utilisateur.
- **`src/components/SettingsScreen.tsx` :** Écran des paramètres.
- **`src/components/FingerprintAuthScreen.tsx` :** Écran d'authentification biométrique.
- **`src/components/CustomDrawerContent.tsx` :** Contenu personnalisé du tiroir de navigation.
- **`src/Context/AuthContext.tsx` :** Contexte d'authentification.
- **`src/components/AuthGuard.tsx` :** Gardien d'authentification.
- **`src/screens/LoadingScreen.tsx` :** Écran de chargement pendant la vérification de l'authentification.

## Exemples de Code

### `App.tsx`

```typescript
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, TouchableOpacity, BackHandler, Alert, AppState, AppStateStatus, Text } from 'react-native';
import ScanScreen from './src/screens/ScanScreen'; // Importation de l'écran de scan
import HistoryScreen from './src/screens/HistoryScreen'; // Importation de l'écran de l'historique
import FavoritesScreen from './src/screens/FavoritesScreen'; // Importation de l'écran des favoris
import ResultScreen from './src/screens/ResultScreen'; // Importation de l'écran des résultats
import UserScreen from './src/components/UserScreen'; // Importation de l'écran utilisateur
import SettingsScreen from './src/components/SettingsScreen'; // Importation de l'écran des paramètres
import FingerprintAuthScreen from './src/components/FingerprintAuthScreen'; // Importation de l'écran d'authentification biométrique
import CustomDrawerContent from './src/components/CustomDrawerContent'; // Importation du contenu personnalisé du tiroir
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'; // Menu contextuel
import { AuthProvider, AuthContext } from './src/Context/AuthContext'; // Contexte d'authentification
import AuthGuard from './src/components/AuthGuard'; // Gardien d'authentification
import LoadingScreen from './src/screens/LoadingScreen'; // Écran de chargement pendant la vérification de l'authentification

const navigationRef = React.createRef<NavigationContainerRef<any>>(); // Référence pour la navigation
const Drawer = createDrawerNavigator(); // Création du tiroir de navigation

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
  const { checkAuthStatus } = useContext(AuthContext); // Vérification de l'état d'authentification

  // Vérification de l'état d'authentification au démarrage
  useEffect(() => {
    const checkAuthStatusOnStart = async () => {
      await checkAuthStatus(); // Appel asynchrone pour vérifier l'authentification
      setIsLoading(false); // Désactive le chargement après la vérification
    };

    checkAuthStatusOnStart();
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      if (!navigationRef.current) {
        return false;
      }

      const currentRoute = navigationRef.current.getCurrentRoute();
      if (currentRoute?.name === 'Scan') {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true; // Prevent default behavior
        
      } else {
        navigationRef.current.navigate('Scan');
        return true; // Prevent default behavior
      }
    };

    // Abonnement à l'événement de retour sur Android
    const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandlerSubscription.remove(); // Nettoyage lors de la destruction du composant
  }, []);

  // Vérifie l'authentification lorsque l'application revient au premier plan
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        await checkAuthStatus(); // Révérifie l'authentification
      }
    };

    // Abonnement à l'événement de changement d'état de l'application
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove(); // Nettoyage lors de la destruction du composant
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Affiche l'écran de chargement pendant l'authentification
  }

  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer ref={navigationRef}>
          <AuthGuard>
            <Drawer.Navigator
              initialRouteName="Scan" // Définir l'écran de scan comme route initiale
              drawerContent={(props) => <CustomDrawerContent {...props} />} // Contenu personnalisé du tiroir
            >
              {/* Écran de scan QR avec des options pour contrôler la caméra */}
              <Drawer.Screen
                name="Scan"
                component={ScanScreen}
                options={({ navigation }) => ({
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="camera-alt" size={size} color={color} />
                  ),
                  headerTransparent: true,
                  headerTitle: '',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconButton}>
                      <MaterialIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <View style={styles.headerRight}>
                      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Scan', { action: 'toggleTorch' })}>
                        <MaterialIcons name="flash-on" size={24} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Scan', { action: 'switchCamera' })}>
                        <MaterialIcons name="rotate-right" size={24} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Scan', { action: 'zoomIn' })}>
                        <MaterialIcons name="zoom-in" size={24} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Scan', { action: 'zoomOut' })}>
                        <MaterialIcons name="zoom-out" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <Drawer.Screen
                name="History"
                component={HistoryScreen}
                options={({ navigation }) => ({
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="history" size={size} color={color} />
                  ),
                  headerTransparent: false,
                  headerTitle: 'History',
                  headerRight: () => (
                    <View style={styles.headerRightMenu}>
                      <Menu>
                        <MenuTrigger>
                          <MaterialIcons name="more-vert" size={24} color="black" />
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption onSelect={() => navigation.navigate('History', { action: 'sortByDate' })}>
                            <Text style={styles.menuOptionText}>Sort by Date</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => navigation.navigate('History', { action: 'sortByType' })}>
                            <Text style={styles.menuOptionText}>Sort by Type</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => navigation.navigate('History', { action: 'clearHistory' })}>
                            <Text style={styles.menuOptionText}>Clear history</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  ),
                })}
              />
              <Drawer.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <FontAwesome name="star" size={size} color={color} />
                  ),
                  headerTransparent: false,
                  headerTitle: 'Favorites',
                }}
              />
              <Drawer.Screen
                name="Result"
                component={ResultScreen}
                options={({ navigation }) => ({
                  headerTransparent: false,
                  headerTitle: 'Result',
                  drawerItemStyle: { display: 'none' },
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                      <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Drawer.Screen
                name="User"
                component={UserScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="person" size={size} color={color} />
                  ),
                  headerTransparent: false,
                  headerTitle: 'User',
                }}
              />
              <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                  ),
                  headerTransparent: false,
                  headerTitle: 'Settings',
                }}
              />
            </Drawer.Navigator>
          </AuthGuard>
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  );
};

// Styles pour les icônes et les menus
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerRightMenu: {
    flexDirection: 'row',
    marginRight: 10, // Add marginRight to move the menu button away from the edge
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
  },
});

export default App;
```

### `ScanScreen.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { analyzeQRCode } from '../utils/analyzeQRCode';
import { postData } from '../../api'; // Assurez-vous que le chemin est correct

// Types des paramètres utilisés dans les routes de navigation
type RootStackParamList = {
  Scan: { action?: string }; // Paramètre optionnel pour indiquer l'action à effectuer lors du scan
  Result: { type: string; data: string; id: number; imageUrl: string }; // Paramètres à passer lors de la navigation vers l'écran des résultats
  History: undefined; // Aucun paramètre requis pour l'historique
  Favorites: undefined; // Aucun paramètre requis pour les favoris
};

// Composant principal pour l'écran de scan
const ScanScreen: React.FC = () => {
  // États locaux pour gérer la caméra, la torche, le zoom, etc.
  const [facing, setFacing] = useState<CameraType>('back'); // Caméra arrière par défaut
  const [torch, setTorch] = useState<boolean>(false); // La torche est désactivée par défaut
  const [zoom, setZoom] = useState(0); // Niveau de zoom initial
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null); // Dernier code scanné
  const [isScanning, setIsScanning] = useState(false); // Indicateur pour éviter les scans multiples
  const [permission, requestPermission] = useCameraPermissions(); // Permissions pour utiliser la caméra
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Navigation entre les écrans
  const route = useRoute<RouteProp<RootStackParamList, 'Scan'>>(); // Accès aux paramètres de la route actuelle

  // useEffect pour gérer les actions reçues via les paramètres de navigation
  useEffect(() => {
    if (route.params?.action) {
      if (route.params.action === 'toggleTorch') {
        toggleTorch(); // Si l'action est "toggleTorch", on active/désactive la torche
      } else if (route.params.action === 'switchCamera') {
        switchCamera(); // Si l'action est "switchCamera", on change la caméra
      } else if (route.params.action === 'zoomIn') {
        zoomIn(); // Zoom avant
      } else if (route.params.action === 'zoomOut') {
        zoomOut(); // Zoom arrière
      }
    }
  }, [route.params?.action]); // Dépendance sur les paramètres de la route

  // Si la permission pour la caméra n'a pas encore été demandée
  if (!permission) {
    return <View />;
  }

  // Si la permission n'est pas accordée, on affiche un message et un bouton pour demander la permission
  if (!permission.granted) {
    return (
      <View style={styles.container2}>
        <Text style={styles.message}>Nous avons besoin de la permission pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    );
  }

  // Fonction pour changer la caméra (avant/arrière)
  const switchCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Fonction pour activer/désactiver la torche
  const toggleTorch = () => {
    setTorch(current => !current);
  };

  // Fonction pour zoomer
  const zoomIn = () => {
    setZoom(current => (current < 1 ? current + 0.1 : 1)); // Limite le zoom à 1 (maximum)
  };

  // Fonction pour dézoomer
  const zoomOut = () => {
    setZoom(current => (current > 0 ? current - 0.1 : 0)); // Limite le zoom minimum à 0
  };

  // Gestion de l'événement de scan de code-barres
  const handleBarcodeScanned = async (scanningResult: { type: string; data: string }) => {
    // Si le code est déjà scanné ou si un scan est en cours, on ignore
    if (isScanning || scanningResult.data === lastScannedCode) {
      return;
    }

    setIsScanning(true);
    setLastScannedCode(scanningResult.data); // On enregistre le dernier code scanné

    // Analyse du QR Code avec la fonction utilitaire
    const { type, content } = analyzeQRCode(scanningResult.data);

    // Traitement côté serveur (backend)
    try {
      const response = await postData('scans', { type, data: scanningResult.data, userId: 1 });

      if (response.success) {
        // Si tout se passe bien, on navigue vers l'écran des résultats
        navigation.navigate('Result', { type, data: content, id: response.scanId, imageUrl: response.imageUrl });
      } else {
        Alert.alert('Erreur', response.message); // Affichage d'une alerte en cas d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de la requête ! " + error);
      Alert.alert('Erreur', 'Échec du traitement du scan.'); // Gestion des erreurs
    } finally {
      setIsScanning(false); // Réinitialisation de l'état de scan
    }
  };

  // Fonction pour choisir une image depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image sélectionnée :", result.assets[0].uri); // Log de l'URI de l'image
    }
  };

  // Rendu de l'interface utilisateur
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing} // Caméra sélectionnée
        enableTorch={torch} // Torche activée/désactivée
        zoom={zoom} // Niveau de zoom
        onBarcodeScanned={handleBarcodeScanned} // Gestionnaire d'événements pour le scan
      >
        <View style={styles.scannerFrame}>
          <View style={styles.scannerFrameInner} />
        </View>
      </CameraView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('History')}>
          <FontAwesome name="history" size={24} color="black" />
          <Text>Historique</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={pickImage}>
          <Entypo name="image" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Favorites')}>
          <FontAwesome name="heart" size={24} color="black" />
          <Text>Favoris</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  scannerFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrameInner: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 95,
  },
  footerButton: {
    alignItems: 'center',
    flex: 1,
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'black',
  },
});

export default ScanScreen;








