import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';

const FeaturePage = (props) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          {[1, 2, 3].map(item => <div key={item} className={`${styles.circle} ${styles[`circle-${item}`]}`}></div>)}
          <div className={styles.center}></div>
          <div className={styles.text}>React</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FeaturePage);
