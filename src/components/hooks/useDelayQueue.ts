import { useState, useEffect } from 'react';

type DelayQueue = [string, (delay: number) => void, () => void];
type DelayData = { timeout: number; date: string };

const delay = (timeout: number, callback: () => string): Promise<string> => {
  return new Promise<string>((res) =>
    setTimeout(() => {
      const some = callback();
      res(some);
    }, timeout),
  );
};

export const useDelayQueue = (): DelayQueue => {
  const [queue, setQueue] = useState<DelayData[]>([]);
  const [log, setLog] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState('');

  useEffect(() => {
    if (queue.length > 0 && !loading) {
      setLoading(true);
      delay(
        queue[0].timeout * 1000,
        () => `${new Date().toLocaleTimeString()}: ${queue[0].timeout} / ${queue[0].date} \n`,
      ).then((result) => setLast(result));
    }
  }, [queue]);

  useEffect(() => {
    if (last.length > 0 && loading) {
      setLoading(false);
      setQueue(queue.slice(1, queue.length));
      setLog(`${log} ${last}`);
      setLast('');
    }
  }, [last]);

  const clickHandle = (time: number): void => {
    setQueue([...queue, { timeout: time, date: new Date().toLocaleTimeString() }]);
  };

  const resetHandle = (): void => {
    setQueue([]);
    setLog('');
  };

  return [log, clickHandle, resetHandle];
};
