import SidebarLink from '@/Components/Sia/SidebarLink'
import React from 'react'

const SidebarSiswa = ({ closeSide }) => {
    return (
        <div className='py-1'>
            <div className="text-slate-600 font-bold">
                Siswa
            </div>
            <div>
                <SidebarLink closeSide={closeSide} href={route('kehadiran-sekolah')} active={route().current('kehadiran-sekolah')} label='kehadiran sekolah' />
            </div>
        </div>
    )
}

export default SidebarSiswa