<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Installer Onyou Office

[page Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Choisir le fichier pour votre machine

| Plateforme                              | Prérequis                                               | Fichier                            |
| --------------------------------------- | ------------------------------------------------------- | ---------------------------------- |
| **Windows**                             | Windows 10 ou version ultérieure, Intel/AMD 64 bits     | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (bêta)**, Apple Silicon           | macOS 12 ou version ultérieure, puce M1 ou plus récente | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (bêta)**, Intel                   | macOS 12 ou version ultérieure, processeur Intel        | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (bêta)**, toute distribution    | 64 bits (x86_64); glibc ≥ 2.35                          | `OnyouOffice-<version>.AppImage`   |
| **Linux (bêta)**, famille Ubuntu/Debian | 64 bits (x86_64); glibc ≥ 2.35                          | `onyouoffice_<version>_amd64.deb`  |
| **Linux (bêta)**, Fedora/RHEL/openSUSE  | 64 bits (x86_64); glibc ≥ 2.35                          | `onyouoffice-<version>.x86_64.rpm` |

## Sous Windows

1. Téléchargez `OnyouOffice-Setup-<version>.exe` depuis la page Releases.
2. Lancez-le. L’installeur n’est pas signé numériquement : Windows peut donc afficher d’abord une fenêtre bleue « Windows a protégé votre ordinateur ». Choisissez **Informations complémentaires**, puis **Exécuter quand même**. Le libellé exact dépend de votre version de Windows.
3. Suivez l’installeur jusqu’au bout.

Il place Onyou Office dans le menu Démarrer et enregistre `.docx`, `.xlsx`, `.pptx`, `.pdf` et formats voisins, si bien qu’un double-clic sur un fichier l’ouvre.

Comme l’installeur n’est pas signé, n’exécutez que celui que vous avez téléchargé depuis la page Releases ci-dessus.

## Quand Windows bloque le téléchargement ou l’installation

### Edge indique que le fichier « n’est pas téléchargé couramment »

Microsoft Defender SmartScreen avertit ainsi pour un fichier qu’il a vu télécharger par peu de personnes. Voici la marche à suivre de Microsoft pour conserver le fichier :

1. Ouvrez la liste des téléchargements d’Edge (**Ctrl+J**), appuyez sur **…** à côté du fichier et choisissez **Conserver**.
2. Dans la fenêtre qui s’ouvre, appuyez sur **Afficher plus**, puis sur **Conserver quand même**. Le fichier reste dans votre dossier Téléchargements.

Cette fenêtre comporte aussi un bouton qui signale le fichier comme sûr. Il ouvre seulement la page de signalement de Microsoft (`feedback.smartscreen.microsoft.com`) et ne conserve pas le fichier. Fermez cette page et appuyez plutôt sur **Afficher plus** dans la fenêtre.

Si la fenêtre n’a pas de bouton **Afficher plus** ou **Conserver quand même** :

- Sur un PC géré par un établissement scolaire ou une entreprise, l’administrateur peut interdire d’ignorer ces avertissements (une stratégie Edge). Personne ne peut alors conserver le fichier sur ce PC ; demandez à l’administrateur de l’installer ou de l’autoriser.
- Télécharger depuis la page Releases dans un autre navigateur vous donne le même fichier.

### Une fenêtre « Windows a protégé votre ordinateur » apparaît

Microsoft Defender SmartScreen affiche cette fenêtre la première fois qu’il voit un installeur non signé. Appuyez sur **Informations complémentaires** et un bouton **Exécuter quand même** apparaît. Sur un PC géré par un établissement scolaire ou une entreprise, un paramètre de l’administrateur peut masquer ce bouton ; adressez-vous à l’administrateur.

## Sur un Mac (bêta)

Il vous faut macOS 12 (Monterey) ou version ultérieure. La version Mac n’a pas de signature de développeur Apple : la première fois que vous l’ouvrez, macOS indique qu’il ne peut pas vérifier que l’application est exempte de logiciels malveillants et ne l’ouvre pas. Autorisez-la une seule fois, comme ci-dessous.

1. Ouvrez le dmg et faites glisser `Onyou Office.app` dans le dossier **Applications**.
2. Ouvrez Onyou Office depuis le dossier Applications. Quand l’avertissement apparaît, appuyez sur **Terminé**.
3. Ouvrez **Réglages Système ▸ Confidentialité et sécurité**. Vers le bas, à côté de la ligne indiquant que Onyou Office a été bloquée, appuyez sur **Ouvrir quand même** et saisissez le mot de passe de votre Mac. Le bouton reste affiché environ une heure après votre tentative d’ouverture.
4. Dans la fenêtre qui s’affiche de nouveau, appuyez sur **Ouvrir**. Ensuite, elle s’ouvre sans avertissement.

Sous macOS 12, l’emplacement est **Préférences Système ▸ Sécurité et confidentialité ▸ Général**, et le bouton s’y appelle aussi **Ouvrir quand même**.

Si macOS indique que l’application n’est pas prise en charge sur ce Mac, vérifiez deux choses :

- Un Mac Intel ne peut pas exécuter le fichier pour Apple Silicon (`-arm64.dmg`). Regardez « Processeur » dans **À propos de ce Mac**, supprimez l’application installée et installez plutôt le fichier `-x64.dmg`.
- macOS 11 ou antérieur ne peut pas exécuter Onyou Office. **À propos de ce Mac** affiche aussi la version de macOS.

Également sur un Mac :

- Les cartes de connexion IA n’ont pas de bouton d’installation. Suivez le lien du guide d’installation officiel sur la carte pour installer Claude Code ou Codex. L’application de bureau Claude n’est pas Claude Code, il faut donc installer Claude Code même si l’application de bureau est déjà là.
- La connexion se termine dans le navigateur. Si le navigateur vous demande de coller un code, exécutez vous-même `claude auth login` ou `codex login` dans le Terminal. Voir [Connexion par abonnement](help://subscription).

## Sous Linux (bêta)

- **AppImage** : rendez-le exécutable (`chmod +x OnyouOffice-<version>.AppImage`) et lancez le fichier. Il n’y a pas d’étape d’installation.
- **deb** : installez avec `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm** : installez avec `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Sous openSUSE, utilisez `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Les paquets deb et rpm s’installent dans `/opt/Onyou Office` et lient la commande de terminal `/usr/bin/onyouoffice`. Comme sur un Mac, les cartes de connexion IA n’ont pas de bouton d’installation, et lorsqu’une connexion demande un code, vous exécutez vous-même `claude auth login` ou `codex login` dans un terminal.

## Mises à jour

[page Releases](https://github.com/dodamworks/onyouoffice/releases/latest)

## Le build que vous exécutez

**Paramètres ▸ À propos** est l'endroit où l'application indique la version que vous avez, le canal qu'elle suit et où se trouve le projet. Elle y nomme aussi le projet open source sur lequel cette application est basée.

## La ligne de commande est incluse

Chaque installation livre une commande `onyouoffice` qui parle aux mêmes moteurs que la fenêtre : les deux ne peuvent donc pas se contredire sur un fichier. `onyouoffice install-cli` la met sur votre `PATH`. Pour ce qu’elle sait faire, voir [Ligne de commande et agents](help://cli).
