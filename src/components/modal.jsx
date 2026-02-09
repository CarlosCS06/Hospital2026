'use client'
import { useRef, useImperativeHandle, forwardRef } from 'react'

const Modal = forwardRef(({ children, title }, ref) => {
    const dialogRef = useRef()

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal(),
        close: () => dialogRef.current.close()
    }))

    return (
        <dialog
            ref={dialogRef}
            className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-transparent p-0 w-full max-w-xl outline-none"
            onClick={(e) => {
                if (e.target === dialogRef.current) dialogRef.current.close();
            }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <button
                        onClick={() => dialogRef.current.close()}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl font-light"
                    >
                        &times;
                    </button>
                </div>
                <div className="bg-white dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </dialog>
    )
})

Modal.displayName = 'Modal';

export default Modal