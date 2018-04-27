import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let tranformedIngredients = Object.keys(props.ingredients)
    .map(igKey => (
      [...Array(props.ingredients[igKey])].map((_, i) => 
        <BurgerIngredient key={igKey + i} type={igKey} />
      )
    ))
    .reduce((acc, next) => {
      return acc.concat(next)
    }, []);

  if (tranformedIngredients.length === 0) {
    tranformedIngredients = <p>Please start adding ingredients</p>
  } 
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
        {tranformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}

export default burger;