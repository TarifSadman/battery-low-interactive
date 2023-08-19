import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const App = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [csvData, setCSVData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [contractor, setContractor] = useState('');

  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCSVData(result.data);
        message.success('CSV file uploaded successfully');
        console.log(result.data, 'result');
      },
      header: true,
    });
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name, "name");
  };

  // const handleDescription = (e) => {
  //   setDescription(e.target.value);
  //   console.log(description, "description");
  // };

  // const handleClient = (e) => {
  //   setClient(e.target.value);
  //   console.log(client, "client");
  // };

  // const handleContractor = (e) => {
  //   setContractor(e.target.value);
  //   console.log(contractor, "contractor");
  // };


  const handleFormSubmit = (values) => {
    if (step === 1) {
      setStep(2);
      message.success('Step 1 completed successfully');
    } else {
      console.log(' Form Values:', { ...values, ...csvData });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        initialValues={csvData}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true, message: 'Please enter project name' }]}
            >
              <Input onChange={handleName} disabled={step === 2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Project Description"
              name="projectDescription"
              rules={[{ required: true, message: 'Please enter project description' }]}
            >
              <Input disabled={step === 2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Client"
              name="client"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input disabled={step === 2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contractor"
              name="contractor"
              rules={[{ required: true, message: 'Please enter contractor name' }]}
            >
              <Input disabled={step === 2} />
            </Form.Item>
          </Col>
          {step === 2 && (
            <>
              <Col span={12}>
                <Form.Item label="Max X" name="max_X">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Min X" name="min_X">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Max Y" name="max_Y">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Min Y" name="min_Y">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Max Z" name="max_Z">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Min Z" name="min_Z">
                  <Input disabled />
                </Form.Item>
              </Col>
          <Col span={12}>
            <Form.Item label="CSV Upload">
              <Upload
                beforeUpload={() => false}
                accept=".csv"
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    handleCSVUpload(info.file.originFileObj);
                  }
                }}
              >
                <Button onClick={handleCSVUpload} icon={<UploadOutlined />}>
                  Upload CSV
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          </>
          )}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {step === 1 ? 'Next' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
