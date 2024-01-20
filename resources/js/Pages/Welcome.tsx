import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { PageProps, Shop } from '@/types';
import { Badge } from '@/Components/ui/badge';


export default function Welcome({ auth, laravelVersion, phpVersion, shops }: PageProps<{ laravelVersion: string, phpVersion: string, shops: (Shop & { products: string[], photo: string })[] }>) {


  return (
    <>
      <Head title="HelloPets" />
      <Layout user={auth.user}>


        <section className='sm:px-5 lg:px-20 2xl:container mt-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-10'>
            {
              shops.map((shop, index) => {
                const key = Date.now() + index;
                return <ShopDisplayItem address={shop.alamat} name={shop.name} photo={shop.photo} products={shop.products} rating='' shopId={shop.id} key={key} />
              })
            }
          </div>

        </section>

      </Layout>
    </>
  );
}



type ShopDisplayItemType = {
  photo: string;
  name: string;
  rating: string;
  address: string;
  products: string[];
  shopId: number;
}

const ShopDisplayItem = ({ shopId, address, name, photo, products, rating }: ShopDisplayItemType) => {
  return (
    <a href={`/shop/${shopId}`}>
      <div className='cursor-pointer'>
        <img src={photo} className='border object-cover aspect-square rounded-lg w-full' />

        {/* </div> */}
        <div className='flex justify-between items-center space-x-2 mt-2'>
          <h6 className='truncate font-semibold text-md'>{name}</h6>
          <span>{rating ?? ""}</span>
        </div>

        <p className='text-primary/80'>{address}</p>

        <div className='flex space-x-2 mt-1 items-center'>
          {
            products.slice(0, 2).map((product, index) => {
              const key = Date.now() + index
              return <Badge className='rounded bg-primary-theme/90' key={key}>{product}</Badge>
            })
          }
          {
            products.length > 3 ? <span className="text-xs">and more</span> : <></>
          }
        </div>

      </div>
    </a>


  )
}