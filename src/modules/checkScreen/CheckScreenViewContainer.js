// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CheckScreenView from './CheckScreenView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(CheckScreenView);
