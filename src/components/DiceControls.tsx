import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Typography,
  Button,
  styled,
  Slider,
  Radio,
  Box,
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

interface DiceControlsProps {
  choice: 'over' | 'under';
  threshold: number;
  onChoiceChange: (value: 'over' | 'under') => void;
  onThresholdChange: (value: number) => void;
  onPlay: () => void;
}

export default function DiceControls({
  choice,
  threshold,
  onChoiceChange,
  onThresholdChange,
  onPlay,
}: DiceControlsProps) {
  return (
    <>
      <FormControl sx={{ mb: 2 }}>
        <RadioGroup
          row
          value={choice}
          onChange={({ target }) =>
            onChoiceChange(target.value as 'over' | 'under')
          }
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
          onChange={(_, value) => onThresholdChange(value as number)}
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
          aria-label="threshold slider"
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={onPlay}
        sx={{
          backgroundColor: '#9C27B0',
          textTransform: 'uppercase',
          maxWidth: '320px',
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '15px' }}>Play</Typography>
      </Button>
    </>
  );
}
