import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import {
  XCircleIcon,
  UserCircleIcon,
  BackspaceIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import ItemList from '../HomeItems/ItemList'
import CartContext from '../../store/context/cart-context'

const POSTItemsList = ({ allProducts }) => {
  const router = useRouter()
  const cartCtx = useContext(CartContext)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems'))
    if (cart) {
      cartCtx.initializeCart(cart)
    }
  }, [])

  const numOfCartItems = cartCtx.items && cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount
  }, 0)

  // ? ~~~~~~~~~~~~ Add and Reduce Quantity
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }
  // ? ~~~~~~~~~~~~ END

  return (
    <div className="relative lg:pt-10 pb-32 overflow-hidden m-10">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          {/* Table */}
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              {/* Screen */}
              <div>
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Invoice for {router.query.uuid}</h1>
                    <span className='text-xl font-bold text-gray-900'># of Items: {numOfCartItems}</span>
                  </div>
                </div>
                <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                          Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Quantity
                        </th>
                        {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Total
                        </th> */}
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {cartCtx && cartCtx.items && cartCtx.items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {item.name}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Quantity</dt>
                              <dd className="mt-1 truncate text-gray-700">{item.amount} pcs</dd>
                              <dt className="sr-only sm:hidden">Price</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">${item.price}</dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">${item.price.toLocaleString('en-AU')}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">{item.amount}</td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                              <button
                                type="button"
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                onClick={cartItemRemoveHandler.bind(null, item.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                onClick={cartItemAddHandler.bind(null, item)}
                              >
                                <span className="sr-only">Add</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Buttons */}
              <div className="mt-2">
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Laybys
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Deliveries
                  </button>
                </div>
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Quotes
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generic
                  </button>
                </div>
                <div className='flex'>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Show Orders
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center p-3 m-2 m justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Products
                  </button>
                </div>
              </div>

              <div className="m-2 p-2 flex">
                <div className="flex-col justify-center items-center w-1/2 sm:w-full">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full p-3 items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Customer
                    </button>
                  </div>

                  <button className='w-full flex-col justify-center items-center pt-10'>
                    <Link className='inline-block text-2xl font-semibold' href={`/checkout/?uuid=${router.query.uuid}`}>
                      <a>
                        <ArrowCircleRightIcon className='h-20 w-20' />
                        Payment
                      </a>
                    </Link>
                  </button>
                </div>

                <div className="w-1/2 sm:w-full">
                  <div className='flex-col justify-center'>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>1</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>2</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>3</button>
                      <button className='p-2 text-xs mx-1 border-2 bg-green-600 h-12 w-12 m-0.5 p-0.5'>Qty</button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>4</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>5</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>6</button>
                      <button className='p-2 text-xs mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>Disc</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>7</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>8</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>9</button>
                      <button className='p-2 text-xs mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>Price</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>+/-</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>0</button>
                      <button className='p-2 text-xl mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>.</button>
                      <button className='p-2 text-xs mx-1 border-2 h-12 w-12 m-0.5 p-0.5'>
                        <BackspaceIcon className='h-6 w-6' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Item List */}
          {allProducts && (
            <ItemList products={allProducts} />
          )}
        </div>
      </div>
    </div>
  )
}

export default POSTItemsList