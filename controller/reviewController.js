const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const ApiFeatures = require('./../utils/apiFeatures');

exports.getallReview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('Not found', 401));
  }
  res.status(200).json({
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  console.log('in the create review');
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.body);
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
