import Box from '@mui/material/Box'
function BoardContent
() {
  return (
    <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100% - ${theme.trello.appbarheight} - ${theme.trello.boardbarheight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        
    </Box>
  )
}

export default BoardContent

