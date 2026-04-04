import Swal from "sweetalert2";

export const showAlert = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    Swal.fire({
        position: "center",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}