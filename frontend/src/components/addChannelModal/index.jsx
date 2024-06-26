import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { addChannel, editChannel, channelsSelectors } from '../../slices/channelsSlice';

const AddChannelModal = ({ show, channel = null, onHide }) => {
  const dispatch = useDispatch();
  const textInput = React.createRef();
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('errors.channelNameLength'))
      .max(20, t('errors.channelNameLength'))
      .required(t('errors.required')),
  });

  const channels = useSelector(channelsSelectors.selectAll);

  const submitForm = (data) => {
    const newChannel = { name: leoProfanity.clean(data.name.trim()) };
    const channelIsset = channels.find((item) => item.name === newChannel.name);
    if (channelIsset) {
      // eslint-disable-next-line no-use-before-define
      formik.setErrors({ name: t('errors.channelNameUnique') });
      return;
    }
    if (channel) {
      dispatch(editChannel({ ...channel, ...newChannel }));
    } else {
      dispatch(addChannel(newChannel));
    }
    onHide();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: SignupSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    formik.resetForm();
    formik.setValues({ name: channel ? channel.name : '' });
    textInput.current?.select();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel?.name, show]);

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          {channel ? t('channels.renameChannel') : t('channels.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="input-group has-validation" controlId="channelName">
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              isInvalid={!!formik.errors.name && formik.touched.name}
              className="w-100 mb-2"
              aria-label={t('channels.channelName')}
              ref={textInput}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('channels.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2 btn" onClick={onHide}>
              {t('buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('buttons.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
