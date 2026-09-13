# Words Game 🎮

## 📖 Über das Projekt

**Words Game** ist eine Webanwendung mit einem interaktiven Wortspiel, die mit JavaScript, Node.js und Express entwickelt wurde.

Das Projekt besteht aus einem Frontend, einem Backend und einer MySQL-Datenbank. Die Spiellogik wird clientseitig mit JavaScript umgesetzt. Die Wörter und bestimmte Spieldaten werden dabei im **Local Storage des Browsers** gespeichert.

Die MySQL-Datenbank wird für die **Verwaltung von Benutzern** verwendet. Der Express-Server übernimmt unter anderem die Kommunikation mit der Datenbank und die Verwaltung der Benutzersessions.

## ✨ Funktionen

- 🎮 Interaktives Wortspiel direkt im Browser
- 🧩 Spiellogik mit JavaScript
- 💾 Speicherung der Wörter im Local Storage
- 👤 Benutzerverwaltung
- 🔐 Verwaltung von Benutzersessions
- ⬅️ Zurück zum Menü während des Spiels
- 🗄️ MySQL-Datenbank für Benutzerdaten
- 🌐 Express-Server
- 🔑 Konfiguration über Umgebungsvariablen
- 💻 Entwicklungsmodus mit Nodemon

## 🛠️ Verwendete Technologien

### Frontend

- HTML5
- CSS3
- JavaScript
- JavaScript ES Modules
- Local Storage

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

## 🏗️ Architektur

Die Anwendung besteht aus drei wesentlichen Bereichen:

```text
┌──────────────────────┐
│      Browser         │
│                      │
│  HTML / CSS / JS     │
│  Spiellogik          │
│  Local Storage       │
└──────────┬───────────┘
           │
           │ HTTP
           ▼
┌──────────────────────┐
│    Express Server    │
│                      │
│  Routes              │
│  Controllers         │
│  Sessions            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MySQL          │
│                      │
│     Benutzerdaten    │
└──────────────────────┘
```

### Local Storage

Die für das Spiel benötigten Wörter werden aktuell **nicht in der MySQL-Datenbank gespeichert**.

Sie werden im Browser über den `localStorage` gespeichert und von der clientseitigen JavaScript-Logik verwendet.

Dadurch können die Wörter direkt im Browser geladen und während des Spiels verarbeitet werden.

### MySQL-Datenbank

Die MySQL-Datenbank wird für die Speicherung und Verwaltung der **Benutzerdaten** verwendet.

Für die Datenbank steht die Datei

```text
playwords_db.sql
```

zur Verfügung.

Die SQL-Datei kann verwendet werden, um die benötigte Datenbankstruktur zu erstellen.

Beispiel:

```bash
mysql -u username -p database_name < playwords_db.sql
```

Dabei müssen `username` und `database_name` an die eigene MySQL-Konfiguration angepasst werden.

## 📁 Projektstruktur

```text
words-game/
│
├── controllers/
│   └── ...                 # Controller der Anwendung
│
├── public/
│   └── ...                 # Frontend-Dateien und Spiellogik
│
├── settings/
│   └── routes.js           # Routen der Anwendung
│
├── index.js                # Einstiegspunkt des Servers
├── response.js             # Verarbeitung der Serverantworten
├── playwords_db.sql        # Datenbankstruktur
│
├── package.json            # Projektinformationen und Abhängigkeiten
├── package-lock.json
└── .gitignore
```

## 🎮 Spielablauf

Nach dem Start der Anwendung kann der Benutzer das Wortspiel über die Benutzeroberfläche starten.

Die Spiellogik wird auf der Client-Seite mit JavaScript ausgeführt. Die benötigten Wörter werden aus dem **Local Storage** geladen und während des Spiels verarbeitet.

Der Benutzer kann über die entsprechende Schaltfläche das laufende Spiel verlassen und zum Menü zurückkehren.

## 👤 Benutzer und Sessions

Die Benutzerverwaltung erfolgt über den Express-Server und die MySQL-Datenbank.

Für die Verwaltung der Benutzersessions wird `express-session` verwendet.

Der Session-Schlüssel wird über eine Umgebungsvariable konfiguriert:

```env
SESSION_SECRET=your_secret_key
```

Sensible Informationen wie Passwörter oder andere Zugangsdaten sollten nicht direkt im Quellcode gespeichert werden.

## 🚀 Installation

### 1. Repository klonen

```bash
git clone https://github.com/anastasiia-garalova/words-game.git
cd words-game
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren

Im Hauptverzeichnis eine `.env`-Datei erstellen.

Beispiel:

```env
SESSION_SECRET=your_secret_key
```

Zusätzlich müssen die für die lokale MySQL-Verbindung benötigten Umgebungsvariablen entsprechend der eigenen Konfiguration gesetzt werden.

> **Hinweis:** Die `.env`-Datei sollte nicht in das Git-Repository hochgeladen werden.

## ▶️ Anwendung starten

### Produktionsmodus

```bash
npm start
```

### Entwicklungsmodus

```bash
npm run dev
```

Im Entwicklungsmodus wird Nodemon verwendet. Der Server wird dadurch nach Änderungen am Quellcode automatisch neu gestartet.

## 🌐 Server

Der Server wird über `index.js` gestartet.

Express stellt die Dateien aus dem Verzeichnis `public` für den Browser bereit.

Standardmäßig ist die Anwendung unter folgender Adresse erreichbar:

```text
http://127.0.0.1:5000
```

## 🐛 Fehlerbehebung

### Der Server startet nicht

Abhängigkeiten überprüfen:

```bash
npm install
```

Anschließend:

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

Falls Port `5000` bereits verwendet wird, muss entweder der entsprechende Prozess beendet oder der Port in der Serverkonfiguration geändert werden.

## 📦 NPM-Skripte

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

Installiert die benötigten Abhängigkeiten.

## 👩‍💻 Autor

**Anastasiia Garalova**

GitHub: https://github.com/anastasiia-garalova/words-game

## 📄 Lizenz

Für dieses Projekt ist derzeit keine separate Lizenz angegeben.