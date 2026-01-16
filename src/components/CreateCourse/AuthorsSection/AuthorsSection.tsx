import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import AuthorItem from "../components/AuthorItem/AuthorItem";

import { Author } from "../../../helpers/Author";

import {
    addAuthorAsync,
    removeAuthorAsync,
} from "../../../store/authors/authorsSlice";
import { AppDispatch } from "@/store";

import "./AuthorsSection.css";

type AuthorsSectionProps = {
    setExistedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    existedAuthors: Author[];
    courseAuthors: Author[];
    setCourseAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    setErrors: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            duration: string;
            authors: string;
        }>
    >;
};

const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

const AuthorsSection: React.FC<AuthorsSectionProps> = ({
    setExistedAuthors,
    existedAuthors,
    courseAuthors,
    setCourseAuthors,
    setErrors,
}) => {
    const [newAuthorName, setNewAuthorName] = useState("");
    const [authorError, setAuthorError] = useState("");
    const dispatch = useDispatch();

    const handleCreateAuthor = async () => {
        const name = newAuthorName.trim();
        if (name.length < 2) {
            setAuthorError("Author name should be at least 2 characters");
            return;
        }

        const newAuthor = { name };
        const authorResponse = await (dispatch as AppDispatch)(
            addAuthorAsync(newAuthor)
        ).unwrap();

        setExistedAuthors([...existedAuthors, authorResponse]);
        setNewAuthorName("");
        setAuthorError("");
    };

    const handleAddAuthor = (id: string) => {
        const author = existedAuthors.find((author) => author.id === id);
        if (!author) return;

        setCourseAuthors([...courseAuthors, author]);
        setExistedAuthors(existedAuthors.filter((author) => author.id !== id));

        setErrors((prev) => ({ ...prev, authors: "" }));
    };

    const handleDeleteAuthor = (id: string) => {
        const author = courseAuthors.find((author) => author.id === id);
        if (!author) return;
        setCourseAuthors(courseAuthors.filter((author) => author.id !== id));
        setExistedAuthors([...existedAuthors, author]);
    };

    const handleRemoveFromBackend = (id: string) => {
        (dispatch as AppDispatch)(removeAuthorAsync(id));
        setExistedAuthors(existedAuthors.filter((author) => author.id !== id));
    };

    return (
        <div className="authors-section">
            <div className="authos-creation">
                <h3>Authors</h3>
                <div className="create-author">
                    <div
                        className={`author-input-container ${
                            authorError ? "has-error" : ""
                        }`}
                    >
                        <Input
                            labelText="Author name"
                            placeholderText="Enter author name"
                            value={newAuthorName}
                            onChange={(e) => {
                                setNewAuthorName(e.target.value);
                                if (authorError) setAuthorError("");
                            }}
                            type="text"
                            variant="small"
                        />
                        {authorError && (
                            <p className="error-message ">{authorError}</p>
                        )}
                    </div>

                    <Button
                        buttonText="CREATE AUTHOR"
                        onClick={handleCreateAuthor}
                        padding="0 0"
                        width="18rem"
                    />
                </div>
                <div className="authors-list-section">
                    <h4 className="authors-list">Authors List</h4>
                    {existedAuthors.map((author) => (
                        <AuthorItem
                            id={author.id}
                            key={author.id}
                            name={author.name}
                            onAdd={handleAddAuthor}
                            onRemoveFromBackend={handleRemoveFromBackend}
                        />
                    ))}
                </div>
            </div>
            <div className="course-authors-section">
                <h3>Course Authors</h3>
                {courseAuthors.map((author) => (
                    <AuthorItem
                        key={author.id}
                        id={author.id}
                        name={author.name}
                        onDelete={handleDeleteAuthor}
                    />
                ))}
                {courseAuthors.length === 0 && (
                    <p className="error-message">Author list is empty</p>
                )}
            </div>
        </div>
    );
};

export default AuthorsSection;
