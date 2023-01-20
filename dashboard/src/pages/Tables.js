import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Modal,
  Button,
  Avatar,
  Typography
} from "antd";
import UserInfo from "./UserInfo";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import { useEffect, useState } from "react";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
// table code start
const columns = [
  {
    title: "USERNAME",
    dataIndex: "name",
    key: "name",
    width: "32%"
  },
  {
    title: "ROLE",
    dataIndex: "function",
    key: "function"
  },

  {
    title: "STATUS",
    key: "status",
    dataIndex: "status"
  },
  {
    title: "REGISTER DATE",
    key: "employed",
    dataIndex: "employed"
  }
];

function Tables() {
  const [users, setUsers] = useState([]);
  const [filteredSelected, setfilteredSelected] = useState("1");
  const [openModel, setOpenModel] = useState(false);
  const [userModel, setUserModel] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await fetch("http://localhost:3000/api/v1/admins/users", {
      headers: {
        method: "GET",
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const json = await res.json();
    if (json.success) {
    }
    setUsers(json.data);
  };
  const onChange = (e) => {
    setfilteredSelected(e.target.value);
  };

  const handleonOpenModal = (id) => {
    setUserModel(id);
    setOpenModel(true);
  };

  const handelonCloseModel = () => {
    setOpenModel(false);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="1">Active</Radio.Button>
                    <Radio.Button value="2">Deleted</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={users.map(
                    (user) =>
                      (filteredSelected == "1"
                        ? !user.deletedAt
                        : user.deletedAt) && {
                        key: user.id,
                        name: (
                          <>
                            <Avatar.Group>
                              <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={face2}
                              ></Avatar>
                              <div className="avatar-info">
                                <Title level={5}>{user.name}</Title>
                                <p>{user.email}</p>
                              </div>
                            </Avatar.Group>{" "}
                          </>
                        ),
                        function: (
                          <>
                            <div className="author-info">
                              <Title level={5}>{user.Type.type}</Title>
                            </div>
                          </>
                        ),

                        status: (
                          <>
                            <Button
                              type={user.deletedAt ? "danger" : `primary`}
                              className="tag-primary"
                            >
                              {user.deletedAt ? "Deleted" : "Active"}
                            </Button>
                          </>
                        ),
                        employed: (
                          <>
                            {user.Type.type == "user" && (
                              <div className="ant-employed">
                                <span>{user.createdAt.substring(0, 10)}</span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleonOpenModal(user.id)}
                                >
                                  show
                                </span>
                              </div>
                            )}
                          </>
                        )
                      }
                  )}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        width={800}
        title={users?.find((user) => user.id == userModel)?.name}
        visible={openModel}
        onOk={handelonCloseModel}
        onCancel={handelonCloseModel}
      >
        <UserInfo id={userModel} />
      </Modal>
    </>
  );
}

export default Tables;
