import Tahun from '@/Components/Sia/Tahun'
import { maskRupiah } from '@/Functions/functions'
import getWajibBayarSekolah from '@/Functions/getWajibBayarSekolah'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const AturWajibBayar = ({ initTahun, listGunabayar }) => {

    const { data, setData, post, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        gunabayar_id: '',
        jumlah: '',
        list: []
    })

    async function getDataWajibBayar() {
        const res = await getWajibBayarSekolah(data.tahun)
        setData({ ...data, list: res.list })
    }


    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleRupiah = (e) => {
        setData('jumlah', maskRupiah(e.target.value))
    }

    return (
        <>
            <Head title='Atur Wajib Bayar' />
            <Header title='atur wajib bayar' />
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 grid grid-cols-2 gap-2 lg:space-y-0 space-y-2 mb-2">
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

AturWajibBayar.layout = page => <AppLayout children={page} />
export default AturWajibBayar