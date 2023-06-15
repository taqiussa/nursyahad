import PrimaryButton from '@/Components/PrimaryButton'
import InputText from '@/Components/Sia/InputText'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Semester from '@/Components/Sia/Semester'
import Tahun from '@/Components/Sia/Tahun'
import Tanggal from '@/Components/Sia/Tanggal'
import { maskRupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import getPengeluaranSiswa from '@/Functions/getPengeluaranSiswa'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const InputPengeluaranSiswa = ({ initTahun, initSemester }) => {

    const { data, setData, post, errors, processing } = useForm({
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
        label: `${siswa.name} - Kelas : ${siswa.siswa?.kelas?.nama}`
    }))

    const submit = (e) => {
        e.preventDefault()

        post(route('input-pengeluaran-siswa'),{
            onSuccess: () => {
                toast.success('Berhasil Simpan Pengeluaran Siswa')
                setData({...data})
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
    }

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

        </>
    )
}

InputPengeluaranSiswa.layout = page => <AppLayout children={page} />
export default InputPengeluaranSiswa