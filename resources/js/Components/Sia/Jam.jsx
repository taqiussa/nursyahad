import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Jam(
    { name, id, value, message, className, isFocused, ...props },
    ref
) {

    const input = ref ? ref : useRef();

    useEffect(() => {

        if (isFocused) {

            input.current.focus();

        }


    }, []);

    return (
        <div className='flex flex-col text-slate-600 capitalize'>
            <div>
                jam
            </div>
            <div>
                <select
                    {...props}
                    name={name}
                    id={id}
                    value={value}
                    className={
                        `border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full ` +
                        className
                    }
                    ref={input}>

                    <option value="">Pilih Jam</option>

                    <option value="1-2">1-2</option>

                    <option value="3-6">3-6</option>

                    <option value="7-8">7-8</option>

                </select>
            </div>
            {
                message ?
                    <div className='text-sm text-red-600'>
                        {message}
                    </div>
                    :
                    null
            }
        </div >
    )
});
