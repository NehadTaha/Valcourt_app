import { useEffect } from "react";

const SmallToast = ({ command, setCommand }) => {
  useEffect(() => {
    // Hide the component after 3 seconds
    const timeout = setTimeout(() => {
      setCommand(false);
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [command, setCommand]);

  return (
    <>
      {command ? (
        <div className="customToast slideIn">Enregistré!</div>
      ) : (
        <div className="customToast slideOut">Enregistré!</div>
      )}
    </>
  );
};

export default SmallToast;
