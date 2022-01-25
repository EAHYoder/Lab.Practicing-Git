import React, {useState} from 'react';
import {statGroup, setStats, RootState} from "./store"
import './App.css';
import { useSelector } from 'react-redux';

// type statBlock= {
//   dex: number;
//   str: number;
//   con: number;
//   int: number;
//   wis: number;
//   char: number;
// }

function App() {
  // const [rolledStats, setStats]= useState({
  //   dex: 0,
  //   str: 0,
  //   con: 0,
  //   int: 0,
  //   wis: 0,
  //   char: 0
  // })


  const rollStat=():number =>{
    let d6=[];
    //roll a 6 sided die four times
    for(let i=0; i<4; i++){
      let roll= Math.ceil(Math.random()*6)
      d6.push(roll)
    }
    //identify the lowest roll, and
    let lowest= Math.min(...d6)

    //remove the lowest roll
    let top3d6= d6.filter((roll)=>roll!==lowest)
    //there may have been more than one roll with the lowest value.  add the lowest value back however many times is needed to make sure you have three rolls
    while (top3d6.length<3){
      top3d6.push(lowest)
    }

    //add up the remaining three rolls
    let sumTop3= top3d6.reduce((runningSum:number, roll:number):number=>runningSum +roll)

    //return sum
    return sumTop3
  }

  const rollSet= ():statGroup=>{
    let newStatSet:statGroup= [0,0,0,0,0,0]
    for (let i=0; i<6; i++){
      newStatSet[i]=(rollStat())
    }

    setStats(newStatSet)
    return newStatSet
  }

  const statSet:statGroup = useSelector((state: RootState)=>state.stats)


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Roll Your Own Dungeons and Dragons Character
        </p>
      </header>
      <button onClick={()=>rollSet()}>Roll My Stats!</button>
      <p>Here are the stats you have to work with:</p>
      <ul>
        {/*map over the stats from the store to display each in its own div here. */}
        {statSet.map((stat:number, idx:number)=>{
          return <li key={idx} > {stat}</li>
        })}
      </ul>
      {/* <p>Dexterity: {rolledStats.dex}</p>
      <p>Strength: {rolledStats.str}</p>
      <p>Constitution: {rolledStats.con}</p>
      <p>Intelligence: {rolledStats.int}</p>
      <p>Wisdom: {rolledStats.wis}</p>
      <p>Charisma: {rolledStats.char}</p> */}
    </div>
  );
}

export default App;
