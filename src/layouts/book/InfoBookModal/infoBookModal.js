import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";

function InfoBookModal(props) {
  InfoBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    book: PropTypes.object,
  };
  console.log("book", props.book);
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form>
        <MDBox
          bgColor="white"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            p: 4,
          }}
        >
          <p>Modal</p>
        </MDBox>
      </form>
    </Modal>
  );
}

export default InfoBookModal;
