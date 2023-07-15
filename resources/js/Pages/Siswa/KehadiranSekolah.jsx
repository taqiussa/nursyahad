import Bulan from '@/Components/Sia/Bulan'
import Tahun from '@/Components/Sia/Tahun'
import { hariTanggal, namaBulan, namaKehadiran } from '@/Functions/functions'
import AppLayout from '@/Layouts/AppLayout'
import Header from '@/Layouts/Partials/Header'
import { Head, router, useForm } from '@inertiajs/react'
import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'

const KehadiranSekolah = ({ initTahun, listKehadiran, listAbsensi }) => {

    const { data, setData } = useForm({
        tahun: initTahun,
        bulan: dayjs(new Date()).format('MM')
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    useEffect(() => {
        if (data.tahun && data.bulan) {
            router.reload({
                only: ['listKehadiran', 'listAbsensi'],
                data: {
                    tahun: data.tahun,
                    bulan: data.bulan
                },
                replace: true,
                preserveState: true

            })
        }
    }, [data.tahun, data.bulan])

    return (
        <>
            <Head title='Kehadiran Sekolah' />
            <Header title={`kehadiran sekolah bulan ${namaBulan(data.bulan)}`} />
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                <Tahun
                    name='tahun'
                    value={data.tahun}
                    onChange={handleChange}
                />
                <Bulan
                    name='bulan'
                    value={data.bulan}
                    onChange={handleChange}
                />
            </div>
            <div className="overflow-x-auto pt-2">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Hari, Tanggal
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jam 1-2
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jam 3-6
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jam 7-8
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listKehadiran && listKehadiran.map((siswa, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {hariTanggal(siswa.tanggal)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {listAbsensi && listAbsensi.filter(absen => absen.jam == '1-2' && absen.tanggal == siswa.tanggal).map(absen => (namaKehadiran(absen.kehadiran_id)))}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {listAbsensi && listAbsensi.filter(absen => absen.jam == '3-6' && absen.tanggal == siswa.tanggal).map(absen => (namaKehadiran(absen.kehadiran_id)))}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {listAbsensi && listAbsensi.filter(absen => absen.jam == '7-8' && absen.tanggal == siswa.tanggal).map(absen => (namaKehadiran(absen.kehadiran_id)))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

KehadiranSekolah.layout = page => <AppLayout children={page} />
export default KehadiranSekolah