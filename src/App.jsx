import Button from '@mui/material/Button'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import { useColorScheme} from '@mui/material/styles'
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutLinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelector() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
    console.log(selectedMode)
    setMode(event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        </div>
          <LightModeIcon fontSize="small" /> Light
        </MenuItem>
        <MenuItem value="dark">
        <box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DarkModeOutLinedIcon fontSize="small" /> Dark
        </box>
        </MenuItem>
        <MenuItem value="system">
        <box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsBrightnessIcon fontSize="small"/> System
        </box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
       {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    )
}

function App() {
  return (
    <>
    <ModeSelector />
    <hr />
    <ModeToggle />
    <div>abinhb</div>

    <Button variant="text">Text</Button>
    <Button variant="contained">Contained</Button>
    <Button variant="outlined">Outlined</Button>
     <br />
    <HomeIcon color="primary" />
    <HomeIcon color="secondary" />
    <HomeIcon color="success" />
    <HomeIcon color="action" />
    <HomeIcon color="disabled" />
    <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}


export default App
