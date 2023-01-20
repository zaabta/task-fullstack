import "./Todo.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import { DataCtx } from "../../context/Tasks";
import {AlertContex} from "../../context/AlertContex"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem
} from "@mui/material";

const Todo = ({ id, text, color, status }) => {
  const { removeTask, setNotes } = useContext(DataCtx);
  const { toggleOn } = useContext(AlertContex)
  const [statusOptions, setStatusOptions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const menuRef = useRef();
  console.log(menuRef);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = async (statusId, taskId) => {
    const res = await fetch(`http://localhost:3000/api/v1/todoes/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || null}`
      },
      body: JSON.stringify({
        statusId
      })
    });
    const json = await res.json();
    toggleOn(json.messages, json.success)
    if (json.success) {
      setNotes((prev) => {
        const newTasks = [...prev];
        const index = newTasks.findIndex((todo) => todo.id == taskId);
        if (index != -1) {
          newTasks[index].status = json.data.name;
        }
        return newTasks;
      });
    }
    setAnchorEl(null);
  };

  const getStatusOption = async () => {
    const res = await fetch("http://localhost:3000/api/v1/status");
    const json = await res.json();
    if (json.success) setStatusOptions(json.data);
    console.log(json);
  };

  useEffect(() => {
    getStatusOption();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(anchorEl);

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:3000/api/v1/todoes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || null}`
      }
    });
    const json = await res.json();
    toggleOn(json.messages, json.success)
    if (json.success) {
      removeTask(id);
    }
    handleClose();
  };

  const isLight = (color) =>
    (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

  return (
    <div
      key={id}
      className="todo"
      style={{
        backgroundColor: `rgb(${color.red},${color.green}, ${color.blue})`,
        color: `${isLight(color) ? "black" : "white"}`
      }}
    >
      <p>{text}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div onClick={(e) => handleClick(e)}>
          {(status == "todo" && (
            <span className="material-symbols-outlined">splitscreen</span>
          )) ||
            (status == "in progress" && (
              <span className="material-symbols-outlined">donut_small</span>
            )) ||
            (status == "done" && (
              <span className="material-symbols-outlined">done</span>
            )) ||
            (status == "canceled" && (
              <span className="material-symbols-outlined">close</span>
            ))}
        </div>

        <span className="material-symbols-outlined" onClick={handleClickOpen}>
          delete
        </span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textTransform: "capitalize" }}>
          Are you sure ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            if you will delete this you can not have back !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteTask(id)} color="error">
            delete
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        sx={{
          "& .MuiPaper-root":{
            backgroundColor: `rgb(${color.red},${color.green}, ${color.blue})`,
            color: `${isLight(color) ? "black" : "white"}`
          } 
        }}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        {statusOptions.map((statusOption) => (
          <MenuItem
            key={statusOption.id}
            onClick={() => handleCloseMenu(statusOption.id, id)}
          >
            {(statusOption.name == "todo" && (
              <span
                style={{ marginRight: 10 }}
                className="material-symbols-outlined"
              >
                splitscreen
              </span>
            )) ||
              (statusOption.name == "in progress" && (
                <span
                  style={{ marginRight: 10 }}
                  className="material-symbols-outlined"
                >
                  donut_small
                </span>
              )) ||
              (statusOption.name == "done" && (
                <span
                  style={{ marginRight: 10 }}
                  className="material-symbols-outlined"
                >
                  done
                </span>
              )) ||
              (statusOption.name == "canceled" && (
                <span
                  style={{ marginRight: 10 }}
                  className="material-symbols-outlined"
                >
                  close
                </span>
              ))}
            {statusOption.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Todo;
