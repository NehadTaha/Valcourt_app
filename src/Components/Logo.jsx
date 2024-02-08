//Import logo.jpg from the public folder
import logo from "../Img/logo.jpg";
const Logo = () => {
  return (
    <div className="container-flex">
      <div className="row text-center p-5">
        <div className="col-12">
          <img
            src={logo}
            alt="Valcourt"
            style={{ height: "100%", width: "20%", position: "center" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
