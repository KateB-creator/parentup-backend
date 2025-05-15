// src/pages/PrivacyPage.jsx
import React from "react";

const PrivacyPage = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Informativa sulla Privacy</h1>
      <p>
        In questa sezione spieghiamo come raccogliamo, usiamo e proteggiamo i dati
        personali degli utenti che utilizzano ParentUp.
      </p>

      <h3>Dati Raccolti</h3>
      <p>
        Raccogliamo solo le informazioni strettamente necessarie per il funzionamento
        dell'app, come nome, email e contenuti generati dagli utenti (post/commenti).
      </p>

      <h3>Finalità del Trattamento</h3>
      <p>
        I dati vengono utilizzati per fornire i servizi richiesti, migliorare l’esperienza
        utente e garantire la sicurezza della piattaforma.
      </p>

      <h3>Conservazione dei Dati</h3>
      <p>
        I dati personali saranno conservati solo per il tempo necessario agli scopi previsti
        e non saranno mai ceduti a terzi senza consenso.
      </p>

      <h3>Diritti dell’Utente</h3>
      <p>
        Ogni utente può richiedere in qualsiasi momento la modifica o la cancellazione dei
        propri dati scrivendo a: <a href="mailto:info@parentup.it">info@parentup.it</a>
      </p>

      <p className="mt-4">
        Ultimo aggiornamento: maggio 2025
      </p>
    </div>
  );
};

export default PrivacyPage;
