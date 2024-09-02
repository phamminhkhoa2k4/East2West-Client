

interface Homestay {
  homestayid: number;
  wardId: number;
  hometypeId: number;
  userid: number;
  longitude: number;
  latitude: number;
  title: string;
  address: string;
  geom: string;
  photos: string;
  description: string;
  exactinfo: string;
  cleaningfee: number;
  isapproved: boolean;
  maxguest: number;
  perkIds: number[];
  availability: HomestayAvailability[];
}
