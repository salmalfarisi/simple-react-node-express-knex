import { useNavigate, useParams, Link } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { MDBDataTable } from "mdbreact";

const Index = (props) => {
    const navigate = useNavigate();
    const [loadData, setData] = useState({ data:[] });
	const [LoadDetail, setDetail] = useState({ data:[] });
	const [result, setresult] = useState({ success:false });
	const [showmessage, setmessage] = useState({ message:"" });

    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);

    const ChangeRouteChild = (value) => {
        props.ChangeRoute(value);
	}

    useEffect(() => {
        fetch("http://127.0.0.1:4000/GET")
        .then((res) => res.json())
        .then((res) => {
            setPosts(res.data);
        });
    }, []);


    let deletePost = (postId) => {
        if(window.confirm('Are you sure want to delete this data ?')){
            fetch(`http://127.0.0.1:4000/DELETE/${postId}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then((res) => {
                var postIndex = posts.findIndex(function (o) {
                return o.id === postId;
                });
                if (postIndex !== -1) {
                setPosts(posts.filter((item) => item.id != postId));
                }
            });
        }
      };

    const data = {
        columns: [
          {
            label: "#",
            field: "id",
            sort: "asc",
            width: 150,
          },
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: 270,
          },
    
          {
            label: "Quantity",
            field: "qty",
            sort: "asc",
            width: 200,
          },
          {
            label: "Action",
            field: "action",
            width: 100,
          },
        ],
    
        rows: usersForRender,
    };

    useEffect(() => {
        let postsArray = JSON.parse(JSON.stringify(posts));
        let userData = [];
        postsArray.map((item, index) => {
            item.ids = (
            <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{index+1}</div>
            );
            item.action = (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={`/edit/${item.id}`} className="uil-trash-alt"
                style={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: ".7em",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                    background: "#ffc107",
                }} onClick={(e) => ChangeRouteChild('edit') }>
                    Edit
                </Link>
                <div
                className="uil-trash-alt"
                style={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: ".7em",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                    background: "#dc3545",
                }}
                onClick={() => deletePost(posts[index].id)}
                >
                Delete
                </div>
            </div>
            );
            userData.push(item);
        });
        setUsersForRender(userData);
    }, [posts]);

    return (
        <div className="container">
            <Link to="/tambah/0" className='btn btn-primary float-right' onClick={(e) => ChangeRouteChild('tambah') }>
                Create data
            </Link>
            <MDBDataTable
                responsive
                bordered
                data={data}
                searching={true}
                paging={true}
                info={false}
            />
        </div>
    )
}

export default Index;