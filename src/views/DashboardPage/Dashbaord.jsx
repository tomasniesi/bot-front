import React, { useEffect, useContext, useState } from 'react';

import moment from 'moment';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import CoinFarmCard from "components/CoinFarmCard";
import CounterCard from "components/CounterCard";

import { BinanceContext, BotContext } from '../../context/';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();

  const [ symbolsJumps, setSymbolsJumps ] = useState({});
  const { coinValues, allCurrentOpenOrders, accountInformation, getAllMyTrades, allMyTrades, accountBalances } = useContext(BinanceContext);
  const { botConfig } = useContext(BotContext);

  useEffect(() => {
    botConfig.map(config => {
      const startTime = moment().startOf("day").toDate().getTime();
      const endTime = moment().endOf("day").toDate().getTime();
      getAllMyTrades(config.symbol, startTime, endTime);
    });
  }, [botConfig, allCurrentOpenOrders]);
  
  useEffect(() => {
    if(allMyTrades){
      const jumpSymbol = getJumpsBySymbolToday();
      symbolsJumps[jumpSymbol.symbol] = jumpSymbol;
      setSymbolsJumps(symbolsJumps);
    }
  }, [allMyTrades]);

  const getJumpsBySymbolToday = () => {
    let symbolJump = {};
    allMyTrades.map((coinTrades) => {
      symbolJump = {
        buys: 0,
        sells: 0
      };
      coinTrades.map(trade => {
        symbolJump.symbol = trade.symbol;
        if(trade.isBuyer){
          symbolJump.buys++;
        }else{
          symbolJump.sells++;
        }
      })
    });
    return symbolJump;
  }

  const getOrdersTableData = () => {
    let rows = [];
    allCurrentOpenOrders.map(currentOpenOrder => {
      const row = [
        currentOpenOrder.symbol, 
        parseFloat(currentOpenOrder.price).toPrecision(5), 
        parseFloat(currentOpenOrder.origQty).toPrecision(5), 
        currentOpenOrder.status, 
        currentOpenOrder.side, 
        moment(currentOpenOrder.time).format('DD/MM/YYYY HH:mm')
      ];
      rows.push(row);
    });
    return rows;
  }

  const getBalancesTableData = () => {
    let rows = [];
    accountBalances.map(balance => {
      if(balance.free > 0 || balance.locked > 0){
        const coinValue = coinValues.find(coin => coin.s.includes(`${balance.asset}`));
        const totalBalance = parseFloat(balance.free) + parseFloat(balance.locked);
        const equivalentUsd = coinValue ? totalBalance * coinValue.c : totalBalance;
        const row = [balance.asset, balance.free, balance.locked, balance.asset === 'USDT' ? totalBalance.toPrecision(6) : equivalentUsd.toPrecision(6), balance.cotizationGain.toString(), balance.botGain.toString()];
        rows.push(row);
      }
    });
    return rows;
  }

  const getTotalBalanceUSDT = () => {
    let totalBalance = 0;
    accountBalances.map(balance => {
        if(balance.free > 0 || balance.locked > 0){
          const coinValue = coinValues.find(coin => coin.s.includes(`${balance.asset}`));
          const coinBalance = parseFloat(balance.free) + parseFloat(balance.locked);
          if(balance.asset !== 'USDT'){
            totalBalance += coinValue ? coinBalance * coinValue.c : coinBalance;
          } else {
            totalBalance += coinBalance;
          }
      }
    });
    return parseFloat(totalBalance).toFixed(2);
  }

  return (
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} lg={3}>
          <CounterCard
            title="Balance USDT"
            value={getTotalBalanceUSDT()} 
            icon='attach_money'
            color='warning' />
        </GridItem>

        {coinValues.map(coin => 
          <CoinFarmCard
            key={coin.s} 
            coin={coin}
            symbolsJumps={symbolsJumps}/>
        )}

        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>Ordenes abiertas</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Simbolo', 'Precio', 'Cantidad', 'Estado', 'Operacion', 'Fecha']}
                tableData={getOrdersTableData()}>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>Balances</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Simbolo', 'Free', 'Locked', 'Equivalencia USD', 'Ganancia Cotización USD', 'Ganancia BOT USD']}
                tableData={getBalancesTableData()}>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}

export default Dashboard;