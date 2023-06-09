import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Kelas({ className = '', isFocused = false, listKelas, message, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                kelas
            </div>
            <div>
                <select
                    {...props}
                    className={
                        `border-gray-300  focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ` +
                        className
                    }
                    ref={input}
                >

                    <option value="">Pilih Kelas</option>

                    {listKelas.map((kelas, index) => (
                        <option key={index} value={kelas.kelas_id ?? kelas.id}>{kelas.kelas?.nama ?? kelas.nama}</option>
                    ))}

                </select>
            </div>
            {message ?
                <div className='text-sm text-red-600'>
                    {message}
                </div>
                :
                null
            }
        </div>
    )
});
