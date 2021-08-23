import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";

import CounterCard from "components/CounterCard";

const CoinFarmCard = ({ coin, symbolsJumps }) => {
    return (
        <Card key={coin.s}>
          <GridContainer style={{ padding: '1.5em' }}>
            <GridItem xs={12} sm={3} md={3}>
              <CounterCard
                title={coin.s}
                value={coin ? parseFloat(coin.c).toPrecision(5) : 0} 
                icon='attach_money'
                color='warning' />
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <CounterCard
                title='VENTAS'
                value={ symbolsJumps[coin.s] ? symbolsJumps[coin.s].sells : 0 } 
                icon='trending_up'
                color='danger'/>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <CounterCard
                title='COMPRAS'
                value={ symbolsJumps[coin.s] ? symbolsJumps[coin.s].buys : 0 } 
                icon='trending_down'
                color='primary'/>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <CounterCard
                title='SALTOS'
                value={ symbolsJumps[coin.s] ? symbolsJumps[coin.s].sells +  symbolsJumps[coin.s].buys : 0 } 
                icon='show_chart'
                color='success'/>
            </GridItem>
          </GridContainer>
        </Card>
    );
}

export default CoinFarmCard;