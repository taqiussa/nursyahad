import Hapus from '@/Components/Sia/Hapus'
import InputText from '@/Components/Sia/InputText'
import Tahun from '@/Components/Sia/Tahun'
import getAllSiswa from '@/Functions/getAllSiswa'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { trackPromise } from 'react-promise-tracker'

const AturSiswaKeluar = ({ initTahun }) => {

    const { data, setData, delete: destroy } = useForm({
        tahun: initTahun,
        search: '',
        listSiswa: []
    })

    const [page, setPage] = useState(0);
    const postsPerPage = 10;
    const numberOfPostsVisited = page * postsPerPage;
    const totalPages = Math.ceil(data.listSiswa?.length / postsPerPage);
    const changePage = ({ selected }) => {
        setPage(selected);
    };

    const filteredData = data.listSiswa?.filter((list) => {
        const searchTerm = data.search.toLowerCase();
        const siswa = list.user?.name?.toLowerCase();
        const nis = list.nis?.toString().toLowerCase(); // Assuming nis is a number

        return (
            (siswa && siswa.includes(searchTerm)) || // Filter by name
            (nis && nis.includes(searchTerm)) // Filter by nis
        );
    });


    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    async function getDataSiswa() {
        const res = await getAllSiswa(data.tahun)
        setData({ ...data, listSiswa: res.listSiswa })
    }

    useEffect(() => {
        if (data.tahun)
            trackPromise(getDataSiswa())
    }, [data.tahun])
    return (
        <>
            <Head title='Data Siswa' />
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3 mb-3">
                <Tahun
                    name='tahun'
                    value={data.tahun}
                    onChange={handleChange}
                />
                <div className="col-span-3">
                    <InputText
                        name='search'
                        label='cari'
                        value={data.search}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                NIS
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Nama
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                NISN
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Kelas
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Orang Tua
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Alamat
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listSiswa &&
                            filteredData
                                .slice(numberOfPostsVisited, numberOfPostsVisited + postsPerPage)
                                .map((siswa, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                            {index + 1 + (page * 10)}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.nis}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.user?.name}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.biodata?.nisn}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.kelas?.nama}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.biodata?.nama_ayah}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            {siswa.alamat?.alamat_lengkap}  RT {siswa.alamat?.rt} RW {siswa.alamat?.rw}, Desa {siswa.alamat?.desa} - Kec. {siswa.alamat?.kecamatan}
                                        </td>
                                        <td className="py-2 px-2 font-medium text-slate-600">
                                            <Hapus
                                                id={siswa.id}
                                                destroy={destroy}
                                                routes='atur-siswa-keluar'
                                                method={getDataSiswa}
                                            />
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                pageRangeDisplayed={3} //The range of buttons pages displayed.
                previousLabel={"Previous"} //lable for previous page button
                nextLabel={"Next"} // lable for Next page button
                pageCount={totalPages} // place here the variable for total number of pages
                onPageChange={changePage} // place here the trigger event function
                /// navigation CSS styling ///
                containerClassName={"flex items-center my-4 space-x-1 text-slate-600"}
                pageLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-md py-1 px-2 border"}
                previousLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-l-md py-1 px-2 border"}
                nextLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-r-md py-1 px-2 border"}
                disabledLinkClassName={"text-gray-300 cursor-not-allowed hover:bg-white"}
                activeLinkClassName={"focus:shadow-outline transition-colors duration-150 bg-emerald-500 text-emerald-100 cursor-pointer"}
                /// end navigation styling ///
                renderOnZeroPageCount={null}
            />

        </>
    )
}

AturSiswaKeluar.layout = page => <AppLayout children={page} />
export default AturSiswaKeluar