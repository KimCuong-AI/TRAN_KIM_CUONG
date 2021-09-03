import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Button, Input } from 'antd'
import { history } from '../../../App';
const TimKiemNguoiDung = (props) => {
    const [state, setState] = useState({ searchText: '' })
    const handleSearchInput = (event) => {
        setState({
            searchText: event.target.value,
        })
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();   
        if (state.searchText !== '') {
            let tenNguoiDung = state.searchText;
            history.push({
                pathname: `/admin/users/search/${tenNguoiDung}`,
                state: { searchText: tenNguoiDung },
            })
        } else {
            alert('Chưa nhập tên người dùng')
        }
    }
    return (
        <div className='searchUserInput'>
            <form className="mb-2 position-relative" onSubmit={handleFormSubmit} >
                <Input value={state.searchText} onChange={handleSearchInput} className="form-control" type="text" placeholder="Tìm kiếm người dùng" />
                <Button htmlType='submit' className='border-0 m-0 h-100 position-absolute h1'style={{top:-2,right:30,backgroundColor:'transparent'}} ><SearchOutlined /></Button>
            </form>
        </div>
    );
}

export default withRouter(TimKiemNguoiDung);
