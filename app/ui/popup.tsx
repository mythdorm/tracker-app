"use client";

import React from "react";

interface PopupProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
};

export default function Popup ({ isOpen, onClose, children }: PopupProps) {
    if (!isOpen) return null; // Dont want it opening if it's closed

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}/>

            <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={onClose}>&times;</button>

                <div className="mt-2">{children}</div>
            </div>
        </div>
    )
}