import { Reviews } from '../../types/review-type';
import ItemReview from '../item-review/item-review';
import FormRewiew from '../form-review/form-review';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type UsersReviewsProps = {
  reviews: Reviews;
};

export default function UsersReviews({
  reviews,
}: UsersReviewsProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  // const { rating } = offer;
  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews &middot;{' '}
        <span className='reviews__amount'>{reviews.length}</span>
      </h2>

      <ul className='reviews__list'>
        {reviews.map((review) => (
          <ItemReview review={review} key={review.id} />
        ))}
      </ul>

      {authStatus === AuthorizationStatus.Auth && <FormRewiew />}
    </section>
  );
}
