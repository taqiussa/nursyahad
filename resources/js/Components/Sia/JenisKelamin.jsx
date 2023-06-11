import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function JenisKelamin({ className = '', isFocused = false, message, disabled, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                jenis kelamin
            </div>
            <div>
                <select
                    {...props}
                    className={
                        `border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ` +
                        className
                    }
                    ref={input}
                >

                    <option value="">Pilih Jenis Kelamin</option>

                    <option value="L">Laki-laki</option>

                    <option value="P">Perempuan</option>

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
