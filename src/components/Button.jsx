import React from 'react'

// !Fordward reference hook ?
const Button = ({children,
type="button",
bgcolor='bg-blue-600',
textcolor='text-white',
className='',
...props
}) => {
  return (
    <button
    className={`px-4 py-4 rounded-lg ${className} ${bgcolor},${textcolor}`}
    {...props}
    >{children}</button>
  )
}

export default Button