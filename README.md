# 📝 To-Do Application

Une application pour la gestion des tâches, développée avec **Angular**.

---
## 👤 Collaborateurs

| Collaborateurs|
|---------------|
| **Ranyl FOUMBI**   | 
| **Rosvalde MANFO** |
| **Félicité YAMBOS** |

## 🌟 Fonctionnalités

- Ajouter, modifier et supprimer des tâches.
- Rechercher des tâches par titre ou description.
- Statuts personnalisés avec des codes couleur :
  - **TODO** (À faire)
  - **DOING** (En cours)
  - **DONE** (Terminée)
  - **CANCELLED** (Annulée)
- Authentification et profile utilisateur
- Détail des tâches
- Dashboard pour affichage des tâches et statistiques
- Ajout de commentaires sur les tâches
- Interface responsive pour le web.


---

## 📂 Structure du projet

```plaintext
root/
├── web/      
│   ├── src/
│   │   ├── app/              # Composants Angular
│   │   └── assets/           # Fichiers statiques
│   │   └── environments/     # Fichiers d'environnement
│   └── package.json          # Dépendances Angular
└── README.md                 # Ce fichier
```
## 🚀 Installation et Lancement

Cloner le projet :
```bash
git clone https://github.com/RanylFoumbi/Projet-web-2.git
cd web
```
Installer les dépendances :
```bash
npm install
```
Lancer le projet :
```bash
ng serve
```
Le projet sera accessible à http://localhost:4200.


## 🎨 Charte graphique

Voici les styles utilisés pour les statuts dans l'application Angular :

| Statut        | Bordure  | Fond     | Texte    |
|---------------|----------|----------|----------|
| **TODO**   | `#FDE047` | `#FEF9C3` | `#CA8A04` |
| **DONE** | `#86EFAC` | `#DCFCE7` | `#16A34A` |
| **DOING** | `#93C5FD` | `#DBEAFE` | `#2563EB` |
| **CANCELLED**  | `#FCA5A5` | `#FEE2E2` | `#DC2626` |

## 🛠️ Technologies Utilisées
**Angular**: Framework front-end pour le web.
**Firebase**: Backend pour la gestion des données.

## 📜 Licence
Ce projet est sous licence MIT.