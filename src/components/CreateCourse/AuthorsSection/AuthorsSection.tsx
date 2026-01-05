import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import AuthorItem from "../components/AuthorItem/AuthorItem";

import { Author } from "../../../helpers/getAuthorsText";

import {
    addAuthor,
    addAuthorAsync,
    removeAuthor,
} from "../../../store/authors/authorsSlice";
import { AppDispatch, RootState } from "@/store";

import "./AuthorsSection.css";

type AuthorsSectionProps = {
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
    courseAuthors,
    setCourseAuthors,
    setErrors,
}) => {
    const [newAuthorName, setNewAuthorName] = useState("");
    const [authorError, setAuthorError] = useState("");
    const dispatch = useDispatch();
    const existedAuthors = useSelector((state: RootState) => state.authors);

    const handleCreateAuthor = () => {
        const name = newAuthorName.trim();
        if (name.length < 2) {
            setAuthorError("Author name should be at least 2 characters");
            return;
        }

        const newAuthor = { id: generateId(), name };
        (dispatch as AppDispatch)(addAuthorAsync(newAuthor));

        setNewAuthorName("");
        setAuthorError("");
    };

    const handleAddAuthor = (id: string) => {
        const author = existedAuthors.find((author) => author.id === id);
        if (!author) return;

        setCourseAuthors([...courseAuthors, author]);
        dispatch(removeAuthor(id));
        setErrors((prev) => ({ ...prev, authors: "" }));
    };

    const handleDeleteAuthor = (id: string) => {
        const author = courseAuthors.find((author) => author.id === id);
        if (!author) return;

        setCourseAuthors(courseAuthors.filter((a) => a.id !== id));
        dispatch(addAuthor(author));
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
