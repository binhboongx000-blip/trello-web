
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards( {cards}) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
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
          {cards?.map(card => <Card key={card._id} card={card} />)}
                
                
      </Box>
     </SortableContext>
  )
}

export default ListCards
