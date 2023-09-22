import Swal from "sweetalert2";
export const confirmPopUp = (handleConfirm, handleDenied) => {
  Swal.fire({
    title: "Are you sure you want to delete?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#f44336",
    denyButtonText: `Cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handleConfirm();
    } else if (result.isDenied) {
      handleDenied();
    }
  });
};
