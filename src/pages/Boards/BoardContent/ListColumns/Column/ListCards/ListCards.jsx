
import Box from '@mui/material/Box'
import Card from './Card/Card'


function ListCards() {
  return (
    <Box sx={{
              p: 2,
              m: 0.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: (theme) =>`calc(
              ${theme.trello.boardcontentheight} - 
              ${theme.spacing(5)} -
              ${theme.trello.columnheaderheight} -
              ${theme.trello.columnfooterheight}
            )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da',borderRadius: '8px'},
            '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#dfc2cf'}

            }}>
        <Card />
        <Card temporaryHideMedia />
              
              
     </Box>
  )
}

export default ListCards
