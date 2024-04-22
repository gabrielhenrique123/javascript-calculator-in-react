import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

// Definindo o componente principal App
class App extends React.Component {
  constructor() {
    super();
    // Inicializando o estado
    this.state={
      currentNumber: "0",
      opFlag:false,
      dotFlag:false
    };
    // Vinculando o método handleClick à instância do componente
    this.handleClick = this.handleClick.bind(this);
  };

  // Método para lidar com cliques nos botões
  handleClick = (value) => {
    let currentNumber = this.state.currentNumber;
    let operatorFlag = this.state.opFlag;

    // Switch para determinar a ação com base no valor do botão clicado
    switch(true){
      // Se um número é clicado
      case value === "0" || value === "1" || value === "2" || value === "3" || value === "4" || value === "5" || value === "6" || value === "7" || value === "8" || value === "9":
        if(this.state.currentNumber !== "0") {
          currentNumber += value;
          operatorFlag = false;
        } else {
          currentNumber = value;
        }
        break;
      // Se um operador é clicado
      case value === "+" || value === "-" || value === "*" || value === "/":
        if(!this.state.opFlag){
          currentNumber += value;
          operatorFlag = true;
          this.setState({dotFlag:false});
        } else {
          const newNumber = currentNumber.slice(0,currentNumber.length-1);
          currentNumber = newNumber;
          currentNumber += value;
        }
        break;
      // Se o botão "clear" é clicado
      case value === "clear":
        currentNumber = "0";
        operatorFlag = false;
        this.setState({dotFlag:false});
        break;
      // Se o botão "delete" é clicado
      case value === "deleteOne":
        if (currentNumber.length<=1){
              currentNumber="";
              }
          else {
          currentNumber = currentNumber.substring(0, currentNumber.length - 1); }
        break;
      // Se o botão "=" é clicado
      case value === "=":
        currentNumber = eval(currentNumber);
        operatorFlag = false;
        this.setState({dotFlag:true});
        break;
      // Se o botão "." é clicado
      case value === ".":
        if(!this.state.dotFlag){
          currentNumber += ".";
          this.setState({dotFlag:true});
        }
    }
    // Atualizando o estado
    this.setState({opFlag:operatorFlag});
    this.setState({currentNumber:currentNumber});
  }

  // Renderizando o componente
  render() {
    return (
      <div className="container">
        <h1>Calculadora JavaScript</h1>
        <div className="row">
          <div id="calculator">
            {/* Componente de entrada */}
            <Input id="exepretion" currentNumber={this.state.currentNumber}/>
            {/* Componente de saída */}
            <Output id="display" currentNumber={this.state.currentNumber}/>
            {/* Botão "clear" */}
            <Clear id="clear" handleClick={this.handleClick} />
            {/* Botões de operador */}
            <Operator id="divide" value="/" handleClick={this.handleClick} />
            <Operator id="multiply" value="*" handleClick={this.handleClick} /><br/>
            {/* Botões de número */}
            <Button id="seven" value="7" handleClick={this.handleClick} />
            <Button id="eight" value="8" handleClick={this.handleClick} />
            <Button id="nine" value="9" handleClick={this.handleClick} />
            <Operator id="subtract" value="-" handleClick={this.handleClick} /><br/>
            <Button id="four" value="4" handleClick={this.handleClick} />
            <Button id="five" value="5" handleClick={this.handleClick} />
            <Button id="six" value="6" handleClick={this.handleClick} />
            <Operator id="add"  value="+" handleClick={this.handleClick} /><br/>
            <Button id="one" value="1" handleClick={this.handleClick} />
            <Button id="two" value="2" handleClick={this.handleClick} />
            <Button id="three" value="3" handleClick={this.handleClick} />
            {/* Botão "=" */}
            <Equals id="equals" value="=" handleClick={this.handleClick} /><br/>
            {/* Botões "zero" e "decimal" */}
            <Button id="zero" value="0" handleClick={this.handleClick} />
            <Button id="decimal" value="." handleClick={this.handleClick} />
            {/* Botão "delete" */}
            <Delete id="deleteOne" handleClick={this.handleClick} />
          </div>
        </div>
        <footer className="text-center">
          <span>Por HuDa Qeshta <i className="far fa fa-copyright"></i> 2019</span>
        </footer>
      </div>
    );
  } 
}

// Componente para exibir a entrada
class Input extends React.Component{
  render (){
    return(
        <p id={this.props.id}>{this.props.currentNumber}</p>
    )
  }
}

// Componente para exibir a saída
class Output extends React.Component{
  render(){
    return(
        <p id={this.props.id}>{this.props.currentNumber}</p>
    )
  }
}

// Componente para os botões de operador
class Operator extends React.Component{
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render(){
    return(
    <button id={this.props.id} onClick={this.runParentHandleClick} className="btn btn-dark btn-lg">{this.props.value}</button>
    )
  }
}

// Componente para os botões de número
class Button extends React.Component{
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render(){
    return(
    <button id={this.props.id} onClick={this.runParentHandleClick} className="btn btn-primary btn-lg">{this.props.value}</button>
    )
  }
}

// Componente para o botão "clear"
class Clear extends React.Component{
  runParentHandleClick = () => {
    this.props.handleClick(this.props.id)
  }
  render(){
    return(
    <a id={this.props.id} className="btn btn-danger btn-lg" onClick={this.runParentHandleClick}>AC</a>
    )
  }
}

// Componente para o botão "delete"
class Delete extends React.Component{
  runParentHandleClick = () => {
    this.props.handleClick(this.props.id)
  }
  render(){
    return(
    <a id={this.props.id} className="btn btn-danger btn-lg" onClick={this.runParentHandleClick}>CE</a>
    )
  }
}

// Componente para o botão "="
class Equals extends React.Component{
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render(){
    return(
  <button id={this.props.id} className="btn btn-warning btn-lg" onClick={this.runParentHandleClick}>{this.props.value}</button>
  )
  }
}

// Renderizando o componente App no root do HTML
render(<App />, document.getElementById('root'));

