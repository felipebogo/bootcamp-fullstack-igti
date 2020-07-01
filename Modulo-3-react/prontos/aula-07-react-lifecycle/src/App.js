import React, { Component } from 'react';
import Toggle from './components/Toggle/Toggle';
import Users from './components/User/Users';

export default class App extends Component {
  constructor() {
    super();

    /**
     * Estado da aplicação
     *
     * showData - define se a lista de usuários será
     * exibida ou não. Isso ajuda a percebermos o
     * lifecycle componentWillUnmount
     *
     * users - array de usuários
     */
    this.state = {
      showData: false,
      users: [],
    };
  }

  /**
   * Tratamento do checkbox
   * de exibição da lista de
   * usuários
   */
  handleToggle = (checked) => {
    this.setState({
      showData: checked,
    });
  };

  /**
   * Lifecycle que é executado uma vez,
   * após o componente ser renderizado
   * em tela pela primeira vez (montado).
   *
   * Aqui, faço uma requisição à API e
   * obtenho apenas alguns atributos do
   * objeto para deixar o código mais
   * limpo e funcional
   */
  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const json = await res.json();

    const users = json.results.map((item) => {
      const { name, picture, login } = item;

      return {
        id: login.uuid,
        name: name.first,
        picture: picture.large,
      };
    });

    /**
     * Forçando propositalmente um
     * atraso de 5 segundos
     * no retorno da requisição
     */
    setTimeout(() => {
      this.setState({ users });
    }, 5000);
  }

  render() {
    const { showData, users } = this.state;

    return (
      <div style={{ padding: '10px' }}>
        <h1>Abra o console!</h1>

        <div>
          <Toggle description="Exibir lista" onToggle={this.handleToggle} />
        </div>

        {showData && <Users users={users} />}
      </div>
    );
  }
}
