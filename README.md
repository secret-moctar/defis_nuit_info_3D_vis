# Utopia 3D Studio - STL Viewer & Editor

![Utopia 3D Studio](https://img.shields.io/badge/3D-Viewer-blue) ![STL Support](https://img.shields.io/badge/STL-Supported-green) ![Mobile Ready](https://img.shields.io/badge/Mobile-Ready-orange)

Une application web moderne de visualisation et manipulation de fichiers STL en 3D, conçue pour être intuitive, accessible et créative.

## 🎯 Fonctionnalités Principales

### ✅ Visualisation 3D Complète
- **Upload de fichiers STL** (simple ou multiple)
- **Glisser-déposer** pour une expérience utilisateur optimale
- **Rotation, zoom et manipulation** avec OrbitControls
- **Visualisation en temps réel** avec rendu haute qualité

### 📊 Analyses Techniques
- **Calcul des dimensions** (largeur, hauteur, profondeur)
- **Calcul du volume** précis des modèles 3D
- **Informations géométriques** détaillées
- **Interface de statistiques** en temps réel

### 🎨 Outils d'Édition
- **Manipulation d'objets** (déplacement, rotation, mise à l'échelle)
- **Personnalisation des couleurs** 
- **Création de formes primitives** (cube, sphère, cylindre, plan)
- **Export STL** des scènes modifiées

### 📱 Accessibilité
- **Interface responsive** optimisée mobile/desktop
- **Design intuitif** avec Tailwind CSS
- **Navigation tactile** pour appareils mobiles
- **Contrôles adaptatifs** selon le périphérique

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Lancement du projet
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build de production
npm run build
```

### Accès
Ouvrez votre navigateur à `http://localhost:5173`

## 💻 Technologies Utilisées

- **Three.js** - Rendu 3D et gestion des scènes
- **Vite** - Build tool moderne et rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **STL Loader/Exporter** - Gestion des fichiers STL
- **OrbitControls** - Contrôles de caméra intuitifs

## 🎮 Guide d'Utilisation

### 1. Chargement de fichiers STL
- **Méthode 1**: Cliquez sur "Choose files" et sélectionnez vos fichiers STL
- **Méthode 2**: Glissez-déposez directement vos fichiers sur la zone de visualisation
- Support des **fichiers multiples** simultanément

### 2. Navigation 3D
- **Rotation**: Clic gauche + glisser
- **Zoom**: Molette de la souris
- **Panoramique**: Clic droit + glisser
- **Mobile**: Gestes tactiles intuitifs

### 3. Manipulation d'objets
- **Sélection**: Cliquez sur un objet
- **Déplacement**: Glissez l'objet sélectionné
- **Déplacement vertical**: Shift + glisser
- **Rotation**: Shift + Ctrl + glisser

### 4. Outils disponibles
- **Select/Drag**: Mode de sélection et déplacement
- **Draw**: Création de lignes 3D
- **Primitive shapes**: Ajout de formes de base

### 5. Personnalisation
- **Couleur**: Modificateur de couleur pour les objets
- **Échelle**: Slider pour redimensionner
- **Rotation**: Boutons d'orientation directionnelle

## 📋 Informations Techniques

### Calculs disponibles
- **Dimensions**: Largeur, hauteur, profondeur précises
- **Volume**: Calcul volumétrique des meshes triangulaires
- **Position**: Coordonnées spatiales
- **Échelle**: Facteurs de redimensionnement

### Formats supportés
- **Import**: STL (ASCII et binaire)
- **Export**: STL (pour sauvegarde des scènes)

### Performance
- **Rendu optimisé** avec WebGL
- **Gestion mémoire** efficace
- **Support multi-objets** sans perte de performance

## 🏆 Conformité au Défi

Cette application répond parfaitement aux exigences du défi :

### ✅ Exigences Techniques
- [x] **Upload de fichiers STL** - Multiple files support
- [x] **Visualisation 3D** - Rendu haute qualité avec Three.js
- [x] **Manipulation 3D** - Rotation, zoom, déplacement
- [x] **Calcul des dimensions** - Largeur, hauteur, profondeur
- [x] **Calcul du volume** - Algorithme de calcul volumétrique précis

### ✅ Exigences UX
- [x] **Interface simple** - Design épuré et intuitif
- [x] **Interface intuitive** - Contrôles naturels et logiques
- [x] **Accessibilité** - Responsive design mobile/desktop
- [x] **Créativité** - Outils d'édition et personnalisation
- [x] **Ergonomie** - Interactions fluides et naturelles

### ✅ Exigences de Livraison
- [x] **Prototype fonctionnel** - Application web complètement opérationnelle
- [x] **Documentation** - README détaillé et guide d'utilisation

## 🎥 Présentation Vidéo (3-5 minutes)

### Structure suggérée pour la vidéo de démonstration :

1. **Introduction** (30s)
   - Présentation de Utopia 3D Studio
   - Objectifs et cas d'usage

2. **Démonstration des fonctionnalités principales** (2-3 min)
   - Upload et glisser-déposer de fichiers STL
   - Navigation 3D intuitive
   - Calculs de dimensions et volume
   - Manipulation d'objets

3. **Outils avancés** (1 min)
   - Création de formes primitives
   - Personnalisation (couleurs, échelle)
   - Export STL

4. **Accessibilité mobile** (30s)
   - Démonstration sur mobile/tablette
   - Gestes tactiles

5. **Conclusion** (30s)
   - Récapitulatif des avantages
   - Potentiel d'évolution

## 🔧 Architecture Technique

### Structure du projet
```
Utopia/
├── src/
│   ├── main.js          # Application principale
│   ├── style.css        # Styles et responsive design
│   └── counter.js       # Utilitaires
├── public/              # Assets statiques
├── index.html          # Point d'entrée HTML
└── package.json        # Dépendances et scripts
```

### Fonctionnalités techniques clés
- **Volume calculation**: Algorithme de calcul par tétraèdres
- **Responsive design**: Breakpoints optimisés mobile/desktop
- **Drag & Drop**: Interface native pour le glisser-déposer
- **Memory management**: Gestion optimisée des ressources WebGL

## 🎨 Thème National 2025

L'application est prête à intégrer tout thème national grâce à :
- **Flexibilité des modèles**: Support de tous types de géométries STL
- **Personnalisation visuelle**: Couleurs et matériaux adaptables
- **Échelle adaptative**: Gestion automatique des tailles d'objets
- **Export personnalisé**: Sauvegarde des créations thématiques

## 🚀 Évolutions Futures

- **Support de formats additionnels** (OBJ, PLY, GLTF)
- **Outils de mesure avancés** (distances, angles)
- **Mode collaboration** multi-utilisateurs
- **Intégration impression 3D** (préparation fichiers)
- **Réalité augmentée** (visualisation AR des modèles)

---

**Développé avec ❤️ pour le défi 3D STL Visualization**

*Cette application représente une solution complète, moderne et accessible pour la visualisation et manipulation de fichiers STL, parfaitement adaptée aux exigences du défi et prête pour une utilisation professionnelle.*