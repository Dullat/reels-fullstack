import axios from 'axios'
import React, { useEffect } from 'react'

const ProductsGrid = ({products}) => {
   
  return (
    <div className='dark:text-white'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2'>
            {
                products.map(product => (
                    <div key={product._id} className='w-full aspect-square cursor-pointer relative'
                    style={{
                        backgroundImage: `url('${product.imageUrl}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                    >
                        <div className='absolute bottom-0 h-[20%] flex items-center w-full px-3' style={{background: "rgba(0,0,0,.8)"}}>
                            <p>{product.name}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ProductsGrid