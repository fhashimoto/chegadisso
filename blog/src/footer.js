import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render(){
        return(
            <div>
                <div className="footer">
                    <Link to="/" className="linkColorTituloFooter">
                        <div className="titulo" onClick={this.topo}>Chega disso</div>
                    </Link>
                    {/* <div className="info">
                        <Link to="/about" className="linkColorFooter">
                            <span>Sobre</span>
                        </Link>
                        <span>Equipe</span>
                        <span>Contato</span>
                    </div> */}
                    <div className="copyr"> Copyright &copy; - Chega Disso - Todos os direitos reservados</div>
                </div>
            </div>
        )
    }
}

export default Footer;