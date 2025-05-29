'use client';

import { SyntheticEvent, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Slider,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
} from '@mui/material';

const CustomRadio = styled(Radio)(() => ({
  '&.Mui-checked': {
    color: '#9C27B0',
  },
}));

const CustomSlider = styled(Slider)(() => ({
  color: '#9C27B0',
  '& .MuiSlider-thumb': {
    transition: 'box-shadow 0.3s ease',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: '0 0 0 14px rgba(156, 39, 176, 0.16)',
    },
  },
}));

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
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#0000000A',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
            display: 'flex',
            height: 200,
            width: 320,
          }}
        >
          <Typography
            sx={{
              fontSize: '96px',
              fontWeight: 300,
            }}
          >
            {lastResult}
          </Typography>
        </Paper>

        <FormControl sx={{ mb: 2 }}>
          <RadioGroup
            row
            onChange={({ target }) =>
              setChoice(target.value as 'over' | 'under')
            }
            value={choice}
          >
            <FormControlLabel
              value="under"
              control={<CustomRadio />}
              label="Under"
            />
            <FormControlLabel
              value="over"
              control={<CustomRadio />}
              label="Over"
            />
          </RadioGroup>
        </FormControl>

        <Box width="100%" maxWidth={320}>
          <CustomSlider
            value={threshold}
            onChange={(_, value) => setThreshold(value as number)}
            min={1}
            max={100}
            valueLabelDisplay="on"
            marks={[
              { value: 1, label: '1' },
              { value: 18 },
              { value: 34 },
              { value: 50 },
              { value: 66 },
              { value: 82 },
              { value: 100, label: '100' },
            ]}
            step={1}
            aria-label="Threshold slider"
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handlePlay}
          sx={{
            backgroundColor: '#9C27B0',
            textTransform: 'uppercase',
            maxWidth: '320px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '15px',
            }}
          >
            Play
          </Typography>
        </Button>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: 'none', minHeight: 387 }}
        >
          <Table
            size="small"
            aria-label="game history"
            sx={{ tableLayout: 'fixed', width: '100%' }}
          >
            <TableHead>
              <TableRow sx={{ height: 56 }}>
                <TableCell sx={{ fontWeight: 500 }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Guess</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Result</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {history.length === 0 ? (
                <TableRow sx={{ height: 331 }}>
                  <TableCell colSpan={3} align="center">
                    No data yet
                  </TableCell>
                </TableRow>
              ) : (
                history.map(({ time, guess, result, success }, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{time}</TableCell>
                    <TableCell>{guess}</TableCell>
                    <TableCell sx={{ color: success ? '#1B5E20' : '#C62828' }}>
                      {result}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        key={toastKey}
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiPaper-root': {
            width: 600,
          },
        }}
      >
        <Alert
          severity={alertSeverity}
          icon={
            alertSeverity === 'success' ? (
              <CheckCircleOutlineIcon />
            ) : (
              <ErrorOutlineIcon />
            )
          }
          sx={{
            width: '100%',
            backgroundColor:
              alertSeverity === 'success' ? '#2E7D32' : '#D32F2F',
            color: '#ffffff',
            '& .MuiAlert-icon': {
              color: '#ffffff',
            },
            paddingX: '16px',
            paddingY: '6px',
          }}
        >
          {alertSeverity === 'success' ? (
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              You won
            </Typography>
          ) : (
            <>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: '4px' }}>
                You lost
              </Typography>
              <Typography variant="body2">{alertMessage}</Typography>
            </>
          )}
        </Alert>
      </Snackbar>
    </>
  );
}
