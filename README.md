# 👨‍👨‍👦 ParentUp

**ParentUp** è un'applicazione web inclusiva, progettata per supportare i papà, i genitori LGBTQ+ e tutte le famiglie nel periodo post-parto e nella gestione quotidiana della genitorialità moderna.  
Il progetto nasce con l'obiettivo di fornire strumenti pratici, emotivi e organizzativi per accompagnare il rientro al lavoro, la cura dei figli e la condivisione delle responsabilità.

---

## 🎯 Obiettivi del progetto

- Supportare la **paternità attiva e consapevole**
- Valorizzare la **diversità delle famiglie**, in particolare quelle LGBTQ+
- Fornire strumenti concreti, accessibili e utilizzabili su web e mobile
- Offrire un'interfaccia user-friendly e responsive per tutti i dispositivi

---

## 📲 In fase di sviluppo

- 💻 Mockup completi (desktop & mobile) in Figma
- 📱 Conversione in app Android/iOS prevista (con Capacitor o React Native)
- 🔄 Continui aggiornamenti e refactoring in corso

---

## 🧠 Funzionalità attuali

### 🔐 Autenticazione
- Login/registrazione con token semplificato (`Bearer user-{id}`)
- Sessione utente e partner
- Protezione delle route e API tramite JWT

### 🏠 Dashboard
- Diario condiviso tra i partner
- Emozioni, pensieri e attività giornaliere salvate nel database
- Visualizzazione e aggiornamento promemoria

### 📍 Mappa Parcheggi Rosa
- Geolocalizzazione utente (Leaflet)
- Evidenziazione parcheggi entro 1km
- Aggiunta parcheggi personalizzati (salvati via API)
- Icone personalizzate (`car.png`, `pink.car.png`)

### ✅ Checklist Rientro al Lavoro
- Task predefiniti + stato completamento
- Salvataggio automatico (localStorage + backend)
- Planner settimanale personalizzabile

### 💬 Community Support
- Area social per post/commenti
- Diario delle emozioni
- Sezione LGBTQ+ Parenting
- Guide babycare, routine giornaliere e benessere emotivo

---

## 🧱 Tecnologie utilizzate

### 🖥️ Frontend (React + Vite)
- React con routing e protezione pagine
- Bootstrap + SCSS
- Leaflet per mappa interattiva
- LocalStorage + chiamate API con `fetch`

### ⚙️ Backend (PHP + MySQL su XAMPP)
- REST API modulari (`auth/`, `diary/`, `return_to_work/`, `parking/`)
- Autenticazione token-based
- PDO per accesso sicuro al DB
- Validazione, sicurezza e gestione utenti

---

## 📁 Struttura del progetto

PARENTUP/
├── backend/
│ └── api/
│ ├── auth/ # Login, registrazione, validazione token
│ ├── diary/ # Diario condiviso
│ ├── dashboard/ # Dati utente per dashboard
│ ├── parking/ # Parcheggi rosa (get/add)
│ ├── return_to_work/ # Checklist e planner
│ └── user/, db.php
├── frontend/
│ ├── public/
│ │ └── icons/ # Icone personalizzate (car, pink car)
│ └── src/
│ ├── components/
│ │ ├── auth/ # Login, register, dashboard protetta
│ │ ├── common/ # Navbar, Footer
│ │ └── sections/ # BabyCare, LGBTQParenting, ReturnToWork...
│ ├── styles/ # CSS e SCSS sezioni
│ └── App.jsx, main.jsx
├── .env
├── vite.config.js
├── LICENSE
└── README.md

## 🧪 Come eseguire l'app

### Requisiti:
- Node.js + npm
- PHP (via XAMPP)
- MySQL (via XAMPP)
- Figma (per mockup UI)

### 1. Frontend (React)
```bash
cd frontend
npm install
npm run dev

Backend (PHP + MySQL)
Avvia XAMPP: Apache + MySQL

Importa il dump SQL nel database (parentup)

Accedi a http://localhost:5173


🔐 Note sulla sicurezza
Autenticazione semplificata in locale (user-{id})

In produzione si prevede uso di JWT completi con chiavi segrete

Validazioni lato server (da rafforzare)

🏳️‍🌈 Dedicato a...
Tutti i papà, le mamme, i genitori queer, le famiglie arcobaleno e ogni persona che sceglie l’amore come base per costruire una famiglia.
ParentUp nasce per voi.

👤 Autore
Katiuscia Balia
📍 Decimomannu, Sardegna 
🎓 jr Full stack Developer- specializzata nel lato Frontend
🔗 In fase di pubblicazione online
