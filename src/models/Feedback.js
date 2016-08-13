/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Feedback extends alaska.Model {

  static label = 'Feedback';
  static icon = 'comment';
  static title = 'title';
  static defaultColumns = '_id title user content createdAt';
  static defaultSort = '-createdAt';

  static relationships = {
    comments: {
      title: 'Comments',
      ref: 'FeedbackComment',
      path: 'feedback',
      options: {
        sort: 'createdAt'
      },
      populations: {
        user: {}
      }
    }
  };

  static populations = {
    lastComment: {
      options: {
        sort: 'createdAt'
      },
      populations: {
        user: {
        }
      }
    }
  };

  static scopes = {
    list: '* -comments'
  };

  static api = {
    list: alaska.OWNER,
    show: alaska.OWNER,
    create: alaska.OWNER
  };

  static actions = {
    reply: {
      tooltip: 'Reply',
      icon: 'reply',
      sled: 'Reply',
      style: 'success',
      depends: '_id',
      disabled: '!newComment',
      post: 'js:location.reload()'
    }
  };

  static groups = {
    reply: {
      title: 'Reply',
      className: 'noborder'
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String
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
    updatedAt: {
      label: 'Updated At',
      type: Date
    },
    content: {
      label: 'Content',
      type: String,
      multiLine: true,
      required: true
    },
    lastComment: {
      label: 'Last Comment',
      ref: 'FeedbackComment'
    },
    newComment: {
      label: 'Reply',
      type: String,
      multiLine: true,
      private: true,
      nolabel: true,
      horizontal: false,
      group: 'reply',
      depends: '_id'
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date;
    }
    if (!this.title) {
      this.title = (this.content || '').substr(0, 20);
    }
    this.newComment = undefined;
  }
}
