import React, {Component} from "react";

import $ from 'jquery';
import Firebase from "firebase";
import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      inscritos: []
    };
  }

  componentDidMount() {
    console.log("DidMount");
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("DidUpdate");
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    console.log("writeUserData");
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    console.log("getUserData");
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  }; 

  formatoData(d){
    return (
      d.getFullYear()+'-'+('00'+(d.getMonth()+1)).slice(-2)+'-'+('00'+d.getDate()).slice(-2)+' '+('00'+d.getHours()).slice(-2)+':'+('00'+d.getMinutes()).slice(-2)+':'+('00'+d.getSeconds()).slice(-2)
    )
  }

  localizadorIp(){
    $.getJSON('https://ipapi.co/json/', function(dado){
      console.log(dado.utc_offset);
      console.log(dado.ip)
    }).done( function(dado) {
      return dado.ip
    })
  }

  localizadorFuso(){
    $.getJSON('https://ipapi.co/utc_offset/', function(dado){
      console.log(dado);
    })
  }

  handleSubmit = event => {
    console.log("handleSubmit");
    event.preventDefault();
    let nome = this.refs.nome.value;
    let email = this.refs.email.value;
    let tipo = $('input[name=tipo]:checked',"#tipo").val();
    let data = this.formatoData(new Date());
    console.log(this.localizadorIp());
    
    let uid = this.refs.uid.value;

    if (uid && nome && email) {
      const { inscritos } = this.state;
      const insIndex = inscritos.findIndex(data => {
        return data.uid === uid;
      });
      inscritos[insIndex].nome = nome;
      inscritos[insIndex].email = email;
      inscritos[insIndex].tipo = tipo;
      inscritos[insIndex].data = data;
      this.setState({ inscritos });
    } else if (nome && email) {
      const uid = new Date().getTime().toString();
      const { inscritos } = this.state;
      inscritos.push({ uid, nome, email, tipo, data });
      this.setState({ inscritos });
    }

    this.refs.nome.value = "";
    this.refs.email.value = "";
    this.refs.uid.value = "";
    // Implementar a limpeza do campo de radio
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h1>Chega Disso</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <input type="hidden" ref="uid" />
                  <div className="form-group col-md-6">
                    <label>Nome</label>
                    <input
                      type="text"
                      ref="nome"
                      className="form-control"
                      placeholder="Nome"
                    />
                  </div>
                
                  <div className="form-group col-md-6">
                    <div id="tipo">
                      <div className="form-check-inline">
                        <input className="form-check-input" type="radio" name="tipo" value="B2B"/>
                        <label className="form-check-label">Pessoal</label>
                      </div>
                      <div className="form-check-inline">
                        <input className="form-check-input" type="radio" name="tipo" value="B2C"/>
                        <label className="form-check-label">Comercial</label>
                      </div>
                    </div>
                    <label>E-mail</label>
                    <input
                      type="email"
                      ref="email"
                      className="form-control"
                      placeholder="E-mail"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Inscreva-se
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
