import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {

    state = {
        feed: [],
    };

    async componentDidMount() {
        this.registerToSocket();
        const response = await api.get('posts');

        //o setState serve para mudar o estado e fazer o render da página novamente
        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket =io('http://localhost:3334');

        //o socket ouve as duas msgs que podem vir do backend, post ou like.
        //nesse caso vamos ouvir o post, o newPost são os dados recebidos que serão colocados em primeiro lugar no feed
        socket.on('post', newPost => {
            //no caso, para colocar em primeiro, atuliza a variavel de estado feed colocando primeiro o newPost (que veio no socket ouvindo)
            //e depois colocando o resto do que já tem no feed
            this.setState({ feed: [newPost, ... this.state.feed] })
        })

        //na mensagem like, vem um post que já existe no feed.
        //com isso, precisamos encontrar o post com aquele id retornado, atualizando o número de likes.
        socket.on('like', likedPost => {
            //percorrer o meu estado com o map, quando for o mesmo Id, muda os likes
            //no caso, para cada item encontrado no map, retorna a variável post
            //_id é o Id presente no MongoDB
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post                 
                )
            })
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }


    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        
                        <img src={more} height="16" width="16" alt="Mais" />
                    </header>

                    <img height="580" width="400" src={`http://localhost:3334/files/${post.image}`} onDoubleClick={() => this.handleLike(post._id)} alt=""/>

                    <footer>
                        <div className="actions">
                            
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="" />
                            </button>
                            <img src={comment} alt="" />
                            <img src={send} alt="" />
                        </div>

                        <strong>{post.likes} curtidas</strong>

                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>                    
                    </footer>
                </article>
                )) }
            </section>
        );
    }
}

export default Feed;