import React from 'react'
interface ErrorProps{
    errorString: string;
}
const Error: React.FC<ErrorProps> = ({errorString}) => {
  return (
    <div id="error-container" className="border-2 border-gray-400 rounded-2xl w-1/2 md:w-1/3 bg-gray-300">
        <div className="flex">
        <h2 className='font-semibold text-red-600 p-2 text-2xl'>Error</h2>
        <p className="p-2 py-3.5">{errorString}</p>
        </div>
    </div>
  )
}

export default Error