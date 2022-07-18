import { useNavigate, useParams, Link } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [command, setCommand] = useState('');
    const [result, setresult] = useState({ success:false });
	const [name, setName] = useState('');
	const [qty, setQty] = useState('');
	const [expiredAt, setexpiredAt] = useState(new Date());

    const ChangeRouteChild = (event) => {
		props.ChangeRoute(event.target.value);
	}

    useEffect(() => {
        if(props.cUrl != '/tambah/0'){
            var url = 'http://127.0.0.1:4000/GET/' + id;
            fetch(url, {method: "GET",})
            .then((res) => res.json())
            .then((res) => {
                setresult(res.success);
                setName(res.data.name);
                setQty(res.data.qty);
                setexpiredAt(new Date(res.data.expiredAt));
                setCommand('Update');
            })
            .catch(() => {
                //alert('error while load data')
                //console.log(e.message)
            });
        }
        else{
            setCommand('Create');
        }
	}, [props.cUrl]);

    async function submitform(e) {
        let url = '';
        let textconfirm = '';
        let type = '';
        let message = '';
        if(e.target.innerHTML === "Create"){
            textconfirm = 'Are you sure want to create new data';
            url = 'http://127.0.0.1:4000/POST';
            type = 'POST';
            message = 'Data has been create';
        }
        else{
            textconfirm = 'Are you sure want to update the data';
            url = 'http://127.0.0.1:4000/PUT/' + id;
            type = 'PUT';
            message = 'Data has been updated';
        }
        if(window.confirm(textconfirm)){
            let datas = {name, qty, expiredAt};
            fetch(url, {
                            method: type, 
                            body:JSON.stringify(datas),
                            mode:'cors',
                            cache:'default', 
                            headers:{'Content-Type': 'application/json'},
                }
            )
            .then((res) => res.json())
            .then((res) => {
                alert(message)
                props.ChangeRoute('/')
            })
            .catch(() => {
                //alert('error while load data')
                //console.log(e.message)
            });
        }
    }

    return (
        <div className='container'>
            <div class="form-group">
                <label>Name</label>
                <input className="form-control" type="text" value={name} onChange={ (e) => setName(e.target.value) } placeholder="Input name of data" required />
            </div>
            <div class="form-group">
                <label>Qty</label>
                <input className="form-control" type="number" value={qty} onChange={ (e) => setQty(e.target.value) } placeholder="Input numer of data" required />
            </div>
            <div class="form-group">
                <label>Picture</label>
            </div>
            <div class="form-group">
                <label>Expired At</label>
                <DatePicker className="form-control" selected={expiredAt} format="yyyy-MM-dd" onChange={(date:Date) => setexpiredAt(date)} required/>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <Link to="/" className="btn btn-danger" value="/" onClick={ ChangeRouteChild }>Back</Link>
                </div>
                <div>
                    <Link to="/" className="btn btn-primary" onClick={submitform}>{command}</Link>
                </div>
            </div>
        </div>
    )
}

export default Form;