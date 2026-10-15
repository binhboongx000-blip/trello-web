import Box from '@mui/material/Box'
import ModeSelector from '~/commponents/ModeSelector'

function Appbar() {
  return (
  <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appbarheight,
        display: 'flex',
        alignItems: 'center',
      }}>
        <ModeSelector />
      </Box>
    )
}
export default Appbar
