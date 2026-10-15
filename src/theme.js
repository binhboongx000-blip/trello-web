import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { red, blue, green, cyan, teal, orange, deepOrange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appbarheight: '58px',
    boardbarheight: '68px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
})

export default theme