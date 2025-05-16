import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, updateUser, deleteUser, getNotifications,clearNotifications,} from "../api/auth";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [nome] = useState(localStorage.getItem("userNome") || "");
  const [cognome] = useState(localStorage.getItem("userCognome") || "");
  const [messaggio, setMessaggio] = useState("");
  const [modificaAttiva, setModificaAttiva] = useState(false);
  const [modificaPassword, setModificaPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [notifiche, setNotifiche] = useState([]);

  const [curaBambino, setCuraBambino] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("curaBambino")) || Array(5).fill(false)
    );
  });

  const [ritornoLavoro, setRitornoLavoro] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("ritornoLavoro")) || Array(5).fill(false)
    );
  });

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  useEffect(() => {
    localStorage.setItem("curaBambino", JSON.stringify(curaBambino));
  }, [curaBambino]);

  useEffect(() => {
    localStorage.setItem("ritornoLavoro", JSON.stringify(ritornoLavoro));
  }, [ritornoLavoro]);

  const caricaNotifiche = () => {
    getNotifications()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setNotifiche(res.data);
        }
      })
      .catch((err) => console.error("Errore notifiche:", err));
  };

  useEffect(() => {
    caricaNotifiche();
  }, []);

  const toggleCheckbox = (index, type) => {
    if (type === "cura") {
      const updated = [...curaBambino];
      updated[index] = !updated[index];
      setCuraBambino(updated);
    } else if (type === "lavoro") {
      const updated = [...ritornoLavoro];
      updated[index] = !updated[index];
      setRitornoLavoro(updated);
    }
  };

  const handleClearNotifications = () => {
    clearNotifications()
      .then((res) => {
        if (res.data.success) {
          setNotifiche([]);
        }
      })
      .catch((err) =>
        console.error("Errore durante la cancellazione notifiche:", err)
      );
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/login");
  };

  const handleModifica = async () => {
    try {
      const id = localStorage.getItem("userId"); 

      const payload = { email };
      if (newPassword.trim()) {
        payload.password = newPassword;
      }

      const res = await updateUser(id, payload); 
      if (res.data.success) {
        localStorage.setItem("userEmail", email);
        setMessaggio("Dati aggiornati con successo.");
        setModificaAttiva(false);
        setNewPassword("");
      } else {
        setMessaggio(res.data.message || "Errore durante l’aggiornamento.");
      }
    } catch (err) {
      setMessaggio("Errore di connessione.");
    }
  };

  const handleCancella = async () => {
    if (
      window.confirm(
        "Sei sicuro di voler cancellare il tuo account? L'operazione è irreversibile."
      )
    ) {
      try {
        const res = await deleteUser();
        if (res.data.success) {
          localStorage.clear();
          navigate("/register");
        } else {
          setMessaggio(res.data.message || "Errore durante la cancellazione.");
        }
      } catch (err) {
        setMessaggio("Errore di connessione.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 class="title-welcome">
        Benvenutə {nome} {cognome}
      </h1>
      <p>Questa è la tua dashboard personale.</p>

      <hr />
      <h4>🔔 Le tue notifiche</h4>

      {notifiche.length > 0 ? (
        <div className="alert alert-info">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📩 Notifiche recenti</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClearNotifications}
            >
              Segna tutte come lette
            </button>
          </div>
          <ul className="mb-0 mt-2">
            {notifiche.map((n, i) => (
              <li key={i}>
                {n.message}{" "}
                <small className="text-muted">({n.created_at})</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted">Nessuna notifica al momento.</p>
      )}

      {/* Checklist Cura del Bambino */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Checklist per la cura del bambino</h5>
          <ul className="list-unstyled">
            {[
              "Allattamento o biberon",
              "Cambio pannolino",
              "Tempo pelle a pelle",
              "Controllo della temperatura",
              "Nanna sicura",
            ].map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={curaBambino[i]}
                  onChange={() => toggleCheckbox(i, "cura")}
                />{" "}
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Checklist per il ritorno al lavoro</h5>
          <ul className="list-unstyled">
            {[
              "Organizzazione allattamento (tiralatte o svezzamento)",
              "Baby-sitter o nido confermati",
              "Pianificazione orari e permessi",
              "Preparazione kit lavoro/mamma",
              "Condivisione compiti con il partner",
            ].map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={ritornoLavoro[i]}
                  onChange={() => toggleCheckbox(i, "lavoro")}
                />{" "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      <h5>Gestione account</h5>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          disabled={!modificaAttiva}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {modificaAttiva && (
        <div className="mb-3">
          <label>Nuova password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Lascia vuoto per non cambiare"
          />
        </div>
      )}

      <div className="d-flex gap-2">
        {modificaAttiva ? (
          <>
            <button className="btn btn-success" onClick={handleModifica}>
              Salva
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setModificaAttiva(false);
                setModificaPassword(false);
                setNewPassword("");
              }}
            >
              Annulla
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setModificaAttiva(true)}
          >
            Modifica email o password
          </button>
        )}
        <button className="btn btn-danger ms-auto" onClick={handleCancella}>
          Elimina account
        </button>
      </div>

      {messaggio && <div className="alert alert-info mt-3">{messaggio}</div>}

      <hr />

      <button onClick={handleLogout} className="btn btn-outline-danger mt-3">
        Logout
      </button>
    </div>
  );
}
