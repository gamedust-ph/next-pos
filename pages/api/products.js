const products = [
  {
    "id": 1,
    "title": "orange",
    "price": 2,
    "source": "https://cdn.pixabay.com/photo/2012/04/26/12/51/orange-42394__340.png"
  },
  {
    "id": 2,
    "title": "banana",
    "price": 4,
    "source": "https://cdn.pixabay.com/photo/2015/01/27/18/32/bananas-614090__340.jpg"
  },
  {
    "id": 3,
    "title": "apple",
    "price": 6,
    "source": "https://cdn.pixabay.com/photo/2017/09/26/13/31/apple-2788616_960_720.jpg"
  },
  {
    "id": 4,
    "title": "mango",
    "price": 8,
    "source": "https://cdn.pixabay.com/photo/2016/02/23/17/28/mango-1218129__340.png"
  },
  {
    "id": 5,
    "title": "strawberry",
    "price": 10,
    "source": "https://cdn.pixabay.com/photo/2013/04/02/21/47/strawberries-99551__340.jpg"
  },
  {
    "id": 6,
    "title": "grapes",
    "price": 15,
    "source": "https://cdn.pixabay.com/photo/2016/03/27/17/14/grapes-1283162__340.jpg"
  }
]

export default function userHandler (req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      res.status(200).json(products)
      break;
  
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}