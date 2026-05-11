import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Rating } from '@/shared/ui/rating';
import { formatReviewDate } from '@/shared/lib/utils';

import { MovieReview } from '../types';

import { MovieReviewForm } from './ReviewForm';

type ReviewsListProps = {
  movieId: number;
  reviews: MovieReview[];
};

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
                          User: {review.user.name || review.user.email}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatReviewDate(new Date(review.createdAt))}
                        </p>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <Rating
                          name="rating"
                          defaultValue={review.rating}
                          size="sm"
                          readonly
                        />
                        <div className="text-muted-foreground text-sm font-medium">
                          {review.rating}
                        </div>
                      </div>
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
