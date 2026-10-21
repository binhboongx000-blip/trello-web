import Box from '@mui/material/Box'
import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utilis/sorts'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'


function Column( { column }) {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: column._id, data: {...column}})
  const dndKidColumnStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
   };

    const id = React.useId()
    const buttonId = `${id}-button`
    const menuId = `${id}-menu`
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget)}
    const handleClose = () => { setAnchorEl(null) }
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
        <Box 
          ref={setNodeRef}
          style={dndKidColumnStyle}
          {...attributes}
          {...listeners}
          sx={{  
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643': '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height:'fit-content',
            maxHeight: (theme) =>`calc(${theme.trello.boardcontentheight} - ${theme.spacing(5)})`

          }}>
        
            <Box sx={{
              height: (theme) => theme.trello.columnheaderheight,
              display: 'flex',
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography variant="h6" sx= {{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
                }}>
                ({column?.title})
              </Typography>
              <Box>
                <Tooltip title ="More options">
                  <ExpandMoreIcon 
                    sx={{
                      color: 'text.secondary',
                      cursor: 'pointer',
                    }}
                    id={buttonId}
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id={menuId}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': buttonId
                    },
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>< DeleteForeverIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Remove This Column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                    <ListItemText>Archive This Column</ListItemText>
                  </MenuItem>
                </Menu>
                
              </Box>
            </Box>
              {/* Box List card */}
            <ListCards cards={orderedCards} />

            <Box sx={{
              height: (theme) => theme.trello.columnfooterheight,
              display: 'flex',
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Button startIcon={<AddCardIcon />} >Add new card</Button>
              <Tooltip title ="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          </Box>
  )
}

export default Column
