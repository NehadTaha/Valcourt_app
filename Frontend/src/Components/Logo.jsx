import logo from "../Img/logo.jpg";

const Logo = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center text-center p-5">
        <div className="col-6 col-md-5 col-lg-4 col-xl-3">
          <img
            src={logo}
            alt="Valcourt"
            style={{ height: "100%", width: "100%", maxWidth: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
