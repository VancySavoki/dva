import React from 'react';
import styles from './page.css';
import NodesComponent from './components/Nodes/Nodes';

function Nodes() {
  return (
    <div className={styles.normal}>
      <NodesComponent />
    </div>
  );
}

export default Nodes;
