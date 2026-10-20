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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
    const id = React.useId()
    const buttonId = `${id}-button`
    const menuId = `${id}-menu`
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null) 
    }

  return (
    <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardcontentheight,
        p: '10px 0'
      }}>
        <Box sx={{  
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar-track': { m:2}
        }}>
                 {/* BOARD COLUMN 01*/}
        <Box sx={{  
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643': '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height:'fit-content',
            maxHeight: (theme) =>`calc(${theme.trello.boardcontentheight} - ${theme.spacing(5)})`

          }}>
        
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
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
                Column Title
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
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
            )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da',borderRadius: '8px'},
            '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#dfc2cf'}

            }}>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://encrypted-tbn0.gstatic.com/
                  images?q=tbn:ANd9GcTturU1F3ivf7rBUbAkcEUf8n_8uSkkK07hAiPTXG6-cfzDfS4npRHCwOsW&s=10"
                  title="green iguana"
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Anh Binh</Typography>
                </CardContent>
                <CardActions sx={{p:'0 4px 8px 4px'}}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={< CommentIcon />}>5</Button>
                  <Button size="small" startIcon={< AttachmentIcon />}>5</Button>
                </CardActions>
              </Card>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ 
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia
                
                />
                <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              
            </Box>

            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
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
          {/* Board column 02 */}
        <Box sx={{  
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643': '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height:'fit-content',
          maxHeight: (theme) =>`calc(${theme.trello.boardcontentheight} - ${theme.spacing(5)})`

        }}>
      
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column Title
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
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
          )`,
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da',borderRadius: '8px'},
          '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#dfc2cf'}

          }}>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
              overflow: 'unset',
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://encrypted-tbn0.gstatic.com/
                images?q=tbn:ANd9GcTturU1F3ivf7rBUbAkcEUf8n_8uSkkK07hAiPTXG6-cfzDfS4npRHCwOsW&s=10"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Anh Binh</Typography>
              </CardContent>
              <CardActions sx={{p:'0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={< CommentIcon />}>5</Button>
                <Button size="small" startIcon={< AttachmentIcon />}>5</Button>
              </CardActions>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
              overflow: 'unset',
            }}>
              <CardMedia
                
              />
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            
          </Box>

          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
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
        </Box>   
        
    </Box>
  )
}

export default BoardContent

