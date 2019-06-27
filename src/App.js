import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
// import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         sortBy    : 'name',
    //         sortValue :  1
    //     }
    // }

    // componentWillMount(){
    //     if(localStorage && localStorage.getItem('tasks')){
    //            var tasks = JSON.parse(localStorage.getItem('tasks'));
    //            this.setState({
    //                 tasks: tasks
    //            });
    //     }
    // }
    // s4(){
    //     return Math.floor((1* Math.random() ) * 0x10000).toString(16).substring(1);
    // }
    // generateID(){
    //     return this.s4() + this.s4() + '-' + this.s4();
    // }


    // onGenerateData = () => {
    //     var tasks = [
    //         {
    //             id     : this.generateID(),
    //             name   : 'Hoc lap trinh',
    //             status : true
    //         },
    //         {
    //             id     : this.generateID(),
    //             name   : 'Di boi',
    //             status : false
    //         },
    //         {
    //             id     : this.generateID(),
    //             name   : 'Ngu',
    //             status : true
    //         }
    //     ];

    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    onToggleForm = () => {
        var { itemEditting } = this.props;
        if (itemEditting && itemEditting.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        });
    }
    render() {
        var { isDisplayFrom } = this.props;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayFrom ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                    <TaskForm
                    />
                    </div>
                    <div className= {isDisplayFrom ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        {/* <button
                        type="button"
                        className="btn btn-danger ml-5"
                        onClick={this.onGenerateData}>
                            <span className="fa fa-plus mr-5"></span>
                            Generate Data
                        </button> */}

                        <TaskControl
                         />
                        <TaskList
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayFrom : state.isDisplayForm,
        itemEditting : state.itemEditting
    };
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) =>{
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);