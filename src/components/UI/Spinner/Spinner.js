import React from 'react';

import classes from './Spinner.css'

const spinner = props => <div className={classes.Wrapper}>
    <div className={classes.Spinner}><div></div><div></div><div></div><div></div></div>
  </div>

export default spinner;