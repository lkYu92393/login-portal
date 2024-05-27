import { Dialog, Menu, Transition } from '@headlessui/react';
import {
    UserIcon,
    FolderIcon,
    HomeIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline';
import { Paper } from '@mui/material'
import clsx from 'clsx';
import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AuthContext } from '../../lib/auth'

const drawerWidth = 200;
function ResponsiveDrawer({ children }) {
    const { role, logout } = React.useContext(AuthContext);
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem key='timetable' disablePadding>
                    <ListItemButton to='/App'>
                        {/* <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                        <ListItemText primary='Timetable' />
                    </ListItemButton>
                </ListItem>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
            </List>
            <Divider />
            <List>
                {
                    role === 100
                ? <ListItem key='Management' disablePadding>
                    <ListItemButton to='/App/user/management'>
                        {/* <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                        <ListItemText primary='User Management' />
                    </ListItemButton>
                </ListItem>
                : <></>
                }
                <ListItem key='Profile' disablePadding>
                    <ListItemButton to='/App/user/profile'>
                        {/* <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key='Logout' disablePadding>
                    <ListItemButton onClick={() => {
                        logout()
                    }}>
                        {/* <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </ListItem>
                {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Portal
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ p: 3, width: { sm: `calc(100vw - ${drawerWidth}px)`, xs: `100vw` }, mt: { xs: '64px', md: '64px' } }}
            >
                {/* <Toolbar /> */}
                {children}
            </Box>
        </Box>
    );
}

const MainLayout = ({ children }) => {
    return (
        <ResponsiveDrawer>
            {children}
        </ResponsiveDrawer>
    )
}

export { MainLayout }

// export const MainLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = React.useState(false);

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">
//       <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <Sidebar />
//       <div className="flex flex-col w-0 flex-1 overflow-hidden">
//         <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
//           <button
//             className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <span className="sr-only">Open sidebar</span>
//             <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
//           </button>
//           <div className="flex-1 px-4 flex justify-end">
//             <div className="ml-4 flex items-center md:ml-6">
//               <UserNavigation />
//             </div>
//           </div>
//         </div>
//         <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
//       </div>
//     </div>
//   );
// };