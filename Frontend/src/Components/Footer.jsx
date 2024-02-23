import '../Styles/Footer.css'


const Footer = () => {
  return (
    <footer
      className="footer text-white text-center p-3"
    >
      <h2>Coordonnées</h2>
      <p>
        950, rue Saint-Joseph
        <br />
        Valcourt, Québec
        <br />
        J0E 2L0
        <br />
        Tél: 450-532-2252
        <br />
        Kevin Bombardier, directeur général
        <br />
        <a
          className="link"
          href="mailto:valcourt2030@outlook.com?subject=Info Valcourt 2030"
        >
          valcourt2030@outlook.com
        </a>
        <br />
        <a href="https://www.facebook.com/valcourt2030/">
          <i className="bi bi-facebook fs-1 text-white "></i>
        </a>
      </p>
    </footer>
  );
};
export default Footer;
