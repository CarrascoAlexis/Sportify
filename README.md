# Sportify

Ce projet a ete cree dans le cadre de l'ECF Studi Web-Web mobile.
Petites excuses concernant les accents, ayant un clavier QWERTY a tendances humouristiaues, celui-ci refuse categoriquement de produire un quelconque accent (Je pense qu'il n'qime pas les Francais)

## Prerequis

Le projet contient 2 parties. Le front, ici present, et l'API, a installer en premier lici, en cliquqnt [ici](https://github.com/CarrascoAlexis/SportifyAPI). Suivez d'abord les inscructions d'installation de l'API avant de proceder a l'installation de ce repo.

## Installation

Dans un premier temps, clonez le repo ou vous le souhaitez sur votre machine. Il est recommande de plqcer le dossier de ce projet q cote de celui de l'API. Entrez ensuite dans le dossier.

### `git clone git@github.com:CarrascoAlexis/Sportify.git`
### `cd Sportify`

Une fois dans le dossier, assurez vous d'etre sur la branche principale. La branche de DEV contiens la version finale, aui n'a pas pu etre produite dans les delais impartis.

### `git checkout master`

Une fois dans lq bonne brqnche et le projet telechqrge, il faut installer toutes les librairies. Cette installation se fait automatiauement si le fichier package.json est bien present. Si celui-ci est absent ou bien supprime, telechargez le depuis le Git pour le placer a la racine du projet (dans le dossier Sportify)

### `npm install`

Une fois les dependances installees, vous pouvez lancer le site. Il est necessaire de lancer egalement l'API (Se referer au [README de l'API](https://github.com/CarrascoAlexis/SportifyAPI))

### `npm start`

Et voila, le projet devrait se lancer sans soucis sur votre machine !

Attention, ce n'est qu'un serveur local de tests. Si vous souhaitez obtenir une version build pour l'installer sur un serveur Apache ou equivalent, Il faut executer la commande de build:

### `npm build`

Vous pouvew ensuite pqlcer le dossier Build dqns les dossier de votre serveur web.