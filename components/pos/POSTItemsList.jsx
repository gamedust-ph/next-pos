import Link from 'next/link'
import { useEffect, useState, useRef, useContext } from 'react'
import {
  XCircleIcon,
  UserCircleIcon,
  BackspaceIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { ComponentToPrint } from '../utils/ComponentToPrint'
import { useReactToPrint } from 'react-to-print'
import ItemList from '../HomeItems/ItemList'
import CartContext from '../../store/context/cart-context'

const POSTItemsList = ({ allProducts }) => {
  const cartCtx = useContext(CartContext)
  const [totalAmount, setTotalAmount] = useState(0)

  const numOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount
  }, 0)

  // ? ~~~~~~~~~~~~ React to Print Functions
  const componentRef = useRef()
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint()
  }
  // ? ~~~~~~~~~~~~ END

  // ? ~~~~~~~~~~~~ Add and Reduce Quantity
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }
  // ? ~~~~~~~~~~~~ END

  return (
    <div className="relative pt-16 pb-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100" />
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          {/* Table */}
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              {/* Screen */}
              <div>
                <div className="hidden">
                  {/* <ComponentToPrint
                    cart={cart}
                    totalAmount={totalAmount}
                    ref={componentRef}
                  /> */}
                </div>
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
                    <span className='text-xl font-bold text-gray-900'># of Items: {numOfCartItems}</span>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    {totalAmount > 0 && (
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      >
                        Print
                      </button>
                    )}
                  </div>
                </div>
                <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          ID
                        </th>
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
                      {cartCtx.items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {item.id}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Quantity</dt>
                              <dd className="mt-1 truncate text-gray-700">{item.qty}</dd>
                              <dt className="sr-only sm:hidden">Price</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">{item.price}</dd>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                                  <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.name}</span>
                                </button>
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.name}</td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{item.price}</td>
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
              {/* <div className="m-2 border-2">
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
              </div> */}

              <div className="m-2 p-2 flex">
                <div className="flex-col justify-center items-center w-1/2 sm:w-full">
                  {/* <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full p-3 items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <UserCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Customer
                    </button>
                  </div> */}

                  <button className='w-full flex-col justify-center items-center pt-10'>
                    <Link className='inline-block text-2xl font-semibold' href={'/checkout'}>
                      <a>
                        <ArrowCircleRightIcon className='h-20 w-20' />
                        Payment
                      </a>
                    </Link>
                  </button>
                </div>

                {/* <div className="w-1/2 sm:w-full">
                  <div className='flex-col justify-center'>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2'>1</button>
                      <button className='p-2 text-xl mx-1 border-2'>2</button>
                      <button className='p-2 text-xl mx-1 border-2'>3</button>
                      <button className='p-2 text-xl mx-1 border-2 bg-green-600'>Qty</button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button className='p-2 text-xl mx-1 border-2'>4</button>
                      <button className='p-2 text-xl mx-1 border-2'>5</button>
                      <button className='p-2 text-xl mx-1 border-2'>6</button>
                      <button className='p-2 text-xl mx-1 border-2'>Disc</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2'>7</button>
                      <button className='p-2 text-xl mx-1 border-2'>8</button>
                      <button className='p-2 text-xl mx-1 border-2'>9</button>
                      <button className='p-2 text-xl mx-1 border-2'>Price</button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className='p-2 text-xl mx-1 border-2'>+/-</button>
                      <button className='p-2 text-xl mx-1 border-2'>0</button>
                      <button className='p-2 text-xl mx-1 border-2'>.</button>
                      <button className='p-2 text-xl mx-1 border-2'>
                        <BackspaceIcon className='h-6 w-6' />
                      </button>
                    </div>
                  </div>
                </div> */}
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