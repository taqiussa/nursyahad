import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function InputText({ type = 'text', className = '', isFocused = false, label, message, disabled, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);


    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                {label}
            </div>
            <div>
                <input
                    {...props}
                    type={type}
                    disabled={disabled}
                    className={
                        `border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ${disabled && 'bg-gray-200'
                        } ` + className
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
