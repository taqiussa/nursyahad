import PrimaryButton from '@/Components/PrimaryButton'
import FileUpload from '@/Components/Sia/FileUpload'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { toast } from 'react-toastify'

const UploadSiswa = () => {

    const { data, setData, post, errors, processing } = useForm({
        fileUpload: ''
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.type === 'file' ? e.target.files[0] : e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('upload-siswa.upload'), {
            onSuccess: () => {
                toast.success('Berhasil Upload siswa')
            }
        })
    }

    return (

        <>
            <Head title='Upload Siswa' />
            <div className="font-bold text-lg text-center text-slate-600 uppercase border-b-2 border-emerald-500 mb-3 bg-emerald-200">upload siswa</div>
            <div className="lg:inline-flex lg:space-y-0 space-y-2">
                <FileUpload
                    id='fileUpload'
                    name='fileUpload'
                    label='untuk diupload'
                    message={errors.fileUpload}
                    onChange={handleChange}
                />
                <div className='lg:flex lg:items-end'>
                    <PrimaryButton onClick={submit} children='upload' disabled={processing} />
                </div>
            </div>

        </>

    )
}
UploadSiswa.layout = page => <AppLayout children={page} />
export default UploadSiswa