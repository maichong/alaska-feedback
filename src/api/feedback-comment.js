/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import Feedback from '../models/Feedback';

export async function create(ctx, next) {
  let body = ctx.state.body || ctx.request.body;
  let feedback = body.feedback || ctx.request.body.feedback || ctx.service.error('Missing feedback id');
  feedback = await Feedback.findById(feedback);
  if (!feedback) ctx.service.error('Cannot find feedback');
  if (feedback.user && ctx.user && feedback.user.toString() === ctx.user._id.toString()) {
    await next();
    if (ctx.body && ctx.body.id) {
      feedback.updatedAt = new Date;
      feedback.lastComment = ctx.body.id;
      feedback.save();
    }
  } else {
    ctx.service.error('Cannot find feedback.');
  }
}
