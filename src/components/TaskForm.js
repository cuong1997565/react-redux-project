import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id     : '',
            name   : '',
            status : ''
        }
    }
    onCloseForm = () => {
        this.props.onCloserForm();
    }

    onChange = (event) => {
         var target = event.target;
         var name   = target.name;
         var value  = target.value;
         if(name === 'status'){
            value = target.value === 'true' ? true :false;
         }
         this.setState({
              [name] : value
         });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onClose();
        this.onCloseForm();
    }

    onClose = () => {
        this.setState({
            name   : '',
            status : true
        });
    }

    componentWillMount(){
            if(this.props.task){
                this.setState({
                      id     : this.props.task.id,
                      name   : this.props.task.name,
                      status : this.props.task.status
                });
                console.log(this.state);
            }
    }

    componentWillReceiveProps(nextProps){
            if(nextProps && nextProps.task){
                this.setState({
                    id     :  nextProps.task.id,
                    name   :  nextProps.task.name,
                    status :  nextProps.task.status
                });
            } else if(nextProps && nextProps.task === null){
                this.setState({
                    id     :     '',
                    name   :     '',
                    status :     false
                });
            }
    }


    render() {
        var { id } = this.state
        var { isDisplayForm } = this.props
        if(!isDisplayForm) return ''
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                       { id !== '' ? 'Cập Nhập Công Việc' : 'Thêm Công Việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={ this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange = {this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className = "form-control"
                            name      = "status"
                            value     = {this.state.status}
                            onChange  = {this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClose}>
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
           dispatch(actions.addTask(task))
        },
        onCloserForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);