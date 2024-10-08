
type Homestay = {
  homestayid: number | null;
  wardName: string; //
  districtName: string; //
  cityProvinceName: string; //
  longitude: number; //
  latitude: number; //
  geom: string | null;
  structureId: number | null; //
  userId: number | null; //
  type: string; //
  title: string; //
  address: string; //
  photos: string[]; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: boolean;
  maxGuest: number; //
  perkIds: number[]; //
  pricePerNight: number; //
  instant: boolean;
  beds: number;
  bathroom: number;
  room: number | null;
  availability?: HomestayAvailability[];
};

