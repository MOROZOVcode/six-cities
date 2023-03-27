import PlaceCard from '../place-card/place-card';
import { Offer, Offers } from '../../types/offers-type';
import { getSortingBy } from '../../general';
import { useAppSelector } from '../../hooks';

type CitiesPlacesListProps = {
  offers: Offers;
  onMouseEnterHandler: (offer: Offer) => void;
};

export default function CitiesPlacesList({
  offers,
  onMouseEnterHandler,
}: CitiesPlacesListProps): JSX.Element {
  const currentOption = useAppSelector((state) => state.optionSorting);

  const sortingOffers = getSortingBy(offers, currentOption) as Offers;

  return (
    <div className='cities__places-list places__list tabs__content'>
      {sortingOffers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseEnterHandler={() => onMouseEnterHandler(offer)}
        />
      ))}
    </div>
  );
}
