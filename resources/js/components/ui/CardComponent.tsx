import React from "react";

interface CardComponentProps {
    title: string;
    children: React.ReactNode;
    buttonModal?: string;
    openModal?: () => void;
    className?: string;
}


const CardComponent = ({
    title,
    children,
    buttonModal,
    openModal,
    className = "",
}: CardComponentProps) => {
    return (
        <>
            <div className={`rounded-2xl border border-gray-200 bg-white mt-5 p-2 ${className}`}>
                <div className="px-6 py-2  rounded-2xl mt-2 flex items-center justify-between">
                    <h1 className="text-3xl  text-black font-bold">
                        {title}
                    </h1>
                    {buttonModal && <button className="text-green-dark bg-green-dark text-white hover:bg-green-700 px-3 py-2 rounded-md" onClick={openModal}>
                        {buttonModal}
                    </button>}
                </div>
                <div className="p-4 border-t border-gray-300 sm:p-6">
                    <div className="space-y-6">{children}</div>
                </div>
            </div>
        </>
    );
};

export default CardComponent;
