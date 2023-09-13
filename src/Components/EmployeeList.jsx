import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Form, Input, Space, Layout } from "antd";
const { Header, Content } = Layout;

const EmployeeList = () => {
  const storedData = localStorage.getItem("employeeData");

  const [data, setData] = useState(storedData ? JSON.parse(storedData) : []);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const editRef = useRef();

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(data));
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showViewModal(record)}>View</Button>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const showViewModal = (employee) => {
    setViewEmployee(employee);
    setIsViewModalVisible(true);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewEmployee(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
    setIsEditModalVisible(false); // Close the edit modal if it's open
    addForm.resetFields(); // Clear the add form fields
  };

  const showEditModal = (employee) => {
    setEditedEmployee(employee);
    editForm.setFieldsValue({
      editName: employee.name,
      editEmail: employee.email,
      editPhone: employee.phone,
      editDesignation: employee.designation,
    });
    setIsEditModalVisible(true);
    setIsAddModalVisible(false); // Close the add modal if it's open
  };

  const handleEditSubmit = (values) => {
    const updatedData = data.map((employee) => {
      if (employee.key === editedEmployee.key) {
        return {
          ...employee,
          name: values.editName,
          email: values.editEmail,
          phone: values.editPhone,
          designation: values.editDesignation,
        };
      }
      return employee;
    });
    setData(updatedData);
    setIsEditModalVisible(false);
    setEditedEmployee(null);
    editForm.resetFields();
    localStorage.setItem("employeeData", JSON.stringify(updatedData));
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    addForm.resetFields();
    editForm.resetFields();
  };

  const handleAdd = (values) => {
    const newData = [...data, { key: Date.now(), ...values }];
    setData(newData);
    setIsAddModalVisible(false);
    addForm.resetFields();
    localStorage.setItem("employeeData", JSON.stringify(newData));
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    localStorage.setItem("employeeData", JSON.stringify(newData));
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          color: "white",
        }}
      >
        <h1>Employee Management</h1>
        <Button type="primary" onClick={showAddModal}>
          Add Employee
        </Button>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </Content>
      <Modal
        title="Add Employee"
        visible={isAddModalVisible}
        onOk={addForm.submit}
        onCancel={handleCancel}
      >
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              { required: true, message: "Please enter the designation" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Employee"
        open={isEditModalVisible}
        onOk={editForm.submit}
        onCancel={handleCancel}
      >
        <Form form={editForm} onFinish={handleEditSubmit}>
          <Form.Item
            name="editName"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="editEmail"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="editPhone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="editDesignation"
            label="Designation"
            rules={[
              { required: true, message: "Please enter the designation" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="View Employee"
        open={isViewModalVisible}
        onCancel={handleViewCancel}
      >
        {viewEmployee && (
          <div>
            <p>
              <strong>Name:</strong> {viewEmployee.name}
            </p>
            <p>
              <strong>Email:</strong> {viewEmployee.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewEmployee.phone}
            </p>
            <p>
              <strong>Designation:</strong> {viewEmployee.designation}
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default EmployeeList;
