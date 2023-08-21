import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, message, Table } from 'antd';
import CSVReader from 'react-csv-reader';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultPDF from './PDF';

const App = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    max_X: '',
    min_X: '',
    max_Y: '',
    min_Y: '',
    max_Z: '',
    min_Z: '',
  });
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    console.log(formData);
  }, [formData, "FDATAX"]);

  const handleForce = (data, fileInfo) => {
    console.log(data, fileInfo);
  
    // Combine arrays into a single array
    const combinedArray = data.reduce((accumulator, currentArray) => {
      return accumulator.concat(currentArray);
    }, []);
  
    // Extract X, Y, and Z values into separate arrays
    const xValues = combinedArray.map(obj => obj.x);
    const yValues = combinedArray.map(obj => obj.y);
    const zValues = combinedArray.map(obj => obj.z);
  
  const maxX = Math.max(...xValues);
  const maxY = Math.max(...yValues);
  const maxZ = Math.max(...zValues);

  const minX = Math.min(...xValues);
  const minY = Math.min(...yValues);
  const minZ = Math.min(...zValues);

  console.log('Max X:', maxX);
  console.log('Max Y:', maxY);
  console.log('Max Z:', maxZ);

  console.log('Min X:', minX);
  console.log('Min Y:', minY);
  console.log('Min Z:', minZ);
  
  setFormData({
    ...formData,
    max_X: maxX.toString(),
    min_X: minX.toString(),
    max_Y: maxY.toString(),
    min_Y: minY.toString(),
    max_Z: maxZ.toString(),
    min_Z: minZ.toString(),
  });
  };

  useEffect(() => {
    form.setFieldsValue({
      max_X: formData.max_X,
      min_X: formData.min_X,
      max_Y: formData.max_Y,
      min_Y: formData.min_Y,
      max_Z: formData.max_Z,
      min_Z: formData.min_Z,
    });
  }, [formData]);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  const handleFormSubmit = (values) => {
    if (step === 1) {
      setStep(2);
      message.success('Step 1 completed successfully');
    } else {
      setFormData({ ...formData, ...values });
      setShowTable(true);
    }
  }

  const dataSource = [
    {
      key: 'max_X',
      label: 'Max X',
      value: formData.max_X,
    },
    {
      key: 'min_X',
      label: 'Min X',
      value: formData.min_X,
    },
    {
        key: 'max_Y',
        label: 'Max Y',
        value: formData.max_Y,
    },
    {
        key: 'min_Y',
        label: 'Min Y',
        value: formData.min_Y,
    },
    {
        key: 'max_Z',
        label: 'Max Z',
        value: formData.max_Z,
    },
    {
        key: 'min_Z',
        label: 'Min Z',
        value: formData.min_Z,
    }
  ];

  const columns = [
    {
      title: 'Max / Min',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        initialValues={formData}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true, message: 'Please enter project name' }]}
            >
              <Input disabled={step === 2} />
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
                <Form.Item key="max_X" label="Max X" name="max_X">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="min_X" label="Min X" name="min_X">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="max_Y" label="Max Y" name="max_Y">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="min_Y" label="Min Y" name="min_Y">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="max_Z" label="Max Z" name="max_Z">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="min_Z" label="Min Z" name="min_Z">
                  <Input type='number' />
                </Form.Item>
              </Col>
          <Col span={12}>
            <CSVReader
                cssClass="csv-reader-input"
                label="Select CSV file"
                onFileLoaded={handleForce}
                onError={() => console.error('Error reading CSV file')}
                parserOptions={papaparseOptions}
              />
          </Col>
          </>
          )}
        </Row>
        <Form.Item style={{ paddingTop: 10 }}>
          <Button type="primary" htmlType="submit">
            {step === 1 ? 'Next' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
      {showTable && (
      <>
        <Table dataSource={dataSource} columns={columns} />
        <PDFDownloadLink document={<ResultPDF formData={formData} />} fileName="result.pdf">
            {({ loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink>
      </>
      )}
    </div>
  );
};

export default App;
