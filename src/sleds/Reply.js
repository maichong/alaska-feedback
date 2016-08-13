/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-12
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import FeedbackComment from '../models/FeedbackComment';

export default class Reply extends alaska.Sled {
  /**
   * @param data
   *        data.feedback
   *        data.body
   *        data.admin
   *        [data.ctx]
   */
  async exec(data) {
    let feedback = data.feedback;
    let user = data.user || data.admin;
    let content = data.body.newComment;
    let comment = new FeedbackComment({
      user,
      content,
      feedback: feedback._id
    });
    if (data.admin) {
      comment.fromAdmin = true;
    }
    await comment.save();
    feedback.lastComment = comment._id;
    await feedback.save();
  }
}
