const CardDetailFooter = ({ location, phone, websiteURL }) => {
  return (
    <>
      <div className="dFooter">
        <div>
          <h1>lieu</h1>
          <p className="content-text-font">{location}</p>
        </div>
        <div>
          <h1>phone</h1>
          <p className="content-text-font">{phone}</p>
        </div>
        <div>
          <h1>Website URL</h1>
          <a href={websiteURL} className="content-text-font">
            {websiteURL}
          </a>
        </div>
      </div>
    </>
  );
};

export default CardDetailFooter;
