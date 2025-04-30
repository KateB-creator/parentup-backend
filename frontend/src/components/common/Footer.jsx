import '../styles/Footer.scss';

function Footer() {
    return (
      <footer className="footer py-3">
        <div className="container">
          <p className="mb-0 text_footer">&copy; {new Date().getFullYear()} ParentUp - Tutti i diritti riservati - Progetto sviluppato da Balia Katiuscia</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  