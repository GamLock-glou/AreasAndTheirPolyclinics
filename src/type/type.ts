import { DoctorsState } from "../store/reducers/DoctorsSlice";

export interface AreaState {
  numberSection: number;
  nameSection: string;
}

export interface PolyclinicState {
  numberArea: number
  numberPolyclinic: number;
  namePolyclinic: string;
  img: string;
}

export interface DoctorState {
  id: number;
  name: string;
  numberPolyclinic: number;
  schedule: ScheduleState[];
}

export interface ScheduleState {
  dayWeek: string;
  nameAndNumberPolyclinic: string;
  receptionHours: string;
  cabinetNumber: string;
}

export interface AreasDoctorState {
  id: number;
  name: string;
  numberArea: number;
  schedule: ScheduleState[];
}

export interface ICard {
  id: number;
  numberCard: number;
  name: string;
  address: string;
  gender: string;
  age: string
  insurancePolicyNumber: string;
  createDateCards: string;
  intelligence: IIntelligence[],
}

export interface ICardsFirstList {
  numberCard: number;
  name: string;
  address: string;
  gender: string;
  age: string
  insurancePolicyNumber: string;
  createDateCards: string;
  id: number;
}

export interface IIntelligence {
  dateOfVisit: string;
  complaint: string;
  preliminaryDiagnosis: string;
  appointments: string;
  discharged: string | null;
  doctor: string;
}

export interface ITypeAndDoctor {
  doctor: DoctorState | AreasDoctorState;
  type: string;
}

export interface ITypeDoctor {
  doctor: DoctorState;
  type: keyof Pick<DoctorsState, 'doctors'>;
}

export interface ITypeAreaDoctor {
  doctor: AreasDoctorState;
  type: keyof Pick<DoctorsState, 'areaDoctors'>;
}

export interface IAdaptiveValue {
  activeValue: string;
  setActiveValue: (v: string) => void
  handleClickInLink: () => void
}
