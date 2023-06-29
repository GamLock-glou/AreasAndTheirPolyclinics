import axios from "axios";
import { ICard, ITypeAndDoctor } from "../type/type";

const instance = axios.create({
  baseURL: 'https://apipolyclinics.onrender.com/',
  headers: {
    Accept: 'application/json',
  },
})

export const AreasApi = {
  async getAreas() {
    return instance.get('/areas').then(response => response.data);
  }
}

export const DoctorsApi = {
  async getDoctors() {
    return instance.get('/doctors').then(response => response.data);
  },
  async getAreaDoctors() {
    return instance.get('/areaDoctors').then(response => response.data);
  },
  async changeDoctor({type, doctor}: ITypeAndDoctor) {
    return instance.put(`/${type}/${doctor.id}`, doctor).then(response => response.data);
  },
  async addCard(values: any) {
    return instance.post(`/${values.type}`, values.doctor).then(resp=> {
      if(resp.status === 201) {
        return resp.data
      }
    })
  },
}

export const CardsApi = {
  async getCards() {
    return instance.get('/cards').then(response => response.data);
  },
  async addCard(values: ICard) {
    return instance.post('/cards', values).then(resp=> {
      if(resp.status === 201) {
        return resp.data
      }
    })
  },
  async getSearchCards(value: string) {
    return instance.get('/cards?name_like='+value).then(response => response.data)
  },
  async addVisit(values: ICard) {
    return instance.put(`/cards/${values.id}`, values).then(response => response.data)
  }
}

export const PolyclinicsApi = {
  async getPolyclinics() {
    return instance.get('/polyclinics').then(response => response.data)
  }
}