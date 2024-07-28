import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ToastComponent = () => {
    return (
        <>
            <ToastContainer
                autoClose={3000}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable
            />
        </>
    );
};

export const showToast = toast;

// interface ToastComponentProps {
//     toastMessage: string;
//     isShown: boolean;
//     onClose: () => void;
// };

// export const ToastComponent = (props: ToastComponentProps) => {
//     return props.toastMessage && (
//         <>
//             <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "1000" }}>
//                 <Toast show={props.isShown} onClose={props.onClose} delay={3000} autohide>
//                     <Toast.Body>
//                         {props.toastMessage}
//                     </Toast.Body>
//                 </Toast>
//             </div>
//         </>
//     );
// };