import PrimaryButton from '@/Components/PrimaryButton'
import InputText from '@/Components/Sia/InputText'
import LinkEdit from '@/Components/Sia/LinkEdit'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { toast } from 'react-toastify'

const AturGunabayarSekolah = ({ listGunabayar }) => {

    const { data, setData, post, reset, errors, processing } = useForm({
        nama: ''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('atur-gunabayar-sekolah.simpan'), {
            onSuccess: () => {
                toast.success('Berhasil Simpan')
                reset('nama')
            }
        })
    }

    return (
        <>
            <Head title='Atur Gunabayar Sekolah' />
            <Header title='atur gunabayar sekolah' />
            <form onSubmit={submit}>
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                    <InputText
                        name='nama'
                        label='nama gunabayar'
                        value={data.nama}
                        message={errors.nama}
                        onChange={handleChange}
                    />
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
                                Nama Gunabayar
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listGunabayar &&
                            listGunabayar
                                .map((guna, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {guna.nama}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {/* <LinkEdit /> */}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

AturGunabayarSekolah.layout = page => <AppLayout children={page} />
export default AturGunabayarSekolah