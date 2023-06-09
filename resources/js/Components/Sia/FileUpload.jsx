import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function FileUpload({ type = 'file', className = '', isFocused = false, label, message, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                Pilih File {label}
            </div>
            <div>
                <input
                    {...props}
                    type={type}
                    className={
                        `border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-auto ` +
                        className
                    }
                    ref={input}
                />

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
