# Utopia 3D Studio - Visualiseur STL Avancé et Éditeur 3D

![Utopia 3D Studio](https://img.shields.io/badge/3D-Visualiseur-blue) ![Support STL](https://img.shields.io/badge/STL-Supporté-green) ![Compatible Mobile](https://img.shields.io/badge/Mobile-Compatible-orange)

Une application web moderne pour visualiser, analyser et manipuler des fichiers STL en 3D. Construite avec un focus sur la performance et l'expérience utilisateur, Utopia 3D Studio fournit des outils de qualité professionnelle pour l'analyse et la manipulation de fichiers 3D.

## ✨ Fonctionnalités Principales

### 🎯 Visualisation 3D Avancée
- **Modes de Rotation Duaux** - Basculez entre les contrôles d'orbite traditionnels et la rotation centrée sur l'objet
- **Rotation 360° Illimitée** - Liberté complète de mouvement avec TrackballControls
- **Ciblage Centre Intelligent** - Rotation automatique autour des objets sélectionnés ou du centre de la scène
- **Contrôles de Caméra Professionnels** - Vues prédéfinies multiples (Dessus, Face, Arrière, Isométrique, etc.)
- **Rendu Haute Qualité** - Visualisation alimentée par WebGL avec accélération matérielle

### 📊 Outils d'Analyse Précis
- **Analyse Dimensionnelle** - Calculs en temps réel de largeur, hauteur et profondeur
- **Calcul de Volume** - Calcul précis du volume utilisant des algorithmes de maillage triangulaire
- **Informations Géométriques** - Nombre de polygones, taille de fichier et données de complexité du maillage
- **Statistiques Techniques** - Propriétés d'objet complètes et métadonnées

### 🎨 Interface Intuitive
- **Tableau de Bord Professionnel** - Page d'accueil épurée avec aperçu des fonctionnalités
- **Design Responsive** - Optimisé pour ordinateurs de bureau, tablettes et appareils mobiles
- **Téléchargement Glisser-Déposer** - Support de fichiers STL multiples avec retour visuel
- **Barre Latérale Extensible** - Sections d'outils organisées qui s'adaptent à votre flux de travail
- **Système de Fichiers Récents** - Accès rapide aux fichiers précédemment chargés avec métadonnées

### 🛠️ Édition et Manipulation
- **Manipulation d'Objets** - Déplacer, faire pivoter et redimensionner des objets individuels
- **Création de Primitives** - Ajouter des formes de base (cube, sphère, cylindre, plan)
- **Personnalisation des Couleurs** - Modifier les matériaux et l'apparence des objets
- **Fonctionnalité d'Export** - Sauvegarder les scènes modifiées au format STL
- **Support Multi-Objets** - Travailler avec plusieurs fichiers simultanément

## 🚀 Commencer

### Prérequis
- Node.js 16 ou supérieur
- Navigateur web moderne avec support WebGL

### Installation
```bash
# Cloner le dépôt
git clone <url-du-dépôt>
cd defis_nuit_info_3D_vis

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

### Démarrage Rapide
1. Ouvrir l'application dans votre navigateur
2. Cliquer sur "Commencer à Créer" ou glisser des fichiers STL directement sur l'interface
3. Utiliser le bouton 🎯 pour basculer entre les modes de rotation
4. Explorer les outils de la barre latérale pour l'analyse et la manipulation
5. Exporter votre travail une fois terminé

## 🎮 Contrôles et Navigation

### Modes de Rotation
- **🎯 Rotation Centrée sur l'Objet** - Faire pivoter autour des centres d'objets avec liberté illimitée
- **Orbite Traditionnelle** - Navigation centrée sur la caméra standard

### Contrôles Souris
- **Clic Gauche + Glisser** - Faire pivoter la vue
- **Clic Droit + Glisser** - Déplacer la vue
- **Molette de la Souris** - Zoom avant/arrière
- **Maj + Glisser** - Déplacer l'objet sélectionné
- **Maj + Ctrl + Glisser** - Faire pivoter l'objet sélectionné

### Contrôles Tactiles (Mobile)
- **Un Doigt + Glisser** - Faire pivoter la vue
- **Pincer** - Zoom
- **Deux Doigts Déplacer** - Déplacer la vue
- **Taper** - Sélectionner les objets

### Raccourcis Clavier
- **Vue d'Accueil** - Réinitialiser à la position de caméra par défaut
- **Vues Prédéfinies** - Vues Dessus, Face, Arrière, Gauche, Droite, Isométrique
- **Supprimer** - Supprimer l'objet sélectionné
- **Échapper** - Désélectionner tous les objets

## 🏗️ Architecture et Technologie

### Technologies Principales
- **Three.js** - Rendu 3D et gestion de scène
- **WebGL** - Graphiques accélérés matériellement
- **Vite** - Développement rapide et builds optimisés
- **Tailwind CSS** - Style utilitaire moderne
- **Modules ES6+** - Structure de code propre et maintenable

### Composants Clés
```
src/
├── main.js          # Logique d'application principale et configuration Three.js
├── style.css        # Style basé sur Tailwind avec composants personnalisés
└── counter.js       # Fonctions utilitaires et helpers
```

### Fonctionnalités de Performance
- **Gestion de Mémoire Efficace** - Disposition appropriée des géométries et matériaux
- **Validation de Taille de Fichier** - Limite de 50Mo avec retour utilisateur
- **Chargement Progressif** - Indicateurs visuels pendant le traitement des fichiers
- **Optimisation des Ressources** - Mise en cache intelligente et nettoyage
- **Rendu Adaptatif** - Qualité adaptative basée sur les capacités de l'appareil

## 📐 Spécifications Techniques

### Support de Fichiers
- **Format STL** - Fichiers STL ASCII et binaires
- **Téléchargement Multi-Fichiers** - Charger plusieurs objets simultanément
- **Validation de Fichiers** - Vérification du format et de la taille avec gestion d'erreurs
- **Support d'Export** - Sauvegarder les scènes modifiées en tant que fichiers STL



### Précision des Mesures
- **Précision Dimensionnelle** - Utilise des calculs de boîte englobante pour des mesures précises
- **Algorithme de Volume** - Implémente le calcul de volume signé pour les maillages complexes
- **Support d'Unités** - Unités du monde réel avec mise à l'échelle appropriée
- **Analyse de Maillage** - Comptage de polygones et évaluation de la complexité

## 🎨 Design de l'Interface Utilisateur

### Philosophie de Design
- **Esthétique Professionnelle** - Thème sombre optimisé pour le travail 3D
- **Flux de Travail Intuitifs** - Organisation logique des outils et hiérarchie visuelle claire
- **Layout Responsive** - Expérience fluide sur toutes les tailles d'appareils
- **Retour Visuel** - Indicateurs clairs pour les actions utilisateur et états du système

### Fonctionnalités d'Accessibilité
- **Design Touch-First** - Optimisé pour l'interaction mobile et tablette
- **Contraste Élevé** - Texte lisible et distinctions visuelles claires
- **Navigation Clavier** - Fonctionnalité complète sans souris
- **Support de Lecteur d'Écran** - HTML sémantique et étiquetage approprié

### Schéma de Couleurs
- **Couleurs Primaires** - Dégradés bleus pour les actions principales
- **Couleurs d'Accent** - Surbrillances cyan pour les éléments interactifs
- **Couleurs de Statut** - Vert (succès), Rouge (danger), Jaune (avertissement)
- **Palette Neutre** - Gris foncés avec effets de transparence subtils


## 🚀 Développement et Déploiement

### Flux de Travail de Développement
```bash
# Démarrer le serveur de développement avec rechargement à chaud
npm run dev

# Construire la version de production optimisée
npm run build

# Prévisualiser la construction de production localement
npm run preview
```

### Compatibilité Navigateur
- **Navigateurs Modernes** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Support WebGL** - Accélération matérielle requise
- **Fonctionnalités ES6+** - Environnement JavaScript moderne nécessaire
- **Navigateurs Mobiles** - iOS Safari 14+, Chrome Mobile 90+

### Options de Déploiement
- **Hébergement Statique** - Vercel, Netlify, GitHub Pages
- **Distribution CDN** - Livraison d'actifs optimisée
- **Application Web Progressive** - Fonctionnalité hors ligne et expérience de type application
- **Support Docker** - Déploiement conteneurisé prêt

## 📈 Métriques de Performance

### Résultats d'Optimisation
- **Temps de Chargement Initial** - < 2 secondes sur haut débit
- **Traitement de Fichiers** - Fichiers STL jusqu'à 50Mo supportés
- **Utilisation Mémoire** - Nettoyage efficace prévient les fuites mémoire
- **Taux d'Images** - 60fps fluides sur matériel moderne
- **Taille du Bundle** - Optimisé à ~550Ko compressé

### Fonctionnalités de Scalabilité
- **Chargement Dynamique** - Ressources chargées selon les besoins
- **Gestion Mémoire** - Nettoyage automatique des objets inutilisés
- **Surveillance de Performance** - Suivi de performance intégré
- **Adaptation de Qualité** - La qualité de rendu s'adapte à la capacité de l'appareil

## 🤝 Contribution

### Configuration de Développement
1. Fork le dépôt
2. Créer une branche de fonctionnalité
3. Faire vos changements
4. Tester minutieusement
5. Soumettre une pull request

### Standards de Code
- **JavaScript ES6+** - Syntaxe et fonctionnalités modernes
- **Tailwind CSS** - Approche de style utilitaire
- **Bonnes Pratiques Three.js** - Modèles de programmation 3D efficaces
- **Design Responsive** - Approche de développement mobile-first

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🛠️ Support

Pour le support technique, demandes de fonctionnalités ou rapports de bugs :
- Créer une issue dans le dépôt
- Inclure la version du navigateur, les informations de l'appareil et les étapes pour reproduire
- Fournir des fichiers STL d'exemple si pertinents

---

## 🎯 Pourquoi Utopia 3D Studio ?

Utopia 3D Studio représente la pointe de la technologie de visualisation 3D basée sur le web. Construit depuis la base avec des standards web modernes, il délivre une fonctionnalité de qualité professionnelle à travers une interface intuitive et accessible.

Que vous analysiez des impressions 3D, visualisiez des modèles CAO ou exploriez des designs géométriques, Utopia 3D Studio fournit les outils et la précision dont vous avez besoin dans un package qui fonctionne partout - des stations de travail de bureau aux appareils mobiles.

**Découvrez l'avenir de la visualisation 3D dans le navigateur.**

*Construit avec passion pour la technologie 3D et l'expérience utilisateur.*
