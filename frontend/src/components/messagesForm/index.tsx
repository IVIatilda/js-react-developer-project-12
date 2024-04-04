import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../slices/messagesSlice";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import leoProfanity from "leo-profanity";

export const MessagesForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const userName = localStorage.getItem("username");
    const selectedChannel = useSelector(
        (state: any) => state.ui.selectedChannel
    );

    const submitForm = (data: { body: string }) => {
        if (!data.body) {
            return;
        }
        const message = {
            body: leoProfanity.clean(data.body.trim()),
            channelId: selectedChannel,
            username: userName,
        };
        dispatch(addMessage(message));
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            body: "",
        },
        onSubmit: submitForm,
    });
    return (
        <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <div className="input-group has-validation">
                <Form.Control
                    type="text"
                    placeholder={t("placeholders.enterMessage")}
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    name="body"
                    required
                    className="border-0 p-0 ps-2 form-control"
                    aria-label={t("placeholders.newMessage")}
                />
                <Button
                    variant=""
                    type="submit"
                    className="btn btn-group-vertical"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        ></path>
                    </svg>
                    <span className="visually-hidden">{t("buttons.send")}</span>
                </Button>
            </div>
        </Form>
    );
};
