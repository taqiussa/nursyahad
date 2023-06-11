import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const DataKelas = ({listKelas}) => {
    return (
        <>
        <Head title='Data Kelas' />
        <div className="bg-emerald-200 border-b-2 border-emerald-500 text-center text-lg text-slate-600 font-bold uppercase mb-2">data kelas</div>
        <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Nama Kelas
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Kategori Kelas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listKelas &&
                                listKelas.map((kelas, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                            {index + 1 }
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {kelas.nama}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {kelas.kategori?.nama}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

DataKelas.layout  = page => <AppLayout children={page} />
export default DataKelas