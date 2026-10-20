import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilis/sorts'

function BoardContent({ board }) {
  const oderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardcontentheight,
        p: '10px 0'
      }}>
       <ListColumns columns={oderedColumns} />
    </Box>
  )
}

export default BoardContent

