const CardDetailFooter = ({location, phone}) => {
    return (
      <>
        <div className="dFooter">
          <div>
            <h1>lieu</h1>
            <p>{location}</p>
          </div>
          <div>
            <h1>phone</h1>
            <p>{phone}</p>
          </div>
        </div>
      </>
    );
  };
  
  export default CardDetailFooter;
  