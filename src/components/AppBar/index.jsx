import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import Profiles from './Menus/Profiles'
function Appbar() {
  return (
    <Box px={2} sx={{
        width: '100%',
        height: (theme) => theme.trello.appbarheight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'primary.main', }} />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main'}}>Trello</Typography>
          </Box>
            <Workspaces />
            <Recent />
            <Templates />
            <Starred />
            <Button variant="outlined">CREATE</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField id="outlined-search" label="Search..." type="search" size="small" />
          <ModeSelector />

          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsIcon />
            </Badge>
          </Tooltip>

          <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
            <HelpIcon />
          </Tooltip>
          <Profiles />
        </Box>
    </Box>
    )
}
export default Appbar
