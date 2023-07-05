import Tahun from '@/Components/Sia/Tahun'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const InputPembayaranSekolah = ({ initTahun }) => {

    const { data, setData, post, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        nis: '',
        
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    return (
        <>
            <Head title='Input Pembayaran Sekolah' />
            <Header title='Input Pembayaran Sekolah' />
            <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                <Tahun
                    name='tahun'
                    value={data.tahun}
                    message={errors.tahun}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

InputPembayaranSekolah.layout = page => <AppLayout children={page} />
export default InputPembayaranSekolah