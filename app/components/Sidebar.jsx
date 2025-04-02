'use client';

import { useState } from 'react';
import { 
  Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Divider, Typography, IconButton, Tooltip
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ApiIcon from '@mui/icons-material/Api';
import HomeIcon from '@mui/icons-material/Home';
import InputIcon from '@mui/icons-material/Input';
import RuleIcon from '@mui/icons-material/Rule';
import ScienceIcon from '@mui/icons-material/Science';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { 
      text: 'Home', 
      icon: <HomeIcon />, 
      path: '/',
      active: pathname === '/'
    },
    { 
      text: 'Integrations', 
      icon: <IntegrationInstructionsIcon />, 
      path: '/integrations',
      active: pathname.startsWith('/integrations')
    },
    { 
      text: 'Endpoints', 
      icon: <ApiIcon />, 
      path: '/endpoints',
      active: pathname.startsWith('/endpoints')
    },
    { 
      text: 'Inputs', 
      icon: <InputIcon />, 
      path: '/inputs',
      active: pathname.startsWith('/inputs')
    },
    { 
      text: 'Rules', 
      icon: <RuleIcon />, 
      path: '/rules',
      active: pathname.startsWith('/rules')
    },
    { 
      text: 'Test', 
      icon: <ScienceIcon />, 
      path: '/test',
      active: pathname.startsWith('/test')
    },
    { 
      text: 'Connection History', 
      icon: <HistoryIcon />, 
      path: '/connections',
      active: pathname.startsWith('/connections')
    }
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        borderRight: '1px solid',
        borderColor: 'divider',
        height: '100vh',
        bgcolor: 'background.paper',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        position: 'relative'
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between'
      }}>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Integration Hub
          </Typography>
        )}
        <IconButton onClick={toggleSidebar}>
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={collapsed ? item.text : ""} placement="right">
              <ListItemButton 
                onClick={() => router.push(item.path)}
                selected={item.active}
                sx={{ 
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  py: 1.5
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: collapsed ? 0 : 40,
                  mr: collapsed ? 0 : 2
                }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 