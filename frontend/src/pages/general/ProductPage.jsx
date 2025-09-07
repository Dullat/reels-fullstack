import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            const res = await axios(`http://localhost:3000/api/products/${id}`)
            setProduct(res.data.product)
            setLoading(false)
        }
        getData()
    }, [])
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
                <div className="text-gray-700 dark:text-gray-300">Product loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col items-center py-8 px-3">
            {/* Main Product Card */}
            <div className="max-w-lg w-full rounded-2xl shadow-lg bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 flex flex-col md:flex-row overflow-hidden">
                {/* Product Image */}
                <div className="flex-shrink-0 w-full md:w-1/2 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center p-6">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-contain max-h-[400px] w-full rounded-xl shadow"
                        onError={e => { e.target.src = 'https://via.placeholder.com/400x400.png?text=No+Image'; }}
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between px-6 py-5 md:w-1/2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {product.name}
                        </h1>
                        <div className="flex items-center mb-2">
                            <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mr-4">
                                ₹{product.price}
                            </span>
                            <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-xs ml-2">
                                {product.category}
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col space-y-3 mt-4">
                        <button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
                            onClick={() => alert('Implement purchase logic!')}
                        >
                            Buy Now
                        </button>
                        <button
                            className="w-full border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-200 py-3 px-6 rounded-xl bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
                            onClick={() => navigator.clipboard.writeText(window.location.href)}
                        >
                            Share Product
                        </button>
                    </div>
                </div>
            </div>

{/* Additional info */}
            <div className="max-w-lg w-full mt-7">
                <div className="bg-white/80 dark:bg-neutral-900/80 border border-gray-100 dark:border-neutral-800 rounded-xl p-6 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-1">Product ID:</span>
                        <span className="break-all">{product._id}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-1">File ID:</span>
                        <span className="break-all">{product.fileId}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-1">Created By:</span>
                        <span>{product.createdBy}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
