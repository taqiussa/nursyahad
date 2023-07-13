import FormSimpan from '@/Components/FormSimpan'
import Gunabayar from '@/Components/Sia/Gunabayar'
import Hapus from '@/Components/Sia/Hapus'
import InputText from '@/Components/Sia/InputText'
import Tahun from '@/Components/Sia/Tahun'
import SimpanButton from '@/Components/SimpanButton'
import { maskRupiah, rupiah } from '@/Functions/functions'
import getWajibBayarSekolah from '@/Functions/getWajibBayarSekolah'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { trackPromise } from 'react-promise-tracker'

const AturWajibBayarSekolah = ({ initTahun, listGunabayar }) => {

    const { data, setData, post,reset, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        gunabayar_id: '',
        jumlah: 0,
        listWajibBayar: []
    })

    async function getDataWajibBayar() {
        const res = await getWajibBayarSekolah(data.tahun)
        setData({ ...data, listWajibBayar: res.listWajibBayar })
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleRupiah = (e) => {
        setData('jumlah', maskRupiah(e.target.value))
    }

    useEffect(() => {
        if (data.tahun)
            trackPromise(getDataWajibBayar())
    }, [data.tahun])

    return (
        <>
            <Head title='Atur Wajib Bayar' />
            <Header title='atur wajib bayar' />
            <FormSimpan
                data={data}
                post={post}
                routes='atur-wajib-bayar-sekolah.simpan'
                method={getDataWajibBayar}
                disabled={processing}
                reset={reset}
            >
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 grid grid-cols-2 gap-2 lg:space-y-0 space-y-2 mb-2">
                    <Tahun
                        name='tahun'
                        value={data.tahun}
                        message={errors.tahun}
                        onChange={handleChange}
                    />

                    <Gunabayar
                        name='gunabayar_id'
                        value={data.gunabayar_id}
                        message={errors.gunabayar_id}
                        onChange={handleChange}
                        listGunabayar={listGunabayar}
                    />

                    <InputText
                        name='jumlah'
                        value={data.jumlah}
                        message={errors.jumlah}
                        onChange={handleRupiah}
                        label='Jumlah'
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
                        {data.listWajibBayar &&
                            data.listWajibBayar
                                .map((wajib, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {wajib.gunabayar?.nama}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {rupiah(wajib.jumlah)}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            <Hapus
                                                id={wajib.id}
                                                routes='atur-wajib-bayar-sekolah.hapus'
                                                destroy={destroy}
                                                method={getDataWajibBayar}
                                            />
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

AturWajibBayarSekolah.layout = page => <AppLayout children={page} />
export default AturWajibBayarSekolah