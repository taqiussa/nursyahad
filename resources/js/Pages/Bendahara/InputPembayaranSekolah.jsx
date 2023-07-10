import FormSimpan from '@/Components/FormSimpan'
import Gunabayar from '@/Components/Sia/Gunabayar'
import InputText from '@/Components/Sia/InputText'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Tahun from '@/Components/Sia/Tahun'
import Tanggal from '@/Components/Sia/Tanggal'
import { maskRupiah, rupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import getGunabayar from '@/Functions/getGunabayar'
import getPembayaranSiswa from '@/Functions/getPembayaranSiswa'
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
    const [listPembayaran, setListPembayaran] = useState([])

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

    async function getDataPembayaranSiswa() {
        const res = await getPembayaranSiswa(data.tahun, data.nis)
        setListPembayaran(res.listPembayaran)
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

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
                        disabled={true}
                    />

                </div>
            </FormSimpan>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Tanggal
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Gunabayar
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jumlah
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPembayaran && listPembayaran.map((saku, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {hariTanggal(saku.tanggal)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {rupiah(saku.jumlah)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {saku.keterangan}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600 inline-flex space-x-3">
                                    <Hapus
                                        id={saku.id}
                                        destroy={destroy}
                                        routes='input-pengeluaran-siswa.hapus'
                                        method={getDataPengeluaran}
                                    />
                                </td>
                            </tr>
                        ))}
                        {/* <tr className="bg-slate-300 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Uang Saku Masuk
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(penjumlahan(listUangSaku, 'jumlah'))}
                            </td>
                        </tr>
                        <tr className="bg-slate-300 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Pengeluaran
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(penjumlahan(listPengeluaran, 'jumlah'))}
                            </td>
                        </tr>
                        <tr className="bg-slate-300 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Akhir Bulan {namaBulan(moment(new Date(data.tanggal)).format('MM'))}
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(penjumlahan(listUangSaku, 'jumlah') - penjumlahan(listPengeluaran, 'jumlah'))}
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </>
    )
}

InputPembayaranSekolah.layout = page => <AppLayout children={page} />
export default InputPembayaranSekolah