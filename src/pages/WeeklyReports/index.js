import React, {useState, useContext} from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {ThemeContext} from "styled-components"

import { Container, MainPanel, Content } from "../styles";
import SideBar from "../../components/Menus/SideBar";
import Header from "../../components/Menus/MenuHeader";
import DataTable from "../../components/DataTable";
import InstrumentCapacity from "../../components/Reports/InstrumentCapacity";

import { viralload } from "../../utils/menuConfig";

const labels = ["Laboratorio","Equipamento","Capacidade", "Total de Amostras Testadas", "Ultima Actualizacao"]

const rows = [
  ["Carmelo","CAPCTM","843","1245","2020-10-22 00:01:45.387"],
  ["Carmelo","CAPCTM","843","1245","2020-10-22 00:01:45.387"],
  ["Carmelo","CAPCTM","843","1245","2020-10-22 00:01:45.387"],
  ["Carmelo","CAPCTM","843","1245","2020-10-22 00:01:45.387"],
  ["Carmelo","CAPCTM","843","1245","2020-10-22 00:01:45.387"]
]

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  function WeeklyReports() {
      const [value, setValue] = React.useState(0);
      const { colors } = useContext(ThemeContext);
      
      const useStyles = makeStyles((theme) => ({
          root: {
              flexGrow: 1,
              backgroundColor: colors.background.primary,
            },
      }));
        const classes = useStyles();
        
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return <Container>
            <SideBar active="reports" menu={viralload} />
            <MainPanel>
                <Header page="Relatorio Semanal" id="reports" menu={viralload} />
                <Content>
                <div className={classes.root}>
                    <AppBar position="static" style={{boxShadow:"none"}}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="simple tabs example"
                            indicatorColor="primary"
                            textColor={colors.primary}
                            textColorPrimary={colors.primary}
                            style={{backgroundColor: colors.background.primary, color: colors.text}}
                        >
                            <Tab label="Capacidade do Equipamento" {...a11yProps(0)} />
                            <Tab label="Amostras Pendentes" {...a11yProps(1)} />
                            <Tab label="Amostras Registadas" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {/* <DataTable header={labels} rows={rows} /> */}
                        <InstrumentCapacity/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </div>
                </Content>
            </MainPanel>
            </Container>;
}

export default WeeklyReports;