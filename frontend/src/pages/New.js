import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    //async para usar o await na api.post
    handleSubmit = async e => {
        e.preventDefault();

        //como tem imagem nos dados, poderia enviar diretamente como JSON, mas está sendo enviado como multiform
        //por isso a criação da const data
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data)

        //ao finalizar, redireciona para a página inicial
        //o push faz enviar para uma nova rota
        this.props.history.push('/');
        
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }
    
    //esse formato de function para poder acessar o this
    handleChange = e => {
        //essa linha faz com que o nome do campo vire a variável do state, passando o valor do input para aquela variável
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit} >
                <input type="file" onChange={this.handleImageChange}/>
                <input type="text" name="author" placeholder="Autor do post" onChange={this.handleChange} value={this.state.author}/>
                <input type="text" name="place" placeholder="Local do post" onChange={this.handleChange} value={this.state.place}/>
                <input type="text" name="description" placeholder="Descrição do post" onChange={this.handleChange} value={this.state.description}/>
                <input type="text" name="hashtags" placeholder="Hashtags do post" onChange={this.handleChange} value={this.state.hashtags}/>

                <button type="submit">Postar</button>
            </form>
        );
    }
}

export default New;