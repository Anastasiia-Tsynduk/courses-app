import Button from "@/common/Button/Button";
import Input from "@/common/Input/Input";
import "../EditAuthor/EditAuthor.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateAuthorAsync } from "@/store/authors/authorsSlice";
import { Author } from "@/models/Author";

type EditAuthorProps = {
    setExistedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    authorId: string;
    name: string;
    onClose: () => void;
};

const EditAuthor: React.FC<EditAuthorProps> = ({
    onClose,
    authorId,
    name,
    setExistedAuthors,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const [updatedAuthorName, setUpdatedAuthorName] = useState(name);

    const handleUpdateAuthorInBackend = async () => {
        const updateAuthorPayload = {
            author: { name: updatedAuthorName },
            id: authorId ?? "",
        };

        const authorResponse = await dispatch(
            updateAuthorAsync(updateAuthorPayload)
        ).unwrap();

        setExistedAuthors((existedAuthors) =>
            existedAuthors.map((author) =>
                author.id === authorResponse.id ? authorResponse : author
            )
        );

        onClose();
    };
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Author</h2>
                <button onClick={onClose}>Close</button>

                <Input
                    labelText="Edit author"
                    placeholderText="Edit author"
                    value={updatedAuthorName}
                    onChange={(e) => {
                        setUpdatedAuthorName(e.target.value);
                    }}
                />

                <div>
                    <Button
                        onClick={handleUpdateAuthorInBackend}
                        buttonText="UPDATE"
                    />
                    <Button buttonText="CANCEL" type="button" />
                </div>
            </div>
        </div>
    );
};

export default EditAuthor;
