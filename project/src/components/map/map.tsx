import { useRef, useEffect, useState } from 'react';
import { FeatureGroup, Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { Offers, Offer } from '../../types/offers-type';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/app-data.selectors';

type MapProps = {
  offers: Offers;
  activeOffer: Offer | undefined;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});
const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

export default function Map({
  offers,
  activeOffer,
  className,
}: MapProps): JSX.Element {
  const { city } = useAppSelector(getOffers)[0];

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [markersGroup] = useState<FeatureGroup>(new FeatureGroup());

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon
        );
        markersGroup.addLayer(marker);
      });

      if (activeOffer) {
        const marker = new Marker({
          lat: activeOffer.location.latitude,
          lng: activeOffer.location.longitude,
        });
        marker.setIcon(currentCustomIcon);
        markersGroup.addLayer(marker);
      }

      markersGroup.addTo(map);
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    return () => {
      markersGroup.clearLayers();
    };
  }, [map, offers, activeOffer]);

  return <section className={`${className}__map map`} ref={mapRef} />;
}
