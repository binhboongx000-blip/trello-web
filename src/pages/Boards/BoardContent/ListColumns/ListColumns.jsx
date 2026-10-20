import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'


function ListColumns() {
  return (
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
      <Column />
      <Column />
      <Column />
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
  )
}

export default ListColumns
