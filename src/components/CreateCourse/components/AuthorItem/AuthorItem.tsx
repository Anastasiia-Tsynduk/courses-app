import React from "react";
import Button from "../../../../common/Button/Button";
import "./AuthorItem.css";

type AuthorItemProps = {
    id: string;
    name: string;
    onAdd?: (id: string) => void;
    onDelete?: (id: string) => void;
    onRemoveFromBackend?: (id: string) => void;
};

const AuthorItem: React.FC<AuthorItemProps> = ({
    id,
    name,
    onAdd,
    onDelete,
    onRemoveFromBackend,
}) => {
    return (
        <div className="author-item">
            <span className="author-name">{name}</span>
            {onAdd && onRemoveFromBackend && (
                <>
                    <Button
                        buttonText="➡️"
                        onClick={() => onAdd(id)}
                        width="3rem"
                        height="3rem"
                    />
                    <Button
                        buttonText="🗑️"
                        onClick={() => onRemoveFromBackend(id)}
                        width="3rem"
                        height="1rem"
                    />
                </>
            )}
            {onDelete && (
                <>
                    <Button
                        buttonText="⬅️"
                        onClick={() => onDelete(id)}
                        width="3rem"
                        height="1rem"
                    />
                </>
            )}
        </div>
    );
};

export default AuthorItem;
