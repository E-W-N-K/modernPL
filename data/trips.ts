export type Transport = 'train' | 'bus';

export type Trip = {
  transport: Transport;
  title: string;
  description: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  seatArea: string;
  occupied: number[];
};

export const trips: Record<Transport, Trip> = {
  train: {
    transport: 'train',
    title: 'Поезд № 715Б',
    description: 'Межрегиональный экспресс',
    departure: '08:12',
    arrival: '11:25',
    duration: '3 ч 13 мин',
    price: '28,50 BYN',
    seatArea: 'Вагон 03 · сидячий',
    occupied: [2, 4, 5, 8, 11, 14],
  },
  bus: {
    transport: 'bus',
    title: 'Автобус № 510',
    description: 'Междугородний автобус',
    departure: '09:00',
    arrival: '13:20',
    duration: '4 ч 20 мин',
    price: '22,00 BYN',
    seatArea: 'Салон · 16 мест',
    occupied: [1, 4, 7, 8, 10, 15],
  },
};

export const seats = Array.from({ length: 16 }, (_, index) => index + 1);
export const seatLabel = (seat: number) => String(seat).padStart(2, '0');
