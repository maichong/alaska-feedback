/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class FeedbackComment extends alaska.Model {

  static label = 'Feedback Comment';
  static icon = 'comments-o';
  static title = 'content';
  static defaultColumns = 'feedback user content createdAt';
  static defaultSort = '-createdAt';

  static populations = {
    user: {
      select: '@tiny'
    }
  };

  static api = {
    create: alaska.OWNER
  };

  static fields = {
    feedback: {
      label: 'Feedback',
      ref: 'Feedback',
      index: true,
      required: true,
      private: true
    },
    user: {
      label: 'User',
      ref: 'alaska-user.User',
      optional: true
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    content: {
      label: 'Content',
      type: String,
      multiLine: true,
      required: true
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
