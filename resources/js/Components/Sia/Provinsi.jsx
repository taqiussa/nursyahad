import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Provinsi({ type = 'text', className = '', isFocused = false, message, listProvinsi, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                provinsi
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

                    <option value="">pilih provinsi</option>

                    {listProvinsi.map((provinsi, index) => (
                        <option key={index} value={provinsi.code}>{provinsi.name}</option>
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
