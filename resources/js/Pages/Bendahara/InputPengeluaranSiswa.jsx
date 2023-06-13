import { maskRupiah } from '@/Functions/functions'
import getAllSiswa from '@/Functions/getAllSiswa'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import moment from 'moment/moment'
import React, { useState } from 'react'

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

    async function getDataPengeluaran(){
    }

    return (
        <>
            <Head title='Input Pengeluaran' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 font-bold text-center text-lg text-slate-600 uppercase mb-2">input pengeluaran</div>

        </>
    )
}

InputPengeluaranSiswa.layout = page => <AppLayout children={page} />
export default InputPengeluaranSiswa