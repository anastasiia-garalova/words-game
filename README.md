# Words Game 🎮

## 📖 Über das Projekt

**Words Game** ist eine Webanwendung mit Wortspielen, die mit JavaScript, Node.js und Express entwickelt wurde.

Das Projekt besteht aus einem Frontend, einem Backend und einer MySQL-Datenbank. Die Spiellogik wird mit JavaScript umgesetzt, während der Server die Kommunikation mit der Datenbank und die Verwaltung der Benutzer-Sessions übernimmt.

## Funktionen

- Wortspiel direkt im Browser
- Interaktive Spiellogik mit JavaScript
- Wörter werden aus der Datenbank geladen
- Verwaltung von Benutzersessions
- Zurück zum Menü während des Spiels
- MySQL-Datenbank
- Express-Server
- Konfiguration über Umgebungsvariablen
- Entwicklung mit Nodemon

## Verwendete Technologien

### Frontend

- HTML5
- CSS3
- JavaScript
- JavaScript ES Modules

### Backend

- Node.js
- Express
- Express Session
- MySQL
- dotenv
- validator

### Entwicklung

- Nodemon
- npm
- Git
- GitHub

## Projektstruktur

```text
words-game/
│
├── controllers/
│   └── ...                 # Controller der Anwendung
│
├── public/
│   └── ...                 # Frontend-Dateien
│
├── settings/
│   └── routes.js           # Routen der Anwendung
│
├── index.js                # Einstiegspunkt des Servers
├── response.js             # Verarbeitung der Serverantworten
├── playwords_db.sql        # SQL-Datei für die Datenbank
│
├── package.json            # Projektinformationen und Abhängigkeiten
├── package-lock.json
└── .gitignore
```

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/anastasiia-garalova/words-game.git
```

Anschließend in das Projektverzeichnis wechseln:

```bash
cd words-game
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren

Im Hauptverzeichnis des Projekts eine `.env`-Datei erstellen.

Beispiel:

```env
SESSION_SECRET=your_secret_key
```

Die benötigten Daten für die Datenbankverbindung müssen entsprechend der lokalen Konfiguration gesetzt werden.

> **Hinweis:** Die `.env`-Datei sollte nicht in das Git-Repository hochgeladen werden. Zugangsdaten und andere geheime Informationen sollten ausschließlich über Umgebungsvariablen verwaltet werden.

## Datenbank

Das Projekt verwendet **MySQL**.

Für die Datenbank steht die Datei

```text
playwords_db.sql
```

zur Verfügung.

Die SQL-Datei kann verwendet werden, um die benötigte Datenbankstruktur und die vorhandenen Daten zu erstellen.

Beispiel:

```bash
mysql -u username -p database_name < playwords_db.sql
```

Dabei müssen `username` und `database_name` an die eigene MySQL-Konfiguration angepasst werden.

## Anwendung starten

### Produktionsmodus

Zum Starten des Servers:

```bash
npm start
```

### Entwicklungsmodus

Während der Entwicklung kann Nodemon verwendet werden:

```bash
npm run dev
```

Nodemon startet den Server automatisch neu, wenn Änderungen an den Dateien vorgenommen werden.

## Server

Der Server wird über `index.js` gestartet.

Die Anwendung verwendet Express und stellt die Dateien aus dem Verzeichnis `public` für den Browser bereit.

Standardmäßig läuft der Server unter:

```text
http://127.0.0.1:5000
```

## Aufbau der Anwendung

Die Anwendung ist in mehrere Bereiche aufgeteilt:

```text
Browser
   │
   ▼
Express Server
   │
   ├── Routes
   │
   ├── Controllers
   │
   ├── Public
   │
   └── MySQL
```

### Routes

Die Routen der Anwendung befinden sich in:

```text
settings/routes.js
```

Sie definieren, welche Anfragen an welche Bereiche der Anwendung weitergeleitet werden.

### Controllers

Die Controller befinden sich im Verzeichnis:

```text
controllers/
```

Sie enthalten die Logik für die Verarbeitung der Anfragen.

### Public

Im Verzeichnis:

```text
public/
```

befinden sich die Dateien für die Benutzeroberfläche und die Spiellogik.

## Spielablauf

Nach dem Start der Anwendung kann der Benutzer das Spiel über die Benutzeroberfläche starten.

Während des Spiels werden die Wörter verarbeitet und die entsprechenden Spielaktionen im Browser ausgeführt.

Die Spiellogik wird auf der Client-Seite mit JavaScript umgesetzt.

Über die Zurück-Schaltfläche kann der Benutzer das laufende Spiel verlassen und zum Menü zurückkehren.

## Sessions

Für die Verwaltung von Benutzersessions wird `express-session` verwendet.

Der Session-Schlüssel sollte über eine Umgebungsvariable festgelegt werden:

```env
SESSION_SECRET=your_secret_key
```

Dadurch müssen sensible Informationen nicht direkt im Quellcode gespeichert werden.

## Entwicklung

Für die Entwicklung empfiehlt sich:

```bash
npm run dev
```

Dadurch wird der Server mit Nodemon gestartet.

Nach Änderungen am Quellcode wird der Server automatisch neu gestartet.

## Fehlerbehebung

### Der Server startet nicht

Überprüfen, ob alle Abhängigkeiten installiert wurden:

```bash
npm install
```

Anschließend kann die Anwendung erneut gestartet werden:

```bash
npm run dev
```

### Datenbankverbindung funktioniert nicht

Folgende Punkte überprüfen:

- Läuft der MySQL-Server?
- Existiert die verwendete Datenbank?
- Wurde die SQL-Datei importiert?
- Sind die Datenbank-Zugangsdaten korrekt?
- Sind alle benötigten Umgebungsvariablen gesetzt?

### Port 5000 ist bereits belegt

Falls der Port `5000` bereits von einer anderen Anwendung verwendet wird, muss der entsprechende Prozess beendet oder der Port in der Serverkonfiguration geändert werden.

## NPM-Skripte

Die wichtigsten verfügbaren Befehle sind:

```bash
npm start
```

Startet die Anwendung mit Node.js.

```bash
npm run dev
```

Startet die Anwendung im Entwicklungsmodus mit Nodemon.

```bash
npm install
```

Installiert alle benötigten Abhängigkeiten.

## 👩‍💻 Autor

**Anastasiia Garalova**

GitHub: https://github.com/anastasiia-garalova/words-game

## 📄 Lizenz

Für dieses Projekt ist derzeit keine separate Lizenz angegeben.