import Swal from 'sweetalert2';

export function successNotification(message: any) {
    Swal.fire({
        text: message,
        icon: 'success',
        background: '#d4edda',
        color: '#155724',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
        iconColor: '#28a745',
        width: '250px',
    });
}

export function errorNotification(message: any) {
    Swal.fire({
        text: message,
        icon: 'error',
        background: '#f8d7da',
        color: '#721c24',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
        iconColor: '#dc3545',
        width: '250px',
    });
}