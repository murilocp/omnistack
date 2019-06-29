import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

function Routes() {
    return (
        //ao digitar o endereço sem nada, só a /, vai ser redirecionado com o componente Feed
        //caso o endereço seja /new será redirecionado para o componente New 
        //o Switch garante que apenas uma rota é chamada por URL
        //exact é uma comparação com a URL, e não se contém aquele caminho
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/new" exact component={New} />
        </Switch>
    );
}

export default Routes;