import mockdata from './data.json';


export function getData(id: number): any {
  const room = mockdata.results.find((room) => room.room.id === id) || {
    room: {
      id: id,
      name: 'Unknown Room',
      image_url: '',
      participant: [],
    },
    comments: [],
  };
  return room
}


export function getAllData(): any {
  return mockdata;
}


export const DEFAULT_SENDER = 'customer@mail.com';