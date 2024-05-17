import { useEffect } from "react";

const AdminToast = ({ command, setCommand }) => {

  // Effect hook to handle timeout for hiding the component
  useEffect(() => {
    // Hide the component after 3 seconds
    const timeout = setTimeout(() => {
      setCommand(false);
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout); // Clear the timeout when the component unmounts or re-renders
  }, [command, setCommand]);// Dependency array with command and setCommand
 // JSX markup for rendering the component
  return (
    <>
      {command ? (
        <div className="admin-customToast slideIn">Envoyé!</div>
      ) : (
        <div className="admin-customToast slideOut">Envoyé!</div>
      )}
    </>
  );
};

export default AdminToast;
