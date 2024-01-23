import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { PageProps, Shop } from '@/types';
import { Badge } from '@/Components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Button } from '@/Components/ui/button';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';



const petsOption = [
  {
    label: 'Dog',
    value: 'dog'
  },
  {
    label: 'Cat',
    value: 'cat'
  },
  {
    label: 'Hamster',
    value: 'hamster'
  },
  {
    label: 'Rabbit',
    value: 'rabbit'
  },
  {
    label: 'Bird',
    value: 'bird'
  },
]


export default function Welcome({ auth, laravelVersion, phpVersion, shops }: PageProps<{ laravelVersion: string, phpVersion: string, shops: (Shop & { products: string[], photo: string, ratingScore?: number })[] }>) {


  return (
    <>
      <Head title="HelloPets" />
      <Layout user={auth.user}>

        <div className='w-full flex justify-center mt-7'>
          <SearchComponent />
        </div>

        <section className='sm:px-5 lg:px-20 2xl:container mt-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 gap-10'>
            {
              shops.map((shop, index) => {
                const key = Date.now() + index;
                return <ShopDisplayItem address={shop.alamat} name={shop.name} photo={shop.photo} products={shop.products} rating={shop.ratingScore ? shop.ratingScore.toFixed(1).toString() : ''} shopId={shop.id} key={key} />
              })
            }
          </div>

        </section>

      </Layout>
    </>
  );
}


const SearchComponent = () => {

  const [pet, setPet] = useState("")
  const [rating, setRating] = useState("")


  const handlePet = (_pet: string) => {
    setPet(_pet)
  }

  const handleRating = (_rating: string) => {
    setRating(_rating)
  }

  const search = () => {
    const arr = [];
    if (pet != '') {
      arr.push(`pet=${pet}`)
    }

    if (rating != '') {
      arr.push(`rating=${rating}`)
    }

    router.get(`?${arr.join("&")}`)

  }

  return (
    <div className='flex rounded-lg border py-5 px-10 space-x-5 items-end '>
      <div className='w-56'>
        <label htmlFor="">Pet</label>
        <Select value={pet} onValueChange={handlePet}>
          <SelectTrigger className="w-full h-12 text-sm font-semibold">
            <SelectValue placeholder="Select a pet" />
          </SelectTrigger>
          <SelectContent>
            {
              petsOption.map((pet, index) => {
                const key = Date.now() + index
                return <SelectItem key={key} value={pet.label}>{pet.label}</SelectItem>
              })
            }

          </SelectContent>
        </Select>
      </div>

      <div className='w-56'>
        <label htmlFor="">Rating</label>
        <Select value={rating} onValueChange={handleRating}>
          <SelectTrigger className="w-full h-12 text-sm font-semibold">
            <SelectValue placeholder="rating..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1"} className='flex'>
              <div className='flex items-center font-medium space-x-1'>
                <StarFilledIcon />
                <span>1</span>
              </div>
            </SelectItem>
            <SelectItem value={"2"}>
              <div className='flex items-center font-medium space-x-1'>
                <StarFilledIcon />
                <span>2</span>
              </div>
            </SelectItem>
            <SelectItem value={"3"}>
              <div className='flex items-center font-medium space-x-1'>
                <StarFilledIcon />
                <span>3</span>
              </div>
            </SelectItem>
            <SelectItem value={"4"}>
              <div className='flex items-center font-medium space-x-1'>
                <StarFilledIcon />
                <span>4</span>
              </div>
            </SelectItem>
            <SelectItem value={"5"}>
              <div className='flex items-center font-medium space-x-1'>
                <StarFilledIcon />
                <span>5</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

      </div>

      <div>

        <Button onClick={search} className='h-12'>Search</Button>
      </div>

    </div>
  )
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