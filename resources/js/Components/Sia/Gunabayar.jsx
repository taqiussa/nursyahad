import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Gunabayar({ className = '', isFocused = false, label, message, listGunabayar, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                Gunabayar
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

                    <option value="">Pilih Gunabayar</option>

                    {listGunabayar.map((gunabayar, index) => (
                        <option key={index} value={gunabayar.id}>{gunabayar.nama}</option>
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
