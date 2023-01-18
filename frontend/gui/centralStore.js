//Initialising Redux
const redux = require('redux');

//Creating Store
const creatStore = redux.createStore;

//Initial State
const InitialState ={
    counter: 0,
}

//Root Reducer
const reducer =(state=InitialState,action)=>{
    let getAction = action.type
    switch(getAction){
        case 'INC_COUNTER':
            return {
                ...state,
                counter: state.counter+1
            }
        case 'ADD_COUNTER':
            return {
                ...state,
                counter: state.counter+action.value
            }
    }
    return state;
}

//Store Initialisation
const store = creatStore(reducer);


//Subscription to the state
store.subscribe(()=>{
    console.log(store.getState())
})

//Dispatching Action
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER',value:10})


