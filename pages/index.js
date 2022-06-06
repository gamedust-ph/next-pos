import Head from 'next/head'
import POSTItemsList from '../components/pos/POSTItemsList'

export default function Home({ allProducts }) {
  return (
    <div className="bg-white">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <main>
          <POSTItemsList allProducts={allProducts} />
        </main>

        <footer className="bg-gray-50" aria-labelledby="footer-heading">

        </footer>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/products`)
  const allProducts = await res.json()

  console.log(`${process.env.BASE_URL}`);
  return {
    props: {
      allProducts, // <== here is a solution
    },
  };
}
