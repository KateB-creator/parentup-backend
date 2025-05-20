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

### 🏠 Dashboard


### ✅ Checklist Rientro al Lavoro


### 💬 Community Support


---

## 🧱 Tecnologie utilizzate

### 🖥️ Frontend (React + Vite)
- React con routing e protezione pagine
- Bootstrap + SCSS
- LocalStorage + chiamate API con `fetch`

### ⚙️ Backend (PHP + MySQL su XAMPP)
- REST API modulari 
- Autenticazione 
- PDO per accesso sicuro al DB
- Validazione, sicurezza e gestione utenti

---

## 📁 Struttura del progetto

parentup/
├── backend/
    ├── middleware/
        ├── authMiddleware.php
│   ├── controllers/
│   │   ├── NotificationController.php
│   │   ├── CommentController.php
│   │   ├── PostController.php
│   │   └── UserController.php
│   ├── models/
│   │   ├── User.php
│   │   ├── Comment.php
│   │   ├── Post.php
│   │   └── Notification.php
│   ├── config/
│   │   └── db.php
│   ├── routes/
│   │   └── api.php
│   ├── index.php
│   └── parentup.sql
│
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   └── icons/
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── BenessereSection.jsx
│   │   │   ├── LGBTQSection.jsx
│   │   │   ├── BoardSection.jsx
│   │   │   └── PrivateRoutes.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── Dashboard.jsx
            └── PrivacyPage.jsx
        ├──  styles/
│   │   │   
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json


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
