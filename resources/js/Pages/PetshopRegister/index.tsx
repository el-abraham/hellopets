import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Progress } from "@/Components/ui/progress";
import { Textarea } from "@/Components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
// import { FileUploader } from "react-drag-drop-files";
import { router } from '@inertiajs/react'
import { IPetshopProduct, usePetshopRegistration } from "@/stores/PetshopRegistration";
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select";
import { CheckedState } from "@radix-ui/react-checkbox";
import { PageProps, User } from "@/types";



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


export default function PetshopRegister({ auth, galleries, shop_id, images }: PageProps<{ galleries?: boolean | undefined, shop_id?: number | undefined, images?: any }>) {

  const { step, nextStep, setNextButton, setStep, progress, nextButton } = usePetshopRegistration(state => state);

  const RegistrationStep = useMemo(() => {
    switch (step) {
      case 0:
        return <GetPetshopName />
      case 1:
        return <GetPetshopDescription />
      case 2:
        return <GetPetshopDetailProfile />
      case 3:
        return <GetPetshopFacilities />
      case 4:
        return <GetPetshopPets />
      case 5:
        return <GetPetshopPrice />
      case 6:
        return <PostPetshop user={auth.user} />
      case 7:
        return <UploadImage shop_id={shop_id} />
      case 8:
        return <AfterUploadImage shop_id={shop_id} images={images} />
      case 9:
        return <Finished />
      default:
        return <></>
    }
  }, [step, shop_id, images])

  useEffect(() => {
    if (galleries) {
      if (images) {
        setStep(8)
        if (images.length >= 5) {
          setNextButton(true)
        }
      } else {
        setStep(7)

      }
    }
  }, [galleries, images])


  return (
    <div className="min-h-screen relative flex flex-col h-screen w-full">

      <div className="flex-1 lg:px-80 pb-24 container mx-autos ">
        {RegistrationStep}
      </div>

      <div className="fixed w-full bottom-0 z-10 bg-white">

        <Progress className="rounded-none h-2" value={progress} />
        <div className="flex justify-end items-center px-10 py-5">
          <Button disabled={!nextButton} onClick={nextStep}>Next</Button>
        </div>
      </div>

    </div>
  )
}

type PostPetshopType = {
  user: User
}

const PostPetshop = ({ user }: PostPetshopType) => {


  const { petshop } = usePetshopRegistration(state => state)


  useEffect(() => {

    router.post('/shop-register', {
      name: petshop.name,
      description: petshop.description,
      email: petshop.info.email,
      no_telp: petshop.info.phone,
      address: petshop.info.address,
      facilities: petshop.facilities,
      products: JSON.stringify(petshop.products),
      userId: user.id
    }, {
      forceFormData: false,
    })
  }, [])

  return (
    <div className="w-full h-full text-primary-theme text-lg font-semibold flex items-center place-content-center">
      Loading
    </div>
  )
}

const Finished = () => {
  window.location.href = "/"
  return null
}

const GetPetshopName = () => {

  const { petshop, setPetshop, setNextButton } = usePetshopRegistration(state => state)

  const textareaHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPetshop({
      ...petshop,
      name: e.currentTarget.value
    })

    setNextButton(e.currentTarget.value != '')
  }

  return (
    <div className="w-[500px] mt-40">
      <h3 className="text-2xl font-semibold leading-normal">Your pet house name</h3>
      <span className="text-primary/50">type something cool</span>
      <Textarea spellCheck={false} onChange={textareaHandle} className="resize-none font-medium text-lg rounded-lg h-32 w-full mt-5 border-2" />

    </div>
  )
}

type UploadImageType = {
  shop_id?: number
}

const UploadImage = ({ shop_id }: UploadImageType) => {

  // const FileUploader = require("react-drag-drop-files").FileUploader

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files) {
      router.post('/upload-image', {
        image: Array.from(files),
        shop_id
      }, {
        forceFormData: true
      });
    }
  };

  return (
    <div className="w-[500px] mt-40">
      <h3 className="text-2xl font-semibold leading-normal">Add some photos of your pet house</h3>
      <span className="text-primary/50">
        You'll need 5 photos to get started.
      </span>

      <div className="mt-5">
        <Input id="picture" accept="image/*" onChange={handleChange} multiple type="file" />
        {/* <FileUploader disabled={shop_id == undefined} multiple handleChange={handleChange} name="file" types={fileTypes} /> */}

      </div>

    </div>
  )
}

type AfterUploadImageType = {
  images?: any[] | undefined,
  shop_id?: number
}

const AfterUploadImage = ({ images, shop_id }: AfterUploadImageType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files) {
      router.post('/upload-image', {
        image: Array.from(files),
        shop_id
      }, {
        forceFormData: true,
      });
    }
  };

  return (
    <div className="w-[600px] mt-20">
      <h3 className="text-2xl font-semibold leading-normal">
        Woah!! Your pet house photos
      </h3>
      <span className="text-primary/50 ">
        You must upload at least 5 photos
      </span>
      <div className="mt-3">
        <Input id="picture" accept="image/*" onChange={handleChange} multiple type="file" />

        {/* <FileUploader multiple label={"Upload more photos"} handleChange={handleChange} name="file" types={fileTypes} /> */}
      </div>
      <div className="flex-col space-y-5 mt-5">

        {
          images?.map((img, index) => {
            return (
              <img className="border-2 rounded-lg" key={Date.now() + index} src={img.path} />
            )
          })
        }

      </div>

    </div>
  )
}

const GetPetshopPets = () => {


  const { petshop, setPetshop, setNextButton } = usePetshopRegistration(state => state)

  const [checked, setChecked] = useState<string[]>([]);


  const onCheckedHandle = (_checked: CheckedState, pet: string) => {
    if (_checked) {
      setChecked([...checked, pet])
    } else {
      setChecked(checked.filter(val => val != pet))
    }
  }


  useEffect(() => {
    setPetshop({ ...petshop, pets: checked })
    setNextButton(checked.length > 0)
  }, [checked])


  return (
    <div className="w-[600px] mt-32">
      <h3 className="text-2xl font-semibold leading-normal">
        Choose the pets welcome for boarding at your pet house
      </h3>
      <span className="text-primary/50 ">
        You can add more than one pets
      </span>
      <div className="mt-5 grid grid-cols-2 gap-y-3">
        {
          petsOption.map((pet, index) => {
            return (
              <div key={Date.now() + index} className="space-x-2 flex items-center">
                <Checkbox checked={checked.includes(pet.value)} onCheckedChange={(_checked) => onCheckedHandle(_checked, pet.value)} id={pet.value} />
                <label htmlFor={pet.value} className=" ">{pet.label}</label>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}

const GetPetshopDescription = () => {

  const { petshop, setPetshop, setNextButton } = usePetshopRegistration(state => state)

  const textareaHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPetshop({
      ...petshop,
      description: e.currentTarget.value
    })
    setNextButton(e.currentTarget.value != '')
  }
  return (
    <div className="w-[600px] mt-20">
      <h3 className="text-2xl font-semibold leading-normal">Create your description</h3>
      <span className="text-primary/50 ">
        Share what makes your place special.
      </span>
      <Textarea onChange={textareaHandle} spellCheck={false} className="resize-none rounded-lg h-64 w-full mt-5 border-2" />

    </div>
  )
}


const GetPetshopFacilities = () => {

  const { petshop, setPetshop, setNextButton } = usePetshopRegistration(state => state)

  const [checked, setChecked] = useState<string[]>([]);

  const fasilities = [
    {
      label: 'Playgrounds',
      value: 'playgrounds'
    },
    {
      label: 'Pet Cage',
      value: 'pet_cage'
    },
    {
      label: 'Webcams or Live Feeds',
      value: 'webcams'
    },
    {
      label: 'Swimming Pool',
      value: 'swimming_pool'
    },
    {
      label: '24/7 Supervision',
      value: '24_supervision'
    },
    {
      label: 'Food and Water',
      value: 'food_water'
    },
    {
      label: 'Healthcare',
      value: 'healthcare'
    },
    {
      label: 'Grooming Services',
      value: 'grooming'
    },

  ]

  const onCheckedHandle = (_checked: CheckedState, facility: string) => {
    if (_checked) {
      setChecked([...checked, facility])
    } else {
      setChecked(checked.filter(val => val != facility))
    }
  }

  useEffect(() => {
    setPetshop({ ...petshop, facilities: fasilities.filter(facility => checked.includes(facility.value)).map(val => val.label) })
    setNextButton(checked.length > 0)
  }, [checked])

  return (
    <div className="w-[600px] mt-32">
      <h3 className="text-2xl font-semibold leading-normal">Tell people what your place fasilities</h3>
      <span className="text-primary/50 ">
        You can add more than one facility
      </span>
      <div className="mt-5 grid grid-cols-2 gap-y-3">
        {
          fasilities.map((facility, index) => {
            return (
              <div key={Date.now() + index} className="space-x-2 flex items-center">
                <Checkbox id={facility.value} checked={checked.includes(facility.value)} onCheckedChange={(_checked) => onCheckedHandle(_checked, facility.value)} />
                <label htmlFor={facility.value} className=" ">{facility.label}</label>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

const GetPetshopDetailProfile = () => {

  const { setNextButton, setPetshop, petshop } = usePetshopRegistration(state => state)

  const [info, setInfo] = useState({
    email: '',
    phone: '',
    address: ''
  })

  const emailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value
    setInfo(() => {
      return { ...info, email }
    })
  }

  const phoneHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.currentTarget.value
    if (/^[0-9]*$/.test(phone.charAt(phone.length - 1))) {
      setInfo(() => {
        return { ...info, phone }
      })

    }
  }

  const addressHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.currentTarget.value
    setInfo(() => {
      return { ...info, address }
    })
  }

  useEffect(() => {
    if (info.address != '' && info.email != '' && info.phone != '') {
      setNextButton(true)
    } else {
      setNextButton(false)
    }
    setPetshop({
      ...petshop,
      info: info
    })
  }, [info])

  return (
    <div className="w-[500px] mt-20 space-y-10">
      <div>
        <h3 className="text-lg font-medium leading-normal">Your email address</h3>
        <Input value={petshop.info.email} onChange={emailHandle} className="w-full border-2 text-md h-12 mt-3 rounded-lgs" />
      </div>
      <div>
        <h3 className="text-lg font-medium leading-normal">Your phone number</h3>
        <div className="w-full relative">
          <Input value={petshop.info.phone} onChange={phoneHandle} className="pl-14 border-2 text-md h-12 mt-3 rounded-lgs" placeholder="82192xxxxx" />
          <div className="absolute top-1/4 font-semibold pl-5 text-primary/50">+62</div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium leading-normal">Your address</h3>
        <Input value={petshop.info.address} onChange={addressHandle} className=" w-full border-2 text-md h-12 mt-3 rounded-lgs" />

        {/* <div className="flex">
          <div className="w-1/2">
            <h5>Province</h5>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>

              </SelectContent>
            </Select>
          </div>
        </div> */}
      </div>
    </div>
  )
}


const GetPetshopPrice = () => {

  const { petshop, setPetshop, setNextButton } = usePetshopRegistration(state => state)

  const [petsPrice, setPetsPrice] = useState<IPetshopProduct[]>(petshop.pets.map(val => {
    return {
      price: Number(''),
      petId: val,
      name: petsOption.find(v => v.value == val)?.label ?? ''
    }
  }))

  const priceHandle = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const price = e.currentTarget.value
    if (/^[0-9]*$/.test(price.charAt(price.length - 1))) {
      setPetsPrice(petsPrice.map(val => {
        if (val.petId == id)
          return { ...val, price: Number(price) }
        return val
      }))
    }
  }

  useEffect(() => {
    setPetshop({ ...petshop, products: petsPrice })

    setNextButton(petsPrice.filter(val => val.price == 0)?.length == 0)

  }, [petsPrice])

  return (
    <div className="w-[500px] mt-20 ">
      <h3 className="text-2xl font-semibold leading-normal">Set your price <span className="text-primary/50 text-sm">IDR</span></h3>
      <div className="mt-5 space-y-5">
        {
          petsPrice.map((pet) => {
            return (
              <div key={pet.petId}>
                <h3 className="text-lg font-medium leading-normal">{pet.name} <span className="text-md text-primary/50">(per day)</span></h3>
                <Input value={pet.price} onChange={(e) => priceHandle(e, pet.petId)} className="w-full border-2 text-md h-12 mt-3 rounded-lgs" />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
