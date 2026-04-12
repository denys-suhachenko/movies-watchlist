import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { MovieReviewForm } from './ReviewForm';

type Review = {
  id: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: Date;
};

type ReviewsListProps = {
  movieId: number;
  reviews: Review[];
};

function formatReviewDate(date: Date) {
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="text-sm font-medium">
      {'★'.repeat(rating)}
      <span className="text-muted-foreground">{'☆'.repeat(5 - rating)}</span>
    </div>
  );
}

export function ReviewsList({ movieId, reviews }: ReviewsListProps) {
  return (
    <Card className="gap-0 space-y-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reviews</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No reviews yet. Be the first to leave one.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={review.id}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">
                          User: {review.userId}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatReviewDate(new Date(review.createdAt))}
                        </p>
                      </div>

                      <RatingStars rating={review.rating} />
                    </div>

                    <p className="text-foreground text-sm leading-6">
                      {review.text}
                    </p>
                  </div>

                  {index < reviews.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 border-t pt-4">
            <MovieReviewForm movieId={movieId} />
          </div>
        </>
      </CardContent>
    </Card>
  );
}
