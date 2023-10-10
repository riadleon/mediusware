import React, { useState } from 'react';

const Problem1 = () => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [show, setShow] = useState('all');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, { name, status }]);
        setName('');
        setStatus('');
    };

    const handleClick = (val) => {
        setShow(val);
    };

    const getDisplayedTasks = () => {
        let filteredTasks;
        if (show === 'active') {
            filteredTasks = tasks.filter(task => task.status === 'Active');
        } else if (show === 'completed') {
            filteredTasks = tasks.filter(task => task.status === 'Completed');
        } else {
            filteredTasks = [...tasks];
            filteredTasks.sort((a, b) => {
                if (a.status === 'Active') return -1;
                if (b.status === 'Active') return 1;
                if (a.status === 'Completed' && b.status !== 'Active') return -1;
                if (b.status === 'Completed' && a.status !== 'Active') return 1;
                return 0;
            });
        }
        return filteredTasks;
    };


    const displayedTasks = getDisplayedTasks();

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                value={status}
                                onChange={handleStatusChange}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
