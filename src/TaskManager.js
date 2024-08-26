import {
    Add as AddIcon,
    Check as CheckIcon,
    Delete as DeleteIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slider,
    Snackbar,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
  
  function App() {
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([
      { id: 1, title: 'Task 1', priority: 3, completed: false },
      { id: 2, title: 'Task 2', priority: 2, completed: true },
      { id: 3, title: 'Task 3', priority: 1, completed: false }
    ]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newSliderValue, setNewSliderValue] = useState(50);
  
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
      setNewTaskTitle('');
      setOpenDialog(false);
    };
  
    const handleOpenSnackbar = () => setSnackbarOpen(true);
    const handleCloseSnackbar = () => setSnackbarOpen(false);
  
    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  
    const handleSwitchChange = (event) => setShowCompleted(event.target.checked);
  
    const handleTabChange = (event, newValue) => setTabValue(newValue);
  
    const handleNewSliderChange = (event, newValue) => setNewSliderValue(newValue);
  
    const handleInputChange = (event) => setNewTaskTitle(event.target.value);
  
    const addTask = () => {
      if (newTaskTitle.trim() === '') return;
  
      setTasks([...tasks, { id: tasks.length + 1, title: newTaskTitle, priority: 3, completed: false }]);
      handleCloseDialog();
      handleOpenSnackbar();
    };
  
    const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    };
  
    const toggleTaskCompletion = (id) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    };
  
    const filteredTasks = tasks.filter(task => {
      if (tabValue === 1 && task.completed) return false;
      if (tabValue === 2 && !task.completed) return false;
      return true;
    });
  
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Open Menu">
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" style={{ flexGrow: 1 }}>Task Manager</Typography>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleOpenSnackbar}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add New Task">
              <IconButton color="inherit" onClick={handleOpenDialog}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="User Info">
              <IconButton color="inherit">
                <Avatar>
                  U
                  <Badge badgeContent={3} color="secondary" />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
  
        <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
  
        <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" centered>
            <Tab label="All Tasks" />
            <Tab label="Pending Tasks" />
            <Tab label="Completed Tasks" />
          </Tabs>
  
          <Grid container spacing={2} style={{ margin: '16px 0' }}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Toggle to show completed tasks">
                <Switch
                  checked={showCompleted}
                  onChange={handleSwitchChange}
                  name="showCompleted"
                  color="primary"
                />
              </Tooltip>
              <Typography display="inline" style={{ marginLeft: '8px' }}>
                Show Completed Tasks
              </Typography>
            </Grid>
          </Grid>
  
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTasks.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.priority}</TableCell>
                          <TableCell>
                            <IconButton
                              color={task.completed ? 'primary' : 'default'}
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              <CheckIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="secondary"
                              onClick={() => deleteTask(task.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
  
          <Grid container spacing={2} style={{ margin: '16px 0' }}>
            <Grid item xs={12}>
              <Tooltip title="Adjust new slider">
                <Slider
                  value={newSliderValue}
                  onChange={handleNewSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  aria-labelledby="new-slider"
                  style={{ width: '100%' }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </div>
  
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={newTaskTitle}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={addTask} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
  
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Task added successfully!"
        />
      </div>
    );
  }
  
  export default App;
  