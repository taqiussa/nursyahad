import SidebarLink from '@/Components/Sia/SidebarLink'
import React from 'react'

const SidebarAdmin = ({ closeSide }) => {
    return (
        <div className='py-1'>
            <div className="text-slate-600 font-bold capitalize">
                admin
            </div>
            <div>
                <SidebarLink closeSide={closeSide} href={route('buat-role')} active={route().current('buat-role')} label='buat role' />
                <SidebarLink closeSide={closeSide} href={route('upload-siswa')} active={route().current('upload-siswa')} label='upload siswa' />
            </div>
        </div>
    )
}

export default SidebarAdmin