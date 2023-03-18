import {
  Add,
  Create,
  DeleteForeverOutlined,
  ExpandMoreOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { green, grey, orange, red } from "@mui/material/colors";
import {
  deleteMenu,
  getAllMenus,
  getAllOffices,
  getAllProducts,
  getMenuById,
} from "api";
import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "store";
import { FixedSizeList } from "react-window";
import renderRow from "./renderRow";
import { message } from "antd";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Details from "./details";

const Menus = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [state] = useContext(StoreContext);
  const [search, setSearch] = useState("");
  const [offices, setOffices] = useState([]);
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getAllMenus({ token: state.accessToken });
      const response2 = await getAllOffices({ token: state.accessToken });
      const response3 = await getAllProducts({ token: state.accessToken });
      setMenus(response);
      setOffices(response2);
      setProducts(response3);
    }
    fetchMyAPI();
  }, [open, state.accessToken, loading]);

  const handleSearch = (event, value) => {
    setSearch(value === null ? "" : value);
  };

  const handleEdit = async (popupState, id) => {
    popupState.close();
    setId(id);
    setOpen(true);
  };

  const handleDelete = async (popupState, id) => {
    popupState.close();
    setLoading(true);
    const result = await deleteMenu({ id, token: state.accessToken });
    if (result.statusCode === 200) {
      setLoading(true);
      info("success", result.message);
    } else {
      console.log(result);
      setLoading(true);
      info("error", result.statusText);
    }
    setTimeout(() => setLoading(false), 200);
  };

  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };
  return (
    <>
      {contextHolder}
      {Id ? (
        <Details
          id={Id}
          open={open}
          offices={offices}
          products={products}
          token={state.accessToken}
          setOpen={setOpen}
          setId={setId}
        />
      ) : (
        ""
      )}
      <Box m="1.0rem 2.0rem">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Autocomplete
            style={{ minWidth: 400 }}
            options={offices.map((option) => option.name)}
            onChange={handleSearch}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                value={search}
                label="Office Name"
                variant="standard"
                color="success"
              />
            )}
          />
          <Box margin={2} marginRight={10}>
            <Button
              color="success"
              variant="outlined"
              onClick={(e) => navigate("/menus/add")}
            >
              <Add /> New Menu
            </Button>
          </Box>
        </Box>
        <Container>
          <Box>
            <Grid container marginTop={3} spacing={2} textAlign="center">
              {menus
                .filter((item) => {
                  return search === ""
                    ? item
                    : item.office.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .sort((item1, item2) => {
                  return item1.session.sessionId - item2.session.sessionId;
                })
                .map((item) => (
                  <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          item.session.sessionId === 1 ? (
                            <Tooltip title="Time: 7h - 11h">
                              <Avatar
                                sx={{ bgcolor: green[500] }}
                                aria-label="recipe"
                              >
                                {item.session.sessionName}
                              </Avatar>
                            </Tooltip>
                          ) : item.session.sessionId === 2 ? (
                            <Tooltip title="Time: 11h - 13h">
                              <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                              >
                                {item.session.sessionName}
                              </Avatar>
                            </Tooltip>
                          ) : item.session.sessionId === 3 ? (
                            <Tooltip title="Time: 13h - 17h">
                              <Avatar
                                sx={{ bgcolor: orange[500] }}
                                aria-label="recipe"
                              >
                                {item.session.sessionName}
                              </Avatar>
                            </Tooltip>
                          ) : item.session.sessionId === 4 ? (
                            <Tooltip title="Time: 15h - 22h">
                              <Avatar
                                sx={{ bgcolor: grey[500] }}
                                aria-label="recipe"
                              >
                                {item.session.sessionName}
                              </Avatar>
                            </Tooltip>
                          ) : null
                        }
                        action={
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <Fragment>
                                <IconButton
                                  variant="contained"
                                  {...bindTrigger(popupState)}
                                >
                                  <MoreVertOutlined />
                                </IconButton>
                                <Menu {...bindMenu(popupState)}>
                                  <MenuItem
                                    onClick={(e) => {
                                      handleEdit(popupState, item.id);
                                    }}
                                  >
                                    <Create
                                      sx={{ marginRight: 1 }}
                                      color="info"
                                    />
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(e) => {
                                      handleDelete(popupState, item.id);
                                    }}
                                  >
                                    <DeleteForeverOutlined
                                      sx={{ marginRight: 1 }}
                                      color="error"
                                    />
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </Fragment>
                            )}
                          </PopupState>
                        }
                        title={item.office.name}
                        subheader={item.office.phone}
                        sx={{ height: 100 }}
                      />
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreOutlined />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            {"(" + item.products.length + ") " + item.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            sx={{
                              width: "100%",
                              height: 240,
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <FixedSizeList
                              itemData={item.products}
                              height={250}
                              width={360}
                              itemSize={50}
                              itemCount={item.products.length}
                              overscanCount={1}
                            >
                              {renderRow}
                            </FixedSizeList>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Menus;
