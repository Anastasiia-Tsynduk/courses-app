import React from "react";
import Button from "../../../../common/Button/Button";
import "./AuthorItem.css";

type AuthorItemProps = {
    id: string;
    name: string;
    onAdd?: (id: string) => void;
    onDelete?: (id: string) => void;
};

const AuthorItem: React.FC<AuthorItemProps> = ({
    id,
    name,
    onAdd,
    onDelete,
}) => {
    return (
        <div className="author-item">
            <span className="author-name">{name}</span>
            {onAdd && (
                <Button
                    buttonText="Add author"
                    onClick={() => onAdd(id)}
                    width="12rem"
                    height="1rem"
                />
            )}
            {onDelete && (
                <Button
                    buttonText="Delete author"
                    onClick={() => onDelete(id)}
                    width="12rem"
                    height="1rem"
                />
            )}
        </div>
    );
};

export default AuthorItem;
