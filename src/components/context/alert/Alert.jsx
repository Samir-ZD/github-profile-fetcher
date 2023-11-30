import React,{useContext} from 'react'
import AlertContext from './AlertContext'

function Alert() {

    const {alert} = useContext(AlertContext)
    
    return alert !== null &&(
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2'>
        <p className='flex items-start mb-4 space-x-2 w-full'>
            {alert.type === 'error' && (
                <div role="alert" className="alert alert-error">
                <h3 className='flex-1 text-base font-semibold leading-7'>{alert.msg}</h3>
                </div>
            )}
        </p>
        </div>
    )
}

export default Alert