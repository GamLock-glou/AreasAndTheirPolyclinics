export const createSchedule = () => {
  return ['Понедельник', 'Вторник', 'Среда', 'Четвер', 'Пятница'].map((dayWeek: string)=>{
    return {
      "dayWeek": dayWeek,
      "nameAndNumberPolyclinic": "",
      "receptionHours": "",
      "cabinetNumber": ""
    };
  })
}