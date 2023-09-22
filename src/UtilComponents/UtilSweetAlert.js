import Swal from "sweetalert2";
export const confirmDelete = (handleConfirm, handleDenied) => {
  Swal.fire({
    title: "Anda yakin ingin menghapus data?",
    showCancelButton: true,
    confirmButtonText: "Ya",
    confirmButtonColor: "#f44336",
    denyButtonText: `Batal`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handleConfirm();
    } else if (result.isDenied) {
      handleDenied();
    }
  });
};
