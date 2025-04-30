# ParentUp

Benvenutə su **ParentUp**! 😊

ParentUp è un'applicazione inclusiva post-parto pensata per supportare attivamente papà, partner, papà adottivi, genitori LGBTQ+ e chiunque voglia essere una presenza significativa nel percorso di crescita di un neonato o bambino.

---

## 🎓 Tecnologie utilizzate

- **Frontend**: React + Vite + Bootstrap 5 + SCSS
- **Backend**: PHP
- **Database**: MySQL
- **Server locale**: XAMPP (Apache + MySQL)

---

## 🔧 Funzionalità principali

- **HomePage**: dashboard semplice, empatica e personalizzabile
- **Cura del neonato**: guida all'allattamento, svezzamento, routine base
- **Comunicazione genitoriale**: diario condiviso, calendario familiare, spazio "Noi due"
- **Genitorialità LGBTQ+**: percorsi specifici, podcast, mappa dei servizi
- **Rientro al lavoro**: consigli pratici, supporto emotivo e servizi utili
- **Benessere emotivo**: meditazioni, esercizi di rilassamento, diario emozionale
- **Community e supporto**: forum, gruppi tematici, incontri online, contatto diretto con esperti

---

## 🔗 Struttura progetto

```
/parentup
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── db.php
│   └── saveRequest.php
├── .gitignore
├── README.md
```

---

## 🔄 Installazione locale

1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuo-utente/parentup.git
   cd parentup
   ```

2. **Frontend (React):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend (PHP + MySQL):**
   - Posiziona la cartella `parentup/` dentro `C:/xampp/htdocs/` (se usi XAMPP)
   - Avvia Apache e MySQL da XAMPP
   - Crea il database `parentup_db` ed esegui lo script di creazione tabella:
     ```sql
     CREATE TABLE expert_requests (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       expert_type VARCHAR(100) NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Accesso all'app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost/parentup/backend/](http://localhost/parentup/backend/)

---

## 📊 Stato di sviluppo

- [x] Struttura frontend React completata
- [x] Gestione SCSS separata per sezioni
- [x] Form contatto esperto collegato a database
- [x] Sistema CORS configurato correttamente
- [ ] Aggiunta funzionalità forum e gruppi tematici (prossimamente)
- [ ] Ottimizzazione UI/UX mobile
- [ ] Deploy in produzione

---

## 👥 Credits

Sviluppato da **Balia Katiuscia** con amore per tutti i genitori e partner. 💜

---

## 🚀 Licenza

Progetto open-source per scopo educativo e di supporto sociale.

