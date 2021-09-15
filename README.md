# SpyroBot

<p align="center">
  <img src="./Img/SpyroBot-github.png">
</p>

<div align="center">
  <a href="https://discord.gg/kcb3jke"><img alt="Discord" src="https://img.shields.io/discord/621427447879172096?color=697EC6&label=Discord&logo=Discord"></a>
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Bat-Husky/SpyroBot?label=Code%20size">
  <img alt="GitHub" src="https://img.shields.io/github/license/Bat-Husky/SpyroBot?color=%231BB6F6&logo=Internet%20Archive&logoColor=%23FFFFFF">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Bat-Husky/SpyroBot?color=cyan&label=Last%20Commit&logo=Visual%20Studio%20Code&logoColor=blue">
  <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/Bat-Husky/SpyroBot?color=2AA198&label=Last%20Release&logo=JavaScript">
  <img alt="GitHub commits since tagged version" src="https://img.shields.io/github/commits-since/Bat-Husky/SpyroBot/v1.5.1?color=%23C74143&label=Commits%20since%20v1.5.1&logo=DocuSign&logoColor=%23FFCC22">
</div>
<br>

SpyroBot is a little Discord bot that I created. For more info, you can invite the bot.

## Installation

Add SpyroBot to your server by clicking here : [Invite Link](https://discord.com/api/oauth2/authorize?client_id=622872629371731970&permissions=8&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D622872629371731970%26permissions%3D8%26scope%3Dbot&scope=bot%20applications.commands)

## Setup

Download this code, put your information in JSON/config.json or it will not work. Finally, launch the bot with **nodejs** as below.<br>
PS : `OwnerGuildID` is crucial for slash commands, you need to put quote when you set the variable.

```bash
node index.js
```

## Usage

List of the main commands :

```
/info
/help
```

## Releases

Last Release : `v1.5`<br>
Last Pre-Release : `v0.4.1,1.3.5`

### How to read release tag ?

For the normals releases, nothing very difficult.<br>
For the Pre-Release : `0.<beta type>.<beta version>,<stable version>`

#### Beta type 
`0.0` : Optimization Beta<br>
`0.1` : Voice Beta<br>
`0.2` : Experimentals commands/features Beta<br>
`0.3` : Economy Beta<br>
`0.4` : Slash commands Beta<br>
`0.5` : Level System Beta<br>

### Changelogs
<br>

* `25/02/2021`

```swift
Changelog v:1.0
```
```markdown
*  Général :

#  Ajout du /Play avec un lien

#  /Volume

#  Ébauche de Reaction Role

#  /Help


*  Modération :

#  /Ban

#  /Kick

#  /Warn (Raison affiché au moment du warn, mais non récupérée)

#  /Infractions


*  Useless :

#  /baka (3 insultes)

#  /meme (Kappa/LUL/Saitama OK/Stonks)


*  Notes :

#  Probable abandon de ReBot
```
<br>

* `26/04/2021`

```swift
Changelog v:1.2
```
```markdown
*  Général :

#  Hébergement du bot

#  Ajout de la queue ($Play/$Skip/$Queue/$Leave/$Volume/$Loop)

#  Changement du prefix : $

#  Reaction Role parfaitement fonctionnel même après crash


*  Modération :

#  $Clear

#  $Report (utilisable par tout le monde)

#  $LogsChannel (set le logs channel || utilisé sur $warn et $report)


*  Useless :

#  $Diagonale

#  Ajout de nouvelles insultes sur le $Baka


*  Notes :

#  Abandon de ReBot au profit de SpyroBot

#  Transformation de ReBot en test pour SpyroBot
```
<br>

* `24/05/2021`

```swift
Changelog v:1.3
```
```markdown
*  Général :

#  $SetQueueChannel

#  $run info/list/create/join/start/delete

#  $info (remplaçant $SpyroBot qui n'est plus affiché dans le $help)


*  Useless :

#  $FaitsDivers

#  $AddFaitsDivers


*  Notes :

#  SpyroBot envoie maintenant un message quand il est invité sur un serveur

#  Plusieurs fonctionnalités en cours de test sur ReBOT (arrivée probable bientôt)

#  En plus de SpyroBot et JAAJmophobia, StingerBot est enfin en ligne.
```
<br>

* `05/06/2021`

```swift
Changelog v:1.4
```
```markdown
*  Général :

#  $Help amélioré + $help mp

#  Réaction avec 📌 pour pin un message

#  Possibilité d'activer ou désactiver certaines commandes (baka/malfoutu/diagonale)

#  Message custom pour $tonbotestmalfoutu

#  $Constitution, envoie le fichier docx de la Constitution du serveur

#  Ajout d'une économie : $coin info

#  Ajout de 4 Slash Commands basiques (help/info/faitsdivers/ping)


*  Notes :

#  Amélioration du ping

#  Les autres Slash Commands sont actuellement en développement

#  L'intégration d'Openbot avec SpyroBot est en cours
```
<br>

* `14/07/2021`

```swift
Changelog v:1.5
```
```markdown
*  Général :

#  $Rules : pour rappeler aux autres de lire  le règlement.

#  SpyroBot s'occupe désormais des rôles d'arrivée.

#  SpyroBot s'occupe de l'accès au serveur en acceptant le règlement.

#  SpyroBot s'occupe de tous les réactions roles.

#  Économie finie.


*  Informations :

#  Ajout de l'intégration d'OpenBot (Commandes : OpenPattern/OpenCode/Openinfo).

#  Commande $Spyro : pour plus d'info ($Spyro <code|github|history>).

#  $Bots donne des infos sur les bots.


*  Useless :

#  2 nouveaux memes dans $meme

#  Les commandes de $Focus ont été remises (mais elles ne sont pas affiché dans le $Help).


*  Notes :

#  La 1.5 est la dernière version rajoutant de vraies commandes.

#  Les autres Slash Commands sortiront dans la 2.0, quand Discord.js v13 sortira.

#  Possible ajout d'une GROSSE fonctionnalité dans la 2.0 ou 2.0.1.

#  À part si Discord.js rajoute une nouvelle fonctionnalité qui me semblerait intéressante, la 2.0/2.0.1 sera donc la dernière version du Bot.
```
<br>

* `12/09/2021`

```swift
Changelog v:2.0
```
```markdown
*  Général :

#  Ajouts de l'xp avec SpyroBot.

#  Rôles en fonction du niveau.

#  $rank

#  Nouvelles Slash Commands (Warn/Infractions/Clear/Baka/Rank/Report/Bots)

* note :

#  La 2.0 sera la dernière grosse version de SpyroBot.

#  D'autres petites mise à jour pourront sortir (2.0.1/2.0.2/...) avec ajouts de slash commands ou des petites commandes.

#  Sauf si un éclair de génie me parvient, il n'y aura pas de nouvelle groose commande.
```
