import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';
import { createFight, updateFight } from '../../services/domainRequest/fightRequest';

import './fight.css'

class Fight extends React.Component {
    state = {
        fighters: [],
        fighter1: null,
        fighter2: null,
        fight: {}
    };

    async componentDidMount() {
        const fighters = await getFighters();
        if(fighters && !fighters.error) {
            this.setState({ fighters });
        }
    }

    attacks = (position) =>   {
        // const {fight, fighter1, fighter2} = this.state
        // console.log('Attacks',fight, fighter1, fighter2)
        // const { log} = fight
        // let updateFight = {}
        // let damage = 0
        // switch (position) {
        //     case 'right': {
        //         damage = fighter2.health - fighter1.power
        //         console.log(damage)
        //         updateFight = {
        //             fighter1Shot: fighter1.power,
        //             fighter2Shot: 0,
        //             fighter1Health: fighter1.health,
        //             fighter2Health: fighter2.health - fighter1.power
        //         }
        //         this.setState({fighter2: {...fighter2,health:damage}})
        //         break
        //     }
        //     case 'left': {
        //         damage = fighter1.health - fighter2.power
        //         updateFight = {
        //             fighter2Shot: fighter2.power,
        //             fighter1Shot: 0,
        //             fighter2Health: fighter2.health,
        //             fighter1Health: fighter1.health - fighter2.power
        //         }
        //         this.setState({ fighter2: { ...fighter1, health: damage } })
        //         break
        //     }
        //     default:{
        //     }
        // }
        // updateFight({log: [...log, updateFight]})
        // this.setState({fight: {...fight,log:[...log, {updateFight}]}})
    }

    onFightStart = () => {
        const {fighter1, fighter2} = this.state
        console.log('OnFightAttack',fighter1, fighter2)
        const newFight = {
            fighter1: fighter1.id,
            fighter2: fighter2.id,
            log: [
                {
                    fighter1Shot: 0,
                    fighter2Shot: 0,
                    fighter1Health: fighter1.health,
                    fighter2Health: fighter2.health
                }
            ]
        }
        createFight(newFight)
        this.setState({fight: newFight})
        this.attacks('right')
        this.attacks('left')
    }

    onCreate = (fighter) => {
        this.setState({ fighters: [...this.state.fighters, fighter] });
    }

    onFighter1Select = (fighter1) => {
        this.setState({fighter1 });
    }

    onFighter2Select = (fighter2) => {
        this.setState({ fighter2 });
    }

    getFighter1List = () => {
        const { fighter2, fighters } = this.state;
        if(!fighter2) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter2.id);
    }

    getFighter2List = () => {
        const { fighter1, fighters } = this.state;
        if(!fighter1) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter1.id);
    }

    render() {
        const  { fighter1, fighter2, message} = this.state;
        return (
            <div id="wrapper">
                <NewFighter onCreated={this.onCreate} />
                <div id="figh-wrapper">
                    <Fighter selectedFighter={fighter1} onFighterSelect={this.onFighter1Select} fightersList={this.getFighter1List() || []} />
                    <button onClick={this.attacks('right')}>Attack</button>
                    <div className="btn-wrapper">
                        <Button onClick={this.onFightStart} variant="contained" color="primary">Start Fight</Button>
                    </div>
                    <Fighter selectedFighter={fighter2} onFighterSelect={this.onFighter2Select} 
                    fightersList={this.getFighter2List() || []} />
                    <button onClick={this.attacks('left')}>Attack</button>
                </div>
                <div>
                    {message}Deberia iniciar la batalla
                </div>
            </div>
        );
    }
}

export default Fight;