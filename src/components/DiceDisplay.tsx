import { Paper, Typography } from '@mui/material';

interface DiceDisplayProps {
  value: number | null;
}

export default function DiceDisplay({ value }: DiceDisplayProps) {
  return (
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
        {value}
      </Typography>
    </Paper>
  );
}
