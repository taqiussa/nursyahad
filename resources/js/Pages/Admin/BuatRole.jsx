import PrimaryButton from '@/Components/PrimaryButton'
import Hapus from '@/Components/Sia/Hapus'
import InputText from '@/Components/Sia/InputText'
import Sweet from '@/Components/Sia/Sweet'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { toast } from 'react-toastify'

const BuatRole = ({ listRole }) => {

    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: '',
        guard_name: 'web'
    })

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('buat-role.simpan'), {
            onSuccess: () => {
                toast.success('Berhasil Buat Role')
            }
        })
    }

    const handleDelete = (id) => {

        Sweet
            .fire({
                title: 'Hapus',
                text: 'Menghapus ?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Batal',
                confirmButtonText: 'Ya, Hapus',
            })
            .then((result) => {
                if (result.isConfirmed)
                    destroy(route('buat-role.hapus', { id: id }),
                        {
                            onSuccess: () => {
                                toast.success('Berhasil Hapus')
                            }
                        })
            })
    }

    return (
        <>
            <Head title='Buat Role' />
            <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-slate-600 text-lg font-bold uppercase mb-2">buat role</div>
            <form onSubmit={submit}>

                <div className="lg:grid lg:grid-cols-4 lg:space-y-0 lg:gap-2 space-y-2 pb-2">
                    <InputText
                        id='name'
                        name='name'
                        value={data.name}
                        message={errors.name}
                        handleChange={onHandleChange}
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
                                Role
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRole && listRole
                            .map((role, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200 whitespace-nowrap">
                                    <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {role.name}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        <Hapus
                                            onClick={() => handleDelete(role.id)}
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

BuatRole.layout = page => <AppLayout children={page} />
export default BuatRole