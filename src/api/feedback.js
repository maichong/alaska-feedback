/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import FeedbackComment from '../models/FeedbackComment';

export async function show(ctx, next) {
  await next();
  let feedback = ctx.body;
  if (feedback && feedback.id) {
    feedback.comments = _.map(await FeedbackComment.find().where('feedback', feedback.id).populate('user').sort('createdAt'), record => record.data());
  }
}
