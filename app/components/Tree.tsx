import React from 'react'
import { InputTreeData,TreeDisplay } from './Tree/components'

const Tree = () => {
  return (
    <div className='flex flex-col justify-around items-center w-full h-full'>
        <InputTreeData />
        <TreeDisplay />
    </div>
  )
}

export default Tree