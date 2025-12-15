import { ToastContainer, Toast } from "react-bootstrap";

export default function MyToast(props) {
  const show = props?.show;
  const taostText = props?.taostText;

  const handleClose = () => {
    props?.showToast(false);
  };

  return (
    <ToastContainer position="top-center" style={{ zIndex: 1 }}>
      <Toast
        show={show}
        onClose={handleClose}
        bg="warning"
        autohide
        delay={2000}
      >
        <Toast.Header>
          <strong className="me-auto">{taostText[0].header}</strong>
        </Toast.Header>
        <Toast.Body>{taostText[0].body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
