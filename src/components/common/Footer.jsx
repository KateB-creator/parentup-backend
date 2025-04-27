import '../styles/Footer.scss';

function Footer() {
    return (
      <footer className="footer text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} ParentUp - Tutti i diritti riservati</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  