import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'

const TambahSiswa = () => {
    return (
        <>
        <Head title='Tambah Siswa' />
        <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-slate-600 text-lg font-bold uppercase mb-2">tambah siswa</div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3"></div>
        </>
    )
}

TambahSiswa.layout = page => <AppLayout children={page} />
export default TambahSiswa