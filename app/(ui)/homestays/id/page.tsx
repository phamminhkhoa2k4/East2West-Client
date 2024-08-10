import Gallery from "@/components/homestay/Gallerry"
import Header from "@/components/homestay/Header";
import ListingDetails from "@/components/homestay/ListingDetails";
import ThingsToKnow from "@/components/homestay/ThingsToKnow";
import TitleDetails from "@/components/homestay/Title";
import WhatsIncluded from "@/components/homestay/WhatsIncluded";

 const Detail : React.FC  = () => {
    return (
      <>
        <div className="mx-20">
          <Header />
          <TitleDetails />
          <Gallery />
          <ListingDetails />
          <WhatsIncluded />
          <hr className="my-4 border-t border-gray-300" />
          <ThingsToKnow/>
        </div>
      </>
    );
}


export default Detail;