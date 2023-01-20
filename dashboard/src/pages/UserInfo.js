import { useEffect, useState } from "react";
import { Table, Avatar, Typography } from "antd";
import face2 from "../assets/images/face-2.jpg";

const UserInfo = ({id}) => {
    const [singleData, setSingleData] = useState([])
    let count = 0;
    const getUserInfo = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}`,{
            method: "GET",
            headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const json = await res.json()
        if(json.success) setSingleData(json.data)
        console.log(singleData)
    }
    useEffect(()=>{
        getUserInfo()
    })
    return(<div>   
        <>
                            <Avatar.Group>
                              <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={face2}
                              ></Avatar>
                              <div className="avatar-info">
                                <Typography level={5}>{singleData?.user?.name}</Typography>
                                <p>{singleData?.user?.email}</p>
                              </div>
                            </Avatar.Group>{" "}
                          </> 
        <Table
        columns={[
            {
                title: "NUMBER",
                dataIndex: "count",
                key: "count",
                width: "32%",
            },
            {
                title: "CONTENT",
                dataIndex: "content",
                key: "content",
                width: "32%",
            },
            {
                title: "STATUS",
                dataIndex: "status",
                key: "status",
                width: "32%",
            },
            {
                title: "CREATED DATE",
                dataIndex: "createdAt",
                key: "createdAt",
                width: "32%",
            },
            {
                title: "DELETED OR NOT",
                dataIndex: "deletedAt",
                key: "deletedAt",
                width: "32%",
            },
        ]}
        dataSource={singleData?.tasks?.map(todo => ({
            key: todo.id,
            count:(<p>{++count}</p>),
            content:(<p>{todo.content}</p>),
            status:(<p>{todo.status}</p>),
            createdAt: (<p>{todo.startDate}</p>)
        }
        ))}
        className="ant-border-space"
         />
    </div>)
}

export default UserInfo