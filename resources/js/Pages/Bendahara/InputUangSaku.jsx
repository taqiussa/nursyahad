import PrimaryButton from '@/Components/PrimaryButton'
import Hapus from '@/Components/Sia/Hapus'
import InputText from '@/Components/Sia/InputText'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Semester from '@/Components/Sia/Semester'
import Tahun from '@/Components/Sia/Tahun'
import Tanggal from '@/Components/Sia/Tanggal'
import { hariTanggal, maskRupiah, rupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import getUangSaku from '@/Functions/getUangSaku'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { trackPromise } from 'react-promise-tracker'
import { toast } from 'react-toastify'

const InputUangSaku = ({ initTahun, initSemester }) => {

    const { data, setData, post, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        semester: initSemester,
        tanggal: dayjs(new Date()).format('YYYY-MM-DD'),
        jumlah: 0,
        keterangan: '',
        nis: ''
    })

    const [listSiswa, setListSiswa] = useState([])
    const [listPemasukan, setListPemasukan] = useState([])

    const options = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: `${siswa.user?.name} - Kelas : ${siswa.kelas?.nama}`
    }))

    const submit = (e) => {
        e.preventDefault()

        post(route('input-uang-saku.simpan'), {
            onSuccess: () => {
                toast.success('Berhasil Simpan Uang Saku')
                setData({ ...data })
                trackPromise(getData())
            }
        })
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleRupiah = (e) => {
        setData('jumlah', maskRupiah(e.target.value))
    }

    async function getDataSiswa() {
        const res = await getAllSiswa(data.tahun)
        setListSiswa(res.listSiswa)
    }

    async function getData() {
        const res = await getUangSaku(data.nis, data.tanggal)
        setListPemasukan(res.listPemasukan)
    }

    useEffect(() => {
        if (data.tahun)
            trackPromise(getDataSiswa())
    }, [data.tahun])

    useEffect(() => {
        if (data.nis && data.tanggal)
            trackPromise(getData())
    }, [data.nis, data.tanggal])

    return (
        <>
            <Head title='Input Uang Saku' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-lg text-slate-600 font-bold uppercase mb-2">input uang saku</div>
            <form onSubmit={submit}>
                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                    <Tahun
                        name='tahun'
                        value={data.tahun}
                        message={errors.tahun}
                        onChange={handleChange}
                    />

                    <Semester
                        name='semester'
                        value={data.semester}
                        message={errors.semester}
                        onChange={handleChange}
                    />

                    <Tanggal
                        name='tanggal'
                        label='tanggal'
                        value={data.tanggal}
                        message={errors.tanggal}
                        onChange={handleChange}
                    />

                    <div className="col-span-2">
                        <SearchableSelect
                            name='nis'
                            label='siswa'
                            options={options}
                            value={data.nis}
                            message={errors.nis}
                            onChange={(e) => setData('nis', e)}
                        />
                    </div>

                    <InputText
                        name='jumlah'
                        label='jumlah'
                        value={data.jumlah}
                        message={errors.jumlah}
                        onChange={handleRupiah}
                    />

                    <div className="col-span-2">
                        <InputText
                            name='keterangan'
                            label='keterangan'
                            value={data.keterangan}
                            message={errors.keterangan}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <PrimaryButton onClick={submit} children='simpan' disabled={processing} />
            </form>
            <div className="overflow-x-auto pt-2">
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
                                Jumlah
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Keterangan
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPemasukan && listPemasukan.map((saku, index) => (
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
                                        routes='input-uang-saku.hapus'
                                        destroy={destroy}
                                        method={getData}
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

InputUangSaku.layout = page => <AppLayout children={page} />
export default InputUangSaku