import { trackPromise } from "react-promise-tracker"
import { toast } from "react-toastify"
import Sweet from "./Sia/Sweet"

export default function FormSimpan({ data, post, reset, routes, method, disabled, children }) {

    const submit = async (e) => {
        e.preventDefault()

        try {
            await post(route(routes, data), {
                onSuccess: () => {
                    toast.success('Berhasil Simpan')
                    method && trackPromise(method())
                },
                onError: () => {
                    Sweet
                        .fire({
                            title: 'Gagal',
                            text: 'Silahkan Cek Data Anda',
                            icon: 'error'
                        })
                }
            })
        } catch (error) {
            reset && reset()
            console.log(error)
        }
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div>
                {children}
            </div>
            <button
                className={
                    `inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:bg-emerald-500 active:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                    } `
                }
                onClick={submit}
                disabled={disabled}
            >
                Simpan
            </button>
        </form>
    );
}
