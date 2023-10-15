<Form
  name="customized_form_controls"
  layout="inline"
  onFinish={onFinish}
  initialValues={{
    price: {
      number: 0,
      currency: "rmb",
    },
  }}
>
  >
  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>;
