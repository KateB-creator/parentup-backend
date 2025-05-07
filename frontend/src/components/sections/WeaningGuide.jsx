
import React from 'react';
import '../styles/WeaningGuide.scss';

function WeaningGuide() {
  const recipes = [
    {
        title: "Crema di riso con verdure",
        description: "Perfetta per i primi pasti dai 6 mesi.",
        link: "https://www.nostrofiglio.it/neonato/alimentazione/svezzamento/crema-di-riso-con-zucchina-carota-e-patata",
        image: "/assets/crema-riso.png"
      },
    {
    title: "Omogeneizzato di mela e pera",
    description: "Una merenda naturale dai 5 mesi.",
    link: "https://www.starbene.it/alimentazione/diete/come-preparare-omogeneizzati-fatti-in-casa/",
    image: "/assets/omogeneizzato-frutta.png"
    },
    {
        title: "Purea di carote e patate",
        description: "Morbida, nutriente e facilissima da preparare.",
        link: "https://www.nostrofiglio.it/neonato/alimentazione/svezzamento/crema-di-patate-e-carote",
        image: "/assets/purea-carote-patate.png"
      },
      {
        title: "Semolino con brodo vegetale",
        description: "Una pappa delicata, adatta ai primi mesi.",
        link: "https://alimentazionebambini.e-coop.it/ricette/semolino-con-brodo-vegetale/",
        image: "/assets/semolino.png"
      },
      {
        title: "Mela cotta grattugiata",
        description: "Dolce, naturale, pronta in 5 minuti.",
        link: "https://ricette.pianetamamma.it/svezzamento/mela-grattugiata.html",
        image: "/assets/mela-cotta.png"
      },
      
    {
      title: "Pastina con crema di zucchine",
      description: "Pastina cremosa dai 7 mesi.",
      link: "https://alimentazionebambini.e-coop.it/ricette/pastina-con-crema-di-zucchine/",
      image: "/assets/pastina-zucchine.png"
    }
  ];

  return (
    <div className="my-5 weaning-guide container">
      <h3>Guida allo Svezzamento</h3>
      <p>
        Lo svezzamento è una tappa fondamentale per lo sviluppo del bambino. 
        Inizia gradualmente, osservando sempre le indicazioni del pediatra. 
        Ecco alcune ricette semplici e adatte ai primi mesi:
      </p>
      
      <div className="row">
        {recipes.map((recipe, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <a href={recipe.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Scopri la ricetta
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeaningGuide;
