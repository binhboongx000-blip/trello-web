import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect/ModeSelect'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function Appbar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box  sx={{
        width: '100%',
        height: (theme) => theme.trello.appbarheight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50': '#1565c0'),
        '&::-webkit-scrollbar-track': { m:2}
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'white', }} />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white'}}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Templates />
            <Starred />
            <Button 
              sx={{ 
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none'}
              }}
              variant="outlined" startIcon={<LibraryAddIcon />}>CREATE
            </Button>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            InputProps={{
              startAdornment:(
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
              ),
              endAdornment:(
                <CloseIcon
                fontSize="small"
                sx={{ color: searchValue ? 'white' : ' transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
                />
              )
            }}
            sx={{
              minWidth: '120px', maxWidth: '170px',
              '& laber': { color: 'white' },
              '& input': { color: 'white' },
              '& laber.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root':{
                '& fieldset': { borderColor: 'white'},
                '&:hover fieldset': { borderColor: 'white'},
                '& .Mui-focused fieldset': { borderColor: 'white'}
              }
            }}
          />
          <ModeSelector />

          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
            <HelpIcon sx={{ color: 'white' }} />
          </Tooltip>
          <Profiles />
        </Box>
    </Box>
    )
}
export default Appbar
