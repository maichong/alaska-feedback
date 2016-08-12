/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

class FeedbackService extends alaska.Service {
  constructor(options) {
    options = options || {};
    options.id = options.id || 'alaska-feedback';
    options.dir = options.dir || __dirname;
    super(options);
  }
}

export default new FeedbackService();
