import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Tingkat({ className = '', isFocused = false, message, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                tingkat
            </div>
            <div>
                <select
                    {...props}
                    className={
                        `border-gray-300  focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full  ` +
                        className
                    }
                    ref={input}
                >

                    <option value="">Pilih Tingkat</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>

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
