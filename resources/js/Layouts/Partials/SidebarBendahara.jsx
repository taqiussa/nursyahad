import SidebarLink from '@/Components/Sia/SidebarLink'
import React from 'react'

const SidebarBendahara = ({ closeSide }) => {
    return (
        <div className='py-1'>
            <div className='text-slate-600 font-bold'>
                Bendahara
            </div>
            <div>
                <SidebarLink closeSide={closeSide} href={route('input-pembayaran-sekolah')} active={route().current('input-pembayaran-sekolah')} label='input pembayaran sekolah' />
                <SidebarLink closeSide={closeSide} href={route('input-pengeluaran-siswa')} active={route().current('input-pengeluaran-siswa')} label='input pengeluaran siswa' />
                <SidebarLink closeSide={closeSide} href={route('input-uang-saku')} active={route().current('input-uang-saku')} label='input uang saku' />
            </div>
        </div>
    )
}

export default SidebarBendahara