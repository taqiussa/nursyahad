import { trackPromise } from "react-promise-tracker"
import { toast } from "react-toastify"

export default function SimpanButton({ data, post, routes, method, disabled, ...props }) {

    const submit = (e) => {
        e.preventDefault()

        post(route(routes, data), {
            onSuccess: () => {
                toast.success('Berhasil Simpan')
                trackPromise(method())
            }
        })
    }

    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:bg-emerald-500 active:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } `
            }
            onClick={submit}
            disabled={disabled}
        >
            Simpan
        </button>
    );
}
