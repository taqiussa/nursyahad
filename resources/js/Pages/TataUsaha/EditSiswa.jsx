import React, { useEffect } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import InputText from '@/Components/Sia/InputText'
import moment from 'moment'
import getKabupaten from '@/Functions/getKabupaten'
import getKecamatan from '@/Functions/getKecamatan'
import getDesa from '@/Functions/getDesa'
import { trackPromise } from 'react-promise-tracker'
import Provinsi from '@/Components/Sia/Provinsi'
import Kabupaten from '@/Components/Sia/Kabupaten'
import Kecamatan from '@/Components/Sia/Kecamatan'
import Desa from '@/Components/Sia/Desa'
import JenisKelamin from '@/Components/Sia/JenisKelamin'
import Tanggal from '@/Components/Sia/Tanggal'
import FileUpload from '@/Components/Sia/FileUpload'
import PrimaryButton from '@/Components/PrimaryButton'
import { toast } from 'react-toastify'

const TambahSiswa = ({ siswa, desa, kecamatan, kabupaten, provinsi, initListDesa, initListKecamatan, initListKabupaten, listProvinsi }) => {

    const { data, setData, post, errors, processing } = useForm({
        nama: siswa.name,
        nis: siswa.nis,
        nisn: siswa.biodata?.nisn,
        jenisKelamin: siswa.jenis_kelamin,
        nik: siswa.biodata?.nik,
        tempatLahir: siswa.biodata?.tempat_lahir,
        tanggalLahir: siswa.biodata?.tanggal_lahir,
        namaAyah: siswa.biodata?.nama_ayah,
        namaIbu: siswa.biodata?.nama_ibu,
        alamatLengkap: siswa.alamat?.alamat_lengkap,
        rt: siswa.alamat?.rt,
        rw: siswa.alamat?.rw,
        desa: desa,
        foto: '',
        kecamatan: kecamatan,
        kabupaten: kabupaten,
        provinsi: provinsi,
        listDesa: initListDesa,
        listKecamatan: initListKecamatan,
        listKabupaten: initListKabupaten,
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.type === 'file' ? e.target.files[0] : e.target.value);
    }

    const submit = (e) => {

        e.preventDefault()

        post(route('tambah-siswa.update'),
            {
                onSuccess: () => {
                    toast.success('Berhasil Update Siswa')
                    setData({ ...data })
                }
            })
    }

    async function getDataKabupaten() {
        const res = await getKabupaten(data.provinsi)
        setData({ ...data, listKabupaten: res.listKabupaten })
    }

    async function getDataKecamatan() {
        const res = await getKecamatan(data.kabupaten)
        setData({ ...data, listKecamatan: res.listKecamatan })
    }

    async function getDataDesa() {
        const res = await getDesa(data.kecamatan)
        setData({ ...data, listDesa: res.listDesa })
    }

    useEffect(() => {
        setData({
            ...data,
            desa: '',
            kecamatan: '',
            kabupaten: '',
            listDesa: [],
            listKecamatan: [],
            listKabupaten: []
        })
        if (data.provinsi)
            trackPromise(getDataKabupaten())
    }, [data.provinsi])

    useEffect(() => {
        setData({
            ...data,
            desa: '',
            kecamatan: '',
            listDesa: [],
            listKecamatan: []
        })
        if (data.kabupaten)
            trackPromise(getDataKecamatan())
    }, [data.kabupaten])

    useEffect(() => {
        setData({
            ...data,
            desa: '',
            listDesa: [],
        })
        if (data.kecamatan)
            trackPromise(getDataDesa())
    }, [data.kecamatan])
    return (
        <>
            <Head title='Edit Siswa' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-slate-600 text-lg font-bold uppercase mb-2">edit siswa</div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                <InputText
                    name='nama'
                    label='nama'
                    value={data.nama}
                    message={errors.nama}
                    onChange={handleChange}
                />

                <InputText
                    name='nis'
                    label='NIS'
                    value={data.nis}
                    message={errors.nis}
                    onChange={handleChange}
                />

                <InputText
                    name='nisn'
                    label='NISN'
                    value={data.nisn}
                    message={errors.nisn}
                    onChange={handleChange}
                />

                <JenisKelamin
                    name='jenisKelamin'
                    label='jenisKelamin'
                    value={data.jenisKelamin}
                    message={errors.jenisKelamin}
                    onChange={handleChange}
                />

                <InputText
                    name='nik'
                    label='NIK'
                    value={data.nik}
                    message={errors.nik}
                    onChange={handleChange}
                />

                <InputText
                    name='tempatLahir'
                    label='tempat lahir'
                    value={data.tempatLahir}
                    message={errors.tempatLahir}
                    onChange={handleChange}
                />

                <Tanggal
                    name='tanggalLahir'
                    label='tanggal lahir'
                    value={data.tanggalLahir}
                    message={errors.tanggalLahir}
                    onChange={handleChange}
                />

                <InputText
                    name='namaAyah'
                    label='nama ayah'
                    value={data.namaAyah}
                    message={errors.namaAyah}
                    onChange={handleChange}
                />

                <InputText
                    name='namaIbu'
                    label='nama ibu'
                    value={data.namaIbu}
                    message={errors.namaIbu}
                    onChange={handleChange}
                />

                <div className="col-span-2">
                    <InputText
                        name='alamatLengkap'
                        label='alamat (jalan, gang, no. rumah)'
                        value={data.alamatLengkap}
                        message={errors.alamatLengkap}
                        onChange={handleChange}
                    />
                </div>

                <InputText
                    name='rt'
                    label='rt'
                    value={data.rt}
                    message={errors.rt}
                    onChange={handleChange}
                />

                <InputText
                    name='rw'
                    label='rw'
                    value={data.rw}
                    message={errors.rw}
                    onChange={handleChange}
                />

                <Provinsi
                    name='provinsi'
                    value={data.provinsi}
                    message={errors.provinsi}
                    onChange={handleChange}
                    listProvinsi={listProvinsi}
                />

                <Kabupaten
                    name='kabupaten'
                    value={data.kabupaten}
                    message={errors.kabupaten}
                    onChange={handleChange}
                    listKabupaten={data.listKabupaten}
                />

                <Kecamatan
                    name='kecamatan'
                    value={data.kecamatan}
                    message={errors.kecamatan}
                    onChange={handleChange}
                    listKecamatan={data.listKecamatan}
                />

                <Desa
                    name='desa'
                    value={data.desa}
                    message={errors.desa}
                    onChange={handleChange}
                    listDesa={data.listDesa}
                />

                <FileUpload
                    name='foto'
                    label='foto jika ada'
                    message={errors.foto}
                    onChange={handleChange}
                />

            </div>

            <PrimaryButton
                children='simpan'
                onClick={submit}
                disabled={processing}
            />
        </>
    )
}

TambahSiswa.layout = page => <AppLayout children={page} />
export default TambahSiswa