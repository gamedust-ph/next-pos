import axios from 'axios'
import { useEffect, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/outline'

const POSTItemsList = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let newTotalAmount = 0

    cart.forEach(cart => newTotalAmount += cart.totalAmount)

    setTotalAmount(newTotalAmount)
  }, [cart])


  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products')
    const data = await res.data

    console.log(data);
    setProducts(data)
  }

  const addProductToCart = async (product) => {
    // ? Check if product exist in cart
    let findProductInCart = await cart.find(p => {
      return p.id === product.id
    })

    if (findProductInCart) {
      let newCart = []
      let newItem

      cart.forEach(item => {
        if (item.id === product.id) {
          newItem = {
            ...item,
            qty: item.qty + 1,
            totalAmount: item.price * (item.qty + 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(item)
        }
      })

      setCart(newCart)
    } else {
      let addProduct = {
        ...product,
        qty: 1,
        totalAmount: product.price
      }

      setCart([...cart, addProduct])
    }
  }

  const removeToCart = async (product) => {
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
  }

  return (
    <div className="relative pt-16 pb-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100" />
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div className='max-w-7xl w-auto'>
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((p) => (
                  <li key={p.id} className="relative" onClick={() => addProductToCart(p)}>
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                      <img src={p.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                      <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {p.title}</span>
                      </button>
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{p.title}</p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">{p.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              {/* <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Id
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
                        Qty
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {cart && (
                      cart.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {item.id}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.title}</td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.price}</td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{item.qty}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">{item.totalAmount}</td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                              Remove<span className="sr-only">, {item.title}</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div> */}
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Print
                  </button>
                </div>
              </div>
              <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                      >
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart && cart.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-gray-900">{item.id}</div>
                        </td>
                        <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{item.title}</td>
                        <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{item.price}</td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{item.qty}</td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900" onClick={() => removeToCart(item)}>
                            <XCircleIcon className="h-6 w-6" aria-hidden="true" /><span className="sr-only">, {item.title}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">
                        Subtotal
                      </th>
                      <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">${totalAmount}</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                        Total
                      </th>
                      <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                        ${totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POSTItemsList