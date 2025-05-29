import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
} from '@mui/material';

type HistoryEntry = {
  time: string;
  guess: string;
  result: number;
  success: boolean;
};

interface HistoryTableProps {
  history: HistoryEntry[];
}

export default function HistoryTable({ history }: HistoryTableProps) {
  const headerCellStyle = {
    fontWeight: 500,
  };

  return (
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
            <TableCell sx={headerCellStyle}>Time</TableCell>
            <TableCell sx={headerCellStyle}>Guess</TableCell>
            <TableCell sx={headerCellStyle}>Result</TableCell>
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
  );
}
