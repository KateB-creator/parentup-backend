import React, { useState } from "react";
import "../styles/BabyCareSection.css";

const BabyCareSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleOpenModal = (title, body, image) => {
    setModalContent({ title, body, image });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const items = [
    {
      img: "/images/why1.png",
      title: "Come fare il bagnetto",
      body: "Usa acqua tiepida (circa 37°C) e un detergente delicato. Sostieni il bambino e lavalo con movimenti dolci.",
    },
    {
      img: "/images/why2.png",
      title: "Come cambiare il pannolino",
      body: "Stendi il neonato su una superficie sicura. Pulisci con salviette o acqua tiepida, asciuga bene e applica crema protettiva. Posiziona il pannolino sotto il bambino con le linguette ai lati. Porta la parte anteriore tra le gambe e fissala con le linguette, senza stringere troppo.",
    },
    {
      img: "/images/why3.png",
      title: "Come controllare la temperatura",
      body: "Usa un termometro digitale. La temperatura ideale per un neonato è tra 36,5°C e 37,5°C.",
    },
    {
      img: "/images/why4.png",
      title: "Come pulire il cordone ombelicale",
      body: "Pulisci delicatamente con una garza sterile inumidita, senza strofinare. Mantieni asciutto fino alla caduta naturale.",
    },
    {
      img: "/images/why1.png",
      title: "Come preparare il biberon",
      body: "Lava bene le mani e sterilizza il biberon. Versa acqua bollita a 40°C, aggiungi il latte in polvere nelle dosi corrette e agita bene. Controlla la temperatura sul polso.",
    },
    {
      img: "/images/why2.png",
      title: "Come pulire il biberon",
      body: "Smonta tutte le parti, lava con acqua calda e sapone delicato, usa uno scovolino. Sterilizza con bollitura o vapore.",
    },
    {
      img: "/images/why3.png",
      title: "Come pulire il culetto del neonato",
      body: "Usa acqua tiepida o salviette delicate. Tampona e asciuga bene. Applica crema barriera se necessario.",
    },
    {
      img: "/images/why4.png",
      title: "Come stimolare lo sviluppo del neonato",
      body: "Parla al bambino, cantagli canzoncine, mantieni il contatto visivo. Usa oggetti colorati e fai tummy time ogni giorno per rafforzare i muscoli. Il contatto e la voce dei genitori sono fondamentali.",
    },
    {
      img: "/images/why1.png",
      title: "Come favorire il linguaggio nel neonato",
      body: "Parla spesso con tono dolce. Nomina oggetti, ripeti suoni e leggi storie brevi. Rispondi ai suoi vocalizzi come fosse una conversazione.",
    },
    {
      img: "/images/why2.png",
      title: "Come tagliare le unghie del neonato",
      body: "Usa forbicine con punte arrotondate. Taglia mentre dorme, alla luce naturale. Fai tagli piccoli e dritti o lima le unghie per sicurezza.",
    },
    {
      img: "/images/why3.png",
      title: "Come mantenere pulita la culla",
      body: "Cambia i lenzuolini 2–3 volte a settimana o in caso di rigurgiti. Usa detersivi delicati. Evita cuscini e peluche. Pulisci le sbarre con un panno umido.",
    },
    {
      img: "/images/why4.png",
      title: "Come calmare le coliche del neonato",
      body: "Massaggia dolcemente il pancino, tienilo in verticale dopo le poppate o prova la posizione pancia in giù sull’avambraccio. Consulta il pediatra se persistono.",
    },
  ];

  return (
    <>
      <section id="neonato" className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <div className="mb-5">
            <h2>Cura del Bambino</h2>
            <p className="text-muted">
              Dal pannolino al bagnetto: tutto ciò che devi sapere per prenderti
              cura del tuo neonato.
            </p>
          </div>
          <div className="row g-4">
            {items.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={index} data-aos="zoom-in">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="img-fluid mb-3"
                    />
                    <h5 className="card-title">{item.title}</h5>
                    <button
                      className="btn btn-link text-decoration-none btn-orange"
                      onClick={() =>
                        handleOpenModal(item.title, item.body, item.modalImg)
                      }
                    >
                      <span>Scopri di più</span>
                      <hr className="mt-1 mb-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalContent.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={modalContent.image}
                    alt=""
                    className="img-fluid rounded mb-3"
                  />
                  <p>{modalContent.body}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default BabyCareSection;
