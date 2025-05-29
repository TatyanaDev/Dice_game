'use client';

import { SyntheticEvent, useState } from 'react';
import { Box } from '@mui/material';
import ResultSnackbar from '@/components/ResultSnackbar';
import DiceControls from '@/components/DiceControls';
import HistoryTable from '@/components/HistoryTable';
import DiceDisplay from '@/components/DiceDisplay';

type HistoryEntry = {
  time: string;
  guess: string;
  result: number;
  success: boolean;
};

export default function DiceGame() {
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [choice, setChoice] = useState<'over' | 'under'>('under');
  const [toastOpen, setToastOpen] = useState(false);
  const [threshold, setThreshold] = useState(50);
  const [toastKey, setToastKey] = useState(0);

  const rollDice = () => Math.floor(Math.random() * 100) + 1;

  const alertSeverity = (() => {
    if (lastResult === null) {
      return undefined;
    }

    if (choice === 'over') {
      return lastResult > threshold ? 'success' : 'error';
    }

    return lastResult < threshold ? 'success' : 'error';
  })();

  const getFailureMessage = (
    choice: 'over' | 'under',
    result: number,
    threshold: number
  ): string => {
    if (choice === 'under' && result >= threshold) {
      return 'Number was higher';
    }

    if (choice === 'over' && result <= threshold) {
      return 'Number was lower';
    }

    return '';
  };

  const alertMessage =
    lastResult === null
      ? ''
      : alertSeverity === 'success'
      ? 'You won!'
      : getFailureMessage(choice, lastResult, threshold);

  const handlePlay = (): void => {
    const result = rollDice();
    setLastResult(result);

    const success = choice === 'over' ? result > threshold : result < threshold;

    const time = new Date().toLocaleTimeString(undefined, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newEntry: HistoryEntry = {
      time,
      guess: `${choice.charAt(0).toUpperCase() + choice.slice(1)} ${threshold}`,
      result,
      success,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
    setToastKey((prev) => prev + 1);
    setToastOpen(true);
  };

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  return (
    <>
      <Box
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        height="100vh"
        display="flex"
        maxWidth={600}
        gap={2}
      >
        <DiceDisplay value={lastResult} />

        <DiceControls
          choice={choice}
          threshold={threshold}
          onChoiceChange={setChoice}
          onThresholdChange={setThreshold}
          onPlay={handlePlay}
        />

        <HistoryTable history={history} />
      </Box>

      <ResultSnackbar
        open={toastOpen}
        severity={alertSeverity}
        message={alertMessage}
        onClose={handleClose}
        keyProp={toastKey}
      />
    </>
  );
}
