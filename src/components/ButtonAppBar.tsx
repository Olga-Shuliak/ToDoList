import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderPropsType = {
  title: string
}

export default function ButtonAppBar(props: HeaderPropsType) {

  return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >
          <Toolbar

              //прописываем стайл вручную (хардкор)
              style={{backgroundColor: '#c7eec7'}}>

            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
  );
}

