import {Form, Input, Card, Button } from 'antd';

const Settings = () => {
    return (
        <Card title="Restaurant Details" style={{ margin : 20}}>
            <Form layout='vertical' wrapperCol={{span:8}}>
                <Form.Item label="Boutique Name" required>
                    <Input placeholder='Enter Boutique name here'/>
                </Form.Item>
            </Form>
        </Card>
    )
};

export default Settings;