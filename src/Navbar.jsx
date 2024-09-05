import React from 'react'

const Navbar = () => {
    return (
        <nav className='navbar rounded bg-light shadow-sm p-0'>
            <div className="d-flex justify-content-center align-items-center w-100">
                <img src="Unified-Logo_1.png" alt="LOGO" width={90} height={60} />
                <div className='fw-bold text-center text-blue w-100 fs-4 me-4'>Service Status</div>
            </div>
        </nav>
    )
}

export default Navbar