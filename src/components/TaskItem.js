import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloserForm();
    }

    onEditTask = () => {
        this.props.openForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var {task, index} = this.props;
        return (
             <tr>
                <td> {index + 1} </td>
                <td className="text-center"> {task.name} </td>
                <td className="text-center">
                    <span onClick = {this.onUpdateStatus} className={task.status === true ? 'label label-danger' : 'label label-success'} >
                        { task.status === true ? 'Kích hoạt' : 'Không kích hoạt' }
                    </span>
                </td>
                <td className="text-center">
                     <button className="btn btn-warning">
                        <span className="fa fa-pencil mr-5" onClick={this.onEditTask}>Sửa</span>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger">
                        <span className="fa fa-trash mr-5" onClick={this.onDelete}>Xóa</span>
                    </button>

             </td>
             </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloserForm : () => {
            dispatch(actions.closeForm());
        },
        openForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
