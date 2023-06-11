import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Desa({ type = 'text', className = '', isFocused = false, message, listDesa, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                desa
            </div>
            <div>
                <select
                    {...props}
                    className={
                        `border-gray-300 capitalize focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ` +
                        className
                    }
                    ref={input}
                >

                    <option value="">Pilih Desa</option>

                    {listDesa.map((desa, index) => (
                        <option key={index} value={desa.code}>{desa.name}</option>
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
