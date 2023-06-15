import PrimaryButton from '@/Components/PrimaryButton'
import Hapus from '@/Components/Sia/Hapus'
import InputText from '@/Components/Sia/InputText'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Semester from '@/Components/Sia/Semester'
import Sweet from '@/Components/Sia/Sweet'
import Tahun from '@/Components/Sia/Tahun'
import Tanggal from '@/Components/Sia/Tanggal'
import { hariTanggal, maskRupiah, namaBulan, penjumlahan, rupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import getPengeluaranSiswa from '@/Functions/getPengeluaranSiswa'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { trackPromise } from 'react-promise-tracker'
import { toast } from 'react-toastify'

const InputPengeluaranSiswa = ({ initTahun, initSemester }) => {

    const { data, setData, post, errors, processing, delete: destroy } = useForm({
        tahun: initTahun,
        semester: initSemester,
        tanggal: moment(new Date()).format('YYYY-MM-DD'),
        jumlah: 0,
        keterangan: '',
        nis: '',
    })

    const [listSiswa, setListSiswa] = useState([])
    const [listPengeluaran, setListPengeluaran] = useState([])
    const [listUangSaku, setListUangSaku] = useState([])

    const optionsSiswa = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: `${siswa.user?.name} - Kelas : ${siswa.kelas?.nama}`
    }))

    const submit = (e) => {
        e.preventDefault()

        post(route('input-pengeluaran-siswa'), {
            onSuccess: () => {
                toast.success('Berhasil Simpan Pengeluaran Siswa')
                setData({ ...data })
                trackPromise(getDataPengeluaran())
            }
        })
    }

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Pengeluaran Siswa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route('input-pengeluaran-siswa.hapus',
                        {
                            id: id
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Hapus Pengeluaran Siswa')
                                setData({ ...data })
                                trackPromise(getDataPengeluaran())
                            }
                        })
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

    async function getDataPengeluaran() {
        const res = await getPengeluaranSiswa(data.nis, data.tanggal)
        setListPengeluaran(res.listPengeluaran)
        setListUangSaku(res.listUangSaku)
    }

    useEffect(() => {

        if (data.tahun)
            trackPromise(getDataSiswa())
    }, [data.tahun])

    useEffect(() => {
        if (data.nis && data.tanggal)
            trackPromise(getDataPengeluaran())
    }, [data.nis, data.tanggal])

    return (
        <>
            <Head title='Input Pengeluaran' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 font-bold text-center text-lg text-slate-600 uppercase mb-2">input pengeluaran</div>
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
                            label='Siswa'
                            options={optionsSiswa}
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
                        {listPengeluaran && listPengeluaran.map((saku, index) => (
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
                                        onClick={() => handleDelete(saku.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-slate-300 border-b">
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
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

InputPengeluaranSiswa.layout = page => <AppLayout children={page} />
export default InputPengeluaranSiswa