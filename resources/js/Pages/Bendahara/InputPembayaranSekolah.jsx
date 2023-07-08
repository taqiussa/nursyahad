import FormSimpan from '@/Components/FormSimpan'
import Gunabayar from '@/Components/Sia/Gunabayar'
import InputText from '@/Components/Sia/InputText'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Tahun from '@/Components/Sia/Tahun'
import Tanggal from '@/Components/Sia/Tanggal'
import { maskRupiah, rupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import getGunabayar from '@/Functions/getGunabayar'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { trackPromise } from 'react-promise-tracker'

const InputPembayaranSekolah = ({ initTahun, listGunabayar }) => {

    const { data, setData, post, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        tanggal: moment(new Date()).format('YYYY-MM-DD'),
        nis: '',
        gunabayarId: '',
        jumlah: 0,
    })

    const [listSiswa, setListSiswa] = useState([])

    const optionsSiswa = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: `${siswa.user?.name} - Kelas : ${siswa.kelas?.nama}`
    }))

    async function getDataSiswa() {
        const res = await getAllSiswa(data.tahun)
        setListSiswa(res.listSiswa)
    }

    async function getDataGunabayar() {
        const res = await getGunabayar(data.tahun, data.gunabayarId, 'Sekolah')
        setData({ ...data, jumlah: rupiah(res.jumlah) })
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    // const handleRupiah = (e) => {
    //     setData('jumlah', maskRupiah(e))
    // }

    useEffect(() => {
        if (data.tahun) {
            trackPromise(getDataSiswa())
        } else {
            setListSiswa([])
        }
    }, [data.tahun])

    useEffect(() => {
        if (data.tahun && data.gunabayarId) {
            trackPromise(getDataGunabayar())

        } else {
            setData('jumlah', maskRupiah('0'))
        }
    }, [data.tahun, data.gunabayarId])

    return (
        <>
            <Head title='Input Pembayaran Sekolah' />
            <Header title='Input Pembayaran Sekolah' />
            <FormSimpan
                data={data}
                post={post}
                routes='input-pembayaran-sekolah.simpan'
                disabled={processing}
            >

                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">

                    <Tanggal
                        name='tanggal'
                        label='tanggal'
                        value={data.tanggal}
                        message={errors.tanggal}
                        onChange={handleChange}
                    />

                    <Tahun
                        name='tahun'
                        value={data.tahun}
                        message={errors.tahun}
                        onChange={handleChange}
                    />
                    <div className="col-span-2">

                        <SearchableSelect
                            name='nis'
                            label='siswa'
                            message={errors.nis}
                            value={data.nis}
                            options={optionsSiswa}
                            onChange={(e) => setData('nis', e)}
                        />
                    </div>

                </div>
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                    <Gunabayar
                        name='gunabayarId'
                        value={data.gunabayarId}
                        message={errors.gunabayarId}
                        onChange={handleChange}
                        listGunabayar={listGunabayar}
                    />

                    <InputText
                        name='jumlah'
                        label='jumlah'
                        value={data.jumlah}
                        message={errors.jumlah}
                        // onChange={handleRupiah}
                        disabled={true}
                    />

                </div>
            </FormSimpan>
        </>
    )
}

InputPembayaranSekolah.layout = page => <AppLayout children={page} />
export default InputPembayaranSekolah