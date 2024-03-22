import React from 'react'

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div className='relative'>
            {isOpen ? (
                <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <div className="bg-black w-full h-full fixed top-0 left-0 right-0 bottom-0"></div>
                    <div className="relative z-10 w-[33.75rem] p-[0px] shadow shadow-borderGradient1 rounded-lg bg-gradient-to-b from-borderGradient1 via-white to-borderGradient1">
                        <div className="bg-black rounded-lg">
                            <div className=" rounded-lg bg-signipPopupBG bg-opacity-80">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
