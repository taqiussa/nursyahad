import PrimaryButton from '@/Components/PrimaryButton'
import InputText from '@/Components/Sia/InputText'
import Kategori from '@/Components/Sia/Kategori'
import Tingkat from '@/Components/Sia/Tingkat'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { toast } from 'react-toastify'

const TambahKelas = ({ listKategori }) => {

    const { data, setData, post, errors, processing } = useForm({
        nama: '',
        tingkat: '',
        kategoriKelasId: ''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {

        e.preventDefault()

        post(route('tambah-kelas.simpan'),
            {
                onSuccess: () => {
                    toast.success('Berhasil Tambah Kelas')
                    setData({ ...data })
                }
            })
    }

    return (
        <>
            <Head title='Tambah Kelas' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-lg text-slate-600 font-bold uppercase mb-2">tambah kelas</div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                <InputText
                    name='nama'
                    label='nama kelas'
                    value={data.nama}
                    message={errors.nama}
                    onChange={handleChange}
                />

                <Tingkat
                    name='tingkat'
                    value={data.tingkat}
                    message={errors.tingkat}
                    onChange={handleChange}
                />

                <Kategori
                    name='kategoriKelasId'
                    label='kelas'
                    value={data.kategoriKelasId}
                    message={errors.kategoriKelasId}
                    onChange={handleChange}
                    listKategori={listKategori}
                />

            </div>
            <PrimaryButton onClick={submit} children='simpan' disabled={processing} />
        </>
    )
}

TambahKelas.layout = page => <AppLayout children={page} />
export default TambahKelas