// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CheckView from './CheckView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(CheckView);
