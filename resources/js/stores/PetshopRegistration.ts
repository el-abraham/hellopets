import { create } from "zustand";


type Action = {
  nextStep: () => void,
  setStep: (val: number) => void,
  changeProgress: (progress: number) => void,
  setNextButton: (val: boolean) => void,
  setPetshop: (petshop: IPetshop) => void,
}

type State = {
  step: number,
  progress: number,
  nextButton: boolean,
  petshop: IPetshop
}

interface IPetshopInfo {
  email: string,
  phone: string,
  address: string
}

export interface IPetshopProduct {
  price: number,
  name: string,
  petId: string
}

export interface IPetshop {
  name: string;
  description: string;
  info: IPetshopInfo;
  facilities: string[];
  pets: string[],
  products: IPetshopProduct[]
}

export const usePetshopRegistration = create<Action & State>((set, get) => ({
  step: 0,
  progress: 0,
  nextButton: false,
  petshop: {
    description: '',
    name: '',
    info: {
      address: '',
      email: '',
      phone: ''
    },
    facilities: [],
    pets: [],
    products: []
  },
  setPetshop: (petshop) => {
    set({
      petshop
    })
  },
  setStep: (val) => {
    set({ step: val })
  },
  setNextButton: (val) => {
    set(({
      nextButton: val
    }))
  },
  changeProgress: (progress) => {
    set(({
      progress: progress
    }))
  },
  nextStep: () => {
    set((state) => ({
      step: state.step + 1,
      progress: state.progress + (100 / 7)
    }))
    get().setNextButton(false)
  }
}))