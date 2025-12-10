import React from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";

import "./AuthForm.css";

type AuthFormProps = {
    title: string;
    fields: {
        label: string;
        type: string;
        value: string;
        placeholder: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
    }[];
    buttonText: string;
    footerText: string;
    footerActionText: React.ReactNode;
    showFooterOnNewLine?: boolean;

    onSubmit: (e: React.FormEvent) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({
    title,
    fields,
    buttonText,
    footerText,
    footerActionText,

    onSubmit,
    showFooterOnNewLine,
}) => {
    return (
        <div className="auth-wrapper">
            <h1 role="heading" className="auth-title">
                {title}
            </h1>
            <div className="auth-container">
                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <div className="form-group" key={index}>
                            <Input
                                labelText={field.label}
                                placeholderText={field.placeholder}
                                value={field.value}
                                onChange={field.onChange}
                                type={field.type}
                                errorMessage={field.error}
                                variant="auth"
                            />
                        </div>
                    ))}

                    <Button
                        type="submit"
                        buttonText={buttonText}
                        width="28.6rem"
                        padding="1rem 2rem"
                    />
                </form>
                <p className={showFooterOnNewLine ? "footer-column" : ""}>
                    {footerText}
                    <span>{footerActionText}</span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
