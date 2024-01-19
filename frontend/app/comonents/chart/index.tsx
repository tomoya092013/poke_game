import { PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  isCompare: boolean;
  HP: number[];
  attack: number[];
  defence: number[];
  specialAttack: number[];
  specialDefence: number[];
  speed: number[];
};

type StatusProps = {
  title: string;
  titleTop: number;
  titleLeft: number;
  status: number | null;
  top: number;
  left: number;
};

const Chart = ({
  isCompare,
  HP,
  attack,
  defence,
  specialAttack,
  specialDefence,
  speed,
}: Props) => {
  const data = [
    {
      title: 'HP',
      A: HP[0],
      B: HP[1],
    },
    {
      title: 'こうげき',
      A: attack[0],
      B: attack[1],
    },
    {
      title: 'ぼうぎょ',
      A: defence[0],
      B: defence[1],
    },
    {
      title: 'とくこう',
      A: specialAttack[0],
      B: specialAttack[1],
    },
    {
      title: 'とくぼう',
      A: specialDefence[0],
      B: specialDefence[1],
    },
    {
      title: 'すばやさ',
      A: speed[0],
      B: speed[1],
    },
  ];

  const totalParameter = {
    A:
      HP[0] +
      attack[0] +
      defence[0] +
      specialAttack[0] +
      specialDefence[0] +
      speed[0],
    B:
      HP[1] +
      attack[1] +
      defence[1] +
      specialAttack[1] +
      specialDefence[1] +
      speed[1],
  };

  const StatusValue = ({
    title,
    titleTop,
    titleLeft,
    status,
    top,
    left,
  }: StatusProps) => {
    return (
      <>
        <Box
          sx={{
            position: 'absolute',
            top: `${titleTop}px`,
            left: `${titleLeft}px`,
          }}
        >
          <Typography variant="caption">{title}</Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: { top }, left: { left } }}>
          {status}
        </Box>
      </>
    );
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <RadarChart width={200} height={200} data={data}>
          <PolarGrid />
          <PolarRadiusAxis angle={90} domain={[0, 160]} />
          <Radar
            dataKey="A"
            stroke={isCompare ? '#ff0057' : '#009c07'}
            fill={isCompare ? '#ffc5ec' : '#70ffa6'}
            fillOpacity={0.6}
          />
          <Radar
            dataKey="B"
            stroke="#3b00ff"
            fill="#c5fff8"
            fillOpacity={0.6}
          />
        </RadarChart>

        <Stack
          direction="row"
          sx={{
            position: 'absolute',
            top: isCompare ? 5 : 0,
            left: isCompare ? 92 : 80,
          }}
        >
          <Typography variant="caption">HP</Typography>
          {!isCompare && <Box marginLeft="5px"> {HP[0]}</Box>}
        </Stack>
        <StatusValue
          title={'こうげき'}
          titleTop={35}
          titleLeft={150}
          status={isCompare ? null : attack[0]}
          top={55}
          left={175}
        />
        <StatusValue
          title={'ぼうぎょ'}
          titleTop={150}
          titleLeft={150}
          status={isCompare ? null : defence[0]}
          top={130}
          left={175}
        />
        <Stack
          direction="row"
          sx={{
            position: 'absolute',
            top: 180,
            left: isCompare ? 75 : 60,
          }}
        >
          <Typography variant="caption">とくこう</Typography>
          {!isCompare && <Box marginLeft="5px">{specialAttack[0]}</Box>}
        </Stack>
        <StatusValue
          title={'とくぼう'}
          titleTop={150}
          titleLeft={0}
          status={isCompare ? null : specialDefence[0]}
          top={130}
          left={0}
        />
        <StatusValue
          title={'すばやさ'}
          titleTop={35}
          titleLeft={0}
          status={isCompare ? null : speed[0]}
          top={55}
          left={0}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 85,
            left: isCompare ? -3 : 83,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: isCompare ? '#ff0057' : '#009c07' }}
          >
            {totalParameter.A}
          </Typography>
        </Box>
        {isCompare && (
          <Box
            sx={{
              position: 'absolute',
              top: 85,
              left: 170,
            }}
          >
            <Typography variant="h6" sx={{ color: '#3b00ff' }}>
              {totalParameter.B}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Chart;
