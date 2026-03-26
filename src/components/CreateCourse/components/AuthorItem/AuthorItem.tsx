import React, { useState } from "react";
import Button from "../../../../common/Button/Button";
import "./AuthorItem.css";
import EditAuthor from "@/components/EditAuthor/EditAuthor";
import { Author } from "@/models/Author";

type AuthorItemProps = {
    id: string;
    name: string;
    onAdd?: (id: string) => void;
    onDelete?: (id: string) => void;
    onRemoveFromBackend?: (id: string) => void;
    setExistedAuthors?: React.Dispatch<React.SetStateAction<Author[]>>;
};

const AuthorItem: React.FC<AuthorItemProps> = ({
    id,
    name,
    onAdd,
    onDelete,
    onRemoveFromBackend,
    setExistedAuthors,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="author-item">
            <span className="author-name">{name}</span>
            {onAdd && onRemoveFromBackend && (
                <>
                    <Button
                        buttonText="✏️"
                        onClick={() => setIsOpen(true)}
                        width="3rem"
                        height="3rem"
                    />
                    {isOpen && setExistedAuthors && (
                        <EditAuthor
                            authorId={id}
                            name={name}
                            onClose={() => setIsOpen(false)}
                            setExistedAuthors={setExistedAuthors}
                        />
                    )}
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
