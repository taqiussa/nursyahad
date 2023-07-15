import SidebarLink from '@/Components/Sia/SidebarLink'
import React from 'react'

const SidebarTataUsaha = ({ closeSide }) => {
    return (
        <div className='py-1'>
            <div className='text-slate-600 font-bold'>
                Tata Usaha
            </div>
            <div>
                {/* <SidebarLink closeSide={closeSide} href={route('atur-kelas-siswa')} active={route().current('atur-kelas-siswa')} label='atur kelas siswa' /> */}
                {/* <SidebarLink closeSide={closeSide} href={route('data-kelas')} active={route().current('data-kelas')} label='data kelas' /> */}
                <SidebarLink closeSide={closeSide} href={route('atur-siswa-keluar')} active={route().current('atur-siswa-keluar')} label='atur siswa keluar' />
                <SidebarLink closeSide={closeSide} href={route('data-siswa')} active={route().current('data-siswa')} label='data siswa' />
                <SidebarLink closeSide={closeSide} href={route('data-siswa-keluar')} active={route().current('data-siswa-keluar')} label='data siswa keluar' />
                {/* <SidebarLink closeSide={closeSide} href={route('tambah-kelas')} active={route().current('tambah-kelas')} label='tambah kelas' /> */}
                <SidebarLink closeSide={closeSide} href={route('tambah-siswa')} active={route().current('tambah-siswa')} label='tambah siswa' />
            </div>
        </div>
    )
}

export default SidebarTataUsaha