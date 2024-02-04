// 크롭박스 설정 후 사진을 한 그리드에 담을 때 누르는 버튼

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';


export default function ButtonColors({onClick, value, isClickable}) {
  const [variant, setVariant] = React.useState('soft');
  return (
    <Box
      sx={{
        // display: 'flex',
        marginRight: '10%',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Box
        sx={{
          // display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1,
        }}
      >
        <Button onClick={onClick} size="md" disabled={!isClickable}  variant={variant} color="primary">
          이미지 설정
        </Button>
      </Box>
      
    </Box>
  );
}