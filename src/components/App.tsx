import React from 'react';
import styles from './App.module.scss';
import { Button } from './Button';
import { useDelayQueue } from './hooks/useDelayQueue';

export const App: React.FC = () => {
  const [logs, clickHandle, resetHandle] = useDelayQueue();

  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <div>
          <Button title="Кнопка 1" onClick={() => clickHandle(1)} />
          <Button title="Кнопка 2" onClick={() => clickHandle(2)} />
          <Button title="Кнопка 3" onClick={() => clickHandle(3)} />
          <Button title="Сбросить" onClick={resetHandle} />
        </div>
        <h2>Лог</h2>
        <div>
          <textarea rows={30} cols={65} defaultValue={logs} />
        </div>
      </div>
    </div>
  );
};
