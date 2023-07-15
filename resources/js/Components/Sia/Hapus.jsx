import { Icon } from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import Sweet from './Sweet';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

export default function Hapus({ id, destroy, routes, method }) {

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route(routes,
                        {
                            id: id
                        }),
                        {
                            onSuccess: () => {
                                toast.success('Berhasil Hapus Data')
                                trackPromise(method())
                            }
                        })
                }
            })
    }

    return (
        <button
            onClick={() => handleDelete(id)}
            className={
                `inline-flex items-center   text-red-600 uppercase tracking-widest hover:text-red-500 active:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 `}
        >
            <Icon path={mdiTrashCanOutline} size={1} />

        </button>
    );
}
