import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


function ListColumns( { columns }) {
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
    <Box sx={{  
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': { height: '8px' },
          '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#aeb4c0',
          borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#dcdde1' }
        }}>
      {columns?.map(column => <Column key={column._id} column={column} />)}
        
        {/* Box add new column */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        boderRadius: '6px',
        height:'fit-content',
        bgcolor: '#ffffff3d'

      }}>
        <Button
        startIcon={<NoteAddIcon />}
        sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1.,
        }}
        >
            Add new column
        </Button>
    
      </Box>

    </Box>  
    </SortableContext> 
  )
}

export default ListColumns
