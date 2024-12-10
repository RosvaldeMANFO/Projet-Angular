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
- Pages de profil
- Page membres avec redirection au profil par l'id du membre
- Traduction dans 8 langues
- Page gestion des tâches pour administrer plus facilement les tâches (tout supprimer et tout réimporter par exemple)
- Roles user et admin avec accès privilégié à certaines pages (Dashboard et Task Management)
- Interface responsive pour le web


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
git clone https://github.com/RosvaldeMANFO/Projet-Angular.git
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

Se connecter:
Lancer le projet :
```bash
Email: test2@test.com
Password: test123
```

## 🛠️ Technologies Utilisées
**Angular**: Framework front-end pour le web.
**Firebase**: Backend pour la gestion des données.

## 📜 Licence
Ce projet est sous licence MIT.
