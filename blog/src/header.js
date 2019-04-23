import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from './menu';

import $ from 'jquery';

class Header extends Component {
    handleClick(){
        $("#linkMenu").unbind().click( function() {
            console.log("clicado");
            $(".menuToggle").slideToggle();
            $('.link').toggleClass('fundo');
            $("#imgPrinc").toggleClass("sombra");
        })
    }

    render(){
    return(
        <div>
            <img src="https://i.imgur.com/zmKLeSD.jpg" id="imgPrinc" alt=""/>
            <div className="cabecalho">
                <Link to="/" className="linkColor">
                    <div id="titulo">blog cheg&#64; disso</div>
                </Link>
                <div className="link">    
                    <div id="linkMenu" onClick={this.handleClick}>Menu<img src="https://i.imgur.com/4ljGZ2c.png" alt=""/></div>
                </div>
                <div className="icones">
                    <a href="https://www.facebook.com/blog.chegadisso/"><img src="https://i.imgur.com/riJqSMK.png" className="icon" alt=""/></a>
                    <a href="https://www.instagram.com/chega.disso/"><img src="https://i.imgur.com/gKCIAmf.png" className="icon" alt=""/></a>
                    <a href="https://www.linkedin.com/company/14051668"><img src="https://i.imgur.com/cUd1gJU.png" className="icon" alt=""/></a>
                </div>
                <Menu/>
            </div>
        </div>
    );
    }
}

export default Header;