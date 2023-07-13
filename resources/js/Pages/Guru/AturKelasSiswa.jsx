import FormSimpan from '@/Components/FormSimpan'
import Kelas from '@/Components/Sia/Kelas'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Tahun from '@/Components/Sia/Tahun'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const AturKelasSiswa = ({ initTahun, listKelas, listSiswa }) => {

    const { data, setData, post, errors, processing, reset, delete: destroy } = useForm({
        tahun: initTahun,
        kelas_id: '',
        nis: ''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const options = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: siswa.name
    }))

    return (
        <>
            <Head title='Atur Kelas Siswa' />
            <Header title='atur kelas siswa' />
            <FormSimpan
                data={data}
                post={post}
                routes='atur-kelas-siswa.simpan'
                disabled={processing}
                reset={reset}
            >
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3">
                    <Tahun
                        name='tahun'
                        value={data.tahun}
                        message={errors.tahun}
                        onChange={handleChange}
                    />
                    <div className="col-span-2">

                        <SearchableSelect
                            label='siswa'
                            options={options}
                            name='nis'
                            value={data.nis}
                            message={errors.nis}
                            onChange={(e) => setData('nis', e)}
                        />
                    </div>

                    <Kelas
                        name='kelas_id'
                        value={data.kelas_id}
                        message={errors.kelas_id}
                        onChange={handleChange}
                        listKelas={listKelas}
                    />
                </div>
            </FormSimpan>
        </>
    )
}

AturKelasSiswa.layout = page => <AppLayout children={page} />
export default AturKelasSiswa