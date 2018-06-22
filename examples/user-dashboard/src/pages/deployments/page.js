import React from 'react';
import styles from './page.css';
import DeploymentsComponent from './components/Deployments/Deployments';

function Deployments() {
  return (
    <div className={styles.normal}>
      <DeploymentsComponent />
    </div>
  );
}

export default Deployments;
